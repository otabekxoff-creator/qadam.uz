'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Rocket, 
  Users, 
  GraduationCap,
  Award,
  TrendingUp,
  FileText,
  Building2,
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  DollarSign,
  ArrowRight,
  ChevronRight,
  Zap,
  Target,
  Lightbulb,
  Heart,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// =============================================
// Enhanced Features Data
// =============================================

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'AI-powered job search with advanced filtering and personalized recommendations.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
    stats: { label: '95% Match Rate', value: 'Highly Accurate' }
  },
  {
    icon: Rocket,
    title: 'Startup Ecosystem',
    description: 'Connect with innovative startups and investors. Launch your ideas with our support.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
    stats: { label: '500+ Startups', value: 'Growing Fast' }
  },
  {
    icon: Users,
    title: 'Professional Network',
    description: 'Build meaningful connections with industry leaders and mentors.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950',
    stats: { label: '50K+ Users', value: 'Active Community' }
  },
  {
    icon: GraduationCap,
    title: 'Career Development',
    description: 'Access courses, workshops, and certification programs.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
    stats: { label: '1000+ Courses', value: 'Expert Led' }
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'Create professional resumes with AI optimization and templates.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-950',
    stats: { label: '10K+ Resumes', value: 'AI Optimized' }
  },
  {
    icon: Award,
    title: 'Skill Assessment',
    description: 'Evaluate your skills and get personalized improvement recommendations.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-950',
    stats: { label: '25K+ Tests', value: 'Industry Validated' }
  },
  {
    icon: TrendingUp,
    title: 'Career Analytics',
    description: 'Track your career progress with detailed insights and trends.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-950',
    stats: { label: 'Real-time Data', value: 'Actionable Insights' }
  },
  {
    icon: Building2,
    title: 'Company Tools',
    description: 'Advanced recruitment tools and talent management for companies.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950',
    stats: { label: '2000+ Companies', value: 'Trusted Platform' }
  },
];

// =============================================
// Enhanced Features Section Component
// =============================================

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
              Nima uchun Step.uz?
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Biz yoshlarning karyerasini qo'llab-quvvatlash uchun barcha zarur vositalarni taqdim etamiz.
            </motion.p>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 pt-8 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {[
              { label: 'Talabalar', value: '10,000+' },
              { label: 'Ish o\'rinlari', value: '500+' },
              { label: 'Startaplar', value: '120+' },
              { label: 'Hamkorlar', value: '45+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <motion.div
                  animate={{ scale: hoveredFeature === i ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</span>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <motion.div
                    animate={{ 
                      y: hoveredFeature === i ? -5 : 0,
                      scale: hoveredFeature === i ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.bgColor} text-white group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon size={32} />
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {feature.title}
                  </CardTitle>
                  {feature.stats && (
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {feature.stats.label}
                      </Badge>
                      <span className="text-sm font-medium text-primary">
                        {feature.stats.value}
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredFeature === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-border/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>Explore Feature</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 p-8 rounded-2xl border border-border/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who've already accelerated their careers with Step.uz
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/95 rounded-full px-8 h-14 text-base font-bold shadow-lg transition-all hover:shadow-xl active:scale-95 group"
              asChild
            >
              <div className="flex items-center gap-2">
                Get Started Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
