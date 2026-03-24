'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Briefcase, 
  Building2, 
  Lightbulb, 
  GraduationCap, 
  ChevronDown, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';
import { logger } from '@/utils/logger';

export function Header() {
  const router = useRouter();
  const { user, student, company, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      router.push('/login');
    } catch (error) {
      logger.error('Logout error:', error, 'Header');
    }
  };

  const getDashboardPath = () => {
    if (user?.role === 'STUDENT') return '/dashboard/student';
    if (user?.role === 'COMPANY') return '/dashboard/company';
    if (user?.role === 'ADMIN') return '/dashboard/admin';
    return '/';
  };

  const getInitials = () => {
    if (user?.role === 'COMPANY' && company) return company.name?.[0] || 'C';
    if (user?.role === 'STUDENT' && student) return `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}` || 'U';
    return 'U';
  };

  const getFullName = () => {
    if (user?.role === 'COMPANY' && company) return company.name;
    if (user?.role === 'STUDENT' && student) return `${student.firstName} ${student.lastName}`;
    return 'Profil';
  };

  const getAvatar = () => {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
    if (user?.role === 'COMPANY' && company) return company.logo ? `${baseUrl}${company.logo}` : '';
    if (user?.role === 'STUDENT' && student) return student.avatar ? `${baseUrl}${student.avatar}` : '';
    return '';
  };

  const navLinks = [
    { href: '/jobs', label: 'Vakansiyalar', icon: Briefcase },
    { href: '/companies', label: 'Kompaniyalar', icon: Building2 },
    { href: '/startups', label: 'Startaplar', icon: Lightbulb },
  ];

  if (!mounted) return null; // Hydration error oldini olish uchun

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Step.uz
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getAvatar()} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{getFullName()}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardPath()} className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Profilni tahrirlash
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild><Link href="/login">Kirish</Link></Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90" asChild><Link href="/register">Ro'yxatdan o'tish</Link></Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
