'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Briefcase, FileText, Eye, Clock, CheckCircle, XCircle,
  TrendingUp, Calendar, MapPin, Building2, ArrowRight,
  Plus, Edit, Settings, Award, Download, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores';
import type { Application, ApplicationStatus } from '@/types';

// =============================================
// Mock Data
// =============================================

const mockStats = {
  applicationsCount: 12,
  interviewsCount: 3,
  offersCount: 1,
  profileViews: 45,
  pendingApplications: 8,
  savedJobsCount: 24,
};

const mockJobs = [
  {
    id: '1',
    companyId: '1',
    title: 'Senior Frontend Developer',
    description: 'React, TypeScript, Next.js bilan modern web ilovalar ishlab chiqish',
    jobType: 'FULL_TIME',
    location: 'Toshkent',
    salaryMin: 8000000,
    salaryMax: 15000000,
    currency: 'UZS',
    status: 'ACTIVE',
    applicationsCount: 28,
    viewsCount: 156,
    isRemote: true,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '1',
      name: 'TechPark Solutions',
      logo: undefined,
      industry: 'IT',
      size: '51-200',
      isVerified: true,
    },
  },
  {
    id: '2',
    companyId: '2',
    title: 'Backend Developer',
    description: 'Node.js, PostgreSQL, API development',
    jobType: 'FULL_TIME',
    location: 'Toshkent',
    salaryMin: 6000000,
    salaryMax: 12000000,
    currency: 'UZS',
    status: 'ACTIVE',
    applicationsCount: 19,
    viewsCount: 98,
    isRemote: false,
    skills: ['Node.js', 'PostgreSQL', 'Express', 'MongoDB'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '2',
      name: 'Digital Agency',
      logo: undefined,
      industry: 'Marketing',
      size: '11-50',
      isVerified: true,
    },
  },
  {
    id: '3',
    companyId: '3',
    title: 'Mobile App Developer',
    description: 'React Native yoki Flutter bilan mobil ilovalar ishlab chiqish',
    jobType: 'PART_TIME',
    location: 'Masofaviy',
    salaryMin: 4000000,
    salaryMax: 8000000,
    currency: 'UZS',
    status: 'ACTIVE',
    applicationsCount: 15,
    viewsCount: 67,
    isRemote: true,
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    company: {
      id: '3',
      name: 'StartupHub',
      logo: undefined,
      industry: 'Startup',
      size: '2-10',
      isVerified: false,
    },
  },
];

const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '1',
    status: 'INTERVIEW',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: {
      id: '1',
      companyId: '1',
      title: 'Senior Frontend Developer',
      description: 'Senior Frontend Developer position',
      jobType: 'FULL_TIME',
      location: 'Toshkent',
      status: 'ACTIVE',
      createdAt: '',
      updatedAt: '',
      company: {
        id: '1',
        userId: '1',
        name: 'TechPark',
        isVerified: true,
        createdAt: '',
        updatedAt: '',
      },
    },
  },
  {
    id: '2',
    jobId: '2',
    studentId: '1',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: {
      id: '2',
      companyId: '2',
      title: 'Backend Developer',
      description: 'Backend Developer position',
      jobType: 'FULL_TIME',
      location: 'Toshkent',
      isRemote: true,
      status: 'ACTIVE',
      createdAt: '',
      updatedAt: '',
      company: {
        id: '2',
        userId: '2',
        name: 'Uzum',
        isVerified: true,
        createdAt: '',
        updatedAt: '',
      },
    },
  },
  {
    id: '3',
    jobId: '3',
    studentId: '1',
    status: 'REJECTED',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: {
      id: '3',
      companyId: '3',
      title: 'UI/UX Designer',
      description: 'UI/UX Designer position',
      jobType: 'FULL_TIME',
      location: 'Toshkent',
      status: 'ACTIVE',
      createdAt: '',
      updatedAt: '',
      company: {
        id: '3',
        userId: '3',
        name: 'Yandex',
        isVerified: true,
        createdAt: '',
        updatedAt: '',
      },
    },
  },
  {
    id: '4',
    jobId: '4',
    studentId: '1',
    status: 'OFFERED',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: {
      id: '4',
      companyId: '4',
      title: 'Full Stack Developer',
      description: 'Full Stack Developer position',
      jobType: 'FULL_TIME',
      location: 'Toshkent',
      status: 'ACTIVE',
      createdAt: '',
      updatedAt: '',
      company: {
        id: '4',
        userId: '4',
        name: 'Payme',
        isVerified: true,
        createdAt: '',
        updatedAt: '',
      },
    },
  },
];

