'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, FileJson, Globe, Lock, Zap, Server, Webhook } from 'lucide-react';

export default function ApiDocsPage() {
  const endpoints = [
    {
      category: 'Authentication',
      methods: [
        { method: 'POST', path: '/api/auth/register', description: 'Register a new user' },
        { method: 'POST', path: '/api/auth/login', description: 'Authenticate user' },
        { method: 'GET', path: '/api/auth/me', description: 'Get current user' },
        { method: 'POST', path: '/api/auth/logout', description: 'Logout user' },
      ],
    },
    {
      category: 'Jobs',
      methods: [
        { method: 'GET', path: '/api/jobs', description: 'List all jobs' },
        { method: 'POST', path: '/api/jobs', description: 'Create a new job' },
        { method: 'GET', path: '/api/jobs/:id', description: 'Get job details' },
        { method: 'PUT', path: '/api/jobs/:id', description: 'Update job' },
        { method: 'DELETE', path: '/api/jobs/:id', description: 'Delete job' },
      ],
    },
    {
      category: 'Applications',
      methods: [
        { method: 'GET', path: '/api/applications', description: 'List applications' },
        { method: 'POST', path: '/api/applications', description: 'Submit application' },
        { method: 'GET', path: '/api/applications/:id', description: 'Get application details' },
        { method: 'PUT', path: '/api/applications/:id/status', description: 'Update status' },
      ],
    },
    {
      category: 'Companies',
      methods: [
        { method: 'GET', path: '/api/companies', description: 'List companies' },
        { method: 'GET', path: '/api/companies/:id', description: 'Get company details' },
        { method: 'PUT', path: '/api/companies/:id', description: 'Update company' },
      ],
    },
    {
      category: 'Users',
      methods: [
        { method: 'GET', path: '/api/users/profile', description: 'Get user profile' },
        { method: 'PUT', path: '/api/users/profile', description: 'Update profile' },
        { method: 'GET', path: '/api/users/saved-jobs', description: 'Get saved jobs' },
      ],
    },
    {
      category: 'Notifications',
      methods: [
        { method: 'GET', path: '/api/notifications', description: 'List notifications' },
        { method: 'PUT', path: '/api/notifications/:id/read', description: 'Mark as read' },
        { method: 'GET', path: '/api/notifications/unread-count', description: 'Get unread count' },
      ],
    },
  ];

  const features = [
    { icon: Zap, title: 'Rate Limiting', description: '1000 requests per hour for free tier, 10000 for premium' },
    { icon: Lock, title: 'Secure', description: 'OAuth 2.0 authentication with JWT tokens' },
    { icon: Webhook, title: 'Webhooks', description: 'Real-time notifications for events' },
    { icon: Globe, title: 'RESTful', description: 'Standard REST API with JSON responses' },
    { icon: Server, title: '99.9% Uptime', description: 'Reliable infrastructure with high availability' },
    { icon: Code, title: 'SDKs', description: 'Official SDKs for JavaScript, Python, and more' },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-600 bg-blue-50';
      case 'POST':
        return 'text-green-600 bg-green-50';
      case 'PUT':
        return 'text-yellow-600 bg-yellow-50';
      case 'DELETE':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build powerful integrations with our comprehensive REST API
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* API Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8">API Reference</h2>
            <div className="space-y-8">
              {endpoints.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.methods.map((endpoint, epIndex) => (
                      <div
                        key={epIndex}
                        className="flex items-center p-3 bg-secondary/50 rounded-lg"
                      >
                        <span className={`px-2 py-1 rounded text-xs font-mono font-medium mr-4 ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono mr-4">{endpoint.path}</code>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {endpoint.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Base URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 bg-card rounded-xl p-6 border"
          >
            <h2 className="text-xl font-semibold mb-4">Base URL</h2>
            <code className="block p-4 bg-secondary rounded-lg font-mono text-sm">
              https://api.step.uz/v1
            </code>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
