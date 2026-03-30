'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Server, Database, Globe } from 'lucide-react';

export default function StatusPage() {
  const services = [
    {
      name: 'Website',
      status: 'operational',
      uptime: '99.99%',
      lastIncident: '30 days ago',
    },
    {
      name: 'API',
      status: 'operational',
      uptime: '99.95%',
      lastIncident: '15 days ago',
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      lastIncident: '45 days ago',
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.98%',
      lastIncident: '20 days ago',
    },
    {
      name: 'Job Search',
      status: 'operational',
      uptime: '99.97%',
      lastIncident: '10 days ago',
    },
    {
      name: 'File Upload',
      status: 'operational',
      uptime: '99.90%',
      lastIncident: '5 days ago',
    },
  ];

  const incidents = [
    {
      id: 1,
      date: '2024-03-15',
      title: 'API Latency Issues',
      status: 'resolved',
      duration: '15 minutes',
      description: 'Increased response times due to database query optimization.',
    },
    {
      id: 2,
      date: '2024-03-01',
      title: 'Scheduled Maintenance',
      status: 'completed',
      duration: '2 hours',
      description: 'Routine system updates and security patches.',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">System Status</h1>
            <p className="text-xl text-muted-foreground">
              Real-time status of SINERGIYA services
            </p>
          </motion.div>

          {/* Overall Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-green-500 text-white rounded-xl p-6 mb-8 text-center"
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-2xl font-bold">All Systems Operational</h2>
            <p className="mt-2 opacity-90">All services are running smoothly</p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 shadow-sm border mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl p-6 shadow-sm border"
          >
            <h2 className="text-xl font-semibold mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${
                      incident.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      incident.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{incident.date}</span>
                    <span>Duration: {incident.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
