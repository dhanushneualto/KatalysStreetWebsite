"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface IndustryCard {
  title: string;
  bullets: string[];
  imgSrc: string;
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
      imgSrc: "/insurance.png",
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
      imgSrc: "/finance.png",
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
      imgSrc: "/healthcare.png",
      bullets: [
        "Patient Engagement Intelligence",
        "Operations Optimization",
        "Compliance & Risk Management",
      ],
    },
    {
      title: "Retail",
      imgSrc: "/retail.png",
      bullets: [
        "Marketing Intelligence",
        "Customer Intelligence",
        "Demand Forecasting",
        "Supply Chain Optimization",
      ],
    },
    {
      title: "Manufacturing",
      imgSrc: "/manufacturing.png",
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
      imgSrc: "/logistics.png",
      bullets: [
        "Demand Forecasting",
        "Routing Optimization",
        "Warehouse Intelligence",
        "Last Mile Optimization",
      ],
    },
    {
      title: "Media & Gaming",
      imgSrc: "/media.png",
      bullets: [
        "Marketing Optimization",
        "Fraud & Risk Detection",
        "Player Retention Intelligence",
        "Real-Time Chat Moderation",
        "Content Personalization",
      ],
    },
  ];

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

  // 🛠️ ADDED EXPLICIT TYPE CASTING TO PREVENT VARIANT INFERENCE ERRORS
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const listContainerVariants: Variants = {
    initial: { opacity: 1 },
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const rowLineVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.4, ease: "linear" },
    },
  };

  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  return (
    <section
      id="industries"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      {/* Header Typography Group */}
      <div className="space-y-4 mb-16 max-w-5xl">
        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-black">
          INDUSTRIONS SOLUTIONS
        </span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black uppercase leading-[0.95] max-w-6xl">
          Built for Industry-Specific <br /> Transformation
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-2">
          Every industry faces unique AI opportunities and risks. Katalyst
          Street combines domain expertise with repeatable frameworks.
        </p>
      </div>

      {/* FIXED ACCORDION DECK */}
      <div className="flex flex-col lg:flex-row gap-4 w-full h-auto lg:h-[460px] items-stretch overflow-visible">
        {industriesData.map((industry, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <motion.div
              key={idx}
              onClick={() => setExpandedIdx(idx)}
              animate={{
                width: isExpanded ? "46%" : "9%",
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="cursor-pointer rounded-3xl p-8 border text-left flex flex-col justify-between relative overflow-hidden flex-shrink-0 w-full lg:w-auto border-zinc-200/60 dark:border-zinc-800/40 group shadow-sm bg-zinc-900"
            >
              {/* BACKDROP IMAGE LAYER */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={industry.imgSrc}
                  alt={`${industry.title} background visual`}
                  fill
                  priority
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${isExpanded ? "opacity-75" : "opacity-45 dark:opacity-60"}`}
                />
              </div>

              {/* Top Meta Layout Anchor Wrapper */}
              <div
                className={`flex items-start relative z-10 ${!isExpanded ? "lg:h-full lg:items-center" : ""}`}
              >
                <h3
                  className={`text-xl font-black tracking-tight uppercase select-none transition-all duration-300 text-white ${
                    !isExpanded
                      ? "lg:[writing-mode:vertical-lr] lg:rotate-180 lg:my-auto"
                      : ""
                  }`}
                >
                  {industry.title}
                </h3>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-zinc-300/80 dark:border-zinc-700 flex items-center justify-center bg-white dark:bg-zinc-900 select-none shadow-sm z-20 pointer-events-none">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-4 h-4 text-zinc-600 dark:text-zinc-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </motion.svg>
                </div>
              </div>

              {/* Collapsible Content Text Window Block */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? "auto" : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-6 lg:mt-0 relative z-10"
              >
                <ul className="space-y-3.5 max-w-xl">
                  {industry.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-sm font-medium text-zinc-100 dark:text-zinc-200 leading-relaxed flex items-start gap-2.5 drop-shadow-sm"
                    >
                      <span className="text-zinc-400 select-none pt-0.5">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* DIFFERENCE MATRIX PANEL */}
      <div className="mt-32 pt-16 border-t border-zinc-100/10 space-y-12 w-full">
        <div className="max-w-5xl space-y-4">
          <span className="text-[10px] font-black tracking-[0.2em] text-black uppercase block">
            THE KATALYST DIFFERENCE
          </span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase leading-[0.95] max-w-5xl">
            Most Firms Do One Thing Well. <br />
            We Bring Everything Together.
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-900 max-w-2xl leading-relaxed pt-1">
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
              whileHover={
                column.isKatalyst ? { scale: 1.02, y: -4 } : { scale: 1.01 }
              }
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-2xl p-6 flex flex-col justify-start space-y-6 text-left border ${
                column.isKatalyst
                  ? "bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-500/40 shadow-xl shadow-black/[0.01]"
                  : "bg-zinc-50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/40"
              }`}
            >
              <h4
                className={`text-sm font-black tracking-wide uppercase ${column.isKatalyst ? "text-zinc-900" : "text-zinc-900 dark:text-zinc-900"}`}
              >
                {column.name}
              </h4>

              <motion.ul
                variants={listContainerVariants}
                className="space-y-4 w-full flex-1"
              >
                {featureList.map((feature, fIdx) => {
                  const hasFeature = column.features[feature];
                  return (
                    <motion.li
                      key={fIdx}
                      variants={rowLineVariants}
                      className={`flex items-center gap-3 text-sm pb-3 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-none last:pb-0 ${
                        hasFeature
                          ? "text-black font-bold"
                          : "text-zinc-400 dark:text-zinc-600 font-light"
                      }`}
                    >
                      {hasFeature ? (
                        <span className="text-zinc-900 font-bold text-xs select-none block">
                          ✓
                        </span>
                      ) : (
                        <span className="text-zinc-300 dark:text-zinc-800 font-light text-xs select-none block opacity-50">
                          ✕
                        </span>
                      )}
                      <span>{feature}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
