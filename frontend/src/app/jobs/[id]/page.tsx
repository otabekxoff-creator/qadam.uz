'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Briefcase, Clock, DollarSign, Building2, 
  ArrowLeft, Share2, Bookmark, ExternalLink, Check,
  Calendar, Users, Globe, Send, Loader2, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ShareButtons } from '@/components/common/ShareButtons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore, isStudent } from '@/stores';
import type { Job, JobType, ExperienceLevel } from '@/types';

// =============================================
// Skeleton Component
// =============================================

function JobDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-secondary/20 border-b border-border/40 py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-32 rounded-xl" />
              <Skeleton className="h-12 w-40 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// Mock Data
// =============================================

const mockJob: Job = {
  id: '1',
  companyId: '1',
  title: 'Senior Frontend Developer',
  description: `Biz tajribali Frontend Developer qidirmoqdamiz. Siz zamonaviy veb-ilovalar yaratishda muhim rol o'ynaysiz.

**Asosiy mas'uliyatlar:**
- React va Next.js yordamida veb-ilovalar yaratish
- Foydalanuvchi interfeyslarini loyihalash va amalga oshirish
- Kod sifatini nazorat qilish va code review o'tkazish
- Jamoa bilan hamkorlikda ishlash

**Talablar:**
- 5+ yillik tajriba
- React, TypeScript, Next.js bo'yicha chuqur bilim
- REST API va GraphQL bilan ishlash tajribasi
- Git va CI/CD jarayonlarini tushunish`,
  requirements: [
    '5+ yillik Frontend development tajribasi',
    'React va Next.js bo\'yicha chuqur bilim',
    'TypeScript bilan ishlash tajribasi',
    'REST API va GraphQL bilimlari',
    'Git version control tizimini bilish',
    'Ingliz tili (Intermediate daraja)',
  ],
  responsibilities: [
    'Zamonaviy veb-ilovalar yaratish',
    'Foydalanuvchi interfeyslarini optimizasiya qilish',
    'Kod sifatini ta\'minlash',
    'Jamoa a\'zolari bilan hamkorlik',
  ],
  benefits: [
    'Rasmiy ishga joylashish',
    'Sog\'liqni saqlash sug\'urtasi',
    'Yillik ta\'til 24 kun',
    'Professional o\'sish imkoniyatlari',
    'Zamonaviy ofis',
    'Kofe va choy bepul',
  ],
  jobType: 'FULL_TIME' as JobType,
  experienceLevel: 'SENIOR' as ExperienceLevel,
  salaryMin: 15000000,
  salaryMax: 25000000,
  currency: 'UZS',
  location: 'Toshkent',
  isRemote: false,
  isHybrid: true,
  status: 'ACTIVE',
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'REST API', 'Git'],
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  company: {
    id: '1',
    userId: '1',
    name: 'TechPark',
    logo: undefined,
    description: 'TechPark - O\'zbekistondagi eng yirik IT kompaniyalardan biri.',
    website: 'https://techpark.uz',
    industry: 'IT',
    companySize: '201-500',
    isVerified: true,
    createdAt: '',
    updatedAt: '',
  },
};

// =============================================
// Constants
// =============================================

const jobTypeLabels: Record<JobType, string> = {
  FULL_TIME: 'To\'liq stavka',
  PART_TIME: 'Yarim stavka',
  INTERNSHIP: 'Stajirovka',
  REMOTE: 'Masofaviy',
  CONTRACT: 'Shartnoma',
};

const experienceLevelLabels: Record<ExperienceLevel, string> = {
  JUNIOR: 'Junior (0-2 yil)',
  MIDDLE: 'Middle (2-5 yil)',
  SENIOR: 'Senior (5+ yil)',
  LEAD: 'Team Lead',
  EXECUTIVE: 'Executive',
};

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// =============================================
// Apply Dialog Component
// =============================================

