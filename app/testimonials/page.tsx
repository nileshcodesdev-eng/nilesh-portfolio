"use client";

import { motion } from "framer-motion";

import TestimonialSlider from "@/components/TestimonialSlider";
import { fadeIn } from "@/variants";

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 pt-24 pb-28 sm:py-28 xl:py-32 overflow-y-auto text-center flex items-start sm:items-center justify-center">
      <div className="container mx-auto px-4 sm:px-8 flex flex-col justify-center pb-24 xl:pb-0">
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-center mb-3 text-xs uppercase tracking-widest text-accent font-semibold"
        >
          Colleague &amp; Leadership Feedback
        </motion.div>

        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-3"
        >
          Professional <span className="text-accent">Endorsements.</span>
        </motion.h2>

        <motion.p
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto mb-8 sm:mb-12"
        >
          Testimonials and peer reviews from engineering managers, technical leads, and cross-functional teammates I have collaborated with.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full max-w-4xl mx-auto"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
