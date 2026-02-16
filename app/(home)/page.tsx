import HeroSection from "./_components/hero-section";
import Countdown from "./_components/countdown";
import RouteMap from "./_components/routemap";

export default function Home() {
  return (
    <div className="relative bg-black">
      <HeroSection />
      <Countdown />
      <RouteMap />
    </div>
  );
}
