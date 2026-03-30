'use client';

import { motion } from 'framer-motion';
import { Cookie, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CookiesPage() {
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

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Cookie className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Cookie Siyosati</h1>
            <p className="text-muted-foreground">
              SINERGIYA platformasida cookie fayllaridan qanday foydalanishimiz haqida ma\'lumot
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-slate max-w-none"
          >
            <div className="bg-card rounded-xl p-8 shadow-sm border mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookie nima?</h2>
              <p className="text-muted-foreground mb-4">
                Cookie fayllari - bu veb-saytimiz tomonidan brauzeringizga saqlanuvchi kichik matn fayllari. 
                Ular bizga sizning brauzeringizni tanib, xotirada ma\'lumotlar saqlashga yordam beradi.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border mb-8">
              <h2 className="text-2xl font-semibold mb-4">Qanday cookie fayllaridan foydalanamiz?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Majburiy cookie:</strong> Saytimizning to\'g\'ri ishlashi uchun zarur</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Sessiya cookie:</strong> Tizimga kirish holatini saqlaydi</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Tahliliy cookie:</strong> Saytimizdan qanday foydalanishingizni tahlil qilish uchun</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Reklama cookie:</strong> Sizga mos reklamalarni ko\'rsatish uchun</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookie ni qanday boshqarish mumkin?</h2>
              <p className="text-muted-foreground mb-4">
                Siz brauzeringiz sozlamalaridan cookie fayllarini o\'chirish yoki ulardan foydalanishni 
                cheklashingiz mumkin. Biroq, buni qilsangiz, saytimizning ba\'zi funksiyalari to\'g\'ri 
                ishlamasligi mumkin.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Aloqa</h2>
              <p className="text-muted-foreground">
                Cookie siyosati bo\'yicha savollaringiz bo\'lsa, biz bilan bog\'laning:{' '}
                <a href="mailto:support@sinergiya.uz" className="text-primary hover:underline">
                  support@sinergiya.uz
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
