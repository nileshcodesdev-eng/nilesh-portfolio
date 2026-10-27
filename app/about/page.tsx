"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaDatabase,
  FaGitAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDotnet,
  SiExpress,
  SiMysql,
  SiPostman,
  SiSwagger,
  SiVite,
  SiGoogle,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import type { IconType } from "react-icons";

import Circles from "@/components/Circles";
import TiltCard from "@/components/TiltCard";
import { fadeIn } from "@/variants";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  skills: string[];
};

type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  score: string;
  highlights?: string;
};

type SkillCategory = {
  category: string;
  items: { name: string; Icon?: IconType }[];
};

type CertificationItem = {
  name: string;
  issuer: string;
  credentialId: string;
  period?: string;
  description: string;
};

const experienceData: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Skeingear Tech",
    period: "Jul 2024 – Present",
    bullets: [
      "Engineered and shipped full-stack modules for enterprise ERP systems using React.js, Angular, Node.js, Express.js, and .NET, supporting multiple concurrent business users across modules.",
      "Designed and integrated REST APIs connecting the core platform with CRM systems and third-party services, reducing manual data entry and sync time by 40%.",
      "Implemented secure Authentication & Authorization using JWT and Role-Based Access Control (RBAC) across multiple user roles, cutting unauthorized-access flags by 90%.",
      "Architected complex business logic and workflow automation on MySQL and MS SQL Server, improving query/report performance by 30% and reducing manual process time.",
      "Collaborated with cross-functional product and QA teams in an Agile environment to deliver features on sprint cadence, resolving production issues with minimal downtime.",
    ],
    skills: ["React.js", "Angular", "Node.js", "Express.js", ".NET", "C#", "MySQL", "MS SQL Server", "JWT", "RBAC", "Agile"],
  },
  {
    role: "Data Annotation Intern",
    company: "Occipital Technologies Pvt. Ltd.",
    period: "Dec 2021 – Jan 2022",
    bullets: [
      "Annotated and labeled 5,000+ data points across 10 datasets to support AI/ML model training and validation pipelines.",
      "Performed data validation and quality-assurance checks, maintaining 95%+ accuracy and consistency against project compliance standards.",
    ],
    skills: ["AI/ML Data Pipelines", "Dataset Annotation", "Quality Assurance", "Data Validation"],
  },
];

const educationData: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University",
    period: "2024 – 2026",
    score: "CGPA: 8.70",
    highlights: "Advanced software engineering, distributed systems, relational databases & modern cloud platforms.",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "KTHM College, Nashik (Savitribai Phule Pune University)",
    period: "2021 – 2024",
    score: "CGPA: 7.47",
    highlights: "Data structures, algorithms, database management systems, web development & object-oriented programming.",
  },
];

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", Icon: FaReact },
      { name: "Angular", Icon: FaAngular },
      { name: "JavaScript (ES6+)", Icon: FaJs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Vite", Icon: SiVite },
      { name: "HTML5", Icon: FaHtml5 },
      { name: "CSS3", Icon: FaCss3 },
      { name: "Bootstrap", Icon: FaBootstrap },
      { name: "Material UI" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express.js", Icon: SiExpress },
      { name: "ASP.NET / .NET", Icon: SiDotnet },
      { name: "C#", Icon: TbBrandCSharp },
      { name: "RESTful APIs", Icon: FaCode },
      { name: "JWT Authentication" },
      { name: "RBAC Access Control" },
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "MySQL", Icon: SiMysql },
      { name: "MS SQL Server", Icon: FaDatabase },
      { name: "Schema Design" },
      { name: "Query Optimization" },
    ],
  },
  {
    category: "Tools & Methodologies",
    items: [
      { name: "Git", Icon: FaGitAlt },
      { name: "GitHub" },
      { name: "Postman", Icon: SiPostman },
      { name: "Swagger / OpenAPI", Icon: SiSwagger },
      { name: "Agile / Scrum" },
      { name: "CRM Integration" },
      { name: "Workflow Automation" },
    ],
  },
];

const certificationData: CertificationItem[] = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    credentialId: "UKP29AW5365C",
    period: "Verified Credential",
    description: "Hands-on mastery of data analysis, SQL queries, data cleaning, visualization, dashboard metrics, and analytical problem-solving directly certified by Google.",
  },
];

const tabs = [
  { id: "skills", label: "Skills", icon: FaCode },
  { id: "experience", label: "Experience", icon: FaBriefcase },
  { id: "education", label: "Education", icon: FaGraduationCap },
  { id: "certifications", label: "Certifications", icon: FaCertificate },
];

