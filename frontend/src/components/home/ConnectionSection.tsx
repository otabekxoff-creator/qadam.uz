'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, GraduationCap, Handshake, Sparkles } from 'lucide-react';

export function ConnectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-teal-500/5 to-transparent rounded-full" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ y }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        {/* Floating Orbs - reduced */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full ${
              i % 2 === 0 ? 'bg-primary/10' : 'bg-teal-500/10'
            } blur-3xl`}
            style={{
              left: `${25 + i * 25}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container relative z-10 mx-auto px-4 sm:px-6"
        style={{ y }}
      >
        {/* 3D Scene - reduced height */}
        <div className="relative h-[280px] sm:h-[350px] lg:h-[400px]">
          {/* Platform - reduced */}
          <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-0.5">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {/* Company Card - smaller */}
          <motion.div
            className="absolute left-0 sm:left-4 lg:left-16 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -80, rotateY: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 50 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow - smaller */}
              <motion.div
                className="absolute -inset-4 bg-primary/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Card - smaller */}
              <div className="relative w-32 sm:w-40 lg:w-48 h-52 sm:h-60 lg:h-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                
                <div className="h-[50%] bg-gradient-to-br from-primary/20 to-teal-500/10 flex items-center justify-center relative">
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-primary/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Sparkles className="w-2.5 h-2.5 text-primary" />
                      <span className="text-[10px] font-bold text-primary">Verified</span>
                    </div>
                  </div>
                  
                  <motion.div
                    className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-xl"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Building2 className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                  </motion.div>
                </div>

                <div className="h-[50%] p-3 sm:p-4 flex flex-col justify-center items-center text-center bg-card/50 backdrop-blur-sm">
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-0.5">TechPark</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">IT Kompaniya</p>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 bg-secondary/80 rounded-full text-[10px] font-medium">Remote</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-medium">$3000+</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements - smaller */}
              <motion.div
                className="absolute -top-2 -right-3 w-6 h-6 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/20 text-xs"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              >
                💼
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-3 w-5 h-5 bg-teal-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-teal-500/20 text-[10px]"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.3 }}
              >
                📈
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Student Card - smaller */}
          <motion.div
            className="absolute right-0 sm:right-4 lg:right-16 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 80, rotateY: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 50 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow - smaller */}
              <motion.div
                className="absolute -inset-4 bg-teal-500/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />

              {/* Card - smaller */}
              <div className="relative w-32 sm:w-40 lg:w-48 h-52 sm:h-60 lg:h-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-primary/10" />
                
                <div className="h-[50%] bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center relative">
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-teal-500/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <GraduationCap className="w-2.5 h-2.5 text-teal-600" />
                      <span className="text-[10px] font-bold text-teal-600">Talaba</span>
                    </div>
                  </div>
                  
                  <motion.div
                    className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <GraduationCap className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                  </motion.div>
                </div>

                <div className="h-[50%] p-3 sm:p-4 flex flex-col justify-center items-center text-center bg-card/50 backdrop-blur-sm">
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-0.5">Aziz Karimov</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">TATU Talabasi</p>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 rounded-full text-[10px] font-medium">React</span>
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 rounded-full text-[10px] font-medium">Node.js</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements - smaller */}
              <motion.div
                className="absolute -top-2 -left-3 w-6 h-6 bg-teal-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-teal-500/20 text-xs"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
              >
                🎓
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-3 w-5 h-5 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20 text-[10px]"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.6 }}
              >
                ⭐
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Central Handshake - smaller */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            {/* Outer Glow Ring - smaller */}
            <motion.div
              className="absolute -inset-8 sm:-inset-12 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent, hsl(174, 70%, 50%), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute -inset-8 sm:-inset-12 bg-background rounded-full" />
            
            {/* Inner Glow - smaller */}
            <motion.div
              className="absolute -inset-6 sm:-inset-10 bg-gradient-radial from-primary/30 via-teal-500/20 to-transparent rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main Icon - smaller */}
            <motion.div
              className="relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary via-teal-500 to-cyan-500 flex items-center justify-center shadow-xl border-2 border-background"
              animate={{ 
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 20px hsl(var(--primary) / 0.4)',
                  '0 0 40px hsl(174, 70%, 50% / 0.4)',
                  '0 0 20px hsl(var(--primary) / 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0.5 rounded-full bg-background/20 backdrop-blur-sm" />
              <Handshake className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white relative z-10" />
            </motion.div>

            {/* Particle Orbits - fewer */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(174, 70%, 50%)' : 'hsl(187, 85%, 50%)',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Connection Path - simplified */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <motion.path
              d="M 128 200 Q 280 120 432 200"
              fill="none"
              stroke="url(#connectionGradientSmall)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <defs>
              <linearGradient id="connectionGradientSmall" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(174, 70%, 50%)" />
                <stop offset="100%" stopColor="hsl(187, 85%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
