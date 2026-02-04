import { LucideIcon, ArrowRight } from "lucide-react";

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  featured?: boolean;
  customLink?: string;
}

const ProductCard = ({ icon: Icon, title, description, delay = 0, featured = false, customLink }: ProductCardProps) => {
  const defaultApplicationUrl = "https://forms.zohopublic.com/skycapnow1/form/BusinessApplication/formperma/k4ySefBCGaIjXzTbs58TKi9KHTcjBurx7BVBYrs0buI";
  const applicationUrl = customLink || defaultApplicationUrl;

  return (
    <a 
      href={applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer block ${
        featured 
          ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-elevated" 
          : "bg-card shadow-soft hover:shadow-elevated border border-border/50"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decorative shape */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${
        featured 
          ? "bg-white/10" 
          : "bg-primary/5 opacity-0 group-hover:opacity-100"
      }`} />
      
      {/* Corner accent shape */}
      <div className={`absolute bottom-0 right-0 w-32 h-32 transition-all duration-500 ${
        featured
          ? "bg-white/5"
          : "bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
      }`} style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

      {/* Icon container */}
      <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
        featured 
          ? "bg-white/20 backdrop-blur-sm" 
          : "bg-gradient-to-br from-primary to-secondary shadow-lg"
      }`}>
        <Icon className={`w-8 h-8 ${featured ? "text-white" : "text-primary-foreground"}`} />
      </div>

      {/* Content */}
      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
        featured ? "text-white" : "text-foreground group-hover:text-primary"
      }`}>
        {title}
      </h3>
      <p className={`leading-relaxed mb-4 ${
        featured ? "text-white/80" : "text-muted-foreground"
      }`}>
        {description}
      </p>

      {/* Learn more link */}
      <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
        featured 
          ? "text-white/90 group-hover:text-white" 
          : "text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
      }`}>
        <span>Apply Now</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </a>
  );
};

export default ProductCard;
