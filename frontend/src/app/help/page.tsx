'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Phone, Mail, Book, Video, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const helpCategories = [
  {
    icon: Book,
    title: "Qo'llanmalar",
    description: "Platformadan foydalanish bo'yicha to'liq qo'llanmalar",
    items: [
      "Ro'yxatdan o'tish",
      "Profil yaratish",
      "Ish qidirish",
      "Ariza topshirish",
      "Intervyu o'tkazish"
    ]
  },
  {
    icon: Video,
    title: "Video darslar",
    description: "Qisqa video darslar va ko'rsatmalar",
    items: [
      "Platforma turishi",
      "Profil sozlamalari",
      "Ish qidirish usullari",
      "Ariza berish qoidalari"
    ]
  },
  {
    icon: MessageCircle,
    title: "Jamoat",
    description: "Foydalanuvchilar bilan muloqot qilish",
    items: [
      "Forum",
      "Guruhlar",
      "Muhokamalar",
      "Tajriba almashish"
    ]
  }
];

const commonIssues = [
  {
    title: "Login qila olmayapman",
    solution: "Parolni unutgan bo'lsangiz, 'Parolni unutdingiz?' tugmasini bosing va email orqali tiklang."
  },
  {
    title: "Profilni to'ldirolmayapman",
    solution: "Barcha majburiy maydonlarni to'ldiring: ism, familiya, email, telefon raqami."
  },
  {
    title: "Ariza yuborilmayapti",
    solution: "Internet aloqasini tekshiring va barcha fayllarni to'g'ri formatda yuklang."
  },
  {
    title: "Email tasdiqlanmayapti",
    solution: "Spam jildini tekshiring, agar xat kelmagan bo'lsa, qayta yuborish tugmasini bosing."
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white">
              <Headphones className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Yordam markazi</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Step.uz platformasi bo'yicha yordam va ko'rsatmalar
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Yordam izlash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Ko'p uchraydigan muammolar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonIssues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{issue.solution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Boshqa yordam kerakmi?</h3>
              <p className="text-lg mb-8 opacity-90">
                Agar sizning savolingiz javob topmagan bo'lsa, to'g'ridan-to'g'ri bog'laning
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="secondary" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  +998 88 001 6777
                </Button>
                <Button variant="secondary" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  support@step.uz
                </Button>
                <Button variant="secondary" asChild className="w-full">
                  <a href="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Aloqa
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
