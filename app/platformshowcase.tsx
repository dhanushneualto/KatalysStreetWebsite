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
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-500/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
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
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-500/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
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
      accentColor: "border-zinc-500/80 text-zinc-900 bg-zinc-900/5",
      dotBg: "bg-zinc-900",
      ctaBg: "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      ctaLearnMoreBorder:
        "bg-zinc-500 hover:bg-zinc-900 text-white cursor-pointer",
      footnote:
        "Note for review: the source GTM document's feature bullets for PMO-Max appear to be a copy/paste of OptiMax's list. We've substituted governance-platform-appropriate features above, drawn from the PID Architect product visuals — please confirm before this goes live.",
    },
  };

  const currentData = platformsData[activePlatform];

  return (
    <section
      id="platforms"
      className="w-full max-w-7xl mx-auto px-4 py-16 text-left scroll-mt-24"
    >
      <div className="space-y-4 max-w-5xl pt-16 border-t border-zinc-100/10 mt-16">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-dark">
          PURPOSE-BUILT PLATFORMS
        </span>
        <h2 className="text-3xl md:text-5xl  tracking-tight text-zinc-900 font-black uppercase leading-[1.0] max-w-4xl">
          Three Platforms Powering <br /> Enterprise AI Transformation
        </h2>
        <p className="text-xs md:text-sm dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-1">
          Proprietary platforms purpose-built for enterprise AI — not bolted-on
          features, but purpose-engineered solutions.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left select-none">
        {/* LEFT SIDEBAR TRACK */}
        <div className="lg:col-span-3 flex flex-col gap-2 relative z-20">
          {(Object.keys(platformsData) as PlatformKey[]).map((key) => {
            const item = platformsData[key];
            const isActive = activePlatform === key;

            return (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`w-full p-4 rounded-xl border text-left flex flex-col justify-center relative transition-all duration-200 outline-none overflow-hidden min-h-[76px] group
                  ${
                    isActive
                      ? "border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/10 shadow-sm"
                      : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/5"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePlatformBackground"
                    className="absolute inset-0 bg-zinc-100/50 dark:bg-zinc-900/20 border-l-2 border-zinc-500 -z-10"
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

        {/* RIGHT DISPLAY VIEWPORT */}
        <div className="lg:col-span-9 bg-zinc-50/50 dark:bg-zinc-950/10 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-6 md:p-8 relative overflow-hidden min-h-[460px] shadow-sm flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full h-full"
            >
              {/* PLATFORM METRICS DESCRIPTION COLUMN */}
              <div className="xl:col-span-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-black text-zinc-900  tracking-tight uppercase leading-none">
                      {currentData.name}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[8px] font-bold tracking-wider uppercase ${currentData.accentColor}`}
                    >
                      {currentData.badge}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-900 font-dark leading-relaxed">
                    {currentData.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/60">
                  <ul className="space-y-2">
                    {currentData.bulletsLeft.map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-2 text-xs font-dark text-zinc-900 dark:text-zinc-900"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${currentData.dotBg}`}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {currentData.bulletsRight.map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-2 text-xs font-dark text-zinc-700 dark:text-zinc-900"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${currentData.dotBg}`}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <button
                    className={`px-4 py-2 rounded-xl border font-bold text-xs bg-transparent transition-all outline-none ${currentData.ctaLearnMoreBorder}`}
                  >
                    Learn More
                  </button>
                  <button
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all outline-none shadow-sm ${currentData.ctaBg}`}
                  >
                    Request a Demo
                  </button>
                </div>
              </div>

              {/* DIAGNOSTIC / METRICS HUD PANEL */}
              {currentData.panelType === "diagnostic" ? (
                <div className="xl:col-span-5 bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-900 rounded-xl p-4 flex flex-col gap-4 relative w-full overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-900 pb-2">
                    <span className="text-[9px] text-zinc-900 font-bold tracking-wider uppercase ml-1">
                      {currentData.terminalTitle}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[9px] text-zinc-900 font-dark tracking-wider uppercase">
                      {currentData.terminalIndex}
                    </div>
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <div className="text-[10px] text-zinc-900 font-dark uppercase tracking-wider">
                        {currentData.terminalStatus}
                      </div>
                      <div className="text-base  font-dark text-zinc-900 ">
                        {currentData.terminalMetric}
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2.5 font-mono text-[9px] text-zinc-400 leading-normal">
                    {currentData.terminalLog}
                  </div>
                </div>
              ) : (
                <div className="xl:col-span-5 bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-900 rounded-xl p-4 flex flex-col gap-4 relative w-full overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-900 pb-2">
                    <span className="text-[9px] text-zinc-900 font-bold tracking-wider uppercase ml-1">
                      {currentData.matrixTitle}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {currentData.metrics.map((m) => (
                      <div key={m.label} className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-900 font-bold">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                            {m.value}
                          </span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${currentData.dotBg}`}
                            style={{ width: `${m.barPercent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-16 flex items-end justify-between gap-1.5 px-0.5">
                    {currentData.barHeights.map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm ${currentData.dotBg} opacity-80`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium tracking-wide text-left pt-4 border-t border-zinc-200/30 dark:border-zinc-900/40 mt-4">
            {currentData.footnote}
          </div>
        </div>
      </div>

      {/* HEADER SECTION FOR DYNAMIC TRACK OVERVIEW */}
      <div className="space-y-3 mb-10 max-w-4xl mt-24 pt-16 border-t border-zinc-200/50 dark:border-zinc-900">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-900">
          INTEGRATED ARCHITECTURE
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900  uppercase leading-[1.0] max-w-3xl">
          How Everything Fits Together
        </h2>
        <p className="text-xs md:text-sm text-zinc-900 font-dark dark:text-zinc-900 max-w-xl leading-relaxed">
          Strategy without execution fails. Katalyst Street connects all
          foundational layers seamlessly.
        </p>
      </div>

      {/* 🚀 EXPANDED ARROW FLOW PIPELINE MATRIX CONTAINER */}
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

        {/* COMPACT GAP ARROW 1 */}
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
            <h3 className="text-base font-black text-zinc-900  tracking-tight">
              Optimization Intelligence
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              OptiMax
            </span>
          </div>
        </div>

        {/* COMPACT GAP ARROW 2 */}
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
            <h3 className="text-base font-black text-zinc-900  tracking-tight">
              AI Governance & Program Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              PMO-Max
            </span>
          </div>
        </div>

        {/* COMPACT GAP ARROW 3 */}
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
            <h3 className="text-base font-black text-zinc-900  tracking-tight">
              Trusted Data Layer
            </h3>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-900 uppercase">
              DeltaMax
            </span>
          </div>
        </div>

        {/* COMPACT GAP ARROW 4 */}
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
