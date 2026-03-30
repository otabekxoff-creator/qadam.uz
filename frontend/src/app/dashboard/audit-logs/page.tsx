'use client';

import { motion } from 'framer-motion';
import { History, User, Settings, FileText, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';

export default function AuditLogsPage() {
  const [filter, setFilter] = useState('all');

  const logs = [
    {
      id: 1,
      action: 'User Login',
      user: 'john@company.com',
      ip: '192.168.1.1',
      timestamp: '2024-03-15 14:30:22',
      status: 'success',
      details: 'Successful login from Chrome on Windows',
    },
    {
      id: 2,
      action: 'Job Created',
      user: 'sarah@company.com',
      ip: '192.168.1.2',
      timestamp: '2024-03-15 14:25:10',
      status: 'success',
      details: 'Created job posting: Senior Frontend Developer',
    },
    {
      id: 3,
      action: 'API Key Generated',
      user: 'admin@company.com',
      ip: '192.168.1.3',
      timestamp: '2024-03-15 14:20:05',
      status: 'success',
      details: 'Generated new production API key',
    },
    {
      id: 4,
      action: 'Failed Login Attempt',
      user: 'unknown',
      ip: '203.0.113.1',
      timestamp: '2024-03-15 14:15:33',
      status: 'failure',
      details: 'Invalid credentials provided',
    },
    {
      id: 5,
      action: 'Settings Updated',
      user: 'john@company.com',
      ip: '192.168.1.1',
      timestamp: '2024-03-15 14:10:18',
      status: 'success',
      details: 'Updated notification preferences',
    },
    {
      id: 6,
      action: 'Webhook Deleted',
      user: 'sarah@company.com',
      ip: '192.168.1.2',
      timestamp: '2024-03-15 14:05:42',
      status: 'warning',
      details: 'Deleted webhook endpoint: https://api.example.com/webhook',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'failure':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'failure':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
        <p className="text-muted-foreground mb-8">Track all activities and changes in your account</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'auth', 'jobs', 'settings', 'api'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-card border hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Logs Table */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Action</th>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">IP Address</th>
                <th className="text-left p-4 font-medium">Timestamp</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{log.action}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {log.user}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm">{log.ip}</td>
                  <td className="p-4 text-sm text-muted-foreground">{log.timestamp}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors">
            <FileText className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </motion.div>
    </div>
  );
}
