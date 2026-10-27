"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { FaReact, FaAngular, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiDotnet } from "react-icons/si";

interface ActiveTheoryHero3DProps {
  className?: string;
}

export const ActiveTheoryHero3D: React.FC<ActiveTheoryHero3DProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fluidEnergy, setFluidEnergy] = useState("OPTIMAL");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // --- Lighting for Liquid Glass ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    // Dynamic mouse-tracking primary point light (Electric Rose/Accent)
    const primaryLight = new THREE.PointLight(0xf13024, 8, 20);
    primaryLight.position.set(2, 2, 3);
    scene.add(primaryLight);

    // Secondary cyan/blue light for chromatic glass refraction
    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 20);
    cyanLight.position.set(-3, -2, 2);
    scene.add(cyanLight);

    // Violet backlight for deep active theory glow
    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 3);
    violetLight.position.set(0, 3, -3);
    scene.add(violetLight);

    // --- 3D Liquid Water Orb Geometry & Mesh ---
    // Subdivided Icosahedron geometry gives rich organic fluid vertices
    const detail = 4;
    const radius = 1.45;
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    
    // Store original vertex positions for wave displacement calculations
    const posAttribute = geometry.attributes.position;
    const vertexCount = posAttribute.count;
    const originalPositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      originalPositions[i] = posAttribute.array[i];
    }

    // Liquid Glass Material with Physical Transmission & Specular Clearcoat
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1a2138),
      emissive: new THREE.Color(0x0d1222),
      roughness: 0.1,
      metalness: 0.15,
      transmission: 0.88,
      ior: 1.48, // Glass refraction index
      thickness: 1.5,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      wireframe: false,
      transparent: true,
      opacity: 0.94,
    });

    const liquidOrb = new THREE.Mesh(geometry, glassMaterial);
    scene.add(liquidOrb);

    // Wireframe geometric shell (Active Theory signature high-tech overlay)
    const wireframeGeom = new THREE.IcosahedronGeometry(radius * 1.008, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeShell = new THREE.Mesh(wireframeGeom, wireframeMat);
    scene.add(wireframeShell);

    // Inner glowing pulsating water core
    const coreGeom = new THREE.IcosahedronGeometry(radius * 0.45, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf13024,
      emissive: 0xf13024,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    scene.add(coreMesh);

    // --- Gyroscopic Orbital Rings (Liquid Glass & Laser HUD) ---
    const ring1Geom = new THREE.TorusGeometry(2.1, 0.018, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf13024,
      emissive: 0xf13024,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    scene.add(ring2);

    // --- Swirling Floating Refractive Micro-Droplets / Crystal Field ---
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const pIdx = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const dist = 1.9 + Math.random() * 1.6;

      particlePositions[pIdx] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[pIdx + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[pIdx + 2] = dist * Math.cos(phi);

      particleSpeeds[pIdx] = (Math.random() - 0.5) * 0.01;
      particleSpeeds[pIdx + 1] = (Math.random() - 0.5) * 0.01;
      particleSpeeds[pIdx + 2] = (Math.random() - 0.5) * 0.01;
    }

    particleGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- Mouse Tracking & Fluid Wave Physics ---
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    const mouseNorm = { x: 0, y: 0 };
    let mouseWaveIntensity = 0.0;
    let clickShockwave = 0.0;
    let clock = new THREE.Clock();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Normalized coordinates: -1 to +1
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseNorm.x = x;
      mouseNorm.y = y;

      targetRotation.y = x * 0.75;
      targetRotation.x = -y * 0.65;

      mouseWaveIntensity = Math.min(1.0, mouseWaveIntensity + 0.08);

      setMousePos({
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
      });
    };

    const handleClick = () => {
      clickShockwave = 1.0;
      setClickCount((c) => c + 1);
      setFluidEnergy("HYPER");
      setTimeout(() => setFluidEnergy("OPTIMAL"), 1200);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    container.addEventListener("click", handleClick);
    container.addEventListener("touchstart", handlePointerMove, { passive: true });
    container.addEventListener("touchmove", handlePointerMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Damping for Inertial Rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

      liquidOrb.rotation.x = currentRotation.x;
      liquidOrb.rotation.y = currentRotation.y + elapsedTime * 0.12;

      wireframeShell.rotation.x = liquidOrb.rotation.x * 1.1;
      wireframeShell.rotation.y = -elapsedTime * 0.08;

      coreMesh.rotation.x = -elapsedTime * 0.4;
      coreMesh.rotation.y = elapsedTime * 0.3;
      const corePulse = 1 + Math.sin(elapsedTime * 3) * 0.08 + clickShockwave * 0.25;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Rotate gyroscopic rings
      ring1.rotation.z += 0.006;
      ring1.rotation.y += 0.003;
      ring2.rotation.x += 0.004;
      ring2.rotation.z -= 0.005;

      // Update light positions tracking mouse
      primaryLight.position.x = mouseNorm.x * 4 + Math.sin(elapsedTime) * 1.2;
      primaryLight.position.y = mouseNorm.y * 4 + Math.cos(elapsedTime) * 1.2;
      cyanLight.position.x = -mouseNorm.x * 4 + Math.cos(elapsedTime * 0.8) * 1.5;
      cyanLight.position.y = -mouseNorm.y * 4 + Math.sin(elapsedTime * 0.8) * 1.5;

      // Dissipate mouse wave intensity and shockwave
      mouseWaveIntensity *= 0.96;
      clickShockwave *= 0.94;

      // --- Dynamic Liquid Water Wave Vertex Displacement ---
      const positions = posAttribute.array as Float32Array;
      const waveFreq1 = 3.2;
      const waveFreq2 = 4.8;
      const waveSpeed = 2.4;
      const baseAmp = 0.07;
      const activeAmp = baseAmp + mouseWaveIntensity * 0.14 + clickShockwave * 0.28;

      for (let i = 0; i < vertexCount; i++) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        // 3D Spherical Coordinate waves simulating fluid surface tension
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / dist;
        const ny = oy / dist;
        const nz = oz / dist;

        // Multi-frequency harmonic sine waves
        const wave1 = Math.sin(nx * waveFreq1 + elapsedTime * waveSpeed);
        const wave2 = Math.cos(ny * waveFreq2 - elapsedTime * (waveSpeed * 1.2));
        const wave3 = Math.sin((nz + nx) * 2.5 + elapsedTime * 1.8);

        // Radial mouse proximity influence
        const mouseAngleDist = Math.hypot(nx - mouseNorm.x * 0.8, ny - mouseNorm.y * 0.8);
        const mouseInfluence = Math.max(0, 1 - mouseAngleDist * 0.7) * (mouseWaveIntensity * 0.2);

        // Click shockwave ripple
        const shockWaveRipple = Math.sin(dist * 8.0 - clickShockwave * 12.0) * clickShockwave * 0.15;

        const displacement =
          (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * activeAmp +
          mouseInfluence +
          shockWaveRipple;

        const newDist = radius + displacement;
        positions[idx] = nx * newDist;
        positions[idx + 1] = ny * newDist;
        positions[idx + 2] = nz * newDist;
      }

      posAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Swirl Particles
      const pArr = particlePositions;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pArr[idx] += particleSpeeds[idx];
        pArr[idx + 1] += particleSpeeds[idx + 1];
        pArr[idx + 2] += particleSpeeds[idx + 2];

        // Gently orbit around origin
        const px = pArr[idx];
        const pz = pArr[idx + 2];
        const angle = 0.003;
        pArr[idx] = px * Math.cos(angle) - pz * Math.sin(angle);
        pArr[idx + 2] = px * Math.sin(angle) + pz * Math.cos(angle);
      }
      particleGeom.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handlePointerMove);
      container.removeEventListener("touchmove", handlePointerMove);
      resizeObserver.disconnect();

      geometry.dispose();
      glassMaterial.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Background Ambient Fluid Glow */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-accent/20 via-purple-600/20 to-cyan-400/25 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />

      {/* Active Theory Minimalist Geometric Target Reticle */}
      <div className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/10 pointer-events-none flex items-center justify-center">
        <div className="w-[96%] h-[96%] rounded-full border border-dashed border-cyan-400/20 animate-spin-slow" />
      </div>

      {/* Active Theory Cinematic HUD Corner Brackets */}
      <div className="absolute inset-4 sm:inset-8 pointer-events-none flex flex-col justify-between">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            SYS.CORE // ACTIVE THEORY 3D
          </span>
          <span className="text-cyan-400">STATE: {fluidEnergy}</span>
        </div>
        <div className="flex justify-between items-end text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <span>
            COORD [ X: {mousePos.x.toFixed(2)} Y: {mousePos.y.toFixed(2)} ]
          </span>
          <span className="text-accent">
            PULSE: #{clickCount.toString().padStart(2, "0")} (CLICK TO RIPPLE)
          </span>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] xl:w-[540px] xl:h-[540px] flex items-center justify-center"
      />

      {/* Floating 3D Tech Badges with Liquid Glass Aesthetics */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute top-4 -left-6 z-20 items-center gap-2.5 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-2xl shadow-cyan-500/10 text-xs font-medium text-white/90 hover:scale-105 transition-transform"
      >
        <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          <FaReact className="text-base" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-white font-semibold leading-tight">React &amp; Angular</span>
          <span className="text-[10px] font-mono text-cyan-400/80">FRONTEND ARCH</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden md:flex absolute top-8 -right-4 z-20 items-center gap-2.5 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/10 text-xs font-medium text-white/90 hover:scale-105 transition-transform"
      >
        <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
          <SiDotnet className="text-base" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-white font-semibold leading-tight">.NET &amp; C# ERP</span>
          <span className="text-[10px] font-mono text-purple-400/80">ENTERPRISE CORE</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:flex absolute bottom-8 -left-4 z-20 items-center gap-2.5 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-2xl shadow-emerald-500/10 text-xs font-medium text-white/90 hover:scale-105 transition-transform"
      >
        <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <FaNodeJs className="text-base" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-white font-semibold leading-tight">Node &amp; Express</span>
          <span className="text-[10px] font-mono text-emerald-400/80">MICROSERVICES</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="hidden md:flex absolute bottom-10 -right-6 z-20 items-center gap-2.5 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-2xl shadow-amber-500/10 text-xs font-medium text-white/90 hover:scale-105 transition-transform"
      >
        <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <FaDatabase className="text-base" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-white font-semibold leading-tight">SQL Server &amp; MySQL</span>
          <span className="text-[10px] font-mono text-amber-400/80">DATA STORAGE</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ActiveTheoryHero3D;
