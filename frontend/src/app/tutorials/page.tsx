'use client';

import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Video, FileText, HelpCircle, ExternalLink } from 'lucide-react';

export default function TutorialsPage() {
  const tutorials = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Step.uz platform',
      icon: BookOpen,
      articles: [
        { title: 'Creating Your Profile', readTime: '5 min' },
        { title: 'Uploading Your Resume', readTime: '3 min' },
        { title: 'Setting Job Preferences', readTime: '4 min' },
        { title: 'Using the Job Search', readTime: '5 min' },
      ],
    },
    {
      title: 'Job Applications',
      description: 'Master the art of applying for jobs',
      icon: FileText,
      articles: [
        { title: 'Writing Cover Letters', readTime: '8 min' },
        { title: 'Tracking Applications', readTime: '4 min' },
        { title: 'Following Up', readTime: '5 min' },
        { title: 'Interview Preparation', readTime: '12 min' },
      ],
    },
    {
      title: 'Career Development',
      description: 'Advance your career with expert guidance',
      icon: GraduationCap,
      articles: [
        { title: 'Building Your Network', readTime: '10 min' },
        { title: 'Skill Development', readTime: '8 min' },
        { title: 'Personal Branding', readTime: '7 min' },
        { title: 'Salary Negotiation', readTime: '9 min' },
      ],
    },
    {
      title: 'Video Guides',
      description: 'Watch step-by-step video tutorials',
      icon: Video,
      articles: [
        { title: 'Platform Walkthrough', readTime: '15 min video' },
        { title: 'Profile Optimization', readTime: '12 min video' },
        { title: 'Job Search Tips', readTime: '10 min video' },
        { title: 'Interview Masterclass', readTime: '25 min video' },
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I create a professional profile?',
      answer: 'Start by filling in your basic information, upload a professional photo, add your education and work experience, and list your skills. Make sure to verify your email and complete all sections.',
    },
    {
      question: 'Can I apply to multiple jobs?',
      answer: 'Yes! You can apply to as many jobs as you want. We recommend customizing your application for each position to increase your chances of success.',
    },
    {
      question: 'How do I track my applications?',
      answer: 'Use the Applications Dashboard to see all your submitted applications, their current status, and any updates from employers.',
    },
    {
      question: 'Is Step.uz free to use?',
      answer: 'Yes, the basic features are completely free. We also offer premium plans with additional features like priority applications and advanced analytics.',
    },
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
            <h1 className="text-4xl font-bold mb-4">Tutorials & Guides</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know to succeed on Step.uz
            </p>
          </motion.div>

          {/* Tutorial Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {tutorials.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border"
              >
                <div className="flex items-center mb-4">
                  <category.icon className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li
                      key={articleIndex}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <span className="font-medium">{article.title}</span>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl p-8 border"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
