'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Mail, 
  Phone,
  CheckCircle,
  Briefcase,
  ChevronRight,
  Share2,
  Bookmark,
  ExternalLink,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Mock company data
const COMPANY_DATA = {
  id: '1',
  name: 'Tech Solutions Uzbekistan',
  logo: null,
  coverImage: null,
  description: 'Leading software development company in Central Asia specializing in enterprise solutions, mobile applications, and cloud infrastructure. We are committed to delivering high-quality software products that drive business growth.',
  website: 'https://techsolutions.uz',
  email: 'careers@techsolutions.uz',
  phone: '+998 71 123 45 67',
  location: 'Tashkent, Mirzo-Ulugbek district',
  industry: 'Information Technology',
  size: '201-500 employees',
  founded: '2015',
  isVerified: true,
  rating: 4.8,
  reviews: 127,
  socialLinks: {
    linkedin: 'https://linkedin.com/company/techsolutions',
    twitter: 'https://twitter.com/techsolutions',
    facebook: 'https://facebook.com/techsolutions',
  },
  benefits: [
    'Competitive salary',
    'Health insurance',
    'Remote work options',
    'Professional development',
    'Modern office',
    'Free lunches',
    'Team building',
    'Flexible hours',
  ],
  culture: 'We believe in innovation, collaboration, and continuous learning. Our team consists of passionate professionals who love what they do.',
  mission: 'To transform businesses through innovative technology solutions and empower the next generation of tech talent in Uzbekistan.',
  vision: 'Become the leading technology company in Central Asia by 2030.',
  stats: {
    activeJobs: 12,
    totalEmployees: 234,
    growthRate: '+25%',
    avgTenure: '3.5 years',
  },
};

const COMPANY_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    type: 'Full-time',
    location: 'Tashkent',
    salary: '8,000,000 - 15,000,000 UZS',
    postedAt: '2 days ago',
    skills: ['React', 'TypeScript', 'Next.js'],
    applications: 23,
  },
  {
    id: 2,
    title: 'Backend Engineer (Node.js)',
    type: 'Full-time',
    location: 'Tashkent',
    salary: '10,000,000 - 18,000,000 UZS',
    postedAt: '3 days ago',
    skills: ['Node.js', 'PostgreSQL', 'Redis'],
    applications: 15,
  },
  {
    id: 3,
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Hybrid',
    salary: '6,000,000 - 12,000,000 UZS',
    postedAt: '1 week ago',
    skills: ['Figma', 'UI/UX', 'Design Systems'],
    applications: 34,
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Remote',
    salary: '12,000,000 - 20,000,000 UZS',
    postedAt: '5 days ago',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    applications: 12,
  },
];

const REVIEWS = [
  {
    id: 1,
    author: 'Azizbek R.',
    role: 'Software Developer',
    rating: 5,
    date: '2026-03-15',
    content: 'Great place to work! The company really invests in employee growth and development. Management is supportive and the projects are challenging.',
    pros: ['Good salary', 'Learning opportunities', 'Modern tech stack'],
    cons: ['Sometimes long hours'],
  },
  {
    id: 2,
    author: 'Malika T.',
    role: 'UI/UX Designer',
    rating: 4,
    date: '2026-02-28',
    content: 'Good work environment with talented colleagues. The company culture promotes innovation and creativity.',
    pros: ['Creative freedom', 'Friendly team', 'Good benefits'],
    cons: ['Office location'],
  },
  {
    id: 3,
    author: 'Dilshod K.',
    role: 'Project Manager',
    rating: 5,
    date: '2026-02-10',
    content: 'Excellent leadership and vision. The company is growing rapidly and there are many opportunities for career advancement.',
    pros: ['Career growth', 'International projects', 'Competitive pay'],
    cons: ['Fast-paced environment'],
  },
];

export default function CompanyDetailPage() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cover Image */}
      <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {COMPANY_DATA.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-2xl font-bold text-gray-900">{COMPANY_DATA.name}</h1>
                          {COMPANY_DATA.isVerified && (
                            <Badge className="bg-blue-100 text-blue-700 border-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-500 mt-1">{COMPANY_DATA.industry}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {COMPANY_DATA.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {COMPANY_DATA.size}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <a href={COMPANY_DATA.website} className="text-blue-600 hover:underline">
                              Website
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={isFollowing ? 'default' : 'outline'}
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          <Bookmark className="w-4 h-4 mr-2" />
                          {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{COMPANY_DATA.stats.activeJobs}</p>
                        <p className="text-sm text-gray-500">Open Jobs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{COMPANY_DATA.stats.totalEmployees}</p>
                        <p className="text-sm text-gray-500">Employees</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{COMPANY_DATA.stats.growthRate}</p>
                        <p className="text-sm text-gray-500">Growth</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{COMPANY_DATA.stats.avgTenure}</p>
                        <p className="text-sm text-gray-500">Avg Tenure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="jobs">Jobs ({COMPANY_JOBS.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({REVIEWS.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Company</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{COMPANY_DATA.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
                        <p className="text-gray-600 text-sm">{COMPANY_DATA.mission}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                        <p className="text-gray-600 text-sm">{COMPANY_DATA.vision}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Culture</h4>
                      <p className="text-gray-600 text-sm">{COMPANY_DATA.culture}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Benefits & Perks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {COMPANY_DATA.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{COMPANY_DATA.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{COMPANY_DATA.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{COMPANY_DATA.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a href={COMPANY_DATA.website} className="text-blue-600 hover:underline">
                        {COMPANY_DATA.website}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                <div className="space-y-4">
                  {COMPANY_JOBS.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge variant="secondary">{job.type}</Badge>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {job.applications} applications
                              </span>
                            </div>
                            <p className="text-green-600 font-medium mt-2">{job.salary}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.skills.map((skill) => (
                                <Badge key={skill} variant="outline">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-3">Posted {job.postedAt}</p>
                          </div>
                          <Button>
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-gray-900">{COMPANY_DATA.rating}</p>
                          <div className="flex items-center justify-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.floor(COMPANY_DATA.rating)
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{COMPANY_DATA.reviews} reviews</p>
                        </div>
                        <Separator orientation="vertical" className="h-24" />
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-8">{rating}★</span>
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-500 rounded-full"
                                  style={{ width: `${Math.random() * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {REVIEWS.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{review.author}</p>
                              <p className="text-sm text-gray-500">{review.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-4">{review.content}</p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium text-green-600 mb-1">Pros</p>
                            <ul className="text-sm text-gray-600">
                              {review.pros.map((pro, index) => (
                                <li key={index}>+ {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-red-600 mb-1">Cons</p>
                            <ul className="text-sm text-gray-600">
                              {review.cons.map((con, index) => (
                                <li key={index}>- {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Posted on {review.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-medium">{COMPANY_DATA.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{COMPANY_DATA.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">{COMPANY_DATA.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{COMPANY_DATA.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Interested in working here?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  View all open positions and apply today
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  View All Jobs
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
