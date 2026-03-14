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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 md:text-4xl"
          >
            Nima uchun{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Step.uz
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Biz yoshlarning karyerasini qo'llab-quvvatlash uchun barcha zarur vositalarni taqdim etamiz.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -10 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group rounded-xl border bg-card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
