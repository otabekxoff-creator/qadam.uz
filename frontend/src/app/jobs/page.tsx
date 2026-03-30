'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Briefcase, 
  Clock, 
  Building2, 
  GraduationCap, 
  Globe,
  Search,
  MapPin,
  DollarSign,
  Heart,
  Star,
  Zap
} from 'lucide-react';

// Mock jobs data
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Uzbekistan',
    location: 'Tashkent',
    type: 'FULL_TIME',
    salary: '$5,000 - $8,000',
    skills: ['React', 'TypeScript', 'Next.js'],
    postedAt: '2 days ago',
    isHot: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'Digital Solutions',
    location: 'Remote',
    type: 'REMOTE',
    salary: '$4,000 - $7,000',
    skills: ['Node.js', 'React', 'MongoDB'],
    postedAt: '3 days ago',
    isHot: false,
    isNew: true,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudNative',
    location: 'Tashkent',
    type: 'FULL_TIME',
    salary: '$6,000 - $9,000',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    postedAt: '1 week ago',
    isHot: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Samarkand',
    type: 'PART_TIME',
    salary: '$3,000 - $6,000',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    postedAt: '5 days ago',
    isHot: false,
    isNew: true,
    isFeatured: false,
  },
];

const jobTypes = [
  { value: 'FULL_TIME', label: 'Full-time', icon: Briefcase },
  { value: 'PART_TIME', label: 'Part-time', icon: Clock },
  { value: 'CONTRACT', label: 'Contract', icon: Building2 },
  { value: 'INTERNSHIP', label: 'Internship', icon: GraduationCap },
  { value: 'REMOTE', label: 'Remote', icon: Globe },
];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = !search || 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Ish o'rinlari</h1>
          <p className="text-gray-600">
            O'zbekistonning eng yaxshi kompaniyalarida ish toping
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Lavozim yoki kompaniya qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {jobTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(
                    selectedType === type.value ? '' : type.value
                  )}
                  className="gap-2"
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold line-clamp-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveJob(job.id)}
                      className={savedJobs.includes(job.id) ? 'text-red-500' : ''}
                    >
                      <Heart
                        className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.isFeatured && (
                      <Badge className="bg-primary">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {job.isHot && (
                      <Badge variant="destructive">
                        <Zap className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    {job.isNew && <Badge variant="secondary">New</Badge>}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {job.postedAt}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Ariza topshirish
                    </Button>
                    <Link href={`/jobs/${job.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        Batafsil
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ish o'rini topilmadi</h3>
            <p className="text-gray-500">Boshqa qidiruv so'zi bilan urinib ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}
