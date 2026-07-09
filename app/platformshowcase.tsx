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
      terminalTitle: "DeltaMax Diagnostic Panel",
      terminalIndex: "Diagnostic Stream Drift Index (PSI) Pipeline Anomaly",
      terminalStatus: "Completed",
      terminalMetric: "0.12",
      terminalLabel: "Outlier",
      terminalLog:
        "[12:37:11] Diagnostics complete. DeltaMax successfully intercepted 1 critical schema anomaly.",
      accentColor: "border-emerald-500/80 text-emerald-400 bg-emerald-500/5",
      dotBg: "bg-emerald-500",
    },
    optimax: {
      tag: "SCALE & OPTIMIZE",
      name: "OptiMax",
      badge: "AI Native Revenue Intelligence",
      desc: "An enterprise-grade performance engine that automatically balances corporate resource allocation with operational speed, fine-tuning revenue loops and pipeline throughput at scale.",
      bulletsLeft: [
        "Marketing Intelligence & MMM",
        "Customer Segmentation",
        "Audience Insights",
        "Budget Balancing Logs",
        "Executive Action Dashboards",
      ],
      bulletsRight: [
        "Propensity-to-Respond Scales",
        "Churn Reduction Mapping",
        "Cross-Sell / Upsell Engines",
        "Multi-Channel Synthesis",
        "Performance Telemetry & Reporting",
      ],
      terminalTitle: "OptiMax Performance Rail",
      terminalIndex: "Resource Allocation Matrix Real-Time Yield Index",
      terminalStatus: "Optimized",
      terminalMetric: "0.94",
      terminalLabel: "Peak Performance",
      terminalLog:
        "[14:22:05] Allocation loop updated. System efficiency maximized by +14.2% across active nodes.",
      accentColor: "border-amber-500/80 text-amber-400 bg-amber-500/5",
      dotBg: "bg-amber-500",
    },
    pmomax: {
      tag: "STRATEGY",
      name: "PMO-Max",
      badge: "Governance-as-Code Platform",
      desc: "A structural AI alignment dashboard that transforms raw organizational goals and policy documents into strict human-in-the-loop technical control parameters across standard codebases.",
      bulletsLeft: [
        "Front-of-Loop AI Controls",
        "Upstream Risk Interception",
        "Governance-as-Code Rails",
        "Structured Framework Scans",
        "Autonomy Compliance Vectors",
      ],
      bulletsRight: [
        "Parsing & Ingestion Engines",
        "Traceable Audit Ledgers",
        "Automated Policy Checks",
        "Downstream Guardrail Builds",
        "Human Intent Calibration Suite",
      ],
      terminalTitle: "PMO-Max Compliance Core",
      terminalIndex: "Enterprise Security Posture & Access Authorization Scan",
      terminalStatus: "Verified",
      terminalMetric: "100%",
      terminalLabel: "Compliant",
      terminalLog:
        "[09:15:43] Framework sweep clean. All active model connections conform to defined security policy.",
      accentColor: "border-sky-500/80 text-sky-400 bg-sky-500/5",
      dotBg: "bg-sky-500",
    },
  };

  const currentData = platformsData[activePlatform];

  return (
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
                <button className="px-5 py-2.5 rounded-full border border-zinc-800 font-bold text-xs text-zinc-300 bg-transparent hover:text-white hover:border-zinc-700 transition-all outline-none">
                  Learn More
                </button>
                <button className="px-5 py-2.5 rounded-full font-bold text-xs text-black bg-emerald-400 hover:bg-emerald-300 transition-all outline-none shadow-md shadow-emerald-950/20">
                  Request a Demo
                </button>
              </div>
            </div>

            {/* DIAGNOSTIC HUD TERMINAL COMPONENT PANEL */}
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
          </motion.div>
        </AnimatePresence>

        {/* Small Ambient Subtext Notes Block */}
        <div className="text-[10px] text-zinc-600 font-medium tracking-wide text-left pt-6 border-t border-zinc-900/40 mt-6">
          CTA strategy: "Learn More" routes to standalone product microsites;
          live diagnostic pipeline metadata requires secure gateway
          authorization.
        </div>
      </div>
    </div>
  );
}
