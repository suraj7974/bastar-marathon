"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted initially to allow autoplay
    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error("Autoplay failed:", error);
        // Fallback: ensure it's muted if it wasn't
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (e) {
          console.error("Muted autoplay also failed:", e);
        }
      }
    };

    playVideo();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans text-white overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full bg-black">
        <video
          ref={videoRef}
          loop
          playsInline
          preload="auto"
          poster="/images/landingpage.jpeg"
          className="absolute inset-0 w-full h-full object-fill"
        >
          <source src="/videos/herosection.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative z-10">
        <Header />
      </div>

      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex items-center gap-4 group">
        <Button
          asChild
          size="sm"
          className="relative h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold rounded-full bg-white text-black hover:!bg-white active:!bg-white transition-none"
        >
          <Link href="/registration" className="flex items-center gap-3">
            REGISTER NOW
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 text-white"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </div>
  );
}
