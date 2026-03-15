'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, Building2, Rocket, FileText, Eye,
  TrendingUp, Clock, CheckCircle, XCircle, AlertCircle,
  Settings, Shield, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Cell, Pie
} from 'recharts';

// =============================================
// Mock Data
// =============================================

const userGrowthData = [
  { name: 'Yan', students: 400, companies: 40 },
  { name: 'Fev', students: 700, companies: 60 },
  { name: 'Mar', students: 1200, companies: 100 },
  { name: 'Apr', students: 1800, companies: 150 },
  { name: 'May', students: 2500, companies: 220 },
  { name: 'Iyun', students: 3890, companies: 633 },
];

const startupStatusData = [
  { name: 'Tasdiqlangan', value: 85, color: '#10b981' },
  { name: 'Kutilmoqda', value: 23, color: '#f59e0b' },
  { name: 'Rad etilgan', value: 12, color: '#ef4444' },
  { name: 'Moliyalashtirilgan', value: 25, color: '#6366f1' },
];

const jobCategoryData = [
  { name: 'Frontend', jobs: 450 },
  { name: 'Backend', jobs: 380 },
  { name: 'Design', jobs: 220 },
  { name: 'Marketing', jobs: 120 },
  { name: 'Data', jobs: 86 },
];

// =============================================
// Mock Data
// =============================================

const mockStats = {
  totalUsers: 4523,
  totalStudents: 3890,
  totalCompanies: 633,
  totalJobs: 1256,
  totalApplications: 8934,
  totalStartups: 145,
  pendingStartups: 23,
  activeJobs: 892,
};

const mockRecentUsers = [
  { id: '1', name: 'Aziz Karimov', email: 'aziz@email.com', role: 'STUDENT', createdAt: '2024-01-15' },
  { id: '2', name: 'TechPark', email: 'hr@techpark.uz', role: 'COMPANY', createdAt: '2024-01-14' },
  { id: '3', name: 'Dilnoza Rahimova', email: 'dilnoza@email.com', role: 'STUDENT', createdAt: '2024-01-13' },
  { id: '4', name: 'Uzum', email: 'hr@uzum.uz', role: 'COMPANY', createdAt: '2024-01-12' },
  { id: '5', name: 'Bobur Saidov', email: 'bobur@email.com', role: 'STUDENT', createdAt: '2024-01-11' },
];

const mockPendingStartups = [
  { id: '1', name: 'EduTech Uzbekistan', founder: 'Aziz Karimov', industry: 'EdTech', fundingNeeded: 500000000, createdAt: '2024-01-10' },
  { id: '2', name: 'AgroSmart', founder: 'Dilnoza Rahimova', industry: 'AgroTech', fundingNeeded: 800000000, createdAt: '2024-01-09' },
  { id: '3', name: 'MediConnect', founder: 'Bobur Saidov', industry: 'HealthTech', fundingNeeded: 300000000, createdAt: '2024-01-08' },
];

const mockRecentJobs = [
  { id: '1', title: 'Senior Frontend Developer', company: 'TechPark', applications: 28, status: 'ACTIVE', createdAt: '2024-01-15' },
  { id: '2', title: 'Backend Developer', company: 'Uzum', applications: 19, status: 'ACTIVE', createdAt: '2024-01-14' },
  { id: '3', title: 'UI/UX Designer', company: 'Yandex', applications: 15, status: 'ACTIVE', createdAt: '2024-01-13' },
  { id: '4', title: 'DevOps Engineer', company: 'Payme', applications: 8, status: 'PAUSED', createdAt: '2024-01-12' },
];

// =============================================
// Helper Functions
// =============================================

const formatMoney = (amount: number) => {
  return amount.toLocaleString('uz-UZ') + ' so\'m';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    month: 'short',
    day: 'numeric',
  });
};

// =============================================
// Stats Card Component
// =============================================

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color,
  trend 
}: { 
  title: string; 
  value: number | string; 
  icon: typeof Users; 
  color: string;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend && (
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {trend}
              </p>
            )}
          </div>
          <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================
