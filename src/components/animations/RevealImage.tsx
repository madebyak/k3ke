"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealImageProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

// A reusable component that takes an image (or placeholder div)
// It fades the image in as it scrolls into view.
export default function RevealImage({
    children,
    delay = 0,
    duration = 1.2,
    className = "",
}: RevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const inner = containerRef.current.querySelector('.reveal-image-inner');
        if (!inner) return;

        // Start state: fully transparent
        gsap.set(inner, { opacity: 0 });

        gsap.to(inner, {
            opacity: 1,
            duration: duration,
            ease: "power2.out",
            delay: delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom", // Trigger exactly when it enters the viewport
                toggleActions: "play none none none",
            },
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            <div
                className="reveal-image-inner w-full h-full"
            >
                {children}
            </div>
        </div>
    );
}
