"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOURISM_IMAGES = [
  {
    src: "/images/tourism/chitrakoot-falls-1.jpg",
    alt: "Chitrakote Waterfalls - The Niagara of India",
    orientation: "horizontal" as const,
    rowSpan: 2,
    colSpan: 1,
  },
  {
    src: "/images/tourism/tribal-dance.jpg",
    alt: "Vibrant Tribal Culture & Dance",
    orientation: "vertical" as const,
    rowSpan: 2,
    colSpan: 1,
  },
  {
    src: "/images/tourism/tirathgarh-falls.jpg",
    alt: "Tirathgarh Waterfalls",
    orientation: "vertical" as const,
    rowSpan: 2,
    colSpan: 1,
  },

  {
    src: "/images/tourism/danteswariTemple.jpg",
    alt: "Danteshwari Temple - Sacred Site",
    orientation: "square" as const,
    rowSpan: 1,
    colSpan: 1,
  },
  {
    src: "/images/tourism/dalpatSagar.jpg",
    alt: "Dalpat Sagar Lake",
    orientation: "square" as const,
    rowSpan: 2,
    colSpan: 1,
  },
  {
    src: "/images/tourism/chitrakoot-falls-2.jpg",
    alt: "Chitrakote Falls Panoramic View",
    orientation: "horizontal" as const,
    rowSpan: 2,
    colSpan: 2,
  },
  {
    src: "/images/tourism/waterfall.jpg",
    alt: "Chitrakote Falls Panoramic View",
    orientation: "horizontal" as const,
    rowSpan: 2,
    colSpan: 1,
  },
  {
    src: "/images/tourism/kutumsar.jpg",
    alt: "Chitrakote Falls Panoramic View",
    orientation: "horizontal" as const,
    rowSpan: 1,
    colSpan: 1,
  },
];

