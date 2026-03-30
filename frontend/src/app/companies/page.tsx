'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  Heart,
  Share2,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Award,
  Globe,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  ArrowRight,
  Loader2,
  X,
  SlidersHorizontal,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - would come from API
const mockCompanies = [
  {
    id: '1',
    name: 'Google',
    logo: '/logos/google.svg',
    description: 'Google LLC - sun\'iy intellekt, onlayn reklama, qidiruv tizimi, bulutli hisoblash, dasturiy ta\'minot, kvant hisoblash, elektron tijorat va elektronika sohalarida faoliyat yurituvchi kompaniya.',
    industry: 'Axborot Texnologiyalari',
    location: 'AQSh, Kaliforniya',
    companySize: '10000+',
    isVerified: true,
    isFeatured: true,
    website: 'https://google.com',
    foundedYear: 1998,
    totalJobs: 245,
    totalEmployees: 156500,
    rating: 4.8,
    reviewCount: 15234,
    benefits: ['Sog\'liq sug\'urtasi', 'Pensiya rejasi', 'Bepul ovqat', 'Sport zali', 'Masofadan ish'],
    tags: ['Sun\'iy Intellekt', 'Bulut', 'Qidiruv', 'Innovatsiya'],
  },
  {
    id: '2',
    name: 'Microsoft',
    logo: '/logos/microsoft.svg',
    description: 'Microsoft Corporation - dasturiy ta\'minot, elektronika, shaxsiy kompyuterlar va xizmatlarni ishlab chiqaruvchi kompaniya.',
    industry: 'Axborot Texnologiyalari',
    location: 'AQSh, Vashington',
    companySize: '10000+',
    isVerified: true,
    isFeatured: true,
    website: 'https://microsoft.com',
    foundedYear: 1975,
    totalJobs: 189,
    totalEmployees: 221000,
    rating: 4.6,
    reviewCount: 12890,
    benefits: ['Sog\'liq sug\'urtasi', 'Aksiyalar', 'Bolalar parvarishi', 'Ta\'lim yordami'],
    tags: ['Bulut', 'Dasturiy ta\'minot', 'O\'yinlar', 'Korxonalar'],
  },
  {
    id: '3',
    name: 'Amazon',
    logo: '/logos/amazon.svg',
    description: 'Amazon.com, Inc. - elektron tijorat, bulutli hisoblash, onlayn reklama, raqamli oqim va sun\'iy intellekt sohalarida faoliyat yurituvchi kompaniya.',
    industry: 'Elektron Tijorat va Bulut',
    location: 'AQSh, Sietl',
    companySize: '10000+',
    isVerified: true,
    isFeatured: false,
    website: 'https://amazon.com',
    foundedYear: 1994,
    totalJobs: 567,
    totalEmployees: 1541000,
    rating: 4.2,
    reviewCount: 28934,
    benefits: ['Sog\'liq sug\'urtasi', 'Aksiyalar', 'Xodimlar chegirmasi', 'Karyera o\'sishi'],
    tags: ['Elektron tijorat', 'AWS', 'Logistika', 'Sun\'iy Intellekt'],
  },
  {
    id: '4',
    name: 'Meta',
    logo: '/logos/meta.svg',
    description: 'Meta Platforms, Inc. - ilgari Facebook, Inc. nomi bilan tanilgan, ijtimoiy media va virtual reallik sohalaridagi texnologiya konglomerati.',
    industry: 'Ijtimoiy Media va VR',
    location: 'AQSh, Kaliforniya',
    companySize: '10000+',
    isVerified: true,
    isFeatured: true,
    website: 'https://meta.com',
    foundedYear: 2004,
    totalJobs: 123,
    totalEmployees: 67317,
    rating: 4.4,
    reviewCount: 9876,
    benefits: ['Sog\'liq sug\'urtasi', 'Pensiya rejasi', 'Bepul ovqat', 'Salomatlik dasturlari'],
    tags: ['Ijtimoiy Media', 'VR', 'Metaverse', 'Sun\'iy Intellekt'],
  },
  {
    id: '5',
    name: 'Apple',
    logo: '/logos/apple.svg',
    description: 'Apple Inc. - istemol elektronikasi, dasturiy ta\'minot va onlayn xizmatlarga ixtisoslashgan kompaniya.',
    industry: 'Elektronika',
    location: 'AQSh, Kaliforniya',
    companySize: '10000+',
    isVerified: true,
    isFeatured: true,
    website: 'https://apple.com',
    foundedYear: 1976,
    totalJobs: 312,
    totalEmployees: 161000,
    rating: 4.7,
    reviewCount: 18234,
    benefits: ['Sog\'liq sug\'urtasi', 'Mahsulot chegirmalari', 'Ta\'lim qo\'llab-quvvatlash', 'Sport zali'],
    tags: ['Uskuna', 'Dasturiy ta\'minot', 'Dizayn', 'Innovatsiya'],
  },
  {
    id: '6',
    name: 'Netflix',
    logo: '/logos/netflix.svg',
    description: 'Netflix, Inc. - obuna asosidagi video oqim xizmati.',
    industry: 'O\'yin-Kulgi',
    location: 'AQSh, Kaliforniya',
    companySize: '5001-10000',
    isVerified: true,
    isFeatured: false,
    website: 'https://netflix.com',
    foundedYear: 1997,
    totalJobs: 89,
    totalEmployees: 12800,
    rating: 4.5,
    reviewCount: 5432,
    benefits: ['Cheksiz ta\'til', 'Sog\'liq sug\'urtasi', 'Bepul tomosha', 'Bolalar parvarishi'],
    tags: ['Oqim', 'O\'yin-Kulgi', 'Kontent', 'Texnologiya'],
  },
  {
    id: '7',
    name: 'Tesla',
    logo: '/logos/tesla.svg',
    description: 'Tesla, Inc. - avtomobil va toza energiya sohalaridagi ko\'p millatli kompaniya.',
    industry: 'Avtomobil va Energiya',
    location: 'AQSh, Texas',
    companySize: '10000+',
    isVerified: true,
    isFeatured: false,
    website: 'https://tesla.com',
    foundedYear: 2003,
    totalJobs: 178,
    totalEmployees: 127855,
    rating: 4.1,
    reviewCount: 7654,
    benefits: ['Aksiyalar', 'Sog\'liq sug\'urtasi', 'Xodimlar chegirmasi', 'Innovatsiya muhiti'],
    tags: ['Elektromobil', 'Energiya', 'Avtonom', 'Ishlab chiqarish'],
  },
  {
    id: '8',
    name: 'Salesforce',
    logo: '/logos/salesforce.svg',
    description: 'Salesforce, Inc. - bulutli dasturiy ta\'minot kompaniyasi.',
    industry: 'Korxona Dasturiy Ta\'minoti',
    location: 'AQSh, San-Fransisko',
    companySize: '5001-10000',
    isVerified: true,
    isFeatured: false,
    website: 'https://salesforce.com',
    foundedYear: 1999,
    totalJobs: 234,
    totalEmployees: 79000,
    rating: 4.6,
    reviewCount: 8765,
    benefits: ['1-1-1 Model', 'Sog\'liq sug\'urtasi', 'Salomatlik', 'Ta\'lim'],
    tags: ['CRM', 'Bulut', 'SaaS', 'Sun\'iy Intellekt'],
  },
];