const About = () => {
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "education" | "certifications">("skills");

  return (
    <div className="h-full bg-primary/30 py-28 xl:py-32 overflow-y-auto relative">
      <Circles />

      <div className="container mx-auto h-full flex flex-col xl:flex-row gap-8 xl:gap-12 items-start justify-center pb-24 xl:pb-8">
        {/* Left Column: Bio & Key Metrics */}
        <div className="w-full xl:w-[42%] flex flex-col justify-center text-center xl:text-left">
          <motion.div
            variants={fadeIn("right", 0.15)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-center xl:self-start mb-3 text-xs uppercase tracking-widest text-accent font-semibold"
          >
            Engineering Background
          </motion.div>

          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-2xl sm:text-4xl xl:text-5xl font-extrabold mb-4"
          >
            Crafting reliable <span className="text-accent">software</span> that powers modern enterprise.
          </motion.h2>

          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 px-2 xl:px-0"
          >
            I am a Full Stack Developer based in <span className="text-white font-medium">Nashik, Maharashtra</span>, specializing in 
            architecting enterprise ERP modules, CRM automation, and high-performance full-stack web applications. 
            My focus is on designing robust REST APIs, resilient database architectures in MySQL and MS SQL Server, 
            and bulletproof authentication with JWT and RBAC.
          </motion.p>

          {/* Quick Metrics with Liquid Glass Cards */}
          <motion.div
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
          >
            <div className="p-3.5 rounded-2xl bg-[#0c0e1a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-center transition-all duration-300">
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-rose-400">
                <CountUp start={0} end={2} duration={3} />+
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Years Exp.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e1a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-center transition-all duration-300">
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                <CountUp start={0} end={40} duration={3} />%
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Data Sync Saved
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e1a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-center transition-all duration-300">
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                <CountUp start={0} end={90} duration={3} />%
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Auth Flags Cut
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e1a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-center transition-all duration-300">
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                8.70
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                MCA CGPA
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Card with Frosted Glass */}
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            className="hidden sm:flex flex-col gap-2 p-5 rounded-2xl bg-[#0c0e1a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 text-xs text-white/80 shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-white/40">// LOCATION:</span>
              <span className="font-medium text-white">Nashik, Maharashtra, India</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-white/40">// EMAIL:</span>
              <a href="mailto:nilesh.codes.dev@gmail.com" className="hover:text-cyan-400 underline transition-colors">
                nilesh.codes.dev@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-white/40">// PHONE:</span>
              <a href="tel:+918766573044" className="hover:text-cyan-400 font-medium transition-colors">
                +91 8766573044
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Tabbed Content (Skills, Experience, Education, Certifications) */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full xl:w-[58%] flex flex-col"
        >
          {/* Tabs Navigation with Liquid Glass Aesthetic */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 border-b border-white/10 pb-3 justify-center xl:justify-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 ${
                    isActive
                      ? "water-shimmer-btn text-white shadow-lg shadow-cyan-500/20"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10 backdrop-blur-md"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>[ {tab.label} ]</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Skills Matrix */}
          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {skillCategories.map((group, idx) => (
                <TiltCard key={idx} tiltDegree={5} className="rounded-xl">
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/40 transition-all duration-300">
                    <h3 className="text-xs uppercase tracking-wider text-accent font-bold mb-3 flex items-center justify-between">
                      <span>{group.category}</span>
                      <span className="text-[10px] text-white/40">{group.items.length} Technologies</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill, sIdx) => {
                        const Icon = skill.Icon;
                        return (
                          <div
                            key={sIdx}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-white/30 hover:bg-accent/15 text-xs text-white/90 transition-all duration-200"
                          >
                            {Icon && <Icon className="text-accent text-sm" />}
                            <span>{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* Tab 2: Experience Timeline */}
          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {experienceData.map((exp, idx) => (
                <TiltCard key={idx} tiltDegree={4} className="rounded-xl">
                  <div className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <span>{exp.role}</span>
                          <span className="text-accent">&bull;</span>
                          <span className="text-accent font-medium text-sm sm:text-base">{exp.company}</span>
                        </h3>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/10 text-white/80 self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="list-disc list-outside pl-4 space-y-2 mb-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Education */}
          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {educationData.map((edu, idx) => (
                <TiltCard key={idx} tiltDegree={5} className="rounded-xl">
                  <div className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/10 text-white/80 self-start sm:self-auto">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-sm text-accent font-medium mb-2">
                      {edu.institution}
                    </div>

                    <div className="inline-block mb-3 px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                      {edu.score}
                    </div>

                    {edu.highlights && (
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        {edu.highlights}
                      </p>
                    )}
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* Tab 4: Certifications */}
          {activeTab === "certifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {certificationData.map((cert, idx) => (
                <TiltCard key={idx} tiltDegree={5} className="rounded-xl">
                  <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/15 backdrop-blur-md hover:border-accent/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent/20">
                        <SiGoogle className="text-2xl" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {cert.name}
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold self-start sm:self-auto">
                            Verified
                          </span>
                        </div>

                        <div className="text-sm text-white/70 font-medium mb-2">
                          Issuer: <span className="text-accent">{cert.issuer}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs text-white/80 mb-3">
                          <span className="text-white/40">Credential ID:</span>
                          <span className="text-accent">{cert.credentialId}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
