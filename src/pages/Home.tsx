// src/pages/Home.tsx

// First, import all the components that make up the home page
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Cta } from "../components/Cta";
import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { Newsletter } from "../components/Newsletter";
import { Pricing } from "../components/Pricing";
import { Services } from "../components/Services";
import { Sponsors } from "../components/Sponsors";
import { Team } from "../components/Team";
import { Testimonials } from "../components/Testimonials";
import { ScrollToTop } from "../components/ScrollToTop";
import { AuroraBackground } from "../components/AuroraBackground"; // Import the background

// This is the Home page component
const Home = () => {
  return (
    <>
      {/* The background should be part of the Home page now */}
      <AuroraBackground />

      {/* The z-10 container is also part of the Home page */}
      <div className="relative z-10">
        <Hero />
        <Sponsors />
        <About />
        <HowItWorks />
        <Features />
        <Services />
        <Cta />
        <Testimonials />
        <Team />
        <Pricing />
        <Newsletter />
        <FAQ />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Home; // This line makes the file a valid module