'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Target, 
  Award, 
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';

export default function MentorshipPage() {
  const benefits = [
    {
      icon: Users,
      title: '1-on-1 Guidance',
      description: 'Connect with experienced professionals who can guide your career journey',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set clear career goals and create actionable plans to achieve them',
    },
    {
      icon: MessageCircle,
      title: 'Regular Check-ins',
      description: 'Schedule regular sessions to track progress and adjust strategies',
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Get personalized recommendations for skills to develop',
    },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Senior Product Manager',
      company: 'Google',
      expertise: ['Product Management', 'Leadership', 'Career Growth'],
      rating: 4.9,
      sessions: 127,
      image: '/mentors/1.jpg',
    },
    {
      id: 2,
      name: 'Michael Ross',
      role: 'Engineering Director',
      company: 'Microsoft',
      expertise: ['Software Engineering', 'System Design', 'Team Management'],
      rating: 4.8,
      sessions: 89,
      image: '/mentors/2.jpg',
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'UX Design Lead',
      company: 'Figma',
      expertise: ['UX/UI Design', 'Portfolio Review', 'Design Career'],
      rating: 4.9,
      sessions: 156,
      image: '/mentors/3.jpg',
    },
  ];

  const programs = [
    {
      title: 'Career Accelerator',
      duration: '3 months',
      description: 'Intensive program for rapid career advancement',
      features: ['Weekly 1-on-1s', 'Resume review', 'Interview prep', 'Networking events'],
    },
    {
      title: 'Skill Builder',
      duration: '2 months',
      description: 'Focused skill development with expert guidance',
      features: ['Skill assessment', 'Learning plan', 'Project feedback', 'Certificate'],
    },
    {
      title: 'Leadership Track',
      duration: '6 months',
      description: 'Comprehensive leadership development program',
      features: ['Executive coaching', 'Team management', 'Strategic thinking', 'Peer group'],
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
            <h1 className="text-4xl font-bold mb-4">Mentorship Program</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Accelerate your career growth with personalized guidance from industry experts
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
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Mentors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Featured Mentors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg border"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-primary">
                        {mentor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.role}</p>
                      <p className="text-sm text-primary">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-secondary rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {mentor.rating}
                    </span>
                    <span>{mentor.sessions} sessions</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8">Mentorship Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
