'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const jobOpenings = [
  {
    id: 1,
    title: "Frontend Dasturchi",
    department: "IT",
    location: "Toshkent",
    type: "To'liq stavka",
    experience: "2+ yil",
    salary: "5-8 mln so'm",
    description: "React, Next.js bilan ishlaydigan frontend dasturchi kerak."
  },
  {
    id: 2,
    title: "Backend Dasturchi",
    department: "IT",
    location: "Toshkent",
    type: "To'liq stavka",
    experience: "3+ yil",
    salary: "6-10 mln so'm",
    description: "Node.js, PostgreSQL bilan ishlaydigan backend dasturchi kerak."
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Mahsulot",
    location: "Toshkent",
    type: "To'liq stavka",
    experience: "3+ yil",
    salary: "7-12 mln so'm",
    description: "IT mahsulotlarini rivojlantirish bo'yicha menejer kerak."
  }
];

const benefits = [
  "Sog'liqni sug'urtalash",
  "Kasbiy rivojlanish",
  "Moslashuvchan ish grafigi",
  "Yillik bonuslar",
  "Jamoa tadbirlari"
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Karyera</h1>
          <p className="text-lg text-muted-foreground">
            Step.uz jamoasiga qo'shiling va birgalikda rivojlaning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Nima uchun Step.uz?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-6">
                Biz O'zbekiston yoshlari uchun eng yaxshi karyera imkoniyatlarini yaratamiz.
                Jamoamizga qo'shiling va millionlab yoshlarga ta'sir qiling!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">Ochiq vakansiyalar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {job.department}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{job.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Ariza topshirish
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
