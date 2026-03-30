'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';

export default function LegalPage() {
  const legalDocuments = [
    {
      title: 'Terms of Service',
      description: 'The rules and guidelines for using our platform',
      icon: FileText,
      lastUpdated: 'March 1, 2024',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your data',
      icon: Shield,
      lastUpdated: 'March 1, 2024',
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies and tracking technologies',
      icon: Scale,
      lastUpdated: 'February 15, 2024',
    },
    {
      title: 'GDPR Compliance',
      description: 'Your rights under European data protection laws',
      icon: AlertCircle,
      lastUpdated: 'January 10, 2024',
    },
  ];

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
            <h1 className="text-4xl font-bold mb-4">Legal Information</h1>
            <p className="text-xl text-muted-foreground">
              Important documents and policies governing the use of SINERGIYA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {legalDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow cursor-pointer"
              >
                <doc.icon className="w-10 h-10 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                <p className="text-muted-foreground mb-4">{doc.description}</p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {doc.lastUpdated}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
