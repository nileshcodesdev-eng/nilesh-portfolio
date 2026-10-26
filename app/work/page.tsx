"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import WorkSlider from "@/components/WorkSlider";
import { fadeIn } from "@/variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 py-28 xl:py-36 flex items-center overflow-y-auto relative">
      <Circles />
      <div className="container mx-auto pb-20 xl:pb-0">
        <div className="flex flex-col xl:flex-row gap-x-8 items-start xl:items-center">
          {/* Left Column Text */}
          <div className="text-center flex xl:w-[32vw] flex-col lg:text-left mb-6 xl:mb-0">
            <motion.div
              variants={fadeIn("up", 0.15)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-center lg:self-start mb-3 text-xs uppercase tracking-widest text-accent font-semibold"
            >
              Portfolio &amp; Case Studies
            </motion.div>

            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-4"
            >
              Featured <span className="text-accent">Systems.</span>
            </motion.h2>

            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base text-white/70 leading-relaxed"
            >
              Enterprise cloud managers, subscription analytics platforms, and full-stack ERP integration suites built with <span className="text-white font-medium">Angular, React.js, .NET (C#), Node.js</span>, and <span className="text-white font-medium">MS SQL Server</span>.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0 text-left mb-6"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs text-white/80">
                  Granular Role-Based Access Control (RBAC) &amp; JWT Security
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                <span className="text-xs text-white/80">
                  High-Performance Relational Queries &amp; Workflow Automation
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center lg:justify-start"
            >
              <Link
                href="https://github.com/nileshcodesdev-eng"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:border-accent text-white text-xs font-semibold hover:bg-accent/20 transition-all duration-300"
              >
                <BsGithub className="text-base" />
                <span>Visit GitHub Profile</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: WorkSlider with 3D Project Cards */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
