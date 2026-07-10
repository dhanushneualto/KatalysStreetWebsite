"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhitePaper {
  tag?: string;
  date: string;
  readTime: string;
  title: string;
  desc: string;
}

interface BlogNote {
  meta: string;
  title: string;
  sub?: string;
}

export default function InsightsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const whitePapers: WhitePaper[] = [
    {
      date: "May 29, 2026",
      readTime: "12 Min Read",
      title:
        "The PID (Project Initiation Document) Is the Most Important Artifact in Building New Agentic Enterprise Workflows",
      desc: "Katalyst Street makes the case for Governance-as-Code (GaaC) at the point of project initiation — and, consequently, the 'control plane' of trustworthy enterprise-grade agentic workflows.",
    },
    {
      tag: "Featured · C-Suite Playbook",
      date: "May 20, 2026",
      readTime: "15 Min Read",
      title:
        "From Shadow AI to Agentic Intelligence: The C-Suite Playbook for 2026",
      desc: "A practical governance roadmap for boards and executives confronting unsanctioned AI usage across their organizations.",
    },
    {
      tag: "OptiMax · Executive Playbook",
      date: "May 15, 2026",
      readTime: "10 Min Read",
      title:
        "The Executive Playbook: Transforming Marketing from a Cost Center to an AI-Driven Profitability Engine",
      desc: "How AI-native revenue intelligence repositions marketing as a measurable profit driver.",
    },
    {
      tag: "OptiMax · Digital Strategy",
      date: "May 10, 2026",
      readTime: "8 Min Read",
      title:
        "How Can Data and AI Transform Marketing Organizations in the Digital Age?",
      desc: "A framework for modernizing marketing operations with data and AI at the core.",
    },
    {
      tag: "DeltaMax · Data Trust",
      date: "May 04, 2026",
      readTime: "11 Min Read",
      title:
        "Is Your Data Pipeline a Black Box? How DeltaMax Illuminates Your Data Quality",
      desc: "Why 'unknown unknowns' in enterprise pipelines are the real threat to AI investment — and how proactive monitoring changes the equation.",
    },
  ];

  const blogNotes: BlogNote[] = [
    {
      meta: "JUN 2, 2026 · 5 MIN READ",
      title:
        "The Multi-Model Imperative: Operationalizing Multi-Model AI Strategies",
      sub: "A CXO + Engineering Playbook for 2026",
    },
    {
      meta: "MAY 29, 2026 · 5 MIN READ",
      title: "The Executive Framework for AI-Era Program Management",
      sub: "Framework · Program Governance",
    },
    {
      meta: "MAY 28, 2026 · 5 MIN READ",
      title:
        "The Rise of the Architectural CEO: Moving Past the AI Hype into Structural Reinvention",
      sub: "Leadership · Strategy",
    },
    {
      meta: "TREND WATCH",
      title: "The Rise of Strategic Human Capital",
      sub: "Human Capital · AI",
    },
    {
      meta: "CASE STUDY",
      title: "Operationalizing Open Models in the Enterprise",
      sub: "LLM Strategy",
    },
    {
      meta: "FINANCIAL SERVICES",
      title: "Operationalizing Financial Services AI",
      sub: "Industry Playbook",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % whitePapers.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + whitePapers.length) % whitePapers.length,
    );
  };

  return (
    <section
      id="insights"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      {/* Header Typography Group */}
      <div className="space-y-4 mb-16 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          THOUGHT LEADERSHIP
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-6xl">
          Strategic Insights
        </h2>
      </div>
      {/* FEATURED WHITE PAPERS CAROUSEL SLIDER */}
      <div className="space-y-6 w-full">
        <span className="text-[10px] font-black tracking-[0.25em] text-zinc-900 uppercase block pl-1">
          FEATURED WHITE PAPERS
        </span>

        <div className="w-full bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-8 md:p-12 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 max-w-4xl"
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400 block">
                  {whitePapers[currentSlide].tag ||
                    `${whitePapers[currentSlide].date} · ${whitePapers[currentSlide].readTime}`}
                </span>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black dark:text-white uppercase leading-tight">
                  {whitePapers[currentSlide].title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl">
                {whitePapers[currentSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Controls Block */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
            {/* Arrow Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors outline-none"
              >
                ←
              </button>

              {/* Pagination Dots Pill Track */}
              <div className="flex items-center gap-2">
                {whitePapers.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-6 bg-amber-500"
                        : "w-1.5 bg-zinc-300 dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors outline-none"
              >
                →
              </button>
            </div>

            <span className="text-xs font-bold text-amber-500 cursor-pointer hover:underline uppercase tracking-wider">
              Read White Paper →
            </span>
          </div>
        </div>
      </div>

      {/* BLOGS & STRATEGY NOTES MATRIX (PLACED BELOW THE CAROUSEL) */}
      <div className="mt-32 space-y-8 w-full">
        <div className="flex justify-between items-baseline w-full">
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black dark:text-white uppercase leading-none">
            Blogs & Strategy Notes
          </h3>
          <span className="text-xs font-bold text-amber-500 cursor-pointer hover:underline uppercase tracking-wider whitespace-nowrap">
            View All Strategic Insights →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
          {blogNotes.map((note, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-shadow hover:shadow-md"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-amber-500 tracking-wide uppercase block">
                  {note.meta}
                </span>
                <h4 className="text-base font-black text-black dark:text-white tracking-tight leading-snug">
                  {note.title}
                </h4>
              </div>
              {note.sub && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide">
                  {note.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
