export interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  highlight?: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  link?: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
