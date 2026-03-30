'use client';

import { motion } from 'framer-motion';
import { Plug, CheckCircle2, ExternalLink, Settings, MessageSquare, GitBranch, LayoutGrid, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function IntegrationsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const integrations = [
    {
      id: 1,
      name: 'Slack',
      description: 'Get notifications and updates in your Slack workspace',
      icon: MessageSquare,
      category: 'Communication',
      status: 'connected',
      connectedAt: '2024-02-15',
    },
    {
      id: 2,
      name: 'GitHub',
      description: 'Import repositories and showcase your code',
      icon: GitBranch,
      category: 'Developer Tools',
      status: 'connected',
      connectedAt: '2024-01-20',
    },
    {
      id: 3,
      name: 'Trello',
      description: 'Track job applications on Trello boards',
      icon: LayoutGrid,
      category: 'Productivity',
      status: 'disconnected',
      connectedAt: null,
    },
    {
      id: 4,
      name: 'Google Calendar',
      description: 'Sync interviews and events with Google Calendar',
      icon: Calendar,
      category: 'Productivity',
      status: 'connected',
      connectedAt: '2024-03-01',
    },
  ];

  const categories = ['All', 'Communication', 'Productivity', 'Developer Tools', 'Storage', 'Analytics'];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground mb-8">Connect your favorite tools with SINERGIYA</p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search integrations..."
              className="w-full px-4 py-2 rounded-lg border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg border hover:bg-secondary transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Connected Integrations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Connected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((i) => i.status === 'connected')
              .map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <integration.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Connected
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Connected {integration.connectedAt}
                    </span>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Available Integrations */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((i) => i.status === 'disconnected')
              .map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <integration.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Connect
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
