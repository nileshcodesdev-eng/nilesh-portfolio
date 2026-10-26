"use client";

import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TiltCard from "@/components/TiltCard";

const testimonialData = [
  {
    image: "/t-avt-1.png",
    name: "Engineering Lead",
    company: "Skeingear Tech",
    position: "ERP Systems & Architecture",
    message:
      "Nilesh engineered our core ERP modules with exceptional attention to reliability and clean architecture. His REST API integrations cut client data sync friction by 40%, and his JWT & RBAC implementation secured the platform across multiple user tiers.",
  },
  {
    image: "/t-avt-2.png",
    name: "Product & QA Lead",
    company: "Enterprise Web Platforms",
    position: "Cross-Functional Delivery",
    message:
      "Nilesh has a rare balance of strong frontend precision in React and Angular along with solid backend depth in .NET and SQL Server. He delivered on every sprint cadence and resolved production edge cases with remarkable speed.",
  },
  {
    image: "/t-avt-3.png",
    name: "Lead Data Engineer",
    company: "Occipital Technologies",
    position: "AI/ML Validation Pipeline",
    message:
      "During his data annotation internship, Nilesh labeled over 5,000 points across 10 datasets while maintaining a stellar 95%+ quality-assurance benchmark. His diligence and accuracy made a real impact on our model training pipelines.",
  },
];

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-auto pb-12"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <TiltCard tiltDegree={4} className="rounded-2xl">
            <div className="flex flex-col items-center md:flex-row gap-8 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="w-full md:w-60 flex flex-col items-center text-center shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/60 mb-3 relative shadow-lg shadow-accent/20">
                  <Image
                    src={person.image}
                    fill
                    sizes="80px"
                    alt={person.name}
                    className="object-cover"
                  />
                </div>

                <div className="text-base font-bold text-white mb-0.5">
                  {person.name}
                </div>

                <div className="text-xs text-accent font-semibold mb-1">
                  {person.company}
                </div>

                <div className="text-[11px] text-white/50 uppercase tracking-wider font-light">
                  {person.position}
                </div>

                <div className="flex gap-1 text-amber-400 text-xs mt-2">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center relative md:pl-8 md:border-l border-white/15">
                <div className="mb-3">
                  <FaQuoteLeft
                    className="text-3xl text-accent/40"
                    aria-hidden
                  />
                </div>

                <blockquote className="text-sm sm:text-base text-white/80 italic font-light leading-relaxed">
                  &ldquo;{person.message}&rdquo;
                </blockquote>
              </div>
            </div>
          </TiltCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
