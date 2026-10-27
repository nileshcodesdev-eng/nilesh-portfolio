"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

interface ActiveTheoryScroll3DProps {
  scrollProgress: number; // 0 to 1 smooth progress
  scrollVelocity: number; // current scroll velocity
  onProjectClick?: (url: string) => void;
}

export const ActiveTheoryScroll3D: React.FC<ActiveTheoryScroll3DProps> = ({
  scrollProgress,
  scrollVelocity,
  onProjectClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const progressRef = useRef(scrollProgress);
  const velocityRef = useRef(scrollVelocity);

  useEffect(() => {
    progressRef.current = scrollProgress;
    velocityRef.current = scrollVelocity;
  }, [scrollProgress, scrollVelocity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060814, 0.028);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureLoader = new THREE.TextureLoader();

    // --- 2. Lighting ---
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    sunLight.position.set(6, 3, 4);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x060e20, 1.4);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x00d4ff, 2.4);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // --- 3. Cosmic Starfield & Meteors ---
    const starCount = 1400;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPos[idx] = (Math.random() - 0.5) * 80;
      starPos[idx + 1] = (Math.random() - 0.5) * 80;
      starPos[idx + 2] = -Math.random() * 60 + 5;

      const isCyan = Math.random() > 0.7;
      starColors[idx] = isCyan ? 0.0 : 1.0;
      starColors[idx + 1] = isCyan ? 0.85 : 1.0;
      starColors[idx + 2] = 1.0;
    }
    starGeom.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    starGeom.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // Shooting Meteors
    const meteorCount = 12;
    const meteors: { mesh: THREE.Line; velocity: THREE.Vector3; life: number }[] = [];
    for (let i = 0; i < meteorCount; i++) {
      const mGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-0.6, -0.4, 0.5),
      ]);
      const mMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
      });
      const mLine = new THREE.Line(mGeom, mMat);
      scene.add(mLine);
      meteors.push({
        mesh: mLine,
        velocity: new THREE.Vector3(-0.35, -0.22, 0.28),
        life: Math.random() * 300,
      });
    }

    // --- 4. STAGE 1: Photorealistic NASA 3D Earth ---
    const earthRadius = 1.25;
    const earthGroup = new THREE.Group();
    earthGroup.position.set(1.4, 0, 0);
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    earthGroup.rotation.y = 2.8;
    scene.add(earthGroup);

    const dayTexture = textureLoader.load("/textures/earth/earth_atmos_2048.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = maxAnisotropy;

    const normalTexture = textureLoader.load("/textures/earth/earth_normal_2048.jpg");
    normalTexture.anisotropy = maxAnisotropy;

    const specularTexture = textureLoader.load("/textures/earth/earth_specular_2048.jpg");
    specularTexture.anisotropy = maxAnisotropy;

    const cloudsTexture = textureLoader.load("/textures/earth/earth_clouds_1024.png");
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;
    cloudsTexture.anisotropy = maxAnisotropy;

    const nightTexture = textureLoader.load("/textures/earth/earth_lights_2048.png");
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = maxAnisotropy;

    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: specularTexture,
      roughness: 0.38,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Night Lights
    const nightMaterial = new THREE.MeshBasicMaterial({
      map: nightTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.88,
    });
    const nightMesh = new THREE.Mesh(earthGeometry, nightMaterial);
    earthGroup.add(nightMesh);

    // Volumetric Clouds
    const cloudsGeometry = new THREE.SphereGeometry(earthRadius * 1.015, 48, 48);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.72,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);

    // Atmospheric Glow Halo
    const atmosGeometry = new THREE.SphereGeometry(earthRadius * 1.15, 48, 48);
    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = clamp(1.0 - dot(viewDir, vNormal), 0.0, 1.0);
          float intensity = pow(fresnel, 2.7);
          vec3 atmosphereColor = vec3(0.0, 0.85, 1.0);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.85);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    earthGroup.add(atmosMesh);

    // Orbiting Geospatial Rings
    const orbitRingGeom = new THREE.TorusGeometry(earthRadius * 1.35, 0.008, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.8;
    earthGroup.add(orbitRing);

    // --- 5. Active Theory Trademark Flowing Light Ribbons (Spline Curves in 3D) ---
    const ribbonPoints = [
      new THREE.Vector3(1.2, 0.4, 2.0),
      new THREE.Vector3(0.5, -0.6, -2.0),
      new THREE.Vector3(-1.4, 0.8, -6.0),
      new THREE.Vector3(1.2, -0.5, -10.0),
      new THREE.Vector3(-1.0, 0.6, -15.0),
      new THREE.Vector3(0.8, -0.4, -20.0),
      new THREE.Vector3(0.0, 0.0, -25.0),
    ];
    const ribbonCurve = new THREE.CatmullRomCurve3(ribbonPoints);
    const ribbonGeom = new THREE.TubeGeometry(ribbonCurve, 120, 0.018, 8, false);
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    scene.add(ribbonMesh);

    // Secondary Accent Ribbon
    const ribbonPoints2 = [
      new THREE.Vector3(-1.2, -0.5, 2.0),
      new THREE.Vector3(-0.4, 0.7, -3.0),
      new THREE.Vector3(1.5, -0.7, -7.0),
      new THREE.Vector3(-1.2, 0.4, -12.0),
      new THREE.Vector3(1.1, -0.5, -17.0),
      new THREE.Vector3(-0.5, 0.3, -22.0),
      new THREE.Vector3(0.0, 0.0, -25.0),
    ];
    const ribbonCurve2 = new THREE.CatmullRomCurve3(ribbonPoints2);
    const ribbonGeom2 = new THREE.TubeGeometry(ribbonCurve2, 120, 0.014, 8, false);
    const ribbonMat2 = new THREE.MeshBasicMaterial({
      color: 0xf13024,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ribbonMesh2 = new THREE.Mesh(ribbonGeom2, ribbonMat2);
    scene.add(ribbonMesh2);

    // --- 6. STAGE 2: Interactive Floating 3D Project Slabs with 3D Canvas Labels ---
    const projectSlabs: {
      group: THREE.Group;
      basePos: THREE.Vector3;
      baseRotY: number;
      targetScale: number;
      url: string;
      titleMesh: THREE.Mesh;
    }[] = [];

    const projectData = [
      {
        src: "/projects/cde-manager.jpg",
        title: "01 // CDE PLATFORM",
        subtitle: "COMMON DATA ENVIRONMENT // ENTERPRISE CLOUD",
        url: "/work",
        pos: new THREE.Vector3(-1.45, 0.15, -5.0),
        rotY: 0.32,
      },
      {
        src: "/projects/analytics-platform.jpg",
        title: "02 // B2C ANALYTICS",
        subtitle: "REAL-TIME USER ENGAGEMENT & METRICS",
        url: "/work",
        pos: new THREE.Vector3(1.45, -0.15, -8.5),
        rotY: -0.32,
      },
      {
        src: "/projects/erp-crm.jpg",
        title: "03 // ENTERPRISE ERP",
        subtitle: "ZERO-TRUST RBAC & FINANCIAL PIPELINES",
        url: "/work",
        pos: new THREE.Vector3(-1.35, 0.2, -12.0),
        rotY: 0.28,
      },
      {
        src: "/projects/ai-pipeline.jpg",
        title: "04 // AI VALIDATION",
        subtitle: "AUTONOMOUS QA & SECURITY AUDIT SYSTEM",
        url: "/work",
        pos: new THREE.Vector3(1.35, -0.2, -15.5),
        rotY: -0.28,
      },
    ];

    // Helper: Create 3D Canvas Text Sprite/Plate
    const createLabelTexture = (title: string, subtitle: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(7, 8, 20, 0.85)";
        ctx.fillRect(0, 0, 512, 128);

        // Border keyline
        ctx.strokeStyle = "rgba(0, 212, 255, 0.5)";
        ctx.lineWidth = 3;
        ctx.strokeRect(4, 4, 504, 120);

        // Title
        ctx.font = "bold 28px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(title, 24, 52);

        // Subtitle
        ctx.font = "16px monospace";
        ctx.fillStyle = "#00d4ff";
        ctx.fillText(subtitle, 24, 92);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    projectData.forEach((item) => {
      const slabGroup = new THREE.Group();
      slabGroup.position.copy(item.pos);
      slabGroup.rotation.y = item.rotY;

      // Slab Artwork Plate
      const cardTex = textureLoader.load(item.src);
      cardTex.colorSpace = THREE.SRGBColorSpace;
      const slabGeom = new THREE.BoxGeometry(2.5, 1.45, 0.06);
      const slabMat = new THREE.MeshStandardMaterial({
        map: cardTex,
        roughness: 0.15,
        metalness: 0.1,
      });
      const slabMesh = new THREE.Mesh(slabGeom, slabMat);
      slabMesh.userData = { isProjectSlab: true, url: item.url };
      slabGroup.add(slabMesh);

      // Liquid Glass Refractive Rim Border
      const rimGeom = new THREE.BoxGeometry(2.54, 1.49, 0.05);
      const rimMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const rimMesh = new THREE.Mesh(rimGeom, rimMat);
      slabGroup.add(rimMesh);

      // Floating 3D Text Label Plate below slab
      const labelTex = createLabelTexture(item.title, item.subtitle);
      const labelGeom = new THREE.PlaneGeometry(2.2, 0.55);
      const labelMat = new THREE.MeshBasicMaterial({
        map: labelTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const labelMesh = new THREE.Mesh(labelGeom, labelMat);
      labelMesh.position.set(0, -1.05, 0.05);
      slabGroup.add(labelMesh);

      scene.add(slabGroup);
      projectSlabs.push({
        group: slabGroup,
        basePos: item.pos.clone(),
        baseRotY: item.rotY,
        targetScale: 1.0,
        url: item.url,
        titleMesh: labelMesh,
      });
    });

    // --- 7. STAGE 3: Constellation Architecture Nodes Grid with Data Packets ---
    const nodeCount = 38;
    const nodeGeometry = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const nodesGroup = new THREE.Group();
    nodesGroup.position.set(0, 0, -19.5);

    const nodeCoords: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const nx = (Math.random() - 0.5) * 6.0;
      const ny = (Math.random() - 0.5) * 3.8;
      const nz = (Math.random() - 0.5) * 4.5;
      const nodePos = new THREE.Vector3(nx, ny, nz);
      nodeCoords.push(nodePos);

      const nMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nMesh.position.copy(nodePos);
      nodesGroup.add(nMesh);
    }

    // Connect close nodes with glowing laser lines
    const linePositions: number[] = [];
    const connectedPairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodeCoords[i].distanceTo(nodeCoords[j]) < 2.1) {
          linePositions.push(
            nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z,
            nodeCoords[j].x, nodeCoords[j].y, nodeCoords[j].z
          );
          connectedPairs.push([nodeCoords[i], nodeCoords[j]]);
        }
      }
    }

    const linesGeom = new THREE.BufferGeometry();
    linesGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.38,
    });
    const nodeLines = new THREE.LineSegments(linesGeom, linesMat);
    nodesGroup.add(nodeLines);

    // Glowing Data Packets moving along the laser lines
    const packetCount = 14;
    const packetMeshes: { mesh: THREE.Mesh; pair: [THREE.Vector3, THREE.Vector3]; t: number; speed: number }[] = [];
    const packetGeom = new THREE.SphereGeometry(0.035, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < packetCount; i++) {
      if (connectedPairs.length === 0) break;
      const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
      const pMesh = new THREE.Mesh(packetGeom, packetMat);
      nodesGroup.add(pMesh);
      packetMeshes.push({
        mesh: pMesh,
        pair,
        t: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    scene.add(nodesGroup);

    // --- 8. STAGE 4: Warp Speed Particle Tunnel with Elongation ---
    const warpCount = 2200;
    const warpGeometry = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpCount * 3);
    const warpColors = new Float32Array(warpCount * 3);

    for (let i = 0; i < warpCount; i++) {
      const idx = i * 3;
      warpPositions[idx] = (Math.random() - 0.5) * 16;
      warpPositions[idx + 1] = (Math.random() - 0.5) * 12;
      warpPositions[idx + 2] = -Math.random() * 28;

      const isCyan = Math.random() > 0.45;
      const c = isCyan ? new THREE.Color(0x00f0ff) : new THREE.Color(0xffffff);
      warpColors[idx] = c.r;
      warpColors[idx + 1] = c.g;
      warpColors[idx + 2] = c.b;
    }

    warpGeometry.setAttribute("position", new THREE.Float32BufferAttribute(warpPositions, 3));
    warpGeometry.setAttribute("color", new THREE.Float32BufferAttribute(warpColors, 3));

    const warpMaterial = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const warpField = new THREE.Points(warpGeometry, warpMaterial);
    scene.add(warpField);

    // --- 9. STAGE 5: Nexus Portal Holographic Gyroscope ---
    const nexusGroup = new THREE.Group();
    nexusGroup.position.set(0, 0, -25.5);

    // 5 Gyroscopic concentric rings
    const ringColors = [0x00f0ff, 0x8b5cf6, 0x00d4ff, 0xf13024, 0x38bdf8];
    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const rGeom = new THREE.TorusGeometry(1.2 + i * 0.42, 0.014, 16, 96);
      const rMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.65 - i * 0.08,
      });
      const rMesh = new THREE.Mesh(rGeom, rMat);
      nexusGroup.add(rMesh);
      ringMeshes.push(rMesh);
    }

    // Core Singularity Energy Sphere
    const coreGeom = new THREE.SphereGeometry(0.45, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    nexusGroup.add(coreMesh);
    scene.add(nexusGroup);

    // --- 10. Interactive Raycaster for Project Slabs ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredSlab: (typeof projectSlabs)[0] | null = null;

    let mouseNormX = 0;
    let mouseNormY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = mouseNormX;
      mouse.y = mouseNormY;

      targetTiltY = mouseNormX * 0.35;
      targetTiltX = -mouseNormY * 0.25;
    };

    const handleClick = () => {
      if (hoveredSlab) {
        if (onProjectClick) {
          onProjectClick(hoveredSlab.url);
        } else {
          router.push(hoveredSlab.url);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    // --- 11. Resize Handling ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // --- 12. Active Theory Smooth Spline Animation Loop ---
    let animId: number;
    let currentCameraZ = 3.8;
    let currentCameraX = 0;
    let currentCameraY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;
      const progress = progressRef.current;
      const velocity = velocityRef.current;

      // Active Theory Curved Camera Trajectory:
      // Depth track along Z: +3.8 -> -25.5
      const targetZ = 3.8 - progress * 29.3;

      // Spline curve weaving in X and Y
      const targetX = Math.sin(progress * Math.PI * 3.2) * 1.05;
      const targetY = Math.cos(progress * Math.PI * 2.4) * 0.35;

      // Smooth camera interpolation
      currentCameraZ += (targetZ - currentCameraZ) * 0.085;
      currentCameraX += (targetX - currentCameraX) * 0.085;
      currentCameraY += (targetY - currentCameraY) * 0.085;

      camera.position.z = currentCameraZ;
      camera.position.x = currentCameraX;
      camera.position.y = currentCameraY;

      // Active Theory Camera Banking into turns:
      camera.rotation.z = -currentCameraX * 0.06;

      // Mouse Parallax Damping
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;
      camera.rotation.x = currentTiltX;
      camera.rotation.y = currentTiltY;

      // Dynamic FOV Warping based on scroll velocity
      const targetFov = 48 + Math.min(14, Math.abs(velocity) * 0.22);
      camera.fov += (targetFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();

      // Stage 1: Earth Animation
      earthMesh.rotation.y += 0.0016;
      cloudsMesh.rotation.y += 0.0022;
      orbitRing.rotation.z += 0.003;

      // Earth Positioning
      const isMobile = window.innerWidth < 1200;
      if (isMobile) {
        earthGroup.position.x = 0;
        earthGroup.position.y = 0.35;
      } else {
        earthGroup.position.x = 1.35;
        earthGroup.position.y = 0;
      }

      // Earth scales and recedes as camera passes
      if (progress > 0.16) {
        const fadeOut = Math.max(0, 1 - (progress - 0.16) * 4.2);
        earthGroup.scale.set(fadeOut, fadeOut, fadeOut);
      } else {
        earthGroup.scale.set(1, 1, 1);
      }

      // Meteors
      meteors.forEach((m) => {
        m.life -= 1;
        if (m.life <= 0) {
          m.life = 150 + Math.random() * 250;
          m.mesh.position.set(
            (Math.random() - 0.5) * 30,
            Math.random() * 15 + 2,
            -Math.random() * 20
          );
          (m.mesh.material as THREE.LineBasicMaterial).opacity = 0.8;
        } else {
          m.mesh.position.add(m.velocity);
          (m.mesh.material as THREE.LineBasicMaterial).opacity *= 0.985;
        }
      });

      // Raycaster for Project Slabs
      raycaster.setFromCamera(mouse, camera);
      const slabMeshes = projectSlabs.map((s) => s.group.children[0]);
      const intersects = raycaster.intersectObjects(slabMeshes);

      if (intersects.length > 0) {
        const hit = projectSlabs.find((s) => s.group.children[0] === intersects[0].object);
        hoveredSlab = hit || null;
        document.body.style.cursor = "pointer";
      } else {
        hoveredSlab = null;
        document.body.style.cursor = "auto";
      }

      // Stage 2: Slabs Floating, Tilt & Hover Lerp
      projectSlabs.forEach((slab, i) => {
        const isHovered = hoveredSlab === slab;
        slab.targetScale = isHovered ? 1.12 : 1.0;

        // Smooth scale
        slab.group.scale.lerp(
          new THREE.Vector3(slab.targetScale, slab.targetScale, slab.targetScale),
          0.1
        );

        // Smooth floating physics + mouse tilt
        slab.group.rotation.x =
          Math.sin(elapsed * 1.5 + i) * 0.08 + currentTiltX * 0.85;
        slab.group.rotation.y =
          slab.baseRotY + Math.cos(elapsed * 1.2 + i) * 0.06 + currentTiltY * 0.85;
        slab.group.position.y =
          slab.basePos.y + Math.sin(elapsed * 2 + i) * 0.08;
      });

      // Flowing Ribbons Pulse
      ribbonMesh.rotation.z = Math.sin(elapsed * 0.4) * 0.05;
      ribbonMesh2.rotation.z = -Math.cos(elapsed * 0.3) * 0.05;

      // Stage 3: Constellation Nodes Rotation & Data Packets
      nodesGroup.rotation.y = elapsed * 0.06;
      nodesGroup.rotation.x = Math.sin(elapsed * 0.04) * 0.08;

      packetMeshes.forEach((p) => {
        p.t = (p.t + p.speed) % 1;
        p.mesh.position.lerpVectors(p.pair[0], p.pair[1], p.t);
      });

      // Stage 4: Warp Speed Particle Stretch
      const velInfluence = Math.min(2.8, Math.abs(velocity) * 0.06);
      warpMaterial.size = 0.048 + velInfluence * 0.085;
      warpField.position.z = (elapsed * 0.6 + progress * 9.5) % 8;

      // Stage 5: Nexus Gyroscopic Rings Rotation
      ringMeshes.forEach((r, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        r.rotation.z += 0.007 * dir;
        r.rotation.x += 0.004 * dir;
        r.rotation.y += 0.003 * dir;
      });
      coreMesh.scale.setScalar(1.0 + Math.sin(elapsed * 3) * 0.08);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      document.body.style.cursor = "auto";

      earthGeometry.dispose();
      earthMaterial.dispose();
      nightMaterial.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      atmosGeometry.dispose();
      atmosMaterial.dispose();
      dayTexture.dispose();
      normalTexture.dispose();
      specularTexture.dispose();
      cloudsTexture.dispose();
      nightTexture.dispose();
      starGeom.dispose();
      starMat.dispose();
      ribbonGeom.dispose();
      ribbonMat.dispose();
      ribbonGeom2.dispose();
      ribbonMat2.dispose();
      warpGeometry.dispose();
      warpMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [router, onProjectClick]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ willChange: "transform" }}
    />
  );
};

export default ActiveTheoryScroll3D;
