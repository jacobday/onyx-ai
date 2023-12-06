import { LandingHero } from "@/components/landing/Hero/landing-hero";
import { LandingNavbar } from "@/components/landing/Navbar/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;
