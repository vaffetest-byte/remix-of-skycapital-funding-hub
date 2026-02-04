import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Phone, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] gradient-hero overflow-hidden" aria-label="Business Funding New York and Florida Hero Section">
      {/* Background decorative elements - optimized for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float will-change-transform" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative z-10 px-4 md:px-8 pt-40 pb-32">
        {/* Trust badge with location */}
        <div className="flex justify-center items-center mb-8 animate-fade-up">
          <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/90">Trusted by 10,000+ Businesses Nationwide</span>
          </div>
        </div>

        {/* SEO-Optimized H1 - Primary keyword: Business Funding New York Florida */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white max-w-5xl mx-auto leading-tight animate-fade-up-delay-1">
          Get the Capital You Need to{" "}
          <span className="text-accent">Grow Your Business</span>
        </h1>

        {/* SEO Subtitle with keywords: MCA, working capital, small business loans */}
        <p className="mt-6 text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto animate-fade-up-delay-2">
          Your trusted nationwide partner for <strong>MCA funding</strong>, <strong>working capital loans</strong>, and <strong>small business loans</strong>. 
          Get <strong>fast approval</strong> and funding in as little as 24 hours with a 95% approval rate.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-up-delay-3">
          <Button variant="hero" size="xl" asChild>
            <a 
              href="https://forms.zohopublic.com/skycapnow1/form/BusinessApplication/formperma/k4ySefBCGaIjXzTbs58TKi9KHTcjBurx7BVBYrs0buI" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Apply now for fast business funding"
            >
              Get Funded Today
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <a href="tel:5165230489" aria-label="Call SkyCapital advisor for business funding">
              <Phone className="w-5 h-5" aria-hidden="true" />
              Speak to a SkyCapital Advisor
            </a>
          </Button>
        </div>

        {/* Stats with SEO keywords */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-up-delay-3">
          {[
            { value: "$200M+", label: "Funded Nationwide" },
            { value: "24hrs", label: "Fast Approval Funding" },
            { value: "95%", label: "Business Loan Approval Rate" },
            { value: "10K+", label: "Happy Clients Served" },
          ].map((stat, index) => (
            <div key={index} className="text-center glass-dark rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 40% 98%)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;