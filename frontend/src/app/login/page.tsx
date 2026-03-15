'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, GraduationCap } from 'lucide-react';
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
  const { setUser, setToken } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setLocalError] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'code'>('credentials');
  const [code, setCode] = useState('');
  const [emailForVerify, setEmailForVerify] = useState('');

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);

    try {
      const response = await authApi.login(email, password);
      setEmailForVerify(response.email);
      setStep('code');
      toast.success('Tasdiqlash kodi yuborildi!');
    } catch (err: any) {
      const msg = err.message || 'Kirishda xatolik yuz berdi';
      setLocalError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);

    try {
      const result = await authApi.verifyLogin(emailForVerify, code);

      setToken(result.token);
      setUser(result.user, result.student, result.company);
      toast.success('Muvaffaqiyatli kirdingiz!');
      setIsRedirecting(true);

      const role = result.user.role;
      if (role === 'STUDENT') {
        router.push('/dashboard/student');
      } else if (role === 'COMPANY') {
        router.push('/dashboard/company');
      } else if (role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      const msg = err.message || 'Kirishni tasdiqlashda xatolik yuz berdi';
      setLocalError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
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
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <GraduationCap className="h-7 w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Tizimga kirish</CardTitle>
            <CardDescription className="text-muted-foreground">
              Hisobingizga kirish uchun ma&apos;lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>

          <form onSubmit={step === 'credentials' ? handleSubmit : handleVerifyCode}>
            <CardContent className="space-y-5 px-8">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium text-center">{error}</p>
                </div>
              )}

              {step === 'credentials' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email manzil</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-border/60 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold">Parol</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Parolni unutdingizmi?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 border-border/60 focus:border-primary/50 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="remember" className="text-xs font-medium text-muted-foreground cursor-pointer">
                    Eslab qolish
                  </Label>
                </div>
              </>
              )}

              {step === 'code' && (
                <div className="space-y-3">
                  <Label htmlFor="code" className="text-sm font-semibold">Emailga kelgan 6 xonali kod</Label>
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

            <CardFooter className="flex flex-col space-y-6 px-8 pb-10 pt-6">
              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg shadow-sm shadow-primary/20 transition-all active:scale-[0.98]"
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
                    {step === 'credentials' ? 'Kirilmoqda...' : 'Tasdiqlanmoqda...'}
                  </>
                ) : (
                  step === 'credentials' ? 'Kirish' : 'Kodni tasdiqlash'
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Hisobingiz yo&apos;qmi?{' '}
                <Link 
                  href="/register" 
                  className="text-primary hover:underline font-bold"
                >
                  Ro&apos;yxatdan o&apos;ting
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
