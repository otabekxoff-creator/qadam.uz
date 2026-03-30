'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Building2, Clock, DollarSign, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function JobSearchPage() {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    salary: '',
    experience: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      logo: 'T',
      location: 'Tashkent',
      type: 'Full-time',
      salary: '$3000 - $5000',
      postedAt: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our team...',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      logo: 'S',
      location: 'Remote',
      type: 'Full-time',
      salary: '$4000 - $6000',
      postedAt: '3 days ago',
      description: 'Join our fast-growing startup as a Product Manager...',
      skills: ['Product Strategy', 'Agile', 'Analytics'],
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      logo: 'D',
      location: 'Samarkand',
      type: 'Full-time',
      salary: '$2500 - $4000',
      postedAt: '1 week ago',
      description: 'Create beautiful user experiences for our clients...',
      skills: ['Figma', 'User Research', 'Prototyping'],
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'DataSystems',
      logo: 'DS',
      location: 'Tashkent',
      type: 'Full-time',
      salary: '$3500 - $5500',
      postedAt: '5 days ago',
      description: 'Build scalable backend systems for our data platform...',
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      logo: 'C',
      location: 'Remote',
      type: 'Full-time',
      salary: '$4000 - $6000',
      postedAt: '1 day ago',
      description: 'Manage our cloud infrastructure and CI/CD pipelines...',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    },
    {
      id: 6,
      title: 'Mobile Developer',
      company: 'AppWorks',
      logo: 'A',
      location: 'Bukhara',
      type: 'Full-time',
      salary: '$3000 - $4500',
      postedAt: '4 days ago',
      description: 'Develop cross-platform mobile applications...',
      skills: ['React Native', 'iOS', 'Android', 'Firebase'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
                />
              </div>
              <div className="relative md:w-64">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="City or country"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Search Jobs
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-xl border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Type</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">All Types</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Any Experience</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="lead">Lead/Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Salary Range</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Any Salary</option>
                      <option value="0-1000">$0 - $1,000</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Remote Options</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Any</option>
                      <option value="remote">Remote Only</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-site</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Job Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job List */}
            <div className="lg:col-span-2 space-y-4">
              <p className="text-muted-foreground mb-4">{jobs.length} jobs found</p>
              
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {job.logo}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold hover:text-primary transition-colors">
                          {job.title}
                        </h2>
                        <p className="text-muted-foreground">{job.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedAt}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-secondary rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="bg-card rounded-xl p-6 shadow-sm border sticky top-8">
                <h3 className="font-semibold mb-4">Job Alerts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified when new jobs match your search
                </p>
                <button className="w-full py-2 border rounded-lg hover:bg-secondary transition-colors">
                  Create Job Alert
                </button>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'Remote', 'Tashkent', 'Full-time', 'Senior'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary rounded-full text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
