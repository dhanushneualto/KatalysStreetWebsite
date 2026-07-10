"use client";

import React from "react";
import { motion } from "framer-motion";

interface IndustryCard {
  title: string;
  bullets: string[];
}

interface MatrixColumn {
  name: string;
  features: { [key: string]: boolean };
  isKatalyst?: boolean;
}

export default function IndustriesSection() {
  const industriesData: IndustryCard[] = [
    {
      title: "Insurance",
      bullets: [
        "Customer Acquisition & Retention",
        "Claims Intelligence",
        "Fraud Detection",
        "Underwriting Optimization",
        "Churn & Cross-Sell",
      ],
    },
    {
      title: "Financial Services",
      bullets: [
        "Risk Intelligence",
        "Marketing Optimization",
        "Financial Engineering & Pricing",
        "Operations Automation",
        "Customer Experience AI",
        "Regulatory Compliance",
      ],
    },
    {
      title: "Healthcare",
      bullets: [
        "Patient Engagement Intelligence",
        "Operations Optimization",
        "Compliance & Risk Management",
      ],
    },
    {
      title: "Retail",
      bullets: [
        "Marketing Intelligence",
        "Customer Intelligence",
        "Demand Forecasting",
        "Supply Chain Optimization",
      ],
    },
    {
      title: "Manufacturing",
      bullets: [
        "Predictive Maintenance",
        "Ontology Engineering",
        "Quality Intelligence",
        "IT & OT Integration",
        "Robotics & Physical AI",
      ],
    },
    {
      title: "Logistics & Supply Chain",
      bullets: [
        "Demand Forecasting",
        "Routing Optimization",
        "Warehouse Intelligence",
        "Last Mile Optimization",
      ],
    },
    {
      title: "Media & Gaming",
      bullets: [
        "Marketing Optimization",
        "Fraud & Risk Detection",
        "Player Retention Intelligence",
        "Real-Time Chat Moderation",
        "Content Personalization",
      ],
    },
  ];

  // Raw comparison data metrics matrix
  const featureList = [
    "Strategy",
    "Engineering",
    "Governance",
    "Platforms",
    "Ecosystem",
  ];

  const comparisonMatrix: MatrixColumn[] = [
    {
      name: "Traditional Consulting",
      features: {
        Strategy: true,
        Engineering: false,
        Governance: false,
        Platforms: false,
        Ecosystem: false,
      },
    },
    {
      name: "System Integrators",
      features: {
        Strategy: false,
        Engineering: true,
        Governance: false,
        Platforms: false,
        Ecosystem: false,
      },
    },
    {
      name: "Software Vendors",
      features: {
        Strategy: false,
        Engineering: false,
        Governance: false,
        Platforms: true,
        Ecosystem: false,
      },
    },
    {
      name: "Katalyst Street",
      features: {
        Strategy: true,
        Engineering: true,
        Governance: true,
        Platforms: true,
        Ecosystem: true,
      },
      isKatalyst: true,
    },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="industries"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      {/* Header Typography Group */}
      <div className="space-y-4 mb-16 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          INDUSTRY SOLUTIONS
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-6xl">
          Built for Industry-Specific <br /> Transformation
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-2">
          Every industry faces unique AI opportunities and risks. Katalyst
          Street combines domain expertise with repeatable frameworks.
        </p>
      </div>

      {/* Industries Matrix Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch"
      >
        {industriesData.map((industry, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-8 space-y-6 flex flex-col justify-start"
          >
            <h3 className="text-xl font-black text-black dark:text-white tracking-tight uppercase">
              {industry.title}
            </h3>
            <ul className="space-y-3.5 flex-1">
              {industry.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  className="text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-zinc-300 dark:text-zinc-700 select-none pt-0.5">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* ⚡ NEW NODE: THE KATALYST DIFFERENCE MATRIX PANEL */}
      <div className="mt-32 pt-16 border-t border-zinc-100/10 space-y-12 w-full">
        {/* Module Text Header */}
        <div className="max-w-5xl space-y-4">
          <span className="text-[10px] font-black tracking-[0.2em] text-black uppercase block">
            THE KATALYST DIFFERENCE
          </span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-black  uppercase leading-[0.95] max-w-5xl">
            Most Firms Do One Thing Well. <br />
            We Bring Everything Together.
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-900  max-w-2xl leading-relaxed pt-1">
            Traditional consulting, system integrators, and software vendors
            each solve a piece. Katalyst Street is the only firm built to
            deliver the full transformation.
          </p>
        </div>

        {/* Interactive Matrix Dashboard Area */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full items-stretch"
        >
          {comparisonMatrix.map((column, cIdx) => (
            <motion.div
              key={cIdx}
              variants={itemVariants}
              className={`rounded-2xl p-6 flex flex-col justify-start space-y-6 text-left border ${
                column.isKatalyst
                  ? "bg-zinc-50/50 dark:bg-zinc-900/20 border-amber-500/40 shadow-xl shadow-black/[0.01]"
                  : "bg-zinc-50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/40"
              }`}
            >
              <h4
                className={`text-sm font-black tracking-wide uppercase ${column.isKatalyst ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400"}`}
              >
                {column.name}
              </h4>

              <ul className="space-y-4 w-full flex-1">
                {featureList.map((feature, fIdx) => {
                  const hasFeature = column.features[feature];
                  return (
                    <li
                      key={fIdx}
                      className={`flex items-center gap-3 text-sm pb-3 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-none last:pb-0 ${
                        hasFeature
                          ? "text-black dark:text-white font-bold"
                          : "text-zinc-400 dark:text-zinc-600 font-light"
                      }`}
                    >
                      {hasFeature ? (
                        <span className="text-emerald-500 font-bold text-xs select-none">
                          ✓
                        </span>
                      ) : (
                        <span className="text-zinc-300 dark:text-zinc-800 font-light text-xs select-none">
                          ✕
                        </span>
                      )}
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
