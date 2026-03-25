'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, GraduationCap, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/stores';
import { authApi } from '@/services/api';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken, isAuthenticated } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email kiritish majburiy');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('To\'g\'ri email manzilini kiriting');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Parol kiritish majburiy');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authApi.login(email, password);
      
      setToken(result.token);
      setUser(result.user, result.student, result.company);
      toast.success('Muvaffaqiyatli kirdingiz!');

      const role = result.user.role;
      setTimeout(() => {
        if (role === 'STUDENT') {
          router.push('/dashboard/student');
        } else if (role === 'COMPANY') {
          router.push('/dashboard/company');
        } else if (role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else {
          router.push('/');
        }
      }, 500);
    } catch (err: unknown) {
      const error = err as Error;
      const msg = error.message || 'Email yoki parol noto\'g\'ri';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
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
              Xush kelibsiz!
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Hisobingizga kirish uchun ma&apos;lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-8">
              {/* Error Message */}
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => validateEmail(email)}
                    className={`pl-12 h-12 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl ${
                      emailError ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {emailError && (
                  <p className="text-xs text-destructive font-medium">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Parol
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    className={`pl-12 pr-12 h-12 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl ${
                      passwordError ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-destructive font-medium">{passwordError}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm font-medium text-muted-foreground cursor-pointer">
                  Meni eslab qol
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 px-8 pb-10 pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Kirilmoqda...
                  </motion.div>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Kirish
                  </span>
                )}
              </Button>

              {/* Register Link */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Hisobingiz yo&apos;qmi?</span>
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 font-bold transition-colors"
                >
                  Ro&apos;yxatdan o&apos;ting
                </Link>
              </div>

              {/* Features */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    <span>Xavfsiz</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-teal-500" />
                    <span>Tez</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
