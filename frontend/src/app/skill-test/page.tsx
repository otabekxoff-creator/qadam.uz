'use client';

import { motion } from 'framer-motion';
import { Code, Palette, BarChart3, Languages, Brain, Database, Clock, Award } from 'lucide-react';

export default function SkillTestPage() {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: Code,
      tests: [
        { name: 'JavaScript Fundamentals', level: 'Beginner', duration: '30 min', questions: 40 },
        { name: 'React & Next.js', level: 'Intermediate', duration: '45 min', questions: 50 },
        { name: 'Python Programming', level: 'Intermediate', duration: '40 min', questions: 45 },
        { name: 'SQL & Databases', level: 'Advanced', duration: '50 min', questions: 60 },
      ],
    },
    {
      title: 'Design Skills',
      icon: Palette,
      tests: [
        { name: 'UI Design Principles', level: 'Beginner', duration: '25 min', questions: 35 },
        { name: 'UX Research Methods', level: 'Intermediate', duration: '40 min', questions: 45 },
        { name: 'Figma Mastery', level: 'Intermediate', duration: '35 min', questions: 40 },
      ],
    },
    {
      title: 'Business Skills',
      icon: BarChart3,
      tests: [
        { name: 'Data Analysis with Excel', level: 'Beginner', duration: '30 min', questions: 40 },
        { name: 'Project Management', level: 'Intermediate', duration: '45 min', questions: 50 },
        { name: 'Digital Marketing', level: 'Intermediate', duration: '40 min', questions: 45 },
      ],
    },
  ];

  const benefits = [
    { icon: Award, title: 'Verified Certificate', description: 'Get a certificate to showcase on your profile' },
    { icon: Brain, title: 'AI-Powered Assessment', description: 'Adaptive testing based on your skill level' },
    { icon: Clock, title: 'Quick Results', description: 'Get your results and feedback immediately' },
    { icon: Database, title: 'Skill Database', description: 'Your skills are visible to top employers' },
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
            <h1 className="text-4xl font-bold mb-4">Skill Assessments</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Validate your skills with industry-recognized assessments and stand out to employers
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border text-center"
              >
                <benefit.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Categories */}
          <div className="space-y-12">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <category.icon className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.tests.map((test, testIndex) => (
                    <div
                      key={testIndex}
                      className="bg-card rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          test.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                          test.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {test.level}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{test.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{test.duration}</span>
                        <span>{test.questions} questions</span>
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
