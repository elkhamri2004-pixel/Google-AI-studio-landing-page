"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuroraBackground } from "@/src/components/ui/aurora-background";
import { Button } from "@/src/components/ui/button";

export function InitialPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] shadow-2xl bg-white"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <AuroraBackground className="h-[500px] md:h-[600px]">
              {/* Dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/40 z-0" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 px-8 py-12 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                  Why Most Local <br />
                  <span className="text-brand-secondary">Websites Fail</span>
                </h2>
                <p className="text-lg md:text-xl text-white mb-10 max-w-lg mx-auto leading-relaxed drop-shadow-md">
                  Most agencies sell you a "pretty" site. We sell you a business asset that generates revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-brand-primary hover:bg-brand-light font-bold rounded-full px-8 py-6 shadow-lg"
                    asChild
                  >
                    <a href="#contact" onClick={() => setIsOpen(false)}>
                      I Want Results
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10 font-bold rounded-full px-8 py-6 shadow-lg backdrop-blur-sm"
                    asChild
                  >
                    <a href="#services" onClick={() => setIsOpen(false)}>
                      Learn More
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AuroraBackground>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
