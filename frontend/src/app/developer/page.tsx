'use client';

import { motion } from 'framer-motion';
import { Code, Terminal, BookOpen, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function DeveloperPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const quickStartCode = `npm install @stepuz/sdk

import { StepUZ } from '@stepuz/sdk';

const client = new StepUZ({
  apiKey: 'your_api_key'
});

// Search jobs
const jobs = await client.jobs.search({
  query: 'software engineer',
  location: 'Tashkent'
});`;

  const features = [
    {
      title: 'REST API',
      description: 'Access all platform features via our comprehensive REST API with predictable resource-oriented URLs.',
      icon: Terminal,
      code: `GET /api/v1/jobs?location=Tashkent&page=1

Response:
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 20
  }
}`,
    },
    {
      title: 'Webhooks',
      description: 'Receive real-time notifications when events occur in your account.',
      icon: ExternalLink,
      code: `POST /webhook/endpoint

Headers:
X-StepUZ-Signature: sha256=...

Payload:
{
  "event": "job.application",
  "data": {
    "job_id": "123",
    "applicant_id": "456"
  }
}`,
    },
    {
      title: 'Authentication',
      description: 'Secure your API requests with OAuth 2.0 or API key authentication.',
      icon: BookOpen,
      code: `// OAuth 2.0
POST /oauth/token

// API Key (Header)
Authorization: Bearer YOUR_API_KEY

// API Key (Query)
GET /api/v1/jobs?api_key=YOUR_API_KEY`,
    },
  ];

  const sdks = [
    { name: 'JavaScript/TypeScript', status: 'Stable', version: 'v2.5.0' },
    { name: 'Python', status: 'Stable', version: 'v2.3.0' },
    { name: 'Ruby', status: 'Beta', version: 'v1.8.0' },
    { name: 'PHP', status: 'Stable', version: 'v2.1.0' },
    { name: 'Go', status: 'Beta', version: 'v1.5.0' },
    { name: 'Java', status: 'Alpha', version: 'v0.9.0' },
  ];

  const resources = [
    { title: 'API Reference', description: 'Complete API documentation with examples' },
    { title: 'SDK Documentation', description: 'Language-specific guides and tutorials' },
    { title: 'Changelog', description: 'Latest updates and breaking changes' },
    { title: 'Community Forum', description: 'Ask questions and share knowledge' },
    { title: 'GitHub', description: 'Open source SDKs and examples' },
    { title: 'Support', description: 'Get help from our developer team' },
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
            <h1 className="text-4xl font-bold mb-4">Developer Portal</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build powerful integrations with our comprehensive API and SDKs
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-8 shadow-lg border mb-16"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Quick Start</h2>
              <button
                onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {copied === 'quickstart' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'quickstart' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{quickStartCode}</code>
            </pre>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <pre className="text-xs font-mono overflow-x-auto">{feature.code}</pre>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SDKs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Official SDKs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sdks.map((sdk, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border hover:border-primary transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="font-semibold">{sdk.name}</h3>
                    <p className="text-sm text-muted-foreground">{sdk.version}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    sdk.status === 'Stable' ? 'bg-green-100 text-green-700' :
                    sdk.status === 'Beta' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {sdk.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-xl border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
