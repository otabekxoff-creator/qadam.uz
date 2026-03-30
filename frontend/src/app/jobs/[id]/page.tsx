'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  Filter,
  Bookmark,
  Share2,
  Building2,
  Calendar,
  Users,
  Star,
  ArrowRight,
  ChevronDown,
  Globe,
  GraduationCap,
  Award,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================================================
// Job Data
// ============================================================================

const JOB_DETAILS = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: {
    name: 'Tech Solutions Uzbekistan',
    logo: '/companies/tech-solutions.png',
    description: 'Leading software development company in Central Asia with 200+ employees.',
    website: 'https://techsolutions.uz',
    industry: 'Information Technology',
    size: '201-500 employees',
    founded: '2015',
    location: 'Tashkent, Uzbekistan',
    isVerified: true,
    rating: 4.8,
    reviews: 127,
  },
  location: 'Tashkent, Mirzo-Ulugbek district',
  type: 'Full-time',
  experience: '3-5 years',
  salary: {
    min: 8000000,
    max: 15000000,
    currency: 'UZS',
    period: 'month',
  },
  postedAt: '2026-03-28',
  expiresAt: '2026-04-28',
  views: 1247,
  applications: 23,
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'],
  description: `We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building and maintaining modern web applications using React and Next.js.

The ideal candidate should have a strong understanding of JavaScript/TypeScript, experience with modern frontend frameworks, and a passion for creating great user experiences.`,
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    '3-5 years of experience in frontend development',
    'Strong proficiency in React.js and Next.js',
    'Experience with TypeScript',
    'Knowledge of modern CSS frameworks (Tailwind, Styled Components)',
    'Understanding of REST APIs and GraphQL',
    'Experience with version control systems (Git)',
    'Good problem-solving skills',
  ],
  responsibilities: [
    'Develop and maintain frontend applications using React and Next.js',
    'Collaborate with designers to implement UI/UX designs',
    'Write clean, maintainable, and efficient code',
    'Optimize applications for maximum speed and scalability',
    'Participate in code reviews and team meetings',
    'Mentor junior developers',
    'Stay up-to-date with emerging technologies',
  ],
  benefits: [
    'Competitive salary (8-15 million UZS)',
    'Health insurance',
    'Remote work options (hybrid)',
    'Professional development budget',
    'Modern office in city center',
    'Free lunches',
    'Team building activities',
    'Flexible working hours',
  ],
  workingConditions: {
    schedule: 'Monday-Friday, 9:00-18:00',
    remote: 'Hybrid (3 days office, 2 days remote)',
    probation: '3 months',
    vacation: '24 days paid vacation',
  },
};

const SIMILAR_JOBS = [
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'Tashkent',
    salary: '6,000,000 - 10,000,000 UZS',
    type: 'Full-time',
    postedAt: '2 days ago',
  },
  {
    id: '3',
    title: 'React Developer',
    company: 'Startup Hub',
    location: 'Remote',
    salary: '$1,500 - $2,500',
    type: 'Full-time',
    postedAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Global Tech',
    location: 'Tashkent',
    salary: '10,000,000 - 18,000,000 UZS',
    type: 'Full-time',
    postedAt: '3 days ago',
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

export default function JobDetailPage() {
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Bosh sahifa</Link>
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            <Link href="/jobs" className="hover:text-blue-600">Ishlar</Link>
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            <span className="text-gray-900">{JOB_DETAILS.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 lg:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {JOB_DETAILS.title}
                    </h1>
                    {JOB_DETAILS.company.isVerified && (
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Tasdiqlangan
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <Link href={`/companies/${JOB_DETAILS.company.name}`} className="flex items-center gap-1 hover:text-blue-600">
                      <Building2 className="w-4 h-4" />
                      {JOB_DETAILS.company.name}
                    </Link>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {JOB_DETAILS.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {JOB_DETAILS.postedAt}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <DollarSign className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-sm text-gray-500">Maosh</p>
                  <p className="font-semibold text-gray-900">
                    {formatSalary(JOB_DETAILS.salary.min)} - {formatSalary(JOB_DETAILS.salary.max)} UZS
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <Briefcase className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-sm text-gray-500">Tajriba</p>
                  <p className="font-semibold text-gray-900">{JOB_DETAILS.experience}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <Clock className="w-5 h-5 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-500">Ish grafigi</p>
                  <p className="font-semibold text-gray-900">{JOB_DETAILS.type}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <Users className="w-5 h-5 text-orange-600 mb-2" />
                  <p className="text-sm text-gray-500">Arizalar</p>
                  <p className="font-semibold text-gray-900">{JOB_DETAILS.applications} ta</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {JOB_DETAILS.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6 lg:p-8"
            >
              <Tabs defaultValue="description">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Tavsif</TabsTrigger>
                  <TabsTrigger value="requirements">Talablar</TabsTrigger>
                  <TabsTrigger value="company">Kompaniya</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ish tavsifi</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {JOB_DETAILS.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Vazifalar</h3>
                    <ul className="space-y-2">
                      {JOB_DETAILS.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ish sharoitlari</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-500">Ish grafigi</p>
                        <p className="font-medium text-gray-900">{JOB_DETAILS.workingConditions.schedule}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-500">Masofaviy ish</p>
                        <p className="font-medium text-gray-900">{JOB_DETAILS.workingConditions.remote}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-500">Sinov muddati</p>
                        <p className="font-medium text-gray-900">{JOB_DETAILS.workingConditions.probation}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-500">Ta'til</p>
                        <p className="font-medium text-gray-900">{JOB_DETAILS.workingConditions.vacation}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Talablar</h3>
                    <ul className="space-y-2">
                      {JOB_DETAILS.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ko'nikmalar</h3>
                    <div className="flex flex-wrap gap-2">
                      {JOB_DETAILS.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="company" className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                        {JOB_DETAILS.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{JOB_DETAILS.company.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {JOB_DETAILS.company.rating} ({JOB_DETAILS.company.reviews} sharhlar)
                        </span>
                        <Badge variant="secondary">{JOB_DETAILS.company.industry}</Badge>
                      </div>
                      <p className="text-gray-600 mt-4">{JOB_DETAILS.company.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-gray-500">Kompaniya hajmi</p>
                      <p className="font-medium text-gray-900">{JOB_DETAILS.company.size}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-gray-500">Tashkil etilgan</p>
                      <p className="font-medium text-gray-900">{JOB_DETAILS.company.founded}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-gray-500">Joylashuv</p>
                      <p className="font-medium text-gray-900">{JOB_DETAILS.company.location}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-gray-500">Vebsayt</p>
                      <a href={JOB_DETAILS.company.website} className="font-medium text-blue-600 hover:underline">
                        {JOB_DETAILS.company.website}
                      </a>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Kompaniya haqida batafsil
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 lg:p-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Taklif etilgan imkoniyatlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {JOB_DETAILS.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Similar Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6 lg:p-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">O'xshash ish o'rinlari</h3>
              <div className="space-y-4">
                {SIMILAR_JOBS.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`}>
                    <Card className="border-0 shadow-none hover:bg-slate-50 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                          <p className="text-sm font-medium text-green-600 mt-1">{job.salary}</p>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Apply */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Ariza topshirish
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    {JOB_DETAILS.applications} kishi allaqachon ariza topshirdi
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Ish e'lonini ulashing</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Telegram
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1">
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Rezyumeni yangilandingizmi?</h4>
                  <p className="text-sm text-blue-100 mb-4">
                    Yangilangan rezyume bilan arizalar 40% ko'proq e'tibor oladi
                  </p>
                  <Button variant="secondary" className="w-full">
                    Profilni ko'rish
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
