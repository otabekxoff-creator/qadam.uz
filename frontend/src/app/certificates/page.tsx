'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, FileText, Share2, Download, Printer } from 'lucide-react';

export default function CertificatePage() {
  const certificates = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      issuer: 'SINERGIYA Academy',
      date: 'March 15, 2024',
      skills: ['JavaScript', 'ES6+', 'Async Programming'],
      verified: true,
      credentialId: 'STEP-JS-2024-001',
    },
    {
      id: 2,
      title: 'React Development',
      issuer: 'SINERGIYA Academy',
      date: 'February 28, 2024',
      skills: ['React', 'Hooks', 'State Management'],
      verified: true,
      credentialId: 'STEP-REACT-2024-002',
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      issuer: 'Design Institute',
      date: 'January 20, 2024',
      skills: ['Figma', 'User Research', 'Prototyping'],
      verified: true,
      credentialId: 'STEP-UX-2024-003',
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
            <h1 className="text-4xl font-bold mb-4">My Certificates</h1>
            <p className="text-xl text-muted-foreground">
              Showcase your verified skills and achievements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-lg border"
              >
                {/* Certificate Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                  <Award className="w-12 h-12 mb-3" />
                  <h2 className="text-xl font-bold">{cert.title}</h2>
                  <p className="opacity-90">{cert.issuer}</p>
                </div>

                {/* Certificate Body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Issued</span>
                      <span>{cert.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credential ID</span>
                      <span className="font-mono">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-secondary rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="p-2 border rounded-lg hover:bg-secondary transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 border rounded-lg hover:bg-secondary transition-colors">
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Certificate CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 bg-card rounded-xl p-8 border text-center"
          >
            <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Add External Certificate</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Import certificates from other platforms to showcase all your skills in one place
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
