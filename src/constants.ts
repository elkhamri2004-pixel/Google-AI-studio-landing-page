import { PricingPackage, Testimonial, PortfolioItem, FAQItem } from "./types";

export const AGENCY_NAME = "NovaSite Studio";
export const AGENCY_TAGLINE = "High-Converting Websites for Local UK Businesses";

export const HERO_COPY = {
  title: "We Build Websites That Actually Get You More Clients.",
  subtitle: "Stop wasting money on 'pretty' websites that don't convert. We build high-performance landing pages for UK local businesses that turn visitors into paying customers.",
  cta: "Get My Free Conversion Audit",
  secondaryCta: "Chat on WhatsApp",
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    name: "The Landing Page Sprint",
    price: "£797",
    description: "Perfect for testing a new offer or starting small. A high-converting single page built for speed.",
    features: [
      "1 High-Converting Landing Page",
      "Mobile & Tablet Optimized",
      "Basic SEO Setup",
      "Lead Capture Form",
      "Fast 48-Hour Delivery",
    ],
    cta: "Start for £797",
  },
  {
    name: "The Growth Engine",
    price: "£1,497",
    description: "Our most popular choice. A full custom website designed to dominate your local market.",
    features: [
      "5 Custom Designed Pages",
      "Advanced Local SEO Strategy",
      "Lead Capture & CRM Integration",
      "Google Maps Optimization",
      "1 Month Post-Launch Support",
      "Premium Speed Optimization",
    ],
    isPopular: true,
    cta: "Get Started Now",
  },
  {
    name: "The Authority Suite",
    price: "£3,497",
    description: "For established businesses ready to scale. Full branding and advanced functionality.",
    features: [
      "Unlimited Pages",
      "Full Brand Identity Design",
      "E-commerce or Booking System",
      "Content Strategy & Copywriting",
      "Priority 24/7 Support",
      "Monthly Performance Reports",
    ],
    cta: "Scale Your Business",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Hunter Peterson",
    role: "Voice Actor + Content Specialist at Nucleus",
    highlight: "Got us lots of leads.",
    content: "Studio for my professional voice acting website was so easy that I got a second site for my content business. It's been a great boost to our business and got us lots of leads.",
    avatar: "https://i.pravatar.cc/150?u=hunter",
  },
  {
    name: "Bailey Coe",
    role: "Founder, Bailey Sports Marketing",
    highlight: "Converts better than ever.",
    content: "messaging, and delivered a clean site that feels professional and converts better. Since launch, I've had more qualified inquiries and a much easier time explaining what I offer.",
    avatar: "https://i.pravatar.cc/150?u=bailey",
  },
  {
    name: "Anthony",
    role: "Founder, Anthony A Media",
    highlight: "Far better than I hoped for.",
    content: "My website turned out far better than I could have ever hoped for. I will gladly come back to him for updates in the future.",
    avatar: "https://i.pravatar.cc/150?u=anthony",
  },
  {
    name: "Sarah Thompson",
    role: "Founder, GreenLeaf Dental",
    highlight: "Flawless and stunningly quick.",
    content: "His thoughtful engagement during the design of my website made the process feel like a truly creative collaboration. In the time after my site launched, his support has been flawless and stunningly quick.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "David Miller",
    role: "Director, Miller & Co Law",
    highlight: "Remarkable transformation.",
    content: "Seb took my outdated website and transformed it into something remarkable. Not only did he significantly enhance its speed and appearance, but he also handled all the technical aspects seamlessly.",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "James Wilson",
    role: "Owner, Wilson Plumbing & Heating",
    highlight: "Results are always top-tier.",
    content: "I've now had Sebastian work on several projects and the results are always top-tier. He really understands the local market.",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "The Rustic Table",
    category: "Restaurant & Hospitality",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    title: "BrightSmile Dental",
    category: "Medical & Healthcare",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    title: "Elite Homes",
    category: "Construction & Renovation",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    title: "City Wellness Clinic",
    category: "Medical & Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    title: "Azure Bay Resort",
    category: "Luxury Hotel & Spa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&h=600",
  },
];

export const FAQ: FAQItem[] = [
  {
    question: "How long does it take to build my website?",
    answer: "Our Starter package takes just 48 hours. Most custom websites are completed within 2-3 weeks depending on complexity.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer: "Absolutely. Every site we build is 'Mobile-First', meaning it's designed to look and function perfectly on smartphones where most of your traffic comes from.",
  },
  {
    question: "Do I need to provide the text and images?",
    answer: "We can help with both! Our Premium package includes full copywriting. For other packages, we provide templates and guidance to make it easy for you.",
  },
  {
    question: "What happens after the site is launched?",
    answer: "We don't just disappear. We offer ongoing support and maintenance to ensure your site stays fast, secure, and continues to convert.",
  },
];

export const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];
