'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Share2, Globe, MapPin, Users, Calendar,
  Briefcase, Check, ExternalLink, Mail, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Company, Job } from '@/types';

// =============================================
// Mock Data
// =============================================

const mockCompany: Company = {
  id: '1',
  userId: '1',
  name: 'TechPark',
  logo: undefined,
  coverImage: undefined,
  description: 'TechPark - O\'zbekistondagi eng yirik IT kompaniyalardan biri. Biz zamonaviy texnologiyalar yordamida innovatsion yechimlar yaratamiz. 2015 yildan beri faoliyat yuritamiz va 500 dan ortiq loyihalarni amalga oshirdik.',
  website: 'https://techpark.uz',
  email: 'hr@techpark.uz',
  phone: '+998 71 123 45 67',
  city: 'Toshkent',
  address: 'Amir Temur shoh ko\'chasi, 107B',
  industry: 'IT',
  companySize: '201-500',
  foundedYear: 2015,
  benefits: [
    'Rasmiy ishga joylashish',
    'Sog\'liqni saqlash sug\'urtasi',
    'Yillik ta\'til 24 kun',
    'Professional o\'sish imkoniyatlari',
    'Zamonaviy ofis',
    'Bepul kofe va choy',
    'Sport zal a\'zoligi',
    'O\'quv kurslari va konferensiyalar',
  ],
  technologies: ['React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes'],
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer...',
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    salaryMin: 15000000,
    salaryMax: 25000000,
    currency: 'UZS',
    location: 'Toshkent',
    status: 'ACTIVE',
    skills: ['React', 'TypeScript', 'Next.js'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    companyId: '1',
    title: 'Backend Developer',
    description: 'Join our backend team...',
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 12000000,
    salaryMax: 20000000,
    currency: 'UZS',
    location: 'Toshkent',
    status: 'ACTIVE',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    companyId: '1',
    title: 'DevOps Engineer',
    description: 'DevOps engineer needed...',
    jobType: 'FULL_TIME',
    experienceLevel: 'MIDDLE',
    salaryMin: 14000000,
    salaryMax: 22000000,
    currency: 'UZS',
    location: 'Toshkent',
    isRemote: true,
    status: 'ACTIVE',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// =============================================
// Constants
// =============================================

const companySizeLabels: Record<string, string> = {
  '1-10': '1-10 xodim',
  '11-50': '11-50 xodim',
  '51-200': '51-200 xodim',
  '201-500': '201-500 xodim',
  '501-1000': '501-1000 xodim',
  '1000+': '1000+ xodim',
};

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: 'To\'liq stavka',
  PART_TIME: 'Yarim stavka',
  INTERNSHIP: 'Stajirovka',
  REMOTE: 'Masofaviy',
  CONTRACT: 'Shartnoma',
};

// =============================================
// Helper Functions
// =============================================

const formatSalary = (min?: number, max?: number, currency?: string) => {
  if (!min && !max) return 'Kelishilgan';
  const format = (n: number) => n.toLocaleString('uz-UZ');
  const curr = currency === 'USD' ? '$' : 'so\'m';
  if (min && max) return `${format(min)} - ${format(max)} ${curr}`;
  if (min) return `dan ${format(min)} ${curr}`;
  return `gacha ${format(max!)} ${curr}`;
};

const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Bugun';
  if (diffDays === 1) return 'Kecha';
  if (diffDays < 7) return `${diffDays} kun oldin`;
  return `${Math.floor(diffDays / 7)} hafta oldin`;
};

// =============================================
// Job Card Component
// =============================================

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover:shadow-md transition-all cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{jobTypeLabels[job.jobType]}</span>
                {job.isRemote && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">Masofaviy</Badge>
                  </>
                )}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{getTimeAgo(job.createdAt)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {job.skills?.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <span className="text-sm font-medium text-emerald-600">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// =============================================
// Main Company Detail Page
// =============================================

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  const company = mockCompany;
  const jobs = mockJobs;

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/companies"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Orqaga
        </Link>
      </div>

      {/* Cover & Header */}
      <div className="bg-gradient-to-b from-cyan-50 via-blue-50 to-background dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-background">
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start gap-6"
          >
            {/* Logo */}
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-lg">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="h-full w-full rounded-2xl object-cover" />
              ) : (
                company.name[0]
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{company.name}</h1>
                {company.isVerified && (
                  <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{companySizeLabels[company.companySize || '1-10']}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.city}</span>
                </div>
                {company.foundedYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{company.foundedYear} yildan</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Bog'lanish
                </Button>
                {company.website && (
                  <Button variant="outline" asChild>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Saytga o'tish
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Kompaniya haqida</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {company.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technologies */}
            {company.technologies && company.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card>
                  <CardHeader>
                  <CardTitle>Texnologiyalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            )}

            {/* Open Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Ochiq vakansiyalar</CardTitle>
                    <Badge variant="secondary">{jobs.length} ta</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Hozircha ochiq vakansiyalar yo&apos;q
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            {company.benefits && company.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="lg:sticky lg:top-24"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Imtiyozlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {company.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Aloqa ma&apos;lumotlari</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Manzil</p>
                        <p className="text-sm text-muted-foreground">{company.address}</p>
                      </div>
                    </div>
                  )}
                  {company.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Telefon</p>
                        <a href={`tel:${company.phone}`} className="text-sm text-cyan-600 hover:underline">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a href={`mailto:${company.email}`} className="text-sm text-cyan-600 hover:underline">
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Sayt</p>
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-600 hover:underline"
                        >
                          {company.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
