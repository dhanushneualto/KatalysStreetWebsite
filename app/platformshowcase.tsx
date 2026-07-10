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
      panelType: "diagnostic" as const,
      terminalTitle: "DeltaMax Diagnostic Panel",
      terminalIndex: "Diagnostic Stream Drift Index (PSI) Pipeline Anomaly",
      terminalStatus: "Completed",
      terminalMetric: "0.12",
      terminalLabel: "Outlier",
      terminalLog:
        "[12:37:11] Diagnostics complete. DeltaMax successfully intercepted 1 critical schema anomaly.",
      accentColor: "border-emerald-500/80 text-emerald-400 bg-emerald-500/5",
      dotBg: "bg-emerald-500",
      ctaBg: "bg-emerald-400 hover:bg-emerald-300 text-black",
      ctaLearnMoreBorder:
        "border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700",
      footnote:
        'CTA strategy: "Learn More" routes to standalone product microsites; live diagnostic pipeline metadata requires secure gateway authorization.',
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
      panelType: "matrix" as const,
      matrixTitle: "OptiMax Allocation Matrix",
      metrics: [
        {
          label: "Direct Response Yield",
          value: "82% Efficiency",
          barPercent: 82,
        },
        { label: "Revenue Acceleration", value: "+24.5% QoQ", barPercent: 70 },
        {
          label: "Budget Allocation Variance",
          value: "Optimal",
          barPercent: 15,
        },
      ],
      barHeights: [45, 80, 40, 75, 30],
      toggles: [
        { label: "Allocation Matrix", active: true },
        { label: "Executive Dashboard", active: false },
      ],
      accentColor: "border-amber-500/80 text-amber-400 bg-amber-500/5",
      dotBg: "bg-amber-500",
      ctaBg: "bg-amber-400 hover:bg-amber-300 text-black",
      ctaLearnMoreBorder:
        "border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700",
      footnote:
        "Product imagery rotates between the Allocation Matrix and the Executive Dashboard so prospects see both the planning and the monitoring side of OptiMax.",
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
      panelType: "matrix" as const,
      matrixTitle: "PMO-Max Pipeline Diagnostics",
      metrics: [
        {
          label: "Schematic / PID Parsing Rate",
          value: "97% Extraction Accuracy",
          barPercent: 97,
        },
        { label: "Document Sync Delay", value: "<2s latency", barPercent: 10 },
        {
          label: "Active PIDs Managed",
          value: "12 Industrial Units",
          barPercent: 55,
        },
      ],
      barHeights: [50, 35, 70, 60],
      toggles: [] as { label: string; active: boolean }[],
      accentColor: "border-violet-500/80 text-violet-400 bg-violet-500/5",
      dotBg: "bg-violet-500",
      ctaBg: "bg-violet-500 hover:bg-violet-400 text-white",
      ctaLearnMoreBorder:
        "border-violet-500/60 text-violet-300 hover:text-white hover:border-violet-400",
      footnote:
        "Note for review: the source GTM document's feature bullets for PMO-Max appear to be a copy/paste of OptiMax's list. We've substituted governance-platform-appropriate features above, drawn from the PID Architect product visuals — please confirm before this goes live.",
    },
  };

  const currentData = platformsData[activePlatform];

  return (
    <section
      id="platforms"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      <div className="space-y-4 max-w-5xl pt-32 border-t border-zinc-100/10 mt-32">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          PURPOSE-BUILT PLATFORMS
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-6xl">
          Three Platforms Powering <br /> Enterprise AI Transformation
        </h2>
        <p className="text-base md:text-lg text-zinc-900 dark:text-zinc-900  max-w-3xl leading-relaxed pt-2">
          Proprietary platforms purpose-built for enterprise AI — not bolted-on
          features, but purpose-engineered solutions.
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left select-none">
        {/* LEFT SIDEBAR TRACK (3 Columns Width) */}
        <div className="lg:col-span-3 flex flex-col gap-3 relative z-20">
          {(Object.keys(platformsData) as PlatformKey[]).map((key) => {
            const item = platformsData[key];
            const isActive = activePlatform === key;

            return (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`w-full p-5 rounded-2xl border text-left flex flex-col justify-center relative transition-all duration-300 outline-none overflow-hidden min-h-[90px] group
                  ${
                    isActive
                      ? "border-zinc-800 bg-zinc-900/10 shadow-lg shadow-black/10"
                      : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                  }
                `}
              >
                {/* 🧪 THE FLUID BACKDROP PILL: Morphs height & slides smoothly between selections */}
                {isActive && (
                  <motion.div
                    layoutId="activePlatformBackground"
                    className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/60 -z-10 border-l-2 border-amber-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span
                  className={`text-[9px] font-black tracking-widest uppercase mb-1 transition-colors ${isActive ? "text-amber-500" : "text-zinc-500 group-hover:text-zinc-400"}`}
                >
                  {item.tag}
                </span>
                <h3
                  className={`text-xl font-black tracking-tight uppercase leading-none transition-colors ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}
                >
                  {item.name}
                </h3>
                <span
                  className={`text-[10px] font-medium tracking-wide mt-1 transition-colors ${isActive ? "text-zinc-300" : "text-zinc-600"}`}
                >
                  {item.name === "DeltaMax"
                    ? "Data Quality & Trust"
                    : item.name === "OptiMax"
                      ? "Revenue Intelligence Engine"
                      : "Governance Agent Platform"}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT DISPLAY VIEWPORT (9 Columns Width) */}
        <div className="lg:col-span-9 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[580px] shadow-2xl flex flex-col justify-between">
          {/* Animated Slide-and-Fade Container Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start w-full h-full"
            >
              {/* PLATFORM METRICS DESCRIPTION COLUMN */}
              <div className="xl:col-span-7 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-none">
                      {currentData.name}
                    </h2>
                    <span
                      className={`px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-wider uppercase ${currentData.accentColor}`}
                    >
                      {currentData.badge}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                    {currentData.desc}
                  </p>
                </div>
                {/* Double Split Feature Bullet Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-zinc-900">
                  <ul className="space-y-3.5">
                    {currentData.bulletsLeft.map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-2.5 text-xs font-semibold text-zinc-300"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${currentData.dotBg}`}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3.5">
                    {currentData.bulletsRight.map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-2.5 text-xs font-semibold text-zinc-300"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${currentData.dotBg}`}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call-to-Actions Row */}
                <div className="flex flex-wrap gap-3 pt-8">
                  <button
                    className={`px-5 py-2.5 rounded-full border font-bold text-xs bg-transparent transition-all outline-none ${currentData.ctaLearnMoreBorder}`}
                  >
                    Learn More
                  </button>
                  <button
                    className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all outline-none shadow-md ${currentData.ctaBg}`}
                  >
                    Request a Demo
                  </button>
                </div>
              </div>

              {/* DIAGNOSTIC / METRICS HUD PANEL */}
              {currentData.panelType === "diagnostic" ? (
                <div className="xl:col-span-5 bg-zinc-900/30 border border-zinc-900/60 rounded-2xl p-5 flex flex-col gap-6 relative w-full overflow-hidden">
                  {/* Header Window Controller Buttons */}
                  <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase ml-2">
                      {currentData.terminalTitle}
                    </span>
                  </div>

                  {/* Virtualized Graphic Line Wave placeholder mapping bounds */}
                  <div className="w-full h-24 flex items-center justify-center relative px-2">
                    <svg
                      className="w-full h-full text-zinc-800"
                      viewBox="0 0 300 100"
                      fill="none"
                    >
                      <path
                        d="M0,50 Q40,48 80,53 T160,20 T240,50 T300,48"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <motion.circle
                        key={activePlatform}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        cx="160"
                        cy="20"
                        r="4"
                        className="fill-amber-500 stroke-zinc-950 stroke-2"
                      />
                    </svg>
                  </div>

                  {/* Telemetry Index Rows */}
                  <div className="space-y-1.5 text-left">
                    <div className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">
                      {currentData.terminalIndex}
                    </div>
                    <div className="flex items-baseline gap-4 pt-1">
                      <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        {currentData.terminalStatus}
                      </div>
                      <div className="text-lg font-mono font-black text-white">
                        {currentData.terminalMetric}
                      </div>
                      <div className="text-xs text-amber-500 font-bold uppercase tracking-wider ml-auto">
                        {currentData.terminalLabel}
                      </div>
                    </div>
                  </div>

                  {/* Console Output Log Banner Box */}
                  <div className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 font-mono text-[10px] text-zinc-400 leading-relaxed text-left">
                    {currentData.terminalLog}
                  </div>
                </div>
              ) : (
                <div className="xl:col-span-5 bg-zinc-900/30 border border-zinc-900/60 rounded-2xl p-5 flex flex-col gap-6 relative w-full overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase ml-2">
                      {currentData.matrixTitle}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {currentData.metrics.map((m) => (
                      <div key={m.label} className="space-y-1.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-xs text-zinc-300 font-bold">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-black text-white whitespace-nowrap">
                            {m.value}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${currentData.dotBg}`}
                            style={{ width: `${m.barPercent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-20 flex items-end justify-between gap-2 px-1">
                    {currentData.barHeights.map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-md ${currentData.dotBg} opacity-80`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  {currentData.toggles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentData.toggles.map((t) => (
                        <span
                          key={t.label}
                          className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wide ${
                            t.active
                              ? `${currentData.dotBg} text-black border-transparent`
                              : "border-zinc-800 text-zinc-400"
                          }`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Small Ambient Subtext Notes Block */}
          <div className="text-[10px] text-zinc-600 font-medium tracking-wide text-left pt-6 border-t border-zinc-900/40 mt-6">
            {currentData.footnote}
          </div>
        </div>
      </div>
      {/* VERTICAL MATRIX STACK */}

      <div className="space-y-4 mb-16 max-w-5xl mt-24 pt-24 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          INTEGRATED ARCHITECTURE
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-5xl">
          How Everything <br /> Fits Together
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-2">
          Strategy without execution fails. Execution without trust fails. Trust
          without optimization delivers no value. Katalyst Street connects all
          layers.
        </p>
      </div>

      {/* 1. THE VERTICAL MATRIX STACK RUNNING DOWN IN THE CENTER */}
      <div className="relative flex flex-col w-full max-w-4xl mx-auto mb-24">
        {/* LAYER 01: Outcomes */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-900 uppercase">
              OUTCOMES
            </span>
          </div>
          <div className="col-span-9 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 flex justify-between items-center">
            <h3 className="text-lg font-black text-black  tracking-tight">
              Business Outcomes
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold tracking-wider text-zinc-900 dark:text-zinc-900 uppercase">
              Revenue • Cost • Growth
            </span>
          </div>
        </div>

        {/* CENTERED DOWNWARD ARROW 1 */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-4">
            <div className="text-zinc-300 dark:text-zinc-700 text-lg font-light leading-none select-none">
              ↓
            </div>
          </div>
        </div>

        {/* LAYER 02: Scale */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-900 uppercase">
              SCALE
            </span>
          </div>
          <div className="col-span-9 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 flex justify-between items-center">
            <h3 className="text-lg font-black text-black  tracking-tight">
              Optimization Intelligence
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold tracking-wider text-zinc-600 dark:text-zinc-900 uppercase">
              OptiMax
            </span>
          </div>
        </div>

        {/* CENTERED DOWNWARD ARROW 2 */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-4">
            <div className="text-zinc-300 dark:text-zinc-700 text-lg font-light leading-none select-none">
              ↓
            </div>
          </div>
        </div>

        {/* LAYER 03: Govern */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-900 uppercase">
              GOVERN
            </span>
          </div>
          <div className="col-span-9 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 flex justify-between items-center">
            <h3 className="text-lg font-black text-black tracking-tight">
              AI Governance & Program Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold tracking-wider text-zinc-600 dark:text-zinc-900 uppercase">
              PMO-Max
            </span>
          </div>
        </div>

        {/* CENTERED DOWNWARD ARROW 4 */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-4">
            <div className="text-zinc-300 dark:text-zinc-700 text-lg font-light leading-none select-none">
              ↓
            </div>
          </div>
        </div>

        {/* LAYER 04: Trust */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-900 uppercase">
              TRUST
            </span>
          </div>
          <div className="col-span-9 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 flex justify-between items-center">
            <h3 className="text-lg font-black text-black tracking-tight">
              Trusted Data Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold tracking-wider text-zinc-600 dark:text-zinc-900 uppercase">
              DeltaMax
            </span>
          </div>
        </div>

        {/* CENTERED DOWNWARD ARROW 5 */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex justify-center py-4">
            <div className="text-zinc-300 dark:text-zinc-700 text-lg font-light leading-none select-none">
              ↓
            </div>
          </div>
        </div>

        {/* LAYER 05: Foundation */}
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <div className="col-span-3 text-right pr-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-900 uppercase">
              FOUNDATION
            </span>
          </div>
          <div className="col-span-9 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 text-left">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-900 tracking-wide leading-relaxed">
              Enterprise Data • Cloud & AI Infrastructure • AWS • Azure • GCP •
              Snowflake • Databricks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
