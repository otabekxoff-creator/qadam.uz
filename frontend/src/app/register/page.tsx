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
import { toast } from 'sonner';
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
    <div className="grid gap-3">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => onSelect(role.value)}
          className={`relative flex items-center p-5 rounded-xl border transition-all text-left group ${
            selectedRole === role.value
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border/60 hover:border-primary/30 hover:bg-secondary/30'
          }`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg shrink-0 transition-colors ${
            selectedRole === role.value
              ? 'bg-primary text-white'
              : 'bg-secondary text-muted-foreground group-hover:text-primary'
          }`}>
            <role.icon className="h-6 w-6" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className={`font-bold text-base transition-colors ${
              selectedRole === role.value ? 'text-primary' : 'text-foreground'
            }`}>{role.label}</h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5 line-clamp-1">{role.description}</p>
          </div>
          {selectedRole === role.value && (
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </button>
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
    companyName: '', // for company
    industry: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [emailForVerify, setEmailForVerify] = useState('');
  const [code, setCode] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isStudent = role === 'STUDENT';
  const isCompany = role === 'COMPANY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      const msg = 'Parollar mos kelmaydi';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (formData.password.length < 8) {
      const msg = 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak';
      setError(msg);
      toast.error(msg);
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

      const response = await authApi.register(requestData);
      
      // Email verification kerak
      setEmailForVerify(formData.email);
      setStep('code');
      toast.success('Tasdiqlash kodi emailingizga yuborildi!');
    } catch (err: any) {
      const msg = err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi';
      setError(msg);
      toast.error(msg);
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
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      setIsRedirecting(true);

      if (isStudent) {
        router.push('/dashboard/student');
      } else if (isCompany) {
        router.push('/dashboard/company');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      const msg = err.message || 'Tasdiqlashda xatolik yuz berdi';
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={step === 'form' ? handleSubmit : handleVerifyCode}>
      <CardContent className="space-y-5 px-8">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        {step === 'form' && (
          <>
        {/* Name fields based on role */}
        {isStudent && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold">Ism</Label>
              <Input
                id="firstName"
                placeholder="Ismingiz"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="h-11 border-border/60 focus:border-primary/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold">Familiya</Label>
              <Input
                id="lastName"
                placeholder="Familiyangiz"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="h-11 border-border/60 focus:border-primary/50"
                required
              />
            </div>
          </div>
        )}

        {isCompany && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold">Kompaniya nomi</Label>
              <Input
                id="companyName"
                placeholder="Kompaniya nomi"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="h-11 border-border/60 focus:border-primary/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-semibold">Soxa</Label>
              <Input
                id="industry"
                placeholder="IT, Marketing, Finance va h.k."
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="h-11 border-border/60 focus:border-primary/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold">Manzil</Label>
              <Input
                id="location"
                placeholder="Shahar, viloyat"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-11 border-border/60 focus:border-primary/50"
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">Email manzil</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 h-11 border-border/60 focus:border-primary/50"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">Parol</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Kamida 8 ta belgi"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10 h-11 border-border/60 focus:border-primary/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold">Parolni tasdiqlash</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Parolni qayta kiriting"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10 h-11 border-border/60 focus:border-primary/50"
              required
            />
          </div>
        </div>
          </>
        )}

        {step === 'code' && (
          <div className="space-y-3">
            <Label htmlFor="code" className="text-sm font-semibold block text-center">Tasdiqlash kodi</Label>
            <Input
              id="code"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-11 text-center text-lg tracking-[0.5em] font-bold border-border/60 focus:border-primary/50"
              required
            />
            <p className="text-xs text-muted-foreground text-center">
              Kod <span className="font-bold text-foreground">{emailForVerify}</span> manziliga yuborildi.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 px-8 pb-10 pt-6">
        <Button 
          type="submit" 
          className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg shadow-sm shadow-primary/20 active:scale-[0.98] transition-all"
          disabled={isLoading || isRedirecting}
        >
          {isRedirecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Yo'naltirilmoqda...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tasdiqlanmoqda...
            </>
          ) : (
            <>
              {step === 'form' ? 'Ro\'yxatdan o\'tish' : 'Kodni tasdiqlash'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground font-bold text-xs h-9"
        >
          <ArrowLeft className="mr-2 h-3 w-3" />
          Orqaga qaytish
        </Button>
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8 pt-8 px-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <GraduationCap className="h-7 w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {step === 'role' ? 'Ro\'yxatdan o\'tish' : `${selectedRole === 'STUDENT' ? 'Talaba' : 'Kompaniya'} sifatida`}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 'role' 
                ? 'Qanday hisob yaratmoqchisiz?' 
                : 'Ma\'lumotlaringizni kiriting'}
            </CardDescription>
          </CardHeader>

          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="px-8 pb-4">
                  <RoleSelection 
                    selectedRole={selectedRole} 
                    onSelect={handleRoleSelect} 
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-6 px-8 pb-10 pt-4">
                  <Button 
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg shadow-sm shadow-primary/20 active:scale-[0.98] transition-all"
                  >
                    Davom etish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Hisobingiz bormi?{' '}
                    <Link 
                      href="/login" 
                      className="text-primary hover:underline font-bold"
                    >
                      Tizimga kiring
                    </Link>
                  </p>
                </CardFooter>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
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
