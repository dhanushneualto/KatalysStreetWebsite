"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PlatformKey = "deltamax" | "optimax" | "pmomax";

export default function PlatformShowcase() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("deltamax");

  // Complete data matrix for the 3 platforms
  const platformsData = {
    deltamax: {
      tag: "FOUNDATIONS",
      name: "DeltaMax",
      badge: "AI Native Trust Platform",
      desc: 'An AI-powered data quality and anomaly detection platform designed to proactively monitor enterprise data pipelines and catch "unknown unknowns" — pipeline failures that traditional, rule-based monitoring tools fail to identify.',
      bulletsLeft: [
        "Real-Time Trust Scores",
        "Statistical Anomalies & Outliers",
        "Freshness Monitoring",
        "Data Lineage",
        "Executive Quality Reporting + AI Agent",
      ],
      bulletsRight: [
        "Drift Detection",
        "Business Health & Rules",
        "Proactive Alerting",
        "Self-Contained Deployment",
        "MDM, Migrations, Security Posture & More",
      ],
      videoSrc: "/deltamax.mp4",
      terminalTitle: "Deltamax_Dashboard",
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-500/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
    },
    optimax: {
      tag: "SCALE & OPTIMIZE",
      name: "OptiMax",
      badge: "AI-native Revenue Intelligence Engine",
      desc: "OptiMax is an AI-native Revenue Intelligence Engine that transforms the marketing organization from an opaque cost center into a predictive profitability engine. It pinpoints target market segments (B2B/B2C) to improve propensity to respond, reduce churn, and prioritize cross-sell/upsell. Our execution engine integrates with your ad platforms — Google Ads or custom native platforms — to run campaigns, while our Media Mix Modeling (MMM) Budget Intelligence Optimizer reads historical budgets and performance to recommend the right spend, in the right segment, on the right channel.",
      bulletsLeft: [
        "Target Market Segmentation",
        "Churn Reduction",
        "Media Mix Modeling",
        "Ad Campaign Platform Integration",
        "Google Ads Platform",
        "Self-Contained Deployment",
      ],
      bulletsRight: [
        "Propensity to Buy",
        "Cross-Sell / Up-Sell",
        "Executive Report + AI Agent Integration",
        "Google Analytics (GA4)",
        "Campaign Execution",
      ],
      videoSrc: "/optimax.mp4",
      terminalTitle: "Optimax_Dashboard",
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-500/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
    },
    pmomax: {
      tag: "STRATEGY",
      name: "PMO-Max",
      badge: "Governance-as-Code Agent Platform",
      desc: "PMO-Max is a critical platform for your AI Strategy Governance. It bridges the gap between human intent and autonomous execution with a structured Governance-as-Code Program Initiation Document (PID) Architect platform. It reduces operational ambiguity at the enterprise level and improves the velocity of AI delivery by bringing structure to the unstructured strategy that lives in PDFs, emails, meeting transcripts, slide decks, and dangerous tribal knowledge. These structured PIDs form the foundation for your AI agents downstream — giving you traceable execution that answers what AI touches, who decided, and who owns it.",
      bulletsLeft: [
        "PID Architecture Design",
        "Workspace Automation",
        "Risk Agent",
        "AI Assistant / RAG over Project Docs",
        "Stakeholder & RACI Mapping",
      ],
      bulletsRight: [
        "Governance-as-Code Workflows",
        "Real-Time Drawing & Document Validation",
        "Compliance Agent",
        "Multi-Format Ingestion (PDF, Word, Slides)",
        "Executive Governance Reporting",
      ],
      videoSrc: "/pmomax.mp4",
      terminalTitle: "pmomax_dashboard",
      statusText: "Secure Link",
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-900/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
    },
  };

  const currentData = platformsData[activePlatform];

  return (
    <section
      id="platforms"
      className="w-full max-w-7xl mx-auto px-4 py-16 text-left scroll-mt-24"
    >
      {/* SECTION HEADER TRACK */}
      <div className="space-y-4 max-w-5xl pt-16 border-t border-zinc-100/10 mt-16">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-dark">
          PURPOSE-BUILT PLATFORMS
        </span>
        <h2 className="text-3xl md:text-5xl tracking-tight text-zinc-900 font-black uppercase leading-[1.0] max-w-4xl">
          Three Platforms Powering <br /> Enterprise AI Transformation
        </h2>
        <p className="text-xs md:text-sm dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-1">
          Proprietary platforms purpose-built for enterprise AI — not bolted-on
          features, but purpose-engineered solutions.
        </p>
      </div>

      {/* 🧭 HORIZONTAL NAVIGATION TRACK */}
      <div className="w-full mt-12 flex flex-col sm:flex-row gap-3 items-center select-none border-b border-zinc-200/60 dark:border-zinc-800/40 pb-6">
        {(Object.keys(platformsData) as PlatformKey[]).map((key) => {
          const item = platformsData[key];
          const isActive = activePlatform === key;

          return (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`flex-1 w-full p-4 rounded-xl border text-center sm:text-left flex flex-col justify-center relative transition-all duration-200 outline-none overflow-hidden min-h-[76px] group
                ${isActive ? "border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/10 shadow-sm" : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/5"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activePlatformBackground"
                  className="absolute inset-0 bg-zinc-100/50 dark:bg-zinc-900/20 border-b-2 border-zinc-500 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`text-[8px] font-black tracking-widest uppercase mb-0.5 transition-colors ${isActive ? "text-zinc-900" : "text-zinc-400"}`}
              >
                {item.tag}
              </span>
              <h3
                className={`text-base font-black tracking-tight uppercase leading-none transition-colors ${isActive ? "text-zinc-900 " : "text-zinc-400"}`}
              >
                {item.name}
              </h3>
            </button>
          );
        })}
      </div>

      {/* ⚡ STACKED SHOWCASE CONTENT VIEWPORT */}
      <div className="w-full mt-8 bg-zinc-50/50 dark:bg-zinc-950/10 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col gap-8"
          >
            {/* 🎞️ TOP ITEM: Full-Width Widescreen Video App Window HUD */}
            <div className="w-full flex flex-col bg-[#111215] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl relative">
              {/* Mock Window Terminal Topbar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#17191E] border-b border-zinc-800 select-none z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 lowercase">
                  {currentData.terminalTitle}
                </span>
                <div className="w-16"></div>
              </div>

              {/* video bounds set to native landscape aspect-video */}
              <div className="relative w-full aspect-video bg-[#0E1013] overflow-hidden">
                <video
                  key={currentData.videoSrc}
                  src={currentData.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-fill opacity-95"
                />

                {/* Live Engine Status Badge */}
              </div>
            </div>

            {/* 📝 MIDDLE ITEM: Core Descriptions Layer */}
            <div className="space-y-3 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight uppercase leading-none">
                  {currentData.name}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded-full border text-[8px] font-bold tracking-wider uppercase ${currentData.accentColor}`}
                >
                  {currentData.badge}
                </span>
              </div>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-900 leading-relaxed font-normal">
                {currentData.desc}
              </p>
            </div>

            {/* 🏷️ BOTTOM ITEM: Horizontal Grid of Capability Cards */}
            <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-800/60 space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-zinc-900 uppercase block">
                Capabilities
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[...currentData.bulletsLeft, ...currentData.bulletsRight].map(
                  (text) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 p-3 bg-zinc-100/30 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900 rounded-xl"
                    >
                      <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-900 flex-shrink-0 select-none">
                        <span className="text-[10px] font-bold">✓</span>
                      </div>
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-900 leading-tight">
                        {text}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* ⚡ Action Operations CTAs Bar */}
            <div className="flex gap-2 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30">
              <button
                className={`px-5 py-2.5 rounded-xl border font-bold text-[11px] text-center transition-all outline-none ${currentData.ctaLearnMoreBorder}`}
              >
                Learn More
              </button>
              <button
                className={`px-5 py-2.5 rounded-xl font-bold text-[11px] text-center transition-all outline-none shadow-sm ${currentData.ctaBg}`}
              >
                Request Demo
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DYNAMIC TRACK OVERVIEW FOOTER */}
      <div className="space-y-3 mb-10 max-w-4xl mt-24 pt-16 border-t border-zinc-200/50 dark:border-zinc-900">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-900">
          INTEGRATED ARCHITECTURE
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 uppercase leading-[1.0] max-w-3xl">
          How Everything Fits Together
        </h2>
        <p className="text-xs md:text-sm text-zinc-900 font-dark dark:text-zinc-900 max-w-xl leading-relaxed">
          Strategy without execution fails. Katalyst Street connects all
          foundational layers seamlessly.
        </p>
      </div>

      {/* ARROW FLOW PIPELINE SECTION */}
      <div className="relative flex flex-col w-full max-w-2xl mx-auto">
        {/* STAGE 1: Outcomes */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-4">
            <span className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">
              OUTCOMES
            </span>
          </div>
          <div className="col-span-9 bg-zinc-100/60 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900 rounded-xl px-6 py-4 flex justify-between items-center shadow-sm">
            <h3 className="text-base font-black text-zinc-900 tracking-tight">
              Business Outcomes
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              Revenue • Cost • Growth
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-2">
            <div className="text-zinc-300 dark:text-zinc-700 text-sm font-light select-none">
              ↓
            </div>
          </div>
        </div>

        {/* STAGE 2: Scale */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-4">
            <span className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">
              SCALE
            </span>
          </div>
          <div className="col-span-9 bg-zinc-100/60 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900 rounded-xl px-6 py-4 flex justify-between items-center shadow-sm">
            <h3 className="text-base font-black text-zinc-900 tracking-tight">
              Optimization Intelligence
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              OptiMax
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-2">
            <div className="text-zinc-300 dark:text-zinc-700 text-sm font-light select-none">
              ↓
            </div>
          </div>
        </div>

        {/* STAGE 3: Govern */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-4">
            <span className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">
              GOVERN
            </span>
          </div>
          <div className="col-span-9 bg-zinc-100/60 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900 rounded-xl px-6 py-4 flex justify-between items-center shadow-sm">
            <h3 className="text-base font-black text-zinc-900 tracking-tight">
              AI Governance & Program Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              PMO-Max
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-2">
            <div className="text-zinc-300 dark:text-zinc-700 text-sm font-light select-none">
              ↓
            </div>
          </div>
        </div>

        {/* STAGE 4: Trust */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-4">
            <span className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">
              TRUST
            </span>
          </div>
          <div className="col-span-9 bg-zinc-100/60 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900 rounded-xl px-6 py-4 flex justify-between items-center shadow-sm">
            <h3 className="text-base font-black text-zinc-900 tracking-tight">
              Trusted Data Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              DeltaMax
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-2">
            <div className="text-zinc-300 dark:text-zinc-700 text-sm font-light select-none">
              ↓
            </div>
          </div>
        </div>

        {/* STAGE 5: Foundation */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-4">
            <span className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">
              FOUNDATION
            </span>
          </div>
          <div className="col-span-9 bg-zinc-100/60 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900 rounded-xl px-6 py-4 text-left shadow-sm">
            <p className="text-xs md:text-sm font-bold text-zinc-600 dark:text-zinc-900 tracking-wide leading-relaxed">
              Enterprise Data • Cloud & AI Infrastructure • AWS • Azure • GCP •
              Snowflake • Databricks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
