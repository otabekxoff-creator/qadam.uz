'use client';

import { motion } from 'framer-motion';
import { Users, Building2, GraduationCap, Heart, ArrowRight, CheckCircle } from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Users,
      title: 'For Job Seekers',
      description: 'Find your dream job with AI-powered matching and career tools',
      features: [
        'AI job matching',
        'Resume builder',
        'Interview preparation',
        'Career coaching',
        'Skill assessments',
        'Salary insights',
      ],
      cta: 'Find Jobs',
    },
    {
      icon: Building2,
      title: 'For Employers',
      description: 'Hire top talent faster with our recruitment solutions',
      features: [
        'Smart candidate matching',
        'Applicant tracking',
        'Interview scheduling',
        'Analytics dashboard',
        'Employer branding',
        'Bulk hiring tools',
      ],
      cta: 'Post a Job',
    },
    {
      icon: GraduationCap,
      title: 'For Universities',
      description: 'Connect students with career opportunities and track outcomes',
      features: [
        'Student job board',
        'Career fair management',
        'Outcome tracking',
        'Employer partnerships',
        'Career counseling tools',
        'Alumni network',
      ],
      cta: 'Partner with Us',
    },
    {
      icon: Heart,
      title: 'For Nonprofits',
      description: 'Free tools to help your community find meaningful work',
      features: [
        'Free job postings',
        'Volunteer matching',
        'Training programs',
        'Impact tracking',
        'Community outreach',
        'Grant reporting',
      ],
      cta: 'Learn More',
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
            <h1 className="text-4xl font-bold mb-4">Solutions for Everyone</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored solutions to meet the unique needs of job seekers, employers, and organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
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
                <ul className="space-y-3 mb-6">
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
        </div>
      </section>
    </div>
  );
}
