'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, Rocket, MapPin, DollarSign, Filter, X,
  ArrowRight, Users, TrendingUp, Lightbulb, Building
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
import type { Startup, StartupStage, StartupStatus } from '@/types';

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

const stageColors: Record<StartupStage, string> = {
  IDEA: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  VALIDATION: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  MVP: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  GROWTH: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  SCALING: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
};

const statusColors: Record<StartupStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
  FUNDED: 'bg-emerald-100 text-emerald-700',
  COMPLETED: 'bg-purple-100 text-purple-700',
};

// =============================================
// Startup Card Component
// =============================================

function StartupCard({ startup }: { startup: Startup }) {
  const progress = getFundingProgress(startup.fundingRaised, startup.fundingNeeded);

  return (
    <Link href={`/startups/${startup.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                {startup.logo ? (
                  <img src={startup.logo} alt={startup.name} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  startup.name[0]
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{startup.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{startup.industry}</p>
              </div>
            </div>
            <Badge className={stageColors[startup.stage]}>
              {stages.find(s => s.value === startup.stage)?.label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {startup.description}
          </p>

          {/* Funding Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Moliyalashtirish</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatMoney(startup.fundingRaised || 0, startup.fundingCurrency)}</span>
              <span>{formatMoney(startup.fundingNeeded || 0, startup.fundingCurrency)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {startup.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {startup.likesCount}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {startup.viewsCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{getTimeAgo(startup.createdAt)}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
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
    <div className="space-y-6">
      {/* Stage */}
      <div>
        <h4 className="font-medium mb-3">Bosqich</h4>
        <div className="space-y-2">
          {stages.map((stage) => (
            <div key={stage.value} className="flex items-center space-x-2">
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
              />
              <Label htmlFor={`stage-${stage.value}`} className="text-sm font-normal cursor-pointer">
                {stage.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Industry */}
      <div>
        <h4 className="font-medium mb-3">Soxa</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
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
              />
              <Label htmlFor={`ind-${industry}`} className="text-sm font-normal cursor-pointer">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Status */}
      <div>
        <h4 className="font-medium mb-3">Holati</h4>
        <div className="space-y-2">
          {statuses.map((s) => (
            <div key={s.value} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${s.value}`}
                checked={filters.status === s.value}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: checked ? s.value : '',
                  }));
                }}
              />
              <Label htmlFor={`status-${s.value}`} className="text-sm font-normal cursor-pointer">
                {s.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
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
      <section className="bg-gradient-to-b from-purple-50 via-pink-50 to-background dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 mb-4">
              <Rocket className="mr-2 h-4 w-4" />
              <span>Startap ekotizimi</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Startaplar
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O&apos;zbekiston yoshlari yaratgan innovatsion startaplarni kashf eting va moliyalashtiring
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Startap nomi, tavsifi yoki teg bo'yicha qidiring..."
                  value={filters.search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 md:hidden relative">
                    <Filter className="h-5 w-5" />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                    <SheetDescription>
                      Startaplarni filtrlash orqali qidiring
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="font-semibold">Filtrlar</h3>
                </CardHeader>
                <CardContent>
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </CardContent>
              </Card>
            </aside>

            {/* Startups Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredStartups.length}</span> ta startap topildi
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Eng yangi</SelectItem>
                    <SelectItem value="funding">Moliyalashtirish bo&apos;yicha</SelectItem>
                    <SelectItem value="popular">Eng ommabop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Startups */}
              {filteredStartups.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {filteredStartups.map((startup, index) => (
                    <motion.div
                      key={startup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <StartupCard startup={startup} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Rocket className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Startap topilmadi</h3>
                  <p className="text-muted-foreground mb-4">
                    Filtrlarni o&apos;zgartirib qayta urinib ko&apos;ring
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setFilters({
                      search: '',
                      stages: [],
                      industries: [],
                      status: '',
                    })}
                  >
                    Filtrlarni tozalash
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
