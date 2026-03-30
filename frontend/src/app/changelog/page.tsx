'use client';

import { motion } from 'framer-motion';
import { 
  Rocket, 
  Sparkles, 
  Bug, 
  Zap, 
  Shield, 
  Palette, 
  Globe,
  ArrowRight,
  Calendar
} from 'lucide-react';

export default function ChangelogPage() {
  const releases = [
    {
      version: '2.5.0',
      date: 'March 28, 2024',
      type: 'major',
      changes: [
        { type: 'feature', title: 'AI-Powered Resume Builder', description: 'Generate professional resumes with AI assistance' },
        { type: 'feature', title: 'Video Interviews', description: 'Record and submit video introductions for job applications' },
        { type: 'improvement', title: 'Enhanced Search', description: 'Improved job search with better filters and suggestions' },
        { type: 'fix', title: 'Mobile Responsiveness', description: 'Fixed layout issues on mobile devices' },
      ],
    },
    {
      version: '2.4.2',
      date: 'March 15, 2024',
      type: 'patch',
      changes: [
        { type: 'improvement', title: 'Performance Optimization', description: 'Reduced page load times by 40%' },
        { type: 'fix', title: 'Notification Bug', description: 'Fixed duplicate notification issue' },
        { type: 'fix', title: 'Profile Upload', description: 'Resolved image upload errors' },
      ],
    },
    {
      version: '2.4.0',
      date: 'March 1, 2024',
      type: 'minor',
      changes: [
        { type: 'feature', title: 'Dark Mode', description: 'New dark theme for better night-time usage' },
        { type: 'feature', title: 'Company Analytics', description: 'Employer dashboard with detailed hiring metrics' },
        { type: 'improvement', title: 'UI Refresh', description: 'Updated design system with modern components' },
      ],
    },
    {
      version: '2.3.0',
      date: 'February 14, 2024',
      type: 'minor',
      changes: [
        { type: 'feature', title: 'Skill Assessments', description: 'Take verified skill tests to showcase expertise' },
        { type: 'feature', title: 'Referral Program', description: 'Invite friends and earn rewards' },
        { type: 'improvement', title: 'Chat System', description: 'Real-time messaging between candidates and recruiters' },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="w-4 h-4" />;
      case 'improvement':
        return <Zap className="w-4 h-4" />;
      case 'fix':
        return <Bug className="w-4 h-4" />;
      default:
        return <Rocket className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-100 text-green-700';
      case 'improvement':
        return 'bg-blue-100 text-blue-700';
      case 'fix':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Changelog</h1>
            <p className="text-xl text-muted-foreground">
              Track all updates, improvements, and new features
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            {releases.map((release, index) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="ml-20">
                  {/* Release header */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold">{release.version}</span>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {release.date}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      release.type === 'major' ? 'bg-purple-100 text-purple-700' :
                      release.type === 'minor' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {release.type}
                    </span>
                  </div>

                  {/* Changes */}
                  <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <ul className="space-y-4">
                      {release.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mr-3 ${getBadgeColor(change.type)}`}>
                            {getIcon(change.type)}
                            {change.type}
                          </span>
                          <div>
                            <span className="font-medium">{change.title}</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              {change.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to get notified about new features and improvements
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
