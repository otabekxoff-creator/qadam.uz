'use client';

import { motion } from 'framer-motion';
import { Building2, GraduationCap, Briefcase, Heart, Laptop, Plane, ShoppingBag, Factory } from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    {
      icon: Laptop,
      name: 'Technology',
      count: 1250,
      description: 'Software development, IT services, and tech startups',
      roles: ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'],
    },
    {
      icon: Building2,
      name: 'Finance',
      count: 890,
      description: 'Banking, insurance, fintech, and investment firms',
      roles: ['Financial Analyst', 'Investment Banker', 'Risk Manager', 'Accountant'],
    },
    {
      icon: Heart,
      name: 'Healthcare',
      count: 650,
      description: 'Hospitals, clinics, pharmaceuticals, and medical devices',
      roles: ['Doctor', 'Nurse', 'Pharmacist', 'Medical Researcher'],
    },
    {
      icon: GraduationCap,
      name: 'Education',
      count: 420,
      description: 'Schools, universities, edtech, and training centers',
      roles: ['Teacher', 'Professor', 'Curriculum Developer', 'Education Consultant'],
    },
    {
      icon: Factory,
      name: 'Manufacturing',
      count: 380,
      description: 'Industrial production, supply chain, and logistics',
      roles: ['Production Manager', 'Quality Engineer', 'Supply Chain Analyst', 'Operations Manager'],
    },
    {
      icon: ShoppingBag,
      name: 'Retail',
      count: 520,
      description: 'E-commerce, brick-and-mortar stores, and consumer goods',
      roles: ['Store Manager', 'Merchandiser', 'Buyer', 'Customer Service'],
    },
    {
      icon: Plane,
      name: 'Travel & Hospitality',
      count: 280,
      description: 'Airlines, hotels, tourism, and restaurants',
      roles: ['Hotel Manager', 'Travel Agent', 'Event Coordinator', 'Chef'],
    },
    {
      icon: Briefcase,
      name: 'Consulting',
      count: 340,
      description: 'Management consulting, legal, and professional services',
      roles: ['Management Consultant', 'Strategy Analyst', 'Business Analyst', 'Legal Consultant'],
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
            <h1 className="text-4xl font-bold mb-4">Browse by Industry</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore job opportunities across various industries and sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <industry.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-1">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {industry.count} jobs available
                </p>
                <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Top roles:</p>
                  <div className="flex flex-wrap gap-1">
                    {industry.roles.slice(0, 3).map((role, roleIndex) => (
                      <span
                        key={roleIndex}
                        className="px-2 py-1 bg-secondary rounded text-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
