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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 md:text-4xl text-foreground tracking-tight"
            >
              So'nggi ish e'lonlari
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Eng yaxshi kompaniyalardan yangi imkoniyatlar. Sizning karyerangiz shu yerdan boshlanadi.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Button variant="ghost" className="rounded-full text-primary font-semibold hover:bg-primary/5 group" asChild>
              <Link href="/jobs" className="flex items-center">
                Barcha ishlarni ko'rish
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full border border-border bg-card hover:border-primary/30 transition-all shadow-sm hover:shadow-md flex flex-col rounded-xl overflow-hidden group">
                <CardHeader className="p-6 pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center border border-border text-primary font-bold text-xl group-hover:scale-105 transition-transform">
                      {job.company[0]}
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold rounded-md">
                      {jobTypeLabels[job.type]}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                    <Building2 size={14} className="text-primary/60" /> {job.company}
                  </p>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex-1">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <MapPin size={14} className="text-muted-foreground/60" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-foreground gap-2">
                      <Briefcase size={14} className="text-primary/60" />
                      <span>{job.salary} {job.currency}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[10px] font-medium border-border/50 text-muted-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button variant="outline" className="w-full rounded-lg h-10 text-sm font-semibold border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all" asChild>
                    <Link href={`/jobs/${job.id}`}>Batafsil</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
