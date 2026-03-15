'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
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
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Maxfiylik siyosati</h1>
          <p className="text-lg text-muted-foreground">
            Step.uz platformasidan foydalanish uchun maxfiylik siyosati
          </p>
        </motion.div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                Ma'lumotlar to'plami
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Step.uz platformasi foydalanuvchilarning shaxsiy ma'lumotlarini himoya qilishga majburdir.
                Biz to'plagan ma'lumotlar:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Ism, familiya, email manzil</li>
                <li>Talabalik yoki ish tajribasi ma'lumotlari</li>
                <li>Profil rasmlari va hujjatlar</li>
                <li>Ishga ariza topshirish tarixi</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                Ma'lumotlarni himoya qilish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Biz foydalanuvchi ma'lumotlarini quyidagilar bilan himoya qilamiz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>SSL shifrlash texnologiyasi</li>
                <li>Xavfsiz serverlar</li>
                <li>Muntazam xavfsizlik tekshiruvi</li>
                <li>Faqat ruxsat etilgan xodimlar kirishi</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-primary" />
                Foydalanuvchi huquqlari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Har bir foydalanuvchi quyidagi huquqlarga ega:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>O'z ma'lumotlarini ko'rish va tahrir qilish</li>
                <li>Profilitni o'chirib tashlash</li>
                <li>Ma'lumotlaridan foydalanilishiga rozilik berish yoki rad etish</li>
                <li>Platformani tark etishda ma'lumotlarni olib chiqish</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aloqa</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> privacy@step.uz</p>
                <p><strong>Telefon:</strong> +998 88 001 6777</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
