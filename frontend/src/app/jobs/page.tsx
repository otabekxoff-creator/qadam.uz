'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Briefcase, Building2, Filter, X, 
  ArrowRight, Clock, DollarSign, ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
// Mock Data
// =============================================

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer...',
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    salaryMin: 15000000,
    salaryMax: 25000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: false,
    status: 'ACTIVE',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '1',
      userId: '1',
      name: 'TechPark',
      logo: undefined,
      industry: 'IT',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '2',
    companyId: '2',
    title: 'Backend Developer',
    description: 'Join our backend team...',
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 12000000,
    salaryMax: 20000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: true,
    status: 'ACTIVE',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '2',
      userId: '2',
      name: 'Uzum',
      logo: undefined,
      industry: 'E-commerce',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '3',
    companyId: '3',
    title: 'UI/UX Designer',
    description: 'We need a creative UI/UX Designer...',
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 10000000,
    salaryMax: 18000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: false,
    status: 'ACTIVE',
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '3',
      userId: '3',
      name: 'Yandex',
      logo: undefined,
      industry: 'IT',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '4',
    companyId: '4',
    title: 'Marketing Intern',
    description: 'Great opportunity for students...',
    jobType: 'INTERNSHIP',
    experienceLevel: 'JUNIOR',
    salaryMin: 3000000,
    salaryMax: 5000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: false,
    status: 'ACTIVE',
    skills: ['Social Media', 'Content Creation', 'Marketing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '4',
      userId: '4',
      name: 'Kapital Bank',
      logo: undefined,
      industry: 'Banking',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '5',
    companyId: '5',
    title: 'Full Stack Developer',
    description: 'Full stack developer needed...',
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 15000000,
    salaryMax: 22000000,
    currency: 'UZS',
    location: 'Samarqand',
    isRemote: true,
    status: 'ACTIVE',
    skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '5',
      userId: '5',
      name: 'Payme',
      logo: undefined,
      industry: 'Fintech',
      isVerified: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: '6',
    companyId: '6',
    title: 'Data Analyst',
    description: 'Data analyst position...',
    jobType: 'FULL_TIME',
    experienceLevel: 'JUNIOR',
    salaryMin: 8000000,
    salaryMax: 12000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: false,
    status: 'ACTIVE',
    skills: ['Python', 'SQL', 'Excel', 'Tableau'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '6',
      userId: '6',
      name: 'TBC Bank',
      logo: undefined,
      industry: 'Banking',
      isVerified: true,
      createdAt: '',
      updatedAt: '',
    },
  },
];

// =============================================
// Constants
// =============================================

const jobTypes: { value: JobType; label: string }[] = [
  { value: 'FULL_TIME', label: 'To\'liq stavka' },
  { value: 'PART_TIME', label: 'Yarim stavka' },
  { value: 'INTERNSHIP', label: 'Stajirovka' },
  { value: 'REMOTE', label: 'Masofaviy' },
  { value: 'CONTRACT', label: 'Shartnoma' },
];

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: 'JUNIOR', label: 'Junior (0-2 yil)' },
  { value: 'MIDDLE', label: 'Middle (2-5 yil)' },
  { value: 'SENIOR', label: 'Senior (5+ yil)' },
  { value: 'LEAD', label: 'Team Lead' },
  { value: 'EXECUTIVE', label: 'Executive' },
];

const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona', 'Namangan', 'Qarshi', 'Nukus'];

// =============================================
// Helper Functions
// =============================================

