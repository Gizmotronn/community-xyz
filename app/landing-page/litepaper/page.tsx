"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LitepaperPage() {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch('/litepaperPage/litepaper.html')
            .then(res => res.text())
            .then(html => {
                const cleanedHtml = html
                    .replace(/<p class="c[0-9]+ c26"[^>]*><span[^>]*><\/span><\/p>/g, '')
                    .replace(/<p class="c6"[^>]*><span[^>]*><\/span><\/p>/g, '')
                    .replace(/<p class="c13"[^>]*><span[^>]*><\/span><\/p>/g, '')
                    .replace(/<p class="c23"[^>]*><span[^>]*><\/span><\/p>/g, '')
                    .replace(/<p class="c18"[^>]*><span[^>]*><\/span><\/p>/g, '')
                    .replace(/(<p[^>]*>\s*<\/p>\s*){2,}/g, '<p class="spacing-unit"></p>')
                    .replace(/(<br\s*\/?>\s*){3,}/g, '<br /><br />');

                setContent(cleanedHtml);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading litepaper:', err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div id="top"></div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Noto+Sans:wght@600&family=Bruno+Ace&family=Archivo+Black&display=swap"
                rel="stylesheet"
            />

            {/* Fixed Background */}
            <div
                className="fixed inset-0 z-0 bg-black w-full h-full"
                style={{
                    backgroundImage: 'url(/landingPage/background.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="relative z-10 min-h-screen w-full overflow-x-hidden">
                {/* Navigation */}
                <nav
                    className="sticky top-0 z-50 w-full"
                    style={{
                        backgroundColor: 'rgba(36, 36, 36, 0.8)',
                        borderBottom: '1px solid rgba(88, 101, 242, 0.2)'
                    }}
                >
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
                                <Image
                                    src="/litepaperPage/logo_HP_Landscape.png"
                                    width={300}
                                    height={80}
                                    style={{ width: 'clamp(150px, 40vw, 300px)', height: 'auto' }}
                                    alt="Health Protocol"
                                    priority
                                />
                            </Link>
                            <Link
                                href="/"
                                className="rounded-lg font-semibold transition-all transform hover:scale-105 hover:opacity-80 whitespace-nowrap flex-shrink-0"
                                style={{
                                    backgroundColor: '#5865F2',
                                    color: '#242424',
                                    padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
                                    fontSize: 'clamp(13px, 3vw, 16px)'
                                }}
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">

                    {!loading && content && (
                        <div
                            className="litepaper-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}

                    {!loading && (
                        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                            <a
                                href="#top"
                                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center gap-2 hover:opacity-80"
                                style={{ backgroundColor: '#5865F2', color: '#242424' }}
                            >
                                Back to Top
                            </a>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}