'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] sm:min-h-[90vh] flex items-center justify-center pt-6 sm:pt-8 overflow-hidden bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 text-balance leading-tight sm:leading-tight">
              <span className="text-primary">Kelajak shu yergan boshlanadi</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-balance px-2 sm:px-0">
              Biz yoshlarning karyerasini qo'llab-quvvatlash uchun barcha zarur vositalarni taqdim etamiz.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Button 
                size="lg" 
                className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/jobs">
                  <Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Ishlarni ko'rish
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold border-border hover:bg-secondary/50 transition-all w-full sm:w-auto"
                asChild
              >
                <Link href="/startups">
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Startaplar
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
