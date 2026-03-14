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

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-background perspective-[1200px]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -8 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={mockStudent.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl">
                      {mockStudent.firstName[0]}{mockStudent.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{mockStudent.firstName} {mockStudent.lastName}</h2>
                  <p className="text-sm text-muted-foreground">{mockStudent.university}</p>
                  <p className="text-xs text-muted-foreground">{mockStudent.faculty}, {mockStudent.course}-kurs</p>

                  {/* Profile Completeness */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profil to&apos;liqligi</span>
                      <span className="font-medium">{mockStudent.profileCompleteness}%</span>
                    </div>
                    <Progress value={mockStudent.profileCompleteness} className="h-2" />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" size="sm" asChild>
                      <Link href="/profile">
                        <Edit className="h-4 w-4 mr-1" />
                        Tahrirlash
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" size-sm asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -8 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Ko&apos;nikmalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {mockStudent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Qo&apos;shish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -8 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Link href="/startups/create" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <Plus className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">Startap yaratish</span>
                    </Link>
                    <Link href="/jobs" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Ishlarni ko&apos;rish</span>
                    </Link>
                    <Link href="/companies" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                      <Building2 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Kompaniyalar</span>
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
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.applicationsCount}</p>
                      <p className="text-xs text-muted-foreground">Arizalar</p>
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
                      <p className="text-2xl font-bold">{mockStats.interviewsCount}</p>
                      <p className="text-xs text-muted-foreground">Intervyular</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      <Award className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.offersCount}</p>
                      <p className="text-xs text-muted-foreground">Takliflar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockStats.profileViews}</p>
                      <p className="text-xs text-muted-foreground">Ko&apos;rishlar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Arizalarim</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/student/applications">
                        Barchasi
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Barchasi</TabsTrigger>
                      <TabsTrigger value="pending">Kutilmoqda</TabsTrigger>
                      <TabsTrigger value="interview">Intervyu</TabsTrigger>
                      <TabsTrigger value="offered">Takliflar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-3">
                      {mockApplications.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                      ))}
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-3">
                      {mockApplications
                        .filter((app) => app.status === 'PENDING' || app.status === 'REVIEWING')
                        .map((app) => (
                          <ApplicationCard key={app.id} application={app} />
                        ))}
                    </TabsContent>

                    <TabsContent value="interview" className="space-y-3">
                      {mockApplications
                        .filter((app) => app.status === 'INTERVIEW')
                        .map((app) => (
                          <ApplicationCard key={app.id} application={app} />
                        ))}
                    </TabsContent>

                    <TabsContent value="offered" className="space-y-3">
                      {mockApplications
                        .filter((app) => app.status === 'OFFERED')
                        .map((app) => (
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
