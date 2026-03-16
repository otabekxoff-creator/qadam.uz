'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, student, company } = useAuthStore();

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Talaba Dashboard</CardTitle>
            <CardDescription>
              {student ? `Xush kelibsiz, ${student.firstName} ${student.lastName}!` : 'Yuklanmoqda...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {student ? (
              <>
                <Link href="/dashboard/student">
                  <Button className="w-full" size="lg">
                    Dashboardga o'tish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📱 Profil ma'lumotlari</p>
                  <p>🚀 Startap yaratish</p>
                  <p>💼 Ish e'lonlari</p>
                  <p>📊 Arizalar holati</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Ma'lumotlar yuklanmoqda...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role === 'COMPANY') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kompaniya Dashboard</CardTitle>
            <CardDescription>
              {company ? `Xush kelibsiz, ${company.name}!` : 'Yuklanmoqda...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {company ? (
              <>
                <Link href="/dashboard/company">
                  <Button className="w-full" size="lg">
                    Dashboardga o'tish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🏢 Kompaniya profili</p>
                  <p>💼 Ish e'lonlari</p>
                  <p>📊 Arizalar holati</p>
                  <p>🚀 Startap loyihalari</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Ma'lumotlar yuklanmoqda...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Agar role aniqlanmagan bo'lsa
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
