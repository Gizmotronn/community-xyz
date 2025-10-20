'use client';

import React from 'react';
import Image from 'next/image';

const Flywheel = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center pt-10 pb-20 px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center">
                {/* Title - Fully Responsive */}
                <h1
                    className="text-white text-center mb-4 sm:mb-6"
                    style={{
                        fontFamily: 'Archivo Black',
                        fontSize: 'clamp(32px, 5vw, 56px)',
                        fontWeight: '700',
                        lineHeight: '103%',
                    }}
                >
                    The Flywheel
                </h1>

                {/* Subtitles - Fully Responsive */}
                <p
                    className="text-white text-center mb-1 sm:mb-2 px-2"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 'clamp(16px, 2.5vw, 26px)',
                        fontWeight: '300',
                        lineHeight: '120%',
                    }}
                >
                    The more we collaborate, the more we all win.
                </p>

                <p
                    className="text-white text-center mb-4 sm:mb-5 px-2"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 'clamp(16px, 2.5vw, 26px)',
                        fontWeight: '300',
                        lineHeight: '120%',
                    }}
                >
                    Flywheel up. Friction down. Let's go.
                </p>

                <div className="flywheel-container">
                    <div className="diagram-wrapper">
                        {/* Top Left Folder - Community Participation */}
                        <div
                            className="absolute"
                            style={{
                                left: '55px',
                                top: '-60px',
                                width: '204.5px',
                                height: '186px',
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/landingPage/folder.png"
                                    alt="Folder"
                                    width={204.5}
                                    height={186}
                                    className="object-contain"
                                />
                                <div className="absolute top-1 left-6 right-6 flex flex-col">
                                    <Image
                                        src="/landingPage/community_participation.png"
                                        alt="Community Participation"
                                        width={62}
                                        height={42}
                                        className="object-contain mb-1"
                                    />
                                </div>
                                <div className="absolute left-6 right-6 flex flex-col" style={{ top: '55px' }}>
                                    <h3 className="text-white font-bold text-center mb-3" style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                                        Community<br />Participation
                                    </h3>
                                    <p className="text-white text-center" style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                                        Early actions spin<br />the flywheel faster
                                    </p>
                                </div>
                            </div>
                            {/* Connection Point (Ellipse) - Animated */}
                            <div className="absolute ellipse-1" style={{ bottom: '-188px', right: '-27px', zIndex: 20 }}>
                                <Image
                                    src="/landingPage/ellipse.png"
                                    alt="Connection"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Line 1: Community Participation to Better Scorecards (Animated) */}
                        <div className="absolute line-1" style={{ left: '162px', top: '108px', zIndex: 15, transform: 'rotate(1.75deg)', transformOrigin: 'left top' }}>
                            <Image
                                src="/landingPage/line.png"
                                alt="Connection Line"
                                width={120}
                                height={5}
                                className="object-contain"
                            />
                        </div>

                        {/* Top Right Folder - Community Growth */}
                        <div
                            className="absolute"
                            style={{
                                right: '60px',
                                top: '-60px',
                                width: '204.5px',
                                height: '188px',
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/landingPage/folder.png"
                                    alt="Folder"
                                    width={204.5}
                                    height={188}
                                    className="object-contain"
                                />
                                <div className="absolute top-3 left-6 right-6 flex flex-col">
                                    <Image
                                        src="/landingPage/community_growth.png"
                                        alt="Community Growth"
                                        width={52}
                                        height={52}
                                        className="object-contain mb-2"
                                    />
                                </div>
                                <div className="absolute left-6 right-6 flex flex-col" style={{ top: '56px' }}>
                                    <h3 className="text-white font-bold text-center mt-2" style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                                        Community<br />Growth
                                    </h3>
                                    <p className="text-white text-center" style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                                        Incentives grow<br />more communities
                                    </p>
                                </div>
                            </div>
                            {/* Connection Point (Ellipse) - Animated */}
                            <div className="absolute ellipse-4" style={{ bottom: '2px', left: '87px', zIndex: 20 }}>
                                <Image
                                    src="/landingPage/ellipse.png"
                                    alt="Connection"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Line 4: Better Incentives to Community Growth (Animated) */}
                        <div className="absolute line-4" style={{ left: '1214px', top: '306px', zIndex: 15, transform: 'rotate(243.6deg)', transformOrigin: 'left top' }}>
                            <Image
                                src="/landingPage/line.png"
                                alt="Connection Line"
                                width={122}
                                height={5}
                                className="object-contain"
                            />
                        </div>

                        {/* Middle Left Folder - Better Scorecards */}
                        <div
                            className="absolute"
                            style={{
                                left: '270px',
                                top: '200px',
                                width: '204.5px',
                                height: '187px',
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/landingPage/folder.png"
                                    alt="Folder"
                                    width={204.5}
                                    height={187}
                                    className="object-contain"
                                />
                                <div className="absolute top-2 left-6 right-6 flex flex-col">
                                    <Image
                                        src="/landingPage/better_scorecard.png"
                                        alt="Better Scorecards"
                                        width={50}
                                        height={50}
                                        className="object-contain mb-2"
                                    />
                                </div>
                                <div className="absolute left-6 right-6 flex flex-col" style={{ top: '55px' }}>
                                    <h3 className="text-white font-bold text-center mb-3" style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                                        Better<br />Scorecards
                                    </h3>
                                    <p className="text-white text-center" style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                                        Collaboration drives<br />measurable results
                                    </p>
                                </div>
                            </div>
                            {/* Connection Point (Ellipse) - Animated */}
                            <div className="absolute ellipse-2" style={{ top: '230px', right: '-185px', zIndex: 20 }}>
                                <Image
                                    src="/landingPage/ellipse.png"
                                    alt="Connection"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Line 2: Better Scorecards to More Funding (Animated) */}
                        <div className="absolute line-2" style={{ left: '457px', top: '367px', zIndex: 1, transform: 'rotate(-36.96deg)', transformOrigin: 'left top' }}>
                            <Image
                                src="/landingPage/line.png"
                                alt="Connection Line"
                                width={110}
                                height={5}
                                className="object-contain"
                            />
                        </div>

                        {/* Middle Right Folder - Better Incentives */}
                        <div
                            className="absolute"
                            style={{
                                right: '270px',
                                top: '205px',
                                width: '204.5px',
                                height: '186px',
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/landingPage/folder.png"
                                    alt="Folder"
                                    width={204.5}
                                    height={186}
                                    className="object-contain"
                                />
                                <div className="absolute top-3 left-6 right-6 flex flex-col">
                                    <Image
                                        src="/landingPage/better_incentives.png"
                                        alt="Better Incentives"
                                        width={62}
                                        height={62}
                                        className="object-contain mb-2"
                                    />
                                </div>
                                <div className="absolute left-6 right-6 flex flex-col" style={{ top: '75px' }}>
                                    <h3 className="text-white font-bold text-center mb-3 mt-4" style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                                        Better Incentives
                                    </h3>
                                    <p className="text-white text-center" style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                                        Funding fuels rewards
                                    </p>
                                </div>
                            </div>
                            {/* Connection Point (Ellipse) - Animated */}
                            <div className="absolute ellipse-3" style={{ top: '158px', left: '-5px', zIndex: 20 }}>
                                <Image
                                    src="/landingPage/ellipse.png"
                                    alt="Connection"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Line 3: More Funding to Better Incentives (Animated) */}
                        <div className="absolute line-3" style={{ left: '829px', top: '450px', zIndex: 15, transform: 'rotate(-79.22deg)', transformOrigin: 'left top' }}>
                            <Image
                                src="/landingPage/line.png"
                                alt="Connection Line"
                                width={115}
                                height={5}
                                className="object-contain"
                            />
                        </div>

                        {/* Bottom Center Folder - More Funding */}
                        <div
                            className="absolute"
                            style={{
                                left: '50%',
                                transform: 'translateX(-52%)',
                                top: '280px',
                                width: '204.5px',
                                height: '186px',
                                zIndex: 10,
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/landingPage/folder.png"
                                    alt="Folder"
                                    width={204.5}
                                    height={186}
                                    className="object-contain"
                                />
                                <div className="absolute top-4 left-6 right-6 flex flex-col">
                                    <Image
                                        src="/landingPage/more_funding.png"
                                        alt="More Funding"
                                        width={54}
                                        height={54}
                                        className="object-contain mb-2"
                                    />
                                </div>
                                <div className="absolute left-6 right-6 flex flex-col" style={{ top: '67px' }}>
                                    <h3 className="text-white font-bold text-center mb-3 mt-4" style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                                        More Funding
                                    </h3>
                                    <p className="text-white text-center" style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                                        Scorecards attract<br />support
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Earth Center */}
                        <div
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 5,
                            }}
                        >
                            <Image
                                src="/landingPage/earth.gif"
                                alt="Earth rotating"
                                width={371}
                                height={381}
                                className="object-contain"
                                unoptimized
                                priority
                                style={{
                                    filter: 'brightness(0.7)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flywheel;