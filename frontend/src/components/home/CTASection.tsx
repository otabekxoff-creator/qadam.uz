'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';
import { useState, useEffect } from 'react';

// =============================================
// CTA Section Component
// =============================================

export function CTASection() {
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 400; // CTA section uchun keyinroq
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Agar user kirgan bo'lsa, CTA sectionni ko'rsatmaymiz
  if (user) {
    return null;
  }
  return (
    <section className={`py-12 sm:py-16 relative overflow-hidden bg-primary transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
      
      <div className="container relative mx-auto px-3 sm:px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white/10 px-3 sm:px-4 py-1.5 mb-6 sm:mb-8 border border-white/10"
          >
            <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
            <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">
              Hoziroq boshlang
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight px-2 sm:px-0"
          >
            Nima uchun Step.uz?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed text-balance px-4 sm:px-0"
          >
            O'zbekistonning eng yirik talabalar va startaplar platformasi. 
            Karyerangizni biz bilan birga quring va yuksak natijalarga erishing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
          >
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/95 rounded-full px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg transition-all active:scale-95 w-full sm:w-auto"
              asChild
            >
              <Link href="/register">
                Bepul ro'yxatdan o'ting
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/about">
                Ko'proq bilish
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
