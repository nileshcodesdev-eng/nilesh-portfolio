"use client";

import {
  RxDesktop,
  RxReload,
  RxLockClosed,
  RxLayers,
  RxBarChart,
  RxArrowTopRight,
} from "react-icons/rx";
import { FaDatabase } from "react-icons/fa";
import type { IconType } from "react-icons";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import TiltCard from "@/components/TiltCard";

const serviceData: {
  Icon: IconType;
  title: string;
  badge: string;
  description: string;
  technologies: string[];
}[] = [
  {
    Icon: RxLayers,
    title: "Enterprise ERP Engineering",
    badge: "Core Expertise",
    description:
      "Engineering full-stack ERP modules in React.js, Angular, Node.js, and .NET supporting concurrent business operations across multi-tenant environments.",
    technologies: ["React.js", "Angular", ".NET", "C#", "Node.js"],
  },
  {
    Icon: RxReload,
    title: "REST APIs & CRM Sync",
    badge: "Automation",
    description:
      "Designing robust RESTful API pipelines connecting core business platforms with CRM systems, cutting manual sync and data entry overhead by 40%.",
    technologies: ["REST APIs", "CRM Integration", "Swagger", "Postman"],
  },
  {
    Icon: FaDatabase,
    title: "Database Design & SQL Tuning",
    badge: "High Performance",
    description:
      "Architecting complex schemas, stored procedures, and query indexes on MySQL and MS SQL Server, improving throughput and report speed by 30%.",
    technologies: ["MS SQL Server", "MySQL", "Indexing", "Query Plan"],
  },
  {
    Icon: RxLockClosed,
    title: "Auth & RBAC Architecture",
    badge: "Security",
    description:
      "Implementing zero-trust Role-Based Access Control (RBAC) and JWT authentication across granular user tiers, cutting unauthorized access flags by 90%.",
    technologies: ["JWT", "RBAC", "Access Control", "Security"],
  },
  {
    Icon: RxDesktop,
    title: "Cloud CDE & Document Hubs",
    badge: "Cloud Systems",
    description:
      "Building web-based Common Data Environments for hierarchical project file management, browser content viewing, and automated time calculations.",
    technologies: ["Angular", ".NET", "File Systems", "Time Tracking"],
  },
  {
    Icon: RxBarChart,
    title: "Data Analytics & Validation",
    badge: "Google Certified",
    description:
      "Google-certified data analysis and multi-modal dataset validation pipelines with 95%+ QA accuracy benchmarks and real-time dashboard visualization.",
    technologies: ["Google Certified", "Data QA", "Dashboard KPIs"],
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-auto pb-12"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <TiltCard tiltDegree={6} className="h-full rounded-2xl">
            <div className="bg-gradient-to-b from-white/10 via-white/5 to-transparent h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-accent/50 backdrop-blur-md group cursor-pointer transition-all duration-300 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-2xl text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <item.Icon aria-hidden />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-base font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-white/10">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
                  <span>Explore Capabilities</span>
                  <div className="text-xl">
                    <RxArrowTopRight
                      className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
