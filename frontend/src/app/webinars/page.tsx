'use client';

import { motion } from 'framer-motion';
import { Video, Calendar, Users, Clock, Play, Star, BookOpen } from 'lucide-react';

export default function WebinarsPage() {
  const upcomingWebinars = [
    {
      id: 1,
      title: 'Resume Writing Masterclass',
      description: 'Learn how to create a compelling resume that stands out to recruiters',
      speaker: 'Sarah Johnson',
      role: 'Senior Recruiter at Google',
      date: '2024-04-15',
      time: '15:00 UTC',
      duration: '60 min',
      attendees: 245,
      category: 'Career Development',
    },
    {
      id: 2,
      title: 'Technical Interview Preparation',
      description: 'Strategies for acing technical interviews at top tech companies',
      speaker: 'Michael Chen',
      role: 'Engineering Manager at Meta',
      date: '2024-04-18',
      time: '17:00 UTC',
      duration: '90 min',
      attendees: 189,
      category: 'Interview Skills',
    },
    {
      id: 3,
      title: 'Building Your Personal Brand',
      description: 'How to establish yourself as a thought leader in your industry',
      speaker: 'Emily Davis',
      role: 'Personal Branding Consultant',
      date: '2024-04-22',
      time: '14:00 UTC',
      duration: '75 min',
      attendees: 312,
      category: 'Professional Growth',
    },
  ];

  const pastWebinars = [
    {
      id: 4,
      title: 'Negotiating Your Salary',
      description: 'Learn effective negotiation tactics to maximize your compensation',
      speaker: 'Robert Wilson',
      role: 'HR Director at Microsoft',
      views: 1250,
      rating: 4.8,
      category: 'Negotiation',
    },
    {
      id: 5,
      title: 'LinkedIn Optimization',
      description: 'Make your LinkedIn profile work for you 24/7',
      speaker: 'Lisa Anderson',
      role: 'LinkedIn Expert',
      views: 2100,
      rating: 4.9,
      category: 'Networking',
    },
    {
      id: 6,
      title: 'Transitioning to Tech',
      description: 'A guide for non-technical professionals moving into tech roles',
      speaker: 'David Kim',
      role: 'Career Coach',
      views: 890,
      rating: 4.7,
      category: 'Career Transition',
    },
  ];

  const categories = [
    { name: 'Career Development', count: 15 },
    { name: 'Interview Skills', count: 12 },
    { name: 'Technical Skills', count: 20 },
    { name: 'Professional Growth', count: 18 },
    { name: 'Leadership', count: 10 },
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
            <h1 className="text-4xl font-bold mb-4">Webinars & Events</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our expert-led webinars and accelerate your career growth
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-card rounded-full text-sm border hover:bg-accent transition-colors cursor-pointer"
              >
                {category.name} ({category.count})
              </span>
            ))}
          </motion.div>

          {/* Upcoming Webinars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Upcoming Webinars
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg border"
                >
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
                    {webinar.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>
                  <div className="border-t pt-4">
                    <p className="font-medium">{webinar.speaker}</p>
                    <p className="text-sm text-muted-foreground">{webinar.role}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {webinar.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {webinar.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                    <span>{webinar.time}</span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {webinar.attendees} registered
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past Webinars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Play className="w-6 h-6 mr-2" />
              On-Demand Recordings
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <span className="inline-block px-3 py-1 bg-secondary rounded-full text-sm mb-4">
                    {webinar.category}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Play className="w-4 h-4 mr-1" />
                    {webinar.views.toLocaleString()} views
                    <span className="mx-2">•</span>
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {webinar.rating}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
