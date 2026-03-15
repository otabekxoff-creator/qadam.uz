'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Briefcase, 
  Rocket, 
  Building2, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, getUserFullName, isStudent, isCompany } from '@/stores';

// =============================================
// Navigation Links
// =============================================

const navLinks = [
  { href: '/jobs', label: 'Ishlar', icon: Briefcase },
  { href: '/startups', label: 'Startaplar', icon: Rocket },
  { href: '/companies', label: 'Kompaniyalar', icon: Building2 },
];

// =============================================
// Navbar Component
// =============================================

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { isAuthenticated, user, student, company, logout } = useAuthStore();
  const fullName = getUserFullName();
  const userIsStudent = isStudent();
  const userIsCompany = isCompany();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardPath = () => {
    if (userIsStudent) return '/dashboard/student';
    if (userIsCompany) return '/dashboard/company';
    if (user?.role === 'ADMIN') return '/dashboard/admin';
    return '/';
  };

  const getInitials = () => {
    if (student) {
      return `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`;
    }
    if (company) {
      return company.name?.[0] || 'C';
    }
    return 'U';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm active:scale-95 transition-transform">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Step.uz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Auth/User Menu */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-border/50 hover:border-primary/30 transition-all">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={student?.avatar || company?.logo} alt={fullName} />
                    <AvatarFallback className="bg-secondary text-primary font-bold text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border shadow-lg rounded-xl" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate max-w-[180px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem asChild className="focus:bg-primary/5 focus:text-primary py-2.5 cursor-pointer">
                  <Link href={getDashboardPath()} className="flex w-full items-center font-medium">
                    <LayoutDashboard className="mr-2.5 h-4 w-4 opacity-70" />
                    Boshqaruv paneli
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-primary/5 focus:text-primary py-2.5 cursor-pointer">
                  <Link href="/profile" className="flex w-full items-center font-medium">
                    <User className="mr-2.5 h-4 w-4 opacity-70" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-primary/5 focus:text-primary py-2.5 cursor-pointer">
                  <Link href="/settings" className="flex w-full items-center font-medium">
                    <Settings className="mr-2.5 h-4 w-4 opacity-70" />
                    Sozlamalar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive focus:bg-destructive/5 focus:text-destructive py-2.5 cursor-pointer font-medium"
                >
                  <LogOut className="mr-2.5 h-4 w-4 opacity-70" />
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg px-5">
                <Link href="/login">Kirish</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/95 text-white font-bold rounded-lg px-6 h-10 shadow-sm shadow-primary/20 active:scale-95 transition-all">
                <Link href="/register">Ro'yxatdan o'tish</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <link.icon className="h-5 w-5 opacity-70" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="border-t border-border/50 mt-2 pt-2">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      href={getDashboardPath()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-bold text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <LayoutDashboard className="h-5 w-5 opacity-70" />
                      <span>Boshqaruv paneli</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-base font-bold text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="h-5 w-5 opacity-70" />
                      <span>Chiqish</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 p-2">
                    <Button variant="outline" asChild className="font-bold border-border hover:bg-secondary/50 rounded-lg">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Kirish
                      </Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/95 text-white font-bold rounded-lg shadow-sm shadow-primary/20">
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        Ro'yxatdan o'tish
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
