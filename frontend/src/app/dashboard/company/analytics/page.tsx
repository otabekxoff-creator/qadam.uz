"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Briefcase, Users, TrendingUp, Eye, Calendar, DollarSign, Building2, MapPin, Search } from "lucide-react";

export default function CompanyAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");

  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 156,
    newApplications: 23,
    viewsThisMonth: 1245,
    conversionRate: 12.5,
  };

  const applicationStatusData = [
    { name: "Kutilmoqda", value: 45, color: "#fbbf24" },
    { name: "Ko'rib chiqilmoqda", value: 34, color: "#60a5fa" },
    { name: "Intervyu", value: 28, color: "#a78bfa" },
    { name: "Taklif", value: 15, color: "#34d399" },
    { name: "Rad etilgan", value: 34, color: "#f87171" },
  ];

  const monthlyApplications = [
    { month: "Yan", applications: 28, views: 890 },
    { month: "Fev", applications: 32, views: 950 },
    { month: "Mar", applications: 45, views: 1200 },
    { month: "Apr", applications: 38, views: 1100 },
    { month: "May", applications: 52, views: 1450 },
    { month: "Iyun", applications: 48, views: 1380 },
  ];

  const topJobs = [
    { name: "Frontend Developer", applications: 45, views: 567 },
    { name: "Backend Engineer", applications: 38, views: 456 },
    { name: "UI/UX Designer", applications: 32, views: 389 },
    { name: "DevOps Engineer", applications: 28, views: 345 },
    { name: "Product Manager", applications: 24, views: 298 },
  ];

  const recentApplications = [
    { id: "1", name: "Azizbek Khayrullaev", position: "Frontend Developer", status: "new", date: "2 soat oldin" },
    { id: "2", name: "Dilnoza Rakhimova", position: "UI/UX Designer", status: "reviewing", date: "5 soat oldin" },
    { id: "3", name: "Jasur Toshmatov", position: "Backend Engineer", status: "interview", date: "1 kun oldin" },
    { id: "4", name: "Alisher Karimov", position: "DevOps Engineer", status: "offer", date: "2 kun oldin" },
    { id: "5", name: "Zarina Umarova", position: "Product Manager", status: "new", date: "2 kun oldin" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analitika</h1>
          <p className="text-muted-foreground">Kompaniya ish e'lonlari va arizalar statistikasi</p>
        </div>
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="7days">So'ngi 7 kun</option>
          <option value="30days">So'ngi 30 kun</option>
          <option value="90days">So'ngi 90 kun</option>
          <option value="1year">1 yil</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Briefcase, label: "Faol ishlar", value: stats.activeJobs },
          { icon: Users, label: "Yangi arizalar", value: stats.newApplications },
          { icon: TrendingUp, label: "Jami arizalar", value: stats.totalApplications },
          { icon: Eye, label: "Ko'rishlar", value: stats.viewsThisMonth },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ariza holatlari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {applicationStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oylik dinamika</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyApplications}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#7c3aed" strokeWidth={2} />
                  <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top ish o'rinlari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topJobs} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>So'nggi arizalar</CardTitle>
            <Button variant="outline" size="sm">Barchasi</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{app.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{app.name}</h4>
                      <p className="text-xs text-muted-foreground">{app.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">{app.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
