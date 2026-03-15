'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Share2, Bookmark, ExternalLink, Check,
  Users, TrendingUp, Globe, Mail, MapPin, DollarSign,
  Calendar, Target, Lightbulb, BarChart3, Rocket,
  Heart, MessageCircle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { Startup, StartupStage } from '@/types';

// =============================================
// Skeleton Component
// =============================================

function StartupDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-10 w-32 mb-8" />
      </div>
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Skeleton className="h-24 w-24 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-10 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// Mock Data
// =============================================

const mockStartup: Startup = {
  id: '1',
  studentId: '1',
  name: 'EduTech Uzbekistan',
  logo: undefined,
  description: 'Online ta\'lim platformasi - maktab o\'quvchilari uchun interaktiv darslar va testlar. Bizning maqsadimiz - O\'zbekistonda sifatli ta\'limni har bir bolaga yetkazish.',
  problem: 'O\'zbekistonda sifatli online ta\'lim resurslari yetishmasligi. Ayniqsa, qishloq joylarda yashovchi o\'quvchilar uchun yaxshi ta\'lim olish imkoniyatlari cheklangan.',
  solution: 'Interaktiv video darslar va AI yordamida shaxsiy o\'quv rejasi. Har bir o\'quvchi o\'z bilim darajasiga mos dastur oladi va rivojlanish yo\'lini ko\'radi.',
  marketAnalysis: 'O\'zbekistonda 5 milliondan ortiq maktab o\'quvchisi mavjud. Online ta\'lim bozori yiliga 30% o\'sishda. 2025 yilga borib bozor hajmi 500 million dollarga yetishi kutilmoqda.',
  businessModel: 'Freemium modeli - bepul asosiy funksiyalar va pulli premium obuna. Maktablar uchun maxsus litsenziyalar. Korporativ treninglar uchun B2B yechimlar.',
  competitiveAdvantage: 'Mahalliy tildagi kontent, O\'zbekiston ta\'lim dasturiga moslashtirilgan, AI asosida shaxsiy yondashuv, arzon narxlar.',
  industry: 'EdTech',
  stage: 'MVP' as StartupStage,
  fundingNeeded: 500000000,
  fundingCurrency: 'UZS',
  fundingRaised: 150000000,
  equityOffered: 15,
  status: 'APPROVED',
  viewsCount: 1250,
  likesCount: 89,
  tags: ['Education', 'AI', 'SaaS', 'Mobile', 'Video'],
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  student: {
    id: '1',
    userId: '1',
    firstName: 'Aziz',
    lastName: 'Karimov',
    avatar: undefined,
    university: 'TATU',
    faculty: 'Kompyuter injiniringi',
    about: '3 yillik dasturlash tajribasiga ega Full Stack developer. EdTech sohasida ishlashni orzu qilaman.',
    isLookingForJob: true,
    createdAt: '',
    updatedAt: '',
  },
  team: [
    {
      id: '1',
      name: 'Aziz Karimov',
      role: 'CEO & Founder',
      bio: 'Full Stack Developer, TATU bitiruvchisi',
    },
    {
      id: '2',
      name: 'Nilufar Rahimova',
      role: 'CTO',
      bio: 'AI/ML mutaxassisi, 5 yillik tajriba',
    },
    {
      id: '3',
      name: 'Bobur Toshmatov',
      role: 'CMO',
      bio: 'Marketing bo\'yicha 4 yillik tajriba',
    },
  ],
};

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

const stageColors: Record<StartupStage, string> = {
  IDEA: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  VALIDATION: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  MVP: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  GROWTH: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  SCALING: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
};

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// =============================================
// Main Startup Detail Page
// =============================================

export default function StartupDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
  
  const startup = mockStartup;
  const progress = getFundingProgress(startup.fundingRaised, startup.fundingNeeded);

  if (isLoading) {
    return <StartupDetailsSkeleton />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* SEO Meta Tags Simulation (Dynamic metadata would normally be in a separate layout or generateMetadata) */}
      <head>
        <title>{`${startup.name} | Step.uz Startap`}</title>
        <meta name="description" content={startup.description} />
        <meta property="og:title" content={`${startup.name} - Investitsiya imkoniyati`} />
        <meta property="og:description" content={startup.description} />
        <meta property="og:type" content="website" />
      </head>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/startups"
          className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Orqaga qaytish
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="h-24 w-24 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold text-4xl flex-shrink-0 border border-border/50">
                      {startup.logo ? (
                        <img src={startup.logo} alt={startup.name} className="h-full w-full rounded-2xl object-cover" />
                      ) : (
                        startup.name[0]
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h1 className="text-3xl font-bold mb-3 text-foreground tracking-tight">{startup.name}</h1>
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge className={`${stageColors[startup.stage]} text-[10px] font-bold uppercase tracking-wider border-none`}>
                              {stages.find(s => s.value === startup.stage)?.label}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-border/60">{startup.industry}</Badge>
                            {startup.status === 'FUNDED' && (
                              <Badge className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border-none">Moliyalashtirilgan</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="rounded-xl border-border/60 hover:bg-secondary/50">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-xl border-border/60 hover:bg-secondary/50">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-medium leading-relaxed">{startup.description}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {startup.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[11px] font-bold bg-secondary/50 border-border/40">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Funding Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Card className="bg-primary/5 border-primary/10 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold flex items-center gap-3 text-foreground">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      Sarmoya yig'ish
                    </h3>
                    <span className="text-3xl font-bold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-background border border-border/40" />
                  <div className="flex items-center justify-between text-sm mt-6">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Yig'ilgan</p>
                      <p className="text-lg font-bold text-foreground">{formatMoney(startup.fundingRaised || 0, startup.fundingCurrency)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Maqsad</p>
                      <p className="text-lg font-bold text-foreground">{formatMoney(startup.fundingNeeded || 0, startup.fundingCurrency)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-8 border-t border-primary/10 gap-4">
                    <span className="text-sm font-bold text-muted-foreground">
                      Taklif qilinadi: <span className="text-primary">{startup.equityOffered}%</span> ulush
                    </span>
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-xl shadow-sm shadow-primary/20">
                      Investitsiya qilish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    Muammo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{startup.problem}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Yechim
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{startup.solution}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Analysis */}
            {startup.marketAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Bozor tahlili
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{startup.marketAnalysis}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Business Model */}
            {startup.businessModel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      Biznes modeli
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{startup.businessModel}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Team */}
            {startup.team && startup.team.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      Jamoa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {startup.team.map((member) => (
                        <div key={member.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-purple-600 dark:text-purple-400">{member.role}</p>
                            {member.bio && (
                              <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
                            )}
                          </div>
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
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold">{startup.viewsCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Ko&apos;rishlar</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-2xl font-bold">{startup.likesCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Layklar</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Yaratilgan</span>
                      <span className="font-medium">{formatDate(startup.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Bosqich</span>
                      <Badge className={stageColors[startup.stage]}>
                        {stages.find(s => s.value === startup.stage)?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Soxa</span>
                      <span className="font-medium">{startup.industry}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Founder Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Asoschi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={startup.student?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-lg">
                        {startup.student?.firstName?.[0]}{startup.student?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{startup.student?.firstName} {startup.student?.lastName}</p>
                      <p className="text-sm text-muted-foreground">{startup.student?.university}</p>
                    </div>
                  </div>

                  {startup.student?.about && (
                    <p className="text-sm text-muted-foreground">
                      {startup.student.about}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/students/${startup.student?.id}`}>
                        Profil
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 mb-3">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Jamoa bilan bog'lanish
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Investitsiya yoki hamkorlik uchun murojaat qiling
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Eye icon component
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