// Main Admin Dashboard Page
// =============================================

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-background perspective-[1200px]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platformani boshqarish va statistika</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Sozlamalar
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <StatsCard
            title="Jami foydalanuvchilar"
            value={mockStats.totalUsers.toLocaleString()}
            icon={Users}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            trend="+12% bu oy"
          />
          <StatsCard
            title="Talabalar"
            value={mockStats.totalStudents.toLocaleString()}
            icon={Users}
            color="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
          <StatsCard
            title="Kompaniyalar"
            value={mockStats.totalCompanies.toLocaleString()}
            icon={Building2}
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          />
          <StatsCard
            title="Faol ishlar"
            value={mockStats.activeJobs.toLocaleString()}
            icon={Briefcase}
            color="bg-gradient-to-br from-orange-500 to-red-600"
          />
        </motion.div>

        {/* Second Row Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <StatsCard
            title="Jami arizalar"
            value={mockStats.totalApplications.toLocaleString()}
            icon={FileText}
            color="bg-gradient-to-br from-cyan-500 to-blue-600"
          />
          <StatsCard
            title="Startaplar"
            value={mockStats.totalStartups.toLocaleString()}
            icon={Rocket}
            color="bg-gradient-to-br from-violet-500 to-purple-600"
          />
          <StatsCard
            title="Kutilayotgan startaplar"
            value={mockStats.pendingStartups}
            icon={Clock}
            color="bg-gradient-to-br from-yellow-500 to-orange-600"
          />
          <StatsCard
            title="Ko&apos;rishlar (oy)"
            value="125K"
            icon={Eye}
            color="bg-gradient-to-br from-pink-500 to-rose-600"
            trend="+8% o'sish"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Boshqaruv
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Umumiy</TabsTrigger>
                  <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
                  <TabsTrigger value="startups">Startaplar</TabsTrigger>
                  <TabsTrigger value="jobs">Ishlar</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <Card className="border-border/50 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Foydalanuvchilar o'sishi
                        </CardTitle>
                        <CardDescription>Oxirgi 6 oylik ko'rsatkichlar</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData}>
                              <defs>
                                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#64748b', fontSize: 12}}
                                dy={10}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#64748b', fontSize: 12}}
                              />
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="students" 
                                stroke="#2563eb" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorStudents)" 
                                name="Talabalar"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Startup Status Pie Chart */}
                    <Card className="border-border/50 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <PieChartIcon className="h-4 w-4 text-primary" />
                          Startaplar holati
                        </CardTitle>
                        <CardDescription>Barcha startaplar taqsimoti</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={startupStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {startupStatusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {startupStatusData.map((entry) => (
                              <div key={entry.name} className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-xs font-medium text-muted-foreground">{entry.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Yangi foydalanuvchilar</CardTitle>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/admin/users">Barchasi</Link>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockRecentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className={user.role === 'STUDENT' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-purple-100 text-purple-700'
                                  }>
                                    {user.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className={user.role === 'STUDENT' 
                                ? 'border-emerald-200 text-emerald-700' 
                                : 'border-purple-200 text-purple-700'
                              }>
                                {user.role === 'STUDENT' ? 'Talaba' : 'Kompaniya'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pending Startups */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Kutilayotgan startaplar</CardTitle>
                          <Badge variant="secondary">{mockStats.pendingStartups}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockPendingStartups.map((startup) => (
                            <div key={startup.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                              <div>
                                <p className="text-sm font-medium">{startup.name}</p>
                                <p className="text-xs text-muted-foreground">{startup.founder} • {startup.industry}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{formatMoney(startup.fundingNeeded)}</span>
                                <Button size="sm" variant="outline" className="h-7">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="cursor-pointer">Barchasi</Badge>
                      <Badge variant="outline" className="cursor-pointer">Talabalar</Badge>
                      <Badge variant="outline" className="cursor-pointer">Kompaniyalar</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mockRecentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={user.role === 'STUDENT' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-purple-100 text-purple-700'
                            }>
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</span>
                          <Badge variant="outline">{user.role === 'STUDENT' ? 'Talaba' : 'Kompaniya'}</Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Startups Tab */}
                <TabsContent value="startups" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="cursor-pointer">Barchasi</Badge>
                      <Badge variant="outline" className="cursor-pointer bg-yellow-50 text-yellow-700">Kutilmoqda</Badge>
                      <Badge variant="outline" className="cursor-pointer">Tasdiqlangan</Badge>
                      <Badge variant="outline" className="cursor-pointer text-red-700">Rad etilgan</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mockPendingStartups.map((startup) => (
                      <div key={startup.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                            {startup.name[0]}
                          </div>
                          <div>
                            <p className="font-medium">{startup.name}</p>
                            <p className="text-sm text-muted-foreground">{startup.founder} • {startup.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{formatMoney(startup.fundingNeeded)}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Tasdiqlash
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                              <XCircle className="h-4 w-4 mr-1" />
                              Rad etish
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Jobs Tab */}
                <TabsContent value="jobs" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="cursor-pointer">Barchasi</Badge>
                      <Badge variant="outline" className="cursor-pointer bg-emerald-50 text-emerald-700">Faol</Badge>
                      <Badge variant="outline" className="cursor-pointer bg-yellow-50 text-yellow-700">To&apos;xtatilgan</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mockRecentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                            {job.company[0]}
                          </div>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{job.applications} ariza</span>
                          <Badge variant="outline" className={job.status === 'ACTIVE' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }>
                            {job.status === 'ACTIVE' ? 'Faol' : 'To\'xtatilgan'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
