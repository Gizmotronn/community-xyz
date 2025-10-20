'use client';

import React from 'react';

export function VideoSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16">
            {/* Main Heading  */}
            <h1
                className="text-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4"
                style={{
                    fontFamily: 'Archivo Black',
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 7vw, 56px)',
                    lineHeight: '110%',
                    color: 'white',
                    maxWidth: '900px',
                }}
            >
                Better health through<br className="hidden sm:block" />{' '}
                <span className="sm:hidden"> </span>decentralised communities
            </h1>

            {/* Video Placeholder  */}
            <div className="w-full">
                <div
                    className="relative flex items-center justify-center bg-transparent border border-white/70 rounded-lg hover:border-white/20 transition-all duration-300 cursor-pointer group w-full"
                    style={{
                        height: 'clamp(300px, 50vw, 480px)'
                    }}
                >
                    <div className="text-center">
                        <svg
                            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <p
                            className="text-white opacity-80 group-hover:opacity-100 transition-opacity mt-2 sm:mt-0"
                            style={{
                                fontFamily: 'Archivo Black',
                                fontSize: 'clamp(18px, 3vw, 29px)',
                                fontWeight: 400,
                                lineHeight: '110%',
                            }}
                        >
                            Video here
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VideoSection;