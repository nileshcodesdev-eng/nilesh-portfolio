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
    category: "Cloud File Systems & RBAC",
    image: "/projects/cde-manager.jpg",
    description:
      "Enterprise Common Data Environment (CDE) engineered for multi-disciplinary architectural and engineering teams to securely organize deeply nested asset structures, stream CAD/blueprint previews in-browser, and enforce fine-grained access boundaries.",
    tech: ["Angular", "C#", ".NET", "MS SQL Server", "RBAC"],
    metrics: "Granular Role Permissions &bull; Project Time Engine",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Engineered high-performance hierarchical file ingestion and online preview rendering pipelines.",
      "Designed zero-trust Role-Based Access Control (RBAC) isolating sensitive project tiers across organizations.",
      "Built automated milestone billing calculations and team time-tracking microservices.",
    ],
  },
  {
    title: "B2C Feed & Business Analytics Platform",
    category: "SaaS & Engagement Intelligence",
    image: "/projects/analytics-platform.jpg",
    description:
      "Tiered subscription platform enabling verified brands to broadcast content directly to consumer feeds, track organic conversion funnels, and inspect real-time user retention metrics through interactive dashboards.",
    tech: ["Angular", "C#", ".NET", "MS SQL Server", "Chart.js"],
    metrics: "Multi-Tier Subscription &bull; Real-time Metrics",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Built tiered subscription authorization engine gating features, publishing frequency, and team permissions.",
      "Developed high-throughput social interaction engine supporting real-time likes, saves, and comments.",
      "Constructed interactive executive analytics dashboards tracking retention curves and click-through rates.",
    ],
  },
  {
    title: "Enterprise ERP & CRM Integration Suite",
    category: "Enterprise ERP & Automated Sync",
    image: "/projects/erp-crm.jpg",
    description:
      "High-throughput enterprise resource planning suite connected directly to external CRM pipelines, eliminating repetitive manual data reconciliation and accelerating query execution across distributed teams.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "MS SQL", "JWT"],
    metrics: "40% Manual Sync Cut &bull; 90% Auth Flags Cut",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Architected responsive full-stack ERP modules supporting concurrent enterprise operations with low latency.",
      "Connected legacy data silos to CRM hubs via secure asynchronous REST endpoints, slashing manual sync time by 40%.",
      "Authored optimized SQL stored procedures and indexing plans, delivering a 30% speedup in query performance.",
    ],
  },
  {
    title: "AI/ML Dataset Validation & QA Pipeline",
    category: "Data Engineering & Model Training",
    image: "/projects/ai-pipeline.jpg",
    description:
      "High-precision data annotation and verification framework supporting supervised machine learning pipelines, ensuring model training integrity through rigorous multi-stage QA protocols.",
    tech: ["Python", "Data Annotation", "QA Protocols", "Google Certified"],
    metrics: "5,000+ Labeled Points &bull; 95%+ QA Accuracy",
    github: "https://github.com/nileshcodesdev-eng",
    bullets: [
      "Annotated and validated 5,000+ critical training records across 10 specialized multi-modal datasets.",
      "Maintained a continuous 95%+ QA compliance benchmark against strict machine learning ground-truth criteria.",
      "Structured data transformation pipelines for efficient training batch ingestion.",
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
              <div className="group relative rounded-2xl overflow-hidden bg-[#0c0e1a]/80 border border-white/15 hover:border-cyan-400/50 backdrop-blur-2xl transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-cyan-500/10">
                {/* Image Container with Preview Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Liquid Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e1a] via-transparent to-transparent opacity-90" />

                  {/* Active Theory Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-lg">
                      [ {project.category} ]
                    </span>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 rounded-full bg-black/60 hover:bg-cyan-500 text-white backdrop-blur-md border border-white/20 transition-all duration-200"
                      title="Inspect Details"
                    >
                      <BsEye className="text-sm" />
                    </button>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-2.5 rounded-full bg-black/60 hover:bg-cyan-500 text-white backdrop-blur-md border border-white/20 transition-all duration-200"
                      title="View GitHub"
                    >
                      <BsGithub className="text-sm" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1.5">
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
                          className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-white/80 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-400">
                        {project.metrics}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs text-accent flex items-center gap-1.5 font-semibold hover:text-cyan-400 transition-colors"
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

      {/* Modal Dialog for Project Deep-Dive with Active Theory Liquid Glass */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0e101f]/95 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors border border-white/20"
            >
              &times;
            </button>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 border border-white/15">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30">
                [ {selectedProject.category} ]
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-white/70 mb-5 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold mb-2">
                // ARCHITECTURAL CONTRIBUTIONS
              </h4>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/80 leading-relaxed">
                {selectedProject.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-white/90 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-cyan-400">
                {selectedProject.metrics}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn h-9 px-5 rounded-full water-shimmer-btn text-white text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all"
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
