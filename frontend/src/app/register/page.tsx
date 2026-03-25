'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, Loader2, GraduationCap, User, Building2,
  ArrowRight, ArrowLeft, Check, Shield, Zap, Sparkles, Users, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/stores';
import { authApi } from '@/services/api';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

function RoleSelection({
  selectedRole,
  onSelect
}: {
  selectedRole: UserRole | null;
  onSelect: (role: UserRole) => void;
}) {
  const roles = [
    {
      value: 'STUDENT' as UserRole,
      label: 'Talaba',
      description: 'Ish qidiryapsizmi? Talent sifatida ro\'yxatdan o\'ting.',
      icon: User,
      color: 'from-primary to-teal-600',
    },
    {
      value: 'COMPANY' as UserRole,
      label: 'Kompaniya',
      description: 'Ish beruvchimisiz? Talabalarni topish uchun ro\'yxatdan o\'ting.',
      icon: Building2,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="grid gap-4">
      {roles.map((role, index) => (
        <motion.button
          key={role.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(role.value)}
          className={`relative flex items-center p-6 rounded-2xl border-2 transition-all text-left ${
            selectedRole === role.value
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
              : 'border-border/60 hover:border-primary/30 hover:bg-secondary/30'
          }`}
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} text-white shadow-lg`}>
            <role.icon className="h-7 w-7" />
          </div>
          <div className="ml-5 flex-1">
            <h3 className={`font-bold text-lg transition-colors ${
              selectedRole === role.value ? 'text-primary' : 'text-foreground'
            }`}>
              {role.label}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">{role.description}</p>
          </div>
          {selectedRole === role.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-lg"
            >
              <Check className="h-4 w-4 text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function RegistrationForm({
  role,
  onBack
}: {
  role: UserRole;
  onBack: () => void;
}) {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    industry: '',
    location: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isStudent = role === 'STUDENT';
  const isCompany = role === 'COMPANY';

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isStudent) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Ism kiritish majburiy';
      if (!formData.lastName.trim()) newErrors.lastName = 'Familiya kiritish majburiy';
    }

    if (isCompany) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Kompaniya nomi kiritish majburiy';
      if (!formData.industry.trim()) newErrors.industry = 'Soha kiritish majburiy';
      if (!formData.location.trim()) newErrors.location = 'Manzil kiritish majburiy';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email kiritish majburiy';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'To\'g\'ri email manzilini kiriting';
    }

    if (!formData.password) {
      newErrors.password = 'Parol kiritish majburiy';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmaydi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
        role,
        ...(isStudent && {
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
        ...(isCompany && {
          companyName: formData.companyName,
          industry: formData.industry,
          location: formData.location,
        }),
      };

      await authApi.register(requestData);
      toast.success('Tasdiqlash kodi emailingizga yuborildi!');

      // Auto-verify with demo code for now
      try {
        const result = await authApi.verifyRegister(formData.email, '123456');
        setToken(result.token);
        setUser(result.user, result.student, result.company);
        toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        
        setTimeout(() => {
          if (isStudent) {
            router.push('/dashboard/student');
          } else if (isCompany) {
            router.push('/dashboard/company');
          } else {
            router.push('/');
          }
        }, 500);
      } catch {
        toast.success("Ro'yxatdan o'tish muvaffaqiyatli! Endi tasdiqlash kodini kiriting.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      const msg = error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-5 px-8">
        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Student Fields */}
        {isStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                Ism
              </Label>
              <Input
                id="firstName"
                placeholder="Ismingiz"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className={`h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                  errors.firstName ? 'border-destructive' : ''
                }`}
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                Familiya
              </Label>
              <Input
                id="lastName"
                placeholder="Familiyangiz"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className={`h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                  errors.lastName ? 'border-destructive' : ''
                }`}
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Company Fields */}
        {isCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold text-foreground">
                Kompaniya nomi
              </Label>
              <Input
                id="companyName"
                placeholder="Kompaniya nomi"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className={`h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                  errors.companyName ? 'border-destructive' : ''
                }`}
                disabled={isLoading}
              />
              {errors.companyName && (
                <p className="text-xs text-destructive">{errors.companyName}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-semibold text-foreground">
                  Soha
                </Label>
                <Input
                  id="industry"
                  placeholder="IT, Marketing..."
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className={`h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                    errors.industry ? 'border-destructive' : ''
                  }`}
                  disabled={isLoading}
                />
                {errors.industry && (
                  <p className="text-xs text-destructive">{errors.industry}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-foreground">
                  Manzil
                </Label>
                <Input
                  id="location"
                  placeholder="Toshkent..."
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className={`h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                    errors.location ? 'border-destructive' : ''
                  }`}
                  disabled={isLoading}
                />
                {errors.location && (
                  <p className="text-xs text-destructive">{errors.location}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email manzil
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              id="email"
              type="email"
              placeholder="sizning@email.uz"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={`pl-12 h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                errors.email ? 'border-destructive' : ''
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-foreground">
            Parol
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Kamida 8 ta belgi"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              className={`pl-12 pr-12 h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                errors.password ? 'border-destructive' : ''
              }`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
            Parolni tasdiqlash
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Parolni qayta kiriting"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              className={`pl-12 h-12 border-border/60 focus:border-primary/50 rounded-xl ${
                errors.confirmPassword ? 'border-destructive' : ''
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            className="mt-1 border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            <Link href="/terms" className="text-primary hover:underline">Foydalanish shartlari</Link> va{' '}
            <Link href="/privacy" className="text-primary hover:underline">Maxfiylik siyosati</Link> bilan roziman
          </Label>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 px-8 pb-10 pt-4">
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Ro&apos;yxatdan o&apos;tish...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ro&apos;yxatdan o&apos;tish
            </span>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground font-semibold"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga qaytish
        </Button>
      </CardFooter>
    </form>
  );
}

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const features = [
    { icon: Users, text: '5000+ Talaba' },
    { icon: Briefcase, text: '1000+ Ish o\'rni' },
    { icon: Shield, text: 'Xavfsiz platforma' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-6 pt-8 px-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal-600 text-white shadow-lg shadow-primary/30"
              >
                <GraduationCap className="h-8 w-8" />
              </motion.div>
            </div>

            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              Hisob yaratish
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {selectedRole
                ? `${selectedRole === 'STUDENT' ? 'Talaba' : 'Kompaniya'} sifatida ro'yxatdan o'ting`
                : 'Qanday hisob yaratmoqchisiz?'}
            </CardDescription>
          </CardHeader>

          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="px-8 pb-4">
                  <RoleSelection
                    selectedRole={selectedRole}
                    onSelect={setSelectedRole}
                  />
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 px-8 pb-10 pt-4">
                  <Button
                    onClick={() => selectedRole && setSelectedRole(selectedRole)}
                    disabled={!selectedRole}
                    className="w-full h-12 bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    Davom etish
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <feature.icon className="h-3.5 w-3.5 text-primary" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/50">
                    <span>Hisobingiz bormi?</span>
                    <Link
                      href="/login"
                      className="text-primary hover:text-primary/80 font-bold transition-colors"
                    >
                      Tizimga kiring
                    </Link>
                  </div>
                </CardFooter>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegistrationForm role={selectedRole} onBack={() => setSelectedRole(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
