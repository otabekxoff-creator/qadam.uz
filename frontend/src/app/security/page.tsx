'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck, Server, Globe, Zap, Bell } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Data Encryption',
      description: 'All data is encrypted at rest and in transit using industry-standard AES-256 encryption.',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication (MFA) and OAuth 2.0 support for secure access.',
    },
    {
      icon: Eye,
      title: 'Privacy Controls',
      description: 'Granular privacy settings allow you to control who sees your profile and data.',
    },
    {
      icon: FileCheck,
      title: 'GDPR Compliance',
      description: 'Full compliance with GDPR and other international data protection regulations.',
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Hosted on certified secure cloud infrastructure with regular security audits.',
    },
    {
      icon: Globe,
      title: 'DDoS Protection',
      description: 'Advanced DDoS protection ensures platform availability and security.',
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 security monitoring and automated threat detection.',
    },
    {
      icon: Bell,
      title: 'Incident Response',
      description: 'Rapid incident response team ready to address any security concerns.',
    },
  ];

  const certifications = [
    { name: 'ISO 27001', description: 'Information Security Management' },
    { name: 'SOC 2 Type II', description: 'Service Organization Control' },
    { name: 'GDPR', description: 'Data Protection Compliance' },
    { name: 'PCI DSS', description: 'Payment Card Industry Standards' },
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
            <h1 className="text-4xl font-bold mb-4">Security & Privacy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your data security is our top priority. We employ enterprise-grade security measures to protect your information.
            </p>
          </motion.div>

          {/* Security Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl p-8 border mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Security Certifications</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-8 border"
          >
            <h2 className="text-2xl font-bold mb-6">Security Best Practices</h2>
            <div className="space-y-4">
              {[
                'Enable two-factor authentication (2FA) for your account',
                'Use a strong, unique password and update it regularly',
                'Be cautious of phishing emails claiming to be from Step.uz',
                'Keep your browser and operating system up to date',
                'Log out of your account when using shared computers',
                'Review your account activity regularly',
              ].map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