const CG_VIEWBOX = "144 144 512 512";
const CG_PATH =
  "m547.74 250.27c-1.332-4.5117-5.707-5.4727-8.0859-5.9922-0.69922-0.15625-1.8672-0.41016-2.2188-0.61328-2.6367-1.7617-7.0078-2.0156-10.492-1.4727-0.78125-3.6602-2.9531-5.8477-4.6211-7.3359l-0.19531-8.918c-0.13281-5.1953-2.0703-7.582-4.6836-9.6133 0.28516-0.69922 0.76172-1.6445 1.125-2.3633 1.7383-3.4492 5.7852-11.5-1.5195-17.453-1.6367-1.3398-3.543-2.0469-5.5117-2.0469-3.3125 0-5.5898 1.8359-7.1719 3.6992-0.10156-0.11719-0.20313-0.24219-0.32422-0.37891-0.95312-1.1484-2.25-4.4258-3.2734-7.0234-2.0703-5.2266-4.0312-10.164-8.0312-12.594-2.7227-1.6523-5.1641-2.2422-6.6289-2.5898-0.17188-0.039062-0.34766-0.078124-0.50391-0.11719-0.085938-0.25-0.19531-0.62109-0.33984-1.1562-2.1562-8.8164-4.125-14.289-17.184-15.711-1.1484-0.10156-2.5195 0.22656-3.5586 0.8125-7.2266 4.0234-8.2656 8.0039-9.0117 13.656-0.125 0.9375-0.26172 1.9922-0.51953 3.25-0.015626 0.0625-0.03125 0.13281-0.046876 0.1875-1.7227-0.0625-3.668-0.023438-5.3203 0.26172-3.6289 0.59766-6.0703 0.88281-8.8086-0.15625-0.015625-0.078125-0.03125-0.16406-0.046875-0.24219-0.58984-2.7539-1.9766-9.1875-12.305-10.188-0.99219-0.10938-1.9375 0.023437-2.832 0.38672l-8.5078 3.3867c-6.0938 2.2969-11.547 6.0703-16.602 9.7227-3.793 2.7305-6.7227 2.1484-12.66 0.94531l-2.1094-0.42578c-7.4219-1.4805-13.234-0.0625-20.523 2.1875l-2.5469 0.75391c-7.7852 2.2891-12.043 3.9922-16.312 14.809-0.13281 0.33984-0.27734 0.89844-0.33984 1.25-0.070312 0.37109-0.10938 0.73828-0.10938 1.1172 0 11.027 11.777 13.121 18.805 14.375 2.5352 0.44922 5.6836 1 6.8711 1.668 5.2344 2.9375 6.3594 8.5898 7.6055 17.578l0.34766 2.4336c0.03125 0.20312 0.054688 0.40234 0.078125 0.56641-1.1172 0.48828-2.4336 1.1016-3.9219 2.0078-5.2344 3.1875-6.8477 7.6914-8.0312 10.98-1.1484 3.1719-1.4648 3.7227-3.3203 4.3438-6.8711 2.2891-8.9727 6.9648-10.684 10.801-0.33203 0.75391-0.68359 1.5508-1.1094 2.3633-1.0156 1.9688-1.5586 4-2.0469 5.8398-0.21094 0.80469-0.50391 1.9141-0.76172 2.582-0.28516 0.03125-0.55859 0.078125-0.83594 0.14844-3.6367 0.91406-6.2266 2.9766-8.2969 4.6367-0.79688 0.63672-1.9922 1.5977-2.582 1.7305-0.53516 0-1.0781-0.078125-1.6602-0.14844-2.6367-0.30859-5.3281-0.26953-7.3438 0.41016-1.3398 0.44922-3.125 0.85156-5.0391 1.2891-6.7383 1.5508-14.375 3.3047-17.895 8.7695-1.9375 3-3.0938 6.1328-4.1797 9.0781-0.52734 1.4336-1.0703 2.9141-1.7383 4.3125-1.0234 2.1328-2.4023 4.2109-3.7227 6.2031-1.9375 2.9062-4.125 6.1875-5.6523 10.227-0.98438 2.5898-1.3242 5.8477-1.6758 9.3125-0.27734 2.6836-0.78125 7.5117-1.6445 9.2188-7.707 2.0156-7.8242 11.668-7.9258 20.285-0.039062 2.793-0.10156 7.4844-0.63672 8.7617-0.17969 0.41797-0.32422 0.85156-0.41016 1.3086-0.17969 0.9375-3.125 3.1094-4.6055 4.1953-2.1484 1.5898-4.5898 3.3945-6.4141 5.7383-3.5117 4.5039-3.5664 8.543-3.6055 11.508-0.007813 0.85156-0.007813 1.7227-0.27734 3.1406-0.44141 1.5039-1.3555 4.6289 0.42578 7.9883 1.1953 2.2891 3.0469 3.4805 4.8164 4.2188-0.48047 2.8672-1.5586 6.5352-2.4648 9.6055-1.1016 3.7617-2.0625 8.0391 0.44141 11.352 1.4805 1.9609 3.9062 3.125 6.3125 2.9375 0.13281 3.6211-0.078125 7-0.62891 11.289-0.11719 0.89844-0.26953 1.2031-0.26953 1.2031-0.21094 0.21875-1.1484 0.71484-1.8359 1.0781-1.4336 0.75391-3.0625 1.6445-4.793 2.9375-1.7617 1.3242-6.4297 4.8242-5.9531 10.148 0.43359 5.0156 4.8477 7.25 7.5352 8.6133 0.49609 0.24219 1.1953 0.59766 1.7461 0.91406-0.11719 0.55859-0.20312 1.1484-0.27734 1.7227-3.9766 0.48047-6.8867 3.4961-7.2422 7.6758-0.14844 1.7539 0.28516 3.1797 0.88281 4.3047-0.63672 1.5195-1.0781 3.6133-0.41797 6.1328 0.86719 3.2969 3.7383 5.5195 7.1328 5.5195 1.6367 0 3.0469-0.50391 4.3125-1.0391 1.3008 1.4961 2.7695 2.6758 4.125 3.6992-0.96875 2.1328-0.99219 4.418-0.03125 6.4727 2.2266 4.8555 8.1875 5.3672 12.195 5.6914 0.69922 0.14844 0.94531 0.27734 0.96094 0.27734 0.14844 0.14844 0.47266 0.65234 1.0938 2.5586-0.56641 1.4805-2.7148 3.4883-4.6758 4.4336-0.89062-0.92969-1.8281-1.668-2.5742-2.25-0.50391-0.41016-1.2656-1.0234-1.332-1.1172-0.51953-2.0547-2.4414-3.7617-4.4805-4.3203-0.51172-0.14844-1.1797-0.21875-1.707-0.21875-3.0938 0-3.9219 0.88281-10.809 8.2891-1.0547 1.1328-1.9922 2.1328-2.3477 2.4727-6.0547 5.5977-7.668 11.738-9.0938 17.191-0.41797 1.5898-0.84375 3.2422-1.418 4.9609-0.98438 2.9375-2.7695 8.3047 1.2109 13.879-0.31641 0.57422-0.64453 1.25-0.96875 2.0547-0.14062 0.34766-0.25 0.71484-0.32422 1.0859l-1.1094 5.6758c-0.17969 0.9375-0.09375 2.0312 0.17969 2.9453 0.95312 3.2109 3.7617 10.871 9.1641 12.66 3.3281 1.1016 6.8711-0.27734 8.9414-1.5039 1.418 1.5039 3.1797 3.582 3.9297 4.4492 1.7305 2.0312 3.2578 3.7617 4.125 4.5195 2.707 2.418 2.5898 3.8711 2.2734 7.8086-0.30859 3.8086-0.72266 9.0352 3.2188 14.242 0.80469 1.0547 3.2422 4.2578 7.2812 4.2578 1.0078 0 1.8984-0.17188 2.668-0.48047 0.85156 0.55078 1.7383 0.89062 2.5898 1.0938 0.007813 0.30859 0.03125 0.61328 0.070313 0.92188 0.14062 1.1172 0.28516 2.5195 0.43359 4.0391 0.70703 7.1016 1.3789 12.84 2.9766 16.688 2.4336 5.8008 7.0234 6.4219 8.8789 6.4219 3.1562 0 5.7383-1.4883 8.3203-2.9844 1.3633-0.79688 3.4492-1.9844 4.7383-1.8594 0.34766 0.1875 0.57422 0.30078 0.95312 0.41797 0.32422 0.15625 0.62891 0.38672 0.98438 0.62109 1.4492 0.96094 3.8633 2.5664 7.0781 2.5664 1.0156 0 2-0.15625 2.793-0.41797 3.9141-1.1875 5.6914-4.543 6.7148-6.4727 0.14062-0.26953 0.26953-0.52734 0.34766-0.65234 0.48047-0.59766 0.83594-1.2812 1.0547-2.0156l3.9062-13.066c2.1719-4.0547 2.5586-8.4062 2.9062-12.273 0.51953-5.8164 0.99219-7.707 3.2656-8.9102 0.55859 0.007812 1.2031 0.078125 1.8906 0.16406 1.2109 0.14062 2.4648 0.26953 3.6523 0.26953 6 0 10.094-3.4102 10.965-9.0938 0.20313-1.3398 1.9531-3 3.6602-4.6211 2.6914-2.5664 6.5977-6.2891 6.8398-11.996 0.78125-0.17188 1.6055-0.40234 2.4414-0.69141 8.0312-2.9141 9.5391-8.0781 10.77-12.25l0.078125-0.26172c0.1875-0.10938 0.38672-0.21875 0.57422-0.33984 3.125-1.8125 5.2578-3.1641 6.4727-5.3906 2.2422-4.0859 0.054688-8.1016-1.6992-11.336-0.42578-0.78125-1.2109-2.2266-1.3164-2.4883-0.33984-2.9844-1.0234-6.1016-1.7305-9.25-0.85156-3.7852-1.7305-7.707-1.7305-11.082 0-7.1953-1.6367-9.8164-4.8633-14.281l-0.68359-0.82031c-0.28516-0.875-0.36328-3.793-0.41797-5.543-0.15625-5.7227-0.42578-15.305-8.9492-15.305-0.35547 0-0.71484 0.023438-1.0703 0.070313-0.43359-5.0859-2.7148-8.0391-4.125-9.8711-0.0625-0.078125-0.11719-0.15625-0.17969-0.22656 0.14062-0.24219 0.33203-0.57422 0.62891-1.0078 4.4414 0.44141 12.777 2.4961 14.02 2.9531 0.66797 0.55078 2.1719 2.8672 3.0859 4.2656 3.0391 4.6523 6.4883 9.9258 12.297 9.9258 1.7227 0 3.4023-0.50391 4.832-1.4492 2.9688-1.9219 4.4023-2.0781 4.8398-2.0938 0 0 0.36328 0.26172 0.82031 1.3086 2.9062 6.5742 7.957 7.2812 10.02 7.2812 3.0781-0.015624 6.0547-1.4336 8.3672-3.9688 2.7383-2.9688 4.1562-7.0703 3.8086-10.973-1.0859-12.211-11.359-13.625-17.547-14.484-4.3125-0.57422-7.2656-1.0938-8.6289-2.5273-0.82031-1.8359 0.11719-8.7383 0.55859-12.082 0.32422-2.457 0.62109-4.7773 0.69141-6.5273 0.30078-7.5977-0.37109-9.4375-2.5273-14.176l-0.97656-2.1641c-0.33203-0.75391-0.125-2.25 0.11719-3.9922 0.25-1.793 0.48828-3.6445 0.42578-5.4805-0.015625-0.82031-0.15625-1.332-0.49609-2.6914-0.070312-0.26953-0.13281-0.51953-0.19531-0.76953 8.2578 0.19531 12.77-6.9102 16.367-12.129l0.80469-1.1562c0.078125-0.10938 0.48047-0.68359 0.54297-0.80469 1.5742-2.6367 1.8828-5.0547 2.1172-6.8398 0.039063-0.30859 0.078125-0.55078 0.10938-0.75391 0.36328 0.039063 0.76172 0.085938 1.1953 0.14062 0.88281 0.10156 1.7227 0.17969 2.7773 0.20312 3.2969 0 5.8164-1.1953 7.707-2.4805 3.1562 4.2188 7.1484 4.9219 9.4453 4.9219 3.1016 0 6.2812-1.1641 10.02-3.668 4.543-3.0469 5.4219-7.6133 5.9688-10.391 0.039062-0.1875 0.085937-0.42578 0.13281-0.65234 0.76172-0.054688 1.7148-0.070312 2.3203-0.078125 3.4648-0.046875 7.7773-0.10938 10.91-3.0703 2.9609-2.8242 5.1406-7.668-1.3086-14.77-0.66016-0.72266-1.6133-1.8281-1.7383-1.7148 0.90625-1.4414 1.6836-2.7227 2.3789-4.0391 4.5352 0.37891 6.8242-2.25 7.582-3.3945 1.0391-1.6289 1.9219-4.3828 0.1875-8.2344-0.25-0.56641-0.42578-1.0078-0.52734-1.332 0.070312-0.054688 0.14844-0.11719 0.21875-0.17188 1.793-1.4102 4.7852-3.7539 6.6992-8.3516 2.1953-5.2266-1.3398-9.1641-2.582-10.273-0.64453-1.7539-0.73828-4.6445-0.28516-6.6602 1.3398-1.4492 2.2031-2.8984 2.9375-4.1172 0.31641-0.51953 0.63672-1.0703 1.0625-1.6055 1.5664-1.9766 4.4336-3.2344 7.5039-4.582 2.4805-1.0859 5.2969-2.3047 7.8008-4.1016 0.27734-0.15625 1.1484-0.43359 1.6992-0.60547 1.7539-0.56641 3.9375-1.2656 5.8398-2.8984 3.7695-3.2031 3.582-7.3125 3.25-9.8008 0.21094-0.71484 0.30078-1.4805 0.22656-2.2422l-0.36328-4.0469c0.54297-1.1562 2.7695-3.1641 3.9219-3.4492 0.69922-0.15625 1.4805-0.28516 2.3477-0.42578 5.0547-0.84375 16.887-2.8242 16.887-14.137 0-1.4805 0.50391-2.6836 3.3789-5.5586 1.3672-1.4414 5.0273-5.125 3.6445-9.8867z";

