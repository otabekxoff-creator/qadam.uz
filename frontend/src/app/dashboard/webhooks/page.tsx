'use client';

import { motion } from 'framer-motion';
import { Webhook, Plus, CheckCircle2, XCircle, Clock, Activity } from 'lucide-react';
import { useState } from 'react';

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: 'https://api.company.com/webhooks/stepuz',
      events: ['job.application', 'job.created'],
      status: 'active',
      lastDelivery: '2 minutes ago',
      successRate: '99.5%',
    },
    {
      id: 2,
      url: 'https://hooks.slack.com/services/T000/B000/XXXX',
      events: ['user.registered', 'job.application'],
      status: 'active',
      lastDelivery: '5 minutes ago',
      successRate: '98.2%',
    },
    {
      id: 3,
      url: 'https://api.example.com/webhook',
      events: ['job.created'],
      status: 'inactive',
      lastDelivery: '3 days ago',
      successRate: '0%',
    },
  ]);

  const availableEvents = [
    { id: 'job.created', name: 'Job Created', description: 'Triggered when a new job is posted' },
    { id: 'job.updated', name: 'Job Updated', description: 'Triggered when a job is modified' },
    { id: 'job.application', name: 'New Application', description: 'Triggered when someone applies to a job' },
    { id: 'user.registered', name: 'User Registered', description: 'Triggered when a new user signs up' },
    { id: 'interview.scheduled', name: 'Interview Scheduled', description: 'Triggered when an interview is booked' },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Webhooks</h1>
            <p className="text-muted-foreground">Configure webhook endpoints to receive real-time event notifications</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>

        {/* Webhooks List */}
        <div className="space-y-4 mb-8">
          {webhooks.map((webhook, index) => (
            <motion.div
              key={webhook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Webhook className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium font-mono text-sm">{webhook.url}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        webhook.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {webhook.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Success rate: {webhook.successRate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {webhook.events.map((event) => (
                  <span key={event} className="px-2 py-1 bg-secondary rounded text-xs">
                    {event}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last delivery: {webhook.lastDelivery}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Available Events */}
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Available Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableEvents.map((event, index) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <Activity className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
