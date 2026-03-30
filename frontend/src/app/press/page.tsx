'use client';

import { motion } from 'framer-motion';
import { Newspaper, TrendingUp, Award, Calendar, ArrowRight } from 'lucide-react';

export default function PressPage() {
  const pressReleases = [
    {
      id: 1,
      title: 'SINERGIYA Raises $5M Series A to Expand Across Central Asia',
      date: 'March 15, 2024',
      category: 'Funding',
      excerpt: 'The leading career platform in Uzbekistan announces major expansion plans...',
    },
    {
      id: 2,
      title: 'Partnership with Ministry of Higher Education Announced',
      date: 'February 28, 2024',
      category: 'Partnership',
      excerpt: 'SINERGIYA to provide career services to all university students nationwide...',
    },
    {
      id: 3,
      title: 'AI-Powered Job Matching Feature Launches',
      date: 'January 10, 2024',
      category: 'Product',
      excerpt: 'New machine learning algorithms help match candidates with perfect opportunities...',
    },
  ];

  const mediaCoverage = [
    {
      outlet: 'TechCrunch',
      title: 'How SINERGIYA is Transforming the Uzbek Job Market',
      date: 'March 2024',
      link: '#',
    },
    {
      outlet: 'Forbes Central Asia',
      title: '30 Under 30: Tech Entrepreneurs to Watch',
      date: 'February 2024',
      link: '#',
    },
    {
      outlet: 'BBC Uzbek',
      title: 'Digital Transformation in Uzbekistan Education',
      date: 'January 2024',
      link: '#',
    },
    {
      outlet: 'Reuters',
      title: 'Central Asian Startup Ecosystem Heats Up',
      date: 'December 2023',
      link: '#',
    },
  ];

  const awards = [
    { name: 'Best EdTech Startup 2024', organization: 'Central Asian Tech Awards' },
    { name: 'Innovation in HR', organization: 'Uzbekistan Business Forum' },
    { name: 'Top 50 Startups', organization: 'TechCrunch' },
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
            <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Latest news, press releases, and media coverage about SINERGIYA
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border">
              <Newspaper className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-1">50+</p>
              <p className="text-sm text-muted-foreground">Media Mentions</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-1">5M+</p>
              <p className="text-sm text-muted-foreground">Monthly Reach</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border">
              <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-1">12</p>
              <p className="text-sm text-muted-foreground">Awards Won</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-1">20+</p>
              <p className="text-sm text-muted-foreground">Press Releases</p>
            </div>
          </motion.div>

          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {release.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                  <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                  <button className="flex items-center text-primary hover:underline">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Media Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Media Coverage</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaCoverage.map((article, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary">{article.outlet}</span>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="font-medium mb-3">{article.title}</h3>
                  <button className="text-sm text-primary hover:underline">
                    Read article →
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-8 border"
          >
            <h2 className="text-2xl font-bold mb-6">Awards & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{award.name}</h3>
                  <p className="text-sm text-muted-foreground">{award.organization}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
