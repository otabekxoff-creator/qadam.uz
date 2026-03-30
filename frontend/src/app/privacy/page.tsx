'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  UserCheck,
  Clock,
  Mail,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// ============================================================================
// Privacy Policy Data
// ============================================================================

const LAST_UPDATED = '2026-yil 28-mart';

const TABLE_OF_CONTENTS = [
  { id: 'intro', title: "1. Kirish", icon: FileText },
  { id: 'data-collected', title: "2. Qanday ma'lumotlar to'planadi", icon: Eye },
  { id: 'data-usage', title: "3. Ma'lumotlardan qanday foydalaniladi", icon: Server },
  { id: 'data-sharing', title: "4. Ma'lumotlar kimlar bilan ulashiladi", icon: UserCheck },
  { id: 'data-security', title: "5. Ma'lumotlarni himoya qilish", icon: Shield },
  { id: 'user-rights', title: "6. Foydalanuvchi huquqlari", icon: Lock },
  { id: 'cookies', title: "7. Cookies va kuzatuv texnologiyalari", icon: Clock },
  { id: 'retention', title: "8. Ma'lumotlarni saqlash muddati", icon: Clock },
  { id: 'children', title: "9. Bolalar maxfiyligi", icon: AlertTriangle },
  { id: 'changes', title: "10. Siyosat o'zgarishlari", icon: FileText },
  { id: 'contact', title: "11. Bog'lanish", icon: Mail },
];

const DATA_CATEGORIES = [
  {
    title: "Shaxsiy ma'lumotlar",
    items: [
      'Ism va familiya',
      'Email manzil',
      'Telefon raqami',
      'Tugilgan sana',
      'Jins',
      'Profil rasmi',
    ],
  },
  {
    title: "Professional ma'lumotlar",
    items: [
      'Ish tajribasi',
      "Ma'lumoti",
      'Ko\'nikmalar',
      'Sertifikatlar',
      'Rezyume va CV',
      'Portfolio',
    ],
  },
  {
    title: "Texnik ma'lumotlar",
    items: [
      'IP manzil',
      'Qurilma ma\'lumotlari',
      'Brauzer turi',
      'Operatsion tizim',
      'Cookie fayllari',
      'Sessiya ma\'lumotlari',
    ],
  },
  {
    title: "Foydalanish ma'lumotlari",
    items: [
      'Kirish vaqtlari',
      'Sahifalar ko\'rish',
      'Qidiruv so\'rovlari',
      'Ariza topshirishlar',
      'Saqlangan ishlar',
      'Chat tarixi',
    ],
  },
];

const DATA_USAGE_PURPOSES = [
  {
    purpose: "Xizmat ko'rsatish",
    description: "Platforma xizmatlarini taqdim etish, hisob qaydnomasini boshqarish va arizalarni qayta ishlash",
    legalBasis: "Shartnoma bajarish",
  },
  {
    purpose: "Shaxsiylashtirish",
    description: "Tavsiyalar berish, kontentni moslashtirish va foydalanuvchi tajribasini yaxshilash",
    legalBasis: "Rozilik",
  },
  {
    purpose: "Aloqa",
    description: "Yangilanishlar, xabarlar va marketing ma'lumotlarini yuborish",
    legalBasis: "Rozilik / Qonuniy manfaat",
  },
  {
    purpose: "Xavfsizlik",
    description: "Firqaqlikni aniqlash, firibgarlikni oldini olish va hisoblarni himoyalash",
    legalBasis: "Qonuniy majburiyat",
  },
  {
    purpose: "Tahlil va takomillashtirish",
    description: "Platforma samaradorligini o'rganish va xizmatlarni yaxshilash",
    legalBasis: "Qonuniy manfaat",
  },
];

