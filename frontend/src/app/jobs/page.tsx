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
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                {job.company?.name?.[0] || 'C'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{job.company?.name}</p>
                  {job.company?.isVerified && (
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Tasdiqlangan
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{getTimeAgo(job.createdAt)}</p>
              </div>
            </div>
            {job.isRemote && (
              <Badge variant="outline" className="text-xs">
                Masofaviy
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {job.title}
          </h3>
          
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{jobTypes.find(t => t.value === job.jobType)?.label}</span>
            </div>
            {job.experienceLevel && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{experienceLevels.find(e => e.value === job.experienceLevel)?.label}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {job.skills?.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills && job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </p>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
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
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <h4 className="font-medium mb-3">Ish turi</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
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
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm font-normal cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Experience Level */}
      <div>
        <h4 className="font-medium mb-3">Tajriba</h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
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
              />
              <Label htmlFor={`exp-${level.value}`} className="text-sm font-normal cursor-pointer">
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <h4 className="font-medium mb-3">Joylashuv</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
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
              />
              <Label htmlFor={`city-${city}`} className="text-sm font-normal cursor-pointer">
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Remote */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remote"
          checked={filters.isRemote}
          onCheckedChange={(checked: boolean) => {
            setFilters((prev) => ({
              ...prev,
              isRemote: checked,
            }));
          }}
        />
        <Label htmlFor="remote" className="text-sm font-normal cursor-pointer">
          Faqat masofaviy ishlar
        </Label>
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
      <section className="bg-gradient-to-b from-emerald-50 via-teal-50 to-background dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Ish e&apos;lonlari
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O&apos;zbekistondagi eng yaxshi kompaniyalardan ish imkoniyatlarini toping
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
                  placeholder="Lavozim, kompaniya yoki skill bo'yicha qidiring..."
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
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                    <SheetDescription>
                      Ishlarni filtrlash orqali qidiring
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
                  <CardTitle className="text-lg">Filtrlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </CardContent>
              </Card>
            </aside>

            {/* Jobs Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredJobs.length}</span> ta ish topildi
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Eng yangi</SelectItem>
                    <SelectItem value="salary-high">Maosh bo'yicha (yuqoridan)</SelectItem>
                    <SelectItem value="salary-low">Maosh bo'yicha (pastdan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jobs */}
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="h-64">
                      <CardContent className="p-6">
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <Skeleton className="h-20 w-full" />
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ish topilmadi</h3>
                  <p className="text-muted-foreground mb-4">
                    Filtrlarni o&apos;zgartirib qayta urinib ko&apos;ring
                  </p>
                  <Button 
                    variant="outline"
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
