"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [search, setSearch] = useState("");

  const faqs = [
    {
      category: "Umumiy savollar",
      questions: [
        {
          q: "Step.uz nima?",
          a: "Step.uz - O'zbekiston yoshlari uchun yaratilgan zamonaviy karyera platformasi. Biz talabalar va kompaniyalar o'rtasida ko'prik vazifasini bajaramiz, ish topish va ishchi topish jarayonini osonlashtiramiz.",
        },
        {
          q: "Platformadan qanday foydalanish mumkin?",
          a: "Ro'yxatdan o'ting, profilingizni to'ldiring va ish e'lonlarini ko'rishni boshlang. Talabalar sifatida ishga ariza topshirishingiz, kompaniya sifatida ish e'lonlari joylashtirishingiz mumkin.",
        },
        {
          q: "Platformadan foydalanish bepulmi?",
          a: "Asosiy funksiyalar bepul. Bepul tarifda 5 ta ishga ariza topshirish, 1 ta rezyume yaratish va kompaniyalar katalogidan foydalanish mumkin. Qo'chimcha imkoniyatlar uchun Professional tarif mavjud.",
        },
      ],
    },
    {
      category: "Ro'yxatdan o'tish va profil",
      questions: [
        {
          q: "Qanday ro'yxatdan o'tish mumkin?",
          a: "Bosh sahifadagi 'Ro'yxatdan o'tish' tugmasini bosing, email manzilingizni kiriting, parol yarating va rolingizni (talaba yoki kompaniya) tanlang. Email orqali tasdiqlashdan so'ng profilingizga kira olasiz.",
        },
        {
          q: "Profilimni qanday yangilash mumkin?",
          a: "Profil sahifasiga o'ting, 'Tahrirlash' tugmasini bosing va ma'lumotlaringizni yangilang. Rezyume, ko'nikmalar, tajriba va ta'lim ma'lumotlarini qo'shishingiz mumkin.",
        },
        {
          q: "Parolimni unutdim, nima qilishim kerak?",
          a: "Kirish sahifasida 'Parolni unutdingizmi?' havolasini bosing. Email manzilingizga parolni qayta tiklash havolasi yuboriladi.",
        },
      ],
    },
    {
      category: "Ish topish",
      questions: [
        {
          q: "Ishga qanday ariza topshirish mumkin?",
          a: "Ish e'lonini oching, 'Ariza topshirish' tugmasini bosing va kerakli ma'lumotlarni to'ldiring. Rezyume va murojaat xati (cover letter) qo'shishingiz mumkin.",
        },
        {
          q: "Arizam holatini qanday kuzatish mumkin?",
          a: "Dashboard'dagi 'Arizalarim' bo'limiga o'ting. Barcha arizalaringiz holati (ko'rib chiqilmoqda, intervyu, taklif va h.k.) ko'rsatiladi.",
        },
        {
          q: "Rezyumeni qanday yuklash mumkin?",
          a: "Profil sahifasida 'Rezyume' bo'limiga o'ting, 'Yuklash' tugmasini bosing va PDF formatdagi faylni tanlang. Tizim rezyumeni avtomatik tahlil qiladi.",
        },
      ],
    },
    {
      category: "Kompaniyalar uchun",
      questions: [
        {
          q: "Ish e'lonini qanday joylashtirish mumkin?",
          a: "Kompaniya sifatida ro'yxatdan o'ting, profilingizni tasdiqlang va 'Yangi ish e'loni' tugmasini bosing. Ish tavsifi, talablar va ish sharoitlarini ko'rsating.",
        },
        {
          q: "Arizalarni qanday ko'rib chiqish mumkin?",
          a: "Dashboard'dagi 'Arizalar' bo'limiga o'ting. Har bir arizani ochib, nomzodning profili, rezyume va murojaat xatini ko'rishingiz mumkin.",
        },
        {
          q: "Nomzod bilan qanday bog'lanish mumkin?",
          a: "Ariza holatini 'Intervyu' yoki 'Taklif' ga o'zgartirganda, nomzod avtomatik xabar oladi. Chat orqali to'g'ridan-to'g'ri aloqa qilish mumkin.",
        },
      ],
    },
    {
      category: "Xavfsizlik",
      questions: [
        {
          q: "Ma'lumotlarim xavfsizmi?",
          a: "Ha, biz ma'lumotlar xavfsizligiga jiddiy yondashamiz. Barcha ma'lumotlar shifrlanadi va xavfsiz serverlarda saqlanadi. Biz ma'lumotlaringizni uchinchi tomonga sotmaymiz.",
        },
        {
          q: "Profilingimni o'chirish mumkinmi?",
          a: "Ha, profil sozlamalarida 'Hisobni o'chirish' bo'limi mavjud. Hisobingizni o'chirishdan oldin barcha ma'lumotlaringiz o'chiriladi.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Tez-tez so'raladigan savollar</h1>
          <p className="text-xl text-muted-foreground">
            Savolingiz bormi? Bu yerda javob topishingiz mumkin
          </p>
        </motion.div>

        <div className="relative mb-8">
          <HelpCircle className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Savol qidirish..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.q}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
