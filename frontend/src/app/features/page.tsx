'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Search, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Globe,
  Smartphone,
  Award,
  Users
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Search,
      title: 'Smart Job Search',
      description: 'AI-powered job matching that finds opportunities perfectly suited to your skills and experience.',
    },
    {
      icon: MessageSquare,
      title: 'Direct Messaging',
      description: 'Connect directly with recruiters and hiring managers through our integrated chat system.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your applications, profile views, and get insights to improve your job search strategy.',
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'All employers are verified to ensure safe and legitimate job opportunities.',
    },
    {
      icon: Globe,
      title: 'Remote Work',
      description: 'Filter for remote positions and work from anywhere in the world.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Apply to jobs and manage your career on the go with our mobile application.',
    },
    {
      icon: Award,
      title: 'Skill Assessments',
      description: 'Take verified skill tests to showcase your expertise to employers.',
    },
    {
      icon: Users,
      title: 'Referral Network',
      description: 'Get referred by employees at top companies and increase your chances.',
    },
  ];

  const highlights = [
    { stat: '10M+', label: 'Active Job Listings' },
    { stat: '50K+', label: 'Companies Hiring' },
    { stat: '2M+', label: 'Successful Placements' },
    { stat: '98%', label: 'User Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to find your dream job and advance your career
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border"
              >
                <p className="text-3xl font-bold text-primary mb-1">{item.stat}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