const formatSalary = (min?: number, max?: number, currency?: string) => {
  if (!min && !max) return 'Kelishilgan';
  const format = (n: number) => n.toLocaleString('uz-UZ');
  const curr = currency === 'USD' ? '$' : 'so\'m';
  if (min && max) return `${format(min)} - ${format(max)} ${curr}`;
  if (min) return `dan ${format(min)} ${curr}`;
  return `gacha ${format(max!)} ${curr}`;
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

// =============================================
// Job Card Component
// =============================================

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="h-full border border-border/60 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group rounded-xl overflow-hidden">
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-xl border border-border/50 group-hover:scale-105 transition-transform">
                {job.company?.name?.[0] || 'C'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">{job.company?.name}</p>
                  {job.company?.isVerified && (
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/10">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-medium">{getTimeAgo(job.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4 px-6">
          <h3 className="font-bold text-lg mb-3 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          
          <div className="space-y-2.5 text-sm text-muted-foreground mb-5">
            <div className="flex items-center font-medium">
              <MapPin className="h-4 w-4 mr-2.5 text-muted-foreground/60" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center font-medium">
              <Briefcase className="h-4 w-4 mr-2.5 text-muted-foreground/60" />
              <span>{jobTypes.find(t => t.value === job.jobType)?.label}</span>
            </div>
            {job.experienceLevel && (
              <div className="flex items-center font-medium">
                <Clock className="h-4 w-4 mr-2.5 text-muted-foreground/60" />
                <span>{experienceLevels.find(e => e.value === job.experienceLevel)?.label}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.skills?.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-[10px] font-bold border-border/60 text-muted-foreground">
                {skill}
              </Badge>
            ))}
            {job.skills && job.skills.length > 3 && (
              <Badge variant="outline" className="text-[10px] font-bold border-border/60 text-muted-foreground">
                +{job.skills.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 pb-6 px-6 border-t border-border/40 bg-secondary/20 group-hover:bg-primary/5 transition-colors">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-bold text-primary">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </p>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-background border border-border/60 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <ArrowRight className="h-4 w-4" />
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
  locations: string[];
  isRemote: boolean;
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
      locations: [],
      isRemote: false,
    });
  };

  const hasActiveFilters = filters.jobTypes.length > 0 || 
    filters.experienceLevels.length > 0 || 
    filters.locations.length > 0 || 
    filters.isRemote;

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
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Tajriba</h4>
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
                      : prev.experienceLevels.filter((l) => l !== level.value),
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

      {/* Location */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Joylashuv</h4>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-3 group">
              <Checkbox
                id={`city-${city}`}
                checked={filters.locations.includes(city)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    locations: checked
                      ? [...prev.locations, city]
                      : prev.locations.filter((l) => l !== city),
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
    locations: [],
    isRemote: false,
  });
  const [isLoading] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(search);
        const matchesCompany = job.company?.name?.toLowerCase().includes(search);
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(search));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
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

      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(job.location || '')) {
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
    filters.locations.length + 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
              Ish e&apos;lonlari
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              O&apos;zbekistondagi eng yaxshi kompaniyalardan ish imkoniyatlarini toping. 
              Sizning professional karyerangiz shu yerdan boshlanadi.
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
                  placeholder="Lavozim, kompaniya yoki skill bo'yicha qidiring..."
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
                      Ishlarni filtrlash orqali qidiring
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
                  <span className="font-bold text-foreground">{filteredJobs.length}</span> ta ish topildi
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48 h-10 bg-background border-border/60 rounded-lg font-bold text-sm">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    <SelectItem value="newest" className="font-medium cursor-pointer">Eng yangi</SelectItem>
                    <SelectItem value="salary-high" className="font-medium cursor-pointer">Maosh (yuqori)</SelectItem>
                    <SelectItem value="salary-low" className="font-medium cursor-pointer">Maosh (past)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jobs */}
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="h-64 border-border/60 rounded-xl overflow-hidden shadow-sm">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <div className="flex gap-2 mb-6">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
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
                <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border/60">
                  <div className="h-20 w-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-border/40">
                    <Briefcase className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">Hech qanday ish topilmadi</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-medium">
                    Tanlangan filtrlarni o&apos;zgartirib yoki qidiruv so'rovini boshqa so'zlar bilan qayta urinib ko&apos;ring.
                  </p>
                  <Button 
                    variant="outline"
                    className="h-11 px-8 rounded-lg font-bold border-border/60 hover:bg-background transition-all"
                    onClick={() => setFilters({
                      search: '',
                      jobTypes: [],
                      experienceLevels: [],
                      locations: [],
                      isRemote: false,
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
