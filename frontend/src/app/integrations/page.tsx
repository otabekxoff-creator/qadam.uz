'use client';

import { motion } from 'framer-motion';
import { 
  Plug, 
  Zap, 
  Shield, 
  Cloud, 
  FileText, 
  Calendar,
  Mail,
  MessageSquare,
  Video,
  Database,
  Github,
  Globe
} from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      category: 'Communication',
      items: [
        { name: 'Slack', icon: MessageSquare, description: 'Get notifications and updates in your Slack workspace' },
        { name: 'Microsoft Teams', icon: Video, description: 'Collaborate with your team directly in Teams' },
        { name: 'Zoom', icon: Video, description: 'Schedule and join interviews with Zoom integration' },
      ],
    },
    {
      category: 'Productivity',
      items: [
        { name: 'Google Calendar', icon: Calendar, description: 'Sync interviews and events with Google Calendar' },
        { name: 'Notion', icon: FileText, description: 'Export job descriptions and notes to Notion' },
        { name: 'Trello', icon: Database, description: 'Track applications on Trello boards' },
      ],
    },
    {
      category: 'Storage & Cloud',
      items: [
        { name: 'Google Drive', icon: Cloud, description: 'Store and share resumes securely' },
        { name: 'Dropbox', icon: Cloud, description: 'Upload and manage application documents' },
        { name: 'AWS S3', icon: Database, description: 'Enterprise document storage solution' },
      ],
    },
    {
      category: 'Developer Tools',
      items: [
        { name: 'GitHub', icon: Github, description: 'Showcase your GitHub repositories' },
        { name: 'GitLab', icon: Github, description: 'Connect GitLab projects to your profile' },
        { name: 'Bitbucket', icon: Github, description: 'Import Bitbucket repositories' },
      ],
    },
  ];

  const apiFeatures = [
    { icon: Zap, title: 'RESTful API', description: 'Access all platform features via our comprehensive REST API' },
    { icon: Shield, title: 'OAuth 2.0', description: 'Secure authentication with industry-standard OAuth 2.0' },
    { icon: Globe, title: 'Webhooks', description: 'Real-time notifications with webhook integration' },
    { icon: Database, title: 'Rate Limiting', description: 'Generous rate limits for all API tiers' },
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
            <h1 className="text-4xl font-bold mb-4">Integrations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect Step.uz with your favorite tools and streamline your workflow
            </p>
          </motion.div>

          {/* API Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Integration Categories */}
          <div className="space-y-12">
            {integrations.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Developer Docs CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 bg-card rounded-xl p-8 border text-center"
          >
            <Plug className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Build Custom Integrations</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our comprehensive API to build custom integrations for your specific needs
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
