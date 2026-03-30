'use client';

import { motion } from 'framer-motion';
import { Bell, BellRing, CheckCircle2, Clock, MessageSquare, Briefcase, User, X } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'job',
      title: 'New job match!',
      message: 'A new Senior Frontend Developer position matches your profile at TechCorp',
      time: '5 minutes ago',
      read: false,
      icon: Briefcase,
    },
    {
      id: 2,
      type: 'message',
      title: 'New message',
      message: 'Sarah from StartupXYZ sent you a message about your application',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare,
    },
    {
      id: 3,
      type: 'application',
      title: 'Application viewed',
      message: 'DesignStudio viewed your application for UX Designer position',
      time: '3 hours ago',
      read: true,
      icon: CheckCircle2,
    },
    {
      id: 4,
      type: 'interview',
      title: 'Interview scheduled',
      message: 'Your interview with DataSystems is confirmed for March 20, 2024 at 2:00 PM',
      time: '1 day ago',
      read: true,
      icon: Clock,
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile view',
      message: '15 employers viewed your profile this week',
      time: '2 days ago',
      read: true,
      icon: User,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors">
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'unread', 'jobs', 'messages'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-card border hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-card rounded-xl p-6 shadow-sm border ${
                !notification.read ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  notification.type === 'job' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'message' ? 'bg-green-100 text-green-600' :
                  notification.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <notification.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-sm text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
