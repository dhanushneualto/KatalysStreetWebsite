"use client";

import React from "react";
import { motion } from "framer-motion";

interface PartnerCard {
  name: string;
  role: string;
  logoText: string;
  logoBg: string;
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
  const strategicPartners: PartnerCard[] = [
    {
      name: "Google Cloud",
      role: "AI Frontier Partner & Hyperscaler",
      logoText: "GC",
      logoBg: "bg-blue-600",
    },
    {
      name: "Anthropic",
      role: "AI Frontier Partner",
      logoText: "AN",
      logoBg: "bg-orange-700",
    },
    {
      name: "Databricks",
      role: "Data Platform",
      logoText: "DB",
      logoBg: "bg-red-600",
    },
    {
      name: "Snowflake",
      role: "Data Platform",
      logoText: "SF",
      logoBg: "bg-sky-500",
    },
    {
      name: "Tally",
      role: "Finance Partner",
      logoText: "TY",
      logoBg: "bg-purple-600",
    },
  ];

  const executionPartners: PartnerCard[] = [
    {
      name: "AIVanta",
      role: "AI Consulting Partner",
      logoText: "AV",
      logoBg: "bg-orange-600",
    },
    {
      name: "NeuAlto",
      role: "AI Engineering & Managed Services",
      logoText: "NA",
      logoBg: "bg-indigo-600",
    },
    {
      name: "Datadvise",
      role: "Market Research & Advisory",
      logoText: "DV",
      logoBg: "bg-blue-800",
    },
    {
      name: "Origins.AI",
      role: "AI Product & Engineering",
      logoText: "OA",
      logoBg: "bg-emerald-600",
    },
    {
      name: "Neuroagent.AI",
      role: "AI Engineering",
      logoText: "NG",
      logoBg: "bg-amber-600",
    },
  ];

  // Raw Content Matrix for the Case Studies Deck
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
      x: direction === "left" ? [0, -1200] : [-1200, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 30,
          ease: "linear",
        },
      },
    },
  });

  const renderPartnerRow = (
    items: PartnerCard[],
    direction: "left" | "right",
  ) => {
    const duplicatedItems = [...items, ...items, ...items];
    return (
      <div className="w-full overflow-hidden relative py-2 mask-gradient">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-transparent to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 w-max"
          variants={marqueeVariants(direction)}
          animate="animate"
        >
          {duplicatedItems.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-4 min-w-[280px] select-none"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs text-white flex-shrink-0 ${partner.logoBg}`}
              >
                {partner.logoText}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-black dark:text-white tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] font-medium text-zinc-400 tracking-wide uppercase mt-0.5">
                  {partner.role}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  // Framer Motion Container orchestration settings for staggering children cards
  const staggerContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // ⚡ Creates the requested 'one after another' delay sequence
      },
    },
  };

  const cardItemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="ecosystem"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      {/* Header Typography Group */}
      <div className="space-y-4 mb-20 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          PARTNER NETWORK
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-6xl">
          Enterprise AI Requires <br /> An Ecosystem
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-2">
          No single company can deliver enterprise transformation alone.
          Katalyst Street orchestrates the right mix of cloud, data, and
          execution partners — with new partnerships added as they're finalized.
        </p>
      </div>

      {/* Marquee Streams Content Structure Area */}
      <div className="space-y-12 w-full">
        <div className="space-y-4">
          <span className="text-[10px] font-black tracking-[0.25em] text-zinc-900 uppercase block pl-2">
            STRATEGIC PARTNERSHIPS
          </span>
          {renderPartnerRow(strategicPartners, "left")}
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-black tracking-[0.25em] text-zinc-900 uppercase block pl-2">
            EXECUTION PARTNERSHIPS
          </span>
          {renderPartnerRow(executionPartners, "right")}
        </div>
      </div>

      {/* CASE STUDIES PARENT ZONE */}
      <div className="mt-32 pt-16 border-t border-zinc-100/10 space-y-12 w-full">
        <div className="max-w-4xl space-y-4">
          <span className="text-[10px] font-black tracking-[0.2em] text-dark uppercase block">
            GLOBAL CUSTOMERS
          </span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-black  uppercase leading-none">
            Selected Case Studies
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl leading-relaxed">
            Explore how Katalyst Street helps leading multi-nationals and
            digital platforms accelerate AI and secure pipeline performance.
          </p>
        </div>

        {/* STAGGERED GRID SYSTEM AREA */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8 w-full"
        >
          {caseStudiesData.map((study, idx) => (
            <motion.div
              key={idx}
              variants={cardItemVariants}
              className="w-full bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-8 md:p-10 space-y-8 text-left transition-shadow hover:shadow-xl hover:shadow-black/[0.02]"
            >
              {/* Card Meta Header */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase block">
                  {study.tag}
                </span>
                <h4 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
                  {study.title}
                </h4>
                <p className="text-xs md:text-sm text-zinc-400 font-medium tracking-wide">
                  {study.subTitle}
                </p>

                {/* Horizontal Badges Row */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {study.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-[10px] font-semibold tracking-wide text-zinc-600 dark:text-zinc-400"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Central Abstract Block */}
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                {study.summary}
              </p>

              {/* 4-Quadrant Technical Matrix Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
                {/* Quadrant 1: Challenge */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-black tracking-widest text-amber-500 uppercase">
                    THE CHALLENGE
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Quadrant 2: Strategy */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-black tracking-widest text-amber-500 uppercase">
                    THE STRATEGY
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {study.strategy}
                  </p>
                </div>

                {/* Quadrant 3: Solution */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-black tracking-widest text-amber-500 uppercase">
                    THE SOLUTION
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Quadrant 4: Results */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-black tracking-widest text-emerald-500 uppercase">
                    THE RESULTS
                  </h5>
                  <ul className="space-y-2">
                    {study.results.map((result, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start gap-2.5 text-xs md:text-sm font-bold text-black dark:text-white"
                      >
                        <span className="text-emerald-500 font-bold select-none">
                          ✓
                        </span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
