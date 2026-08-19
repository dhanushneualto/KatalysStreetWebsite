"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);

  // NEW: States for the scroll arrows
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const tabs = ["STRATEGY", "FOUNDATIONS", "BUILD", "SCALE", "OPTIMIZE"];
  const [activeTab, setActiveTab] = useState("BUILD");
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Detect mobile for performance
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const idx = tabs.indexOf(current);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // NEW: Scroll listener for both the bouncing arrow and back-to-top button
  useEffect(() => {
    const handleArrowScroll = () => {
      // Fade out bouncing arrow after 1px
      if (window.scrollY >= 1) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Show back-to-top button after 500px
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleArrowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleArrowScroll);
  }, []);

  // Scroll threshold logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.abs(rect.top) / (rect.height - window.innerHeight);
      setIsScrolledPastThreshold(scrolled > 0.06);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize or scroll
  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 1024 && setIsMobileMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => isMobileMenuOpen && setIsMobileMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Active Section ScrollSpy Logic
  useEffect(() => {
    // A 100ms delay guarantees all child components have physically painted their IDs into the DOM before we look for them
    const observerTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { 
          rootMargin: "-20% 0px -40% 0px" 
        }
      );

      const targetIds = [
        "journey", "platforms", "ecosystem", "industries", "insights", "team", "contact"
      ];
      
      targetIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(observerTimer);
  }, []);

  // -------- SMOOTH SCROLL ANIMATIONS --------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing eliminates lag on both desktop and mobile
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const portalScale = useTransform(
    smoothProgress,
    [0, 0.12, 0.25],
    isMobile ? [1, 1.5, 2.5] : [1, 1.9, 4.0],
  );

  const portalOpacity = useTransform(
    smoothProgress,
    [0, 0.02, 0.05],
    isMobile ? [1, 0, 0] : [1, 1, 1],
  );

  const bgTransition = useTransform(
    smoothProgress,
    [0.01, 0.05],
    ["#09090b", "#ffffff"],
  );

  const heroTextTransition = useTransform(
    smoothProgress,
    [0, 0.04, 0.06],
    ["#ffffff", "#e4e4e7", "#f4f4f5"],
  );
  
  const subtitleTextTransition = useTransform(
    smoothProgress,
    [0, 0.04, 0.06],
    ["#71717a", "#e4e4e7", "#f4f4f5"], 
  );
  
  const textTransition = useTransform(
    smoothProgress,
    [0.06, 0.06],
    ["#fafafa", "#09090b"],
  );

  const navBorder = useTransform(
    smoothProgress,
    [0.06, 0.09],
    ["rgba(24,24,27,0.8)", "rgba(102, 102, 106, 0.6)"],
  );

  const contentYOffset = useTransform(
    smoothProgress,
    [0, 0.08, 0.24],
    isMobile ? [0, 0, 0] : [600, 400, 0],
  );

  // -------- Navigation links --------
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

  // Memoize tab buttons
  const tabButtons = useMemo(() => {
    return tabs.map((tab, index) => {
      const isActive = activeTab === tab;
      const shape =
        index === 0
          ? "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)"
          : index === tabs.length - 1
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 50%)"
            : "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)";

      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-1.5 sm:py-3 md:py-3.5 text-[6px] sm:text-[10px] md:text-xs font-bold tracking-wider md:tracking-widest transition-all duration-300 uppercase select-none outline-none relative text-center min-w-[40px] sm:min-w-[80px] md:min-w-[120px] pl-2 sm:pl-5 md:pl-6 pr-0.5 sm:pr-2
            ${index !== 0 ? "-ml-1 sm:-ml-3 md:-ml-5" : ""} 
            ${
              isActive
                ? "text-white font-black bg-black dark:bg-zinc-950"
                : "text-zinc-400 bg-white hover:text-black border-y border-r border-zinc-200"
            }
          `}
          style={{
            clipPath: shape,
            WebkitClipPath: shape,
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
                clipPath: shape,
                WebkitClipPath: shape,
              }}
            />
          )}
          <span className="relative z-10 block pr-0.5 sm:pr-2">{tab}</span>
        </button>
      );
    });
  }, [activeTab, tabs]);

  // NEW: Smooth scroll function for the back-to-top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgTransition, color: textTransition }}
      className="min-h-[250vh] w-full max-w-[100vw] font-sans antialiased select-none transition-colors duration-200 relative overflow-clip"
    >
      
    {/* Navigation */}
      <motion.nav
        style={{ borderColor: navBorder }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolledPastThreshold
            ? "bg-white border-b border-zinc-200 text-black"
            : "bg-transparent border-b border-zinc-100/80 text-white"
        }`}
      >
        {/* LEFT: Logo Area */}
        <div className="relative flex items-center gap-2 z-50 ml-4 md:ml-8">
          <Image
            src="/kslogo-new.png"
            alt="Katalyst Street Logo"
            width={isMobileMenuOpen ? 60 : 70}
            height={isMobileMenuOpen ? 60 : 70}
            className={`object-contain transition-all duration-500 ${
              isScrolledPastThreshold || isMobileMenuOpen
                ? "filter brightness-0 grayscale contrast-200"
                : "filter brightness-0 invert"
            } w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px]`}
            priority
          />
        </div>  

        {/* CENTER: Absolute-Centered Navigation Links (Desktop Only) */}
        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-auto justify-center">
          {navLinks
            .filter((link) => link.href !== "#contact")
            .map((link) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`inline-block transition-all duration-300 ease-in-out origin-center ${
                    isActive
                      ? isScrolledPastThreshold
                        ? "text-black font-black scale-125 drop-shadow-md"
                        : "text-white font-black scale-125 drop-shadow-md"
                      : isScrolledPastThreshold
                      ? "text-zinc-600 hover:text-black font-medium scale-100"
                      : "text-zinc-300 hover:text-white font-medium scale-100"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
        </div>

        {/* RIGHT: Call to Action Button & Mobile Menu Toggle */}
        <div className="relative flex items-center justify-end gap-4 z-50 mr-4 md:mr-8">
          {/* Premium Desktop "Get In Touch" Button */}
          <a
            href="#contact"
            className={`hidden lg:flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95  ${
              isScrolledPastThreshold
                ? "bg-black text-white hover:bg-zinc-800 shadow-md"
                : "bg-white text-black hover:bg-zinc-200 shadow-lg"
            }`}
          >
            Get In Touch
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2 touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolledPastThreshold ? "text-black" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-6 px-4"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-bold transition-colors ${
                  link.href === "#contact"
                    ? "text-white bg-black px-8 py-3 rounded-full mt-4" 
                    : "text-black hover:text-zinc-600"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Sticky Hero Portal */}
      <div className="sticky top-0 h-screen w-full max-w-[100vw] overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            scale: portalScale,
            opacity: portalOpacity,
            willChange: "transform, opacity",
          }}
          className="flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl"
        >
          <motion.h1
            style={{ color: heroTextTransition }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-none"
          >
            KATALYST STREET
          </motion.h1>
          <motion.p 
            style={{ color: subtitleTextTransition }}
            className="text-[10px] sm:text-sm md:text-base font-semibold tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase mt-4"
          >
            The Enterprise AI Transformation Company
          </motion.p>
        </motion.div>

        <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-20 h-20 sm:w-44 sm:h-44 md:w-56 md:h-56 select-none pointer-events-none z-10">
          <div className="relative w-full h-full">
            <Image
              src="/newbeastai.png"
              alt="Tame The Beast AI Emblem"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 176px, 224px"
              priority
              className="object-contain filter brightness-0 invert opacity-95"
            />
          </div>
        </div>
        
        {/* NEW: Bouncing Scroll Down Arrow */}
        <a
          
          className={`absolute bottom-[50px] left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-contain bg-no-repeat bg-center animate-bounce transition-all duration-1000 ease-out z-20 pointer-events-auto invert ${
            hasScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            backgroundImage:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAMFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv3aB7AAAAD3RSTlMAGNe9CgcGtbOytLe2f5VrjfCKAAADsElEQVR4AezBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDZpRvTiIEYiMLkzivb65/Xf7eBLSFkYAQzDUjwvS6rZ3N9LduekvuffFOAq/+Xs+T+pABffzhL7p8CfP3FBdQB3gXEH45S+psXEP9VgM7fvoD4rwJ0/v4FxF9TQE1IAT38YZbcPwV4+YsLGBNSQB9/mONf/XdIAZ38YR9y/xTg678KkPunAF//VYDcPwU4+IsLGDekgI7+cA+5fwow8hcUsPxTgLG/uIBxQQro6w/XEPinABd/bQHLPwUY+6sLeCEFdPeH989Hfj4poL//55ddOqgCAIQBKKT9S5vB294+GeAeA/gbwN8A/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbM9DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAP//AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbwN4C/AfwN4G8AfwPm+hvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvAH8D+BvA34Bd/gbwN4C/AfwN4G8AfwP4G8DfAP4G8DeAvwH8DeBvQMXfAP4G8DeAvwH8DeBvQNPfAP4G8Deg7G8AfwPa/gbE/Q2I+xvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gYs8DeAvwH8DeBvAH8D+BvA3wD+BvA3gL8B/A3gbwB/A/gbwN8A/gbs9zeAvwH8DeBvAH8D+BvA3wD+BvT8DeBvAH8D+BvQ9TeAvwFtfwPi/gbwf+3BsQAAAADAIH/rYeypAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAUHBYk13Z7LTsAAAAASUVORK5CYII=')",
          }}
          aria-label="Scroll down"
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{
          y: contentYOffset,
        }}
        className="relative z-20 w-full md:max-w-6xl mx-auto px-4 sm:px-8 md:px-24 pb-16 md:pb-32 space-y-12 md:space-y-20"
      >
        {/* Core Subheader Panel */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-16 sm:pt-24 w-full">
          <div className="max-w-4xl space-y-4 sm:space-y-6 md:space-y-8 flex flex-col items-center justify-center w-full px-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="text-[8px] sm:text-xs font-bold tracking-widest text-black uppercase break-words w-full"
            >
              Katalyst Street is the Enterprise AI Transformation Company.
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-black italic break-words w-full max-w-full"
            >
              From AI Ambition To <br className="hidden sm:block" />
              <span className="text-black font-light font-serif italic block sm:inline break-words">
                Measurable Business Outcome
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-lg md:text-xl text-zinc-800 dark:text-zinc-800 font-dark leading-relaxed max-w-2xl px-2 break-words"
            >
              We help organizations move from AI ambition to measurable business
              outcomes through Strategy, Governance, Trusted Data, Intelligent
              Automation, and Optimization.
            </motion.p>

            {/* Segmented Control */}
            <div className="flex flex-col items-center justify-center gap-2 pt-4 text-center w-full max-w-full mx-auto">
              <p className="text-[8px] sm:text-xs font-semibold tracking-wider text-zinc-800 uppercase w-full break-words">
                Unlike traditional consulting firms, we combine:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                {["Advisory", "Engineering", "Platforms", "Ecosystem"].map(
                  (item, idx) => (
                    <React.Fragment key={item}>
                      <span className="px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full border-2 border-black font-black text-[8px] sm:text-xs text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none whitespace-nowrap">
                        {item}
                      </span>
                      {idx < 3 && (
                        <span className="text-zinc-400 font-light text-sm sm:text-lg select-none">
                          +
                        </span>
                      )}
                    </React.Fragment>
                  ),
                )}
              </div>
            </div>

            {/* Action Buttons */}
           <div className="flex flex-wrap items-center justify-center w-full max-w-full gap-1.5 sm:gap-3 md:gap-4 pt-4 sm:pt-6 px-1 ">
              {[
                { label: "Schedule Executive Briefing", href: "#contact" },
                { label: "Take AI Readiness Assessment", href: "#contact" },
                { label: "Read AI Governance White Paper", href: "/PID.pdf" }, 
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.includes(".pdf") ? "_blank" : "_self"}
                  rel={action.href.includes(".pdf") ? "noopener noreferrer" : ""}
                  // THE NEW CLICK HANDLER
                  onClick={(e) => {
                    if (action.href.startsWith("#")) {
                      e.preventDefault(); // Stop the default jumpy scroll
                      const targetId = action.href.replace("#", "");
                      const elem = document.getElementById(targetId);
                      
                      if (elem) {
                        // Get the exact position of the form
                        const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
                        //  Subtract 120 pixels to leave breathing room 
                        const offsetPosition = elementPosition - 150;
                        
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        });
                      }
                    }
                  }}
                  className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 rounded-full border-2 border-black font-black text-[8px] sm:text-sm md:text-base text-black bg-transparent transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none text-center max-w-full whitespace-normal sm:whitespace-nowrap touch-manipulation cursor-pointer inline-block"
                >
                  {action.label}
                </a>
              ))}
            </div>

            {/* Chevron Tabs */}
            <div className="w-full flex justify-center pt-2 relative z-30 overflow-x-auto overflow-y-visible px-1">
              <div className="inline-flex items-center bg-white relative w-full max-w-4xl justify-between rounded-md border border-zinc-200 p-0.5 sm:p-1 shadow-sm min-w-[280px] sm:min-w-[400px] md:min-w-0">
                {tabButtons}
              </div>
            </div>

            {/* Carousel */}
            <div className="w-full pt-8 md:pt-12 max-w-[100vw] overflow-hidden">
              <Carousel360 />
            </div>
          </div>
        </section>

        {/* Enterprise Reality Section */}
        <section className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-12 md:py-24 text-left overflow-hidden">
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-16 max-w-4xl">
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-black">
              THE ENTERPRISE REALITY
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-black tracking-tight text-black uppercase leading-[1.1] md:leading-[0.95] break-words">
              Most AI Initiatives Don't Fail <br />
              Because of AI
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2 break-words">
              They fail because organizations struggle with the fundamentals. AI
              transformation requires more than technology — it requires a
              transformation operating model.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch w-full max-w-full">
            <div className="bg-zinc-50 dark:bg-zinc-300/40 border border-zinc-500/60 rounded-2xl p-4 sm:p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="font-black tracking-widest uppercase text-black mb-4 md:mb-8 text-xs sm:text-sm md:text-base">
                  THE CHALLENGES
                </h3>
                <ul className="space-y-2 md:space-y-4 text-xs sm:text-sm md:text-base font-dark text-black">
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
                      className="flex items-start gap-2 sm:gap-3 w-full"
                    >
                      <span className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-black flex-shrink-0" />
                      <div className="break-words">{challenge}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-300/40 border border-zinc-200/60 rounded-2xl p-4 sm:p-8 md:p-12 md:pr-16 flex flex-col justify-between">
              <div>
                <h3 className="font-black tracking-widest uppercase text-black mb-4 md:mb-8 text-xs sm:text-sm md:text-base">
                  THE KATALYST STREET SOLUTION
                </h3>
                <ul className="space-y-2 md:space-y-4 text-xs sm:text-sm md:text-base font-dark text-black">
                  {[
                    {
                      bold: "StrategyMax",
                      light: "— AI Opportunity Discovery & Roadmaps",
                    },
      
                    { bold: "DeltaMax", light: "— Trusted Data Intelligence" },
                    
                    { bold: "PMO-Max", light: "— Agentic Control Plane - AI Governance and Compliance" },
                    {
                      bold: "Change Management & Human Capital Enablement",
                      light: "",
                    },
                    {
                      bold: "OptiMax",
                      light: "— Operationalize at Enterprise Scale",
                    },
                    { bold: "Agentic Enterprise Framework", light: "" },
                  ].map((solution, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 sm:gap-3 w-full"
                    >
                      <span className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-black flex-shrink-0" />
                      <div className="break-words">
                        <span className="font-bold">{solution.bold}</span>
                        {solution.light && (
                          <span className="font-light"> {solution.light}</span>
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

        {/* Footer */}
        <footer className="pt-12 md:pt-24 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-6 text-xs text-zinc-600 tracking-wider w-full overflow-hidden">
          <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
            <div className="flex items-center justify-center select-none opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/kslogo-new.png"
                alt="Katalyst Street Footer Logo"
                width={50}
                height={50}
                className="object-contain filter invert dark w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px]"
              />
            </div>
            <div className="font-medium text-zinc-500 max-w-sm text-xs sm:text-sm break-words">
              Taming the AI Complexity and building AI Native Enterprises
            </div>
            <div className="text-zinc-600 mt-1 text-[11px] sm:text-xs break-words">
              Avalon Boulevard, Georgia, 30009
            </div>
            <div className="mt-2 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} KATALYST STREET INC.
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 md:gap-4 w-full sm:w-auto">
            <a
              href="mailto:CONTACT@KATALYSTSTREET.COM"
              className="hover:text-black transition-colors flex items-center gap-2 font-medium text-[11px] sm:text-xs break-words max-w-full"
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
            <a
              href="https://www.linkedin.com/company/katalyst-street"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors flex items-center gap-2 font-medium text-[11px] sm:text-xs max-w-full"
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

      {/* NEW: Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-black dark:bg-white text-white dark:text-black w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          showBackToTop
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </motion.div>
  );
}