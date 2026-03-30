'use client';

import { motion } from 'framer-motion';
import { Users, UserPlus, Mail, MoreHorizontal, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@company.com',
      role: 'Admin',
      department: 'Management',
      status: 'active',
      lastActive: '2 hours ago',
      avatar: 'JS',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Recruiter',
      department: 'HR',
      status: 'active',
      lastActive: '5 minutes ago',
      avatar: 'SJ',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@company.com',
      role: 'Hiring Manager',
      department: 'Engineering',
      status: 'active',
      lastActive: '1 day ago',
      avatar: 'MD',
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily@company.com',
      role: 'Viewer',
      department: 'Marketing',
      status: 'pending',
      lastActive: 'Never',
      avatar: 'EW',
    },
  ];

  const roles = [
    { name: 'Admin', description: 'Full access to all features' },
    { name: 'Recruiter', description: 'Can post jobs and manage candidates' },
    { name: 'Hiring Manager', description: 'Can review applicants and schedule interviews' },
    { name: 'Viewer', description: 'Read-only access to reports' },
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
            <h1 className="text-3xl font-bold mb-2">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and their permissions</p>
          </div>
        </div>

        {/* Invite Section */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <h2 className="text-lg font-semibold mb-4">Invite Team Member</h2>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <select className="px-4 py-2 rounded-lg border bg-background">
              {roles.map((role) => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <UserPlus className="w-4 h-4" />
              Invite
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Member</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Department</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Last Active</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      {member.role}
                    </div>
                  </td>
                  <td className="p-4">{member.department}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status === 'active' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{member.lastActive}</td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Roles Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-sm border"
            >
              <h3 className="font-semibold mb-1">{role.name}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
