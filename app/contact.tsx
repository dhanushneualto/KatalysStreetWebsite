"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    organization: "",
    position: "", // ⚡ Clean separated state mapping tracker key
    interest: "StrategyMax",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(""); // ⚡  Web3Forms result text handler state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending securely..."); // Optional loading state

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setResult(""); // Clear the loading state
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("A network error occurred. Please try again later.");
    }
  };
  const actionCards = [
    {
      title: "Schedule Executive Briefing",
      desc: "Meet with a Katalyst Street advisor to discuss your AI transformation priorities.",
     href: "#contact-form",
      
    },
    {
      title: "Take AI Readiness Assessment",
      desc: "Understand where your organization sits on the AI transformation journey.",
      href: "#contact-form",
      
    },
    {
      title: "Read the AI Governance White Paper",
      desc: "A practical guide for enterprise leaders navigating AI governance and risk.",
      href: "/PID.pdf", 
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
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black uppercase leading-[0.95]">
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
          <a
            key={idx}
            href={card.href || "#"}
            target={card.href?.includes(".pdf") ? "_blank" : "_self"}
            rel={card.href?.includes(".pdf") ? "noopener noreferrer" : ""}
            className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-6 md:p-8 flex flex-col justify-start text-left cursor-pointer group hover:border-amber-500/40 transition-all duration-300 block"
          >
            <h4 className="text-lg font-black text-black tracking-tight leading-snug mb-3 transition-colors">
              {card.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-900 font-dark leading-relaxed">
              {card.desc}
            </p>
          </a>
        ))}
      </div>

      {/* SECTION 2: ADVISORY INTAKE DATA HUB FORM MODULE */}
      <div id="contact-form" className=" scroll-mt-32 max-w-4xl mx-auto bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900/40 rounded-3xl p-8 md:p-12 text-left shadow-2xl shadow-black/[0.01]">
        <div className="space-y-2 mb-10">
          <span className="text-[10px] font-black tracking-[0.2em] text-black uppercase block">
            ADVISORY INTAKE
          </span>
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black uppercase leading-none">
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
                  id="fullName"
                  name="name"
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
                  name="email"
                  required
                  placeholder="e.g. john@company.com"
                  value={formData.businessEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, businessEmail: e.target.value })
                  }
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wide text-zinc-600 dark:text-zinc-900 uppercase">
                  Position*
                </label>
                <input
                  type="text"
                  name="position"
                  required
                  placeholder="e.g. Solutions Architect"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
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
                  name="organization"
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
                  name="interest"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="w-full bg-white dark:bg-zinc-500 border border-zinc-200 dark:border-zinc-500/80 rounded-xl px-4 py-3.5 text-sm text-black dark:text-white outline-none focus:border-zinc-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select your primary interest...</option>
                  <option value="AI Prioritization, Roadmaps, Audits & Advisory — StrategyMax">
                    AI Prioritization, Roadmaps, Audits & Advisory — StrategyMax
                  </option>
                  <option value="Strategy - AI Governance - PMO-Max">
                    Strategy - AI Governance - PMO-Max
                  </option>
                  <option value="Foundations - Data Quality & Trust Platform - DeltaMax">
                    Foundations - Data Quality & Trust Platform - DeltaMax
                  </option>
                  <option value="Foundations - Data Security">Foundations - Data Security</option>
                  <option value="Foundations - Data Ingestion- ETL">
                    Foundations - Data Ingestion- ETL
                  </option>
                  <option value="Foundations - LLM Strategy -Open/Multi Models">
                    Foundations - LLM Strategy -Open/Multi Models
                  </option>
                  <option value="Foundations - Agentic Strategy">Foundations - Agentic Strategy</option>
                  <option value="Foundations - ChangeManagement">
                    Foundations - ChangeManagement
                  </option>
                  <option value="Foundations - Human Capital & AI">
                    Foundations - Human Capital & AI
                  </option>
                  <option value="Foundations - Cybersecurity & vCISO">
                    Foundations - Cybersecurity & vCISO
                  </option>
                  <option value="Build - AI Engineering">Build - AI Engineering</option>
                  <option value="Build - Cloud Engineering">Build - Cloud Engineering</option>
                  <option value="Build - Engineering Consulting">Build - Engineering Consulting</option>
                  <option value="Build - Testing">Build - Testing</option>
                  <option value="Build - Automation">Build - Automation</option>
                  <option value="Scale - Marketing Intelligence & Execution Platform - OptiMax">
                    Scale - Marketing Intelligence & Execution Platform - OptiMax
                  </option>
                  <option value="Scale - Marketing Intelligence - Media Mix Modeling Platform - BudgetMax">
                    Scale - Marketing Intelligence - Media Mix Modeling Platform - BudgetMax
                  </option>
                  <option value="Scale - Financial Services">Scale - Financial Services</option>
                  <option value="Scale - Insurance">Scale - Insurance</option>
                  <option value="Scale - Healthcare">Scale - Healthcare</option>
                  <option value="Scale - Manufacturing">Scale - Manufacturing</option>
                  <option value="Scale - Retail">Scale - Retail</option>
                  <option value="Scale - Other Vertical">Scale - Other Vertical</option>
                  <option value="Optimize - FinOps">Optimize - FinOps</option>
                  <option value="Optimize - Marketing Intelligence & Execution Platform - OptiMax">
                    Optimize - Marketing Intelligence & Execution Platform - OptiMax
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnerships">Partnerships</option>
                  <option value="Practice - GCP">Practice - GCP</option>
                  <option value="Practice - Anthropic">Practice - Anthropic</option>
                  <option value="Practice - Snowflake">Practice - Snowflake</option>
                  <option value="Practice - Databricks">Practice - Databricks</option>
                  <option value="Practice - Tally">Practice - Tally</option>
                </select>
              </div>
            </div>

            {/* Textarea Assistance Query */}
            <div className="space-y-2 w-full">
              <label className="text-[11px] font-bold tracking-wide text-zinc-500 dark:text-zinc-900 uppercase">
                How can our team assist you? *
              </label>
              <textarea
                name="message"
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

            {/* Inline Transmission Status Message Display Box */}
            {result && (
              <p className="mt-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                {result}
              </p>
            )}
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
