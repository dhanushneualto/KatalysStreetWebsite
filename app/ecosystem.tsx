"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PartnerCard {
  name: string;
  role: string;
  logoSrc: string;
}

interface CaseStudyMatrix {
  tag: string;
  title: string;
  subTitle: string;
  badges: string[];
  summary: string;
  challenge: string;
  strategy: string;
  solution: string;
  results: string[];
}

export default function EcosystemSection() {
  const [activeStudy, setActiveStudy] = useState<CaseStudyMatrix | null>(null);

  // ⚡ FIXED: Mounted lifecycle tracking variable prevents the Hydration/Portal runtime crash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const strategicPartners: PartnerCard[] = [
    {
      name: "Google Cloud",
      role: "AI Frontier Partner & Hyperscaler",
      logoSrc: "/gc.png",
    },
    {
      name: "Anthropic",
      role: "AI Frontier Partner",
      logoSrc: "/anthropic.png",
    },
    { name: "Databricks", role: "Data Platform", logoSrc: "/databricks.png" },
    { name: "Snowflake", role: "Data Platform", logoSrc: "/snowflake.png" },
    { name: "Tally", role: "Finance Partner", logoSrc: "/tally.png" },
  ];

  const executionPartners: PartnerCard[] = [
    {
      name: "AIVanta",
      role: "AI Consulting Partner",
      logoSrc: "/aivantanew.png",
    },
    {
      name: "NeuAlto",
      role: "AI Engineering & Managed Services",
      logoSrc: "/neualto.png",
    },
    {
      name: "Datadvise",
      role: "Market Research & Advisory",
      logoSrc: "/datadvice.png",
    },
    {
      name: "Origins.AI",
      role: "AI Product & Engineering",
      logoSrc: "/origins.png",
    },
    {
      name: "Neuroagent.AI",
      role: "AI Engineering",
      logoSrc: "/logos/neuroagent.png",
    },
  ];

  const caseStudiesData: CaseStudyMatrix[] = [
    {
      tag: "BOUTIQUE C-SUITE ADVISORY — OPTIMIZE + BUILD",
      title: "Oben Holding Group",
      subTitle:
        "Lima-Based Packaging & Manufacturing Conglomerate (10+ Countries)",
      badges: ["10+ Countries Unified", "C-Suite Approved Strategy"],
      summary:
        "Partnered directly with the C-suite of a premier multi-national packaging manufacturer to audit plant operations and resolve critical quality control bottlenecks. Engineered automated AI ETL pipelines to analyze operational data and benchmark OEE metrics, while developing time-series predictive maintenance models to forecast filter degradation. Delivered rapid operational recommendations that successfully optimized plant efficiency and boosted overall OEE by 93 basis points.",
      challenge:
        "Oben Holding Group, a premium multi-national packaging manufacturer headquartered in Lima, Peru, had an opportunity to study the operational issues and Overall Equipment Efficiency (OEE) in one of its manufacturing plants.",
      strategy:
        "Katalyst Street acted as direct strategic advisors to the C-suite (CEO and COO). We audited their manufacturing processes and operational data to understand bottlenecks, quality control initiatives, and KPIs — identifying that filters were breaking faster than their expected lifetime and that the group needed a predictive maintenance solution.",
      solution:
        "Leveraging AI, we designed modern, light, automated ETL ingestion pipelines to understand operational data, benchmarked existing OEE metrics and contributing factors, and delivered quick recommendations to improve them. We further built predictive maintenance models using time-series operational data to give intelligence on when filters needed replacement.",
      results: ["Improved overall OEE metrics by 93 basis points"],
    },
    {
      tag: "ENTERPRISEDATAPLATFORM — STRATEGY + FOUNDATIONS",
      title: "IDOM",
      subTitle:
        "Unified Enterprise Data Platform for a Carbon Capture Technology Innovator",
      badges: ["Manufacturing", "IT and OT Integration", "SmartFactory"],
      summary:
        "IDOM and Katalyst Street partnered to develop a unified enterprise data platform for a carbon capture firm, integrating IT and OT data across engineering, manufacturing, R&D, and operations. By implementing a scalable, event-driven architecture on Azure Synapse Analytics, the joint team equipped the client with real-time streaming, historical data processing, and advanced AI/ML capabilities — transforming raw data into actionable insights and accelerating the firm's innovation in carbon capture technology.",
      challenge:
        "Develop a unified enterprise data platform that seamlessly integrates IT and OT data, enabling bi-directional information flow across engineering, manufacturing, R&D, and operations — transforming raw data into insights that drive efficiency, innovation, and strategic decisions.",
      strategy:
        "IDOM and Katalyst Street collaborated on a structured, phased approach — discovery, design, prototyping, and rollout — leveraging combined expertise in digital transformation and SMART Factory principles, with a joint core team enabling seamless staff augmentation across the project lifecycle.",
      solution:
        "A robust, event-driven, serverless Unified Enterprise Data Platform built on Azure Synapse Analytics — combining real-time streaming analytics, historic data processing, advanced AI/ML analytics, and strict governance and lineage protocols for data quality, compliance, and traceability.",
      results: [
        "Established a foundational, highly scalable data infrastructure",
        "Significantly enhanced operational visibility",
        "Accelerated innovation in carbon capture technology",
      ],
    },
    {
      tag: "AI FOUNDATIONAL ENGINEERING — FOUNDATIONS + BUILD",
      title: "OneGame Platform",
      subTitle: "Sector: Immersive Gaming & AI · Scale: Global Platform",
      badges: [
        "Fraud Detection",
        "Risk Management",
        "Machine Learning",
        "Explainable AI",
        "Predictive Analytics",
        "Multi-Cloud Integration",
      ],
      summary:
        "To combat ineffective manual monitoring of fraudulent activity during user sign-ups and logins, the gaming startup OneGame partnered with Katalyst Street to implement a custom machine learning solution. Because real user data wasn't available for their initial US launch, the team creatively used simulated data to build preliminary models — intentionally prioritizing simple, explainable algorithms and speed over complex perfection. By analyzing variables like user behavior, IP addresses, and device information, the automated system achieved 91% prediction accuracy. The solution continuously learns from new data, slashed overall fraud by 90%, stopped bot attacks, and secured the platform as it scaled to its first 50,000 users.",
      challenge:
        "OneGame struggled to identify risky behaviors and fraudulent activity during sign-up and login. Manual monitoring and rule-based systems were time-consuming and ineffective, and the company urgently needed an automated way to keep the platform safe, fair, and secure.",
      strategy:
        "As a US-launch startup, real fraud data wasn't initially available, so the team simulated data attributes and fraud business rules to build preliminary models — prioritizing an '80% solution with 20% effort,' and choosing simple, explainable models over complex ones to win leadership buy-in and allow easy real-time iteration.",
      solution:
        "Custom machine learning models analyze user behavior patterns, IP addresses, and device information, weighting each to score individual risk — empowering OneGame to flag suspicious activity, trigger extra verification, or block risky users in real time.",
      results: [
        "91% out-of-sample prediction accuracy",
        "Slashed overall fraud by 90%, per OneGame's CEO",
        "Stopped bot attacks and protected the platform's first 50,000 users",
        "Model continuously learns from new data as the platform scales",
      ],
    },
  ];

  const marqueeVariants = (direction: "left" | "right") => ({
    animate: {
      x: direction === "left" ? [0, -1640] : [-1640, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 30,
          ease: "linear" as const,
        },
      },
    },
  });

  const renderPartnerRow = (
    titleText: string,
    items: PartnerCard[],
    direction: "left" | "right",
  ) => {
    const duplicatedItems = [...items, ...items, ...items, ...items];
    return (
      <div
        className="bg-zinc-50/50 dark:bg-zinc-900/10 border-y border-zinc-200/60 dark:border-zinc-800/40 py-5 px-8 md:px-24 flex items-center justify-between gap-8 relative left-1/2 right-1/2"
        style={{ width: "100vw", marginLeft: "-50vw", marginRight: "-50vw" }}
      >
        <div className="w-44 flex-shrink-0">
          <span className="text-xs font-black tracking-[0.25em] text-zinc-900 dark:text-zinc-400 uppercase block">
            {titleText}
          </span>
        </div>
        <div className="w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
        <div className="flex-grow overflow-hidden relative py-1">
          <motion.div
            className="flex gap-12 w-max items-center"
            variants={marqueeVariants(direction)}
            animate="animate"
          >
            {duplicatedItems.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 select-none flex-shrink-0 w-[280px]"
              >
                <div className="w-24 h-10 relative flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={partner.logoSrc}
                    alt={partner.name}
                    width={55}
                    height={55}
                    className="object-contain object-left"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-zinc-900 tracking-tight leading-none">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-500 tracking-wide uppercase mt-1.5 leading-none">
                    {partner.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="ecosystem"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24 overflow-visible"
    >
      {/* Header Typography Group */}
      <div className="space-y-4 mb-20 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          PARTNERSHIP ECOSYSTEM
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black uppercase leading-[0.95]">
          Enterprise AI Requires <br /> An Ecosystem
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl pt-2">
          No single company can deliver enterprise transformation alone.
          Katalyst Street orchestrates the right mix of cloud, data, and
          execution partners.
        </p>
      </div>

      <div className="space-y-4 w-full relative z-20">
        {renderPartnerRow("Strategic Partnerships", strategicPartners, "left")}
        {renderPartnerRow("Execution Partnerships", executionPartners, "right")}
      </div>

      {/* CASE STUDIES PARENT ZONE */}
      <div className="mt-32 pt-16 border-t border-zinc-100/10 space-y-12 w-full">
        <div className="max-w-4xl space-y-4">
          <span className="text-[10px] font-black tracking-[0.2em] text-dark uppercase block">
            GLOBAL CUSTOMERS
          </span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase leading-none">
            Selected Case Studies
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl">
            Explore how Katalyst Street helps leading multi-nationals accelerate
            AI. Click any card to expand full technical matrix.
          </p>
        </div>

        {/* COMPACT GRID VIEW BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
          {caseStudiesData.map((study, idx) => (
            <motion.div
              key={idx}
              layoutId={`card-container-${study.title}`}
              onClick={() => setActiveStudy(study)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-left cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-3">
                <span className="text-[9px] font-bold tracking-widest text-zinc-900 dark:text-zinc-900 uppercase block">
                  {study.tag}
                </span>
                <h4 className="text-2xl font-black tracking-tight text-black uppercase leading-none">
                  {study.title}
                </h4>
                <p className="text-[11px] font-medium text-zinc-900 leading-normal">
                  {study.subTitle}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.badges.slice(0, 2).map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-500/50 text-[9px] font-semibold text-zinc-300 dark:text-zinc-900"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-900 leading-relaxed line-clamp-3">
                {study.summary}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[11px] mt-auto">
                <div>
                  <h5 className="font-black text-black uppercase tracking-wider mb-1">
                    THE CHALLENGE
                  </h5>
                  <p className="text-zinc-900 line-clamp-2">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h5 className="font-black text-black uppercase tracking-wider mb-1">
                    THE STRATEGY
                  </h5>
                  <p className="text-zinc-900 line-clamp-2">{study.strategy}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ⚡ REACT PORTAL GENERATOR OVERLAY */}
        {mounted &&
          typeof window !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {activeStudy && (
                <div
                  className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
                  style={{ zIndex: 9999999 }}
                >
                  {/* Invisible backdrop box that covers ONLY the background space */}
                  <div
                    className="absolute inset-0 w-full h-full cursor-pointer z-0"
                    onClick={() => setActiveStudy(null)}
                  />

                  {/* Internal Card Canvas Wrapper */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    // ⚡ FIXED: Typed event parameter to prevent explicit implicitly 'any' compiler flags
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="bg-zinc-950 text-white border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl text-left z-10"
                  >
                    {/* Close Trigger Button */}
                    <button
                      onClick={() => setActiveStudy(null)}
                      className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer z-50 text-sm outline-none"
                    >
                      ✕
                    </button>

                    {/* Header content */}
                    <div className="space-y-2 pr-8">
                      <span className="text-[9px] font-bold tracking-widest text-zinc-100 uppercase block">
                        {activeStudy.tag}
                      </span>
                      <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                        {activeStudy.title}
                      </h4>
                      <p className="text-xs font-medium text-zinc-100 leading-normal">
                        {activeStudy.subTitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeStudy.badges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800/60 text-[9px] font-semibold text-white"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Body Text Fields */}
                    <div className="space-y-5 pt-2">
                      <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-white tracking-wider uppercase">
                          OVERVIEW SUMMARY
                        </h5>
                        <p className="text-xs leading-relaxed text-zinc-100 font-normal">
                          {activeStudy.summary}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                        <div className="space-y-1">
                          <h5 className="text-[10px] font-black text-whitetracking-wider uppercase">
                            THE CHALLENGE
                          </h5>
                          <p className="text-[11px] leading-relaxed text-zinc-100 font-normal">
                            {activeStudy.challenge}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-[10px] font-black text-white tracking-wider uppercase">
                            THE STRATEGY
                          </h5>
                          <p className="text-[11px] leading-relaxed  text-zinc-100 font-normal">
                            {activeStudy.strategy}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-white tracking-wider uppercase">
                          THE SOLUTION
                        </h5>
                        <p className="text-[11px] leading-relaxed text-zinc-100 font-normal">
                          {activeStudy.solution}
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <h5 className="text-[10px] font-black text-white tracking-wider uppercase">
                          KEY RESULTS
                        </h5>
                        <ul className="space-y-1.5">
                          {activeStudy.results.map((res, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-[11px] font-bold text-zinc-300 flex items-start gap-2"
                            >
                              <span className="select-none text-zinc-500 pt-0.5">
                                ✓
                              </span>
                              <span className="leading-snug">{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </section>
  );
}
