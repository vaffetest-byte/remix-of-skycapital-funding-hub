import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ProductsGrid from "@/components/ProductsGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import FundingProcess from "@/components/FundingProcess";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Fast Business Funding Nationwide | MCA & Working Capital Loans | SkyCapital"
        description="SkyCapital provides fast business funding nationwide across all 50 states. Get MCA, working capital loans & small business loans with 95% approval. Same-day approval, funding in 24-48 hours."
        canonicalUrl="https://skycapnow.com/"
        ogImage="https://skycapnow.com/og-image.jpg"
      />
      <Navbar />
      <Hero />
      <TrustBadges />
      <section id="products">
        <ProductsGrid />
      </section>
      <section id="why-us">
        <WhyChooseUs />
      </section>
      <section id="process">
        <FundingProcess />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <Footer />
    </main>
  );
};

export default Index;
