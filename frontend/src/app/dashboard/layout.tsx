'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Home, User, Settings, LogOut, MessageCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useAuthStore } from '@/stores';
import { logger } from '@/utils/logger';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, student, company } = useAuthStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const { logout } = useAuthStore.getState();

  useEffect(() => {
    // Fetch unread counts
    const fetchCounts = async () => {
      try {
        // TODO: Implement API calls when ready
        // const chatResponse = await chatApi.getUnreadCount();
        // const notificationResponse = await notificationsApi.getUnreadCount();
        // setUnreadCount(chatResponse.data?.unreadCount || 0);
        // setNotificationCount(notificationResponse.data?.unreadCount || 0);
        
        // Mock data for now
        setUnreadCount(0);
        setNotificationCount(0);
      } catch (error) {
        logger.error('Failed to fetch counts', { error: error instanceof Error ? error.message : 'Unknown error' }, 'Dashboard');
      }
    };

    fetchCounts();
  }, []);

  const getUserName = () => {
    if (student) {
      return `${student.firstName} ${student.lastName}`;
    }
    if (company) {
      return company.name;
    }
    return 'Foydalanuvchi';
  };

  const getUserEmail = () => {
    return user?.email || '';
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

    fetchCounts();
  }, []);

  const getUserName = () => {
    if (student) {
      return `${student.firstName} ${student.lastName}`;
    }
    if (company) {
      return company.name;
    }
    return 'Foydalanuvchi';
  };

  const getUserEmail = () => {
    return user?.email || '';
  };

  const handleLogout = () => {
    const { logout } = useAuthStore.getState();
>>>>>>> a725c9cc6780d278a47b3ede5b7c9a483c30cce8
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 lg:w-64 md:w-20 sm:w-16 bg-card border-r border-border/50 z-10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 lg:p-6 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center gap-2 lg:gap-3">
              <div className="h-6 lg:h-8 w-6 lg:w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span className="text-sm lg:text-lg font-bold">S</span>
              </div>
              <span className="text-sm lg:text-lg font-bold hidden sm:block lg:block">Step.uz</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 lg:p-4 space-y-1 lg:space-y-2">
            <Link href="/dashboard">
              <Button
                variant={pathname === '/dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start h-8 lg:h-10 text-xs lg:text-sm"
                size="sm"
              >
                <Home className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-3" />
                <span className="hidden sm:block">Bosh sahifa</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/chat">
              <Button
                variant={pathname?.includes('/chat') ? 'default' : 'ghost'}
                className="w-full justify-start h-8 lg:h-10 text-xs lg:text-sm relative"
                size="sm"
              >
                <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-3" />
                <span className="hidden sm:block">Xabarlar</span>
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link href="/dashboard/notifications">
              <Button
                variant={pathname?.includes('/notifications') ? 'default' : 'ghost'}
                className="w-full justify-start h-8 lg:h-10 text-xs lg:text-sm relative"
                size="sm"
              >
                <Bell className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-3" />
                <span className="hidden sm:block">Bildirishnomalar</span>
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link href="/dashboard/profile">
              <Button
                variant={pathname?.includes('/profile') ? 'default' : 'ghost'}
                className="w-full justify-start h-8 lg:h-10 text-xs lg:text-sm"
                size="sm"
              >
                <User className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-3" />
                <span className="hidden sm:block">Profil</span>
              </Button>
            </Link>
            
            <Link href="/settings">
              <Button
                variant={pathname === '/settings' ? 'default' : 'ghost'}
                className="w-full justify-start h-8 lg:h-10 text-xs lg:text-sm"
                size="sm"
              >
                <Settings className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-3" />
                <span className="hidden sm:block">Sozlamalar</span>
              </Button>
            </Link>
          </nav>

          {/* User Info */}
          <div className="p-2 lg:p-4 border-t border-border/50">
             <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-4">
               <div className="h-6 lg:h-10 w-6 lg:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                 <User className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
               </div>
               <div className="flex-1 min-w-0 hidden lg:block">
                 <p className="text-xs lg:text-sm font-medium truncate">{getUserName()}</p>
                 <p className="text-xs lg:text-xs text-muted-foreground truncate">{getUserEmail()}</p>
               </div>
             </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full h-8 lg:h-10 text-xs lg:text-sm"
            >
              <LogOut className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:block">Chiqish</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-16 lg:pl-64 md:pl-20 sm:pl-16">
        {/* Top Bar */}
        <div className="fixed top-0 left-16 lg:left-64 md:left-20 sm:left-16 right-0 h-16 bg-card border-b border-border/50 z-10 flex items-center justify-between px-2 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:block">Asosiy sahifa</span>
              </Link>
            </Button>
          </div>
          
<<<<<<< HEAD
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="container mx-auto flex items-center gap-2">
                <span className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
                  {getUserName()}
                </span>
                <div className="h-6 lg:h-8 w-6 lg:w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
                </div>
              </div>
            </div>
        </div>

        {/* Page Content */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut" 
          }}
          className="min-h-screen pt-16 pb-12 bg-secondary/20"
        >
          <div className="container mx-auto px-4">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