const USER_RIGHTS = [
  {
    right: "Kirish huquqi",
    description: "O'z shaxsiy ma'lumotlaringizga nusxa olish",
  },
  {
    right: "Tuzatish huquqi",
    description: "Noto'g'ri ma'lumotlarni tuzatish",
  },
  {
    right: "O'chirish huquqi",
    description: "Shaxsiy ma'lumotlaringizni o'chirishni talab qilish",
  },
  {
    right: "Cheklash huquqi",
    description: "Ma'lumotlaringizdan foydalanishni cheklash",
  },
  {
    right: "E'tiroz huquqi",
    description: "Ma'lumotlaringizdan foydalanishga qarshi chiqish",
  },
  {
    right: "Ko'chirish huquqi",
    description: "Ma'lumotlaringizni boshqa xizmatga ko'chirish",
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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

export default function PrivacyPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Maxfiylik siyosati
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Maxfiylik siyosati
            </h1>
            <p className="text-blue-100/80 text-lg">
              So'nggi yangilanish: {LAST_UPDATED}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">Mundarija</h3>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <nav className="p-4 space-y-1">
                        {TABLE_OF_CONTENTS.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">{item.title}</span>
                          </button>
                        ))}
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="mt-4 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Savollaringiz bormi?</h4>
                    <p className="text-sm text-blue-100 mb-4">
                      Maxfiylik bo'yicha savollaringizga javob olish uchun biz bilan bog'laning
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Xabar yuborish
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Introduction */}
                <motion.div id="intro" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Kirish</h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        SINERGIYA ("biz", "bizning" yoki "platforma") foydalanuvchilarimizning maxfiyligini jiddiy qabul qiladi. Ushbu Maxfiylik Siyosati biz shaxsiy ma'lumotlaringizni qanday yig'amiz, ishlatamiz, saqlaymiz va himoya qilishimizni tushuntiradi.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Platformamizdan foydalanish orqali siz ushbu siyosat shartlarini qabul qilasiz. Agar siz ushbu siyosatning biron bir qismiga rozi bo'lmasangiz, iltimos, platformadan foydalanishni to'xtating.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Muhim:</strong> Ushbu siyosat O'zbekiston Respublikasi qonunchiligi va GDPR (Yevropa Ittifoqi) talablariga muvofiq ishlab chiqilgan.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Data Collection */}
                <motion.div id="data-collected" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Qanday ma'lumotlar to'planadi</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Biz quyidagi toifadagi ma'lumotlarni to'plashimiz mumkin:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {DATA_CATEGORIES.map((category, index) => (
                          <div key={index} className="bg-slate-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                            <ul className="space-y-1.5">
                              {category.items.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Maxsus toifadagi ma'lumotlar</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              Biz etnik kelib chiqish, diniy e'tiqod, sog'liq holati yoki jinsiy orientatsiya kabi sezgir ma'lumotlarni faqat sizning aniq roziligingiz bilan va qonuniy maqsadlar uchun to'playmiz.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Data Usage */}
                <motion.div id="data-usage" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ma'lumotlardan qanday foydalaniladi</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Yig'ilgan ma'lumotlar quyidagi maqsadlar uchun ishlatiladi:
                      </p>

                      <div className="space-y-4">
                        {DATA_USAGE_PURPOSES.map((purpose, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{purpose.purpose}</h3>
                                <Badge variant="secondary" className="text-xs">{purpose.legalBasis}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{purpose.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Data Sharing */}
                <motion.div id="data-sharing" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ma'lumotlar kimlar bilan ulashiladi</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Biz sizning shaxsiy ma'lumotlaringizni quyidagi holatlarda uchinchi tomonlar bilan ulashamiz:
                      </p>

                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Ish beruvchilar</h3>
                          <p className="text-sm text-gray-600">
                            Ish uchun ariza topshirganingizda, ish beruvchi sizning profil ma'lumotlaringizga kirish imkoniyatiga ega bo'ladi. Bu sizning ism-sharifingiz, rezyumengiz, tajribangiz va ko'nikmalaringizni o'z ichiga oladi.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Xizmat ko'rsatuvchilar</h3>
                          <p className="text-sm text-gray-600">
                            Biz bulutli saqlash, elektron pochta yuborish, to'lov qabul qilish va tahlil xizmatlarini taqdim etuvchi ishonchli uchinchi tomon kompaniyalari bilan hamkorlik qilamiz.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Huquqni muhofaza qiluvchi organlar</h3>
                          <p className="text-sm text-gray-600">
                            Qonuniy talabnomalar, sud buyruqlari yoki davlat organlarining rasmiy so'rovlari bo'yicha ma'lumotlarni taqdim etishimiz mumkin.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                          <strong>Diqqat:</strong> Biz hech qachon sizning shaxsiy ma'lumotlaringizni uchinchi tomonlar sotish uchun sotmaymiz yoki ulashmaymiz.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Data Security */}
                <motion.div id="data-security" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Ma'lumotlarni himoya qilish</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Ma'lumotlaringiz xavfsizligi bizning ustuvor vazifamizdir. Biz quyidagi xavfsizlik choralari qo'llaymiz:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          'SSL/TLS shifrlash',
                          'Ikki faktorli autentifikatsiya',
                          'Muntazam xavfsizlik auditlari',
                          'Ma\'lumotlarni shifrlash',
                          'Xavfsiz serverlar',
                          'Kirish nazorati',
                          'Zahira nusxalar',
                          'Xodimlar tayyorgarligi',
                        ].map((measure, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                            <span className="text-gray-700">{measure}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Ma'lumot:</strong> Internet orqali uzatish 100% xavfsiz emas. Biroq, biz ma'lumotlaringizni himoya qilish uchun tijorat jihatidan oqilona choralar qo'llaymiz.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* User Rights */}
                <motion.div id="user-rights" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Foydalanuvchi huquqlari</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Siz quyidagi huquqlarga egasiz:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {USER_RIGHTS.map((right, index) => (
                          <Card key={index} className="border-0 shadow-md">
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-1">{right.right}</h3>
                              <p className="text-sm text-gray-600">{right.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-indigo-900 mb-2">Huquqlaringizni qanday amalga oshirish mumkin</h4>
                        <p className="text-sm text-indigo-800 mb-4">
                          Yuqoridagi huquqlardan birortasidan foydalanish uchun iltimos, bizga quyidagi manzilga murojaat qiling:
                        </p>
                        <div className="flex items-center gap-2 text-sm text-indigo-800">
                          <Mail className="w-4 h-4" />
                          <span>privacy@SINERGIYA</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cookies */}
                <motion.div id="cookies" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies va kuzatuv texnologiyalari</h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Biz platformamizning ishlashini ta'minlash, foydalanuvchi tajribasini yaxshilash va tahlil qilish uchun cookie fayllaridan va o'xshash texnologiyalardan foydalanamiz.
                      </p>

                      <div className="space-y-3">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Zaruriy cookies</h3>
                          <p className="text-sm text-gray-600">
                            Platformaning asosiy funksiyalari uchun zarur. O'chirilganida platforma to'g'ri ishlamaydi.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Funksional cookies</h3>
                          <p className="text-sm text-gray-600">
                            Til sozlamalari va foydalanuvchi afzalliklarini saqlaydi.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Analitik cookies</h3>
                          <p className="text-sm text-gray-600">
                            Platformadan qanday foydalanish haqida ma'lumot to'playdi va xizmatlarimizni yaxshilashga yordam beradi.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Marketing cookies</h3>
                          <p className="text-sm text-gray-600">
                            Sizga mos reklamalarni ko'rsatish uchun ishlatiladi.
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mt-4">
                        Brauzer sozlamalari orqali cookies ni boshqarishingiz mumkin. Cookie fayllarini to'liq o'chirib qo'yish ba'zi platforma funksiyalarining ishlashiga ta'sir qilishi mumkin.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact */}
                <motion.div id="contact" variants={itemVariants}>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-4">11. Bog'lanish</h2>
                      <p className="text-blue-100 mb-6 leading-relaxed">
                        Maxfiylik siyosati bo'yicha savollaringiz yoki tashvishlaringiz bo'lsa, iltimos, biz bilan bog'laning:
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-200">Email</p>
                            <p className="font-medium">privacy@SINERGIYA</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-200">Manzil</p>
                            <p className="font-medium">Toshkent sh., Mustaqillik ko'chasi, 15</p>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6 bg-white/20" />

                      <p className="text-sm text-blue-200">
                        Bizga murojaatlaringizni 30 ish kuni ichida ko'rib chiqamiz va javob beramiz.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
