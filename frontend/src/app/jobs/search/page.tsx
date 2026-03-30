'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Building2, Clock, DollarSign, Filter, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </Button>
        </Link>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-6">Orzuingizdagi Ishni Toping</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ish nomi, kalit so'z yoki kompaniya"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
                />
              </div>
              <div className="relative md:w-64">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Shahar yoki mamlakat"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Ish Qidirish
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
              Filtrlar
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-xl border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ish Turi</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Barcha turlar</option>
                      <option value="full-time">To'liq stavka</option>
                      <option value="part-time">Yarim stavka</option>
                      <option value="contract">Shartnoma</option>
                      <option value="internship">Stajirovka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tajriba</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Har qanday tajriba</option>
                      <option value="entry">Boshlang'ich</option>
                      <option value="mid">O'rta</option>
                      <option value="senior">Senior</option>
                      <option value="lead">Rahbar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Maosh</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Har qanday maosh</option>
                      <option value="0-1000">$0 - $1,000</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ish rejimi</label>
                    <select className="w-full px-3 py-2 rounded-lg border bg-background">
                      <option value="">Barchasi</option>
                      <option value="remote">Masofadan</option>
                      <option value="hybrid">Gibrid</option>
                      <option value="onsite">Ofisda</option>
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
              <p className="text-muted-foreground mb-4">{jobs.length} ta ish topildi</p>
              
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
                <h3 className="font-semibold mb-4">Ish E'lonlari</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Qidiruv bo'yicha yangi ishlar chiqishi haqida xabar oling
                </p>
                <button className="w-full py-2 border rounded-lg hover:bg-secondary transition-colors">
                  E'lon Yaratish
                </button>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Mashhur Qidiruvlar</h3>
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
