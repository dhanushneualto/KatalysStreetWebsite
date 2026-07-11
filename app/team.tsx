"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  url: string;
  avatarBg: string;
  bio1: string;
  bio2: string;
  leadership: { label: string; details: string }[];
  academia: string[];
  footerQuote: string;
}

export default function TeamSection() {
  const teamData: TeamMember[] = [
    {
      name: "Rajesh Koppula",
      role: "Co-Founder, Co-CEO & AI Executive",
      url: "/rajesh.png",
      avatarBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      bio1: "Rajesh Koppula is an AI visionary with over 22 years of experience driving innovation at the intersection of business strategy and advanced technology. As Co-Founder, Co-CEO, and AI Executive, Rajesh anchors the company's technical vision, leveraging deep expertise in Artificial Intelligence and Machine Learning to build next-generation solutions.",
      bio2: "Throughout his distinguished career, Rajesh has left a significant footprint across major global industries, including senior leadership and impactful roles at Amazon, HSBC, Wells Fargo, Equifax, Fiserv (Ondot), and Priority Commerce. He also brings deep 0-to-1 experience building FinTech and HealthTech startups prior to co-founding Katalyst Street.",
      leadership: [
        {
          label: "Technology & Product",
          details: "AI/ML Vision, Product Development, and Risk Management",
        },
        {
          label: "Business Growth",
          details: "Corporate Strategy and GTM (Go-To-Market) & Partnerships",
        },
        {
          label: "Industry Domains",
          details:
            "Financial Services, Consumer Credit & Payments, Manufacturing & Supply Chain, Healthcare, Retail",
        },
      ],
      academia: [
        "Columbia Business School, MBA",
        "London Business School, MBA",
        "MIT Sloan + CSAIL (Computer Science & Artificial Intelligence Laboratory), Exec Program",
        "University of Cincinnati, MS",
        "Indian Institute of Technology (IIT) Roorkee, B.Tech",
      ],
      footerQuote:
        "Rajesh combines deep technical mastery in AI with a sharp corporate strategy mindset to help businesses scale, navigate risk, and pioneer new market opportunities.",
    },
    {
      name: "Andrew Igharo",
      role: "Co-Founder, Co-CEO & GTM Executive",
      url: "/andrew.png",
      avatarBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      bio1: "Andrew Igharo is a seasoned growth visionary with over 28 years of experience driving institutional scale and market expansion at the intersection of high finance, enterprise sales, and global business strategy. As Co-Founder, Co-CEO, and GTM Executive, Andrew leads Katalyst Street's commercial vision, leveraging decades of cross-functional leadership to scale next-generation solutions.",
      bio2: "Throughout his distinguished career, Andrew has built a formidable track record across major global industries and financial institutions, including impactful roles and senior leadership footprints at J.P. Morgan, Wells Fargo, Glencore, Avista Tech, Global Banking, and Capital Markets. He also brings deep entrepreneurial 0-to-1 experience building and advising early-stage startups prior to co-founding Katalyst Street.",
      leadership: [
        {
          label: "Growth & Market Execution",
          details:
            "Global GTM Strategy, Enterprise Sales, Business Development, Strategic Partnerships",
        },
        {
          label: "Operations & Governance",
          details:
            "PMO (Project Management Office), Legal & HR, Institutional Risk Management",
        },
        {
          label: "Industry Domains",
          details:
            "Financial Services, Investment Banking, Capital Markets, Enterprise Staffing, Startups",
        },
      ],
      academia: ["Columbia Business School", "Williams College"],
      footerQuote:
        "Andrew combines sophisticated financial acumen with an aggressive enterprise growth mindset to help organizations scale, navigate complex market dynamics, and capture global opportunities.",
    },
  ];

  const containerVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // ⚡ FIXED: Added explicit 'Variants' type allocation to appease strict v12 typing engines
  const cardVariants: Variants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="team"
      className="w-full max-w-7xl mx-auto px-4 py-24 text-left scroll-mt-24"
    >
      {/* Upper Meta Header */}
      <div className="space-y-4 mb-16 max-w-5xl">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-black uppercase">
            GLOBAL TRANSFORMATION LEADERS
          </span>
          <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-wider text-black uppercase">
            FORTUNE 500 TO STARTUPS
          </span>
        </div>

        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-black  uppercase leading-[0.95]">
          Founding Team
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-900 font-dark max-w-2xl leading-relaxed pt-2">
          Partnering with global CXOs to drive AI transformation journeys from
          strategy to execution to adoption across all business functions and
          verticals.
        </p>
      </div>

      {/* Two Column Profiles Container Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch"
      >
        {teamData.map((member, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8 text-left"
          >
            {/* Header Identity Row */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {/* STATIONED IMAGE AVATAR CONTAINER */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 shadow-sm">
                  <Image
                    src={member.url}
                    alt={`${member.name} headshot visual portrait`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black  uppercase leading-none">
                    {member.name}
                  </h3>
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide mt-1.5">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-sm font-dark text-zinc-600 dark:text-zinc-900 leading-relaxed">
                <p>{member.bio1}</p>
                <p>{member.bio2}</p>
              </div>
            </div>

            {/* Structured Segment Details */}
            <div className="space-y-6 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex-1">
              {/* Category 1: Leadership Matrix */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-900 uppercase">
                  VERSATILE LEADERSHIP
                </h4>
                <div className="space-y-2.5">
                  {member.leadership.map((item, lIdx) => (
                    <p
                      key={lIdx}
                      className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-900"
                    >
                      <strong className="font-bold text-black ">
                        {item.label}:
                      </strong>{" "}
                      {item.details}
                    </p>
                  ))}
                </div>
              </div>

              {/* Category 2: Academic Excellence */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-900 uppercase">
                  ACADEMIC EXCELLENCE
                </h4>
                <ul className="space-y-1.5">
                  {member.academia.map((school, sIdx) => (
                    <li
                      key={sIdx}
                      className="text-xs text-zinc-600 dark:text-zinc-900 font-dark flex items-center gap-2"
                    >
                      <span className="text-zinc-300 dark:text-zinc-700 select-none">
                        •
                      </span>
                      <span>{school}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Abstract Conclusion Statement */}
            <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-auto">
              <p className="text-xs italic font-dark text-zinc-500 dark:text-zinc-900 leading-relaxed">
                {member.footerQuote}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
