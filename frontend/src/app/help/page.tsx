'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  HelpCircle, 
  Book, 
  Video, 
  MessageSquare, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  FileText,
  Shield,
  Settings,
  User,
  Briefcase,
  CreditCard,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Play,
  Download,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// Help Center Data
// ============================================================================

const HELP_CATEGORIES = [
  {
    id: 'getting-started',
    title: "Boshlang'ich yo'riqnoma",
    description: "Platformadan foydalanishni boshlash uchun asosiy qadamlar",
    icon: Book,
    articles: 12,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'account',
    title: 'Hisob sozlamalari',
    description: 'Profil yaratish, tahrirlash va sozlamalarni boshqarish',
    icon: User,
    articles: 8,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'jobs',
    title: 'Ish qidirish',
    description: "Ish e'lonlarini qidirish, filtrlash va ariza topshirish",
    icon: Briefcase,
    articles: 15,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'applications',
    title: 'Arizalar',
    description: 'Ariza holatini kuzatish va boshqarish',
    icon: FileText,
    articles: 10,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'payments',
    title: "To'lovlar",
    description: "To'lov usullari, tariflar va hisob kitob",
    icon: CreditCard,
    articles: 6,
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'security',
    title: 'Xavfsizlik',
    description: 'Hisobingizni himoya qilish va maxfiylik sozlamalari',
    icon: Shield,
    articles: 9,
    color: 'from-red-500 to-red-600',
  },
];

const POPULAR_ARTICLES = [
  {
    id: 1,
    title: "Profilni qanday yaratish kerak?",
    category: 'account',
    views: 15432,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Ish uchun ariza topshirish jarayoni",
    category: 'jobs',
    views: 12876,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Rezyume yuklash bo'yicha qo'llanma",
    category: 'jobs',
    views: 11234,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Parolni qanday tiklash kerak?",
    category: 'security',
    views: 9876,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Premium obunaning afzalliklari",
    category: 'payments',
    views: 8654,
    rating: 4.8,
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: "SINERGIYA dan foydalanish bepulmi?",
    answer: "Ha, SINERGIYA da asosiy xizmatlar bepul. Ish qidirish, profil yaratish va arizalar topshirish bepul. Biroq, Premium obuna orqali qo'shimcha imkoniyatlarga ega bo'lishingiz mumkin.",
    category: 'general',
  },
  {
    id: 2,
    question: "Profilimni qanday tahrirlashim mumkin?",
    answer: "Profil sahifasiga o'tib, 'Tahrirlash' tugmasini bosing. Bu erda shaxsiy ma'lumotlaringiz, tajriba, ko'nikmalar va boshqa ma'lumotlarni yangilashingiz mumkin.",
    category: 'account',
  },
  {
    id: 3,
    question: "Ish uchun necha marta ariza topshira olaman?",
    answer: "Bepul foydalanuvchilar kuniga 10 ta ariza topshirishlari mumkin. Premium foydalanuvchilar esa cheksiz ariza topshirish imkoniyatiga ega.",
    category: 'jobs',
  },
  {
    id: 4,
    question: "Ariza holatini qanday kuzatish mumkin?",
    answer: "'Mening arizalarim' bo'limiga o'tib, barcha topshirilgan arizalar holatini real vaqt rejimida ko'rishingiz mumkin.",
    category: 'applications',
  },
  {
    id: 5,
    question: "Kompaniyalar meni qanday topishadi?",
    answer: "Profil sozlamalarida 'Ish qidirish' rejimini yoqing. Shuningdek, ko'nikmalaringiz va tajribangizni to'liq ko'rsating.",
    category: 'jobs',
  },
  {
    id: 6,
    question: "Premium obunani qanday bekor qilish mumkin?",
    answer: "'Sozlamalar' > 'Obuna' bo'limiga o'tib, 'Bekor qilish' tugmasini bosing. Joriy davr oxirida obunangiz bekor qilinadi.",
    category: 'payments',
  },
  {
    id: 7,
    question: "Parolimni unutdim, nima qilishim kerak?",
    answer: "Kirish sahifasida 'Parolni unutdingizmi?' havolasini bosing. Email manzilingizga tiklash havolasi yuboriladi.",
    category: 'security',
  },
  {
    id: 8,
    question: "Mobil ilovangiz bormi?",
    answer: "Ha, iOS va Android uchun mobil ilovalarimiz mavjud. App Store yoki Google Play dan 'SINERGIYA' ni qidirib topishingiz mumkin.",
    category: 'general',
  },
];

