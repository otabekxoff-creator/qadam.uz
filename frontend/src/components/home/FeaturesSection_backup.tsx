'use client';

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
} from 'lucide-react';

// =============================================
// Features Data
// =============================================

const features = [
  {
    icon: Briefcase,
    title: 'Ish qidirish',
    description: 'Eng so\'nggi ish e\'lonlarini ko\'ring va o\'z sohangiz bo\'yicha ish toping.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  {
    icon: Rocket,
    title: 'Startap yaratish',
    description: 'O\'z startap g\'oyangizni yuboring va moliyalashtirish imkoniyatiga ega bo\'ling.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
  },
  {
    icon: Users,
    title: 'Kompaniyalar bilan bog\'lanish',
    description: 'O\'zbekistondagi yetakchi kompaniyalar bilan to\'g\'ridan-to\'g\'ri aloqa.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950',
  },
  {
    icon: GraduationCap,
    title: 'Talabalar uchun',
    description: 'Bitiruvchilar uchun maxsus imkoniyatlar va stajirovka dasturlari.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
  },
  {
    icon: FileText,
    title: 'Resume yaratish',
    description: 'Professional CV yarating va ish beruvchilarga taqdim eting.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-950',
  },
  {
    icon: Award,
    title: 'Sertifikatlar',
    description: 'Platformada o\'z mahoratingizni tasdiqlovchi sertifikatlar oling.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-950',
  },
  {
    icon: TrendingUp,
    title: 'Karyera rivojlanishi',
    description: 'Shaxsiy rivojlanish uchun maslahatlar va resurslar.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-950',
  },
  {
    icon: Building2,
    title: 'Kompaniyalar uchun',
    description: 'Ish beruvchilarga talent topishda yordam beramiz.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950',
  },
];

// =============================================
// Features Section Component
// =============================================

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 md:text-4xl text-foreground tracking-tight"
          >
            Nima uchun Step.uz?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Biz yoshlarning karyerasini qo'llab-quvvatlash uchun barcha zarur vositalarni taqdim etamiz.
          </motion.p>
        </div>

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
            <div key={i} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-primary/5 text-primary group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
