"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ROTATE_SPEED = 4000; // Cycles every 4 seconds

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

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_SPEED);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPanels);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPanels) % totalPanels);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 bg-transparent select-none overflow-hidden">
      {/* Viewport Control Stage Wrapper — Height dropped to fit shorter layout perfectly */}
      <div className="relative w-full max-w-6xl flex items-center justify-center px-4 h-[420px]">
        {/* Left Arrow Button Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-50 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md text-zinc-800 dark:text-zinc-200 hover:bg-white border border-zinc-200/50 transition-all outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Flat Horizon Film-Strip Rail Container */}
        <div className="relative w-full flex items-center justify-center h-full">
          {panelsData.map((panel, index) => {
            const isActive = index === currentIndex;

            let offsetIndex = index - currentIndex;
            if (offsetIndex < -1) offsetIndex += totalPanels;
            if (offsetIndex > 1) offsetIndex -= totalPanels;

            const isVisible = Math.abs(offsetIndex) <= 1;
            if (!isVisible) return null;

            // Adjusted horizontal spacing gap slightly to match the new wider boundaries cleanly
            const positionX = offsetIndex * 520;

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
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                /* 🛠️ WIDER & SHORTER DIMENSIONS: Width increased to 620px, Height dropped to 380px */
                className={`absolute w-[620px] h-[380px] bg-white rounded-2xl shadow-xl border border-zinc-200/60 overflow-hidden flex flex-col justify-end
                  ${isActive ? "cursor-default" : "cursor-pointer"}
                `}
                onClick={() => {
                  if (!isActive) setCurrentIndex(index);
                }}
              >
                {/* Visual Asset Canvas Area — Expanded to show raw image content text clearly */}
                <div className="absolute inset-x-0 top-0 bottom-[75px] bg-transparent flex items-center justify-center p-5">
                  <div className="relative w-full h-full">
                    <Image
                      src={panel.imageSrc}
                      alt={panel.title}
                      fill
                      className="object-contain p-1"
                      priority
                      unoptimized
                      sizes="620px"
                    />
                  </div>
                </div>

                {/* Solid Black Bottom Label Footer Block */}
                <div className="absolute bottom-0 left-0 w-full h-[75px] bg-black dark:bg-zinc-950 px-6 py-3.5 border-t border-zinc-800 z-20 flex flex-col justify-center text-left">
                  <h4 className="text-white font-black text-sm tracking-widest uppercase">
                    {panel.title}
                  </h4>
                  <div className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-0.5">
                    {panel.subtitle}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow Button Controls */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md text-zinc-800 dark:text-zinc-200 hover:bg-white border border-zinc-200/50 transition-all outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Dot Rails */}
      <div className="flex items-center gap-3 mt-6 z-40">
        {panelsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 outline-none shadow-sm
              ${currentIndex === index ? "w-8 bg-black dark:bg-white" : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
