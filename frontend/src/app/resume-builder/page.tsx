'use client';

import { motion } from 'framer-motion';
import { FileText, Palette, Sparkles, Download, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(1);

  const templates = [
    { id: 1, name: 'Professional', color: 'bg-blue-500', popular: true },
    { id: 2, name: 'Modern', color: 'bg-purple-500', popular: false },
    { id: 3, name: 'Creative', color: 'bg-orange-500', popular: false },
    { id: 4, name: 'Minimal', color: 'bg-gray-700', popular: true },
  ];

  const features = [
    'AI-powered content suggestions',
    'ATS-friendly templates',
    'Real-time preview',
    'Export to PDF & Word',
    'LinkedIn integration',
    'Grammar & spell check',
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
            <h1 className="text-4xl font-bold mb-4">AI Resume Builder</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create a professional resume in minutes with our AI-powered resume builder
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-card rounded-lg p-4 border">
                <Check className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Choose a Template</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-xl overflow-hidden shadow-sm border cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className={`h-48 ${template.color} flex items-center justify-center`}>
                    <FileText className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      {template.popular && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
