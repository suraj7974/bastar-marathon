"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeUpIcon, VolumeOffIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";

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
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-fit">
        <video
          ref={videoRef}
          loop
          playsInline
          preload="auto"
          poster="/images/landingpage.jpeg"
          className="absolute inset-0 w-full"
        >
          <source src="/videos/landingpage.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute bottom-4 left-4 md:bottom-12 md:left-12 z-20 flex items-center gap-4 group">
        <Button
          asChild
          size="sm"
          className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold rounded-full  transition-none"
        >
          <Link href="/registration" className="flex items-center gap-2">
            REGISTER NOW
            <HugeiconsIcon icon={ArrowRightIcon} strokeWidth={2.5} className="size-5" />
          </Link>
        </Button>
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 md:bottom-12 md:right-12 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 text-white"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <HugeiconsIcon icon={VolumeOffIcon} size={24} />
        ) : (
          <HugeiconsIcon icon={VolumeUpIcon} size={24} />
        )}
      </button>
    </div>
  );
}
