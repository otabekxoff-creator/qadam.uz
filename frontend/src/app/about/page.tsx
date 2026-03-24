'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: "Foydalanuvchilar", value: "50,000+", icon: Users },
  { label: "Kompaniyalar", value: "1,200+", icon: Globe },
  { label: "Ishlar", value: "15,000+", icon: Target },
  { label: "Muvaffaqiyatlar", value: "8,500+", icon: Award }
];

const values = [
  {
    icon: Heart,
    title: "Yoshlarga yordam",
    description: "O'zbekiston yoshlariga eng yaxshi karyera imkoniyatlarini yaratamiz"
  },
  {
    icon: Target,
    title: "Innovatsiyalar",
    description: "Zamonaviy texnologiyalar va yondashuvlar bilan rivojlanamiz"
  },
  {
    icon: Users,
    title: "Jamoaviylik",
    description: "Birgalikda ishlab, umumiy maqsadlarga erishamiz"
  }
];

const team = [
  {
    name: "Otabek Ravshanov",
    role: "CEO",
    description: "10+ yil IT tajribasi"
  },
  {
    name: "Baxodirov Baxtiyor",
    role: "CTO",
    description: "8+ yil dasturlash tajribasi"
  },
  {
    name: "Yunusaliyev Shukurjon",
    role: "Head of Operations",
    description: "6+ yil operatsion boshqaruvi"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 dark:from-background dark:via-background dark:to-secondary/10">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-glow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Biz <span className="text-gradient">haqimizda</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sinergiya - O'zbekiston yoshlari uchun yagona karyera platformasi. 
            Biz talabalar, bitiruvchilar va yosh professionallarni eng yaxshi imkoniyatlar bilan bog'laymiz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="text-center h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="pt-8 pb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="mb-4"
                  >
                    <stat.icon className="h-10 w-10 text-primary mx-auto" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Bizning qadriyatlarimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Bizning jamoa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="text-center p-12">
              <h2 className="text-3xl font-bold mb-6">Kompaniya haqida</h2>
              <p className="text-lg mb-8 opacity-90">
                Bizning kompaniya va boshqa loyihalarimiz haqida to'liq ma'lumot
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <a href="https://baxa-tech.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Kompaniya sayti
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/contact">Aloqa</a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/careers">Karyera</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
