'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, Users, Eye, Clock, CheckCircle, Plus,
  TrendingUp, Calendar, MapPin, Building2, ArrowRight,
  Edit, Settings, FileText, UserCheck, Rocket, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import type { Job, Application, ApplicationStatus } from '@/types';

// =============================================
// Mock Data
// =============================================

const mockStats = {
  activeJobsCount: 8,
  totalApplicationsCount: 145,
  newApplicationsCount: 23,
  interviewsScheduled: 5,
  profileViews: 320,
  hiredCount: 12,
};

const mockCompany = {
  id: '1',
  userId: '1',
  name: 'TechPark',
  logo: undefined,
  industry: 'IT',
  companySize: '201-500',
  isVerified: true,
  createdAt: '',
  updatedAt: '',
};

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Senior Frontend Developer',
    description: 'Senior Frontend Developer position',
    jobType: 'FULL_TIME',
    location: 'Toshkent',
    status: 'ACTIVE',
    applicationsCount: 28,
    viewsCount: 156,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    companyId: '1',
    title: 'Backend Developer',
    description: 'Backend Developer position',
    jobType: 'FULL_TIME',
    location: 'Toshkent',
    isRemote: true,
    status: 'ACTIVE',
    applicationsCount: 19,
    viewsCount: 98,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    companyId: '1',
    title: 'DevOps Engineer',
    description: 'DevOps Engineer position',
    jobType: 'FULL_TIME',
    location: 'Toshkent',
    status: 'PAUSED',
    applicationsCount: 8,
    viewsCount: 45,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// SHU YERDAGI TYPE O'ZGARTIRILDI (Omit qo'shildi)
const mockApplications: (Omit<Application, 'student'> & { student: { firstName: string; lastName: string; university?: string } })[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '1',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: mockJobs[0],
    student: {
      firstName: 'Aziz',
      lastName: 'Karimov',
      university: 'TATU',
    },
  },
  {
    id: '2',
    jobId: '1',
    studentId: '2',
    status: 'REVIEWING',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: mockJobs[0],
    student: {
      firstName: 'Dilnoza',
      lastName: 'Rahimova',
      university: 'Toshkent Universiteti',
    },
  },
  {
    id: '3',
    jobId: '2',
    studentId: '3',
    status: 'INTERVIEW',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    job: mockJobs[1],
    student: {
      firstName: 'Bobur',
      lastName: 'Saidov',
      university: 'INHA University',
    },
  },
];

const mockStartups = [
  {
    id: '1',
    title: 'EduTech Platform',
    description: 'AI-powered education platform for personalized learning',
    stage: 'SEED',
    fundingGoal: '$50,000',
    teamSize: '3-5',
    website: 'edutech.uz',
    logo: undefined,
    founderName: 'Azizbek Toshmatov',
    founderEmail: 'azizbek@edutech.uz',
    founderUniversity: 'TUIT',
    status: 'PENDING',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    student: {
      id: '1',
      firstName: 'Azizbek',
      lastName: 'Toshmatov',
      university: 'TUIT',
      major: 'Software Engineering',
      avatar: undefined,
    },
  },
  {
    id: '2',
    title: 'HealthConnect',
    description: 'Telemedicine platform connecting patients with doctors',
    stage: 'IDEA',
    fundingGoal: '$25,000',
    teamSize: '2-3',
    website: 'healthconnect.uz',
    logo: undefined,
    founderName: 'Dilnoza Saidova',
    founderEmail: 'dilnoza@healthconnect.uz',
    founderUniversity: 'BMU',
    status: 'PENDING',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    student: {
      id: '2',
      firstName: 'Dilnoza',
      lastName: 'Saidova',
      university: 'BMU',
      major: 'Medicine',
      avatar: undefined,
    },
  },
];

