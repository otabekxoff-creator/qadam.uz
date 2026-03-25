'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Briefcase, MapPin, DollarSign, Filter, X,
  ArrowRight, Clock, Building2, Users, Eye, Send
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
import { Skeleton } from '@/components/ui/skeleton';
import type { Job, JobType, ExperienceLevel } from '@/types';

// =============================================
// Skeleton Components
// =============================================

function JobCardSkeleton() {
  return (
    <Card className="h-full border border-border/60 shadow-sm rounded-xl overflow-hidden flex flex-col">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-6 flex-1">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-6 px-6 border-t border-border/40 bg-secondary/10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
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

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    company: {
      id: '1',
      userId: '1',
      name: 'TechPark',
      logo: undefined,
      description: 'IT kompaniya',
      website: 'https://techpark.uz',
      city: 'Toshkent',
      industry: 'IT',
      companySize: '201-500',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
    title: 'Senior Frontend Developer',
    description: 'Bizga React, Next.js va TypeScript bo\'yicha tajribali Senior Frontend Developer kerak. Zamonaviy web texnologiyalar bilan ishlash tajribasi.',
    requirements: ['React', 'Next.js', 'TypeScript', '3+ yil tajriba'],
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Yillik ta\'til', 'O\'quv kurslari'],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    salaryMin: 15000000,
    salaryMax: 25000000,
    currency: 'UZS',
    isSalaryNegotiable: true,
    location: 'Toshkent',
    isRemote: false,
    isHybrid: true,
    status: 'ACTIVE',
    applicationsCount: 24,
    viewsCount: 1250,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    companyId: '2',
    company: {
      id: '2',
      userId: '2',
      name: 'Uzum',
      logo: undefined,
      description: 'E-commerce platformasi',
      website: 'https://uzum.uz',
      city: 'Toshkent',
      industry: 'E-commerce',
      companySize: '501-1000',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
    title: 'Product Manager',
    description: 'Innovativ startap uchun Product Manager kerak. Agile metodologiyada ishlash tajribasi va mahsulot boshqarish ko\'nikmalari.',
    requirements: ['Agile', 'Product Management', 'Analytics'],
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Sport zal', 'Bepul ovqat'],
    skills: ['Agile', 'Scrum', 'Jira', 'Analytics'],
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 20000000,
    salaryMax: 35000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: true,
    status: 'ACTIVE',
    applicationsCount: 56,
    viewsCount: 2340,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    companyId: '3',
    company: {
      id: '3',
      userId: '3',
      name: 'Design Studio Pro',
      logo: undefined,
      description: 'Dizayn studiyasi',
      website: 'https://designstudio.uz',
      city: 'Samarqand',
      industry: 'Design',
      companySize: '11-50',
      isVerified: false,
      createdAt: '',
      updatedAt: '',
    },
    title: 'UX/UI Designer',
    description: 'Zamonaviy va foydalanuvchi dizaynlar yaratish uchun UX/UI Designer kerak. Figma va Adobe XD da ishlash tajribasi.',
    requirements: ['Figma', 'Adobe XD', 'UX Research'],
    benefits: ['Ish vaqti moslashuvchan', 'Masofaviy ish'],
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 10000000,
    salaryMax: 18000000,
    currency: 'UZS',
    location: 'Samarqand',
    isRemote: true,
    status: 'ACTIVE',
    applicationsCount: 18,
    viewsCount: 890,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    companyId: '4',
    company: {
      id: '4',
      userId: '4',
      name: 'Payme',
      logo: undefined,
      description: 'To\'lov tizimlari',
      website: 'https://payme.uz',
      city: 'Toshkent',
      industry: 'Fintech',
      companySize: '201-500',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
    title: 'Backend Developer (Node.js)',
    description: 'Fintech loyihasi uchun Node.js Backend Developer kerak. Micro-services arxitektura tajribasi.',
    requirements: ['Node.js', 'PostgreSQL', 'Docker'],
    benefits: ['Ish vaqti moslashuvchan', 'Stock optsionlar', 'O\'quv byudjeti'],
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    salaryMin: 18000000,
    salaryMax: 30000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: false,
    status: 'ACTIVE',
    applicationsCount: 31,
    viewsCount: 1560,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    companyId: '5',
    company: {
      id: '5',
      userId: '5',
      name: 'Yandex Uzbekistan',
      logo: undefined,
      description: 'IT kompaniya',
      website: 'https://yandex.uz',
      city: 'Toshkent',
      industry: 'IT',
      companySize: '51-200',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
    title: 'Data Scientist Intern',
    description: 'Yandex ilmiy-tadqiqot guruhida Data Science intern lavozimiga taklif qilamiz. Machine Learning bilan ishlash tajribasi.',
    requirements: ['Python', 'Machine Learning', 'SQL'],
    benefits: ['Stajirovka sertifikati', 'Mentorlik', 'Konferensiyalar'],
    skills: ['Python', 'TensorFlow', 'SQL', 'Pandas'],
    jobType: 'INTERNSHIP',
    experienceLevel: 'JUNIOR',
    salaryMin: 5000000,
    salaryMax: 8000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: true,
    status: 'ACTIVE',
    applicationsCount: 89,
    viewsCount: 3200,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// =============================================
// Constants
// =============================================

const jobTypes: { value: JobType; label: string }[] = [
  { value: 'FULL_TIME', label: 'To\'liq kun' },
  { value: 'PART_TIME', label: 'Yarim kun' },
  { value: 'INTERNSHIP', label: 'Stajirovka' },
  { value: 'REMOTE', label: 'Masofaviy' },
  { value: 'CONTRACT', label: 'Shartnoma' },
];

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MIDDLE', label: 'Middle' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'LEAD', label: 'Lead' },
  { value: 'EXECUTIVE', label: 'Executive' },
];

const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Namangan', 'Farg\'ona'];

// =============================================
// Helper Functions
// =============================================

const formatMoney = (amount?: number, currency?: string) => {
  if (!amount) return 'Kelishilgan';
  const format = (n: number) => n.toLocaleString('uz-UZ');
  const curr = currency === 'USD' ? '$' : 'so\'m';
  return `${format(amount)} ${curr}`;
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

const jobTypeLabels: Record<JobType, string> = {
  FULL_TIME: 'To\'liq kun',
  PART_TIME: 'Yarim kun',
  INTERNSHIP: 'Stajirovka',
  REMOTE: 'Masofaviy',
  CONTRACT: 'Shartnoma',
};

const experienceLabels: Record<ExperienceLevel, string> = {
  JUNIOR: 'Junior',
  MIDDLE: 'Middle',
  SENIOR: 'Senior',
  LEAD: 'Lead',
  EXECUTIVE: 'Executive',
};

// =============================================
// Job Card Component
// =============================================

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="h-full border border-border/60 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group rounded-xl overflow-hidden flex flex-col">
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-xl border border-border/50 group-hover:scale-105 transition-transform">
                {job.company?.logo ? (
                  <img src={job.company.logo} alt={job.company.name} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  job.company?.name?.[0] || 'C'
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</p>
                  {job.company?.isVerified && (
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/10">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-medium">{job.company?.name}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-secondary/80 text-muted-foreground border-border/50">
              {jobTypeLabels[job.jobType]}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4 px-6 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-5 font-medium leading-relaxed">
            {job.description}
          </p>

          <div className="space-y-2.5 text-sm text-muted-foreground mb-2">
            <div className="flex items-center font-medium">
              <MapPin className="h-4 w-4 mr-2.5 text-muted-foreground/60" />
              <span>{job.isRemote ? 'Masofaviy' : job.location}</span>
            </div>
            <div className="flex items-center font-medium">
              <DollarSign className="h-4 w-4 mr-2.5 text-muted-foreground/60" />
              <span>{formatMoney(job.salaryMin, job.currency)} - {formatMoney(job.salaryMax, job.currency)}</span>
            </div>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {job.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-[10px] font-bold border-border/60 text-muted-foreground">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="outline" className="text-[10px] font-bold border-border/60 text-muted-foreground">
                  +{job.skills.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-4 pb-6 px-6 border-t border-border/40 bg-secondary/10 group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {job.applicationsCount || 0}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {job.viewsCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">{getTimeAgo(job.createdAt)}</span>
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
  jobTypes: JobType[];
  experienceLevels: ExperienceLevel[];
  cities: string[];
  isRemote: boolean;
  salaryRange: string;
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
      jobTypes: [],
      experienceLevels: [],
      cities: [],
      isRemote: false,
      salaryRange: '',
    });
  };

  const hasActiveFilters = filters.jobTypes.length > 0 || 
    filters.experienceLevels.length > 0 || 
    filters.cities.length > 0 || 
    filters.isRemote ||
    filters.salaryRange;

  return (
    <div className="space-y-8">
      {/* Job Type */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Ish turi</h4>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-3 group">
              <Checkbox
                id={`type-${type.value}`}
                checked={filters.jobTypes.includes(type.value)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    jobTypes: checked
                      ? [...prev.jobTypes, type.value]
                      : prev.jobTypes.filter((t) => t !== type.value),
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Experience Level */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Tajriba darajasi</h4>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <div key={level.value} className="flex items-center space-x-3 group">
              <Checkbox
                id={`exp-${level.value}`}
                checked={filters.experienceLevels.includes(level.value)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    experienceLevels: checked
                      ? [...prev.experienceLevels, level.value]
                      : prev.experienceLevels.filter((e) => e !== level.value),
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`exp-${level.value}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* City */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Shahar</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-3 group">
              <Checkbox
                id={`city-${city}`}
                checked={filters.cities.includes(city)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    cities: checked
                      ? [...prev.cities, city]
                      : prev.cities.filter((c) => c !== city),
                  }));
                }}
                className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`city-${city}`} className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Remote */}
      <div className="flex items-center space-x-3 group">
        <Checkbox
          id="remote"
          checked={filters.isRemote}
          onCheckedChange={(checked: boolean) => {
            setFilters((prev) => ({
              ...prev,
              isRemote: checked,
            }));
          }}
          className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label htmlFor="remote" className="text-sm font-semibold text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors">
          Faqat masofaviy ishlar
        </Label>
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
// Main Jobs Page
// =============================================

export default function JobsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    jobTypes: [],
    experienceLevels: [],
    cities: [],
    isRemote: false,
    salaryRange: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(search);
        const matchesDescription = job.description.toLowerCase().includes(search);
        const matchesCompany = job.company?.name?.toLowerCase().includes(search);
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(search));
        if (!matchesTitle && !matchesDescription && !matchesCompany && !matchesSkills) return false;
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false;
      }

      // Experience level filter
      if (filters.experienceLevels.length > 0 && job.experienceLevel && 
          !filters.experienceLevels.includes(job.experienceLevel)) {
        return false;
      }

      // City filter
      if (filters.cities.length > 0 && job.location && 
          !filters.cities.includes(job.location)) {
        return false;
      }

      // Remote filter
      if (filters.isRemote && !job.isRemote) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = filters.jobTypes.length + 
    filters.experienceLevels.length + 
    filters.cities.length + 
    (filters.isRemote ? 1 : 0);

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
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
              Vakansiyalar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              O&apos;zbekistondagi eng yaxshi kompaniyalardan vakansiyalarni kashf eting va karyerangizni rivojlantiring.
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
                  placeholder="Loyiha nomi, kompaniya yoki ko'nikmalar bo'yicha qidiring..."
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
                      Vakansiyalarni filtrlash orqali qidiring
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

            {/* Jobs Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground font-medium">
                  <span className="font-bold text-foreground">{filteredJobs.length}</span> ta vakansiya topildi
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48 h-10 bg-background border-border/60 rounded-lg font-bold text-sm">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    <SelectItem value="newest" className="font-medium cursor-pointer">Eng yangi</SelectItem>
                    <SelectItem value="salary" className="font-medium cursor-pointer">Oylik (yuqori)</SelectItem>
                    <SelectItem value="views" className="font-medium cursor-pointer">Ko'p ko'rilganlar</SelectItem>
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
                      <JobCardSkeleton key={i} />
                    ))}
                  </motion.div>
                ) : filteredJobs.length > 0 ? (
                  <motion.div 
                    key="jobs-grid"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <JobCard job={job} />
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
                      <Briefcase className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">Vakansiya topilmadi</h3>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-medium">
                      Filtrlarni o&apos;zgartirib yoki qidiruv so&apos;rovini boshqa so&apos;zlar bilan qayta urinib ko&apos;ring.
                    </p>
                    <Button 
                      variant="outline"
                      className="h-11 px-8 rounded-lg font-bold border-border/60 hover:bg-background transition-all"
                      onClick={() => setFilters({
                        search: '',
                        jobTypes: [],
                        experienceLevels: [],
                        cities: [],
                        isRemote: false,
                        salaryRange: '',
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
