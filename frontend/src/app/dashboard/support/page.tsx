'use client';

import { motion } from 'framer-motion';
import { Headphones, MessageSquare, Ticket, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('tickets');

  const tickets = [
    {
      id: 'TICKET-001',
      subject: 'API Integration Issue',
      status: 'open',
      priority: 'high',
      createdAt: '2 hours ago',
      lastUpdate: '30 minutes ago',
      category: 'Technical',
    },
    {
      id: 'TICKET-002',
      subject: 'Billing Question',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '1 day ago',
      lastUpdate: '2 hours ago',
      category: 'Billing',
    },
    {
      id: 'TICKET-003',
      subject: 'Feature Request',
      status: 'closed',
      priority: 'low',
      createdAt: '3 days ago',
      lastUpdate: '1 day ago',
      category: 'Feature',
    },
  ];

  const faqCategories = [
    { name: 'Getting Started', articles: 12 },
    { name: 'Account & Billing', articles: 8 },
    { name: 'API & Integrations', articles: 15 },
    { name: 'Jobs & Applications', articles: 10 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'closed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'closed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Support Center</h1>
            <p className="text-muted-foreground">Get help and contact our support team</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {['tickets', 'faq', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'faq' ? 'FAQ' : tab}
            </button>
          ))}
        </div>

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-muted-foreground">{ticket.id}</span>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground">{ticket.category}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Created {ticket.createdAt}</p>
                    <p>Updated {ticket.lastUpdate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{category.articles} articles</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Phone Support</h3>
                <p className="text-sm text-muted-foreground">+998 71 123 4567</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@step.uz</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