const VIDEO_TUTORIALS = [
  {
    id: 1,
    title: "SINERGIYA dan ilk foydalanish",
    duration: "5:32",
    thumbnail: "/tutorials/tutorial-1.jpg",
    views: 12543,
  },
  {
    id: 2,
    title: "Mukammal profil yaratish",
    duration: "8:15",
    thumbnail: "/tutorials/tutorial-2.jpg",
    views: 9876,
  },
  {
    id: 3,
    title: "Ish qidirish va filtrlash",
    duration: "4:48",
    thumbnail: "/tutorials/tutorial-3.jpg",
    views: 7654,
  },
  {
    id: 4,
    title: "Ariza topshirish strategiyasi",
    duration: "6:22",
    thumbnail: "/tutorials/tutorial-4.jpg",
    views: 6543,
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

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sizga qanday yordam berishimiz mumkin?
            </h1>
            <p className="text-lg text-blue-100/80 mb-8">
              Ko'p beriladigan savollar, qo'llanmalar va video darslarni toping
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Savolingizni qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-white border-0 shadow-xl rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HELP_CATEGORIES.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/help/${category.id}`}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{category.articles} maqola</Badge>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Mashhur maqolalar
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {POPULAR_ARTICLES.map((article, index) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Link href={`/help/article/${article.id}`}>
                    <Card className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-gray-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <Badge variant="outline" className="text-xs">
                                {HELP_CATEGORIES.find(c => c.id === article.category)?.title}
                              </Badge>
                              <span>{article.views.toLocaleString()} ko'rish</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                {article.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Ko'p beriladigan savollar
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {['all', 'general', 'account', 'jobs', 'applications', 'payments', 'security'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-blue-600' : ''}
                >
                  {cat === 'all' ? "Barchasi" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>

            {/* FAQ Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <Card className="border-0 shadow-md overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${
                          expandedFaq === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-0 pb-6 px-6">
                            <Separator className="mb-4" />
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm text-gray-500">Bu ma'lumot foydali bo'ldimi?</span>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ThumbsUp className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ThumbsDown className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Sizning so'rovingiz bo'yicha natija topilmadi</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Video className="w-6 h-6 text-red-500" />
            Video qo'llanmalar
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VIDEO_TUTORIALS.map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-blue-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {video.views.toLocaleString()} marta ko'rildi
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button variant="outline" className="gap-2">
              Barcha videolarni ko'rish
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                  <h2 className="text-2xl font-bold mb-4">Yordam kerakmi?</h2>
                  <p className="text-blue-100 mb-8">
                    Javob topa olmadingizmi? Qo'llab-quvvatlash jamoamiz sizga yordam berishga tayyor.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Email</p>
                        <p className="font-medium">support@SINERGIYA</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Telefon</p>
                        <p className="font-medium">+998 (78) 123-45-67</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Online chat</p>
                        <p className="font-medium">Dushanba - Shanba, 9:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Xabar yuborish
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Ismingiz" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email manzilingiz" />
                    </div>
                    <div>
                      <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Mavzu tanlang</option>
                        <option>Hisob bilan bog'liq</option>
                        <option>Ish qidirish</option>
                        <option>Texnik muammo</option>
                        <option>Boshqa</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        placeholder="Xabaringiz..."
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Yuborish
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
