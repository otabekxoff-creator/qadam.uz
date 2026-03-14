'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, FileText, Eye, Clock, CheckCircle, XCircle,
  TrendingUp, Calendar, MapPin, Building2, ArrowRight,
  Plus, Edit, Settings, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header with Glass Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-8 rounded-[32px] border border-white/10 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Xush kelibsiz, Talaba!
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Sizning bugungi karyera holatingiz va yangi imkoniyatlar.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/80 glow-primary rounded-full px-6" asChild>
              <Link href="/profile">
                <Plus className="mr-2 h-4 w-4" />
                Profilni tahrirlash
              </Link>
            </Button>
            <Button variant="outline" className="glass border-white/10 rounded-full" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Sozlamalar
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid with Glowing Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Arizalar', value: mockStats.applicationsCount, icon: FileText, color: 'text-blue-400' },
          { label: 'Suhbatlar', value: mockStats.interviewsCount, icon: Calendar, color: 'text-primary' },
          { label: 'Takliflar', value: mockStats.offersCount, icon: Award, color: 'text-yellow-400' },
          { label: 'Ko\'rishlar', value: mockStats.profileViews, icon: Eye, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp size={20} className="text-primary/40" />
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-14">
              <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full px-8 text-lg font-medium transition-all">
                Arizalar
              </TabsTrigger>
              <TabsTrigger value="saved" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full px-8 text-lg font-medium transition-all">
                Saqlanganlar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-4">
              {mockApplications.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-2xl font-bold group-hover:scale-105 transition-transform">
                      {app.job?.company?.name?.[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{app.job?.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} /> {app.job?.company?.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {app.job?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge variant="outline" className={`px-4 py-1.5 rounded-full border-white/10 ${
                      app.status === 'INTERVIEW' ? 'bg-primary/20 text-primary border-primary/30' :
                      app.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                      'bg-red-400/20 text-red-400 border-red-400/30'
                    }`}>
                      {app.status === 'INTERVIEW' ? 'Suhbat' :
                       app.status === 'PENDING' ? 'Kutilmoqda' : 'Rad etildi'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary" asChild>
                      <Link href={`/jobs/${app.jobId}`}>
                        <ArrowRight size={20} />
                      </Link>
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
