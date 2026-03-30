'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last30days');

  const reports = [
    {
      id: 1,
      title: 'Monthly Hiring Report',
      description: 'Comprehensive overview of hiring activities',
      generatedAt: '2024-03-01',
      type: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Candidate Pipeline Analysis',
      description: 'Funnel analysis of candidate journey',
      generatedAt: '2024-02-28',
      type: 'Excel',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Diversity & Inclusion Report',
      description: 'Workforce diversity metrics',
      generatedAt: '2024-02-15',
      type: 'PDF',
      size: '3.2 MB',
    },
    {
      id: 4,
      title: 'Time-to-Hire Analysis',
      description: 'Recruitment efficiency metrics',
      generatedAt: '2024-02-01',
      type: 'PDF',
      size: '1.5 MB',
    },
  ];

  const stats = [
    { label: 'Total Reports', value: 24, change: '+12%' },
    { label: 'Generated This Month', value: 8, change: '+25%' },
    { label: 'Scheduled Reports', value: 5, change: '0%' },
    { label: 'Shared Reports', value: 12, change: '+50%' },
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
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and manage detailed reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <BarChart3 className="w-4 h-4" />
            Generate Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-sm border"
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select 
            className="px-4 py-2 rounded-lg border bg-background"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
            <option value="lastyear">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        {/* Reports List */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Report Name</th>
                <th className="text-left p-4 font-medium">Generated</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Size</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{report.generatedAt}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-secondary rounded text-sm">{report.type}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{report.size}</td>
                  <td className="p-4">
                    <button className="flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-secondary transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
