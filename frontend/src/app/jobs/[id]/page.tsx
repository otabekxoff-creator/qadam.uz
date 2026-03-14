'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Briefcase, Clock, DollarSign, Building2, 
  ArrowLeft, Share2, Bookmark, ExternalLink, Check,
  Calendar, Users, Globe, Send, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
      <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
        <Link href="/login">
          Ariza berish uchun tizimga kiring
        </Link>
      </Button>
    );
  }

  if (!userIsStudent) {
    return (
      <Button disabled className="w-full">
        Faqat talabalar ariza berishi mumkin
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
          <Send className="mr-2 h-4 w-4" />
          Ariza berish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ariza berish</DialogTitle>
          <DialogDescription>
            &quot;{mockJob.title}&quot; lavozimiga ariza bermoqchisiz
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Motivatsion xat (ixtiyoriy)</Label>
            <Textarea
              id="coverLetter"
              placeholder="Nima uchun bu lavozimga murojaat qilayotganingiz haqida yozing..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Arizangiz quyidagilarni o&apos;z ichiga oladi:</p>
            <ul className="space-y-1">
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-emerald-500" />
                Sizning profilingiz
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-emerald-500" />
                Resume (agar mavjud bo&apos;lsa)
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-emerald-500" />
                Motivatsion xat
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Bekor qilish
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-emerald-500 to-teal-600"
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
  
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  const job = mockJob;

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/jobs"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Orqaga
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {job.company?.name?.[0] || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/companies/${job.company?.id}`} className="text-muted-foreground hover:text-foreground">
                              {job.company?.name}
                            </Link>
                            {job.company?.isVerified && (
                              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                                Tasdiqlangan
                              </Badge>
                            )}
                          </div>
                          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {jobTypeLabels[job.jobType]}
                            </div>
                            {job.isRemote && (
                              <Badge variant="outline">Masofaviy</Badge>
                            )}
                            {job.isHybrid && (
                              <Badge variant="outline">Hybrid</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Salary */}
                  <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                      <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                      </span>
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
