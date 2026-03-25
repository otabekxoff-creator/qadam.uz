'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroTitle = "Kelajak shu yerda boshlanadi";
const heroDescription = "Biz yoshlarning karyerasini qo'llab-quvvatlash uchun barcha zarur vositalarni taqdim etamiz.";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [text, delay]);

  return (
    <span className="relative">
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export function HeroSection() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), heroTitle.length * 50 + 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] sm:min-h-[90vh] flex items-center justify-center pt-6 sm:pt-8 overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 text-balance leading-tight sm:leading-tight min-h-[1.2em]">
              <TypewriterText text={heroTitle} delay={300} />
            </h1>
          </motion.div>

          {/* Animated Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance px-2 sm:px-0">
              <TypewriterText text={heroDescription} delay={heroTitle.length * 50 + 600} />
            </p>
          </motion.div>

          {/* Animated Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {showButtons && (
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all shadow-md hover:shadow-lg w-full sm:w-auto bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-500 border-0"
                    asChild
                  >
                    <Link href="/jobs">
                      <Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Ishlarni ko'rish
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold border-2 border-primary/30 hover:border-primary bg-background/50 backdrop-blur-sm hover:bg-secondary/50 transition-all w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/startups">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.span>
                      Startaplar
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-muted-foreground font-medium">Pastga suring</span>
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-3 bg-primary rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
