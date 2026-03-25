'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, GraduationCap, Handshake, Sparkles, Zap, Users, Trophy, Heart } from 'lucide-react';

const statsData = [
  { number: '500+', label: 'Kompaniyalar', icon: Building2, gradient: 'from-primary to-primary/70' },
  { number: '10,000+', label: 'Talabalar', icon: Users, gradient: 'from-teal-500 to-cyan-500' },
  { number: '2,000+', label: 'Muvaffaqiyat', icon: Trophy, gradient: 'from-amber-500 to-orange-500' },
  { number: '95%', label: 'Qoniqish', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
];

function StatCard({ stat, index }: { stat: typeof statsData[0]; index: number }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-teal-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Icon */}
        <motion.div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.div>

        {/* Number */}
        <motion.div 
          className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.15, type: 'spring' }}
        >
          {stat.number}
        </motion.div>

        {/* Label */}
        <div className="text-sm sm:text-base font-semibold text-muted-foreground">
          {stat.label}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-primary/5 rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
}

export function ConnectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-primary/10 via-teal-500/5 to-transparent rounded-full" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ y }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full ${
              i % 2 === 0 ? 'bg-primary/10' : 'bg-teal-500/10'
            } blur-3xl`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
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
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Kuchli Aloqa</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6">
            Karyera Bosqichida{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Uchrashing
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-teal-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Kompaniyalar va talabalar bir joyda - kelajagingizni birga quring
          </p>
        </motion.div>

        {/* 3D Scene */}
        <div className="relative h-[450px] sm:h-[550px] lg:h-[600px] mb-20 sm:mb-24">
          {/* Enhanced Platform with Glow */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[900px] h-1">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.7 }}
            />
          </div>

          {/* Company Card */}
          <motion.div
            className="absolute left-0 sm:left-8 lg:left-20 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -150, rotateY: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring', stiffness: 50 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Card */}
              <div className="relative w-44 sm:w-56 lg:w-64 h-72 sm:h-80 lg:h-96 bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                
                <div className="h-[55%] bg-gradient-to-br from-primary/20 to-teal-500/10 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-primary">Verified</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-2xl"
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Building2 className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 text-white" />
                  </motion.div>
                </div>

                <div className="h-[45%] p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-card/50 backdrop-blur-sm">
                  <h3 className="font-black text-lg sm:text-xl text-foreground mb-1">TechPark</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">IT Kompaniya</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-secondary/80 rounded-full text-xs font-semibold">Remote</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">$3000+</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-6 sm:-right-8 w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/20"
                animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              >
                💼
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-6 sm:-left-8 w-8 sm:w-10 h-8 sm:h-10 bg-teal-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-teal-500/20"
                animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.3 }}
              >
                📈
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Student Card */}
          <motion.div
            className="absolute right-0 sm:right-8 lg:right-20 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 150, rotateY: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, type: 'spring', stiffness: 50 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute -inset-8 bg-teal-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />

              {/* Card */}
              <div className="relative w-44 sm:w-56 lg:w-64 h-72 sm:h-80 lg:h-96 bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-primary/10" />
                
                <div className="h-[55%] bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="flex items-center gap-1.5 bg-teal-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-teal-600">Talaba</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl"
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, -2, 2, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <GraduationCap className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 text-white" />
                  </motion.div>
                </div>

                <div className="h-[45%] p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-card/50 backdrop-blur-sm">
                  <h3 className="font-black text-lg sm:text-xl text-foreground mb-1">Aziz Karimov</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">TATU Talabasi</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-600 rounded-full text-xs font-semibold">React</span>
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-600 rounded-full text-xs font-semibold">Node.js</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-6 sm:-left-8 w-10 sm:w-12 h-10 sm:h-12 bg-teal-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-teal-500/20"
                animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
              >
                🎓
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-6 sm:-right-8 w-8 sm:w-10 h-8 sm:h-10 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20"
                animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.6 }}
              >
                ⭐
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Central Handshake */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 100 }}
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute -inset-16 sm:-inset-20 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent, hsl(174, 70%, 50%), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute -inset-16 sm:-inset-20 bg-background rounded-full" />
            
            {/* Inner Glow */}
            <motion.div
              className="absolute -inset-12 sm:-inset-16 bg-gradient-radial from-primary/30 via-teal-500/20 to-transparent rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main Icon */}
            <motion.div
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-background"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 30px hsl(var(--primary) / 0.5)',
                  '0 0 60px hsl(174, 70%, 50% / 0.5)',
                  '0 0 30px hsl(var(--primary) / 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-1 rounded-full bg-background/30 backdrop-blur-sm" />
              <Handshake className="w-10 h-10 sm:w-14 sm:h-14 text-white relative z-10" />
            </motion.div>

            {/* Particle Orbits */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
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
                    x: Math.cos((i * 30 * Math.PI) / 180) * 70,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 70,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Connection Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <motion.path
              d="M 160 300 Q 400 180 640 300"
              fill="none"
              stroke="url(#connectionGradient)"
              strokeWidth="3"
              strokeDasharray="15 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 1 }}
            />
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(174, 70%, 50%)" />
                <stop offset="100%" stopColor="hsl(187, 85%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Stats Grid - Enhanced */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {statsData.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