function ApplyDialog({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const userIsStudent = isStudent();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated || !userIsStudent) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-sm shadow-primary/20">
        <Link href="/login">
          Ariza berish uchun tizimga kiring
        </Link>
      </Button>
    );
  }

  if (!userIsStudent) {
    return (
      <Button disabled className="w-full h-11 rounded-xl">
        Faqat talabalar ariza berishi mumkin
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-sm shadow-primary/20">
          <Send className="mr-2 h-4 w-4" />
          Ariza berish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Ariza berish</DialogTitle>
          <DialogDescription className="font-medium">
            &quot;{mockJob.title}&quot; lavozimiga ariza bermoqchisiz
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-sm font-bold">Motivatsion xat (ixtiyoriy)</Label>
            <Textarea
              id="coverLetter"
              placeholder="Nima uchun bu lavozimga murojaat qilayotganingiz haqida yozing..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none border-border/60 focus:border-primary/50"
            />
          </div>

          <div className="bg-secondary/30 rounded-xl p-5 border border-border/40">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Arizangiz quyidagilarni o&apos;z ichiga oladi:</p>
            <ul className="space-y-2.5">
              <li className="flex items-center text-sm font-semibold">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                Sizning profilingiz
              </li>
              <li className="flex items-center text-sm font-semibold">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                Resume (agar mavjud bo&apos;lsa)
              </li>
              <li className="flex items-center text-sm font-semibold">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                Motivatsion xat
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="font-bold rounded-xl h-11 px-6">
            Bekor qilish
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Arizani yuborish
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// =============================================
// Main Job Detail Page
// =============================================

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      // Yuklanish simulyatsiyasi
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    });
  }, [params]);
  
  const job = mockJob;

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* SEO Meta Tags Simulation */}
      <head>
        <title>{`${job.title} | Step.uz Ish e'loni`}</title>
        <meta name="description" content={job.description.substring(0, 160)} />
        <meta property="og:title" content={`${job.title} - ${job.company?.name}`} />
        <meta property="og:description" content={job.description.substring(0, 160)} />
        <meta property="og:type" content="website" />
      </head>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/jobs"
          className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Orqaga qaytish
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold text-3xl flex-shrink-0 border border-border/50">
                      {job.company?.name?.[0] || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Link href={`/companies/${job.company?.id}`} className="text-sm font-bold text-primary hover:underline">
                              {job.company?.name}
                            </Link>
                            {job.company?.isVerified && (
                              <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/10">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <h1 className="text-3xl font-bold mb-3 text-foreground tracking-tight">{job.title}</h1>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground/60" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground/60" />
                              {jobTypeLabels[job.jobType]}
                            </div>
                            {job.isRemote && (
                              <Badge variant="outline" className="text-[10px] font-bold border-border/60">Masofaviy</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="rounded-xl border-border/60 hover:bg-secondary/50">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <ShareButtons title={job.title} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {job.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-[11px] font-bold bg-secondary/50 border-border/40">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Salary */}
                  <div className="mt-8 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Maosh</p>
                        <span className="text-xl font-bold text-primary">
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Lavozim haqida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{job.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Talablar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Imtiyozlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:sticky lg:top-24"
            >
              <Card>
                <CardContent className="p-6 space-y-4">
                  <ApplyDialog jobId={resolvedParams?.id || ''} />

                  {/* Job Meta */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Chop etilgan</span>
                      <span className="font-medium">{getTimeAgo(job.createdAt)}</span>
                    </div>
                    {job.deadline && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Muddati</span>
                        <span className="font-medium">{formatDate(job.deadline)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tajriba</span>
                      <span className="font-medium">
                        {job.experienceLevel ? experienceLevelLabels[job.experienceLevel] : 'Ko\'rsatilmagan'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Kompaniya haqida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.company?.logo} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        {job.company?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{job.company?.name}</p>
                      <p className="text-sm text-muted-foreground">{job.company?.industry}</p>
                    </div>
                  </div>

                  {job.company?.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.company.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    {job.company?.companySize && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{job.company.companySize} xodim</span>
                      </div>
                    )}
                    {job.company?.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={job.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          {job.company.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/companies/${job.company?.id}`}>
                      Kompaniya profili
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
