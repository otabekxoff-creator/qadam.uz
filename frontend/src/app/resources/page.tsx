'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FileText, Video, BookOpen, Download, Calculator, Lightbulb, Users, Award,
  Search, Star, Clock, Play, FileCode, Heart, ExternalLink, ArrowRight,
  TrendingUp, Zap, Target, CheckCircle, X, BookMarked, FileEdit, PenTool, Layout,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'Barchasi', icon: FileText, count: 156 },
  { id: 'templates', name: 'Rezyume Namunalari', icon: FileCode, count: 45 },
  { id: 'guides', name: 'Karyera Qo\'llanmalari', icon: BookOpen, count: 38 },
  { id: 'tools', name: 'Bepul Vositalar', icon: Calculator, count: 28 },
  { id: 'videos', name: 'Video Qo\'llanmalar', icon: Video, count: 25 },
  { id: 'design', name: 'Dizayn Materiallari', icon: Layout, count: 20 },
];

const featuredResources = [
  {
    id: '1', title: 'Suhbatga Tayyorgarlik To\'liq Qo\'llanmasi', description: 'Suhbatdan muvaffaqiyatli o\'tish uchun barcha kerakli narsalar - umumiy savollardan tortib, muzokara strategiyalarigacha.', type: 'guide', category: 'Karyera Qo\'llanmalari',
    downloads: 45600, rating: 4.9, reviews: 1234, tags: ['Suhbat', 'Karyera', 'Bepul'], isNew: true, isFeatured: true,
  },
  {
    id: '2', title: 'ATS Mos Rezyume Namunasi 2024', description: 'Applicant Tracking Systems uchun optimallashtirilgan zamonaviy rezyume namunasi. Word va PDF formatlarda to\'liq moslashtirilishi mumkin.', type: 'template', category: 'Rezyume Namunalari',
    downloads: 89300, rating: 4.8, reviews: 2567, tags: ['Rezyume', 'ATS', 'Namuna'], isNew: false, isFeatured: true,
  },
  {
    id: '3', title: 'Maosh Muzokaralari Master-klassi', description: 'Maoshingizni samarali muzokara qilish bo\'yicha video kurs. Skriptlar va haqiqiy misollarni o\'z ichiga oladi.', type: 'video', category: 'Video Qo\'llanmalar',
    duration: '2 soat 30 daqiqa', views: 23400, rating: 4.9, reviews: 892, tags: ['Maosh', 'Muzokara', 'Video'], isNew: true, isFeatured: true,
  },
  {
    id: '4', title: 'Dasturchi Portfeli Generatori', description: 'Daqiqalarda ajoyib dasturchi portfelini yaratish. Kod yozish talab qilinmaydi.', type: 'tool', category: 'Bepul Vositalar',
    users: 15600, rating: 4.7, reviews: 456, tags: ['Portfel', 'Dasturchi', 'Vosita'], isNew: false, isFeatured: true,
  },
];

const allResources = [
  { id: '5', title: 'Boshlang\'ich Daraja Rezyume Namunasi', category: 'Rezyume Namunalari', categoryId: 'templates', type: 'template', downloads: 34200, rating: 4.6, format: 'PDF, DOCX', size: '2.5 MB' },
  { id: '6', title: 'Rahbariyat Rezyume Namunasi', category: 'Rezyume Namunalari', categoryId: 'templates', type: 'template', downloads: 18900, rating: 4.8, format: 'PDF, DOCX', size: '2.8 MB' },
  { id: '7', title: 'Murojaat Xati Yozish Qo\'llanmasi', category: 'Karyera Qo\'llanmalari', categoryId: 'guides', type: 'guide', downloads: 56700, rating: 4.7, pages: 45, readTime: '25 daqiqa' },
  { id: '8', title: 'LinkedIn Profil Optimallashtirish', category: 'Karyera Qo\'llanmalari', categoryId: 'guides', type: 'guide', downloads: 42300, rating: 4.8, pages: 32, readTime: '18 daqiqa' },
  { id: '9', title: 'Ish Qidirish Strategiyasi Qo\'llanmasi', category: 'Karyera Qo\'llanmalari', categoryId: 'guides', type: 'guide', downloads: 28900, rating: 4.5, pages: 68, readTime: '40 daqiqa' },
  { id: '10', title: 'Texnik Suhbat Yozuvlari', category: 'Karyera Qo\'llanmalari', categoryId: 'guides', type: 'guide', downloads: 67800, rating: 4.9, pages: 25, readTime: '15 daqiqa' },
  { id: '11', title: 'Maosh Hisoblagichi 2024', category: 'Bepul Vositalar', categoryId: 'tools', type: 'tool', users: 89200, rating: 4.8 },
  { id: '12', title: 'Rezyume Kalit So\'z Optimizatori', category: 'Bepul Vositalar', categoryId: 'tools', type: 'tool', users: 45600, rating: 4.6 },
  { id: '13', title: 'Suhbat Amaliyoti Simulyatori', category: 'Bepul Vositalar', categoryId: 'tools', type: 'tool', users: 23400, rating: 4.7 },
  { id: '14', title: 'Samarali Tarmoqlash Usullari', category: 'Video Qo\'llanmalar', categoryId: 'videos', type: 'video', duration: '45 daqiqa', views: 12300, rating: 4.6 },
  { id: '15', title: 'Shaxsiy Brendingni Rivojlantirish', category: 'Video Qo\'llanmalar', categoryId: 'videos', type: 'video', duration: '1 soat 15 daqiqa', views: 8900, rating: 4.8 },
  { id: '16', title: 'Rezyume Ikonkalari To\'plami', category: 'Dizayn Materiallari', categoryId: 'design', type: 'design', downloads: 23400, rating: 4.5, format: 'SVG, PNG', size: '15 MB' },
  { id: '17', title: 'Professional Sertifikat Namunalari', category: 'Dizayn Materiallari', categoryId: 'design', type: 'design', downloads: 15600, rating: 4.7, format: 'AI, PSD', size: '45 MB' },
  { id: '18', title: 'Vizitka Namunalari', category: 'Dizayn Materiallari', categoryId: 'design', type: 'design', downloads: 18900, rating: 4.6, format: 'AI, PSD', size: '32 MB' },
];

