// استورد المكونات الجديدة هنا
import { Background } from "./components/background";
import { DotPattern } from "./components/dot-pattern";

// باقي الاستيرادات تبقى كما هي
import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import "./App.css";

function App() {
  return (
    <>
      {/* ضع مكونات الخلفية هنا في الأعلى */}
      <Background />
      {/* تم تفعيل هذا المكون الآن للحصول على التأثير الكامل */}
      <DotPattern />
      
      {/* المحتوى الرئيسي للموقع */}
      {/* أضفنا `relative z-10` للتأكد من أن المحتوى يظهر فوق الخلفية */}
      <div className="relative z-10">
        <Navbar />
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
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;