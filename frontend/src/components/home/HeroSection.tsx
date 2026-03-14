'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Rocket, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// =============================================
// Hero Section Component
// =============================================

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-teal-50 to-white dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={{ rotateX: -6, rotateY: 6, translateZ: 24 }}
          className="relative mx-auto max-w-5xl rounded-3xl border border-emerald-100/60 bg-white/70 px-6 py-12 shadow-[0_32px_120px_rgba(16,185,129,0.25)] backdrop-blur-xl dark:border-emerald-900/60 dark:bg-emerald-950/60"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-[28px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.6),transparent,rgba(45,212,191,0.7),transparent,rgba(56,189,248,0.8),transparent)] opacity-60 blur-3xl" />

          <div className="flex flex-col items-center text-center space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>O'zbekiston yoshlari uchun platforma</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Kelajaginga qadam qo'y
            </span>
            <br />
            <span className="text-foreground">bilan birga</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Step.uz — talabalar, bitiruvchilar va yosh professionallar uchun yagona platforma. 
            Ish toping, startap yarating, karyeringizni rivojlantiring.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              asChild
            >
              <Link href="/jobs">
                <Briefcase className="mr-2 h-5 w-5" />
                Ishlarni ko'rish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/startups">
                <Rocket className="mr-2 h-5 w-5" />
                Startaplar
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
            style={{ transform: 'translateZ(32px)' }}
          >
            {[
              { value: '500+', label: 'Faol ish e\'lonlari' },
              { value: '120+', label: 'Kompaniyalar' },
              { value: '10K+', label: 'Talabalar' },
              { value: '50+', label: 'Startaplar' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
