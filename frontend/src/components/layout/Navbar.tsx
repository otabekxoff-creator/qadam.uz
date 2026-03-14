'use client';

import { useState } from 'react';
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
  
  const { isAuthenticated, user, student, company, logout } = useAuthStore();
  const fullName = getUserFullName();
  const userIsStudent = isStudent();
  const userIsCompany = isCompany();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="container glass rounded-full px-6 py-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 group-hover:rotate-12 transition-transform">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent group-hover:text-glow-primary transition-all">
              Step.uz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student?.avatar || company?.logo} alt={fullName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass border-white/10" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="focus:bg-primary/20">
                    <Link href={getDashboardPath()} className="flex w-full items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-primary/20">
                    <Link href="/profile" className="flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-primary/20">
                    <Link href="/settings" className="flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Sozlamalar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive/10 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-sm hover:bg-white/5">
                  <Link href="/login">Kirish</Link>
                </Button>
                <Button size="sm" asChild className="bg-primary hover:bg-primary/80 text-primary-foreground glow-primary rounded-full px-5">
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
              className="text-muted-foreground hover:bg-white/5"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t-0 rounded-b-3xl overflow-hidden mt-2"
            >
              <div className="flex flex-col space-y-4 px-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="border-t border-white/10 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <Link
                        href={getDashboardPath()}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 text-base font-medium text-muted-foreground"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 text-base font-medium text-destructive"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Chiqish</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" asChild className="w-full glass border-white/10">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          Kirish
                        </Link>
                      </Button>
                      <Button asChild className="w-full bg-primary glow-primary">
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
      </nav>
    </header>
  );
}
