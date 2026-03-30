'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: 'Sardor Mukhtorov',
      role: 'Software Engineer',
      company: 'Google',
      content: 'SINERGIYA orqali Google kompaniyasiga ishga kirdim. Platformada karyera markazi va rezyume yordamchisi juda foydali boldi.',
      image: '/testimonials/1.jpg',
    },
    {
      id: 2,
      name: 'Dilshoda Karimova',
      role: 'Product Manager',
      company: 'EPAM Systems',
      content: 'SINERGIYA tarkibida top kompaniyalar va yaxshi imkoniyatlar bor. Ishga kirish jarayonida toliq qollab-quvvatlash oldim.',
      image: '/testimonials/2.jpg',
    },
    {
      id: 3,
      name: 'Jasur Rahimov',
      role: 'UX Designer',
      company: 'Alif Bank',
      content: 'Platforma orqali oz kasbiy rivojlanishimda katta qadam qoydim. Mentorlik dasturi ayniqsa foydali boldi.',
      image: '/testimonials/3.jpg',
    },
  ];

  const stats = [
    { icon: Users, label: 'Active Users', value: '50,000+' },
    { icon: Building2, label: 'Partner Companies', value: '1,200+' },
    { icon: TrendingUp, label: 'Job Placements', value: '8,500+' },
    { icon: Award, label: 'Success Rate', value: '78%' },
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
            <h1 className="text-4xl font-bold mb-4">Mijozlarimiz Fikrlari</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              SINERGIYA platformasi yordamida minglab talabalar orzularidagi ishni topdi
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border"
              >
                <p className="text-lg mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
