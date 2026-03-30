'use client';

import { motion } from 'framer-motion';
import { Briefcase, Heart, Clock, Filter, Search, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function SavedJobsPage() {
  const [filter, setFilter] = useState('all');

  const savedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Tashkent',
      salary: '$3000 - $5000',
      type: 'Full-time',
      postedAt: '2 days ago',
      savedAt: '1 day ago',
      logo: 'T',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$4000 - $6000',
      type: 'Full-time',
      postedAt: '3 days ago',
      savedAt: '2 days ago',
      logo: 'S',
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Samarkand',
      salary: '$2500 - $4000',
      type: 'Full-time',
      postedAt: '1 week ago',
      savedAt: '3 days ago',
      logo: 'D',
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'Tashkent',
      salary: '$3500 - $5500',
      type: 'Full-time',
      postedAt: '5 days ago',
      savedAt: '1 day ago',
      logo: 'DS',
    },
  ];

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
            <h1 className="text-4xl font-bold mb-4">Saved Jobs</h1>
            <p className="text-muted-foreground">
              {savedJobs.length} jobs saved for later
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {['all', 'remote', 'local', 'applied'].map((f) => (
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
          </motion.div>

          {/* Jobs List */}
          <div className="space-y-4">
            {savedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {job.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{job.title}</h2>
                      <p className="text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Saved {job.savedAt}
                    </span>
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
