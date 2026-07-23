"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StageData {
  id: string;
  stageNum: string;
  title: string;
  shortDesc: string;
  buttonLabel: string;
  strategyTitle: string;
  strategyItems: string[];
  deliverablesTitle: string;
  deliverablesItems: string[];
}

export default function JourneySection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stages: StageData[] = [
    {
      id: "strategy",
      stageNum: "STAGE 01",
      title: "Strategy",
      shortDesc:
        "Align leadership and prioritize AI investments, reduce shadow AI and take control of governance.",
      buttonLabel: "StrategyMax + PMO-Max",
      strategyTitle: "Strategy & Alignment",
      strategyItems: [
        "AI Readiness Assessment",
        "AI Audits",
        "AI Governance Strategy",
        "AI Opportunity Discovery",
        "AI Use Case Prioritization",
        "Agentic Enterprise Framework",
        "Transformation Roadmaps",
      ],
      deliverablesTitle: "Deliverables",
      deliverablesItems: [
        "AI Audit Reports",
        "AI Transformation Roadmaps",
        "Executive alignment workshops",
        "Priority investment matrix",
        "Board-ready AI strategy presentation",
        "AI Governance — what AI can touch, decide, and own",
      ],
    },
    {
      id: "foundations",
      stageNum: "STAGE 02",
      title: "Foundations",
      shortDesc:
        "Build trusted data engineering rails and absolute compliance vectors.",
      buttonLabel: "DeltaMax",
      strategyTitle: "AI Foundations",
      strategyItems: [
        "Data Foundations & Ingestion",
        "Data Quality, Trust & Remediation",
        "Shadow AI Foundations",
        "Open / Multi Models",
        "Data Security, Governance & Privacy",
        "Cybersecurity",
        "Change Management",
      ],
      deliverablesTitle: "Platform Integration",
      deliverablesItems: [
        "Real-time trust score dashboard",
        "Automated freshness monitoring",
        "Proactive alerting",
        "Executive AI Agents, Data Migrations",
        "MDM & golden record management",
        "Security Posture",
      ],
    },
    {
      id: "build",
      stageNum: "STAGE 03",
      title: "Build",
      shortDesc:
        "Engineer production-ready AI solutions that scale with strict system precision.",
      buttonLabel: "AI Engineering",
      strategyTitle: "AI Engineering Services",
      strategyItems: [
        "Open & multi-model architectures",
        "Cloud engineering (AWS, Azure, GCP)",
        "Agent development & orchestration",
        "Data pipeline engineering",
        "Testing & automation",
      ],
      deliverablesTitle: "Capabilities",
      deliverablesItems: [
        "LLM fine-tuning & deployment",
        "Multi-agent orchestration",
        "Intelligent automation",
        "Real-time inference infrastructure",
      ],
    },
    {
      id: "scale",
      stageNum: "STAGE 04",
      title: "Scale",
      shortDesc:
        "Operationalize intelligent agents safely across core organizational verticals.",
      buttonLabel: "OptiMax",
      strategyTitle: "Scale with OptiMax",
      strategyItems: [
        "Marketing intelligence & MMM",
        "Customer segmentation & activation",
        "Audience intelligence",
        "Budget optimization engine",
        "Executive insights dashboard",
      ],
      deliverablesTitle: "Business Outcomes",
      deliverablesItems: [
        "propensity-to-respond rates",
        "reduce churn",
        "Improved cross-sell / upsell yield",
        "Right budget, right segment, right channel",
      ],
    },
    {
      id: "optimize",
      stageNum: "STAGE 05",
      title: "Optimize",
      shortDesc:
        "Refine pipeline performance and drive measurable economic returns.",
      buttonLabel: "AI FinOps & ROI",
      strategyTitle: "Optimize & Govern",
      strategyItems: [
        "Revenue optimization loops",
        "Cost optimization intelligence (FinOps)",
        "Executive decision intelligence",
        "Continuous improvement framework",
      ],
      deliverablesTitle: "Measurement",
      deliverablesItems: [
        "Business KPI dashboards",
        "Executive scorecards",
        "ROI attribution modeling",
        "Board-level AI performance reporting",
      ],
    },
  ];

  const currentStageData = stages[activeStage];

  const handlePrevStage = () => {
    setActiveStage((prev) => Math.max(0, prev - 1));
  };

  const handleNextStage = () => {
    setActiveStage((prev) => Math.min(stages.length - 1, prev + 1));
  };

  // Touch swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

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

    if (isLeftSwipe && activeStage < stages.length - 1) {
      handleNextStage();
    }
    if (isRightSwipe && activeStage > 0) {
      handlePrevStage();
    }
  };

  return (
    <section
      id="journey"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-left scroll-mt-24"
    >
      {/* Editorial Title Section */}
      <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-16 md:mb-20 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-black">
          THE TRANSFORMATION JOURNEY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-black uppercase leading-[1.05] sm:leading-[0.95] max-w-5xl">
          A Structured Path From AI <br />
          Experimentation to Enterprise Value
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-1 sm:pt-2">
          Every successful AI transformation follows a journey. Katalyst Street
          provides the expertise, frameworks, and platforms required at every
          structural layer.
        </p>
      </div>

      {/* DASHBOARD CONTAINER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start w-full">
        {/* Mobile: Horizontal Scrollable Stage Selector */}
        {isMobile ? (
          <div className="lg:hidden w-full overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-min">
              {stages.map((stage, index) => {
                const isActive = activeStage === index;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(index)}
                    className={`flex-shrink-0 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border text-left flex flex-col justify-center relative transition-all duration-300 outline-none min-w-[140px] sm:min-w-[160px]
                      ${
                        isActive
                          ? "border-zinc-900 bg-black text-white shadow-lg"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                      }
                    `}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span
                      className={`text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-1 transition-colors duration-300
                        ${isActive ? "text-zinc-300" : "text-zinc-400"}
                      `}
                    >
                      {stage.stageNum}
                    </span>
                    <h3
                      className={`text-base sm:text-lg font-black tracking-tight uppercase leading-none transition-colors duration-300
                        ${isActive ? "text-white" : "text-zinc-800"}
                      `}
                    >
                      {stage.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: LEFT NAV PANEL - Sticky Stepper Controls (4 Columns) */
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-2 relative z-20">
            {stages.map((stage, index) => {
              const isActive = activeStage === index;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className={`w-full p-5 rounded-2xl border text-left flex flex-col justify-center relative transition-all duration-300 outline-none overflow-hidden min-h-[96px] group group-nav-item
                    ${
                      isActive
                        ? "border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/20 shadow-md shadow-black/[0.01]"
                        : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/10"
                    }
                  `}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Smooth Animated Accent Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="journeyNavIndicator"
                      className="absolute inset-0 bg-zinc-100/60 dark:bg-zinc-900/30 border-l-2 border-zinc-500 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 35,
                      }}
                    />
                  )}

                  <span
                    className={`text-[9px] font-black tracking-widest uppercase mb-1 transition-colors duration-300
                    ${isActive ? "text-zinc-900" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500"}`}
                  >
                    {stage.stageNum}
                  </span>
                  <h3
                    className={`text-xl font-black tracking-tight uppercase leading-none transition-colors duration-300
                    ${isActive ? "text-black dark:text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"}`}
                  >
                    {stage.title}
                  </h3>
                </button>
              );
            })}
          </div>
        )}

        {/* RIGHT DISPLAY VIEWPORT: Interactive Content Panel (8 Columns) */}
        <div
          className="lg:col-span-8 bg-zinc-50/50 dark:bg-zinc-950/10 border border-zinc-200/60 dark:border-zinc-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[480px] md:min-h-[540px] flex flex-col justify-between shadow-sm relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col justify-between flex-1"
            >
              {/* Top Summary Info Segment */}
              <div className="space-y-3 sm:space-y-4 max-w-3xl mb-6 sm:mb-8 md:mb-10">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-[10px] font-black tracking-widest text-zinc-500 dark:text-zinc-900 uppercase">
                    {currentStageData.stageNum}
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full border border-dark-500/30 bg-dark-500/5 text-[8px] sm:text-[9px] font-bold tracking-wider text-dark-600 dark:text-dark-500 uppercase">
                    {currentStageData.buttonLabel}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 tracking-tight uppercase leading-none">
                  {currentStageData.title} Paradigm
                </h4>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-900 font-dark leading-relaxed">
                  {currentStageData.shortDesc}
                </p>
              </div>

              {/* Bottom Multi-Column Details Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 items-start w-full">
                {/* Column Left: Focus Fields */}
                <div className="space-y-3 sm:space-y-4">
                  <h5 className="text-[10px] sm:text-[11px] font-black tracking-widest text-dark uppercase flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-900 flex-shrink-0" />
                    {currentStageData.strategyTitle}
                  </h5>
                  <ul className="space-y-2 sm:space-y-3">
                    {currentStageData.strategyItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-900 flex items-start gap-2"
                      >
                        <span className="text-black font-mono text-xs select-none flex-shrink-0 mt-0.5">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column Right: Deliverable Metrics */}
                <div className="space-y-3 sm:space-y-4">
                  <h5 className="text-[10px] sm:text-[11px] font-black tracking-widest text-zinc-400 dark:text-zinc-900 uppercase flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-900 flex-shrink-0" />
                    {currentStageData.deliverablesTitle}
                  </h5>
                  <ul className="space-y-2 sm:space-y-3">
                    {currentStageData.deliverablesItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-900 flex items-start gap-2"
                      >
                        <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs select-none flex-shrink-0 mt-0.5">
                          ↳
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Click Action Indicator Panel */}
          <div className="flex items-center justify-between sm:justify-end gap-2 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200/40 dark:border-zinc-900/60 w-full">
            {/* Stage counter for mobile */}
            <span className="sm:hidden text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {activeStage + 1} / {stages.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStage}
                disabled={activeStage === 0}
                className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-black dark:hover:text-white transition-all outline-none"
                aria-label="Previous stage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="flex gap-1 px-2">
                {stages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`h-1.5 sm:h-1 rounded-full transition-all duration-300 outline-none
                      ${i === activeStage ? "w-5 sm:w-4 bg-zinc-500" : "w-1.5 sm:w-1 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400"}
                    `}
                    aria-label={`Go to stage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextStage}
                disabled={activeStage === stages.length - 1}
                className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-black dark:hover:text-white transition-all outline-none"
                aria-label="Next stage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
