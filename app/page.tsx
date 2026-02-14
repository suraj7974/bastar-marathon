import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
        <Image
          src="/images/landing-bg.png"
          alt="Bastar Marathon Landscape"
          fill
          priority
          className="object-cover opacity-90"
          quality={100}
        />
        {/* Simple darkening overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-0 z-50 p-6 md:p-12">
        <div className="text-xl font-bold tracking-wider uppercase text-white/90">
          Bastar Marathon
        </div>
      </div>

      {/* Main Hero Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-8">
        <div className="max-w-5xl">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight drop-shadow-2xl text-white leading-[1.1] uppercase">
            Bastar
            <span className="block mt-4 sm:mt-6">Marathon</span>
          </h1>

          <div className="pt-10 sm:pt-12">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              <Link href="/registration">REGISTER NOW</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
