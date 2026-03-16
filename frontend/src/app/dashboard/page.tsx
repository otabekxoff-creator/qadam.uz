'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores';
import { Loader2, ArrowRight, TrendingUp, Users, Briefcase, MessageCircle, Bell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, student, company } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar user ma'lumotlari yo'q bo'lsa, login ga yo'naltirish
    if (!user) {
      router.push('/login');
      return;
    }

    // Role ga qarab to'g'ri dashboard ga yo'naltirish
    if (user.role === 'STUDENT' && student) {
      router.push('/dashboard/student');
    } else if (user.role === 'COMPANY' && company) {
      router.push('/dashboard/company');
    }

    // Mock stats yuklash
    const mockStats = {
      totalUsers: 15420,
      totalJobs: 892,
      totalStartups: 234,
      activeChats: 1567,
      newApplications: 89,
      pendingReviews: 23,
    };
    setStats(mockStats);
    setLoading(false);
  }, [user, student, company, router]);

  // Agar user ma'lumotlari yo'q bo'lsa, loader ko'rsatish
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Role ga qarab dashboard tanlash
  if (user.role === 'STUDENT') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Talaba Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                {student ? `Xush kelibsiz, ${student.firstName} ${student.lastName}!` : 'Yuklanmoqda...'}
              </p>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Faol Vakansiyalar</p>
                          <p className="text-3xl font-bold">{stats.totalJobs}</p>
                        </div>
                        <Briefcase className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Startaplar</p>
                          <p className="text-3xl font-bold">{stats.totalStartups}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Faol Chatlar</p>
                          <p className="text-3xl font-bold">{stats.activeChats}</p>
                        </div>
                        <MessageCircle className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Arizalar</p>
                          <p className="text-3xl font-bold">{stats.newApplications}</p>
                        </div>
                        <Users className="h-8 w-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/student">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Mening Profilim
                      </CardTitle>
                      <CardDescription>
                        Shaxsiy ma'lumotlarni boshqarish
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/jobs">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Vakansiyalar
                      </CardTitle>
                      <CardDescription>
                        Yangi ish imkoniyatlarini toping
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Ko'rish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/startups">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Startaplar
                      </CardTitle>
                      <CardDescription>
                        Innovatsion loyihalarni ko'ring
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Ko'rish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/chat">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Xabarlar
                      </CardTitle>
                      <CardDescription>
                        Kompaniyalar bilan suhbat qiling
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/notifications">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Bildirishnomalar
                      </CardTitle>
                      <CardDescription>
                        So'nggi yangiliklar va bildirishnomalar
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/startups/create">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Startap Yaratish
                      </CardTitle>
                      <CardDescription>
                        O'zingizning startapingizni yarating
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Boshlash <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {student ? (
              <>
                <Link href="/dashboard/student">
                  <Button className="w-full" size="lg">

  // Admin dashboard
  if (user.role === 'ADMIN') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Platformni boshqarish
              </p>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Jami Foydalanuvchilar</p>
                          <p className="text-3xl font-bold">{stats.totalUsers}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Jami Vakansiyalar</p>
                          <p className="text-3xl font-bold">{stats.totalJobs}</p>
                        </div>
                        <Briefcase className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Startaplar</p>
                          <p className="text-3xl font-bold">{stats.totalStartups}</p>
                        </div>
                        <Star className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Tekshirishda</p>
                          <p className="text-3xl font-bold">{stats.pendingReviews}</p>
                        </div>
                        <Bell className="h-8 w-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/admin">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Foydalanuvchilar
                      </CardTitle>
                      <CardDescription>
                        Barcha foydalanuvchilarni boshqarish
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/admin">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Vakansiyalar
                      </CardTitle>
                      <CardDescription>
                        Barcha vakansiyalarni boshqarish
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href="/dashboard/admin">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Startaplar
                      </CardTitle>
                      <CardDescription>
                        Startaplarni tekshirish va tasdiqlash
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Kirish <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>
            Xush kelibsiz, {user?.email || 'Foydalanuvchi'}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>📱 Profil ma'lumotlari</p>
            <p>🚀 Startap loyihalari</p>
            <p>💼 Ish e'lonlari</p>
            <p>📊 Statistika</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
