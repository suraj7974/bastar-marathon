import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
        <Image
          src="/images/landingpage.jpeg"
          alt="Bastar Marathon Landscape"
          fill
          priority
          className="object-cover object-center scale-105"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Bastar Marathon Logo"
            width={60}
            height={60}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          <div className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-white/90 drop-shadow-md">
            Bastar Marathon
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-8 relative z-10 pt-20">
        <div className="max-w-6xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <h1 className="flex flex-col items-center leading-none select-none">
            <span className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
              BASTAR
            </span>
            <span className="text-[8vw] sm:text-[6vw] md:text-[5rem] lg:text-[7rem] font-bold tracking-[0.2em] text-white/90 -mt-2 sm:-mt-4 md:-mt-8 uppercase drop-shadow-lg">
              MARATHON
            </span>
          </h1>

          <div className="mt-12 sm:mt-16 md:mt-20 group">
            <Button
              asChild
              size="lg"
              className="relative h-16 sm:h-20 px-12 sm:px-16 text-xl sm:text-2xl font-bold rounded-full bg-white text-black transition-all duration-300 border-2 border-transparent hover:bg-white"
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
                  className="w-6 h-6 sm:w-8 sm:h-8 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
