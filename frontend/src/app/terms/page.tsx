'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle,
  ChevronRight,
  Shield,
  Users,
  Briefcase,
  CreditCard,
  Ban,
  Gavel,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// ============================================================================
// Terms Data
// ============================================================================

const LAST_UPDATED = '2026-yil 28-mart';
const EFFECTIVE_DATE = '2026-yil 1-aprel';

const TABLE_OF_CONTENTS = [
  { id: 'acceptance', title: '1. Shartlarni qabul qilish', icon: CheckCircle },
  { id: 'definitions', title: "2. Ta'riflar", icon: FileText },
  { id: 'eligibility', title: "3. Munosabat talablari", icon: Users },
  { id: 'accounts', title: '4. Hisob qaydnomasi', icon: Shield },
  { id: 'services', title: "5. Xizmatlar ta'rifi", icon: Briefcase },
  { id: 'user-conduct', title: "6. Foydalanuvchi o'zaro aloqasi", icon: AlertCircle },
  { id: 'content', title: "7. Kontent va litsenziyalar", icon: FileText },
  { id: 'payments', title: "8. To'lov shartlari", icon: CreditCard },
  { id: 'termination', title: '9. Shartnomani bekor qilish', icon: Ban },
  { id: 'liability', title: "10. Javobgarlikni cheklash", icon: Scale },
  { id: 'disputes', title: '11. Nizo hal etish', icon: Gavel },
  { id: 'general', title: '12. Umumiy qoidalar', icon: FileText },
];

