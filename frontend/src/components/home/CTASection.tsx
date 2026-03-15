'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';

// =============================================
// CTA Section Component
// =============================================

export function CTASection() {
  const { user } = useAuthStore();

  // Agar user kirgan bo'lsa, CTA sectionni ko'rsatmaymiz
  if (user) {
    return null;
  }
  return (
    <section className="py-16 relative overflow-hidden bg-primary">
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 mb-8 border border-white/10"
          >
            <Sparkles className="mr-2 h-4 w-4 text-white/80" />
            <span className="text-sm text-white/90 font-medium tracking-wide">
              Hoziroq boshlang
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white mb-6 md:text-5xl tracking-tight"
          >
            Karyerangizni bugun boshlang
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Minglab yosh professionallar qatori orasiga qo'shiling va 
            O'zbekistondagi eng yaxshi imkoniyatlarga ega bo'ling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/95 rounded-full px-10 h-12 text-base font-bold shadow-lg transition-all active:scale-95"
              asChild
            >
              <Link href="/register">
                Bepul ro'yxatdan o'ting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-12 text-base font-semibold transition-all"
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
