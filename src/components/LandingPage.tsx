import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  MessageCircle, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Users, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Globe,
  Search,
  Layout as LayoutIcon,
  Check,
  AlertCircle,
  TrendingUp,
  MousePointer2,
  Smartphone
} from 'lucide-react';
import { 
  AGENCY_NAME, 
  HERO_COPY, 
  PRICING_PACKAGES, 
  TESTIMONIALS, 
  PORTFOLIO, 
  FAQ, 
  LEGAL_LINKS 
} from '../constants';
import { handleScroll, handleWhatsAppRedirect } from '../lib/utils';
import { Hero as AnimatedHero } from './ui/animated-hero';
import { AuroraBackground } from './ui/aurora-background';
import { ContainerScroll } from './ui/container-scroll-animation';

// --- Logo Component ---
export const Logo = ({ className = "", isScrolled = false }: { className?: string, isScrolled?: boolean }) => (
  <a 
    href="#top" 
    onClick={(e) => { e.preventDefault(); handleScroll('top'); }}
    className={`flex items-center gap-3 hover:opacity-90 transition-all duration-300 ${
    isScrolled ? 'scale-90' : 'scale-100'
  } ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl opacity-20 rotate-6"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl opacity-10 -rotate-6"></div>
      <div className="relative w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-xl tracking-tighter">NS</span>
      </div>
    </div>
    <span className={`font-bold tracking-tight text-brand-dark transition-all duration-300 ${
      isScrolled ? 'text-lg' : 'text-xl'
    }`}>{AGENCY_NAME}</span>
  </a>
);

// --- Header ---
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm py-1' 
        : 'bg-white/50 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-12' : 'h-16 sm:h-20'
        }`}>
          <Logo isScrolled={isScrolled} />
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#why-us" onClick={(e) => { e.preventDefault(); handleScroll('why-us'); }} className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors">Why Us</a>
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleScroll('portfolio'); }} className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors">Our Work</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); }} className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors">Pricing</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('contact'); }} className={`bg-brand-primary text-white rounded-full text-sm font-semibold hover:bg-brand-dark transition-all shadow-sm ${
              isScrolled ? 'px-4 py-1.5' : 'px-5 py-2.5'
            }`}>
              Get Free Audit
            </a>
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-4"
          >
            <a href="#why-us" className="block text-lg font-medium text-brand-dark" onClick={(e) => { e.preventDefault(); handleScroll('why-us'); setIsOpen(false); }}>Why Us</a>
            <a href="#portfolio" className="block text-lg font-medium text-brand-dark" onClick={(e) => { e.preventDefault(); handleScroll('portfolio'); setIsOpen(false); }}>Our Work</a>
            <a href="#pricing" className="block text-lg font-medium text-brand-dark" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); setIsOpen(false); }}>Pricing</a>
            <a href="#contact" className="block w-full text-center bg-brand-primary text-white py-3 rounded-xl font-semibold" onClick={(e) => { e.preventDefault(); handleScroll('contact'); setIsOpen(false); }}>
              Get Free Audit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero ---
export const Hero = () => {
  return (
    <div id="hero">
      <AuroraBackground className="h-auto min-h-screen pt-20">
        <AnimatedHero />
      </AuroraBackground>
    </div>
  );
};

