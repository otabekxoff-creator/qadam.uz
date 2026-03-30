"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, MessageSquare, Bell, LayoutDashboard, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold">
            Step.uz
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard size={20} />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/jobs">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Briefcase size={20} />
              Ishlar
            </Button>
          </Link>
          <Link href="/dashboard/applications">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users size={20} />
              Arizalar
            </Button>
          </Link>
          <Link href="/dashboard/messages">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare size={20} />
              Xabarlar
            </Button>
          </Link>
          <Link href="/dashboard/notifications">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Bell size={20} />
              Bildirishnomalar
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings size={20} />
              Sozlamalar
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
            <LogOut size={20} />
            Chiqish
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
