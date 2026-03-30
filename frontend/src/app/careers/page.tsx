'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Search,
  Filter,
  Heart,
  Share2,
  Building2,
  Users,
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// Careers Data
// ============================================================================

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$3,000 - $5,000',
    postedAt: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build the future of career development in Uzbekistan.',
    requirements: [
      '5+ years of experience with React/Next.js',
      'Strong TypeScript skills',
      'Experience with Tailwind CSS',
      'Understanding of performance optimization',
    ],
    benefits: ['Health insurance', 'Remote work', 'Learning budget', 'Stock options'],
  },
  {
    id: 2,
    title: 'Backend Engineer (Node.js)',
    department: 'Engineering',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$3,500 - $6,000',
    postedAt: '3 days ago',
    description: 'Build scalable backend services and APIs that power our platform serving thousands of users daily.',
    requirements: [
      '4+ years of Node.js experience',
      'PostgreSQL and database design',
      'Redis and caching strategies',
      'AWS/GCP experience',
    ],
    benefits: ['Health insurance', 'Flexible hours', 'Conference trips', 'Gym membership'],
  },
  {
    id: 3,
    title: 'Product Designer',
    department: 'Design',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$2,500 - $4,500',
    postedAt: '1 week ago',
    description: 'Create beautiful, intuitive interfaces that help users find their dream jobs and advance their careers.',
    requirements: [
      '3+ years of UI/UX experience',
      'Figma expertise',
      'Portfolio demonstrating web apps',
      'Understanding of design systems',
    ],
    benefits: ['MacBook Pro', 'Design tools', 'Remote friendly', 'Creative budget'],
  },
  {
    id: 4,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$2,000 - $3,500',
    postedAt: '5 days ago',
    description: 'Lead our marketing efforts to grow our user base and help more people find great opportunities.',
    requirements: [
      '3+ years of digital marketing',
      'Social media expertise',
      'Content strategy experience',
      'Analytics and data-driven mindset',
    ],
    benefits: ['Performance bonuses', 'Training budget', 'Team events', 'Flexible schedule'],
  },
  {
    id: 5,
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$1,000 - $1,800',
    postedAt: '1 day ago',
    description: 'Help our users succeed by providing exceptional support and guidance throughout their journey.',
    requirements: [
      'Excellent communication skills',
      '1+ year customer service experience',
      'Problem-solving abilities',
      'Uzbek and Russian fluency',
    ],
    benefits: ['Career growth', 'Training programs', 'Team lunches', 'Wellness stipend'],
  },
  {
    id: 6,
    title: 'Data Analyst',
    department: 'Data',
    location: 'Tashkent',
    type: 'Full-time',
    salary: '$2,000 - $3,500',
    postedAt: '4 days ago',
    description: 'Analyze user behavior and market trends to help us make data-driven decisions.',
    requirements: [
      'SQL proficiency',
      'Experience with analytics tools',
      'Statistics background',
      'Python or R knowledge',
    ],
    benefits: ['Latest tools', 'Certification support', 'Hackathons', 'Knowledge sharing'],
  },
];

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Marketing', 'Support', 'Data'];
const LOCATIONS = ['All', 'Tashkent', 'Remote'];
const TYPES = ['All', 'Full-time', 'Part-time', 'Contract'];

const BENEFITS = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, gym membership, and mental health support',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Above-market salaries with regular reviews and performance bonuses',
  },
  {
    icon: Sparkles,
    title: 'Learning & Growth',
    description: 'Annual learning budget, conference attendance, and mentorship programs',
  },
  {
    icon: Clock,
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote work options, and generous vacation policy',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Work with talented, passionate people who care about making a difference',
  },
  {
    icon: Building2,
    title: 'Modern Office',
    description: 'Beautiful workspace in central Tashkent with all the amenities',
  },
];

const TEAM_QUOTES = [
  {
    quote: "Working at Step.uz has been the most rewarding experience of my career. We're literally changing lives every day.",
    author: 'Sarah K.',
    role: 'Senior Developer',
  },
  {
    quote: "The growth opportunities here are incredible. I started as an intern and now lead a team of 5 designers.",
    author: 'Bobur T.',
    role: 'Design Lead',
  },
  {
    quote: "I love how everyone is genuinely passionate about helping people find their dream jobs.",
    author: 'Nilufar M.',
    role: 'Product Manager',
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredPositions = OPEN_POSITIONS.filter((position) => {
    const matchesSearch = position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || position.department === selectedDept;
    const matchesLocation = selectedLocation === 'All' || position.location === selectedLocation;
    const matchesType = selectedType === 'All' || position.type === selectedType;
    return matchesSearch && matchesDept && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              We are hiring!
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build the future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                careers in Uzbekistan
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10">
              Join our mission to help millions of people find their dream jobs and build meaningful careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                View Open Positions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Why Join Us?
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { value: '50+', label: 'Team Members' },
              { value: '15+', label: 'Open Positions' },
              { value: '500K+', label: 'Users Helped' },
              { value: '4.9/5', label: 'Employee Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why work at Step.uz?
            </h2>
            <p className="text-lg text-gray-600">
              We're building something meaningful, and we want passionate people to join us on this journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Find your perfect role and help us make a difference
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                {TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Positions List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {filteredPositions.map((position) => (
              <motion.div key={position.id} variants={itemVariants}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-blue-100 text-blue-700 border-0">
                            {position.department}
                          </Badge>
                          <span className="text-sm text-gray-500">{position.postedAt}</span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                          {position.title}
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-2xl">
                          {position.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {position.salary}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-gray-300">
                          Learn More
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-green-50 text-green-700 border-0">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No positions found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedLocation('All');
                  setSelectedType('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Team Quotes */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What our team says
            </h2>
            <p className="text-lg text-slate-400">
              Hear from the people who make Step.uz great
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {TEAM_QUOTES.map((quote, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <Star className="w-8 h-8 text-yellow-500 mb-4" />
                    <p className="text-lg text-white/90 mb-6 italic">
                      "{quote.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-white">{quote.author}</p>
                      <p className="text-sm text-slate-400">{quote.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't see the right position?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
              Send General Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
