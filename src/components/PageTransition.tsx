"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Freezes the router context for the exiting page so it doesn't instantly swap
// its content to the new page during the exit animation.
function FrozenRouter({ children }: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const [frozen] = useState(context);

    if (!context) return <>{children}</>;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

// Home ("") = Work page (index 0), Bio (index 1)
const ROUTE_ORDER = ["", "bio", "contact"];

function getRouteIndex(pathname: string): number {
    const segment = pathname.split("/").pop() || "";
    const idx = ROUTE_ORDER.indexOf(segment);
    return idx === -1 ? 0 : idx;
}

function getSegment(pathname: string): string {
    return pathname.split("/").pop() || "";
}

// Match the exact custom pageTransition2 curve from Codrops
const codropsEase = [0.178, 0.031, 0.374, 1] as [number, number, number, number];

type TransitionContext = {
    direction: number;
    isEnteringContact: boolean;
    isExitingContact: boolean;
};

const variants = {
    enter: (context: TransitionContext) => {
        if (context.isEnteringContact) {
            // Contact page sliding Up from bottom
            return {
                y: "100%",
                x: "0%",
                scale: 1,
                opacity: 1,
                zIndex: 20, // Must be above the exiting page
            };
        }

        if (context.isExitingContact) {
            // New page sitting underneath as Contact slides back down
            return {
                y: "0%",
                x: "0%",
                scale: 1,
                opacity: 0.99, // Force animation so it doesn't instantly snap
                zIndex: 0,
            }
        }

        // Default horizontal slide
        return {
            y: "0%",
            x: context.direction >= 0 ? "-100%" : "100%",
            scale: 1,
            opacity: 1,
            zIndex: 10,
        };
    },
    center: (context: TransitionContext) => {
        return {
            y: "0%",
            x: "0%",
            scale: 1,
            opacity: 1,
            zIndex: context.isEnteringContact ? 20 : (context.isExitingContact ? 0 : 10),
        };
    },
    exit: (context: TransitionContext) => {
        if (context.isEnteringContact) {
            // Old page sitting still as Contact slides over it
            return {
                y: "0%",
                x: "0%",
                scale: 1,
                opacity: 0.99, // Force Framer Motion to not instantly unmount the old page
                zIndex: 0,
            };
        }

        if (context.isExitingContact) {
            // Contact page sliding back DOWN to bottom
            return {
                y: "100%",
                x: "0%",
                scale: 1,
                opacity: 1,
                zIndex: 20,
            }
        }

        // Default horizontal slide
        return {
            y: "0%",
            x: context.direction >= 0 ? "50%" : "-50%",
            scale: 0.8,
            opacity: 0.4,
            zIndex: 0,
        };
    },
};

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const segment = getSegment(pathname);

    const currentIndex = getRouteIndex(pathname);

    const [routeState, setRouteState] = useState({
        prevIdx: currentIndex,
        prevSeg: segment,
        currentIdx: currentIndex,
        currentSeg: segment,
        direction: 0
    });

    let { prevIdx, prevSeg, direction } = routeState;

    if (currentIndex !== routeState.currentIdx || segment !== routeState.currentSeg) {
        prevIdx = routeState.currentIdx;
        prevSeg = routeState.currentSeg;
        direction = currentIndex - routeState.currentIdx;
        setRouteState({
            prevIdx,
            prevSeg,
            currentIdx: currentIndex,
            currentSeg: segment,
            direction
        });
    }

    const transitionContext: TransitionContext = {
        direction,
        isEnteringContact: segment === "contact",
        isExitingContact: prevSeg === "contact",
    };

    // Disable Next.js default scroll restoration so it doesn't jump during transitions
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // route state is now updated during render to avoid layout issues

    return (
        // We use a CSS Grid to stack the entering and exiting pages on top of each other
        // This allows the container to naturally expand to the height of the content, fixing the scrolling issue
        // overflow-x: hidden prevents horizontal scrollbars during the slide transition
        // overflow-y: hidden during transition to prevent scrollbars when sliding up/down (handled by Framer Motion usually, but good safeguard)
        <div style={{ display: "grid", minHeight: "100vh", backgroundColor: "black" }}>
            <AnimatePresence custom={transitionContext} initial={false}>
                <motion.div
                    key={pathname}
                    custom={transitionContext}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 1.4,
                        ease: codropsEase,
                    }}
                    style={{
                        gridArea: "1 / 1 / 2 / 2",
                        backgroundColor: "white", // prevents seeing through the page during slide
                    }}
                >
                    <FrozenRouter>
                        {children}
                    </FrozenRouter>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
