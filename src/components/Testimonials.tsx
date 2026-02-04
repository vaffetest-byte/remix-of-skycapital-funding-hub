import { Star, Quote } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote: "SkyCapital funded our expansion in just 48 hours. Their team was professional, transparent, and made the entire process seamless. Highly recommend!",
    author: "Marcus Johnson",
    role: "CEO",
    company: "Johnson's Auto Repair",
    rating: 5
  },
  {
    quote: "After being turned down by banks, SkyCapital approved us within 24 hours. The working capital helped us take on bigger contracts and grow 40% this year.",
    author: "Sarah Chen",
    role: "Owner",
    company: "Chen Logistics LLC",
    rating: 5
  },
  {
    quote: "The revenue-based financing option was perfect for our seasonal business. Payments adjust with our income, so there's never any cash flow stress.",
    author: "David Martinez",
    role: "Founder",
    company: "Coastal Dining Group",
    rating: 5
  }
];

const Testimonials = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="testimonials" className="py-24 gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-accent">Thousands</span> of Businesses
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            See why business owners across America choose SkyCapital for their funding needs.
          </p>
        </div>

        {/* Testimonials grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className={`group glass rounded-2xl p-8 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 scroll-reveal-scale stagger-${index + 1} ${gridVisible ? 'visible' : ''}`}
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-border/50 pt-4">
                <div className="font-bold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
