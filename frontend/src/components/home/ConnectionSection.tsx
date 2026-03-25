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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div 
        className="container relative z-10 mx-auto px-4 sm:px-6"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Karyera Bosqichida <span className="text-primary">Uchrashing</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Kompaniyalar va talabalar bir joyda - kelajagingizni birga quring
          </p>
        </motion.div>

        {/* 3D Scene */}
        <div className="relative h-[500px] sm:h-[600px] perspective-1000">
          {/* Platform */}
          <motion.div
            className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-8 sm:h-12 bg-gradient-to-r from-transparent via-border to-transparent rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Company Side */}
          <motion.div
            className="absolute left-0 sm:left-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative">
              {/* Company Glow */}
              <motion.div
                className="absolute -inset-10 bg-primary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Company Card */}
              <div className="relative w-40 sm:w-52 h-64 sm:h-80 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="h-1/2 bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary">Verified</span>
                    </div>
                  </div>
                  <motion.div
                    className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Building2 className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                  </motion.div>
                </div>
                
                {/* Card Body */}
                <div className="h-1/2 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-card">
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-1">TechPark</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">IT Kompaniya</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-secondary rounded-full text-[10px] sm:text-xs font-medium">Remote</span>
                    <span className="px-2 py-1 bg-secondary rounded-full text-[10px] sm:text-xs font-medium">$3000+</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-lg">💼</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-4 w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center"
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.3 }}
              >
                <span className="text-sm">📈</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Student Side */}
          <motion.div
            className="absolute right-0 sm:right-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Student Glow */}
              <motion.div
                className="absolute -inset-10 bg-teal-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />

              {/* Student Card */}
              <div className="relative w-40 sm:w-52 h-64 sm:h-80 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="h-1/2 bg-gradient-to-br from-teal-500/20 to-primary/20 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-1 rounded-full">
                      <GraduationCap className="w-3 h-3 text-teal-600" />
                      <span className="text-[10px] font-bold text-teal-600">Talaba</span>
                    </div>
                  </div>
                  <motion.div
                    className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <GraduationCap className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="h-1/2 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-card">
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-1">Aziz Karimov</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">TATU Talabasi</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-teal-500/10 text-teal-600 rounded-full text-[10px] sm:text-xs font-medium">React</span>
                    <span className="px-2 py-1 bg-teal-500/10 text-teal-600 rounded-full text-[10px] sm:text-xs font-medium">Node.js</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
              >
                <span className="text-lg">🎓</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-4 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center"
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.6 }}
              >
                <span className="text-sm">⭐</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Handshake Animation in Center */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-20 bg-gradient-to-r from-primary/30 via-transparent to-teal-500/30 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Handshake Icon */}
            <motion.div
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-1 rounded-full bg-background/20 backdrop-blur-sm" />
              <Handshake className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10" />
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: Math.cos((i * 45 * Math.PI) / 180) * 80,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 80,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <motion.path
              d="M 180 300 Q 400 200 620 300"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(174, 70%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { number: '500+', label: 'Kompaniyalar' },
            { number: '10,000+', label: 'Talabalar' },
            { number: '2,000+', label: 'Muvaffaqiyat' },
            { number: '95%', label: 'Qoniqish' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
            >
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