const mockStudent = {
  id: '1',
  userId: '1',
  firstName: 'Aziz',
  lastName: 'Karimov',
  avatar: undefined,
  university: 'TATU',
  faculty: 'Kompyuter injiniringi',
  course: 4,
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python'],
  isLookingForJob: true,
  profileCompleteness: 75,
  createdAt: '',
  updatedAt: '',
};

// =============================================
// Constants
// =============================================

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
  PENDING: { label: 'Kutilmoqda', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  REVIEWING: { label: 'Ko\'rib chiqilmoqda', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  INTERVIEW: { label: 'Intervyu', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  OFFERED: { label: 'Taklif', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  REJECTED: { label: 'Rad etilgan', color: 'text-red-700', bgColor: 'bg-red-100' },
  WITHDRAWN: { label: 'Qaytarilgan', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

// =============================================
// Helper Functions
// =============================================

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    month: 'short',
    day: 'numeric',
  });
};

// =============================================
// Application Card Component
// =============================================

function ApplicationCard({ application }: { application: Application }) {
  const config = statusConfig[application.status];

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
              {application.job?.company?.name?.[0] || 'C'}
            </div>
            <div>
              <h3 className="font-semibold">{application.job?.title}</h3>
              <p className="text-sm text-muted-foreground">{application.job?.company?.name}</p>
            </div>
          </div>
          <Badge className={config.bgColor}>
            <span className={config.color}>{config.label}</span>
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{application.job?.location}</span>
            </div>
            {application.job?.isRemote && (
              <Badge variant="outline" className="text-xs">Masofaviy</Badge>
            )}
          </div>
          <span className="text-muted-foreground">{formatDate(application.createdAt)}</span>
        </div>

        <div className="flex justify-end mt-3 pt-3 border-t gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/jobs/${application.jobId}`}>
              Batafsil
            </Link>
          </Button>
          {application.status === 'OFFERED' && (
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              Qabul qilish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================
// Main Student Dashboard Page
// =============================================

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { student } = useAuthStore();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header with Glass Card */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-card border border-border/50 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex flex-col lg:flex-col lg:items-start justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl rounded-2xl">
              <AvatarImage src={student?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold rounded-2xl">
                {student?.firstName?.[0]}{student?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Salom, {student?.firstName || 'Talaba'}! 👋</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {student?.university || 'Universitet'}
                </div>
                <div className="h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  {student?.course || '1'}-kurs
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="w-full lg:w-72 space-y-3 bg-secondary/20 p-5 rounded-2xl border border-border/40">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-foreground/80 uppercase tracking-tight">Profil holati</span>
              <span className="font-bold text-primary">{mockStudent.profileCompleteness}%</span>
            </div>
            <Progress value={mockStudent.profileCompleteness} className="h-2 bg-background" />
            <p className="text-[11px] font-medium text-muted-foreground">
              Profilingizni 100% to'ldiring va ish beruvchilar e'tiborini torting!
            </p>
            <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary" asChild>
              <Link href="/profile">To'ldirishni davom ettirish →</Link>
            </Button>
          </div>
          <div className="flex gap-3 mt-6 lg:mt-0">
            <Button className="rounded-xl h-12 px-6 font-bold shadow-sm shadow-primary/20" asChild>
              <Link href="/profile">
                <Edit className="h-4 w-4 mr-2" />
                Tahrirlash
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="rounded-xl h-12 px-6 font-bold border-border/60"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4 mr-2" />
              CV yuklab olish
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Arizalar', value: mockStats.applicationsCount, icon: FileText, color: 'text-primary' },
          { label: 'Suhbatlar', value: mockStats.interviewsCount, icon: Calendar, color: 'text-primary' },
          { label: 'Takliflar', value: mockStats.offersCount, icon: Award, color: 'text-primary' },
          { label: 'Ko\'rishlar', value: mockStats.profileViews, icon: Eye, color: 'text-primary' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card p-6 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-primary/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <TrendingUp size={16} className="text-muted-foreground/30" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 border border-border p-1 rounded-lg h-12">
              <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Arizalar
              </TabsTrigger>
              <TabsTrigger value="jobs" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Vakansiyalar
              </TabsTrigger>
              <TabsTrigger value="saved" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Saqlanganlar
              </TabsTrigger>
              <TabsTrigger value="startup" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Startap
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-3">
              {mockApplications.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card p-5 rounded-xl border border-border flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center border border-border text-lg font-bold text-primary">
                      {app.job?.company?.name?.[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{app.job?.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Building2 size={12} /> {app.job?.company?.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {app.job?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="px-3 py-1 rounded-md font-medium text-xs">
                      {statusConfig[app.status].label}
                    </Badge>
                    <Button variant="ghost" size="sm" className="rounded-lg h-8 w-8 p-0" asChild>
                      <Link href={`/jobs/${app.jobId}`}>
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="jobs" className="mt-6 space-y-4">
              {mockJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card p-5 rounded-xl border border-border flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-border text-lg font-bold text-blue-600">
                      {job.company.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground">{job.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Building2 size={12} /> {job.company.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                        {job.isRemote && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">Masofaviy</Badge>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="font-medium text-green-600">
                          {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} {job.currency}
                        </span>
                        <span>•</span>
                        <span>{job.jobType === 'FULL_TIME' ? 'To\'liq stavka' : 'Qisman'}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {job.applicationsCount} ariza
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {job.viewsCount} ko'rish
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Ariza yuborish
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="saved" className="mt-6 space-y-4">
              <div className="text-center py-12 border rounded-lg border-dashed">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Saqlangan ishlar yo'q</h3>
                <p className="text-muted-foreground">Sizga yoqqan ishlarni saqlab qo'ying va keyinroq topshiring.</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/jobs">Ishlarni ko'rish</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="startup" className="mt-6 space-y-4">
              <div className="text-center py-12 border rounded-lg border-dashed">
                <Rocket className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Startap loyihasini yarating</h3>
                <p className="text-muted-foreground mb-6">O'z startap loyihangizni platformada joylashtiring va investorlarni jalb qiling.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-primary" asChild>
                    <Link href="/startups/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Yangi startap
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/startups">
                      <Rocket className="h-4 w-4 mr-2" />
                      Startaplar
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar/Profile Completeness Area */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[32px] border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-primary" /> Profil holati
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between text-sm mb-2">
                <span>To'ldirilgan</span>
                <span className="text-primary font-bold">{mockStudent.profileCompleteness}%</span>
              </div>
              <Progress value={mockStudent.profileCompleteness} className="h-3 bg-white/5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Profilni 100% to'ldiring va kompaniyalar e'tiborini 2 barobar ko'proq torting.
              </p>
              <Button variant="outline" className="w-full glass border-white/10 rounded-2xl h-12" asChild>
                <Link href="/profile">Davom ettirish</Link>
              </Button>
            </div>
          </div>

          <div className="glass p-8 rounded-[32px] border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary" /> Tavsiyalar
            </h3>
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
                  <h5 className="font-semibold">UX Researcher</h5>
                  <p className="text-xs text-muted-foreground mt-1">Payme • Toshkent</p>
                </div>
              ))}
              <Button variant="link" className="w-full text-emerald-600 p-0 h-auto" asChild>
                <Link href="/jobs">Barchasini ko'rish</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
