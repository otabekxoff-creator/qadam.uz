'use client';

import { useState } from 'react';
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
  DollarSign,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Jami Foydalanuvchilar', value: '12,456', change: '+12%', icon: Users },
    { label: 'Aktiv Ish O\'rinlari', value: '3,842', change: '+8%', icon: Briefcase },
    { label: 'Kompaniyalar', value: '1,234', change: '+15%', icon: Building2 },
    { label: 'Arizalar', value: '45,231', change: '+23%', icon: TrendingUp },
  ];

  const recentUsers = [
    { name: 'Nodira Karimova', email: 'nodira@example.com', type: 'Student', date: '2024-01-15' },
    { name: 'TechCorp LLC', email: 'hr@techcorp.uz', type: 'Company', date: '2024-01-15' },
    { name: 'Jasur Rahimov', email: 'jasur@example.com', type: 'Student', date: '2024-01-14' },
    { name: 'InnovateTech', email: 'info@innovate.uz', type: 'Company', date: '2024-01-14' },
  ];

  const recentJobs = [
    { title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Toshkent', posted: '2 soat oldin' },
    { title: 'Product Manager', company: 'StartupXYZ', location: 'Remote', posted: '5 soat oldin' },
    { title: 'UX/UI Designer', company: 'DesignStudio', location: 'Samarqand', posted: '1 kun oldin' },
    { title: 'DevOps Engineer', company: 'CloudTech', location: 'Remote', posted: '1 kun oldin' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
    { id: 'users', label: 'Foydalanuvchilar', icon: Users },
    { id: 'companies', label: 'Kompaniyalar', icon: Building2 },
    { id: 'jobs', label: 'Ish O\'rinlari', icon: Briefcase },
    { id: 'messages', label: 'Xabarlar', icon: MessageSquare },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];

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
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-red-500">
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Chiqish</span>}
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {menuItems.find(item => item.id === activeTab)?.label || 'Boshqaruv Paneli'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Admin</span>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">A</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-green-500 text-sm mt-1">{stat.change} bu oy</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl shadow-sm border"
              >
                <div className="p-6 border-b">
                  <h2 className="font-semibold text-lg">So\'nggi Foydalanuvchilar</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                            <span className="font-semibold">{user.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.type === 'Student' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.type}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">{user.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-xl shadow-sm border"
              >
                <div className="p-6 border-b">
                  <h2 className="font-semibold text-lg">So\'nggi Ish O\'rinlari</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentJobs.map((job, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{job.posted}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Other Tabs */}
        {activeTab !== 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl p-12 text-center shadow-sm border"
          >
            <p className="text-muted-foreground">
              Bu bo\'lim tez orada mavjud bo\'ladi
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
