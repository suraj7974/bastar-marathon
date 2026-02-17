"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const particlesOptions: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, width: 800, height: 400 },
    },
    color: { value: ["#ffffff", "#b8e0f0", "#d4f1f4"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.2, max: 0.6 },
      animation: { enable: true, speed: 1, sync: false },
    },
    size: {
      value: { min: 2, max: 8 },
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.6 },
      direction: "top",
      random: true,
      straight: false,
      outModes: { default: "out", top: "out", bottom: "out" },
    },
  },
  detectRetina: true,
};

export default function Explore() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    const mountTimeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(mountTimeout);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setParticlesReady(true);
    });
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error("Autoplay failed:", error);
      }
    };

    playVideo();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section className="relative py-10 w-full overflow-hidden flex items-center justify-center bg-[#0c1929]">
      {/* Particle.js water-style background — behind content */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {particlesReady && (
          <Particles
            id="explore-particles"
            options={particlesOptions}
            particlesLoaded={particlesLoaded}
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      <div className="relative z-10 isolate w-full max-w-7xl h-[400px] mx-auto">
        {/* SVG for Text Mask */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          <defs>
            <mask id="explore-text-mask">
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="clamp(32px, 10vw, 120px)"
                fontWeight="900"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                }}
              >
                #Explore Bastar
              </text>
            </mask>
          </defs>
        </svg>

        {/* Video with Text Mask Applied */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            mask: "url(#explore-text-mask)",
            WebkitMask: "url(#explore-text-mask)",
          }}
        >
          <source src="/videos/just.mov" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
