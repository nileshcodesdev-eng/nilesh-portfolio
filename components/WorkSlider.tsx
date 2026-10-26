"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRight, BsGithub, BsEye } from "react-icons/bs";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import TiltCard from "@/components/TiltCard";

export type ProjectItem = {
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  metrics: string;
  github: string;
  demo?: string;
  bullets: string[];
};

export const projectsList: ProjectItem[] = [
  {
    title: "Cloud-Based CDE Manager Platform",
    category: "Cloud & File Management",
    image: "/projects/cde-manager.jpg",
    description:
      "Web-based Common Data Environment (CDE) platform enabling organizations to manage complex file/folder structures, preview blueprints online, and enforce granular role-based permissions.",
    tech: ["Angular", "C#", ".NET", "MS SQL Server", "RBAC"],
    metrics: "Granular Role Permissions &bull; Project Time Tracking",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Upload and manage hierarchical project files and folders with real-time online previews.",
      "Granular role-based access control (RBAC) supporting multiple user roles with project-level boundaries.",
      "Automated work-time tracking and automated calculation engine for accurate project billing.",
    ],
  },
  {
    title: "B2C Feed & Business Analytics Platform",
    category: "SaaS & Engagement Analytics",
    image: "/projects/analytics-platform.jpg",
    description:
      "Subscription-driven business platform where companies register under plan tiers, publish content to public feeds with engagement analytics, and inspect detailed conversion metrics.",
    tech: ["Angular", "C#", ".NET", "MS SQL Server", "Chart.js"],
    metrics: "Multi-Tier Subscription &bull; Real-time Engagement Analytics",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Subscription plan-tier gating controlling feature access, post visibility, and team seats.",
      "Public social feed with like, save, comment, and organic reach metrics.",
      "Company-facing analytics dashboard tracking page visits, CTR, and time-spent retention.",
    ],
  },
  {
    title: "Enterprise ERP & CRM Integration Suite",
    category: "Enterprise ERP & API Sync",
    image: "/projects/erp-crm.jpg",
    description:
      "High-throughput enterprise ERP module connected directly with CRM pipelines, streamlining automated order fulfillment and query performance across concurrent business users.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "MS SQL", "JWT"],
    metrics: "40% Manual Sync Cut &bull; 90% Auth Flags Cut",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Engineered full-stack ERP modules supporting concurrent business operations.",
      "Connected core ERP with CRM systems via secure REST APIs, reducing manual entry by 40%.",
      "Architected stored procedures and SQL business logic, improving query speed by 30%.",
    ],
  },
  {
    title: "AI/ML Dataset Validation & QA Pipeline",
    category: "AI/ML Data Engineering",
    image: "/projects/ai-pipeline.jpg",
    description:
      "High-precision data annotation and verification platform supporting machine learning pipelines with rigorous automated and manual validation benchmarks.",
    tech: ["Python", "Data Annotation", "QA Protocols", "Google Certified"],
    metrics: "5,000+ Labeled Points &bull; 95%+ QA Accuracy",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Annotated and labeled 5,000+ data points across 10 multi-modal AI/ML datasets.",
      "Maintained 95%+ quality-assurance benchmark against strict project compliance standards.",
      "Built structured validation reporting pipelines for machine learning model training.",
    ],
  },
];

const WorkSlider = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <Swiper
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="h-auto pb-12"
      >
        {projectsList.map((project, idx) => (
          <SwiperSlide key={idx}>
            <TiltCard tiltDegree={8} className="rounded-2xl h-full">
              <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 backdrop-blur-md transition-all duration-500 flex flex-col h-full shadow-xl">
                {/* Image Container with Preview Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131424] via-transparent to-transparent opacity-90" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-accent backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2 rounded-full bg-white/20 hover:bg-accent text-white backdrop-blur-md transition-all duration-200"
                      title="Inspect Details"
                    >
                      <BsEye className="text-sm" />
                    </button>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-2 rounded-full bg-white/20 hover:bg-accent text-white backdrop-blur-md transition-all duration-200"
                      title="View GitHub"
                    >
                      <BsGithub className="text-sm" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors duration-300 mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-emerald-400">
                        {project.metrics}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs text-accent flex items-center gap-1 font-semibold hover:underline"
                      >
                        <span>Details</span>
                        <BsArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Dialog for Project Deep-Dive */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#1b1c31] border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors"
            >
              &times;
            </button>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 border border-white/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-accent px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30">
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-2">
                Key Contributions &amp; Architectural Highlights
              </h4>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-white/80 leading-relaxed">
                {selectedProject.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {selectedProject.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-emerald-400 font-semibold">
                {selectedProject.metrics}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn h-9 px-4 rounded-lg bg-accent text-white text-xs font-semibold flex items-center gap-2 hover:bg-accent/80 transition-all"
                >
                  <BsGithub />
                  <span>GitHub Repository</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkSlider;
