"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Earth3DProps {
  className?: string;
}

// Convert latitude and longitude to 3D Cartesian coordinates on a sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Create a 3D curved arc between two lat/lon points on the globe
function createCurvedArc(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  radius: number,
  altitude = 0.35,
  pointsCount = 60
): { curve: THREE.CatmullRomCurve3; points: THREE.Vector3[] } {
  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const distance = v1.distanceTo(v2);
  const elevation = radius + distance * altitude;
  mid.normalize().multiplyScalar(elevation);

  const curve = new THREE.CatmullRomCurve3([v1, mid, v2]);
  const points = curve.getPoints(pointsCount);
  return { curve, points };
}

export const Earth3D: React.FC<Earth3DProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hudInfo, setHudInfo] = useState({
    coords: "19.99° N, 73.78° E",
    hub: "NASHIK HQ [ACTIVE]",
    activeArcs: 4,
    fps: 60,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.3, 3.75);

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

    // --- 2. High-Resolution NASA Textures ---
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load("/textures/earth/earth_atmos_2048.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = maxAnisotropy;

    const normalTexture = textureLoader.load("/textures/earth/earth_normal_2048.jpg");
    normalTexture.anisotropy = maxAnisotropy;

    const specularTexture = textureLoader.load("/textures/earth/earth_specular_2048.jpg");
    specularTexture.anisotropy = maxAnisotropy;

    const nightTexture = textureLoader.load("/textures/earth/earth_lights_2048.png");
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = maxAnisotropy;

    // --- 3. Lighting Setup (Brilliant Daytime Sunlight) ---
    // Primary key sunlight casting radiant daylight across the facing hemisphere
    const sunLight = new THREE.DirectionalLight(0xfffef5, 4.0);
    sunLight.position.set(3.5, 2.5, 5.5);
    scene.add(sunLight);

    // Ethereal celestial blue ambient fill simulating deep space atmospheric bounce
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x1a365d, 2.0);
    scene.add(ambientLight);

    // Soft daylight fill
    const frontFill = new THREE.DirectionalLight(0x93c5fd, 1.4);
    frontFill.position.set(-3.5, 1.2, 4.5);
    scene.add(frontFill);

    // Subtle space rim backlight
    const rimBacklight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimBacklight.position.set(-4, -1, -3);
    scene.add(rimBacklight);

    // --- 4. Earth Globe Sphere Mesh ---
    const earthRadius = 1.22;
    const earthGroup = new THREE.Group();
    // Earth's natural axial tilt (~23.4 degrees)
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    earthGroup.rotation.y = 2.8; // Initially show Asia / India region
    scene.add(earthGroup);

    // Surface Material with photographic detail, bump relief & ocean specularity
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 128, 128);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(1.6, 1.6),
      roughnessMap: specularTexture,
      roughness: 0.35,
      metalness: 0.04,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Physically-Accurate Night City Lights (Deep night crescent only, invisible in daylight)
    const sunPos = new THREE.Vector3(3.5, 2.5, 5.5);
    const nightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uNightTexture: { value: nightTexture },
        uSunPosition: { value: sunPos },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDir;
        uniform vec3 uSunPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vSunDir = normalize((viewMatrix * vec4(uSunPosition, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uNightTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDir;
        void main() {
          vec3 norm = normalize(vNormal);
          float sunDot = dot(norm, vSunDir);
          float nightFactor = smoothstep(-0.4, -0.8, sunDot);

          vec4 nightTex = texture2D(uNightTexture, vUv);
          vec3 cityGlow = nightTex.rgb * vec3(1.2, 0.98, 0.72) * 1.1;
          gl_FragColor = vec4(cityGlow, nightTex.a * nightFactor * 0.75);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const nightMesh = new THREE.Mesh(earthGeometry, nightMaterial);
    earthGroup.add(nightMesh);

    // --- 5. Deep Space Stars & Cosmic Dust Nebula ---
    const starCount = 1400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff), // Diamond white
      new THREE.Color(0xa5f3fc), // Ice cyan
      new THREE.Color(0xfef08a), // Warm gold
      new THREE.Color(0xc084fc), // Soft violet
      new THREE.Color(0x38bdf8), // Sky blue
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spherical distribution around camera and Earth
      const r = 5.5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[idx] = color.r;
      starColors[idx + 1] = color.g;
      starColors[idx + 2] = color.b;
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Shooting Star / Meteor Streak
    const meteorGeom = new THREE.BufferGeometry();
    const meteorPos = new Float32Array([0, 0, 0, -0.6, -0.35, 0]);
    meteorGeom.setAttribute("position", new THREE.Float32BufferAttribute(meteorPos, 3));
    const meteorMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
    });
    const meteorLine = new THREE.Line(meteorGeom, meteorMat);
    scene.add(meteorLine);
    let meteorActive = false;
    let meteorProgress = 0;
    let meteorStart = new THREE.Vector3();
    let meteorEnd = new THREE.Vector3();

    const triggerMeteor = () => {
      meteorActive = true;
      meteorProgress = 0;
      const startX = (Math.random() - 0.5) * 6;
      const startY = 1.5 + Math.random() * 2;
      const startZ = -2 - Math.random() * 2;
      meteorStart.set(startX, startY, startZ);
      meteorEnd.set(startX - 2.5, startY - 1.8, startZ);
    };

    // --- 6. Geospatial Enterprise Tech Hubs & Glowing Arcs ---
    const hubs = [
      { name: "Nashik / Mumbai (HQ)", lat: 19.99, lon: 73.78, isHQ: true },
      { name: "London", lat: 51.5, lon: -0.12, isHQ: false },
      { name: "New York", lat: 40.71, lon: -74.0, isHQ: false },
      { name: "Singapore", lat: 1.35, lon: 103.82, isHQ: false },
      { name: "Tokyo", lat: 35.68, lon: 139.76, isHQ: false },
    ];

    const hqPos = latLonToVector3(hubs[0].lat, hubs[0].lon, earthRadius);

    // Create Hub Beacons
    hubs.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, earthRadius);

      // Pulse Ring
      const ringGeom = new THREE.RingGeometry(hub.isHQ ? 0.035 : 0.02, hub.isHQ ? 0.065 : 0.038, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0x00f0ff : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      earthGroup.add(ring);

      // Core Beacon Point
      const dotGeom = new THREE.SphereGeometry(hub.isHQ ? 0.024 : 0.015, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0xffffff : 0x00f0ff,
      });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.position.copy(pos.clone().multiplyScalar(1.008));
      earthGroup.add(dot);
    });

    // Create 3D Arcs connecting Nashik HQ to global hubs with traveling light pulses
    const arcData: {
      curve: THREE.CatmullRomCurve3;
      pulseMesh: THREE.Mesh;
      progress: number;
      speed: number;
    }[] = [];

    for (let i = 1; i < hubs.length; i++) {
      const destPos = latLonToVector3(hubs[i].lat, hubs[i].lon, earthRadius);
      const { curve, points } = createCurvedArc(hqPos, destPos, earthRadius, 0.32);

      const arcGeom = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.45,
      });
      const arcLine = new THREE.Line(arcGeom, arcMat);
      earthGroup.add(arcLine);

      // Traveling Data Pulse
      const pulseGeom = new THREE.SphereGeometry(0.022, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
      earthGroup.add(pulseMesh);

      arcData.push({
        curve,
        pulseMesh,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003,
      });
    }

    // --- 7. High-Tech Holographic Orbital Ring & Probe ---
    const orbitalRingGeom = new THREE.TorusGeometry(earthRadius * 1.58, 0.008, 16, 120);
    const orbitalRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const orbitalRing = new THREE.Mesh(orbitalRingGeom, orbitalRingMat);
    orbitalRing.rotation.x = Math.PI / 2.7;
    orbitalRing.rotation.y = Math.PI / 6;
    scene.add(orbitalRing);

    // 3D Orbital Probe with solar panels
    const probeGroup = new THREE.Group();
    const probeBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.07),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.2 })
    );
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x0088ff, metalness: 0.8, roughness: 0.3 });
    const panelL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 0.05), panelMat);
    panelL.position.x = -0.09;
    const panelR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 0.05), panelMat);
    panelR.position.x = 0.09;
    probeGroup.add(probeBody, panelL, panelR);
    scene.add(probeGroup);

    // --- 8. Mouse & Pointer Physics (Inertial Tilt + Free 360° Drag) ---
    let isUserInteracting = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isUserInteracting = true;
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isUserInteracting) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        dragVelocityX = deltaX * 0.005;
        dragVelocityY = deltaY * 0.005;
        earthGroup.rotation.y += dragVelocityX;
        earthGroup.rotation.x += dragVelocityY;
        prevPointerX = clientX;
        prevPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetTiltY = normX * 0.4;
        targetTiltX = -normY * 0.3;
      }
    };

    const handlePointerUp = () => {
      isUserInteracting = false;
      setIsDragging(false);
    };

    const handleClick = () => {
      // Accelerate data pulses and trigger meteor
      arcData.forEach((a) => (a.speed *= 1.8));
      setTimeout(() => arcData.forEach((a) => (a.speed /= 1.8)), 800);
      if (!meteorActive) triggerMeteor();
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseup", handlePointerUp);
    container.addEventListener("click", handleClick);
    container.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // --- 9. Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- 10. Animation Loop ---
    let animId: number;
    const startTime = performance.now();
    let meteorTimer = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      // Steady Earth rotation with inertia damping
      if (!isUserInteracting) {
        earthGroup.rotation.y += 0.0018; // Majestic steady planetary spin
        dragVelocityX *= 0.95;
        dragVelocityY *= 0.95;
        earthGroup.rotation.y += dragVelocityX;
        earthGroup.rotation.x += dragVelocityY;

        // Smooth tilt damping towards mouse
        currentTiltX += (targetTiltX - currentTiltX) * 0.05;
        currentTiltY += (targetTiltY - currentTiltY) * 0.05;
        scene.rotation.x = currentTiltX;
        scene.rotation.y = currentTiltY;
      }

      // Animate Geospatial Arcs data pulses
      arcData.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;
        const pt = arc.curve.getPoint(arc.progress);
        arc.pulseMesh.position.copy(pt);
      });

      // Animate Orbital Probe
      const probeAngle = elapsed * 0.5;
      const probeR = earthRadius * 1.58;
      const px = Math.cos(probeAngle) * probeR;
      const pz = Math.sin(probeAngle) * probeR;
      probeGroup.position.set(
        px * Math.cos(Math.PI / 6) - pz * Math.sin(Math.PI / 6),
        px * Math.sin(Math.PI / 2.7) * 0.45,
        pz * Math.cos(Math.PI / 2.7)
      );
      probeGroup.lookAt(0, 0, 0);

      // Starfield subtle breathing twinkle
      starMaterial.opacity = 0.8 + Math.sin(elapsed * 1.5) * 0.15;
      starField.rotation.y = elapsed * 0.008;

      // Shooting Meteor Logic
      meteorTimer += 0.016;
      if (!meteorActive && meteorTimer > 4.5) {
        triggerMeteor();
        meteorTimer = 0;
      }
      if (meteorActive) {
        meteorProgress += 0.035;
        if (meteorProgress >= 1) {
          meteorActive = false;
          meteorMat.opacity = 0;
        } else {
          const currentPos = new THREE.Vector3().lerpVectors(meteorStart, meteorEnd, meteorProgress);
          meteorLine.position.copy(currentPos);
          meteorMat.opacity = Math.sin(meteorProgress * Math.PI) * 0.85;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      resizeObserver.disconnect();

      earthGeometry.dispose();
      earthMaterial.dispose();
      nightMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      dayTexture.dispose();
      normalTexture.dispose();
      specularTexture.dispose();
      nightTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center w-full h-full select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${className}`}
    >
      {/* Radiant Deep-Space Nebula Glow */}
      <div className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-indigo-700/25 blur-3xl pointer-events-none" />

      {/* Outer Holographic Radar Ring */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-cyan-400/20 pointer-events-none flex items-center justify-center">
        <div className="w-[94%] h-[94%] rounded-full border border-dashed border-cyan-400/25 animate-spin-slow" />
      </div>

      {/* Active Theory Precision HUD Overlays */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none flex flex-col justify-between text-[10px] font-mono tracking-widest uppercase text-cyan-200/70 z-20">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            TERRA // PHOTOREALISTIC 3D
          </span>
          <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/30">
            NASA 2K BLUE MARBLE
          </span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-white/60">
            NASHIK HQ &bull; {hudInfo.coords}
          </span>
          <span className="text-cyan-400 font-semibold">
            CLICK OR DRAG 360°
          </span>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        ref={mountRef}
        className="relative z-10 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] xl:w-[560px] xl:h-[560px] flex items-center justify-center"
      />
    </div>
  );
};

export default Earth3D;
