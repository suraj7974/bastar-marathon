"use client";

import { useEffect, useRef, useState } from "react";

export default function Explore() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimeout = setTimeout(() => setMounted(true), 0);

    return () => {
      clearTimeout(mountTimeout);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted and plays automatically
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
    <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center bg-black">
      {/* SVG for Text Mask */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="clamp(60px, 15vw, 200px)"
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
          mask: "url(#text-mask)",
          WebkitMask: "url(#text-mask)",
        }}
      >
        <source src="/videos/just.mov" type="video/mp4" />
      </video>
    </section>
  );
}
