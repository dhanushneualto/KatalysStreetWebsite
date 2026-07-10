"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Cloud, ShieldAlert } from "lucide-react";
import Carousel360 from "@/app/carousel360";
import PlatformShowcase from "@/app/platformshowcase";
import EcosystemSection from "@/app/ecosystem";
import IndustriesSection from "@/app/industries";
import InsightsSection from "@/app/insights";
import TeamSection from "@/app/team";
import ContactSection from "@/app/contact";
import JourneySection from "@/app/journey";

export default function KatalystStreetDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Segmented Control State Matrix
  const tabs = ["STRATEGY", "FOUNDATIONS", "BUILD", "SCALE", "OPTIMIZE"];
  const [activeTab, setActiveTab] = useState("BUILD");

  // State managers tracking active sub-slide drilldowns
  const [subSlideIndex, setSubSlideIndex] = React.useState(0);
  const [activeJourneyStage, setActiveJourneyStage] = useState(1);
  {
    React.useEffect(() => {
      const interval = setInterval(() => {
        setActiveTab((currentTab) => {
          const currentIndex = tabs.indexOf(currentTab);
          const nextIndex = (currentIndex + 1) % tabs.length;
          return tabs[nextIndex];
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [activeTab]);
  }

  // 1. Capture absolute scroll metrics across the layout lifespan
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. The "Dome Opening Portal Effect"
  const portalScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25],
    [1, 1.9, 4.0],
  );

  // OPTIMIZED: Accelerated opacity exit curve so the hero text vanishes completely by 6% scroll
  const portalOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.06],
    [1, 0.5, 0],
  );

  // 3. Sync background crossfades exactly with the scale-through portal
  // FIXED: Shifted back to complete early ([0.06, 0.09]), ensuring it snaps to pure bright white instantly
  const bgTransition = useTransform(
    scrollYProgress,
    [0.01, 0.09],
    ["#09090b", "#ffffff"],
  );

  const heroTextTransition = useTransform(
    scrollYProgress,
    [0, 0.04, 0.06],
    ["#ffffff", "#e4e4e7", "#f4f4f5"],
  );

  // FIXED: Adjusted to flip contrast exactly when the background changes to pure white
  const textTransition = useTransform(
    scrollYProgress,
    [0.06, 0.06],
    ["#fafafa", "#09090b"],
  );

  const navBorder = useTransform(
    scrollYProgress,
    [0.06, 0.09],
    ["rgba(24,24,27,0.8)", "rgba(102, 102, 106, 0.6)"],
  );

  // 4. Staggered Lower Layout Entry Mechanics
  // FIXED: Adjusted the arrival window from [0, 0.12, 0.26] to [0, 0.10, 0.24]
  // Changed starting position to 600px downward to guarantee it stays clear of the upper content area until called
  const contentYOffset = useTransform(
    scrollYProgress,
    [0, 0.08, 0.24],
    [600, 400, 0],
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
          <a href="#contact" className="hover:text-white transition-colors">
            Get In Touch
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

      {/* LOWER INTERACTION CONTENT */}
      <motion.div
        style={{ y: contentYOffset }}
        className="relative z-20 max-w-6xl mx-auto px-8 md:px-24 pb-32 space-y-48"
      >
        {/* Core Subheader Panel */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <div className="max-w-4xl space-y-8 flex flex-col items-center justify-center">
            {/* OPTIMIZED: Adjusted cascading entry animations with calculated staggers */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-bold tracking-widest text-black uppercase"
            >
              Katalyst Street is the Enterprise AI Transformation Company.
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-none text-black italic"
            >
              From AI Ambition To <br />
              <span className="text-black font-light font-serif italic">
                Measurable Business Outcome
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-xl text-zinc-800 dark:text-zinc-800 font-dark leading-relaxed max-w-2xl"
            >
              We help organizations move from AI ambition to measurable business
              outcomes through Strategy, Governance, Trusted Data, Intelligent
              Automation, and Optimization.
            </motion.p>

            {/* Seamless Segmented Control Component Section */}
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

            {/* Floating Action Spans */}
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
                {tabs.map((tab, index) => {
                  const isActive = activeTab === tab;

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
                        ${index !== 0 ? "-ml-3 md:-ml-5" : ""} 
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
          </div>
        </section>

        {/* SECTION: The Enterprise Reality — Structural Grid Split */}
        <section className="w-full max-w-6xl mx-auto px-4 py-24 text-left">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black mb-8">
                  THE CHALLENGES
                </h3>
                <ul className="space-y-4 text-sm md:text-base font-medium text-black">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Unclear strategic priorities</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Shadow AI proliferating across teams</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Poor data quality undermining models</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>No AI governance framework</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Low adoption by business users</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Unable to scale beyond pilots</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div>Agent sprawl without oversight</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 pr-10 md:p-12 md:pr-16 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black mb-8">
                  THE KATALYST SOLUTION
                </h3>
                <ul className="space-y-4 text-sm md:text-base font-bold text-black">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="md:whitespace-nowrap">
                      StrategyMax{" "}
                      <span className="text-black font-light">
                        — AI Opportunity Discovery & Roadmaps
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="md:whitespace-nowrap">
                      PMO-Max{" "}
                      <span className="text-black font-light">
                        — Enterprise AI Governance Platform
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="md:whitespace-nowrap">
                      DeltaMax{" "}
                      <span className="text-black font-light">
                        — Trusted Data Intelligence
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="md:whitespace-nowrap">
                      PMO-Max{" "}
                      <span className="text-black font-light">
                        — Risk Controls & Compliance
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="font-semibold text-black">
                      Change Management & Human Capital Enablement
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="md:whitespace-nowrap">
                      OptiMax{" "}
                      <span className="text-black font-light">
                        — Operationalize at Enterprise Scale
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <div className="font-semibold text-black">
                      Agentic Enterprise Framework
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <JourneySection />
        <PlatformShowcase />
        <EcosystemSection />
        <IndustriesSection />
        <InsightsSection />
        <TeamSection />
        <ContactSection />

        {/* Global Footer Elements */}
        <footer className="pt-24 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600 tracking-wider">
          <div>© {new Date().getFullYear()} KATALYST STREET INC.</div>
          <div>CONTACT@KATALYSTSTREET.COM</div>
        </footer>
      </motion.div>
    </motion.div>
  );
}
