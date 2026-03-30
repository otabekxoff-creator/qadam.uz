'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Briefcase, ArrowRight, CheckCircle, ArrowLeft, Star, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EnterprisePage() {
  const features = [
    {
      icon: Users,
      title: 'Keng Talant Bazasi',
      description: '50,000+ ish qidiruvchilar orasidan eng yaxshilarini tanlang'
    },
    {
      icon: Zap,
      title: 'AI Yordamchi',
      description: 'Sun\'iy intellekt nomzodlarni saralashda yordam beradi'
    },
    {
      icon: Shield,
      title: 'Xavfsizlik',
      description: 'Barcha ma\'lumotlar shifrlanadi va himoyalanadi'
    },
    {
      icon: Globe,
      title: 'Global Qamrov',
      description: 'O\'zbekiston bo\'ylab ish qidiruvchilarga erishing'
    }
  ];

  const plans = [
    {
      name: 'Boshlang\'ich',
      price: 'Bepul',
      description: 'Kichik kompaniyalar uchun',
      features: ['3 ta aktiv ish e\'loni', '100 ta ko\'rish', 'Asosiy qo\'llab-quvvatlash']
    },
    {
      name: 'Biznes',
      price: '499,000 so\'m/oy',
      description: 'O\'rta kompaniyalar uchun',
      features: ['20 ta aktiv ish e\'loni', '10,000 ta ko\'rish', 'Premium qo\'llab-quvvatlash', 'Logo va brending']
    },
    {
      name: 'Korxona',
      price: '1,499,000 so\'m/oy',
      description: 'Katta kompaniyalar uchun',
      features: ['Cheksiz ish e\'lonlari', 'Cheksiz ko\'rish', '24/7 qo\'llab-quvvatlash', 'API kirish', 'Maxsus hisobdor']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Korxona Yechimlari
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Katta kompaniyalar uchun maxsus ishga qabul qilish platformasi. 
              50,000+ ish qidiruvchilar orasidan eng yaxshi talentlarni toping.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Narxlar Rejasi</h2>
            <p className="text-muted-foreground">O\'zingizga mos rejani tanlang</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{plan.price}</p>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full">
                    Boshlash
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Katta kompaniyangiz uchun maxsus yechim kerakmi?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Biz sizning kompaniyangiz uchun maxsus yechimlar yaratishimiz mumkin. 
              Biz bilan bog\'laning va batafsil ma\'lumot oling.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Biz bilan bog\'laning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
