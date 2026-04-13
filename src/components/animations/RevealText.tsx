"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealTextProps {
    children: React.ReactNode;
    delay?: number;
    stagger?: number;
    duration?: number;
    className?: string;
}

// A reusable component that takes text, splits it by lines (handling <br/> and \n),
// and animates each line sliding up from an invisible bounding box.
export default function RevealText({
    children,
    delay = 0,
    stagger = 0.1,
    duration = 1.2,
    className = "",
}: RevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Recursive helper to find text nodes and wrap each word in the Reveal structure
    const wrapTextNodes = (nodes: React.ReactNode): React.ReactNode => {
        return React.Children.map(nodes, (child) => {
            if (typeof child === "string") {
                // Split string by whitespace but preserve the spaces
                const parts = child.split(/(\s+)/);
                return parts.map((part, i) => {
                    if (part.trim() === "") {
                        return <span key={i}>{part}</span>;
                    }
                    return (
                        <span
                            key={i}
                            className="reveal-line-outer inline-block"
                            style={{
                                overflow: "hidden",
                                display: "inline-block",
                                // Baseline alignment: inner span's baseline matches parent's.
                                // paddingTop/Bottom extend the clipping region above/below
                                // the natural content box without shifting glyphs.
                                // Negative margins cancel the extra space so layout is unchanged.
                                verticalAlign: "baseline",
                                paddingTop: "1em",        // generous room for Arabic tall ascenders
                                marginTop: "-1em",        // cancel the above exactly
                                paddingBottom: "1em",     // room for Arabic dots/descenders (increased from 0.6em)
                                marginBottom: "-1em",     // cancel the above exactly
                                paddingLeft: "0.1em",
                                paddingRight: "0.1em",
                                marginLeft: "-0.1em",
                                marginRight: "-0.1em",
                            }}
                        >
                            <span
                                className="reveal-line-inner inline-block"
                                style={{
                                    willChange: "transform",
                                    transformOrigin: "center top",
                                }}
                            >
                                {part}
                            </span>
                        </span>
                    );
                });
            }

            if (React.isValidElement(child)) {
                // If it's a <br/>, we just return it
                if (child.type === "br") return child;

                // Otherwise, clone the element and recursively wrap its children
                const element = child as React.ReactElement<{ children?: React.ReactNode }>;
                return React.cloneElement(element, {
                    children: wrapTextNodes(element.props.children),
                });
            }

            return child;
        });
    };

    const enhancedChildren = wrapTextNodes(children);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Grab all the individual word spans
        const wordElements = gsap.utils.toArray('.reveal-line-inner', containerRef.current) as HTMLElement[];
        if (wordElements.length === 0) return;

        // 2. Group by rendered vertical position (line grouping)
        const linesMap = new Map<number, HTMLElement[]>();
        wordElements.forEach((el) => {
            const top = Math.round(el.offsetTop);
            if (!linesMap.has(top)) linesMap.set(top, []);
            linesMap.get(top)!.push(el);
        });
        const linesArray = Array.from(linesMap.keys())
            .sort((a, b) => a - b)
            .map(offset => linesMap.get(offset)!);

        // 3. Set initial hidden state
        gsap.set(wordElements, { y: "110%" });

        // 4. Build the reveal animation
        const playReveal = () => {
            const tl = gsap.timeline({ delay });
            linesArray.forEach((lineElements, index) => {
                tl.to(lineElements, {
                    y: "0%",
                    duration,
                    ease: "power4.out",
                    force3D: true,
                }, index * stagger);
            });
        };

        // 5. KEY FIX: Determine if this element is "above the fold" in document space.
        //
        //    We CANNOT use getBoundingClientRect() here because during a page-transition
        //    the ancestor motion.div has `transform: translateY(100%)` applied by Framer
        //    Motion. This shifts the bounding box off-screen even though the element will
        //    be visible once the transition completes.
        //
        //    Instead, we walk up the DOM to compute the element's true offset from the
        //    document top (unaffected by CSS transforms), and compare it to the viewport
        //    height. If the element's document-top is less than the viewport height, it
        //    will be in view as soon as the page is at scroll position 0 — so we play
        //    immediately. Otherwise we use ScrollTrigger.
        //
        const getDocumentTop = (el: HTMLElement): number => {
            let top = 0;
            let current: HTMLElement | null = el;
            while (current) {
                top += current.offsetTop;
                current = current.offsetParent as HTMLElement | null;
            }
            return top;
        };

        const documentTop = getDocumentTop(containerRef.current);
        const isAboveFold = documentTop < window.innerHeight * 0.95;

        if (isAboveFold) {
            // Element is in the first screenful of the document → play immediately.
            // This works correctly even when navigating via page transitions because
            // we're checking document coordinates, not viewport coordinates.
            playReveal();
        } else {
            // Element is below the fold → use ScrollTrigger to trigger on scroll
            const st = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 95%",
                once: true,
                onEnter: playReveal,
            });
            return () => st.kill();
        }

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {enhancedChildren}
        </div>
    );
}
