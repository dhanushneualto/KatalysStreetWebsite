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

  // ⚡ Added state tracker to capture the submission event status
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to advisory team interface parameter tracking
    console.log("Submitting Advisory Intake Data Package:", formData);
    // ⚡ 2. Construct the Email Form Parameter Matrix
    const emailTarget = "dhanu282004@gmail.com";
    const subject = encodeURIComponent(
      `AI Advisory Intake - ${formData.organization}`,
    );
    const body = encodeURIComponent(
      `New AI Strategy Request Received:\n\n` +
        `• Full Name: ${formData.fullName}\n` +
        `• Business Email: ${formData.businessEmail}\n` +
        `• Organization: ${formData.organization}\n` +
        `• Primary Area of Interest: ${formData.interest}\n\n` +
        `Challenge Description:\n${formData.message}`,
    );

    // ⚡ 3. Native Trigger: Opens user's mail application pre-filled with the variables
    window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;

    // ⚡ Flips container interface to success state window view
    setIsSubmitted(true);
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
          Get your AI Strategy and Execution under control, Fill out your
          details and let us know when you need us to get started. We recommend
          you start with our AI Strategy Audit if you are still thinking.
        </p>
      </div>

      {/* THREE INTERACTIVE ACTION OPTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24 items-stretch">
        {actionCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-6 md:p-8 flex flex-col justify-start text-left cursor-pointer group hover:border-amber-500/40 transition-all duration-300"
          >
            <h4 className="text-lg font-black text-black tracking-tight leading-snug mb-3  transition-colors">
              {card.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-900 font-dark  leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* SECTION 2: ADVISORY INTAKE DATA HUB FORM MODULE */}
      <div className="max-w-4xl mx-auto bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900/40 rounded-3xl p-8 md:p-12 text-left shadow-2xl shadow-black/[0.01]">
        <div className="space-y-2 mb-10">
          <span className="text-[10px] font-black tracking-[0.2em] text-black uppercase block">
            ADVISORY INTAKE
          </span>
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black  uppercase leading-none">
            Align Your AI Strategy
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-900 font-dark max-w-3xl leading-relaxed pt-1">
            Get your AI strategy and execution under control. Fill out your
            details and let us know when you need us to get started — We
            recommend you start with our AI Strategy Audit if you are still
            thinking.
          </p>
        </div>

        {/* ⚡ Dynamic Form Switch Logic Block */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* INPUT LAYOUT MATRIX ROW */}
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
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-900 uppercase">
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
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-900 uppercase">
                  Position*
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solutions Architect"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-900 uppercase">
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
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Primary Area of Interest */}
              <div className="space-y-2 w-full md:col-span-2">
                <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-900 uppercase">
                  Primary Area of Interest*
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-500/80 rounded-xl px-4 py-3.5 text-sm text-black dark:text-white outline-none focus:border-zinc-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="StrategyMax">
                    AI Prioritization, Roadmaps, Audits & Advisory — StrategyMax
                  </option>
                  <option value="DeltaMax">
                    Strategy - AI Governance - PMO-Max
                  </option>
                  <option value="OptiMax">
                    Foundations - Data Quality & Trust Platform - DeltaMax
                  </option>
                  <option value="PMOMax">Foundations - Data Security</option>
                  <option value="PMOMax">
                    Foundations - Data Ingestion- ETL
                  </option>
                  <option value="PMOMax">
                    Foundations - LLM Strategy -Open/Multi Models
                  </option>
                  <option value="PMOMax">Foundations - Agetic Strategy </option>
                  <option value="PMOMax">
                    Foundations - ChangeManagement{" "}
                  </option>
                  <option value="PMOMax">
                    Foundations - Human Capital & AI
                  </option>
                  <option value="PMOMax">
                    Foundations - Cybersecurity & vCISO
                  </option>
                  <option value="PMOMax">Build - AI Engineering </option>
                  <option value="PMOMax">Build - Cloud Engineering</option>
                  <option value="PMOMax">Build - Engineering Consulting</option>
                  <option value="PMOMax">Build - Testing</option>
                  <option value="PMOMax">Build - Automation</option>
                  <option value="PMOMax">
                    Scale - Marketing Intelligence & Execution Platform -
                    OptiMax
                  </option>
                  <option value="PMOMax">
                    Scale - Marketing Intelligence - Media Mix Modeling Platform
                    - BudgetMax
                  </option>
                  <option value="PMOMax">Scale - Financial Services</option>
                  <option value="PMOMax">Scale - Insurance</option>
                  <option value="PMOMax">Scale - Healthcare</option>
                  <option value="PMOMax">Scale - Manufacturing</option>
                  <option value="PMOMax">Scale - Retail</option>
                  <option value="PMOMax">Scale - Other Vertical</option>
                  <option value="PMOMax">Optimize - FinOps</option>
                  <option value="PMOMax">
                    Optimize - Marketing Intelligence & Execution Platform -
                    OptiMax
                  </option>
                  <option value="PMOMax">General Inquiry</option>
                  <option value="PMOMax">Partnerships</option>
                  <option value="PMOMax">Practice- GCP</option>
                  <option value="PMOMax">Practice-Anthropic</option>
                  <option value="PMOMax">Practice-Snowflake</option>
                  <option value="PMOMax">Practice-Databricks</option>
                  <option value="PMOMax">Practice-Tally</option>
                </select>
              </div>
            </div>

            {/* Textarea Assistance Query */}
            <div className="space-y-2 w-full">
              <label className="text-[11px] font-bold tracking-wide text-zinc-500 dark:text-zinc-900 uppercase">
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
                className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors resize-none"
              />
            </div>

            {/* Submission Row Link Component */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-dark hover:bg-zinc-300 transition-colors font-black text-sm text-black select-none outline-none shadow-md cursor-pointer"
              >
                Submit Request
              </button>
              <span className="text-[11px] text-zinc-900 font-medium tracking-wide">
                Submissions are routed directly to our advisory team for prompt
                follow-up.
              </span>
            </div>
          </form>
        ) : (
          /* ⚡ THANK YOU NOTE CONTAINER: Smoothly displays upon success */
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full py-12 flex flex-col items-start text-left"
          >
            <p className="text-base md:text-lg font-bold text-black dark:text-zinc-900 leading-relaxed max-w-2xl">
              Thank you for submitting your request. Someone from our team will
              assist you shortly!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
