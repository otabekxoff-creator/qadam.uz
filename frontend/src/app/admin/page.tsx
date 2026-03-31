'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  Settings, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  student?: { firstName: string; lastName: string };
  company?: { name: string };
  _count?: { applications: number };
}

interface Job {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  company?: { id: string; name: string; logo: string };
  _count?: { applications: number };
}

interface Stats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalCompanies: number;
  activeJobs: number;
  pendingApplications: number;
}

export default function AdminPanel() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Stats
  const [stats, setStats] = useState<Stats | null>(null);
  
  // Users
  const [users, setUsers] = useState<User[]>([]);
  const [usersMeta, setUsersMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [usersSearch, setUsersSearch] = useState('');
  const [usersPage, setUsersPage] = useState(1);
  
  // Jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsMeta, setJobsMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [jobsSearch, setJobsSearch] = useState('');
  const [jobsPage, setJobsPage] = useState(1);
  
  // Check auth
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    if (user && user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [token, user, router]);

  // Load stats
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadStats();
    }
  }, [activeTab]);

  // Load users
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab, usersPage, usersSearch]);

  // Load jobs
  useEffect(() => {
    if (activeTab === 'jobs') {
      loadJobs();
    }
  }, [activeTab, jobsPage, jobsSearch]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getStats() as { success: boolean; data: Stats };
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      setError('Statistikani yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getUsers({ 
        page: usersPage, 
        limit: 10, 
        search: usersSearch || undefined 
      }) as { success: boolean; data: User[]; meta: { total: number; page: number; totalPages: number } };
      if (response.success) {
        setUsers(response.data);
        setUsersMeta(response.meta || { total: 0, page: 1, totalPages: 1 });
      }
    } catch (err) {
      setError('Foydalanuvchilarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllJobs({ 
        page: jobsPage, 
        limit: 10, 
        search: jobsSearch || undefined 
      }) as { success: boolean; data: Job[]; meta: { total: number; page: number; totalPages: number } };
      if (response.success) {
        setJobs(response.data);
        setJobsMeta(response.meta || { total: 0, page: 1, totalPages: 1 });
      }
    } catch (err) {
      setError('Ish o\'rinlarini yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (id: string) => {
    try {
      await adminApi.verifyUser(id);
      loadUsers();
    } catch (err) {
      setError('Foydalanuvchini tasdiqlashda xatolik');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Rostdan ham bu foydalanuvchini o\'chirmoqchimisiz?')) return;
    try {
      await adminApi.deleteUser(id);
      loadUsers();
    } catch (err) {
      setError('Foydalanuvchini o\'chirishda xatolik');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Rostdan ham bu ish o\'rnini o\'chirmoqchimisiz?')) return;
    try {
      await adminApi.deleteJob(id);
      loadJobs();
    } catch (err) {
      setError('Ish o\'rnini o\'chirishda xatolik');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getUserName = (user: User) => {
    if (user.student) {
      return `${user.student.firstName} ${user.student.lastName}`;
    }
    if (user.company) {
      return user.company.name;
    }
    return user.email;
  };

  const menuItems = [
    { id: 'dashboard', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
    { id: 'users', label: 'Foydalanuvchilar', icon: Users },
    { id: 'jobs', label: 'Ish O\'rinlari', icon: Briefcase },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];

  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-card border-r h-screen sticky top-0 overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link href="/" className="text-xl font-bold">
              SINERGIYA Admin
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-red-500"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Chiqish</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {menuItems.find(item => item.id === activeTab)?.label || 'Boshqaruv Paneli'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user.email}</span>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">{user.email[0].toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && !loading && stats && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Jami Foydalanuvchilar</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Jami Ish O\'rinlari</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalJobs.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Aktiv Ish O\'rinlari</p>
                    <p className="text-3xl font-bold mt-1">{stats.activeJobs.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Jami Arizalar</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalApplications.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Kutilayotgan Arizalar</p>
                    <p className="text-3xl font-bold mt-1">{stats.pendingApplications.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Kompaniyalar</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalCompanies.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && !loading && (
          <div className="bg-card rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Foydalanuvchilar</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border bg-background"
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Foydalanuvchi</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Rol</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Arizalar</th>
                      <th className="text-left py-3 px-4">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                              <span className="font-semibold">{getUserName(user)[0]}</span>
                            </div>
                            <span className="font-medium">{getUserName(user)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'STUDENT' 
                              ? 'bg-blue-100 text-blue-700' 
                              : user.role === 'COMPANY'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.isVerified 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.isVerified ? 'Tasdiqlangan' : 'Kutilmoqda'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user._count?.applications || 0}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleVerifyUser(user.id)}
                              className={`p-2 rounded-lg ${
                                user.isVerified 
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                              title={user.isVerified ? 'Tasdiqni bekor qilish' : 'Tasdiqlash'}
                            >
                              {user.isVerified ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                              title="O\'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {usersMeta.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Jami: {usersMeta.total} ta
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                      disabled={usersPage === 1}
                      className="p-2 rounded-lg border disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2">
                      {usersPage} / {usersMeta.totalPages}
                    </span>
                    <button
                      onClick={() => setUsersPage(p => Math.min(usersMeta.totalPages, p + 1))}
                      disabled={usersPage === usersMeta.totalPages}
                      className="p-2 rounded-lg border disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && !loading && (
          <div className="bg-card rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Ish O\'rinlari</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={jobsSearch}
                    onChange={(e) => setJobsSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border bg-background"
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Ish</th>
                      <th className="text-left py-3 px-4">Kompaniya</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Arizalar</th>
                      <th className="text-left py-3 px-4">Sana</th>
                      <th className="text-left py-3 px-4">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{job.title}</td>
                        <td className="py-3 px-4">{job.company?.name || 'Noma\'lum'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {job.isActive ? 'Aktiv' : 'Nofaol'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{job._count?.applications || 0}</td>
                        <td className="py-3 px-4">
                          {new Date(job.createdAt).toLocaleDateString('uz-UZ')}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                            title="O\'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {jobsMeta.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Jami: {jobsMeta.total} ta
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setJobsPage(p => Math.max(1, p - 1))}
                      disabled={jobsPage === 1}
                      className="p-2 rounded-lg border disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2">
                      {jobsPage} / {jobsMeta.totalPages}
                    </span>
                    <button
                      onClick={() => setJobsPage(p => Math.min(jobsMeta.totalPages, p + 1))}
                      disabled={jobsPage === jobsMeta.totalPages}
                      className="p-2 rounded-lg border disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl p-8 shadow-sm border"
          >
            <h2 className="font-semibold text-lg mb-4">Admin Sozlamalari</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <p className="font-medium">Platform holati</p>
                  <p className="text-sm text-muted-foreground">Platforma ishga tushirish rejimi</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Aktiv</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <p className="font-medium">Ro\'yxatdan o\'tish</p>
                  <p className="text-sm text-muted-foreground">Yangi foydalanuvchilar ro\'yxatdan o\'tishi</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Ochiq</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">API holati</p>
                  <p className="text-sm text-muted-foreground">Backend API ulanishi</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
