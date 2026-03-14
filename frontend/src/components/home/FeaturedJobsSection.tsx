'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// =============================================
// Mock Data
// =============================================

const featuredJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechPark',
    location: 'Toshkent',
    type: 'FULL_TIME',
    salary: '15,000,000 - 25,000,000',
    currency: 'UZS',
    skills: ['React', 'TypeScript', 'Next.js'],
    postedAt: '2 kun oldin',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Uzum',
    location: 'Toshkent',
    type: 'FULL_TIME',
    salary: '12,000,000 - 20,000,000',
    currency: 'UZS',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    postedAt: '1 kun oldin',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Yandex',
    location: 'Toshkent',
    type: 'FULL_TIME',
    salary: '10,000,000 - 18,000,000',
    currency: 'UZS',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    postedAt: '3 kun oldin',
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'Kapital Bank',
    location: 'Toshkent',
    type: 'INTERNSHIP',
    salary: '3,000,000 - 5,000,000',
    currency: 'UZS',
    skills: ['Social Media', 'Content Creation'],
    postedAt: 'Bugun',
  },
];

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: 'To\'liq stavka',
  PART_TIME: 'Yarim stavka',
  INTERNSHIP: 'Stajirovka',
  REMOTE: 'Masofaviy',
  CONTRACT: 'Shartnoma',
};

// =============================================
// Featured Jobs Section
// =============================================

export function FeaturedJobsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-2"
            >
              So'nggi ish e'lonlari
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Eng yaxshi kompaniyalardan yangi imkoniyatlar
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" asChild>
              <Link href="/jobs">
                Barchasini ko'rish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateX: -6, rotateY: 6, translateY: -10 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link href={`/jobs/${job.id}`}>
                <Card className="h-full cursor-pointer border border-emerald-100/60 bg-card/90 shadow-sm transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                          {job.company[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{job.company}</p>
                          <p className="text-xs text-muted-foreground">{job.postedAt}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <h3 className="font-semibold mb-2 line-clamp-1">{job.title}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{jobTypeLabels[job.type]}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 border-t">
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {job.salary} {job.currency}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