// =============================================
// Constants
// =============================================

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
  PENDING: { label: 'Yangi', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  REVIEWING: { label: 'Ko\'rib chiqilmoqda', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  INTERVIEW: { label: 'Intervyu', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  OFFERED: { label: 'Taklif', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  REJECTED: { label: 'Rad etilgan', color: 'text-red-700', bgColor: 'bg-red-100' },
  WITHDRAWN: { label: 'Qaytarilgan', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

const jobStatusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Faol', color: 'bg-emerald-100 text-emerald-700' },
  PAUSED: { label: 'To\'xtatilgan', color: 'bg-yellow-100 text-yellow-700' },
  CLOSED: { label: 'Yopilgan', color: 'bg-gray-100 text-gray-700' },
  DRAFT: { label: 'Qoralama', color: 'bg-blue-100 text-blue-700' },
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
// Job Card Component
// =============================================

function JobCard({ job }: { job: Job }) {
  const config = jobStatusConfig[job.status];

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
              {job.isRemote && (
                <Badge variant="outline" className="text-xs">Masofaviy</Badge>
              )}
            </div>
          </div>
          <Badge className={config.color}>{config.label}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{job.applicationsCount} ariza</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{job.viewsCount} ko&apos;rish</span>
          </div>
        </div>

        <div className="flex justify-end mt-3 pt-3 border-t gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Tahrirlash
          </Button>
          <Button size="sm" asChild>
            <Link href={`/dashboard/company/jobs/${job.id}`}>
              Arizalar
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================
// Application Card Component
// =============================================

function ApplicationCard({ application }: { application: typeof mockApplications[0] }) {
  const config = statusConfig[application.status];

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                {application.student.firstName[0]}{application.student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{application.student.firstName} {application.student.lastName}</h3>
              <p className="text-sm text-muted-foreground">{application.student.university}</p>
            </div>
          </div>
          <Badge className={config.bgColor}>
            <span className={config.color}>{config.label}</span>
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          Lavozim: <span className="font-medium text-foreground">{application.job?.title}</span>
        </p>

        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <span className="text-xs text-muted-foreground">{formatDate(application.createdAt)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Profil
            </Button>
            {application.status === 'PENDING' && (
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                Ko'rib chiqish
              </Button>
            )}
            {application.status === 'INTERVIEW' && (
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                Intervyu
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================
// Main Company Dashboard Page
// =============================================

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header with Glass Card */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-card border border-border/50 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl rounded-2xl">
              <AvatarImage src={mockCompany.logo} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold rounded-2xl">
                {mockCompany.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{mockCompany.name}</h1>
                {mockCompany.isVerified && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-2 py-0 h-5 flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    Tasdiqlangan
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {mockCompany.industry}
                </div>
                <div className="h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {mockCompany.companySize} xodim
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="w-full lg:w-72 space-y-3 bg-secondary/20 p-5 rounded-2xl border border-border/40">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-foreground/80 uppercase tracking-tight">Kompaniya profili</span>
              <span className="font-bold text-primary">85%</span>
            </div>
            <Progress value={85} className="h-2 bg-background" />
            <p className="text-[11px] font-medium text-muted-foreground">
              To'liq profil ko'proq iqtidorli talabalarni jalb qiladi!
            </p>
            <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary" asChild>
              <Link href="/dashboard/company/profile">Tahrirlash →</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Faol ishlar', value: mockStats.activeJobsCount, icon: Briefcase, color: 'text-primary' },
          { label: 'Arizalar', value: mockStats.totalApplicationsCount, icon: Users, color: 'text-primary' },
          { label: 'Yangi', value: mockStats.newApplicationsCount, icon: Clock, color: 'text-primary' },
          { label: 'Ishga olingan', value: mockStats.hiredCount, icon: UserCheck, color: 'text-primary' },
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
        <div className="lg:col-span-2 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 border border-border p-1 rounded-lg h-12 w-fit">
              <TabsTrigger value="jobs" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Ish e'lonlari
              </TabsTrigger>
              <TabsTrigger value="startups" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                Startaplar
              </TabsTrigger>
              <TabsTrigger value="applications" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm h-full px-6 text-sm font-medium transition-all">
                So'nggi arizalar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="mt-6 space-y-4">
              {mockJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10 ${job.status === 'ACTIVE' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{job.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Users size={14} /> {job.applicationsCount} ariza</span>
                        <span className="flex items-center gap-1"><Eye size={14} /> {job.viewsCount} ko'rish</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={`px-4 py-1 rounded-full ${job.status === 'ACTIVE' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-white/5 text-muted-foreground border-white/10'}`}>
                      {job.status === 'ACTIVE' ? 'Faol' : 'To\'xtatilgan'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                      <Edit size={20} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="startups" className="mt-6 space-y-4">
              {mockStartups.map((startup, i) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                      <Rocket size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{startup.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{startup.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          {startup.stage}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {startup.teamSize}
                        </span>
                        <span>{startup.fundingGoal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{startup.founderName}</p>
                      <p className="text-xs text-muted-foreground">{startup.founderUniversity}</p>
                    </div>
                    <Button size="sm" className="bg-white/5 hover:bg-white/10 rounded-full px-4">
                      Ko'rish
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="applications" className="mt-6 space-y-4">
              {mockApplications.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <Avatar className="h-14 w-14 border border-white/10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {app.student.firstName[0]}{app.student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold">{app.student.firstName} {app.student.lastName}</h4>
                      <p className="text-sm text-muted-foreground">{app.job?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">Yangi</Badge>
                    <Button size="sm" className="bg-white/5 hover:bg-white/10 rounded-full px-4">
                      Ko'rish
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[32px] border border-white/10">
            <h3 className="text-xl font-bold mb-6">Yaqinda rejalashtirilgan</h3>
            <div className="space-y-6">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h5 className="font-semibold">Intervyu: Aziz K.</h5>
                    <p className="text-xs text-muted-foreground mt-1">Bugun, 15:00 • Google Meet</p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full text-primary p-0">
                Kalendarni ko'rish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
