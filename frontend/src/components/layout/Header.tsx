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
  Settings,
  Search,
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { logger } from '@/utils/logger';

export function Header() {
  const router = useRouter();
  const { user, student, company, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

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

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
            >
              <GraduationCap className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-500 transition-all">
              Sinergiya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </motion.div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <Button variant="ghost" className="flex items-center gap-2 h-10 px-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getAvatar()} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:inline font-medium">{getFullName()}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardPath()} className="cursor-pointer">
                        <UserIcon className="mr-3 h-4 w-4" />
                        <div>
                          <div className="font-medium">Dashboard</div>
                          <div className="text-xs text-muted-foreground">Boshqaruv paneli</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-3 h-4 w-4" />
                        <div>
                          <div className="font-medium">Profilni tahrirlash</div>
                          <div className="text-xs text-muted-foreground">Shaxsiy ma'lumotlar</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4" />
                      <div>
                        <div className="font-medium">Chiqish</div>
                        <div className="text-xs text-muted-foreground">Tizimdan chiqish</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Kirish
                  </Link>
                </Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Ro'yxatdan o'tish
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-50"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-lg hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
