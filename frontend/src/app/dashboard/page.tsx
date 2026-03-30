"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { 
  Briefcase, Users, MessageSquare, TrendingUp, Building2, Clock, DollarSign,
  MapPin, Star, Bell, CheckCircle2, AlertCircle, Eye, Heart, ArrowRight,
  Calendar, FileText, BarChart3, PieChart, Activity, Zap, Target, Award,
  Sparkles, TrendingDown, MoreHorizontal, Plus, Filter, Search,
  ChevronRight, RefreshCw, Download, Share2, Bookmark
} from "lucide-react";

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  
  useState(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  });
  
  return count;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");

  const stats = [
    { 
      title: "Active Jobs", 
      value: 156, 
      icon: Briefcase, 
      change: "+12", 
      trend: "up",
      color: "from-blue-500 to-blue-600",
      description: "Jobs currently open"
    },
    { 
      title: "Applications", 
      value: 2847, 
      icon: Users, 
      change: "+156", 
      trend: "up",
      color: "from-green-500 to-green-600",
      description: "Total received"
    },
    { 
      title: "Messages", 
      value: 89, 
      icon: MessageSquare, 
      change: "+23", 
      trend: "up",
      color: "from-purple-500 to-purple-600",
      description: "Unread messages"
    },
    { 
      title: "Profile Views", 
      value: 12456, 
      icon: TrendingUp, 
      change: "+15%", 
      trend: "up",
      color: "from-orange-500 to-orange-600",
      description: "This month"
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Tashkent",
      salary: "$3,000 - $5,000",
      type: "Full-time",
      postedAt: "2 hours ago",
      applicants: 24,
      views: 342,
      isHot: true,
      isNew: true,
      skills: ["React", "TypeScript", "Next.js"],
      status: "active"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$4,000 - $6,000",
      type: "Full-time",
      postedAt: "5 hours ago",
      applicants: 18,
      views: 256,
      isHot: false,
      isNew: true,
      skills: ["Agile", "Analytics", "Strategy"],
      status: "active"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Samarkand",
      salary: "$2,500 - $4,000",
      type: "Full-time",
      postedAt: "1 day ago",
      applicants: 32,
      views: 189,
      isHot: true,
      isNew: false,
      skills: ["Figma", "UI/UX", "Prototyping"],
      status: "active"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Tashkent",
      salary: "$4,500 - $7,000",
      type: "Full-time",
      postedAt: "2 days ago",
      applicants: 12,
      views: 167,
      isHot: false,
      isNew: false,
      skills: ["AWS", "Docker", "Kubernetes"],
      status: "active"
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataCorp",
      location: "Remote",
      salary: "$5,000 - $8,000",
      type: "Full-time",
      postedAt: "3 days ago",
      applicants: 15,
      views: 234,
      isHot: true,
      isNew: false,
      skills: ["Python", "ML", "SQL"],
      status: "active"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      applicant: "John Doe",
      position: "Senior Frontend Developer",
      company: "TechCorp",
      status: "shortlisted",
      appliedAt: "2 hours ago",
      avatar: "JD",
      experience: "5 years",
      match: 95
    },
    {
      id: 2,
      applicant: "Sarah Smith",
      position: "Product Manager",
      company: "StartupXYZ",
      status: "reviewing",
      appliedAt: "5 hours ago",
      avatar: "SS",
      experience: "3 years",
      match: 88
    },
    {
      id: 3,
      applicant: "Mike Johnson",
      position: "UX Designer",
      company: "DesignStudio",
      status: "interview",
      appliedAt: "1 day ago",
      avatar: "MJ",
      experience: "4 years",
      match: 92
    },
    {
      id: 4,
      applicant: "Emily Davis",
      position: "DevOps Engineer",
      company: "CloudTech",
      status: "pending",
      appliedAt: "2 days ago",
      avatar: "ED",
      experience: "6 years",
      match: 85
    }
  ];

  const activities = [
    { id: 1, type: "job_posted", message: "New job posted: Senior Frontend Developer", time: "2 hours ago", icon: Briefcase, color: "bg-blue-500" },
    { id: 2, type: "application", message: "New application received from Sarah Smith", time: "3 hours ago", icon: Users, color: "bg-green-500" },
    { id: 3, type: "message", message: "New message from TechCorp HR", time: "5 hours ago", icon: MessageSquare, color: "bg-purple-500" },
    { id: 4, type: "view", message: "Your profile was viewed by 15 companies", time: "1 day ago", icon: Eye, color: "bg-orange-500" },
    { id: 5, type: "shortlist", message: "John Doe shortlisted for interview", time: "1 day ago", icon: Star, color: "bg-yellow-500" },
    { id: 6, type: "job_closed", message: "Job closed: Junior Developer position", time: "2 days ago", icon: AlertCircle, color: "bg-red-500" }
  ];

  const quickActions = [
    { icon: Plus, label: "Post New Job", href: "/dashboard/jobs/new", color: "bg-primary" },
    { icon: Search, label: "Search Candidates", href: "/dashboard/candidates", color: "bg-blue-500" },
    { icon: Calendar, label: "Schedule Interview", href: "/dashboard/calendar", color: "bg-green-500" },
    { icon: FileText, label: "View Reports", href: "/dashboard/reports", color: "bg-purple-500" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", color: "bg-orange-500" },
    { icon: Target, label: "Set Goals", href: "/dashboard/goals", color: "bg-pink-500" }
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      shortlisted: "bg-green-100 text-green-700",
      reviewing: "bg-blue-100 text-blue-700",
      interview: "bg-purple-100 text-purple-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700",
      hired: "bg-green-500 text-white"
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here&apos;s what&apos;s happening with your hiring.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select 
                className="px-3 py-2 rounded-lg border bg-background text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={stat.trend === "up" ? "default" : "destructive"} className="text-xs">
                      {stat.trend === "up" ? "↑" : "↓"} {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Jobs */}
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Active Jobs</CardTitle>
                      <CardDescription>Your currently open positions</CardDescription>
                    </div>
                    <Link href="/dashboard/jobs">
                      <Button variant="ghost" size="sm">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {job.company.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold truncate">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                            </div>
                            <div className="flex gap-1">
                              {job.isHot && <Badge variant="destructive" className="text-xs">Hot</Badge>}
                              {job.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{job.salary}</span>
                            <span>{job.type}</span>
                            <span>{job.applicants} applicants</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                          <activity.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Active Jobs</CardTitle>
                    <CardDescription>Manage your job postings</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-start gap-4 p-4 rounded-lg border hover:shadow-md transition-all">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {job.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" /> {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {job.postedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" /> {job.applicants} applicants
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" /> {job.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Review candidate applications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {app.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{app.applicant}</h3>
                            <p className="text-sm text-muted-foreground">Applied for {app.position}</p>
                          </div>
                          <Badge className={getStatusBadge(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{app.experience} experience</span>
                          <span>{app.appliedAt}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Match:</span>
                            <Progress value={app.match} className="w-24 h-2" />
                            <span className="text-sm font-medium">{app.match}%</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Profile</Button>
                            <Button size="sm">Schedule Interview</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Funnel</CardTitle>
                    <CardDescription>Conversion rates by stage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Views</span>
                        <span className="font-medium">12,456</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Applications</span>
                        <span className="font-medium">2,847 (22.9%)</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Shortlisted</span>
                        <span className="font-medium">456 (16.0%)</span>
                      </div>
                      <Progress value={16} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Interviews</span>
                        <span className="font-medium">128 (28.1%)</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hired</span>
                        <span className="font-medium">24 (18.8%)</span>
                      </div>
                      <Progress value={19} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Jobs</CardTitle>
                    <CardDescription>By application count</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentJobs.slice(0, 4).map((job, index) => (
                      <div key={job.id} className="flex items-center gap-4">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium truncate">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{job.applicants}</p>
                          <p className="text-xs text-muted-foreground">applicants</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
