"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Cloud, ShieldAlert } from "lucide-react";
import Carousel360 from "@/app/carousel360";
import PlatformShowcase from "@/app/platformshowcase";

export default function KatalystStreetDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Segmented Control State Matrix
  const tabs = ["STRATEGY", "FOUNDATIONS", "BUILD", "SCALE", "OPTIMIZE"];
  const [activeTab, setActiveTab] = useState("BUILD");

  // State managers tracking active sub-slide drilldowns
  const [subSlideIndex, setSubSlideIndex] = React.useState(0);
  const [activeJourneyStage, setActiveJourneyStage] = useState(1);
  // 1. Capture absolute scroll metrics across the layout lifespan
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. The "Dome Opening Portal Effect"
  // FIXED: Expanded the scale duration to make the zoom-through feel majestic and cinematic
  const portalScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25],
    [1, 1.8, 6.0],
  );

  // FIXED: Force the giant background portal header to dissolve MUCH earlier in the scroll
  // It will now completely clear out by 10% scroll depth, leaving a clean canvas for the next block
  const portalOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.1],
    [1, 0.7, 0],
  );

  // 3. Sync background crossfades exactly with the scale-through portal
  // FIXED: Adjusted to start later so the dark theme holds firm until the hero text fades completely
  const bgTransition = useTransform(
    scrollYProgress,
    [0.11, 0.13],
    ["#09090b", "#ffffff"],
  );

  const heroTextTransition = useTransform(
    scrollYProgress,
    [0, 0.06, 0.12],
    ["#ffffff", "#e4e4e7", "#f4f4f5"],
  );

  const textTransition = useTransform(
    scrollYProgress,
    [0.11, 0.13],
    ["#fafafa", "#09090b"],
  );

  const navBorder = useTransform(
    scrollYProgress,
    [0.11, 0.13],
    ["rgba(24,24,27,0.8)", "rgba(102, 102, 106, 0.6)"],
  );

  // 4. Staggered Lower Layout Entry Mechanics
  // FIXED: Shifted the arrival start point window from [0, 0.18] to [0.08, 0.24]
  // This physically holds back the lower sections from rising until the portal text is safely invisible
  const contentYOffset = useTransform(
    scrollYProgress,
    [0, 0.08, 0.24],
    [250, 200, 0],
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgTransition, color: textTransition }}
      className="min-h-[250vh] font-sans antialiased select-none transition-colors duration-200 relative"
    >
      {/* Persistent Navigation Panel */}
      <motion.nav
        style={{ borderColor: navBorder }}
        className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b px-6 py-4 flex justify-between items-center mix-blend-difference"
      >
        <div className="flex flex-col items-center justify-center gap-1 text-center select-none">
          <Image
            src="/logo.png"
            alt="Katalyst Street Logo"
            width={110}
            height={110}
            className="object-contain filter invert dark:invert-0 brightness-200"
          />
        </div>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#journey" className="hover:text-white transition-colors">
            Journey
          </a>
          <a href="#platforms" className="hover:text-white transition-colors">
            Platforms
          </a>
          <a href="#ecosystem" className="hover:text-white transition-colors">
            Ecosystem
          </a>
          <a href="#industries" className="hover:text-white transition-colors">
            Industries
          </a>
          <a href="#insights" className="hover:text-white transition-colors">
            Insights
          </a>
          <a href="#team" className="hover:text-white transition-colors">
            Team
          </a>
        </div>
      </motion.nav>

      {/* STICKY VIEWPORT PORTAL (Locks to screen while scaling) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ scale: portalScale, opacity: portalOpacity }}
          className="flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl"
        >
          <motion.h1
            style={{ color: heroTextTransition }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none"
          >
            KATALYST STREET
          </motion.h1>
          <p className="text-sm md:text-base font-semibold tracking-[0.4em] text-zinc-500 uppercase mt-4">
            The Enterprise AI Transformation Company
          </p>
        </motion.div>
      </div>

      {/* LOWER DARK STREAM INTERACTION CONTENT */}
      <motion.div
        style={{ y: contentYOffset }}
        className="relative z-20 max-w-6xl mx-auto px-8 md:px-24 pb-32 space-y-48"
      >
        {/* Core Subheader Panel */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-8 flex flex-col items-center justify-center"
          >
            <span className="text-xs font-bold tracking-widest text-black uppercase">
              Katalyst Street is the Enterprise AI Transformation Company.
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-black italic">
              From AI Ambition To <br />
              <span className="text-black font-light font-serif italic">
                Measurable Business Outcome
              </span>
            </h2>
            <p className="text-xl text-zinc-800 dark:text-zinc-800 font-dark leading-relaxed max-w-2xl">
              We help organizations move from AI ambition to measurable business
              outcomes through Strategy, Governance, Trusted Data, Intelligent
              Automation, and Optimization.
            </p>
            {/* Seamless Segmented Control Component Section */}
            {/* Compact Combine Metrics Block */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 pt-4 text-center w-full max-w-5xl mx-auto">
              <p className="text-xs font-semibold tracking-wider text-zinc-800 dark:text-zinc-800 uppercase whitespace-nowrap">
                Unlike traditional consulting firms, we combine:
              </p>

              <span className="px-4 py-1.5 rounded-full border-2 border-black font-black text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Advisory
              </span>
              <span className="text-zinc-400 font-light text-lg select-none">
                +
              </span>

              <span className="px-4 py-1.5 rounded-full border-2 border-black font-black text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Engineering
              </span>
              <span className="text-zinc-400 font-light text-lg select-none">
                +
              </span>

              <span className="px-4 py-1.5 rounded-full border-2 border-black font-black text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Platforms
              </span>
              <span className="text-zinc-400 font-light text-lg select-none">
                +
              </span>

              <span className="px-4 py-1.5 rounded-full border-2 border-black font-black text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Ecosystem
              </span>
            </div>
            {/* Floating Medium Secondary Action Spans */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <span className="px-5 py-2 rounded-full border-2 border-black font-black text-base text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Schedule Executive Briefing
              </span>
              <span className="px-5 py-2 rounded-full border-2 border-black font-black text-base text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Take AI Readiness Assessment
              </span>
              <span className="px-5 py-2 rounded-full border-2 border-black font-black text-base text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                Read AI Governance White Paper
              </span>
            </div>
            {/* High-Contrast Interlocking White Chevron Arrow Timeline */}
            <div className="w-full flex justify-center pt-2 relative z-30">
              <div className="inline-flex items-center bg-white relative w-full max-w-4xl justify-between rounded-md border border-zinc-200 p-1 shadow-sm">
                {/* React Lifecycle Effect to handle the 1-second auto-rotation */}
                {React.useEffect(() => {
                  const interval = setInterval(() => {
                    setActiveTab((currentTab) => {
                      const currentIndex = tabs.indexOf(currentTab);
                      const nextIndex = (currentIndex + 1) % tabs.length;
                      return tabs[nextIndex];
                    });
                  }, 1000);

                  return () => clearInterval(interval);
                }, [activeTab])}

                {tabs.map((tab, index) => {
                  const isActive = activeTab === tab;

                  // Pure CSS polygon coordinates for sharp chevron points
                  const middleChevron =
                    "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)";
                  const firstChevron =
                    "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)";
                  const lastChevron =
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 50%)";

                  const currentShape =
                    index === 0
                      ? firstChevron
                      : index === tabs.length - 1
                        ? lastChevron
                        : middleChevron;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3.5 text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 uppercase select-none outline-none relative text-center min-w-[120px] pl-6 pr-2
            /* Tightens the seams so the arrows interlock flawlessly */
            ${index !== 0 ? "-ml-3 md:-ml-5" : ""} 
            /* Typography & Layout Color Matrix (Forced to crisp white base) */
            ${
              isActive
                ? "text-white font-black bg-black dark:bg-zinc-950"
                : "text-zinc-400 bg-white hover:text-black border-y border-r border-zinc-200"
            }
          `}
                      style={{
                        clipPath: currentShape,
                        WebkitClipPath: currentShape,
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {/* Animated active slide tracking background matching the arrow dimensions */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSegment"
                          className="absolute inset-0 bg-black dark:bg-zinc-950 -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                          style={{
                            clipPath: currentShape,
                            WebkitClipPath: currentShape,
                          }}
                        />
                      )}
                      <span className="relative z-10 block pr-2">{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full pt-12">
              <Carousel360 />
            </div>
          </motion.div>
        </section>

        {/* SECTION: The Enterprise Reality — Structural Grid Split */}
        <section className="w-full max-w-6xl mx-auto px-4 py-24 text-left">
          {/* Header Text Stack */}
          <div className="space-y-4 mb-16 max-w-4xl">
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
              THE ENTERPRISE REALITY
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black  uppercase leading-[0.95]">
              Most AI Initiatives Don't Fail <br />
              Because of AI
            </h2>
            <p className="text-base md:text-lg text-zinc-900 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2">
              They fail because organizations struggle with the fundamentals. AI
              transformation requires more than technology — it requires a
              transformation operating model.
            </p>
          </div>

          {/* Split Column Layout Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
            {/* Left Panel: The Challenges Matrix */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black-500 mb-8">
                  THE CHALLENGES
                </h3>
                <ul className="space-y-4 text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Unclear strategic priorities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Shadow AI proliferating across teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Poor data quality undermining models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>No AI governance framework</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Low adoption by business users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Unable to scale beyond pilots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <span>Agent sprawl without oversight</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Panel: The Katalyst Solution Suite */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-emerald-500 mb-8">
                  THE KATALYST SOLUTION
                </h3>
                <ul className="space-y-4 text-sm md:text-base font-bold text-zinc-900 dark:text-white">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div>
                      StrategyMax{" "}
                      <span className="text-zinc-400 font-light">
                        — AI Opportunity Discovery & Roadmaps
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div>
                      PMO-Max{" "}
                      <span className="text-zinc-400 font-light">
                        — Enterprise AI Governance Platform
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div>
                      DeltaMax{" "}
                      <span className="text-zinc-400 font-light">
                        — Trusted Data Intelligence
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div>
                      PMO-Max{" "}
                      <span className="text-zinc-400 font-light">
                        — Risk Controls & Compliance
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                      Change Management & Human Capital Enablement
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div>
                      OptiMax{" "}
                      <span className="text-zinc-400 font-light">
                        — Operationalize at Enterprise Scale
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                      Agentic Enterprise Framework
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: The Transformation Journey — Unified Complete Stage Matrix */}
        <section
          id="journey"
          className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
        >
          {/* Header Typography Group */}
          <div className="space-y-4 mb-16 max-w-5xl">
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
              THE TRANSFORMATION JOURNEY
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black uppercase leading-[0.95] max-w-5xl">
              A Structured Path From AI <br />
              Experimentation to Enterprise <br />
              Value
            </h2>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2">
              Every successful AI transformation follows a journey. Katalyst
              Street provides the expertise, frameworks, and platforms required
              at every stage.
            </p>
          </div>

          {/* 5-Column Horizontal Journey Stage Row Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch w-full">
            {/* STAGE 01: Strategy Card */}
            <div
              onClick={() => setActiveJourneyStage(1)}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer shadow-sm border-2
                ${
                  activeJourneyStage === 1
                    ? "bg-zinc-50/50 dark:bg-zinc-900/30 border-amber-500/80"
                    : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-widest text-zinc-900 uppercase block">
                  STAGE 01
                </span>
                <h3 className="text-xl font-black text-black tracking-tight">
                  Strategy
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-900 font-dark leading-relaxed">
                  Align leadership and prioritize AI investments, reduce shadow
                  AI and take control of governance
                </p>
              </div>
              <div className="pt-6">
                <button className="inline-block px-3 py-1.5 rounded-full border border-amber-500/40 text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-500 bg-amber-500/5 uppercase text-left transition-all hover:bg-amber-500/10 outline-none">
                  StrategyMax + PMO-Max
                </button>
              </div>
            </div>

            {/* STAGE 02: Foundations Card */}
            <div
              onClick={() => setActiveJourneyStage(2)}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer shadow-sm border-2
                ${
                  activeJourneyStage === 2
                    ? "bg-zinc-50/50 dark:bg-zinc-900/30 border-amber-500/80"
                    : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-widest text-zinc-900 uppercase block">
                  STAGE 02
                </span>
                <h3 className="text-xl font-black text-black tracking-tight">
                  Foundations
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-900 font-dark leading-relaxed">
                  Build trusted data and AI foundations
                </p>
              </div>
              <div className="pt-6">
                <button className="inline-block px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 uppercase text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 outline-none">
                  DeltaMax
                </button>
              </div>
            </div>

            {/* STAGE 03: Build Card */}
            <div
              onClick={() => setActiveJourneyStage(3)}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer shadow-sm border-2
                ${
                  activeJourneyStage === 3
                    ? "bg-zinc-50/50 dark:bg-zinc-900/30 border-amber-500/80"
                    : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block">
                  STAGE 03
                </span>
                <h3 className="text-xl font-black text-black dark:text-white tracking-tight">
                  Build
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Engineer AI solutions that scale
                </p>
              </div>
              <div className="pt-6">
                <button className="inline-block px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 uppercase text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 outline-none">
                  AI Engineering
                </button>
              </div>
            </div>

            {/* STAGE 04: Scale Card */}
            <div
              onClick={() => setActiveJourneyStage(4)}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer shadow-sm border-2
                ${
                  activeJourneyStage === 4
                    ? "bg-zinc-50/50 dark:bg-zinc-900/30 border-amber-500/80"
                    : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block">
                  STAGE 04
                </span>
                <h3 className="text-xl font-black text-black dark:text-white tracking-tight">
                  Scale
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Operationalize AI across business functions & verticals
                </p>
              </div>
              <div className="pt-6">
                <button className="inline-block px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 uppercase text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 outline-none">
                  OptiMax
                </button>
              </div>
            </div>

            {/* STAGE 05: Optimize Card */}
            <div
              onClick={() => setActiveJourneyStage(5)}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer shadow-sm border-2
                ${
                  activeJourneyStage === 5
                    ? "bg-zinc-50/50 dark:bg-zinc-900/30 border-amber-500/80"
                    : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block">
                  STAGE 05
                </span>
                <h3 className="text-xl font-black text-black dark:text-white tracking-tight">
                  Optimize
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Optimize costs, performance and drive measurable business
                  outcomes
                </p>
              </div>
              <div className="pt-6">
                <button className="inline-block px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 uppercase text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 outline-none">
                  AI FinOps & ROI
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC METRIC INTERACTION SUB-PANEL SWITCHER */}
          <div className="w-full mt-12 relative z-30">
            <div className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-12 min-h-[480px] flex flex-col justify-between shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full">
                {activeJourneyStage === 1 && (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold tracking-wide text-amber-500 font-serif italic">
                        Strategy & Alignment
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "AI Readiness Assessment",
                          "AI Audits",
                          "AI Governance Strategy",
                          "AI Opportunity Discovery",
                          "AI Use Case Prioritization",
                          "Agentic Enterprise Framework",
                          "Transformation Roadmaps",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-amber-500/70 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-wide text-zinc-400">
                        Deliverables
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "AI Audit Reports",
                          "AI Transformation Roadmaps",
                          "Executive alignment workshops",
                          "Priority investment matrix",
                          "Board-ready AI strategy presentation",
                          "AI Governance — what AI can touch, decide, and own",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-zinc-600 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {activeJourneyStage === 2 && (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold tracking-wide text-amber-500 font-serif italic">
                        AI Foundations
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Data Foundations & Ingestion",
                          "Data Quality, Trust & Remediation",
                          "Shadow AI Foundations",
                          "Open / Multi Models",
                          "Data Security, Governance & Privacy",
                          "Cybersecurity",
                          "Change Management",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-amber-500/70 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-wide text-zinc-400">
                        Platform: DeltaMax (for Data Quality & Trust)
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Real-time trust score dashboard",
                          "Automated freshness monitoring",
                          "Proactive alerting",
                          "Executive AI Agents, Data Migrations",
                          "MDM & golden record management",
                          "Security Posture",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-zinc-600 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {activeJourneyStage === 3 && (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold tracking-wide text-amber-500 font-serif italic">
                        AI Engineering Services
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Open & multi-model architectures",
                          "Cloud engineering (AWS, Azure, GCP)",
                          "Agent development & orchestration",
                          "Data pipeline engineering",
                          "Testing & automation",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-amber-500/70 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-wide text-zinc-400">
                        Capabilities
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "LLM fine-tuning & deployment",
                          "Multi-agent orchestration",
                          "Intelligent automation",
                          "Real-time inference infrastructure",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-zinc-600 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {activeJourneyStage === 4 && (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold tracking-wide text-amber-500 font-serif italic">
                        Scale with OptiMax
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Marketing intelligence & MMM",
                          "Customer segmentation & activation",
                          "Audience intelligence",
                          "Budget optimization engine",
                          "Executive insights dashboard",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-amber-500/70 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-wide text-zinc-400">
                        Business Outcomes
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Higher propensity-to-respond rates",
                          "Reduced churn",
                          "Improved cross-sell / upsell yield",
                          "Right budget, right segment, right channel",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-zinc-600 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {activeJourneyStage === 5 && (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold tracking-wide text-amber-500 font-serif italic">
                        Optimize & Govern
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Revenue optimization loops",
                          "Cost optimization intelligence (FinOps)",
                          "Executive decision intelligence",
                          "Continuous improvement framework",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-amber-500/70 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-wide text-zinc-400">
                        Measurement
                      </h3>
                      <ul className="space-y-4 border-t border-zinc-900 pt-4">
                        {[
                          "Business KPI dashboards",
                          "Executive scorecards",
                          "ROI attribution modeling",
                          "Board-level AI performance reporting",
                        ].map((text) => (
                          <li
                            key={text}
                            className="flex items-center gap-3 text-sm text-zinc-400 group border-b border-zinc-900/20 pb-3"
                          >
                            <span className="text-zinc-600 font-mono text-xs tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                            <span className="group-hover:text-zinc-200 transition-colors">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* TRACK CONTROLS & TIMELINE INDICATORS (BOTTOM PINS) */}
              <div className="w-full flex items-center justify-center gap-5 pt-12 border-t border-zinc-900/60 mt-8">
                <button
                  onClick={() =>
                    setActiveJourneyStage((prev) => Math.max(1, prev - 1))
                  }
                  className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all outline-none"
                >
                  ←
                </button>

                <div className="flex items-center gap-2.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      onClick={() => setActiveJourneyStage(num)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 
                        ${activeJourneyStage === num ? "w-8 bg-amber-500" : "w-2 bg-zinc-800 hover:bg-zinc-700"}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveJourneyStage((prev) => Math.min(5, prev + 1))
                  }
                  className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all outline-none"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4 max-w-5xl pt-32 border-t border-zinc-100/10 mt-32">
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-dark">
              PURPOSE-BUILT PLATFORMS
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-6xl">
              Three Platforms Powering <br />
              Enterprise AI Transformation
            </h2>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2">
              Proprietary platforms purpose-built for enterprise AI — not
              bolted-on features, but purpose-engineered solutions.
            </p>
          </div>
        </section>

        {/* Technical Grid Configuration */}
        <section id="services" className="space-y-16">
          <div className="h-[1px] w-full bg-zinc-900/60" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Module 1 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/40 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium tracking-wide uppercase">
                Precision R&D
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Direct management and deployment of functional custom
                computational models tailored directly to clear corporate
                infrastructure rules.
              </p>
            </div>

            {/* Module 2 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/40 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium tracking-wide uppercase">
                Convergence
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Comprehensive state evaluation and optimization mapping to
                bridge legacy networks into performant deployment paradigms.
              </p>
            </div>

            {/* Module 3 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/40 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium tracking-wide uppercase">
                Global Scale
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                US-managed project implementation groups working continuously
                alongside verified execution groups consisting of highly
                technical components.
              </p>
            </div>
          </div>
        </section>

        {/* Global Footer Elements */}
        <footer className="pt-24 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600 tracking-wider">
          <div>© {new Date().getFullYear()} KATALYST STREET INC.</div>
          <div>CONTACT@KATALYSTSTREET.COM</div>
        </footer>
      </motion.div>
    </motion.div>
  );
}
