'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
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
              <FileText className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Foydalanish shartlari</h1>
          <p className="text-lg text-muted-foreground">
            Step.uz platformasidan foydalanish qoidalari va shartlari
          </p>
        </motion.div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                1. Ro'yxatdan o'tish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Step.uz platformasidan foydalanish uchun ro'yxatdan o'tish shart:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>18 yoshga to'lgan bo'lish</li>
                <li>To'g'ri ma'lumotlarni kiritish</li>
                <li>Email manzilini tasdiqlash</li>
                <li>Ushbu shartlarni qabul qilish</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                2. Foydalanuvchi majburiyatlari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Foydalanuvchi quyidagi majburiyatlarga ega:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To'g'ri ma'lumotlarni taqdim etish</li>
                <li>Boshqa foydalanuvchilarga hurmat bilan munosabatda bo'lish</li>
                <li>Platformani noto'g'ri maqsadlarda ishlatmaslik</li>
                <li>Konfidentsial ma'lumotlarni saqlash</li>
                <li>Qonunga zid harakatlardan saqlanish</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                3. Cheklovlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Quyidagi holatlarda foydalanuvchiga xizmat ko'rsatilmasligi mumkin:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Shartlarni buzganda</li>
                <li>Noto'g'ri ma'lumot berganda</li>
                <li>Platformani noto'g'ri ishlatganda</li>
                <li>Qonun talablariga rioya qilmaganda</li>
                <li>Boshqa foydalanuvchilarning huquqlarini buzganda</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                4. Intellektual mulk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Platformadagi barcha kontent Step.uz intellektual mulki hisoblanadi:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Ruxsatsiz nusxa ko'chirish taqiqlanadi</li>
                <li>Kontentni o'zgartirish mumkin emas</li>
                <li>Tijorat maqsadlarida ishlatish taqiqlanadi</li>
                <li>Manbani ko'rsatish majburiy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Shartlarning o'zgarishi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Step.uz o'z vaqtida ushbu shartlarni o'zgartirish huquqiga ega.
                O'zgarishlar platformada e'lon qilinadi va foydalanuvchilar xabardor qilinadi.
              </p>
              <p className="text-muted-foreground">
                Platformadan foydalanish davom ettirish ushbu shartlarni qabul qilishini anglatadi.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
