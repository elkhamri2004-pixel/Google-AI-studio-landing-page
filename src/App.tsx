import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Header, 
  Hero,
  ProblemSection,
  WhyUs, 
  Portfolio, 
  Testimonials, 
  Pricing, 
  FAQSection, 
  Contact, 
  Footer
} from './components/LandingPage';
import { handleWhatsAppRedirect } from './lib/utils';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white selection:bg-brand-primary/20 selection:text-brand-primary">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      
      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/447000000000" 
          onClick={(e) => { e.preventDefault(); handleWhatsAppRedirect("Hi! I just saw your website and I'd like to get a free audit for my business."); }}
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
