'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
              <span className="text-primary">Kelajak shu yerda</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
              Talabalar va startaplar uchun professional ekotizim. 
              O'z yo'lingizni biz bilan birga quring va yuksak natijalarga erishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-12 text-base font-semibold transition-all shadow-md hover:shadow-lg"
                asChild
              >
                <Link href="/jobs">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Ishlarni ko'rish
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 h-12 text-base font-semibold border-border hover:bg-secondary/50 transition-all"
                asChild
              >
                <Link href="/startups">
                  <Rocket className="mr-2 h-5 w-5 text-primary" />
                  Startaplar
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Simple Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 pt-10 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Talabalar', value: '10,000+' },
              { label: 'Ish o\'rinlari', value: '500+' },
              { label: 'Startaplar', value: '120+' },
              { label: 'Hamkorlar', value: '45+' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
