'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Handshake, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Heart,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// Partners Data
// ============================================================================

const PARTNER_TYPES = [
  {
    id: 'universities',
    title: 'Universitetlar',
    description: "Talabalarga amaliyot o'rganish va ishga kirish imkoniyatlari yaratish",
    icon: Building2,
    count: 25,
    benefits: [
      'Amaliyot dasturlarini tashkil etish',
      'Mehnar bozori tahlili va hisobotlar',
      'Talaba tayyorlanganligini baholash',
      'Korporativ tadbirlar',
    ],
  },
  {
    id: 'companies',
    title: 'Kompaniyalar',
    description: 'Eng yaxshi kadrlarni topish va biznesingizni rivojlantirish',
    icon: Handshake,
    count: 500,
    benefits: [
      'Premium rekrutment vositalari',
      'Keng tarqalgan talabalar bazasi',
      'Avtomatlashtirilgan saralash',
      'Brending imkoniyatlari',
    ],
  },
  {
    id: 'government',
    title: 'Davlat tashkilotlari',
    description: 'Yoshlar bandligini oshirish va mehnat bozorini rivojlantirish',
    icon: Globe,
    count: 15,
    benefits: [
      'Ishga joylashish dasturlari',
      'Statistika va tahlillar',
      'Xalqaro tajriba almashish',
      'Siyosiy qollab-quvvatlash',
    ],
  },
  {
    id: 'ngos',
    title: 'Nodavriy tashkilotlar',
    description: 'Ijtimoiy ta’sir yaratish va jamiyatni rivojlantirish',
    icon: Heart,
    count: 30,
    benefits: [
      "Ko'nikmalarni rivojlantirish dasturlari",
      'Kam taminlangan guruhlar uchun qollab-quvvatlash',
      'Volontyorlik imkoniyatlari',
      'Hamkorlik tarmoqlari',
    ],
  },
];

const FEATURED_PARTNERS = [
  { name: 'Tashkent State University', type: 'university', logo: '/partners/tsu.png' },
  { name: 'Inha University', type: 'university', logo: '/partners/inha.png' },
  { name: 'UZINFOCOM', type: 'company', logo: '/partners/uzinfocom.png' },
  { name: 'Uzbektelecom', type: 'company', logo: '/partners/uztelecom.png' },
  { name: 'Ministry of Employment', type: 'government', logo: '/partners/ministry.png' },
  { name: 'USAID', type: 'ngo', logo: '/partners/usaid.png' },
];

const SUCCESS_STORIES = [
  {
    company: 'Inha University',
    quote: "Step.uz orqali bizning talabalarimiz dunyoning eng yaxshi kompaniyalarida ishga kirish imkoniyatiga ega bo'lishmoqda.",
    result: '85% talaba ishga joylashdi',
    author: 'Dr. Kim',
    role: 'Rektor',
  },
  {
    company: 'UZINFOCOM',
    quote: "Platforma yordamida biz 6 oy ichida 50+ sifatli dasturchini ishga oldik. Rekrutment jarayoni 70% tezlashdi.",
    result: '70% vaqt tejaldi',
    author: 'Aziz Rahimov',
    role: 'HR Director',
  },
  {
    company: 'Youth Union',
    quote: "Ko'plab yoshlarimiz Step.uz orqali o'z karyerasini boshladi. Bu platforma haqiqiy o'zgarishlar olib kelmoqda.",
    result: '10,000+ yosh ishga joylashdi',
    author: 'Sardor Umurzakov',
    role: 'Direktor',
  },
];

const PARTNERSHIP_PROGRAMS = [
  {
    title: 'Premium Partnership',
    description: 'Eng katta kompaniyalar uchun maxsus imkoniyatlar',
    features: [
      'Cheksiz vakansiya joylash',
      'AI-powered saralash',
      'Maxsus rekrutment menejeri',
      'Brending paketi',
      'Tahliliy hisobotlar',
    ],
    price: 'Custom',
  },
  {
    title: 'Business Partnership',
    description: 'O‘rta va katta biznes uchun optimal yechim',
    features: [
      '50 ta aktiv vakansiya',
      'Avtomatlashtirilgan saralash',
      'Profil branding',
      'Statistika paneli',
      'API kirish',
    ],
    price: '$299/oy',
    popular: true,
  },
  {
    title: 'Starter Partnership',
    description: 'Kichik biznes va startaplar uchun',
    features: [
      '10 ta aktiv vakansiya',
      'Asosiy filtrlash',
      'Standart profil',
      'Email qollab-quvvatlash',
    ],
    price: '$99/oy',
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Handshake className="w-4 h-4 mr-2" />
              Hamkorlik dasturi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Birgalikda{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                kelajak quramiz
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10">
              O‘zbekistonning eng yaxshi kompaniyalari, universitetlari va tashkilotlari bilan hamkorlik qilamiz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                Hamkor bo‘lish
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Batafsil ma’lumot
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { value: '570+', label: 'Hamkorlar' },
              { value: '50K+', label: 'Ish o‘rinlari' },
              { value: '1M+', label: 'Foydalanuvchilar' },
              { value: '95%', label: 'Mamnuniyat' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kimlar bilan hamkorlik qilamiz?
            </h2>
            <p className="text-lg text-gray-600">
              Har qanday soha vakillari bilan hamkorlikka tayyormiz
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {PARTNER_TYPES.map((type) => (
              <motion.div key={type.id} variants={itemVariants}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                          <Badge variant="secondary">{type.count}+</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{type.description}</p>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bizning hamkorlarimiz
            </h2>
            <p className="text-lg text-gray-600">
              O‘zbekistonning yetakchi tashkilotlari bizga ishonishadi
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          >
            {FEATURED_PARTNERS.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {partner.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Barcha hamkorlarni ko‘rish
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Muvaffaqiyat hikoyalari
            </h2>
            <p className="text-lg text-slate-400">
              Hamkorlarimiz bilan birgalikda erishgan natijalar
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {SUCCESS_STORIES.map((story, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                      {story.result}
                    </Badge>
                    <p className="text-white/90 text-lg mb-6 italic">
                      "{story.quote}"
                    </p>
                    <Separator className="bg-white/10 mb-4" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {story.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{story.author}</p>
                        <p className="text-sm text-slate-400">{story.role}, {story.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Programs */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hamkorlik dasturlari
            </h2>
            <p className="text-lg text-gray-600">
              Biznesingiz hajmiga mos tarifni tanlang
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {PARTNERSHIP_PROGRAMS.map((program, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`h-full border-0 shadow-xl ${program.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {program.popular && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      Eng mashhur
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      {program.price}
                    </div>
                    <Separator className="mb-6" />
                    <ul className="space-y-3 mb-8">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${program.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      Tanlash
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hamkorlikni boshlaymizmi?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Siz ham bizning hamkorlar jamoamizga qo‘shiling va O‘zbekiston yoshlarining kelajagini o‘zgartiring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                Bog‘lanish
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Taqdimotni yuklash
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
