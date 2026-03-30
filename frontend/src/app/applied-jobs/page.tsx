'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, FileText, Building2, MapPin, DollarSign } from 'lucide-react';

export default function AppliedJobsPage() {
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Tashkent',
      salary: '$3000 - $5000',
      appliedAt: '3 days ago',
      status: 'pending',
      statusText: 'Application Received',
      logo: 'T',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$4000 - $6000',
      appliedAt: '1 week ago',
      status: 'interview',
      statusText: 'Interview Scheduled',
      logo: 'S',
    },
    {
      id: 3,
      jobTitle: 'UX Designer',
      company: 'DesignStudio',
      location: 'Samarkand',
      salary: '$2500 - $4000',
      appliedAt: '2 weeks ago',
      status: 'rejected',
      statusText: 'Not Selected',
      logo: 'D',
    },
    {
      id: 4,
      jobTitle: 'Backend Engineer',
      company: 'DataSystems',
      location: 'Tashkent',
      salary: '$3500 - $5500',
      appliedAt: '5 days ago',
      status: 'reviewing',
      statusText: 'Under Review',
      logo: 'DS',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'reviewing':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'interview':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'reviewing':
        return 'bg-blue-100 text-blue-700';
      case 'interview':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">Applied Jobs</h1>
            <p className="text-muted-foreground">
              Track the status of your {applications.length} job applications
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-card rounded-xl p-4 text-center border">
              <p className="text-2xl font-bold">{applications.length}</p>
              <p className="text-sm text-muted-foreground">Total Applied</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border">
              <p className="text-2xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'pending' || a.status === 'reviewing').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border">
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'interview').length}
              </p>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border">
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(a => a.status === 'rejected').length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </motion.div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {application.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{application.jobTitle}</h2>
                      <p className="text-muted-foreground">{application.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {application.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {application.statusText}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied {application.appliedAt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
