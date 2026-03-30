'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, Briefcase, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardHomePage() {
  const stats = [
    {
      title: 'Total Applications',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Briefcase,
      description: 'vs last month',
    },
    {
      title: 'Profile Views',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      description: 'vs last month',
    },
    {
      title: 'Saved Jobs',
      value: '18',
      change: '+5',
      trend: 'up',
      icon: Briefcase,
      description: 'new this week',
    },
    {
      title: 'Interview Invites',
      value: '3',
      change: '+2',
      trend: 'up',
      icon: Building2,
      description: 'pending response',
    },
  ];

  const recentActivity = [
    {
      action: 'Applied to Senior Frontend Developer at TechCorp',
      time: '2 hours ago',
      type: 'application',
    },
    {
      action: 'Your profile was viewed by DesignStudio',
      time: '5 hours ago',
      type: 'profile_view',
    },
    {
      action: 'Saved job: Product Manager at StartupXYZ',
      time: '1 day ago',
      type: 'saved_job',
    },
    {
      action: 'Received interview invite from DataSystems',
      time: '2 days ago',
      type: 'interview',
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Tashkent',
      salary: '$3000 - $5000',
      match: '95%',
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      salary: '$2500 - $4000',
      match: '88%',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Tashkent',
      salary: '$3500 - $5500',
      match: '82%',
    },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your job search</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl p-6 shadow-sm border"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'application' ? 'bg-blue-500' :
                    activity.type === 'profile_view' ? 'bg-green-500' :
                    activity.type === 'saved_job' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommended Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-6 shadow-sm border"
          >
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      <p className="text-sm text-primary mt-1">{job.salary}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                      {job.match} match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
