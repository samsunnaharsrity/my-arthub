import Image from "next/image";
import HeroSection from "./components/shared/hero";
import PricingPage from "./pricing/page";


export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <PricingPage></PricingPage>
    </div>
  );
}
