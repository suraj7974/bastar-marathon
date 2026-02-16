"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const marathonDate = new Date("March 22, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const difference = marathonDate - now;

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use a timeout to defer setMounted to avoid synchronous setState
    const mountTimeout = setTimeout(() => setMounted(true), 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(mountTimeout);
      clearInterval(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/countdown.jpg"
          alt="Countdown Background"
          fill
          className="object-cover brightness-50 scale-105"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="container mx-auto px-4 text-center text-white z-10 flex flex-col items-center gap-8 justify-center h-full">
        <div className="max-w-4xl space-y-6">
          <p className="text-lg md:text-2xl font-medium leading-relaxed drop-shadow-lg italic text-white/90">
            &quot;Welcome to Bastar, where heritage lives and nature breathes. The Bastar Heritage
            Marathon brings together pristine forests, vibrant tribal culture, and breathtaking
            landscapes. Runners will pass through scenic routes lined with sal trees and timeless
            villages, experiencing Bastar&apos;s beauty with every step.&quot;
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[100px] border border-white/20 shadow-xl"
            >
              <span className="text-3xl md:text-5xl font-bold font-mono text-primary-foreground">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest font-semibold opacity-80 mt-2">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