// --- Problem Section ---
export const ProblemSection = () => {
  const problems = [
    {
      title: "Zero Traffic",
      description: "You have a website, but nobody is visiting it. You're invisible to local customers.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "High Bounce Rate",
      description: "Visitors leave within seconds because your site is slow, ugly, or confusing.",
      icon: <MousePointer2 className="w-6 h-6" />
    },
    {
      title: "No Leads",
      description: "People visit, but they don't call or email. Your site isn't built to sell.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-brand-dark text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Most Local Websites Are Just <span className="text-brand-secondary">Expensive Business Cards.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              If your website isn't bringing you new clients every single week, it's failing you. Most agencies focus on "pretty" designs. We focus on your bottom line.
            </p>
            <div className="space-y-6">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center shrink-0 text-brand-primary">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary rounded-[3rem] rotate-3 opacity-20 blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
              alt="Frustrated business owner" 
              className="relative rounded-[3rem] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Animated Number ---
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

// --- Why Us / Solution ---
export const WhyUs = () => {
  const stats = [
    { label: "Projects Completed", value: 120, suffix: "+" },
    { label: "Happy Clients", value: 85, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Conversion Rate", value: 25, suffix: "%" },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-brand-primary" />,
      title: "Built for Speed",
      description: "Slow sites kill conversions. We build lightning-fast pages that keep visitors engaged."
    },
    {
      icon: <Search className="w-6 h-6 text-brand-primary" />,
      title: "Local SEO Ready",
      description: "Don't just exist online. Dominate your local area and show up when clients search for you."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-brand-primary" />,
      title: "Mobile-First Design",
      description: "80% of local traffic is mobile. We ensure your site looks flawless on every device."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-primary" />,
      title: "Conversion Focused",
      description: "Every pixel is designed with one goal: turning a visitor into a lead or a sale."
    }
  ];

  return (
    <section id="why-us" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">The NovaSite Difference</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just build websites. We build sales engines that work for you 24/7.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-[2.5rem] bg-brand-light/20 border border-gray-50"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/5 transition-all"
            >
              <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                  Experience the <br />
                  <span className="text-4xl md:text-7xl font-bold text-brand-primary mt-1 leading-none">
                    NovaSite Impact
                  </span>
                </h2>
              </>
            }
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&h=1365"
              alt="hero"
              className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
};

// --- Portfolio ---
export const Portfolio = () => {
  const categories = ["All", ...Array.from(new Set(PORTFOLIO.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolio = activeCategory === "All" 
    ? PORTFOLIO 
    : PORTFOLIO.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Our Recent Work</h2>
            <p className="text-lg text-gray-600">Proof that our conversion-first approach works.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, i) => (
              <motion.div 
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`group relative rounded-[2rem] overflow-hidden bg-white shadow-sm border transition-all hover:shadow-2xl hover:shadow-brand-primary/10 ${
                  item.featured 
                    ? 'border-brand-primary ring-4 ring-brand-primary/5 shadow-xl shadow-brand-primary/10' 
                    : 'border-gray-100'
                }`}
              >
                {item.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Featured Project
                  </div>
                )}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">{item.category}</span>
                  <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// --- Testimonials ---
export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-bold text-brand-dark mb-6">Trusted by UK Business Owners</h2>
          <p className="text-xl text-gray-500">We help businesses like yours grow every day.</p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel Area */}
          <div className="relative h-[450px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-brand-primary/5 text-center">
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="mb-10">
                    {current.highlight && (
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6 leading-tight italic">
                        "{current.highlight}"
                      </h3>
                    )}
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      {current.content}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <img 
                      src={current.avatar || `https://i.pravatar.cc/150?u=${current.name}`} 
                      alt={current.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-brand-light shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-brand-dark leading-tight">{current.name}</h4>
                      <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mt-1">{current.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button 
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Indicators */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Pricing ---
export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No hidden fees. No monthly retainers. Just high-quality results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PRICING_PACKAGES.map((pkg, i) => (
            <div 
              key={i}
              className={`p-8 md:p-10 rounded-[2.5rem] border transition-all ${
                pkg.isPopular 
                  ? 'bg-brand-primary border-brand-accent scale-105 shadow-2xl shadow-brand-primary/20 z-10' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              {pkg.isPopular && (
                <span className="inline-block px-4 py-1 rounded-full bg-white text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl md:text-5xl font-bold">{pkg.price}</span>
                <span className="text-gray-400">one-time</span>
              </div>
              <p className={`mb-8 leading-relaxed ${pkg.isPopular ? 'text-brand-light' : 'text-gray-400'}`}>
                {pkg.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${pkg.isPopular ? 'text-white' : 'text-brand-secondary'}`} />
                    <span className={pkg.isPopular ? 'text-brand-light' : 'text-gray-300'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleScroll('contact'); }}
                className={`block w-full text-center py-4 rounded-2xl font-bold transition-all ${
                  pkg.isPopular
                    ? 'bg-white text-brand-primary hover:bg-brand-light'
                    : 'bg-brand-primary text-white hover:bg-brand-accent'
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FAQ ---
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-gray-900">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Form ---
export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    whatsapp: '',
    hasWebsite: 'no'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.whatsapp) {
      console.log("Validation failed: Missing required fields");
      return;
    }

    setStatus('success');
    console.log("Form submitted successfully:", formData);
    
    // Prefilled WhatsApp message
    const message = `Hi NovaSite! I'm ${formData.name} from ${formData.businessName}. I'm interested in your website design service. My email is ${formData.email} and my current website status is: ${formData.hasWebsite === 'yes' ? 'I already have one' : 'I need a new one'}. Let's chat!`;
    
    // Redirect after a short delay
    setTimeout(() => {
      handleWhatsAppRedirect(message);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-brand-primary relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-dark rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to Get More Clients?</h2>
            <p className="text-xl text-brand-light mb-12 leading-relaxed">
              Fill out the form to request your free conversion audit. We'll analyze your current site (or plan) and show you exactly how to increase your leads.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">Free Conversion Audit (£197 Value)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">Direct Access via WhatsApp</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">No-Obligation Strategy Call</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Request Received!</h3>
                <p className="text-gray-600 mb-8">Redirecting you to WhatsApp to start your audit...</p>
                <div className="animate-pulse text-brand-primary font-bold">Please wait...</div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Business Name</label>
                    <input 
                      required 
                      type="text" 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Doe's Plumbing" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all" 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">WhatsApp Number</label>
                    <input 
                      required 
                      type="tel" 
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+44 7000 000000" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Do you already have a website?</label>
                  <select 
                    name="hasWebsite"
                    value={formData.hasWebsite}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all appearance-none"
                  >
                    <option value="no">No, I need a new one</option>
                    <option value="yes">Yes, but it's not converting</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'success'}
                  className={`w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                    status === 'success' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-dark hover:shadow-brand-primary/10'
                  }`}
                >
                  Claim My Free Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-gray-400">
                  By submitting, you agree to be contacted via WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-600 max-w-sm mb-8 leading-relaxed">
              Helping local UK businesses dominate their market with high-converting websites and landing pages.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/447000000000" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-dark mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#why-us" onClick={(e) => { e.preventDefault(); handleScroll('why-us'); }} className="text-gray-600 hover:text-brand-primary transition-colors">Why Us</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleScroll('portfolio'); }} className="text-gray-600 hover:text-brand-primary transition-colors">Portfolio</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); }} className="text-gray-600 hover:text-brand-primary transition-colors">Pricing</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('contact'); }} className="text-gray-600 hover:text-brand-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-dark mb-6">Legal</h4>
            <ul className="space-y-4">
              {LEGAL_LINKS.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-600 hover:text-brand-primary transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {AGENCY_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Built with <Star className="w-3 h-3 fill-current" /> in the UK
          </p>
        </div>
      </div>
    </footer>
  );
};
