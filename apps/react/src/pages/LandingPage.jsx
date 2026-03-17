import Hero from "../components/sections/Hero";
import FeatureSection from "../components/sections/FeatureSection";
import CTASection from "../components/sections/CTASection";
import { useAuth } from "../context/authContext";

export default function Home() {
  
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Hero navigateTo={isAuthenticated ? "dashboard" : "auth?mode=signup"} />
      <FeatureSection />
      <CTASection
        navigateTo={isAuthenticated ? "dashboard" : "auth?mode=signup"}
      />
    </>
  );
}
