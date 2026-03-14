'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Briefcase, Rocket, Users, Sparkles, Globe, Cpu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(mousePosition.y * -20, springConfig);
  const rotateY = useSpring(mousePosition.x * 20, springConfig);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center pt-20"
    >
      {/* Animated Background Grids */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Floating Elements (3D feel) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              scale: [1, 1.2, 1],
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-2 h-2 bg-primary rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Main 3D Card Container */}
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              perspective: 1000,
              transformStyle: 'preserve-3d'
            }}
            className="relative p-8 md:p-16 rounded-[40px] border border-white/10 glass shadow-2xl"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
            
            {/* Content with Z-translation */}
            <div style={{ transform: 'translateZ(50px)' }} className="preserve-3d">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary glow-primary"
              >
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                <span>O'zbekistonning kelajak platformasi</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent text-glow-primary">
                  Step.uz
                </span>
                <br />
                <span className="text-foreground">Kelajak shu yerda</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-10 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl leading-relaxed"
              >
                Talabalar va startaplar uchun innovatsion ekotizim. 
                O'z yo'lingni biz bilan birga qur va yuksaklikka erish.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Button 
                  size="xl" 
                  className="bg-primary text-primary-foreground hover:scale-105 transition-transform glow-primary rounded-full px-10 h-14 text-lg font-bold"
                  asChild
                >
                  <Link href="/jobs">
                    <Briefcase className="mr-2 h-6 w-6" />
                    Ishlarni ko'rish
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="glass border-white/10 hover:bg-white/5 rounded-full px-10 h-14 text-lg font-bold transition-all"
                  asChild
                >
                  <Link href="/startups">
                    <Rocket className="mr-2 h-6 w-6 text-primary" />
                    Startaplar
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Floating Icons for 3D depth */}
            <motion.div 
              style={{ transform: 'translateZ(80px) translateX(-50%)' }}
              className="absolute -top-10 left-1/4 hidden lg:block"
            >
              <div className="p-4 glass rounded-2xl animate-bounce duration-[3s]">
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <motion.div 
              style={{ transform: 'translateZ(100px) translateX(50%)' }}
              className="absolute -bottom-10 right-1/4 hidden lg:block"
            >
              <div className="p-4 glass rounded-2xl animate-bounce duration-[4s]">
                <Cpu className="h-8 w-8 text-teal-400" />
              </div>
            </motion.div>
            <motion.div 
              style={{ transform: 'translateZ(120px)' }}
              className="absolute top-1/2 -right-12 hidden lg:block"
            >
              <div className="p-4 glass rounded-2xl animate-pulse">
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 w-full max-w-4xl"
          >
            {[
              { label: 'Talabalar', value: '10,000+', icon: Users },
              { label: 'Ish o\'rinlari', value: '500+', icon: Briefcase },
              { label: 'Startaplar', value: '120+', icon: Rocket },
              { label: 'Hamkorlar', value: '45+', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 p-6 glass rounded-3xl hover:border-primary/30 transition-colors group">
                <stat.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
