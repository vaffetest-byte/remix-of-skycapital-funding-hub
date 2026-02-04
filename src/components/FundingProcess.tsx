import { FileEdit, CheckCircle2, Wallet } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: FileEdit,
    step: "01",
    title: "Apply Online",
    description: "Complete our simple 5-minute application for business funding. No paperwork hassles."
  },
  {
    icon: CheckCircle2,
    step: "02",
    title: "Get Approved",
    description: "Receive multiple funding offers tailored to your business. 95% approval rate."
  },
  {
    icon: Wallet,
    step: "03",
    title: "Receive Funds",
    description: "Get funded in 24-48 hours directly to your account. Fast business funding nationwide."
  }
];

const FundingProcess = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="process" 
      className="py-24 bg-background relative overflow-hidden"
      aria-label="How to Get Business Funding"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Section header - SEO optimized */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-semibold mb-4">
            Fast Approval Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Fast Business Funding in 3 Easy Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined <strong>fast approval business funding</strong> process gets your business 
            from application to funding faster than traditional banks.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className={`hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ${stepsVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'left' }} aria-hidden="true" />

          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`relative group scroll-reveal stagger-${index + 1} ${stepsVisible ? 'visible' : ''}`}
            >
              {/* Step card */}
              <div className="text-center">
                {/* Icon with step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-accent-foreground shadow-accent">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4" aria-hidden="true">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-secondary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingProcess;