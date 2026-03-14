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

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-background perspective-[1200px]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -8 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {mockCompany.logo ? (
                      <img src={mockCompany.logo} alt={mockCompany.name} className="h-full w-full rounded-2xl object-cover" />
                    ) : (
                      mockCompany.name[0]
                    )}
                  </div>
                  <h2 className="font-semibold text-lg">{mockCompany.name}</h2>
                  <p className="text-sm text-muted-foreground">{mockCompany.industry}</p>
                  
                  {mockCompany.isVerified && (
                    <Badge className="mt-2 bg-emerald-100 text-emerald-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Tasdiqlangan
                    </Badge>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" size="sm" asChild>
                      <Link href="/profile">
                        <Edit className="h-4 w-4 mr-1" />
                        Tahrirlash
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" size-sm="true" asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -8 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Link href="/dashboard/company/jobs/create" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <Plus className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">Yangi ish e&apos;lon qilish</span>
                    </Link>
                    <Link href="/dashboard/company/applications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Barcha arizalar</span>
                    </Link>
                    <Link href={`/companies/${mockCompany.id}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <Building2 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Kompaniya profili</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.activeJobsCount}</p>
                      <p className="text-xs text-muted-foreground">Faol ishlar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.newApplicationsCount}</p>
                      <p className="text-xs text-muted-foreground">Yangi arizalar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.interviewsScheduled}</p>
                      <p className="text-xs text-muted-foreground">Intervyular</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.hiredCount}</p>
                      <p className="text-xs text-muted-foreground">Ishga olindi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Jobs & Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Boshqaruv</CardTitle>
                    <Button asChild>
                      <Link href="/dashboard/company/jobs/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Ish e&apos;lon qilish
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Ish e&apos;lonlari</TabsTrigger>
                      <TabsTrigger value="applications">Arizalar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-3">
                      {mockJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </TabsContent>

                    <TabsContent value="applications" className="space-y-3">
                      {mockApplications.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
