'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, GraduationCap, User, Building2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores';
import { authApi } from '@/services/api';
import type { UserRole } from '@/types';

// =============================================
// Role Selection Component
// =============================================

function RoleSelection({ 
  selectedRole, 
  onSelect 
}: { 
  selectedRole: UserRole | null; 
  onSelect: (role: UserRole) => void;
}) {
  const roles: { value: UserRole; label: string; description: string; icon: typeof User }[] = [
    { 
      value: 'STUDENT', 
      label: 'Talaba', 
      description: 'Ish qidiryapsizmi? Talent sifatida ro\'yxatdan o\'ting.',
      icon: User 
    },
    { 
      value: 'COMPANY', 
      label: 'Kompaniya', 
      description: 'Ish beruvchimisiz? Talabalarni topish uchun ro\'yxatdan o\'ting.',
      icon: Building2 
    },
  ];

  return (
    <div className="grid gap-4">
      {roles.map((role) => (
        <motion.button
          key={role.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(role.value)}
          className={`relative flex items-start p-4 rounded-xl border-2 text-left transition-all ${
            selectedRole === role.value
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
              : 'border-border hover:border-emerald-300 dark:hover:border-emerald-800'
          }`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
            selectedRole === role.value
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
              : 'bg-muted text-muted-foreground'
          }`}>
            <role.icon className="h-6 w-6" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-semibold">{role.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
          </div>
          {selectedRole === role.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <Check className="h-4 w-4 text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// =============================================
// Registration Form Component
// =============================================

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
    name: '', // for company
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [emailForVerify, setEmailForVerify] = useState('');
  const [code, setCode] = useState('');

  const isStudent = role === 'STUDENT';
  const isCompany = role === 'COMPANY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmaydi');
      return;
    }

    if (formData.password.length < 8) {
      setError('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
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
          name: formData.name,
        }),
      };

      const response = await authApi.register(requestData);
      setEmailForVerify(response.email);
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await authApi.verifyRegister(emailForVerify, code);

      setToken(result.token);
      setUser(result.user, result.student, result.company);

      if (isStudent) {
        router.push('/dashboard/student');
      } else if (isCompany) {
        router.push('/dashboard/company');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tasdiqlashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={step === 'form' ? handleSubmit : handleVerifyCode}>
      <CardContent className="space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {step === 'form' && (
          <>
        {/* Name fields based on role */}
        {isStudent && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ism</Label>
              <Input
                id="firstName"
                placeholder="Ismingiz"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Familiya</Label>
              <Input
                id="lastName"
                placeholder="Familiyangiz"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {isCompany && (
          <div className="space-y-2">
            <Label htmlFor="companyName">Kompaniya nomi</Label>
            <Input
              id="companyName"
              placeholder="Kompaniya nomi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email manzil</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Parol</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Kamida 8 ta belgi"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Parolni tasdiqlash</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Parolni qayta kiriting"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
          </>
        )}

        {step === 'code' && (
          <div className="space-y-2">
            <Label htmlFor="code">Emailga kelgan 6 xonali kod</Label>
            <Input
              id="code"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Kod {emailForVerify} manziliga yuborildi. Iltimos, pochtangizni tekshiring.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="flex gap-3 w-full">
          <Button 
            type="button" 
            variant="outline"
            onClick={step === 'form' ? onBack : () => setStep('form')}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 'form' ? 'Ortga' : 'Ma\'lumotni tahrirlash'}
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {step === 'form' ? 'Ro\'yxatdan o\'tmoqda...' : 'Tasdiqlanmoqda...'}
              </>
            ) : (
              <>
                {step === 'form' ? 'Ro\'yxatdan o\'tish' : 'Kodni tasdiqlash'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Hisobingiz bormi?{' '}
          <Link 
            href="/login" 
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
          >
            Tizimga kiring
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground">
          Ro&apos;yxatdan o&apos;tish orqali siz{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            Foydalanish shartlariga
          </Link>{' '}
          va{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Maxfiylik siyosatiga
          </Link>{' '}
          rozilik bildirasiz
        </p>
      </CardFooter>
    </form>
  );
}

// =============================================
// Main Register Page
// =============================================

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<'role' | 'form'>('role');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setStep('form');
    }
  };

  const handleBack = () => {
    setStep('role');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 via-teal-50 to-white dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {step === 'role' ? 'Ro\'yxatdan o\'tish' : `${selectedRole === 'STUDENT' ? 'Talaba' : 'Kompaniya'} sifatida`}
            </CardTitle>
            <CardDescription>
              {step === 'role' 
                ? 'Qanday hisob yaratmoqchisiz?' 
                : 'Ma\'lumotlaringizni kiriting'}
            </CardDescription>
          </CardHeader>

          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CardContent className="space-y-4">
                  <RoleSelection 
                    selectedRole={selectedRole} 
                    onSelect={handleRoleSelect} 
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    Davom etish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Hisobingiz bormi?{' '}
                    <Link 
                      href="/login" 
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                    >
                      Tizimga kiring
                    </Link>
                  </p>
                </CardFooter>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <RegistrationForm role={selectedRole!} onBack={handleBack} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
