"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsDownload } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import CountUp from "react-countup";

import ParticlesContainer from "@/components/ParticlesContainer";
import ProjectsBtn from "@/components/ProjectsBtn";
import Avatar from "@/components/Avatar";
import { fadeIn } from "@/variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full overflow-y-auto xl:overflow-hidden relative">
      <div className="w-full h-full bg-gradient-to-r from-primary/30 via-black/40 to-black/20">
        <div className="text-center flex flex-col justify-center pt-28 pb-20 xl:pt-28 xl:pb-0 xl:text-left h-full container mx-auto relative z-20">
          {/* Status Pill Badge */}
          <motion.div
            variants={fadeIn("down", 0.15)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md self-center xl:self-start mb-4 text-xs font-medium text-white/80"
          >
            <HiSparkles className="text-accent text-sm" />
            <span>Full Stack Developer &bull; ERP &amp; Cloud Architect</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight mb-4"
          >
            Building Scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f13024] via-rose-400 to-[#e838cc]">
              Enterprise Systems
            </span>{" "}
            &amp; Modern Web
          </motion.h1>

          {/* Professional Summary */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md xl:max-w-2xl mx-auto xl:mx-0 mb-6 xl:mb-8 text-sm sm:text-base text-white/70 font-light leading-relaxed"
          >
            Hi, I&apos;m <span className="text-white font-medium">Nilesh Jayprakash Chaurasiya</span>. 
            Full Stack Developer with <span className="text-white font-medium">2+ years</span> of experience 
            building and scaling enterprise ERP systems, CRM integrations, and business web platforms using 
            <span className="text-white"> React.js, Angular, Node.js, Express.js,</span> and <span className="text-white">.NET (C#)</span> with 
            high-performance SQL architectures.
          </motion.p>

          {/* Core Tech Stack Badges */}
          <motion.div
            variants={fadeIn("down", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap justify-center xl:justify-start gap-2 mb-8 max-w-xl mx-auto xl:mx-0"
          >
            {[
              "React.js",
              "Angular",
              "Node.js",
              ".NET / C#",
              "REST APIs",
              "JWT / RBAC",
              "MS SQL Server",
              "MySQL",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/75"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 mb-8 xl:mb-12"
          >
            <div className="flex justify-center relative">
              <ProjectsBtn />
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="btn px-7 rounded-full bg-gradient-to-r from-accent to-purple-600 text-white text-sm font-semibold tracking-wide flex items-center gap-2 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300"
              >
                <span>Let&apos;s Connect</span>
                <BsArrowRight className="text-lg" />
              </Link>

              <Link
                href="/about"
                className="btn px-6 rounded-full bg-white/5 border border-white/15 hover:border-accent text-white/85 text-sm font-medium tracking-wide flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                <BsDownload className="text-sm text-accent" />
                <span>View CV &amp; Skills</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Metrics Ticker */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg xl:max-w-2xl mx-auto xl:mx-0 pt-4 border-t border-white/10"
          >
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent">
                <CountUp start={0} end={2} duration={3} />+
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                Years Experience
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent">
                <CountUp start={0} end={90} duration={3} />%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                Auth Flags Cut
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent">
                <CountUp start={0} end={40} duration={3} />%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                Sync Time Saved
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent">
                <CountUp start={0} end={30} duration={3} />%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                Query Speed Boost
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Visual & 3D Background */}
      <div className="w-full xl:w-7xl h-full absolute right-0 bottom-0 pointer-events-none z-10">
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 opacity-40 xl:opacity-75"
          aria-hidden
        />

        <ParticlesContainer />

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="hidden xl:flex w-full h-full max-w-160 max-h-160 absolute bottom-4 lg:right-[4%] items-center justify-center pointer-events-auto"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
