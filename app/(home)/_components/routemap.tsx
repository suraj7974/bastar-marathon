"use client";

import { useEffect, useState } from "react";

// Extend Window interface for Strava embed
declare global {
  interface Window {
    StravaEmbed?: {
      init: () => void;
    };
  }
}

const routeData = [
  {
    title: "42 km - Full Marathon",
    embedId: "3457450585584779758",
    mapHash: "10.27/19.2374/81.746",
  },
  {
    title: "21 km - Half Marathon",
    embedId: "3457450726646584814",
    mapHash: "11.65/19.1994/81.7246",
  },
  {
    title: "10 km - Culture Run",
    embedId: "3457450726646584814",
    mapHash: "11.65/19.1994/81.7246",
  },
  {
    title: "5 km - Fun Run",
    embedId: "3457450726642482670",
    mapHash: "13.19/19.1992/81.70948",
  },
];

export default function RouteMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimeout = setTimeout(() => setMounted(true), 0);

    return () => {
      clearTimeout(mountTimeout);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load Strava embed script
    const existingScript = document.querySelector(
      'script[src="https://strava-embeds.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://strava-embeds.com/embed.js";
      script.async = true;
      script.onload = () => {
        // Trigger Strava embed rendering after script loads
        if (window.StravaEmbed) {
          window.StravaEmbed.init();
        }
      };
      document.body.appendChild(script);
    } else {
      // Script already exists, just trigger rendering
      if (window.StravaEmbed) {
        window.StravaEmbed.init();
      }
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore the Routes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Designed for endurance seekers, the 42 km Full Marathon takes runners deep into the
              heart of Bastar. Surrounded by forests, heritage trails, and tranquil scenery, the
              route delivers a perfect balance of challenge and cultural immersion—making it more
              than a race, but a journey.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Route Highlights</h3>
              <p className="text-gray-700 leading-relaxed">
                Experience Bastar&apos;s untouched beauty through scenic forest routes and
                culturally significant landscapes that define the essence of this unique region.
              </p>
            </div>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routeData.map((route) => (
            <div
              key={route.embedId}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Route Title */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                  {route.title}
                </h3>
              </div>

              {/* Strava Embed Map */}
              <div className="h-[400px] md:h-[500px]">
                <div
                  className="strava-embed-placeholder h-full w-full"
                  data-embed-type="route"
                  data-embed-id={route.embedId}
                  data-style="standard"
                  data-terrain="3d"
                  data-surface-type="true"
                  data-map-hash={route.mapHash}
                  data-from-embed="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
