'use client';

import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, Star, Clock, ChevronRight } from 'lucide-react';

export default function GuidesPage() {
  const guides = [
    {
      category: 'Getting Started',
      items: [
        { title: 'Platform Overview', readTime: '5 min', difficulty: 'Beginner', rating: 4.8 },
        { title: 'Creating Your Profile', readTime: '8 min', difficulty: 'Beginner', rating: 4.9 },
        { title: 'Setting Up Job Alerts', readTime: '3 min', difficulty: 'Beginner', rating: 4.7 },
        { title: 'Understanding Dashboard', readTime: '6 min', difficulty: 'Beginner', rating: 4.6 },
      ],
    },
    {
      category: 'Job Search',
      items: [
        { title: 'Advanced Search Techniques', readTime: '10 min', difficulty: 'Intermediate', rating: 4.8 },
        { title: 'Using Filters Effectively', readTime: '5 min', difficulty: 'Beginner', rating: 4.5 },
        { title: 'Setting Job Preferences', readTime: '4 min', difficulty: 'Beginner', rating: 4.7 },
        { title: 'Saving and Comparing Jobs', readTime: '6 min', difficulty: 'Beginner', rating: 4.6 },
      ],
    },
    {
      category: 'Applications',
      items: [
        { title: 'Writing Cover Letters', readTime: '12 min', difficulty: 'Intermediate', rating: 4.9 },
        { title: 'Resume Best Practices', readTime: '15 min', difficulty: 'Intermediate', rating: 4.8 },
        { title: 'Tracking Your Applications', readTime: '7 min', difficulty: 'Beginner', rating: 4.7 },
        { title: 'Following Up After Applying', readTime: '8 min', difficulty: 'Intermediate', rating: 4.6 },
      ],
    },
    {
      category: 'Interviews',
      items: [
        { title: 'Interview Preparation Guide', readTime: '20 min', difficulty: 'Advanced', rating: 4.9 },
        { title: 'Common Interview Questions', readTime: '15 min', difficulty: 'Intermediate', rating: 4.8 },
        { title: 'Technical Interview Tips', readTime: '18 min', difficulty: 'Advanced', rating: 4.7 },
        { title: 'Virtual Interview Best Practices', readTime: '10 min', difficulty: 'Intermediate', rating: 4.6 },
      ],
    },
    {
      category: 'Career Growth',
      items: [
        { title: 'Building Your Network', readTime: '14 min', difficulty: 'Intermediate', rating: 4.8 },
        { title: 'Skill Development Planning', readTime: '12 min', difficulty: 'Intermediate', rating: 4.7 },
        { title: 'Personal Branding Strategy', readTime: '16 min', difficulty: 'Advanced', rating: 4.9 },
        { title: 'Salary Negotiation Tactics', readTime: '11 min', difficulty: 'Advanced', rating: 4.8 },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-50';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50';
      case 'Advanced':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">Guides & Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides to help you succeed in your career journey
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-card"
              />
            </div>
          </motion.div>

          {/* Guides */}
          <div className="space-y-12">
            {guides.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.items.map((guide, guideIndex) => (
                    <div
                      key={guideIndex}
                      className="bg-card rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {guide.readTime}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {guide.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
