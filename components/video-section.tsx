'use client';

import React, { useRef, useState } from 'react';

export function VideoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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

            {/* Video Container */}
            <div className="w-full">
                <div
                    className="relative overflow-hidden bg-black border border-white/70 rounded-lg hover:border-white/20 transition-all duration-300 w-full"
                    style={{
                        height: 'clamp(300px, 50vw, 480px)'
                    }}
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/health-shared-public/health_protocol/health_protocol.mp4"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={handlePlayPause}
                    />

                    {/* Play Button Overlay - Only shows when paused */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
                            onClick={handlePlayPause}
                        >
                            <div className="text-center">
                                <svg
                                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default VideoSection;