const PROHIBITED_ACTIVITIES = [
  "Boshqalarning hisob qaydnomasiga ruxsatsiz kirish",
  "Yolg'on, aldov yoki chalkashuvchi ma'lumotlarni yuborish",
  'Spam, firibgarlik yoki phishing',
  "Platforma xavfsizligini buzishga urinish",
  "Boshqalarning shaxsiy huquqlarini buzish",
  'Viruslar yoki zararli kodlarni tarqatish',
  'Platformani noto\'g\'ri maqsadlarda foydalanish',
  "Boshqa foydalanuvchilarni bezovta qilish",
  "Maxfiylik siyosatini buzish",
  'Qonun hujjatlariga zid harakatlar',
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

export default function TermsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Scale className="w-4 h-4 mr-2" />
              Foydalanish shartlari
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Foydalanish shartlari
            </h1>
            <p className="text-slate-300 text-lg">
              So'nggi yangilanish: {LAST_UPDATED} | Kuchga kirish: {EFFECTIVE_DATE}
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
                {/* Acceptance */}
                <motion.div id="acceptance" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Shartlarni qabul qilish</h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        SINERGIYA platformasiga kirish va undan foydalanish orqali siz quyidagi foydalanish shartlarini qabul qilasiz. Agar siz ushbu shartlarning biron biriga rozi bo'lmasangiz, iltimos, platformadan foydalanishni to'xtating.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Ushbu shartlar siz va SINERGIYA o'rtasidagi to'liq shartnoma shakllantiradi va platformadan foydalanish bo'yicha barcha oldingi kelishuvlarni almashtiradi.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Muhim:</strong> Platformadan foydalanish davomida ushbu shartlarga o'zgartirishlar kiritilishi mumkin. Muntazam ravishda yangilanishlarni kuzatib boring.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Definitions */}
                <motion.div id="definitions" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Ta'riflar</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Ushbu foydalanish shartlarida quyidagi atamalar quyidagi ma'nolarga ega:
                      </p>

                      <div className="grid gap-4">
                        {[
                          { term: '"Platforma"', def: 'SINERGIYA veb-sayti va unga tegishli barcha xizmatlar.' },
                          { term: '"Foydalanuvchi"', def: 'Platformaga ro\'yxatdan o\'tgan va undan foydalanayotgan har qanday shaxs.' },
                          { term: '"Talaba"', def: "O'z karyerasini boshlash yoki rivojlantirishni istagan o'quvchi yoki bitiruvchi." },
                          { term: '"Kompaniya"', def: "Platformada ish o'rinlari e'lon qiluvchi ish beruvchi yoki tashkilot." },
                          { term: '"Kontent"', def: "Platformaga yuklangan barcha ma'lumotlar, jumladan, matn, rasmlar, rezyumelar va boshqa materiallar." },
                          { term: '"Premium"', def: "Qo\'shimcha imkoniyatlarga ega bo'lgan to'lov xizmati." },
                        ].map((item, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <span className="font-semibold text-gray-900">{item.term}</span>
                            <span className="text-gray-600"> — {item.def}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Eligibility */}
                <motion.div id="eligibility" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Munosabat talablari</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Platformadan foydalanish uchun siz quyidagi talablarga javob berishingiz kerak:
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Yosh chegarasi</h3>
                            <p className="text-gray-600 text-sm">Siz kamida 16 yoshda bo'lishingiz kerak. Agar siz 18 yoshdan kichik bo'lsangiz, ota-onangiz yoki qonuniy vasiylaringizning roziligi talab qilinadi.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Huquqiy qobiliyat</h3>
                            <p className="text-gray-600 text-sm">Siz qonuniy ravishda shartnoma tuzish huquqiga ega bo'lishingiz kerak.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-gray-900">To'g'ri ma'lumot</h3>
                            <p className="text-gray-600 text-sm">Siz tomoningizdan taqdim etilgan barcha ma'lumotlar to'g'ri, to'liq va yangi bo'lishi kerak.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Bitta hisob</h3>
                            <p className="text-gray-600 text-sm">Har bir foydalanuvchi faqat bitta hisob qaydnomasiga ega bo'lishi mumkin.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Accounts */}
                <motion.div id="accounts" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Hisob qaydnomasi</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">4.1 Hisob yaratish</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Platformadan to'liq foydalanish uchun hisob qaydnomasi yaratishingiz kerak. Ro'yxatdan o'tish jarayonida siz to'g'ri va to'liq ma'lumotlarni taqdim etishingiz kerak.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">4.2 Hisob xavfsizligi</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Siz o'z hisobingiz va parolingiz xavfsizligi uchun javobgarsiz. Parolingizni hech kimga aytmang va shubhali faoliyat aniqlanganida darhol bizga xabar bering.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">4.3 Hisobni yopish</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Siz istalgan vaqtda hisobingizni yopish huquqiga egasiz. Hisob yopilganda ba'zi ma'lumotlar qonuniy talabnomalar asosida saqlanishi mumkin.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Services */}
                <motion.div id="services" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Xizmatlar ta'rifi</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        SINERGIYA quyidagi asosiy xizmatlarni taqdim etadi:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { title: 'Ish qidirish', desc: "Yuzlab ish o'rinlarini qidirish va filtrlash" },
                          { title: 'Ariza topshirish', desc: "Onlayn ariza topshirish jarayoni" },
                          { title: 'Profil yaratish', desc: "Professional onlayn rezyume yaratish" },
                          { title: 'Kompaniyalar', desc: "Ish beruvchilar haqida ma'lumot" },
                          { title: 'Karyera maslahati', desc: "AI yordamchi va maslahatchilar" },
                          { title: 'Networking', desc: "Professional aloqalar o'rnatish" },
                        ].map((service, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Xizmat cheklamalari</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              Ba'zi xizmatlar faqat Premium obunachilar uchun mavjud. Bepul foydalanuvchilar uchun kunlik va oylik cheklamalar qo'llaniladi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* User Conduct */}
                <motion.div id="user-conduct" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Foydalanuvchi o'zaro aloqasi</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Platformadan foydalanishda siz quyidagi qoidalariga rioya qilishingiz kerak:
                      </p>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                          <Ban className="w-5 h-5" />
                          Taqiqlangan faoliyatlar
                        </h3>
                        <ul className="space-y-2">
                          {PROHIBITED_ACTIVITIES.map((activity, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-red-700">
                              <Ban className="w-4 h-4 shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-gray-600 mt-6 text-sm leading-relaxed">
                        Ushbu qoidalarni buzish hisobingizni vaqtinchalik to'xtatish yoki butunlay yopishga olib kelishi mumkin.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Content */}
                <motion.div id="content" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Kontent va litsenziyalar</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">7.1 Kontent huquqlari</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Platformaga yuklangan kontent uchun siz javobgarsiz. Siz yuklagan kontent uchinchi tomonning huquqlarini buzmasligini kafolatlaysiz.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">7.2 Litsenziya</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Platformaga kontent yuklash orqali siz bizga ushbu kontentni ko'rsatish, tarqatish va saqlash uchun zarur litsenziyani taqdim etasiz.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">7.3 Kontentni olib tashlash</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Biz har qanday vaqtda qoidalarni buzuvchi kontentni olib tashlash huquqini o'zimizda saqlab qolamiz.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Payments */}
                <motion.div id="payments" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">8. To'lov shartlari</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">8.1 To'lov usullari</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Biz bank kartalari, elektron hamyonlar va boshqa to'lov usullarini qabul qilamiz. Barcha to'lovlar xavfsiz ulanish orqali amalga oshiriladi.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">8.2 Obunalar</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Premium obunalar avtomatik ravishda yangilanadi. Obunani istalgan vaqtda bekor qilishingiz mumkin.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">8.3 Qaytarish siyosati</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            To'lovlar qaytarilmaydi, faqat maxsus holatlarda istisnolar mumkin. Batafsil ma'lumot uchun qo'llab-quvvatlash xizmatiga murojaat qiling.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Termination */}
                <motion.div id="termination" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Shartnomani bekor qilish</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Biz yoki siz ushbu shartnomani istalgan vaqtda bekor qilish huquqiga egasiz:
                      </p>

                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Foydalanuvchi tomonidan bekor qilish</h3>
                          <p className="text-sm text-gray-600">
                            Siz hisob sozlamalaridan o'z hisobingizni yopishingiz yoki bizga xabar berishingiz mumkin.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Platforma tomonidan bekor qilish</h3>
                          <p className="text-sm text-gray-600">
                            Qoidabuzarlik holatlarida biz ogohlantirishsiz hisobingizni to'xtatish yoki yopish huquqiga egamiz.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Oqibatlar</h3>
                          <p className="text-sm text-gray-600">
                            Shartnoma bekor qilinganda siz platformaga kirish huquqingizni yo'qotasiz va ba'zi ma'lumotlar o'chiriladi.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Liability */}
                <motion.div id="liability" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Javobgarlikni cheklash</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Platforma qonuniy ravishda ruxsat etilgan maksimal darajada taqdim etiladi:
                      </p>

                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Kafolatsizlik</h3>
                          <p className="text-sm text-gray-600">
                            Biz platformaning uzluksiz, xavfsiz yoki xatosiz ishlashini kafolatlamaymiz.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Javobgarlikni cheklash</h3>
                          <p className="text-sm text-gray-600">
                            Biz to'plangan yoki yo'qolgan ma'lumotlar, daromad yo'qotish yoki biznes faoliyatining to'xtab qolishi uchun javobgar emasmiz.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-2">Uchinchi tomon havolalari</h3>
                          <p className="text-sm text-gray-600">
                            Platformada uchinchi tomon saytlariga havolalar bo'lishi mumkin. Biz ular mazmuni uchun javobgar emasmiz.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Disputes */}
                <motion.div id="disputes" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Nizo hal etish</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Ushbu shartnoma bo'yicha kelib chiqish mumkin bo'lgan nizolar quyidagi tartibda hal etiladi:
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-blue-600 font-bold text-sm">1</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Sulh</h3>
                            <p className="text-sm text-gray-600">Tomonlar avvalo nizoni o'zaro muzokaralar yo'li bilan hal qilishga harakat qilishadi.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-blue-600 font-bold text-sm">2</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Arbitrage</h3>
                            <p className="text-sm text-gray-600">Sulh erishilmagan taqdirda, nizo O'zbekiston Respublikasi qonunchiligiga muvofiq arbitrage sudiga taqdim etiladi.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-blue-600 font-bold text-sm">3</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Sud</h3>
                            <p className="text-sm text-gray-600">Arbitrage hal qilmagan taqdirda, nizo Toshkent shahar sudida ko'rib chiqiladi.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Qo'llaniladigan qonun:</strong> Ushbu shartnoma O'zbekiston Respublikasi qonunchiligiga muvofiq talqin qilinadi va bajariladi.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* General */}
                <motion.div id="general" variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Umumiy qoidalar</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">12.1 Shartlarning butunligi</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Agar ushbu shartlarning biron bir qismi qonuniy jihatdan yaroqsiz bo'lsa, qolgan qismlar to'liq kuchga ega bo'ladi.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">12.2 Huquqlardan voz kechish</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Biror huquqni amalga oshirmaslik kelajakda ushbu huquqni amalga oshirish huquqini yo'qotish anglatmaydi.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">12.3 Tabiiy holatlar</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Tabiat hodisalari, urushlar, qamal va boshqa ojiz qiluvchi holatlar natijasida majburiyatlarni bajarmaslik uchun javobgarlikka tortilmaydi.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">12.4 Vakolat topshirish</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Siz ushbu shartnoma bo'yicha huquqlaringizni uchinchi tomonlarga topshirolmaysiz.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">12.5 Aloqa</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Shartlar bo'yicha savollar uchun iltimos, biz bilan quyidagi manzil orqali bog'laning: legal@SINERGIYA
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Final CTA */}
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <CardContent className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Savollaringiz bormi?</h2>
                      <p className="text-blue-100 mb-6">
                        Foydalanish shartlari bo'yicha qo'shimcha ma'lumot olish uchun biz bilan bog'laning
                      </p>
                      <Button variant="secondary" size="lg" className="gap-2">
                        <Mail className="w-4 h-4" />
                        Biz bilan bog'lanish
                      </Button>
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
