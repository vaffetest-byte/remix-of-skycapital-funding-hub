import { Shield, Award, Lock, Star, CheckCircle2, Sparkles } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const TrustBadges = () => {
  const { ref: badgesRef, isVisible: badgesVisible } = useScrollAnimation();
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation();

  const trustIndicators = [
    { icon: Shield, label: "Trusted Partner", description: "5+ Years Experience", color: "from-blue-500 to-blue-600" },
    { icon: CheckCircle2, label: "Fast Approval", description: "24-48 Hours", color: "from-emerald-500 to-emerald-600" },
    { icon: Lock, label: "Data Protected", description: "100% Secure", color: "from-indigo-500 to-indigo-600" },
    { icon: Award, label: "Top Rated", description: "4.9/5 Stars", color: "from-amber-500 to-amber-600" },
  ];

  const partners = [
    "Chase",
    "Bank of America", 
    "Wells Fargo",
    "Capital One",
    "American Express",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 scroll-reveal ${badgesVisible ? 'visible' : ''}`} ref={badgesRef}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            Why Trust Us
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Security & Credibility You Can Always Rely On
          </h2>
        </div>

        {/* Trust Badges */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {trustIndicators.map((item, index) => (
            <div 
              key={item.label}
              className={`group relative bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden scroll-reveal-scale stagger-${index + 1} ${badgesVisible ? 'visible' : ''}`}
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              
              {/* Content */}
              <h4 className="font-bold text-foreground text-center text-sm md:text-base mb-1">{item.label}</h4>
              <p className="text-xs md:text-sm text-muted-foreground text-center">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Trusted Banking Partners
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Partner Logos */}
        <div 
          ref={logosRef}
          className={`scroll-reveal ${logosVisible ? 'visible' : ''}`}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16">
            {partners.map((partner, index) => (
              <div 
                key={partner}
                className={`relative group scroll-reveal stagger-${index + 1} ${logosVisible ? 'visible' : ''}`}
              >
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground/30 group-hover:text-primary/60 transition-all duration-300 tracking-tight">
                  {partner}
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className={`mt-14 scroll-reveal stagger-3 ${logosVisible ? 'visible' : ''}`}>
          <div className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-2xl p-6 md:p-8 shadow-elevated overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 fill-accent text-accent" />
                <span className="text-lg md:text-xl font-bold">10,000+ Businesses Funded</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/30" />
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 fill-accent text-accent" />
                <span className="text-lg md:text-xl font-bold">$200M+ in Capital Deployed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