const industries = [
  'Barcha Sohalar',
  'Axborot Texnologiyalari',
  'Elektron Tijorat va Bulut',
  'Ijtimoiy Media va VR',
  'Elektronika',
  'O\'yin-Kulgi',
  'Avtomobil va Energiya',
  'Korxona Dasturiy Ta\'minoti',
  'Moliya',
  'Sog\'liqni Saqlash',
];

const companySizes = [
  'Barcha O\'lchamlar',
  '1-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001-10000',
  '10000+',
];

const sortOptions = [
  { label: 'Eng Mos', value: 'relevant' },
  { label: 'Eng Ko\'p Ishlar', value: 'jobs' },
  { label: 'Eng Yuqori Reyting', value: 'rating' },
  { label: 'Yaqinda Qo\'shilgan', value: 'recent' },
  { label: 'Alifbo Bo\'yicha', value: 'name' },
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('Barcha Sohalar');
  const [selectedSize, setSelectedSize] = useState('Barcha O\'lchamlar');
  const [sortBy, setSortBy] = useState('relevant');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort companies
  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'Barcha Sohalar' || company.industry === selectedIndustry;
    const matchesSize = selectedSize === 'Barcha O\'lchamlar' || company.companySize === selectedSize;
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'jobs':
        return b.totalJobs - a.totalJobs;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.foundedYear - a.foundedYear;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <ArrowLeft className="w-4 h-4" />
                Orqaga
              </Button>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ajoyib Kompaniyalarni Kashf Eting
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ish o'rinlari ochiq bo'lgan top kompaniyalarda keyingi karyera qadamini toping
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">500+</span>
                <span className="text-blue-200">Kompaniyalar</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span className="font-semibold">10,000+</span>
                <span className="text-blue-200">Ochiq Ishlar</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">2M+</span>
                <span className="text-blue-200">Xodimlar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-0 z-40 bg-white shadow-lg border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Kompaniya, soha yoki kalit so'zlarni qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtrlar
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-3">
              {/* Industry Filter */}
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Size Filter */}
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="lg:hidden mt-4 pt-4 border-t border-slate-200 space-y-3"
            >
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Active Filters */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-slate-500">
              {sortedCompanies.length} ta kompaniya topildi
            </span>
            {(selectedIndustry !== 'Barcha Sohalar' || selectedSize !== 'Barcha O\'lchamlar' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIndustry('Barcha Sohalar');
                  setSelectedSize('Barcha O\'lchamlar');
                  setSearchQuery('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Filtrlarni tozalash
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      {!searchQuery && selectedIndustry === 'Barcha Sohalar' && selectedSize === 'Barcha O\'lchamlar' && (
        <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-xl font-semibold text-slate-800">Tavsiya Etilgan Kompaniyalar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCompanies.filter(c => c.isFeatured).slice(0, 4).map((company) => (
                <motion.div
                  key={company.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-amber-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {company.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 truncate">{company.name}</h3>
                      <p className="text-sm text-slate-500">{company.industry}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase className="w-3 h-3 text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">{company.totalJobs} ish</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Companies Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }
          >
            {sortedCompanies.map((company) => (
              <motion.div
                key={company.id}
                variants={itemVariants}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Card Header */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                        {company.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-800">{company.name}</h3>
                          {company.isVerified && (
                            <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-100" />
                          )}
                        </div>
                        <p className="text-slate-500">{company.industry}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(company.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(company.id)
                            ? 'bg-red-50 text-red-500'
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(company.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {company.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Users className="w-4 h-4" />
                      {company.companySize}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {company.foundedYear} yilda tashkil etilgan
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {company.rating} ({company.reviewCount.toLocaleString()})
                    </div>
                  </div>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.benefits.slice(0, 4).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                    {company.benefits.length > 4 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        +{company.benefits.length - 4} ta boshqa
                      </span>
                    )}
                  </div>

                  {/* Industry Tags */}
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className={`${viewMode === 'list' ? 'flex flex-col justify-center p-6 border-l border-slate-100' : 'px-6 pb-6'}`}>
                  <div className={`flex ${viewMode === 'list' ? 'flex-col gap-3' : 'items-center justify-between'}`}>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                          >
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">
                        {company.totalJobs} ochiq vakansiya
                      </span>
                    </div>
                    <Link href={`/companies/${company.id}`}>
                      <Button 
                        className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ${
                          viewMode === 'list' ? 'w-full mt-2' : ''
                        }`}
                      >
                        Ishlarni Ko'rish
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {sortedCompanies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Kompaniyalar topilmadi
              </h3>
              <p className="text-slate-500 mb-6">
                Izlagan narsangizni topish uchun qidiruv yoki filtrlarni sozlang.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry('Barcha Sohalar');
                  setSelectedSize('Barcha O\'lchamlar');
                }}
                variant="outline"
              >
                Filtrlarni Tozalash
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Kompaniya Yangiliklari
            </h2>
            <p className="text-slate-400 mb-8">
              Platformamizga yangi qo'shilayotgan kompaniyalar haqida haftalik yangiliklarni oling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8">
                Obuna Bo'lish
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
