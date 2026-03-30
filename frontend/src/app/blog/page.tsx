"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: "1",
      title: "Karyerani boshlash: Yangi boshlanuvchilar uchun 10 ta maslahat",
      excerpt: "Universitetni tugatdingiz va ish izlayapsizmi? Mana sizga muvaffaqiyatli karyera boshlash uchun eng muhim maslahatlar.",
      content: `Karyerani boshlash - hayotdagi eng muhim qadamlardan biri. Ko'pchilik uchun bu jarayon qo'rqinchli va noaniq bo'lishi mumkin, lekin to'g'ri yondashuv bilan siz o'z maqsadlaringizga erishishingiz mumkin.

## 1. O'z maqsadlaringizni aniqlang

Karyerani boshlashdan oldin, nimaga erishmoqchi ekanligingizni aniq tushunib oling. Qaysi sohada ishlashni xohlaysiz? Qanday lavozimga erishishni maqsad qilmoqdasiz?

## 2. Rezyumeni professional yozing

Rezyume - bu sizning professional profilingiz. U quyidagi bo'limlarni o'z ichiga olishi kerak:
- Shaxsiy ma'lumotlar
- Maqsad yoki summary
- Ta'lim
- Ish tajribasi
- Ko'nikmalar
- Sertifikatlar va mukofotlar

## 3. LinkedIn profilingizni optimallashtiring

Zamonaviy dunyoda LinkedIn - bu professional tarmoqning eng muhim vositasi. Profilingizni to'liq to'ldiring, professional surat qo'ying va muntazam faol bo'ling.

## 4. Networking boshlang

Professional aloqalar o'rnatish karyerangizda muhim rol o'ynaydi. Uchrashuvlarga qo'shiling, online hamjamiyatlarda faol bo'ling, soha mutaxassislari bilan aloqada bo'ling.

## 5. Amaliyot tajribasi to'plang

Amaliyot - bu nafaqat bilimlaringizni mustahkamlash, balki real ish muhitida tajriba to'plash imkoniyati. Stajirovka, vazifalar va loyihalar orqali tajribangizni oshiring.

## 6. Soft skills rivojlantiring

Texnik bilimlar muhim, lekin soft skills ham shunchalik zarur. Kommunikatsiya, jamoada ishlash, muammolarni yechish va time management ko'nikmalarini rivojlantiring.

## 7. Doim o'rganing

Dunyo doimo o'zgarib turadi, shuning uchun doimiy o'rganish muhim. Online kurslar, seminarlar, kitoblar va professional adabiyotlar orqali bilimlaringizni yangilab boring.

## 8. Portfolio yarating

Qilgan ishlaringizni namoyish etish uchun portfolio yarating. Bu ayniqsa dasturchilar, dizaynerlar va kontent yaratuvchilar uchun muhim.

## 9. Intervyuga tayyorlaning

Intervyu - bu jarayon, unga tayyorgarlik talab qiladi. Keng tarqalgan savollarga tayyorlaning, kompaniya haqida o'rganing va o'zingizni ishonchli namoyish eting.

## 10. Sog'lom muvozanatni saqlang

Karyera muhim, lekin sog'ligingiz va shaxsiy hayotingiz ham shunchalik qimmatli. Ish va hayot o'rtasida sog'lom muvozanatni saqlang.

Xulosa qilib aytganda, karyerani boshlash - bu doimiy rivojlanish jarayoni. Sabr-toqat, ijodkorlik va ishtiyoq bilan siz o'z maqsadlaringizga erishasiz. SINERGIYA platformasi sizga bu yo'lda yordam berishga tayyor!`,
      author: "Dr. Alisher Karimov",
      date: "2024-03-20",
      readTime: "8 daqiqa",
      category: "Karyera",
      tags: ["yangi boshlanuvchilar", "maslahatlar", "karyera"],
    },
    {
      id: "2",
      title: "2024-yilda eng talab qilinadigan IT ko'nikmalari",
      excerpt: "Texnologiya dunyosi tez o'zgaradi. Qaysi ko'nikmalarni o'rganish 2024-yilda eng foydali bo'ladi?",
      content: `IT sohasi har yili yangi texnologiyalar va yo'nalishlar bilan boyiydi. 2024-yilda quyidagi ko'nikmalar eng talab qilinadiganlar qatoriga kiradi:

## Sun'iy intellekt va Machine Learning

AI/ML butun dunyo bo'ylab kompaniyalarning asosiy ustuvorligi bo'lib qolmoqda. Python, TensorFlow, PyTorch va scikit-learn kabi vositalarni bilish talab etiladi.

## Bulutli texnologiyalar

AWS, Azure va Google Cloud kabi platformalar bo'yicha tajriba kritik ahamiyatga ega. Multi-cloud strategiyalari ham tobora ommalashmoqda.

## Kiberxavfsizlik

Xavfsizlik har doimgidek muhim. Ethical hacking, xavfsizlik audit va compliance bo'yicha mutaxassislar talab qilinmoqda.

## Data Science va Analytics

Ma'lumotlardan qiymat olish uchun SQL, Python, R va vizualizatsiya vositalarini bilish kerak.

## DevOps va CI/CD

Jenkins, GitLab CI, Docker va Kubernetes kabi vositalar zamonaviy ishlab chiqish jarayonlarining ajralmas qismi.

Bu ko'nikmalarni o'rganish orqali 2024-yilda muvaffaqiyatli IT karyerasini boshlashingiz mumkin.`,
      author: "Jasur Toshmatov",
      date: "2024-03-18",
      readTime: "5 daqiqa",
      category: "Texnologiya",
      tags: ["IT", "ko'nikmalar", "2024"],
    },
    {
      id: "3",
      title: "Intervyuda muvaffaqiyat qozonish: 7 ta qoida",
      excerpt: "Orzu qilgan ishingizga olish uchun intervyuda ajralib turishingiz kerak. Mana eng muhim strategiyalar.",
      content: `Intervyu - bu nafaqat bilimlaringizni, balki shaxsingizni ham namoyish etish imkoniyati. Muvaffaqiyatli intervyu o'tkazish uchun quyidagi qoidalarga amal qiling:

## 1. Kompaniya haqida o'rganing

Intervyudan oldin kompaniyaning faoliyati, qadriyatlari va so'nggi yangiliklari haqida ma'lumot to'plang. Bu sizning qiziqishingizni ko'rsatadi.

## 2. Keng tarqalgan savollarga tayyorlaning

"O'zingizni tanishtiring", "Kuchli va kuchsiz tomonlaringiz", "5 yildan keyin qayerda ko'rasiz" kabi savollarga javoblaringizni oldindan tayyorlang.

## 3. STAR usulidan foydalaning

Tajribangizni tasvirlash uchun STAR (Situation, Task, Action, Result) usulidan foydalaning. Bu aniq va samarali javob berishga yordam beradi.

## 4. Professional kiyinishingiz

Kiyimingiz kompaniya madaniyatiga mos kelishi kerak. Agar noma'lum bo'lsa, professional-liberal stil tanlang.

## 5. Vaqtida kelish

Kech qolish birinchi taassurotni buzadi. Intervyu vaqtidan 10-15 daqiqa oldin kelishga harakat qiling.

## 6. O'ziga ishonch bilan gapiring

Javoblaringizga ishonch bilan gapiring, lekin takabburlik qilmang. Ko'zga qarab, tabassum qilib gapiring.

## 7. Savollar bering

Intervyu oxirida sizga savollar berish imkoniyati taqdim etiladi. Bu kompaniya va lavozim haqida savollar bering. Bu sizning qiziqishingizni namoyish etadi.

Bu qoidalarga rioya qilish orqali intervyuda muvaffaqiyat qozonish imkoniyatingizni sezilarli darajada oshirasiz.`,
      author: "Dilnoza Rakhimova",
      date: "2024-03-15",
      readTime: "6 daqiqa",
      category: "Intervyu",
      tags: ["intervyu", "maslahatlar", "ish topish"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Karyera rivojlantirish, ish topish strategiyalari va professional o'sish haqida foydali maqolalar
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge>{post.category}</Badge>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString("uz-UZ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="gap-2">
                    Batafsil o'qish <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
