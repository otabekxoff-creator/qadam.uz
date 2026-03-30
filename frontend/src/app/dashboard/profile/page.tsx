'use client';

import { motion } from 'framer-motion';
import { User, Building2, Mail, Phone, MapPin, Calendar, Edit, Camera, Link as LinkIcon, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'social', name: 'Social Links', icon: LinkIcon },
    { id: 'preferences', name: 'Preferences', icon: Calendar },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your profile information and preferences</p>

        {/* Profile Header */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-muted-foreground">Software Engineer at TechCorp</p>
              <p className="text-sm text-muted-foreground mt-1">Tashkent, Uzbekistan</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors ${
                    activeTab === tab.id ? 'bg-secondary border-l-4 border-primary' : ''
                  }`}
                >
                  <tab.icon className="w-5 h-5 text-muted-foreground" />
                  <span className={activeTab === tab.id ? 'font-medium' : ''}>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-2 rounded-lg border bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-2 rounded-lg border bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" defaultValue="john@example.com" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="tel" defaultValue="+998 90 123 4567" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" defaultValue="Tashkent, Uzbekistan" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea rows={4} className="w-full px-4 py-2 rounded-lg border bg-background resize-none" defaultValue="Passionate software engineer with 5+ years of experience in web development." />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" defaultValue="TechCorp" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Title</label>
                      <input type="text" defaultValue="Senior Software Engineer" className="w-full px-4 py-2 rounded-lg border bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="date" defaultValue="2020-01-15" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <input type="text" defaultValue="Engineering" className="w-full px-4 py-2 rounded-lg border bg-background" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn</label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="url" defaultValue="https://linkedin.com/in/johndoe" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="url" defaultValue="https://github.com/johndoe" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="url" defaultValue="https://twitter.com/johndoe" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive job alerts and updates</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Make your profile visible to employers</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive tips and career advice</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
