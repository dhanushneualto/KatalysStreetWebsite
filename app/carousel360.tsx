"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ROTATE_SPEED = 10000; // Cycles every 10 seconds

export default function CarouselFlat() {
  const panelsData = [
    {
      imageSrc: "/nasdaqbanner.png",
      title: "Nasdaq Times Square",
      subtitle: "Inaugurating the EDGE Forum",
    },
    {
      imageSrc: "/marketplace.png",
      title: "Google Cloud Marketplace",
      subtitle: "Live Enterprise AI Products",
    },
    {
      imageSrc: "/gcp.png",
      title: "Strategic Alliance",
      subtitle: "Official Google Cloud Partner",
    },
  ];

  const totalPanels = panelsData.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance for mobile swipe detection
  const minSwipeDistance = 50;

  // Detect mobile device on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_SPEED);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPanels);
  }, [totalPanels]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPanels) % totalPanels);
  }, [totalPanels]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Calculate carousel dimensions based on screen size
  const getCardDimensions = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return { width: "90vw", height: "280px", maxWidth: "400px" };
      } else if (window.innerWidth < 768) {
        return { width: "85vw", height: "320px", maxWidth: "500px" };
      } else if (window.innerWidth < 1024) {
        return { width: "600px", height: "360px" };
      }
    }
    return { width: "620px", height: "380px" };
  };

  const [dimensions, setDimensions] = useState(getCardDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getCardDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 bg-transparent select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Viewport Control Stage Wrapper */}
      <div className="relative w-full max-w-6xl flex items-center justify-center px-2 sm:px-4 h-[320px] sm:h-[380px] md:h-[420px]">
        {/* Left Arrow Button Controls - Hidden on mobile unless screen is wide enough */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-2 md:left-4 z-50 p-2 sm:p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md text-zinc-800 dark:text-zinc-200 hover:bg-white border border-zinc-200/50 transition-all outline-none backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Mobile-optimized Card Container */}
        {isMobile ? (
          // Mobile: Single card swipe view
          <div className="relative w-full flex items-center justify-center h-full px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="absolute w-full max-w-[400px] h-[280px] sm:h-[320px] bg-white rounded-2xl shadow-xl border border-zinc-200/60 overflow-hidden flex flex-col justify-end"
                style={{
                  width: "90%",
                  maxWidth: "400px",
                  height: "280px",
                }}
              >
                {/* Visual Asset Canvas Area */}
                <div className="absolute inset-x-0 top-0 bottom-[65px] sm:bottom-[75px] bg-transparent flex items-center justify-center p-3 sm:p-5">
                  <div className="relative w-full h-full">
                    <Image
                      src={panelsData[currentIndex].imageSrc}
                      alt={panelsData[currentIndex].title}
                      fill
                      className="object-contain p-1"
                      priority
                      unoptimized
                      sizes="(max-width: 400px) 100vw, 400px"
                    />
                  </div>
                </div>

                {/* Solid Black Bottom Label Footer Block */}
                <div className="absolute bottom-0 left-0 w-full h-[65px] sm:h-[75px] bg-black dark:bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3.5 border-t border-zinc-800 z-20 flex flex-col justify-center text-left">
                  <h4 className="text-white font-black text-xs sm:text-sm tracking-widest uppercase">
                    {panelsData[currentIndex].title}
                  </h4>
                  <div className="text-[8px] sm:text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-0.5">
                    {panelsData[currentIndex].subtitle}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          // Desktop: Flat Horizon Film-Strip Rail Container
          <div className="relative w-full flex items-center justify-center h-full">
            {panelsData.map((panel, index) => {
              const isActive = index === currentIndex;

              let offsetIndex = index - currentIndex;
              if (offsetIndex < -1) offsetIndex += totalPanels;
              if (offsetIndex > 1) offsetIndex -= totalPanels;

              const isVisible = Math.abs(offsetIndex) <= 1;
              if (!isVisible) return null;

              // Adjusted horizontal spacing gap for different screen sizes
              const getPositionX = () => {
                if (typeof window !== "undefined") {
                  if (window.innerWidth < 1024) return offsetIndex * 450;
                }
                return offsetIndex * 520;
              };

              const positionX = getPositionX();

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: positionX,
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.35,
                    zIndex: isActive ? 30 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                  }}
                  className="absolute w-[90%] md:w-[600px] lg:w-[620px] h-[320px] sm:h-[360px] md:h-[380px] bg-white rounded-2xl shadow-xl border border-zinc-200/60 overflow-hidden flex flex-col justify-end"
                  style={{
                    maxWidth: "620px",
                    height: dimensions.height,
                  }}
                  onClick={() => {
                    if (!isActive) setCurrentIndex(index);
                  }}
                  role="button"
                  tabIndex={isActive ? -1 : 0}
                  aria-label={`View ${panel.title}`}
                >
                  {/* Visual Asset Canvas Area */}
                  <div className="absolute inset-x-0 top-0 bottom-[65px] sm:bottom-[75px] bg-transparent flex items-center justify-center p-3 sm:p-5">
                    <div className="relative w-full h-full">
                      <Image
                        src={panel.imageSrc}
                        alt={panel.title}
                        fill
                        className="object-contain p-1"
                        priority
                        unoptimized
                        sizes="(max-width: 768px) 600px, 620px"
                      />
                    </div>
                  </div>

                  {/* Solid Black Bottom Label Footer Block */}
                  <div className="absolute bottom-0 left-0 w-full h-[65px] sm:h-[75px] bg-black dark:bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3.5 border-t border-zinc-800 z-20 flex flex-col justify-center text-left">
                    <h4 className="text-white font-black text-xs sm:text-sm tracking-widest uppercase">
                      {panel.title}
                    </h4>
                    <div className="text-[8px] sm:text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-0.5">
                      {panel.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Right Arrow Button Controls */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-2 md:right-4 z-50 p-2 sm:p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md text-zinc-800 dark:text-zinc-200 hover:bg-white border border-zinc-200/50 transition-all outline-none backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Navigation Dot Rails - Enhanced for mobile touch */}
      <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 z-40">
        {panelsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 outline-none shadow-sm
              ${
                currentIndex === index
                  ? "w-6 sm:w-8 bg-black dark:bg-white"
                  : "w-2 sm:w-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
          />
        ))}
      </div>

      {/* Mobile swipe indicator (shown only on first visit) */}
      {isMobile && (
        <div className="text-[10px] text-zinc-400 mt-3 sm:hidden">
          ← Swipe to navigate →
        </div>
      )}
    </div>
  );
}
