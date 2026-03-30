'use client';

import { motion } from 'framer-motion';
import { Users, Video, MessageSquare, Star, CheckCircle, ArrowRight } from 'lucide-react';

export default function InterviewPrepPage() {
  const interviewTypes = [
    {
      title: 'Technical Interview',
      description: 'Practice coding problems and system design questions',
      icon: Users,
      questions: 250,
    },
    {
      title: 'Behavioral Interview',
      description: 'Master the STAR method and common questions',
      icon: MessageSquare,
      questions: 150,
    },
    {
      title: 'Mock Interviews',
      description: 'Practice with AI or book a session with experts',
      icon: Video,
      questions: 50,
    },
  ];

  const features = [
    'AI-powered feedback on your answers',
    'Video recording and playback',
    'Industry-specific question banks',
    'Performance analytics and tracking',
    'Expert coaching sessions',
    'Peer practice matching',
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
            <h1 className="text-4xl font-bold mb-4">Interview Preparation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Practice with real interview questions and get AI-powered feedback to land your dream job
            </p>
          </motion.div>

          {/* Interview Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {interviewTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg border"
              >
                <type.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <p className="text-sm text-primary">{type.questions}+ practice questions</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl p-8 border"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Why Use Our Interview Prep?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
