"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulseSpeed: number;
    pulseOffset: number;
}

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Initialize particles
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseOffset: Math.random() * Math.PI * 2
        }));

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            timeRef.current += 0.016;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient overlay
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2
            );
            gradient.addColorStop(0, 'rgba(0, 215, 233, 0.02)'); // cyan
            gradient.addColorStop(0.5, 'rgba(255, 148, 0, 0.01)'); // orange
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;

            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Pulsing opacity
                const pulse = Math.sin(timeRef.current * particle.pulseSpeed + particle.pulseOffset);
                const currentOpacity = particle.opacity + pulse * 0.2;

                const isCyan = i % 2 === 0;
                const color = isCyan ? '0, 215, 233' : '255, 148, 0';

                // Draw particle with glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${color}, ${currentOpacity})`;
                ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections to nearby particles
                particles.slice(i + 1).forEach((otherParticle, j) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.3 * currentOpacity;

                        const isOtherCyan = (i + j + 1) % 2 === 0;
                        const connectionColor = isOtherCyan ? '0, 215, 233' : '255, 148, 0';

                        ctx.shadowBlur = 0;
                        ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            {/* Base background image */}
            <Image
                src="/landingPage/background.webp"
                alt="Background"
                fill
                priority
                className="object-cover"
            />

            {/* Animated canvas overlay */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ mixBlendMode: 'screen' }}
            />

            {/* Subtle overlay for depth */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
                style={{ pointerEvents: 'none' }}
            />
        </div>
    );
}