"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Briefcase, Eye, Calendar, DollarSign, Download } from "lucide-react";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");

  const stats = {
    overview: {
      totalViews: 1234,
      totalApplications: 45,
      profileViews: 89,
      connectionRequests: 12,
    },
    monthlyTrend: [
      { month: "Yan", views: 850, applications: 32 },
      { month: "Fev", views: 920, applications: 38 },
      { month: "Mar", views: 1100, applications: 42 },
      { month: "Apr", views: 1234, applications: 45 },
    ],
    topSkills: [
      { skill: "JavaScript", count: 28 },
      { skill: "React", count: 24 },
      { skill: "Node.js", count: 20 },
      { skill: "TypeScript", count: 18 },
      { skill: "Python", count: 15 },
    ],
    applicationStatus: [
      { status: "Kutilmoqda", count: 15, color: "bg-yellow-500" },
      { status: "Ko'rib chiqish", count: 12, color: "bg-blue-500" },
      { status: "Intervyu", count: 8, color: "bg-purple-500" },
      { status: "Taklif", count: 5, color: "bg-green-500" },
      { status: "Rad etilgan", count: 5, color: "bg-red-500" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analitika</h1>
          <p className="text-muted-foreground">
            Karyera faoliyatingiz statistikasi
          </p>
        </div>
        <div className="flex gap-2">
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Hisobot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Eye, label: "Profil ko'rishlari", value: stats.overview.profileViews, change: "+12%" },
          { icon: Briefcase, label: "Arizalar", value: stats.overview.totalApplications, change: "+5%" },
          { icon: Users, label: "Bog'lanishlar", value: stats.overview.connectionRequests, change: "+8%" },
          { icon: TrendingUp, label: "Umumiy ko'rishlar", value: stats.overview.totalViews, change: "+15%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500">{stat.change} o'tgan oyga nisbatan</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="w-4 h-4" /> Umumiy
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-2">
            <TrendingUp className="w-4 h-4" /> Ko'nikmalar
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <Briefcase className="w-4 h-4" /> Arizalar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oylik trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-4">
                {stats.monthlyTrend.map((item, index) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 h-48">
                      <div
                        className="flex-1 bg-primary/80 rounded-t"
                        style={{ height: `${(item.views / 1300) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-primary/40 rounded-t"
                        style={{ height: `${(item.applications / 50) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/80 rounded" />
                  <span className="text-sm text-muted-foreground">Ko'rishlar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/40 rounded" />
                  <span className="text-sm text-muted-foreground">Arizalar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Top ko'nikmalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topSkills.map((skill, index) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{skill.skill}</span>
                      <span className="text-muted-foreground">{skill.count} ishda</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(skill.count / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Ariza holatlari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {stats.applicationStatus.map((status) => (
                  <div key={status.status} className="text-center">
                    <div className={`w-16 h-16 ${status.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2`}>
                      {status.count}
                    </div>
                    <p className="text-sm text-muted-foreground">{status.status}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
