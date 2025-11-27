"use client"

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export function RoadmapSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const allMilestones = [
        { quarter: "Q3 2023", title: "Web2 product\nlaunch", color: "cyan", icon: "/landingPage/cyan_folder_icon.webp", position: "bottom" },
        { quarter: "Q2 2024", title: "Growth of\nmanaged\ncommunities", color: "cyan", icon: "/landingPage/cyan_folder_icon.webp", position: "top" },
        { quarter: "Q3 2024", title: "Gamification\nengine", color: "pink", icon: "/landingPage/pink_folder_icon.webp", position: "bottom" },
        { quarter: "Q3 2024", title: "Proof of\nactivation & proof\nof humanity on\nchain", color: "pink", icon: "/landingPage/pink_folder_icon.webp", position: "top" },
        { quarter: "Q4 2024", title: "Health Shared\nDAOs", color: "pink", icon: "/landingPage/pink_folder_icon.webp", position: "bottom" },
        { quarter: "Q3 2025", title: "Public offering\nvia launchpad", color: "pink", icon: "/landingPage/pink_folder_icon.webp", position: "top" },
        { quarter: "Q4 2025", title: "TGE", color: "yellow", icon: "/landingPage/orange_folder_icon.webp", position: "bottom" },
        { quarter: "Q4 2025", title: "Listing (CEX\nand DEX)", color: "pink", icon: "/landingPage/pink_folder_icon.webp", position: "top" },
        { quarter: "Q4 2025", title: "Electronic\nhealth record\ningestion", color: "cyan", icon: "/landingPage/cyan_folder_icon.webp", position: "bottom" },
        { quarter: "Q2 2026", title: "Incentivised\nclinical trial\nrecruement\n(Revenue\ngenerator)", color: "cyan", icon: "/landingPage/cyan_folder_icon.webp", position: "top" },
    ];

    const folderPositionConfig = {
        top: {
            offsetX: '0px',
            offsetY: '0px',
        },
        bottom: {
            offsetX: '37px',
            offsetY: '10px',
        }
    };

    const topRowConfig = {
        translateX: '-70%',
        lineHeight: '63px',
        lineWidth: '3px',
        dotSize: '12px',
        dotMarginTop: '-5px',
        dotMarginBottom: '0px',
        lineMarginTop: '-15px',
    };

    const bottomRowConfig = {
        translateX: '-49%',
        lineHeight: '63px',
        lineWidth: '3px',
        dotSize: '12px',
        dotMarginTop: '0px',
        dotMarginBottom: '0px',
        lineMarginBottom: '-25.5px',
    };

    const getColorClasses = (color: string) => {
        switch (color) {
            case "cyan":
                return {
                    dot: "bg-[#00D7E9]",
                    line: "bg-[#00D7E9]",
                    shadow: "shadow-[0_0_15px_rgba(0,215,233,0.8)]"
                };
            case "pink":
                return {
                    dot: "bg-[#E1767D]",
                    line: "bg-[#E1767D]",
                    shadow: "shadow-[0_0_15px_rgba(225,118,125,0.8)]"
                };
            case "yellow":
                return {
                    dot: "bg-[#FF9400]",
                    line: "bg-[#FF9400]",
                    shadow: "shadow-[0_0_15px_rgba(255,148,0,0.8)]"
                };
            default:
                return {
                    dot: "bg-[#00D7E9]",
                    line: "bg-[#00D7E9]",
                    shadow: "shadow-[0_0_15px_rgba(0,215,233,0.8)]"
                };
        }
    };

    // Base width at which the design looks perfect (your current design width)
    const BASE_WIDTH = 1400;

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // Calculate scale, but cap it at 1 (don't scale up beyond original)
                const newScale = Math.min(containerWidth / BASE_WIDTH, 1);
                setScale(newScale);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <section id="roadmap" className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent overflow-hidden">            <div className="container mx-auto px-4 relative z-10">
            <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Roadmap
            </h2>

            {/* Outer container for measuring available width */}
            <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
                {/* Scaled container wrapper */}
                <div
                    className="relative mx-auto"
                    style={{
                        height: `${600 * scale}px`,
                        width: '100%',
                    }}
                >
                    {/* The actual roadmap content - scales as one unit */}
                    <div
                        className="absolute left-1/2 origin-top"
                        style={{
                            transform: `translateX(-50%) scale(${scale})`,
                            width: '1400px',
                            minHeight: '600px',
                        }}
                    >
                        {/* Main Timeline Container */}
                        <div className="relative flex justify-between items-center" style={{ height: '484px' }}>

                            {/* Main Horizontal Timeline Line */}
                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0">
                                <div className="relative h-[3px] bg-white">
                                    {/* Arrow at the end */}
                                    <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-0 h-0 
                                            border-t-[10px] border-t-transparent 
                                            border-b-[10px] border-b-transparent 
                                            border-l-[16px] border-l-white"
                                    />
                                </div>
                            </div>

                            {/* Milestones */}
                            {allMilestones.map((milestone, index) => {
                                const colors = getColorClasses(milestone.color);
                                const isTop = milestone.position === "top";
                                const config = isTop ? topRowConfig : bottomRowConfig;
                                const folderOffset = isTop ? folderPositionConfig.top : folderPositionConfig.bottom;

                                const horizontalPosition = (index / (allMilestones.length - 1)) * 100;

                                return (
                                    <div
                                        key={index}
                                        className="absolute flex flex-col items-center z-10"
                                        style={{
                                            left: `${horizontalPosition}%`,
                                            transform: `translateX(${config.translateX})`,
                                            top: isTop ? '0' : 'auto',
                                            bottom: !isTop ? '0' : 'auto',
                                        }}
                                    >
                                        {isTop ? (
                                            <>
                                                {/* Top Position: Folder at top */}
                                                <div
                                                    style={{
                                                        transform: `translate(${folderOffset.offsetX}, ${folderOffset.offsetY})`
                                                    }}
                                                >
                                                    <div className="relative w-[203px] h-[186px] transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 cursor-pointer">
                                                        <Image
                                                            src={milestone.icon}
                                                            alt="folder icon"
                                                            width={203}
                                                            height={186}
                                                            className="object-contain w-full h-full"
                                                        />
                                                        {/* Quarter Label */}
                                                        <div className="absolute top-[16px] left-[17px]">
                                                            <div className="text-white text-[20px] font-medium font-['Roboto'] leading-[95%]">
                                                                {milestone.quarter}
                                                            </div>
                                                        </div>
                                                        {/* Main Text */}
                                                        <div className="absolute inset-0 flex items-center justify-center px-3 pt-5">
                                                            <p className="text-white text-center text-[22px] font-light font-['Roboto'] leading-[103%] whitespace-pre-line">
                                                                {milestone.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* TOP ROW: Vertical Line and Dot */}
                                                <div
                                                    className="flex flex-col items-center"
                                                    style={{ marginTop: topRowConfig.lineMarginTop }}
                                                >
                                                    <div
                                                        className={`rounded-full ${colors.dot} ${colors.shadow}`}
                                                        style={{
                                                            width: topRowConfig.dotSize,
                                                            height: topRowConfig.dotSize,
                                                            marginTop: topRowConfig.dotMarginTop
                                                        }}
                                                    />
                                                    {/* Line going down from folder */}
                                                    <div
                                                        className={colors.line}
                                                        style={{
                                                            width: topRowConfig.lineWidth,
                                                            height: topRowConfig.lineHeight
                                                        }}
                                                    />
                                                    {/* Dot at timeline connection */}
                                                    <div
                                                        className={`rounded-full ${colors.dot} ${colors.shadow}`}
                                                        style={{
                                                            width: topRowConfig.dotSize,
                                                            height: topRowConfig.dotSize,
                                                            marginTop: topRowConfig.dotMarginTop
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* BOTTOM ROW: Dot and Vertical Line */}
                                                <div
                                                    className="flex flex-col items-center"
                                                    style={{ marginBottom: bottomRowConfig.lineMarginBottom }}
                                                >
                                                    {/* Dot at timeline connection */}
                                                    <div
                                                        className={`rounded-full ${colors.dot} ${colors.shadow}`}
                                                        style={{
                                                            width: bottomRowConfig.dotSize,
                                                            height: bottomRowConfig.dotSize,
                                                            marginBottom: bottomRowConfig.dotMarginBottom
                                                        }}
                                                    />
                                                    {/* Line going down to folder */}
                                                    <div
                                                        className={colors.line}
                                                        style={{
                                                            width: bottomRowConfig.lineWidth,
                                                            height: bottomRowConfig.lineHeight
                                                        }}
                                                    />
                                                    <div
                                                        className={`rounded-full ${colors.dot} ${colors.shadow}`}
                                                        style={{
                                                            width: bottomRowConfig.dotSize,
                                                            height: bottomRowConfig.dotSize,
                                                            marginBottom: bottomRowConfig.dotMarginBottom
                                                        }}
                                                    />
                                                </div>

                                                {/* Bottom Position: Folder at bottom */}
                                                <div
                                                    style={{
                                                        transform: `translate(${folderOffset.offsetX}, ${folderOffset.offsetY})`
                                                    }}
                                                >
                                                    <div className="relative w-[203px] h-[186px] transition-transform duration-300 ease-out hover:scale-105 hover:translate-y-2 cursor-pointer">
                                                        <Image
                                                            src={milestone.icon}
                                                            alt="folder icon"
                                                            width={203}
                                                            height={186}
                                                            className="object-contain w-full h-full"
                                                        />
                                                        {/* Quarter Label */}
                                                        <div className="absolute top-[16px] left-[17px]">
                                                            <div className="text-white text-[20px] font-medium font-['Roboto'] leading-[95%]">
                                                                {milestone.quarter}
                                                            </div>
                                                        </div>
                                                        {/* Main Text */}
                                                        <div className="absolute inset-0 flex items-center justify-center px-3 pt-5">
                                                            <p className="text-white text-center text-[24px] font-light font-['Roboto'] leading-[103%] whitespace-pre-line">
                                                                {milestone.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}