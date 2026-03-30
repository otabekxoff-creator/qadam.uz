'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FolderTree as SitemapIcon, 
  Home, 
  User, 
  Briefcase, 
  Building2, 
  MessageSquare,
  FileText,
  Shield,
  Scale,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Search,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// Sitemap Data
// ============================================================================

const SITE_SECTIONS = [
  {
    title: 'Asosiy sahifalar',
    icon: Home,
    links: [
      { name: 'Bosh sahifa', href: '/', description: 'Platforma haqida umumiy ma\'lumot' },
      { name: 'Ishlar', href: '/jobs', description: "Barcha ish o'rinlari" },
      { name: 'Kompaniyalar', href: '/companies', description: 'Ish beruvchilar ro\'yxati' },
      { name: 'Blog', href: '/blog', description: 'Karyera maslahatlari va yangiliklar' },
      { name: 'Narxlar', href: '/pricing', description: 'Obuna tariflari' },
    ],
  },
  {
    title: 'Foydalanuvchi sahifalari',
    icon: User,
    links: [
      { name: 'Kirish', href: '/login', description: 'Hisobga kirish' },
      { name: 'Ro\'yxatdan o\'tish', href: '/register', description: 'Yangi hisob yaratish' },
      { name: 'Profil', href: '/profile', description: 'Shaxsiy profil' },
      { name: 'Mening arizalarim', href: '/dashboard/applications', description: 'Ariza holati' },
      { name: 'Saqlangan ishlar', href: '/dashboard/saved-jobs', description: 'Tanlangan ishlar' },
      { name: 'Sozlamalar', href: '/settings', description: 'Hisob sozlamalari' },
    ],
  },
  {
    title: 'Kompaniya sahifalari',
    icon: Building2,
    links: [
      { name: 'Kompaniya dashboard', href: '/dashboard/company', description: 'Boshqaruv paneli' },
      { name: 'Ish joylash', href: '/dashboard/company/jobs/create', description: "Yangi vakansiya e'lon qilish" },
      { name: 'Mening ishlarim', href: '/dashboard/company/jobs', description: "E'lon qilingan ishlar" },
      { name: 'Arizalar', href: '/dashboard/company/applications', description: 'Kelib tushgan arizalar' },
      { name: 'Kompaniya profili', href: '/company/profile', description: 'Kompaniya sahifasi' },
    ],
  },
  {
    title: 'Aloqa va qo\'llab-quvvatlash',
    icon: MessageSquare,
    links: [
      { name: 'Yordam markazi', href: '/help', description: 'Qo\'llanmalar va FAQ' },
      { name: 'Biz bilan bog\'lanish', href: '/contact', description: 'Aloqa ma\'lumotlari' },
      { name: 'Chat', href: '/chat', description: 'Xabar almashish' },
      { name: 'Bildirishnomalar', href: '/notifications', description: 'Xabarlar markazi' },
    ],
  },
  {
    title: 'Huquqiy sahifalar',
    icon: Shield,
    links: [
      { name: 'Maxfiylik siyosati', href: '/privacy', description: 'Ma\'lumotlarni himoya qilish' },
      { name: 'Foydalanish shartlari', href: '/terms', description: 'Platforma qoidalari' },
      { name: 'Cookie siyosati', href: '/cookies', description: 'Cookie fayllar haqida' },
      { name: 'Xavfsilik', href: '/security', description: 'Xavfsilik amaliyotlari' },
    ],
  },
  {
    title: 'Kompaniya haqida',
    icon: Building2,
    links: [
      { name: 'Biz haqimizda', href: '/about', description: 'Kompaniya haqida' },
      { name: 'Jamoa', href: '/team', description: 'Bizning jamoa' },
      { name: 'Karyera', href: '/careers', description: 'Ish o\'rinlari' },
      { name: 'Hamkorlar', href: '/partners', description: 'Hamkorlik dasturi' },
      { name: 'Matbuot', href: '/press', description: 'Yangiliklar va media' },
    ],
  },
];

const QUICK_LINKS = [
  { name: 'Premium', href: '/pricing', badge: 'Yangi' },
  { name: 'AI yordamchi', href: '/ai-assistant', badge: null },
  { name: 'Rezyume yaratish', href: '/resume-builder', badge: null },
  { name: 'Intervyu tayyorgarlik', href: '/interview-prep', badge: null },
  { name: 'Maosh kalkulyatori', href: '/salary-calculator', badge: null },
  { name: 'Karyera yo\'nalishlari', href: '/career-paths', badge: 'Mashhur' },
];

const POPULAR_SEARCHES = [
  'Frontend developer',
  'Backend developer',
  'UI/UX designer',
  'Project manager',
  'Data analyst',
  'Marketing specialist',
  'Tashkent',
  'Remote',
  'Full-time',
  'Junior',
  'Senior',
  'O\'zbek tilida',
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

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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
              <SitemapIcon className="w-4 h-4 mr-2" />
              Sayt xaritasi
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sayt xaritasi
            </h1>
            <p className="text-slate-300 text-lg">
              Barcha sahifalar va bo'limlarni bir joyda toping
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Sahifani qidiring..."
                className="pl-12 pr-4 py-6 text-base bg-white border-0 shadow-xl rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Tezkor havolalar
            </h2>
            <div className="flex flex-wrap gap-3">
              {QUICK_LINKS.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Badge 
                    variant="secondary" 
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                        {link.badge}
                      </span>
                    )}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Sitemap */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SITE_SECTIONS.map((section) => (
              <motion.div key={section.title} variants={itemVariants}>
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="group flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 group-hover:text-blue-600 transition-colors" />
                            <div>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                {link.name}
                              </span>
                              <p className="text-xs text-gray-500">{link.description}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Mashhur qidiruvlar
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {POPULAR_SEARCHES.map((term) => (
                <Link key={term} href={`/jobs?search=${encodeURIComponent(term)}`}>
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {term}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Aloqa ma'lumotlari</h2>
              <p className="text-slate-400">
                Savollaringiz bormi? Biz bilan bog'laning
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-slate-400">support@step.uz</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <p className="text-sm text-slate-400">+998 (78) 123-45-67</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Manzil</h3>
                  <p className="text-sm text-slate-400">Toshkent, Mustaqillik ko'chasi, 15</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Biz bilan bog'lanish
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-12 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 Step.uz. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Maxfiylik
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                Shartlar
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sayt xaritasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
