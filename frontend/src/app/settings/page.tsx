'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, User, Bell, Lock, Palette, Globe,
  Save, Loader2, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  email: string;
  role: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Password form
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    jobAlerts: true,
    applicationUpdates: true,
    marketingEmails: false,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Xatolik',
        description: 'Yangi parollar mos kelmaydi',
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Xatolik',
        description: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
      });
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch('/api/settings/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Parolni o\'zgartirishda xatolik');
      }

      toast({
        title: 'Muvaffaqiyatli!',
        description: 'Parol o\'zgartirildi',
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Xatolik',
        description: error instanceof Error ? error.message : 'Xatolik yuz berdi',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveNotifications = async () => {
    toast({
      title: 'Muvaffaqiyatli!',
      description: 'Bildirishnomalar sozlamalari saqlandi',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Sozlamalar</h1>
            <p className="text-muted-foreground">
              Hisobingiz va ilova sozlamalarini boshqaring
            </p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Hisob</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Bildirishnomalar</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Xavfsizlik</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Afzalliklar</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Hisob ma&apos;lumotlari</CardTitle>
                  <CardDescription>
                    Hisobingiz bilan bog&apos;liq asosiy ma&apos;lumotlar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email} disabled className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Rol</Label>
                      <Input
                        value={user.role === 'STUDENT' ? 'Talaba' : user.role === 'COMPANY' ? 'Kompaniya' : 'Admin'}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Email manzilini o&apos;zgartirish uchun administratorga murojaat qiling
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Bildirishnomalar</CardTitle>
                  <CardDescription>
                    Qanday bildirishnomalarni olishni xohlaysiz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email bildirishnomalari</p>
                      <p className="text-sm text-muted-foreground">
                        Muhim yangiliklarni email orqali oling
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ish bildirishnomalari</p>
                      <p className="text-sm text-muted-foreground">
                        Yangi vakansiyalar haqida xabardor bo&apos;ling
                      </p>
                    </div>
                    <Switch
                      checked={notifications.jobAlerts}
                      onCheckedChange={() => handleNotificationChange('jobAlerts')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ariza yangilanishlari</p>
                      <p className="text-sm text-muted-foreground">
                        Arizangiz holati o&apos;zzganda xabardor bo&apos;ling
                      </p>
                    </div>
                    <Switch
                      checked={notifications.applicationUpdates}
                      onCheckedChange={() => handleNotificationChange('applicationUpdates')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing xabarlar</p>
                      <p className="text-sm text-muted-foreground">
                        Aksiyalar va maxsus takliflar haqida
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </div>
                  <Button onClick={saveNotifications} className="bg-emerald-500 hover:bg-emerald-600">
                    <Save className="mr-2 h-4 w-4" />
                    Saqlash
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Parolni o&apos;zgartirish</CardTitle>
                  <CardDescription>
                    Hisobingiz xavfsizligi uchun parolni muntazam o&apos;zgartiring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Joriy parol</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yangi parol</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Yangi parolni tasdiqlash</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saqlanmoqda...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Parolni o&apos;zgartirish
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Afzalliklar</CardTitle>
                  <CardDescription>
                    Ilova ko&apos;rinishi va til sozlamalari
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Til</p>
                      <p className="text-sm text-muted-foreground">
                        Interfeys tilini tanlang
                      </p>
                    </div>
                    <Select defaultValue="uz">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Til" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">O&apos;zbek</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mavzu</p>
                      <p className="text-sm text-muted-foreground">
                        Tizim mavzusini tanlang
                      </p>
                    </div>
                    <Select defaultValue="system">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Mavzu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Yorug&apos;</SelectItem>
                        <SelectItem value="dark">Qorong&apos;i</SelectItem>
                        <SelectItem value="system">Tizim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
