'use client';

import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  BookOpen, 
  GraduationCap, 
  Target,
  Zap,
  Rocket,
  Code,
  Palette,
  BarChart3,
  Users,
  Globe,
  Award,
  Briefcase,
  Heart
} from 'lucide-react';

export default function SkillsPage() {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: Code,
      skills: [
        'JavaScript/TypeScript',
        'Python',
        'React & Next.js',
        'Node.js',
        'PostgreSQL',
        'AWS/GCP',
        'Docker & Kubernetes',
        'Git & CI/CD',
      ],
    },
    {
      title: 'Design Skills',
      icon: Palette,
      skills: [
        'UI/UX Design',
        'Figma',
        'Adobe Creative Suite',
        'Design Systems',
        'Prototyping',
        'User Research',
        'Wireframing',
        'Visual Design',
      ],
    },
    {
      title: 'Business Skills',
      icon: BarChart3,
      skills: [
        'Project Management',
        'Agile/Scrum',
        'Data Analysis',
        'Business Strategy',
        'Marketing',
        'Sales',
        'Customer Success',
        'Leadership',
      ],
    },
    {
      title: 'Soft Skills',
      icon: Users,
      skills: [
        'Communication',
        'Problem Solving',
        'Critical Thinking',
        'Teamwork',
        'Time Management',
        'Adaptability',
        'Creativity',
        'Emotional Intelligence',
      ],
    },
  ];

  const resources = [
    {
      title: 'Skill Assessment',
      description: 'Test your current skill level and identify areas for improvement',
      icon: Target,
    },
    {
      title: 'Learning Paths',
      description: 'Structured courses and tutorials to master new technologies',
      icon: BookOpen,
    },
    {
      title: 'Certifications',
      description: 'Industry-recognized certificates to validate your expertise',
      icon: Award,
    },
    {
      title: 'Practice Projects',
      description: 'Real-world projects to build your portfolio and gain experience',
      icon: Briefcase,
    },
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
            <h1 className="text-4xl font-bold mb-4">Ko&apos;nikmalar Markazi</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Karyerangizni rivojlantirish uchun zarur ko&apos;nikmalarni o&apos;rganing va sertifikatlang
            </p>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <resource.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border"
              >
                <div className="flex items-center mb-6">
                  <category.icon className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Bugun o&apos;rganishni boshlang!</h2>
            <p className="text-muted-foreground mb-8">
              Bepul akkaunt yarating va 1000+ dan ortiq kurslarga kirish imkoniyatiga ega bo&apos;ling
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
