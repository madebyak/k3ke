"use client";

import { useState, useEffect } from "react";

export default function GridOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  // Prevent hydration mismatch by only showing after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Sticky Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[9999] rounded bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black"
        title="Toggle Layout Grid"
      >
        Grid: {isVisible ? "ON" : "OFF"}
      </button>

      {/* Grid Overlay */}
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9998] flex w-full justify-center">
          {/* Main Container mirroring the actual app's max-width and padding */}
          <div className="w-full h-full px-4 sm:px-6 md:px-6.25 max-w-7xl mx-auto">
            <div className="grid h-full w-full grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-4 md:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full w-full flex-col bg-red-500/10 ${i >= 8 ? "hidden lg:flex" : i >= 4 ? "hidden sm:flex" : "flex"}`}
                >
                  <div className="flex w-full items-start justify-center pt-4">
                    <span className="rounded bg-red-500/20 px-1 py-0.5 text-[10px] sm:text-xs font-bold text-red-600">
                      {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