export default function Tourism() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Rebuild cardRefs to match current image count
    cardRefs.current = cardRefs.current.slice(0, TOURISM_IMAGES.length);

    const ctx = gsap.context(() => {
      // Idle pulse on the map
      if (pulseRef.current) {
        gsap.to(pulseRef.current, {
          attr: { r: 180 },
          opacity: 0,
          duration: 2.4,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 0.5,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // Phase 1 [0–3] — zoom map
      tl.to(mapWrapRef.current, { scale: 7, ease: "power2.inOut", duration: 3 }, 0);

      // Fade headline out
      tl.to(heroContentRef.current, { opacity: 0, y: -50, duration: 1.2, ease: "power1.in" }, 0);

      // Phase 2 [2] — ghost map
      tl.to(mapWrapRef.current, { opacity: 0.04, duration: 1.5, ease: "power1.inOut" }, 2);

      // Phase 3 [2.8] — reveal grid wrapper
      tl.fromTo(
        gridSectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" },
        2.8
      );

      // Phase 4 [3+] — stagger every card, no matter how many
      cardRefs.current.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
          3.0 + i * 0.14
        );
      });
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll canvas — drives the scrub */}
      <div ref={scrollContainerRef} style={{ height: "520vh" }}>
        {/* Sticky viewport */}
        <div
          ref={stickyRef}
          className="bg-background"
          style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden" }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

          {/* ── LAYER 1: Map ── */}
          <div
            ref={mapWrapRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "center center",
              willChange: "transform, opacity",
              zIndex: 1,
            }}
          >
            <svg
              viewBox={CG_VIEWBOX}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ width: "min(58vw, 420px)", height: "auto" }}
            >
              <defs>
                <filter id="cg-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="cg-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
                </radialGradient>
              </defs>
              <path
                d={CG_PATH}
                fill="url(#cg-grad)"
                stroke="hsl(var(--primary))"
                strokeWidth="1.6"
                strokeLinejoin="round"
                filter="url(#cg-glow)"
              />
              <path
                d={CG_PATH}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.6"
                strokeDasharray="5 8"
                strokeLinejoin="round"
                opacity="0.28"
              />
              <circle
                ref={pulseRef}
                cx="400"
                cy="400"
                r="38"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.2"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* ── LAYER 2: Hero headline ── */}
          <div
            ref={heroContentRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              pointerEvents: "none",
              textAlign: "center",
              padding: "0 1.5rem",
            }}
          >
            <div
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-primary bg-primary/10 rounded-full"
              style={{ pointerEvents: "auto" }}
            >
              DISCOVER BASTAR
            </div>
            <h2
              className="text-foreground font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
                marginBottom: "1.25rem",
                maxWidth: "680px",
              }}
            >
              Experience the Untamed <br />
              <span className="text-primary">Beauty of Bastar</span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed"
              style={{
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                maxWidth: "540px",
                marginBottom: "2.5rem",
              }}
            >
              Bastar is a land of secrets, where nature whispers ancient tales through its lush
              forests and majestic waterfalls. Immerse yourself in the vibrant culture, explore
              hidden caves, and witness the artistic brilliance of Dhokra art.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "38px",
                  background: "linear-gradient(to bottom, hsl(var(--primary)), transparent)",
                  animation: "cgPulse 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* ── LAYER 3: Tourism grid ── */}
          <div
            ref={gridSectionRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* Header */}
            <div className="text-center flex-shrink-0" style={{ padding: "2rem 1rem 1rem" }}>
              <div className="inline-block px-4 py-1.5 mb-3 text-sm font-medium tracking-wider text-primary bg-primary/10 rounded-full">
                DISCOVER CHHATTISGARH
              </div>
              <h2
                className="text-foreground font-bold leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
              >
                Experience the Untamed <span className="text-primary">Beauty of Bastar</span>
              </h2>
            </div>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]"
              style={{
                gap: "12px",
                padding: "12px",
                flex: "0 0 auto",
              }}
            >
              {TOURISM_IMAGES.map((image, index) => {
                const rowSpanClass = `row-span-${image.rowSpan || 1}`;
                const colSpanClass =
                  image.colSpan && image.colSpan > 1 ? `lg:col-span-${image.colSpan}` : "";

                return (
                  <div
                    key={`${image.src}-${index}`}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`group relative overflow-hidden rounded-xl shadow-md ${rowSpanClass} ${colSpanClass}`}
                    style={{
                      opacity: 0,
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300 line-clamp-2">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center flex-shrink-0" style={{ padding: "1.5rem 1rem 2rem" }}>
              <Button size="lg" className="group">
                Explore All Destinations
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cgPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1);   }
          50%       { opacity: 1;   transform: scaleY(1.2); }
        }
      `}</style>
    </>
  );
}
