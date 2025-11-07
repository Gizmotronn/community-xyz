"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LitepaperPage() {
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDocContent();
    }, []);

    const fetchDocContent = async () => {
        try {
            const response = await fetch('/api/litepaper', {
                cache: 'no-store'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch document');
            }

            const data = await response.json();

            if (data.success && data.content) {
                setContent(data.content);
            } else {
                throw new Error('Invalid response format');
            }

            setLoading(false);
        } catch (err) {
            console.error('Error fetching document:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setLoading(false);
        }
    };

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
                className="fixed inset-0 z-0 bg-black"
                style={{
                    backgroundImage: 'url(/landingPage/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="relative z-10 min-h-screen">
                {/* Navigation */}
                <nav className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(36, 36, 36, 0.8)', borderBottom: '1px solid rgba(88, 101, 242, 0.2)' }}>
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
                                <Image
                                    src="/litepaperPage/logo_HP_Landscape.png"
                                    width={300}
                                    height={80}
                                    style={{ width: 'clamp(150px, 40vw, 300px)', height: 'auto' }}
                                    alt="Health Protocol"
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
                    {loading && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                                style={{ borderColor: '#5865F2', borderTopColor: 'transparent' }}>
                            </div>
                            <p className="text-lg" style={{ color: '#FFFFFF' }}>Loading...</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-6 rounded-xl mb-8"
                            style={{ backgroundColor: 'rgba(225, 118, 125, 0.2)', border: '1px solid rgba(225, 118, 125, 0.5)' }}>
                            <h2 className="text-xl font-bold mb-2" style={{ color: '#E1767D' }}>Error Loading Document</h2>
                            <p style={{ color: '#FFFFFF' }}>{error}</p>
                            <p className="mt-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Please ensure the Google Doc is set to "Anyone with the link can view"
                            </p>
                        </div>
                    )}

                    {!loading && !error && content && (
                        <div
                            className="google-doc-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                            style={{
                                color: '#FFFFFF',
                                lineHeight: '1.8'
                            }}
                        />
                    )}

                    {/* Back to Top Button */}
                    {!loading && !error && (
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