import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

const GOOGLE_DOC_ID = '1VUfKY_kY-qe3iW2Q63LrBDoBzAWkjM4-czGQR175rT4';

export async function GET() {
    try {
        // Fetch Google Doc as HTML export
        const response = await fetch(
            `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/export?format=html`,
            {
                cache: 'no-store',
                headers: {
                    'User-Agent': 'Health-Protocol-Litepaper-Fetcher/1.0'
                }
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch Google Doc:', response.status, response.statusText);
            return NextResponse.json(
                {
                    error: 'Failed to fetch document. Please ensure the document is publicly accessible.',
                    status: response.status
                },
                { status: response.status }
            );
        }

        const html = await response.text();

        const cleanedHtml = await parseAndCleanHTML(html);

        return NextResponse.json({
            content: cleanedHtml,
            success: true
        });

    } catch (error) {
        console.error('Error fetching Google Doc:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                success: false
            },
            { status: 500 }
        );
    }
}

async function parseAndCleanHTML(html: string): Promise<string> {
    let cleaned = html;

    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
        cleaned = bodyMatch[1];
    }

    const imagePromises: Promise<void>[] = [];
    const imageMap = new Map<string, string>();

    const imageRegex = /<img([^>]*)src="([^"]*)"([^>]*)>/gi;
    let match;

    while ((match = imageRegex.exec(cleaned)) !== null) {
        const src = match[2];
        if (src && !imageMap.has(src)) {
            imageMap.set(src, src);

            if (src.includes('google.com') || src.includes('googleusercontent.com')) {
                const promise = fetchImageAsBase64(src)
                    .then(base64 => {
                        if (base64) {
                            imageMap.set(src, base64);
                        }
                    })
                    .catch(err => {
                        console.error('Failed to fetch image:', src, err);
                    });
                imagePromises.push(promise);
            }
        }
    }

    await Promise.all(imagePromises);

    cleaned = cleaned.replace(
        /<img([^>]*)src="([^"]*)"([^>]*)>/gi,
        (match, before, src, after) => {
            const finalSrc = imageMap.get(src) || src;
            const isBase64 = finalSrc.startsWith('data:');

            if (isBase64) {
                return `<img${before}src="${finalSrc}"${after} class="google-doc-image" loading="lazy" alt="Document image" />`;
            } else {
                return `<img${before}src="${finalSrc}"${after} class="google-doc-image" loading="lazy" onerror="this.style.display='none'" crossorigin="anonymous" alt="Document image" />`;
            }
        }
    );

    return cleaned.trim();
}

async function fetchImageAsBase64(url: string): Promise<string | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Health-Protocol-Litepaper-Fetcher/1.0'
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch image:', response.status);
            return null;
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');

        const contentType = response.headers.get('content-type') || 'image/png';

        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error('Error fetching image as base64:', error);
        return null;
    }
}