const successStories = [
  { name: 'Nodira Karimova', role: 'Dasturchi, Google', story: 'Suhbatga tayyorgarlik to\'plamidan foydalandim va 3 oylik tayyorgarlikdan so\'ng orzuyimdagi ishni qo\'lga kiritdim. Tuzilma usuli katta ahamiyatga ega bo\'ldi.', avatar: '/avatars/nodira.jpg' },
  { name: 'Jasur Toshmatov', role: 'Mahsulot Menejeri, Meta', story: 'Maosh muzokaralari qo\'llanmasi menga taklifimni 25% ga oshirishga yordam berdi. Mutlaqo bebaho resurs bo\'ldi.', avatar: '/avatars/jasur.jpg' },
  { name: 'Nilufar Saidova', role: 'UX Dizayner, Airbnb', story: 'Portfel generatori menga bir haftada 5 ta suhbat olishim mumkin bo\'lgan ajoyib portfel yaratishga yordam berdi. Tavsiya etaman!', avatar: '/avatars/nilufar.jpg' },
];

const recentDownloads = [
  { name: 'Dilnoza Rahimova', resource: 'ATS Rezyume Namunasi', time: '2 daqiqa oldin', avatar: 'DR' },
  { name: 'Bekzod Mirzaev', resource: 'Suhbat Qo\'llanmasi', time: '5 daqiqa oldin', avatar: 'BM' },
  { name: 'Gulnora Aliyeva', resource: 'Maosh Hisoblagichi', time: '8 daqiqa oldin', avatar: 'GA' },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showLiveActivity, setShowLiveActivity] = useState(true);

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Karyera Resurslari</h1>
            <p className="text-xl text-indigo-100 mb-8">Muvaffaqiyatga erishish uchun bepul namunalar, qo'llanmalar va vositalar</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[{ value: '156+', label: 'Bepul Resurslar' }, { value: '2M+', label: 'Yuklab Olishlar' }, { value: '150K+', label: 'Faol Foydalanuvchilar' }, { value: '4.8', label: 'O\'rtacha Reyting' }].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-indigo-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Resurslarni qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category) => (
              <motion.button key={category.id} variants={itemVariants} onClick={() => setSelectedCategory(category.id)} className={`p-6 rounded-2xl text-left transition-all ${selectedCategory === category.id ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:shadow-md'}`}>
                <category.icon className="w-8 h-8 mb-3" />
                <p className="font-semibold text-sm">{category.name}</p>
                <p className={`text-xs ${selectedCategory === category.id ? 'text-blue-100' : 'text-slate-500'}`}>{category.count} ta</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Featured */}
          {!searchQuery && selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Tavsiya Etilgan Resurslar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredResources.map((resource) => (
                  <motion.div key={resource.id} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      {resource.type === 'video' ? <Play className="w-12 h-12 text-white/50" /> : <FileText className="w-12 h-12 text-white/50" />}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">{resource.category}</span>
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-slate-600">{resource.rating}</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{resource.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads?.toLocaleString() || resource.users?.toLocaleString() || resource.views?.toLocaleString()}
                        </span>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          {resource.type === 'video' ? 'Ko\'rish' : 'Yuklab olish'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{selectedCategory === 'all' ? 'Barcha Resurslar' : categories.find(c => c.id === selectedCategory)?.name}</h2>
              <p className="text-slate-500">{filteredResources.length} ta resurs</p>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <motion.div key={resource.id} variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        {resource.type === 'template' ? <FileCode className="w-6 h-6 text-white" /> : resource.type === 'guide' ? <BookOpen className="w-6 h-6 text-white" /> : resource.type === 'tool' ? <Calculator className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <span className="text-xs text-blue-600 font-medium">{resource.category}</span>
                        <h3 className="font-semibold text-slate-800">{resource.title}</h3>
                      </div>
                    </div>
                    <button onClick={() => toggleFavorite(resource.id)} className="p-2 rounded-lg hover:bg-slate-50 text-slate-400">
                      <Heart className={`w-4 h-4 ${favorites.includes(resource.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                    {resource.downloads && <span className="flex items-center gap-1"><Download className="w-4 h-4" />{resource.downloads.toLocaleString()}</span>}
                    {resource.users && <span className="flex items-center gap-1"><Users className="w-4 h-4" />{resource.users.toLocaleString()}</span>}
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{resource.rating}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    {resource.type === 'video' ? 'Hozir Ko\'rish' : resource.type === 'tool' ? 'Vosita Sinash' : 'Bepul Yuklab Olish'}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Muvaffaqiyat Tarixlari</h2>
            <p className="text-slate-300">Resurslarimiz boshqalarga orzularidagi ishni qanday topishga yordam berdi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">{story.name[0]}</div>
                  <div>
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-slate-300">{story.role}</p>
                  </div>
                </div>
                <p className="text-slate-200 italic">&ldquo;{story.story}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
