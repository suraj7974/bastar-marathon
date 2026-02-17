import HeroSection from "./_components/hero-section";
import Countdown from "./_components/countdown";
import RouteMap from "./_components/routemap";
import Explore from "./_components/explore";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Countdown />
      <RouteMap />
      <Explore />
    </div>
  );
}
