"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase,
  Edit,
  Plus,
  Search,
  TrendingUp,
  Eye,
  CheckCircle
} from "lucide-react";

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const company = {
    name: "TechCorp Uzbekistan",
    logo: "/companies/techcorp.png",
    industry: "Information Technology",
    location: "Tashkent, Uzbekistan",
    website: "https://techcorp.uz",
    email: "jobs@techcorp.uz",
    phone: "+998 71 123 45 67",
    employees: "200-500",
    founded: "2018",
    about: "Leading technology company specializing in software development, cloud solutions, and digital transformation. We create innovative products that help businesses grow and succeed in the digital age.",
    verified: true,
    stats: {
      totalJobs: 12,
      activeJobs: 8,
      totalApplications: 156,
      newApplications: 23,
      viewsThisMonth: 1245,
    },
    jobs: [
      {
        id: "1",
        title: "Senior Frontend Developer",
        type: "Full-time",
        location: "Tashkent",
        applications: 34,
        views: 456,
        status: "active",
        postedAt: "2 kun oldin",
      },
      {
        id: "2",
        title: "Backend Engineer",
        type: "Full-time",
        location: "Tashkent",
        applications: 28,
        views: 389,
        status: "active",
        postedAt: "5 kun oldin",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        type: "Full-time",
        location: "Remote",
        applications: 45,
        views: 567,
        status: "active",
        postedAt: "1 hafta oldin",
      },
    ],
    recentApplications: [
      {
        id: "1",
        applicant: "Azizbek Khayrullaev",
        position: "Senior Frontend Developer",
        status: "new",
        appliedAt: "2 soat oldin",
      },
      {
        id: "2",
        applicant: "Dilnoza Rakhimova",
        position: "UI/UX Designer",
        status: "reviewing",
        appliedAt: "5 soat oldin",
      },
      {
        id: "3",
        applicant: "Jasur Toshmatov",
        position: "Backend Engineer",
        status: "interview",
        appliedAt: "1 kun oldin",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="text-3xl bg-primary/10 text-primary font-bold">
                {company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{company.name}</h1>
                    {company.verified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground">{company.industry}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {company.employees} xodim
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {company.website}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Profilni tahrirlash
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Briefcase, label: "Faol ishlar", value: company.stats.activeJobs },
          { icon: Users, label: "Yangi arizalar", value: company.stats.newApplications },
          { icon: TrendingUp, label: "Jami arizalar", value: company.stats.totalApplications },
          { icon: Eye, label: "Ko'rishlar", value: company.stats.viewsThisMonth },
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Umumiy</TabsTrigger>
          <TabsTrigger value="jobs">Ish e'lonlari</TabsTrigger>
          <TabsTrigger value="applications">Arizalar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kompaniya haqida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{company.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>So'nggi arizalar</CardTitle>
              <Button variant="outline" size="sm">
                Barchasini ko'rish
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-semibold">{app.applicant}</h4>
                      <p className="text-sm text-muted-foreground">{app.position}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={app.status === 'new' ? 'default' : 'outline'}>
                        {app.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{app.appliedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ish e'lonlari</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Yangi e'lon
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company.jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.postedAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.applications}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {job.views}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Boshqarish
                      </Button>
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Barcha arizalar</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Nomzod qidirish..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{app.applicant[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{app.applicant}</h4>
                        <p className="text-sm text-muted-foreground">{app.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{app.appliedAt}</Badge>
                      <Button size="sm">Ko'rish</Button>
                    </div>
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
