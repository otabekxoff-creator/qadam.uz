'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    category: "Umumiy savollar",
    questions: [
      {
        question: "Step.uz nima?",
        answer: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi. Talabalar, bitiruvchilar va yosh professionallar uchun ish topish, startap yaratish va karyera rivojlantirish imkoniyatlari."
      },
      {
        question: "Platformadan qanday foydalanish mumkin?",
        answer: "Ro'yxatdan o'ting, profil yarating va o'z rolingizga mos xizmatlardan foydalaning: talabalar uchun ish qidirish, kompaniyalar uchun xodim qidirish, startaplar uchun investorlar topish."
      },
      {
        question: "Platforma bepulmi?",
        answer: "Ha, asosiy xizmatlar bepul. Premium funksiyalar va qo'shimcha imkoniyatlar uchun to'lov paketlari mavjud."
      }
    ]
  },
  {
    category: "Talabalar uchun",
    questions: [
      {
        question: "Qanday ishlarga ariza topshirish mumkin?",
        answer: "O'qishingiz mos bo'lgan barcha sohalarda: IT, marketing, dizayn, moliya, marketing va boshqa sohalarda ishlarga ariza topshirishingiz mumkin."
      },
      {
        question: "Intervyuga qanday tayyorlanish kerak?",
        answer: "Profilingizni to'liq to'ldiring, portfolioni tayyorlang, o'qishingiz va tajribangiz haqida ma'lumot berishga tayyorlaning."
      },
      {
        question: "Stajirovkalar bormi?",
        answer: "Ha, ko'plab kompaniyalar stajirovka dasturlarini taklif qiladi. Stajirovka bo'limidan barcha imkoniyatlarni ko'rishingiz mumkin."
      }
    ]
  },
  {
    category: "Kompaniyalar uchun",
    questions: [
      {
        question: "Qanday xodimlarni topish mumkin?",
        answer: "Talabalar, bitiruvchilar va tajirlangan mutaxassislarni topishingiz mumkin. Filtrlar orqali kerakli nomzodlarni qidiring."
      },
      {
        question: "Arizalarni qanday ko'rish mumkin?",
        answer: "Barcha arizalar profilga keladi, ularni ko'rib chiqishingiz, intervyuga chaqirishingiz va qisqa ro'yxatga qo'shishingiz mumkin."
      },
      {
        question: "To'lov qanday amalga oshiriladi?",
        answer: "Bank kartasi yoki elektron to'lov tizimlari orqali to'lov qilishingiz mumkin. Oylik va yillik paketlar mavjud."
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white">
              <HelpCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Ko'p so'raladigan savollar</h1>
          <p className="text-lg text-muted-foreground">
            Platforma haqida eng ko'p so'raladigan savollar va javoblari
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const itemKey = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems[itemKey];
                    
                    return (
                      <div key={itemKey} className="border border-border/50 rounded-lg">
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-4 h-auto text-left"
                          onClick={() => toggleItem(itemKey)}
                        >
                          <span className="font-medium">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="px-4 pb-4"
                          >
                            <p className="text-muted-foreground">{item.answer}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="text-center p-8">
              <h3 className="text-xl font-bold mb-4">Boshqa savollaringiz bormi?</h3>
              <p className="text-muted-foreground mb-6">
                Agar sizning savolingiz javob topmagan bo'lsa, biz bilan bog'laning
              </p>
              <Button asChild>
                <a href="/contact">Aloqaga o'tish</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
