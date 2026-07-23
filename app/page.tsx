"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Cloud, ShieldAlert, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Segmented Control State Matrix
  const tabs = ["STRATEGY", "FOUNDATIONS", "BUILD", "SCALE", "OPTIMIZE"];
  const [activeTab, setActiveTab] = useState("BUILD");

  // State managers tracking active sub-slide drilldowns
  const [subSlideIndex, setSubSlideIndex] = React.useState(0);
  const [activeJourneyStage, setActiveJourneyStage] = useState(1);

  // Dynamic Scroll Tracker State for Phase Switching
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);

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

  // Dynamic Scroll Listener tracking when layout shifts to white bg zone
  useEffect(() => {
    const handleScrollLifecycle = () => {
      if (!containerRef.current) return;

      const metrics = containerRef.current.getBoundingClientRect();
      const scrolledPercentage =
        Math.abs(metrics.top) / (metrics.height - window.innerHeight);

      // Matches the exact transition point where bg becomes white (0.06 - 0.09)
      if (scrolledPercentage > 0.06) {
        setIsScrolledPastThreshold(true);
      } else {
        setIsScrolledPastThreshold(false);
      }
    };

    window.addEventListener("scroll", handleScrollLifecycle);
    return () => window.removeEventListener("scroll", handleScrollLifecycle);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

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
  const bgTransition = useTransform(
    scrollYProgress,
    [0.01, 0.05],
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
  const contentYOffset = useTransform(
    scrollYProgress,
    [0, 0.08, 0.24],
    [600, 400, 0],
  );

  // ⚡ DYNAMIC LINK CLASSES: Updates text style based on active viewport transition sequence
  const linkStyles = isScrolledPastThreshold
    ? "text-zinc-600 hover:text-black transition-colors"
    : "text-zinc-300 hover:text-white transition-colors";

  const navLinks = [
    { href: "#journey", label: "Journey" },
    { href: "#platforms", label: "Platforms" },
    { href: "#ecosystem", label: "Ecosystem" },
    { href: "#industries", label: "Industries" },
    { href: "#insights", label: "Insights" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Get In Touch" },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgTransition, color: textTransition }}
      className="min-h-[250vh] font-sans antialiased select-none transition-colors duration-200 relative"
    >
      {/* Persistent Navigation Panel */}
      <motion.nav
        style={{ borderColor: navBorder }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolledPastThreshold
            ? "bg-white border-b border-zinc-200 text-black"
            : "bg-transparent border-b border-zinc-100/80 text-white"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logonew1.png"
            alt="Katalyst Street Logo"
            width={isMobileMenuOpen ? 90 : 100}
            height={isMobileMenuOpen ? 90 : 100}
            className={`object-contain transition-all duration-500 ${
              isScrolledPastThreshold
                ? "filter brightness-0 grayscale contrast-200"
                : "filter brightness-0 invert"
            } w-[80px] h-[80px] md:w-[120px] md:h-[120px]`}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium transition-colors duration-500">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkStyles}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-50 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isScrolledPastThreshold ? "text-black" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isScrolledPastThreshold ? "text-black" : "text-white"
              }`}
            />
          )}
        </button>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-black hover:text-zinc-600 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* STICKY VIEWPORT PORTAL (Locks to screen while scaling) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ scale: portalScale, opacity: portalOpacity }}
          className="flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl"
        >
          <motion.h1
            style={{ color: heroTextTransition }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-none"
          >
            KATALYST STREET
          </motion.h1>
          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-zinc-500 uppercase mt-4">
            The Enterprise AI Transformation Company
          </p>
        </motion.div>

        {/* Bottom Right Beast Image */}
        <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 select-none pointer-events-none z-10">
          <div className="relative w-full h-full">
            <Image
              src="/beast.png"
              alt="Tame The Beast AI Emblem"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 224px"
              priority
              className="object-contain filter brightness-0 invert opacity-95 transition-none"
            />
          </div>
        </div>

        {/* Micro Rounded Icon (Bottom Left corner indicator) */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border border-zinc-800 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-zinc-400 select-none pointer-events-none">
          N
        </div>
      </div>

      {/* LOWER INTERACTION CONTENT */}
      <motion.div
        style={{ y: contentYOffset }}
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 md:px-24 pb-16 md:pb-32 space-y-24 md:space-y-48"
      >
        {/* Core Subheader Panel */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <div className="max-w-4xl space-y-6 md:space-y-8 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-xs font-bold tracking-widest text-black uppercase"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-none text-black italic"
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
              className="text-base sm:text-lg md:text-xl text-zinc-800 dark:text-zinc-800 font-dark leading-relaxed max-w-2xl px-2"
            >
              We help organizations move from AI ambition to measurable business
              outcomes through Strategy, Governance, Trusted Data, Intelligent
              Automation, and Optimization.
            </motion.p>

            {/* Seamless Segmented Control Component Section */}
            <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-2 pt-4 text-center w-full max-w-5xl mx-auto">
              <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-800 dark:text-zinc-800 uppercase whitespace-nowrap w-full sm:w-auto mb-1 sm:mb-0">
                Unlike traditional consulting firms, we combine:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                {["Advisory", "Engineering", "Platforms", "Ecosystem"].map(
                  (item, index) => (
                    <React.Fragment key={item}>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-black font-black text-[10px] sm:text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                        {item}
                      </span>
                      {index < 3 && (
                        <span className="text-zinc-400 font-light text-base sm:text-lg select-none">
                          +
                        </span>
                      )}
                    </React.Fragment>
                  ),
                )}
              </div>
            </div>

            {/* Floating Action Spans */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 pt-6 px-2">
              {[
                "Schedule Executive Briefing",
                "Take AI Readiness Assessment",
                "Read AI Governance White Paper",
              ].map((action) => (
                <span
                  key={action}
                  className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border-2 border-black font-black text-xs sm:text-sm md:text-base text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap"
                >
                  {action}
                </span>
              ))}
            </div>

            {/* High-Contrast Interlocking White Chevron Arrow Timeline */}
            <div className="w-full flex justify-center pt-2 relative z-30 overflow-x-auto">
              <div className="inline-flex items-center bg-white relative w-full max-w-4xl justify-between rounded-md border border-zinc-200 p-1 shadow-sm min-w-[600px] md:min-w-0">
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
                      className={`flex-1 py-2 sm:py-3 md:py-3.5 text-[8px] sm:text-[10px] md:text-xs font-bold tracking-wider md:tracking-widest transition-all duration-300 uppercase select-none outline-none relative text-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px] pl-4 sm:pl-5 md:pl-6 pr-1 sm:pr-2
                        ${index !== 0 ? "-ml-2 sm:-ml-3 md:-ml-5" : ""} 
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
                      <span className="relative z-10 block pr-1 sm:pr-2">
                        {tab}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full pt-8 md:pt-12">
              <Carousel360 />
            </div>
          </div>
        </section>

        {/* SECTION: The Enterprise Reality — Structural Grid Split */}
        <section className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-12 md:py-24 text-left">
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-16 max-w-4xl">
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-black">
              THE ENTERPRISE REALITY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black tracking-tight text-black uppercase leading-[1.1] md:leading-[0.95]">
              Most AI Initiatives Don't Fail <br />
              Because of AI
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-900 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2">
              They fail because organizations struggle with the fundamentals. AI
              transformation requires more than technology — it requires a
              transformation operating model.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch w-full">
            <div className="bg-zinc-50 dark:bg-zinc-300/40 border border-zinc-500/60 dark:border-zinc-800/60 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="font-black tracking-widest uppercase text-black mb-6 md:mb-8 text-sm md:text-base">
                  THE CHALLENGES
                </h3>
                <ul className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base font-dark text-black">
                  {[
                    "Unclear strategic priorities",
                    "Shadow AI proliferating across teams",
                    "Poor data quality undermining models",
                    "No AI governance framework",
                    "Low adoption by business users",
                    "Unable to scale beyond pilots",
                    "Agent sprawl without oversight",
                  ].map((challenge) => (
                    <li
                      key={challenge}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <span className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-black flex-shrink-0" />
                      <div>{challenge}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-300/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 sm:p-8 md:p-12 md:pr-16 flex flex-col justify-between">
              <div>
                <h3 className="font-black tracking-widest uppercase text-black mb-6 md:mb-8 text-sm md:text-base">
                  THE KATALYST SOLUTION
                </h3>
                <ul className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base font-dark text-black">
                  {[
                    {
                      bold: "StrategyMax",
                      light: "— AI Opportunity Discovery & Roadmaps",
                    },
                    {
                      bold: "PMO-Max",
                      light: "— Enterprise AI Governance Platform",
                    },
                    {
                      bold: "DeltaMax",
                      light: "— Trusted Data Intelligence",
                    },
                    {
                      bold: "PMO-Max",
                      light: "— Risk Controls & Compliance",
                    },
                    {
                      bold: "Change Management & Human Capital Enablement",
                      light: "",
                    },
                    {
                      bold: "OptiMax",
                      light: "— Operationalize at Enterprise Scale",
                    },
                    {
                      bold: "Agentic Enterprise Framework",
                      light: "",
                    },
                  ].map((solution, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-black flex-shrink-0" />
                      <div>
                        <span className="font-bold">{solution.bold}</span>
                        {solution.light && (
                          <span className="text-black font-light">
                            {" "}
                            {solution.light}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
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
        <footer className="pt-12 md:pt-24 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-6 text-xs text-zinc-600 tracking-wider">
          {/* Left Block: Logo, Subtitle, Address, and Copyright */}
          <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
            <div className="flex items-center justify-center select-none opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/logonew1.png"
                alt="Katalyst Street Footer Logo"
                width={70}
                height={70}
                className="object-contain filter invert dark w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
              />
            </div>
            <div className="font-medium text-zinc-500 max-w-sm text-xs sm:text-sm">
              Taming the AI Complexity and building AI Native Enterprises
            </div>

            {/* Office Address Block */}
            <div className="text-zinc-600 mt-1 text-[11px] sm:text-xs">
              8000 Avalon Boulevard, Georgia, 30009
            </div>

            <div className="mt-2 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} KATALYST STREET INC.
            </div>
          </div>

          {/* Right Block: Mail with icon and Social Links */}
          <div className="flex flex-col items-start sm:items-end gap-3 md:gap-4 w-full sm:w-auto">
            {/* Email Contact Trigger */}
            <a
              href="mailto:CONTACT@KATALYSTSTREET.COM"
              className="hover:text-black transition-colors flex items-center gap-2 font-medium text-[11px] sm:text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail flex-shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              CONTACT@KATALYSTSTREET.COM
            </a>

            {/* LinkedIn Company Redirection */}
            <a
              href="https://www.linkedin.com/company/katalyst-street"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors flex items-center gap-2 font-medium text-[11px] sm:text-xs"
              aria-label="LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin flex-shrink-0"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LINKEDIN
            </a>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
}
