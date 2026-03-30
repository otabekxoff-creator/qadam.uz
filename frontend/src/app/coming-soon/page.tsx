'use client';

import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Clock, Bell } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonPage() {
  const features = [
    { title: 'AI Resume Builder', description: 'Create professional resumes with AI assistance' },
    { title: 'Video Interviews', description: 'Practice with AI-powered mock interviews' },
    { title: 'Salary Insights', description: 'Get real-time salary data for your role' },
    { title: 'Skill Assessments', description: 'Verify your skills with certified tests' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We&apos;re working on something amazing! Stay tuned for exciting new features.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-lg p-4 text-left border"
            >
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
