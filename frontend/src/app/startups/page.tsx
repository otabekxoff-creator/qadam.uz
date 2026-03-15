'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Rocket, MapPin, DollarSign, Filter, X,
  ArrowRight, Users, TrendingUp, Lightbulb, Building, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { Startup, StartupStage, StartupStatus } from '@/types';

// =============================================
// Skeleton Components
// =============================================

function StartupCardSkeleton() {
  return (
    <Card className="h-full border border-border/60 shadow-sm rounded-xl overflow-hidden flex flex-col">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-6 flex-1">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="space-y-3 mb-6 bg-secondary/20 p-4 rounded-xl">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-6 px-6 border-t border-border/40 bg-secondary/10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

// =============================================
// Mock Data
// =============================================

const mockStartups: Startup[] = [
  {
    id: '1',
    studentId: '1',
    name: 'EduTech Uzbekistan',
    logo: undefined,
    description: 'Online ta\'lim platformasi - maktab o\'quvchilari uchun interaktiv darslar va testlar.',
    problem: 'O\'zbekistonda sifatli online ta\'lim resurslari yetishmasligi',
    solution: 'Interaktiv video darslar va AI yordamida shaxsiy o\'quv rejasi',
    industry: 'EdTech',
    stage: 'MVP',
    fundingNeeded: 500000000,
    fundingCurrency: 'UZS',
    fundingRaised: 150000000,
    equityOffered: 15,
    status: 'APPROVED',
    viewsCount: 1250,
    likesCount: 89,
    tags: ['Education', 'AI', 'SaaS'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      id: '1',
      userId: '1',
      firstName: 'Aziz',
      lastName: 'Karimov',
      university: 'TATU',
      isLookingForJob: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '2',
    studentId: '2',
    name: 'AgroSmart',
    logo: undefined,
    description: 'Qishloq xo\'jaligi uchun aqlli sug\'orish tizimi. IoT sensorlar orqali tuprok namligini nazorat qilish.',
    problem: 'Suv resurslaridan samarali foydalanmaslik va hosildorlikning pastligi',
    solution: 'AI asosida avtomatik sug\'orish tizimi',
    industry: 'AgroTech',
    stage: 'GROWTH',
    fundingNeeded: 800000000,
    fundingCurrency: 'UZS',
    fundingRaised: 450000000,
    equityOffered: 20,
    status: 'FUNDED',
    viewsCount: 2340,
    likesCount: 156,
    tags: ['Agriculture', 'IoT', 'AI'],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      id: '2',
      userId: '2',
      firstName: 'Dilnoza',
      lastName: 'Rahimova',
      university: 'Toshkent Davlat Agrar Universiteti',
      isLookingForJob: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '3',
    studentId: '3',
    name: 'MediConnect',
    logo: undefined,
    description: 'Online tibbiy konsultatsiya platformasi. Shifokorlar bilan video orqali bog\'lanish.',
    problem: 'Tibbiy xizmatlarga kirish cheklovlari',
    solution: 'Telemedicine platformasi',
    industry: 'HealthTech',
    stage: 'VALIDATION',
    fundingNeeded: 300000000,
    fundingCurrency: 'UZS',
    fundingRaised: 0,
    equityOffered: 10,
    status: 'APPROVED',
    viewsCount: 890,
    likesCount: 45,
    tags: ['Healthcare', 'Telemedicine', 'Mobile'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      id: '3',
      userId: '3',
      firstName: 'Bobur',
      lastName: 'Saidov',
      university: 'Toshkent Tibbiyot Akademiyasi',
      isLookingForJob: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '4',
    studentId: '4',
    name: 'FinTrack',
    logo: undefined,
    description: 'Shaxsiy moliyaviy boshqaruv ilovasi. Harajlarni kuzatish va tejash rejalari.',
    problem: 'Moliyaviy savodxonlikning pastligi',
    solution: 'AI asosida shaxsiy moliya boshqaruvi',
    industry: 'FinTech',
    stage: 'IDEA',
    fundingNeeded: 200000000,
    fundingCurrency: 'UZS',
    fundingRaised: 0,
    equityOffered: 12,
    status: 'PENDING',
    viewsCount: 456,
    likesCount: 23,
    tags: ['Finance', 'Mobile', 'AI'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      id: '4',
      userId: '4',
      firstName: 'Nigora',
      lastName: 'Aliyeva',
      university: 'Toshkent Moliya Instituti',
      isLookingForJob: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '5',
    studentId: '5',
    name: 'GreenDelivery',
    logo: undefined,
    description: 'Ekologik toza yetkazib berish xizmati. Elektron velosipedlar bilan tezkor yetkazish.',
    problem: 'Shaharlar ifloslanishi va transport tirbandligi',
    solution: 'Ekologik yetkazib berish tarmog\'i',
    industry: 'Logistics',
    stage: 'SCALING',
    fundingNeeded: 1000000000,
    fundingCurrency: 'UZS',
    fundingRaised: 700000000,
    equityOffered: 25,
    status: 'FUNDED',
    viewsCount: 3450,
    likesCount: 234,
    tags: ['Logistics', 'Green', 'Delivery'],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      id: '5',
      userId: '5',
      firstName: 'Jasur',
      lastName: 'Toshmatov',
      university: 'Toshkent Arxitektura-Qurilish Instituti',
      isLookingForJob: false,
      createdAt: '',
      updatedAt: '',
    },
  },
];

// =============================================
// Constants
// =============================================

const stages: { value: StartupStage; label: string }[] = [
  { value: 'IDEA', label: 'G\'oya' },
  { value: 'VALIDATION', label: 'Validatsiya' },
  { value: 'MVP', label: 'MVP' },
  { value: 'GROWTH', label: 'O\'sish' },
  { value: 'SCALING', label: 'Masshtablashtirish' },
];

const statuses: { value: StartupStatus; label: string }[] = [
  { value: 'APPROVED', label: 'Tasdiqlangan' },
  { value: 'FUNDED', label: 'Moliyalashtirilgan' },
  { value: 'PENDING', label: 'Kutilmoqda' },
];

const industries = ['EdTech', 'FinTech', 'HealthTech', 'AgroTech', 'Logistics', 'E-commerce', 'SaaS'];

// =============================================
// Helper Functions
// =============================================

const formatMoney = (amount: number, currency?: string) => {
  const format = (n: number) => n.toLocaleString('uz-UZ');
  const curr = currency === 'USD' ? '$' : 'so\'m';
  return `${format(amount)} ${curr}`;
};

const getFundingProgress = (raised?: number, needed?: number) => {
  if (!raised || !needed) return 0;
  return Math.min(Math.round((raised / needed) * 100), 100);
};

const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Bugun';
  if (diffDays === 1) return 'Kecha';
  if (diffDays < 7) return `${diffDays} kun oldin`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta oldin`;
  return `${Math.floor(diffDays / 30)} oy oldin`;
};

const stageLabels: Record<StartupStage, string> = {
  IDEA: 'G\'oya',
  VALIDATION: 'Validatsiya',
  MVP: 'MVP',
  GROWTH: 'O\'sish',
  SCALING: 'Masshtablashtirish',
};

// =============================================
// Startup Card Component
// =============================================

function StartupCard({ startup }: { startup: Startup }) {
  const progress = getFundingProgress(startup.fundingRaised, startup.fundingNeeded);

  return (
    <Link href={`/startups/${startup.id}`}>
      <Card className="h-full border border-border/60 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group rounded-xl overflow-hidden flex flex-col">
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-xl border border-border/50 group-hover:scale-105 transition-transform">
                {startup.logo ? (
                  <img src={startup.logo} alt={startup.name} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  startup.name[0]
                )}
              </div>
              <div>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{startup.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{startup.industry}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-secondary/80 text-muted-foreground border-border/50">
              {stageLabels[startup.stage]}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4 px-6 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-medium leading-relaxed">
            {startup.description}
          </p>

          {/* Funding Progress */}
          <div className="space-y-2.5 mb-6 bg-secondary/30 p-4 rounded-xl border border-border/40">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
              <span className="text-muted-foreground">Moliyalashtirish</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-background" />
            <div className="flex items-center justify-between text-[11px] font-bold text-foreground/70">
              <span>{formatMoney(startup.fundingRaised || 0, startup.fundingCurrency)}</span>
              <span className="text-muted-foreground/50">/</span>
              <span>{formatMoney(startup.fundingNeeded || 0, startup.fundingCurrency)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {startup.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] font-bold border-border/60 text-muted-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 pb-6 px-6 border-t border-border/40 bg-secondary/10 group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {startup.likesCount}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                {startup.viewsCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">{getTimeAgo(startup.createdAt)}</span>
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-background border border-border/60 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

// =============================================
// Filter Panel Component
// =============================================

interface Filters {
  search: string;
  stages: StartupStage[];
  industries: string[];
  status: StartupStatus | '';
}

function FilterPanel({ 
  filters, 
  setFilters 
}: { 
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const clearFilters = () => {
    setFilters({
      search: '',
      stages: [],
      industries: [],
      status: '',
    });
  };

  const hasActiveFilters = filters.stages.length > 0 || 
    filters.industries.length > 0 || 
    filters.status;

  return (
    <div className="space-y-8">
      {/* Stage */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Bosqich</h4>
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.value} className="flex items-center space-x-3 group">
              <Checkbox
                id={`stage-${stage.value}`}
                checked={filters.stages.includes(stage.value)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    stages: checked
                      ? [...prev.stages, stage.value]
                      : prev.stages.filter((s) => s !== stage.value),
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`stage-${stage.value}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {stage.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Industry */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Soxa</h4>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-3 group">
              <Checkbox
                id={`ind-${industry}`}
                checked={filters.industries.includes(industry)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    industries: checked
                      ? [...prev.industries, industry]
                      : prev.industries.filter((i) => i !== industry),
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`ind-${industry}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Status */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Holati</h4>
        <div className="space-y-3">
          {statuses.map((s) => (
            <div key={s.value} className="flex items-center space-x-3 group">
              <Checkbox
                id={`status-${s.value}`}
                checked={filters.status === s.value}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: checked ? s.value : '',
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`status-${s.value}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {s.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          size="sm"
          className="w-full h-10 font-bold border-border/60 hover:bg-secondary/50 rounded-lg" 
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Filtrlarni tozalash
        </Button>
      )}
    </div>
  );
}

// =============================================
// Main Startups Page
// =============================================

export default function StartupsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    stages: [],
    industries: [],
    status: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Yuklanish simulyatsiyasi
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredStartups = useMemo(() => {
    return mockStartups.filter((startup) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesName = startup.name.toLowerCase().includes(search);
        const matchesDescription = startup.description.toLowerCase().includes(search);
        const matchesTags = startup.tags?.some((t) => t.toLowerCase().includes(search));
        if (!matchesName && !matchesDescription && !matchesTags) return false;
      }

      // Stage filter
      if (filters.stages.length > 0 && !filters.stages.includes(startup.stage)) {
        return false;
      }

      // Industry filter
      if (filters.industries.length > 0 && startup.industry && 
          !filters.industries.includes(startup.industry)) {
        return false;
      }

      // Status filter
      if (filters.status && startup.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = filters.stages.length + 
    filters.industries.length + 
    (filters.status ? 1 : 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-secondary/20 py-20 border-b border-border/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 rounded-2xl mb-6 shadow-sm border border-primary/10">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
              Startaplar Ekotizimi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              O&apos;zbekistonning eng istiqbolli yosh startaplari bilan tanishing. 
              G&apos;oyalardan yirik loyihalargacha - innovatsiyalar markazi.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <Input
                  type="text"
                  placeholder="Loyixa nomi, g'oya yoki soxa bo'yicha qidiring..."
                  value={filters.search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-12 h-14 bg-background border-border/60 focus:border-primary/50 text-base font-medium shadow-sm rounded-xl transition-all"
                />
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-14 w-14 md:hidden relative border-border/60 bg-background rounded-xl">
                    <Filter className="h-5 w-5" />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader className="text-left pb-6">
                    <SheetTitle className="text-xl font-bold tracking-tight">Filtrlar</SheetTitle>
                    <SheetDescription className="font-medium">
                      Startaplarni filtrlash orqali qidiring
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-2">
                    <FilterPanel filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex gap-10">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm">
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </aside>

            {/* Startups Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground font-medium">
                  <span className="font-bold text-foreground">{filteredStartups.length}</span> ta loyixa topildi
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48 h-10 bg-background border-border/60 rounded-lg font-bold text-sm">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    <SelectItem value="newest" className="font-medium cursor-pointer">Eng yangi</SelectItem>
                    <SelectItem value="views" className="font-medium cursor-pointer">Ko'p ko'rilganlar</SelectItem>
                    <SelectItem value="funding" className="font-medium cursor-pointer">Sarmoya (yuqori)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="skeleton-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {[...Array(6)].map((_, i) => (
                      <StartupCardSkeleton key={i} />
                    ))}
                  </motion.div>
                ) : filteredStartups.length > 0 ? (
                  <motion.div 
                    key="startups-grid"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {filteredStartups.map((startup, index) => (
                      <motion.div
                        key={startup.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <StartupCard startup={startup} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border/60"
                  >
                    <div className="h-20 w-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-border/40">
                      <Rocket className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">Loyixa topilmadi</h3>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-medium">
                      Filtrlarni o&apos;zgartirib yoki qidiruv so'rovini boshqa so'zlar bilan qayta urinib ko&apos;ring.
                    </p>
                    <Button 
                    variant="outline"
                    className="h-11 px-8 rounded-lg font-bold border-border/60 hover:bg-background transition-all"
                    onClick={() => setFilters({
                      search: '',
                      stages: [],
                      industries: [],
                      status: '',
                    })}
                  >
                    Filtrlarni tozalash
                  </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
