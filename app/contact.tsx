"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    organization: "",
    interest: "StrategyMax",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to advisory team interface parameter tracking
    console.log("Submitting Advisory Intake Data Package:", formData);
  };

  const actionCards = [
    {
      title: "Schedule Executive Briefing",
      desc: "Meet with a Katalyst Street advisor to discuss your AI transformation priorities.",
    },
    {
      title: "Take AI Readiness Assessment",
      desc: "Understand where your organization sits on the AI transformation journey.",
    },
    {
      title: "Read the AI Governance White Paper",
      desc: "A practical guide for enterprise leaders navigating AI governance and risk.",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-center scroll-mt-24"
    >
      {/* SECTION 1: START YOUR TRANSFORMATION HERO HEADER */}
      <div className="space-y-6 max-w-4xl mx-auto mb-16">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-dark">
          START YOUR TRANSFORMATION
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95]">
          Your AI Transformation <br /> Starts Here
        </h2>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl mx-auto leading-relaxed pt-2">
          Whether you're defining strategy, building trusted foundations,
          engineering AI capabilities, or optimizing business outcomes —
          Katalyst Street provides the roadmap, governance, and execution model
          to help you succeed.
        </p>
      </div>

      {/* THREE INTERACTIVE ACTION OPTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24 items-stretch">
        {actionCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-6 md:p-8 flex flex-col justify-start text-left cursor-pointer group hover:border-amber-500/40 transition-all duration-300"
          >
            <h4 className="text-lg font-black text-black dark:text-white tracking-tight leading-snug mb-3 group-hover:text-amber-500 transition-colors">
              {card.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* SECTION 2: ADVISORY INTAKE DATA HUB FORM MODULE */}
      <div className="max-w-4xl mx-auto bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-8 md:p-12 text-left shadow-2xl shadow-black/[0.01]">
        <div className="space-y-2 mb-10">
          <span className="text-[10px] font-black tracking-[0.2em] text-black uppercase block">
            ADVISORY INTAKE
          </span>
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black  uppercase leading-none">
            Align Your AI Strategy
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-1">
            Get your AI strategy and execution under control. Fill out your
            details and let us know when you need us to get started — we
            recommend starting with our AI Strategy Audit if you're still
            thinking it through.
          </p>
        </div>

        {/* INPUT LAYOUT MATRIX ROW */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wide text-zinc-500 dark:text-zinc-900 uppercase">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Business Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-400 uppercase">
                Business Email *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. john@company.com"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-400 uppercase">
                Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oben Holding"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Primary Area of Interest */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-400 uppercase">
                Primary Area of Interest
              </label>
              <select
                value={formData.interest}
                onChange={(e) =>
                  setFormData({ ...formData, interest: e.target.value })
                }
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3.5 text-sm text-black dark:text-white outline-none focus:border-amber-500 transition-colors cursor-pointer appearance-none"
              >
                <option value="StrategyMax">
                  AI Prioritization, Roadmaps, Audits & Advisory — StrategyMax
                </option>
                <option value="DeltaMax">
                  Data Quality, Freshness & Pipe Pipeline Trust — DeltaMax
                </option>
                <option value="OptiMax">
                  Revenue Intelligence & Resource Efficacy — OptiMax
                </option>
                <option value="PMOMax">
                  Governance-as-Code & System Guardrails — PMO-Max
                </option>
              </select>
            </div>
          </div>

          {/* Textarea Assistance Query */}
          <div className="space-y-2 w-full">
            <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-400 uppercase">
              How can our team assist you? *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your current data, AI, or operational challenge..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          {/* Submission Row Link Component */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-dark hover:bg-zinc-500 transition-colors font-black text-sm text-black select-none outline-none shadow-md"
            >
              Submit Request
            </button>
            <span className="text-[11px] text-zinc-900 font-medium tracking-wide">
              Submissions are routed directly to our advisory team for prompt
              follow-up.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
