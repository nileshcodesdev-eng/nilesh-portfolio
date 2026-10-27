"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import ServiceSlider from "@/components/ServiceSlider";
import { fadeIn } from "@/variants";

const Services = () => {
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
              Enterprise Engineering
            </motion.div>

            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-4"
            >
              What I <span className="text-accent">Build.</span>
            </motion.h2>

            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base text-white/70 leading-relaxed"
            >
              From full-stack enterprise ERP modules and CRM automation pipelines to high-throughput relational SQL architectures and secure role-based platforms.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden lg:flex flex-col gap-2.5 mb-8"
            >
              <div className="text-xs text-white/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Production-grade modular architectures</span>
              </div>
              <div className="text-xs text-white/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Zero-trust role-based authorization (JWT/RBAC)</span>
              </div>
              <div className="text-xs text-white/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>High-performance relational databases &amp; API sync</span>
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
                href="/contact"
                className="btn px-6 rounded-full water-shimmer-btn text-white text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <span>Discuss Your Project</span>
                <BsArrowRight className="text-sm" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: ServiceSlider */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;
