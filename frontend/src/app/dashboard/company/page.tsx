'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, Users, Eye, Clock, CheckCircle, Plus,
  TrendingUp, Calendar, MapPin, Building2, ArrowRight,
  Edit, Settings, FileText, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header with Glass Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-8 rounded-[32px] border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Building2 size={120} className="text-primary" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-3xl font-bold">
              {mockCompany.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {mockCompany.name}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Kompaniya boshqaruv paneli. Kelajak jamoasini tuzing.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/80 glow-primary rounded-full px-6">
              <Plus className="mr-2 h-4 w-4" />
              Yangi ish e'loni
            </Button>
            <Button variant="outline" className="glass border-white/10 rounded-full">
              <Settings className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faol ishlar', value: mockStats.activeJobsCount, icon: Briefcase, color: 'text-blue-400' },
          { label: 'Arizalar', value: mockStats.totalApplicationsCount, icon: Users, color: 'text-primary' },
          { label: 'Yangi', value: mockStats.newApplicationsCount, icon: Clock, color: 'text-yellow-400' },
          { label: 'Ishga olingan', value: mockStats.hiredCount, icon: UserCheck, color: 'text-purple-400' },
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
        <div className="lg:col-span-2 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-14 w-fit">
              <TabsTrigger value="jobs" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full px-8 text-lg font-medium transition-all">
                Ish e'lonlari
              </TabsTrigger>
              <TabsTrigger value="applications" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full px-8 text-lg font-medium transition-all">
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
