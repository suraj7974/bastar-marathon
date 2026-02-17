"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function InaugurationPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<"gift" | "celebrate" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedVideos = useRef(false);

  const handleStartClick = () => {
    setCountdown(5);
  };

  const handleVideoEnd = () => {
    if (currentVideo === "gift") {
      setCurrentVideo("celebrate");
    } else if (currentVideo === "celebrate") {
      // Disable the redirect component before navigating
      sessionStorage.setItem("inaugurationComplete", "true");
      router.push("/");
    }
  };

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !hasStartedVideos.current) {
      hasStartedVideos.current = true;
      const timer = setTimeout(() => {
        setCurrentVideo("gift");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideo]);

  // Check if we should show videos (countdown finished)
  const isPlayingVideos = currentVideo !== null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {!isPlayingVideos ? (
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
            Welcome to Bastar Marathon
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Get ready for an amazing journey!
          </p>

          {countdown === null ? (
            <Button
              onClick={handleStartClick}
              size="lg"
              className="text-2xl px-12 py-8 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full"
            >
              Start Inauguration
            </Button>
          ) : countdown > 0 ? (
            <div className="text-9xl font-bold text-primary animate-pulse">{countdown}</div>
          ) : null}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center bg-white">
          <video
            ref={videoRef}
            onEnded={handleVideoEnd}
            className="w-[50vw] h-[50vh] object-contain"
            playsInline
          >
            <source
              src={`/videos/${currentVideo === "gift" ? "Gift.webm" : "celebrate.webm"}`}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
