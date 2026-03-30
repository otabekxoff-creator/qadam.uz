'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  DollarSign,
  Globe,
  Clock,
  Ban,
  Eye,
  Edit,
  Trash2,
  Mail,
  Bell,
  Lock,
  Unlock,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

// ============================================================================
// Mock Admin Data
// ============================================================================

const ADMIN_STATS = {
  totalUsers: 45678,
  totalCompanies: 3421,
  totalJobs: 12345,
  totalApplications: 98765,
  activeUsersToday: 5678,
  newUsersToday: 234,
  revenue: 12500000,
  growthRate: 23.5,
};

const RECENT_USERS = [
  { id: 1, name: 'Azizbek Rahimov', email: 'aziz@example.com', role: 'STUDENT', status: 'active', joinedAt: '2026-03-28', avatar: null },
  { id: 2, name: 'Dilshod Karimov', email: 'dilshod@example.com', role: 'COMPANY', status: 'active', joinedAt: '2026-03-28', avatar: null },
  { id: 3, name: 'Malika Tursunova', email: 'malika@example.com', role: 'STUDENT', status: 'pending', joinedAt: '2026-03-27', avatar: null },
  { id: 4, name: 'Umidjon Xalilov', email: 'umid@example.com', role: 'STUDENT', status: 'banned', joinedAt: '2026-03-26', avatar: null },
  { id: 5, name: 'Nodira Azimova', email: 'nodira@example.com', role: 'COMPANY', status: 'active', joinedAt: '2026-03-26', avatar: null },
];

const RECENT_JOBS = [
  { id: 1, title: 'Senior Frontend Developer', company: 'Tech Solutions', location: 'Tashkent', status: 'active', views: 1234, applications: 45, postedAt: '2026-03-28' },
  { id: 2, title: 'Backend Engineer', company: 'Digital Agency', location: 'Remote', status: 'pending', views: 567, applications: 23, postedAt: '2026-03-27' },
  { id: 3, title: 'UI/UX Designer', company: 'Creative Studio', location: 'Tashkent', status: 'active', views: 890, applications: 34, postedAt: '2026-03-27' },
  { id: 4, title: 'Product Manager', company: 'Startup Hub', location: 'Samarkand', status: 'expired', views: 2345, applications: 67, postedAt: '2026-03-25' },
];

const SYSTEM_ALERTS = [
  { id: 1, type: 'warning', message: 'Server CPU usage above 80%', time: '5 minutes ago', resolved: false },
  { id: 2, type: 'error', message: 'Database connection timeout', time: '15 minutes ago', resolved: true },
  { id: 3, type: 'info', message: 'New version deployed successfully', time: '1 hour ago', resolved: true },
  { id: 4, type: 'warning', message: 'Unusual login activity detected', time: '2 hours ago', resolved: false },
];

const PLATFORM_METRICS = [
  { name: 'API Response Time', value: 125, unit: 'ms', target: 200, status: 'good' },
  { name: 'Database Connections', value: 78, unit: '', target: 100, status: 'good' },
  { name: 'Error Rate', value: 0.5, unit: '%', target: 1, status: 'warning' },
  { name: 'Uptime', value: 99.9, unit: '%', target: 99.5, status: 'good' },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-0',
      pending: 'bg-yellow-100 text-yellow-700 border-0',
      banned: 'bg-red-100 text-red-700 border-0',
      expired: 'bg-gray-100 text-gray-700 border-0',
    };
    return <Badge className={styles[status as keyof typeof styles] || ''}>{status}</Badge>;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Platform management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500 text-white">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), icon: Users, change: '+12%' },
                { label: 'Total Companies', value: ADMIN_STATS.totalCompanies.toLocaleString(), icon: Building2, change: '+8%' },
                { label: 'Active Jobs', value: ADMIN_STATS.totalJobs.toLocaleString(), icon: Briefcase, change: '+15%' },
                { label: 'Applications', value: ADMIN_STATS.totalApplications.toLocaleString(), icon: FileText, change: '+23%' },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600">{stat.change}</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Users */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Users</CardTitle>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {RECENT_USERS.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{user.role}</Badge>
                            {getStatusBadge(user.status)}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* System Alerts */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-red-500" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {SYSTEM_ALERTS.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                          </div>
                          {alert.resolved && (
                            <Badge className="bg-green-100 text-green-700 border-0 text-xs">Resolved</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Jobs */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Job Postings</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Job Title</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Company</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Applications</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_JOBS.map((job) => (
                          <tr key={job.id} className="border-b last:border-0">
                            <td className="py-3 px-4">
                              <p className="font-medium text-gray-900">{job.title}</p>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{job.company}</td>
                            <td className="py-3 px-4 text-gray-600">{job.location}</td>
                            <td className="py-3 px-4">{getStatusBadge(job.status)}</td>
                            <td className="py-3 px-4 text-gray-600">{job.views.toLocaleString()}</td>
                            <td className="py-3 px-4 text-gray-600">{job.applications}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button>
                      <Ban className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">User</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_USERS.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.role}</td>
                          <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                          <td className="py-3 px-4">{user.joinedAt}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Ban className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {PLATFORM_METRICS.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                          <span className={`text-sm font-bold ${
                            metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {metric.value}{metric.unit}
                          </span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Target: {metric.target}{metric.unit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Web Server', status: 'operational', uptime: '99.99%' },
                      { name: 'Database', status: 'operational', uptime: '99.95%' },
                      { name: 'API Gateway', status: 'operational', uptime: '99.98%' },
                      { name: 'File Storage', status: 'operational', uptime: '100%' },
                      { name: 'Email Service', status: 'degraded', uptime: '98.5%' },
                    ].map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            service.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            service.status === 'operational' 
                              ? 'bg-green-100 text-green-700 border-0' 
                              : 'bg-yellow-100 text-yellow-700 border-0'
                          }>
                            {service.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{service.uptime} uptime</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
