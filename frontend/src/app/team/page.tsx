'use client';

import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, Award, Zap } from 'lucide-react';

export default function TeamPage() {
  const leadership = [
    {
      name: 'Otabek Abdurakhmonov',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 10+ years in EdTech and HR Tech. Previously founded successful startups in Central Asia.',
      image: '/team/ceo.jpg',
    },
    {
      name: 'Dilshod Rakhimov',
      role: 'CTO',
      bio: 'Tech veteran with experience at Google and Yandex. Expert in scalable systems and AI/ML applications.',
      image: '/team/cto.jpg',
    },
    {
      name: 'Nodira Karimova',
      role: 'Chief Product Officer',
      bio: 'Product leader with background at Microsoft and Spotify. Passionate about user-centered design.',
      image: '/team/cpo.jpg',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'People First',
      description: 'We believe in empowering every individual to reach their full potential.',
    },
    {
      icon: Target,
      title: 'Impact Driven',
      description: 'Every feature we build aims to make a real difference in peoples careers.',
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'We love what we do and it shows in the quality of our work.',
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'Connecting talent with opportunities across borders and cultures.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we build and deliver.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to create better solutions.',
    },
  ];

  const departments = [
    { name: 'Engineering', count: 25, description: 'Building the platform of the future' },
    { name: 'Product', count: 12, description: 'Designing intuitive user experiences' },
    { name: 'Sales', count: 18, description: 'Connecting companies with talent' },
    { name: 'Marketing', count: 10, description: 'Spreading the word about Step.uz' },
    { name: 'Customer Success', count: 15, description: 'Supporting our users 24/7' },
    { name: 'Data Science', count: 8, description: 'Powering AI-driven matching' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate people behind Step.uz who are dedicated to transforming careers
            </p>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Leadership</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg border text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <value.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Departments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Departments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {dept.count} people
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{dept.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
