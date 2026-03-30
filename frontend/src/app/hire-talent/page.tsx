'use client';

import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, Handshake, ArrowRight, CheckCircle } from 'lucide-react';

export default function HireTalentPage() {
  const solutions = [
    {
      icon: Building2,
      title: 'Enterprise Hiring',
      description: 'End-to-end recruitment solution for large organizations',
      features: ['ATS Integration', 'Custom Workflows', 'Dedicated Support', 'Analytics Dashboard'],
    },
    {
      icon: Users,
      title: 'SMB Solutions',
      description: 'Affordable hiring tools for growing businesses',
      features: ['Job Posting', 'Candidate Management', 'Interview Tools', 'Team Collaboration'],
    },
    {
      icon: GraduationCap,
      title: 'Campus Recruitment',
      description: 'Connect with top graduates and entry-level talent',
      features: ['University Partnerships', 'Virtual Career Fairs', 'Student Database', 'Internship Programs'],
    },
    {
      icon: Handshake,
      title: 'Staffing Agencies',
      description: 'Power your agency with advanced recruiting tools',
      features: ['Client Management', 'Candidate Tracking', 'Automated Matching', 'Billing Integration'],
    },
  ];

  const stats = [
    { value: '2M+', label: 'Active Candidates' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '48h', label: 'Average Time to Hire' },
    { value: '500+', label: 'Enterprise Clients' },
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
            <h1 className="text-4xl font-bold mb-4">Hire Top Talent</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find, engage, and hire the best candidates with our comprehensive recruiting platform
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl p-6 text-center shadow-sm border">
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Solutions */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border"
              >
                <solution.icon className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-3">{solution.title}</h2>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-8 border text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to transform your hiring?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using SINERGIYA to build their teams
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
