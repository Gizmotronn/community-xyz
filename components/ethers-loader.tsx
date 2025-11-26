'use client';

import { useEffect } from 'react';

export default function EthersLoader() {
    useEffect(() => {
        let isLoaded = false;
        let loadTimeout: NodeJS.Timeout;

        const checkEthersAvailability = () => {
            return typeof window !== 'undefined' && (window as any).ethers;
        };

        const loadEthersScript = (src: string, onSuccess: () => void, onError: () => void) => {
            const script = document.createElement('script');
            script.src = src;
            script.crossOrigin = 'anonymous';
            script.onload = onSuccess;
            script.onerror = onError;
            document.head.appendChild(script);
        };

        const tryLoadEthers = () => {
            if (checkEthersAvailability()) {
                console.log('Ethers already loaded:', (window as any).ethers.version);
                isLoaded = true;
                return;
            }

            // Primary CDN - ethers.io
            loadEthersScript(
                'https://cdn.ethers.io/lib/ethers-5.7.umd.min.js',
                () => {
                    if (checkEthersAvailability() && !isLoaded) {
                        console.log('Ethers loaded from primary CDN:', (window as any).ethers.version);
                        isLoaded = true;
                    }
                },
                () => {
                    console.warn('Primary CDN failed, trying unpkg...');
                    // Fallback 1 - unpkg
                    loadEthersScript(
                        'https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js',
                        () => {
                            if (checkEthersAvailability() && !isLoaded) {
                                console.log('Ethers loaded from unpkg CDN:', (window as any).ethers.version);
                                isLoaded = true;
                            }
                        },
                        () => {
                            console.warn('Unpkg CDN failed, trying jsdelivr...');
                            // Fallback 2 - jsdelivr
                            loadEthersScript(
                                'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js',
                                () => {
                                    if (checkEthersAvailability() && !isLoaded) {
                                        console.log('Ethers loaded from jsdelivr CDN:', (window as any).ethers.version);
                                        isLoaded = true;
                                    }
                                },
                                () => {
                                    console.error('All ethers CDN sources failed to load');
                                }
                            );
                        }
                    );
                }
            );
        };

        tryLoadEthers();

    
        loadTimeout = setTimeout(() => {
            if (!isLoaded) {
                console.warn('Ethers loading timeout - trying one more time');
                tryLoadEthers();
            }
        }, 5000);

        // Cleanup function
        return () => {
            if (loadTimeout) {
                clearTimeout(loadTimeout);
            }

            const scripts = document.querySelectorAll('script[src*="ethers"]');
            scripts.forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
        };
    }, []);

    return null;
}