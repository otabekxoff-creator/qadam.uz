"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  Building2, 
  Sparkles, 
  ArrowRight,
  Search,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Globe,
  GraduationCap,
  HeartHandshake,
  Code,
  Palette,
  Database,
  LineChart,
  Quote,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import { useState, useEffect } from "react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Testimonial card component
function TestimonialCard({ quote, author, role, company }: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Quote className="w-8 h-8 text-primary/30 mb-4" />
      <p className="text-muted-foreground mb-6 italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Job category card
function CategoryCard({ icon: Icon, title, count, color }: { 
  icon: any; 
  title: string; 
  count: number; 
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer group`}
    >
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{count.toLocaleString()} open positions</p>
    </motion.div>
  );
}

// Feature card with icon
function FeatureCard({ icon: Icon, title, description, color }: { 
  icon: any; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Job listing card
function JobCard({ title, company, location, salary, type, postedAt, logo, tags }: {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  logo: string;
  tags: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
          {logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors truncate">{title}</h3>
          <p className="text-muted-foreground mb-3">{company}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {salary}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {postedAt}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const stats = [
    { value: 15000, suffix: '+', label: 'Active Jobs', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { value: 8500, suffix: '+', label: 'Companies', icon: Building2, color: 'from-green-500 to-green-600' },
    { value: 50000, suffix: '+', label: 'Job Seekers', icon: Users, color: 'from-purple-500 to-purple-600' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const categories = [
    { icon: Code, title: 'Software Development', count: 3240, color: 'bg-blue-500' },
    { icon: Palette, title: 'Design & Creative', count: 1850, color: 'bg-purple-500' },
    { icon: Database, title: 'Data Science', count: 920, color: 'bg-green-500' },
    { icon: LineChart, title: 'Marketing', count: 1450, color: 'bg-orange-500' },
    { icon: Shield, title: 'Cybersecurity', count: 680, color: 'bg-red-500' },
    { icon: Activity, title: 'Healthcare', count: 2100, color: 'bg-teal-500' },
    { icon: GraduationCap, title: 'Education', count: 1680, color: 'bg-indigo-500' },
    { icon: Briefcase, title: 'Business', count: 2340, color: 'bg-pink-500' },
  ];

  const features = [
    { 
      icon: Sparkles, 
      title: 'AI-Powered Matching', 
      description: 'Our intelligent algorithm matches you with the perfect jobs based on your skills and preferences.',
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    { 
      icon: Zap, 
      title: 'One-Click Apply', 
      description: 'Apply to multiple jobs instantly with your saved profile and resume.',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    { 
      icon: Shield, 
      title: 'Verified Companies', 
      description: 'All employers are thoroughly vetted to ensure safe and legitimate opportunities.',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    { 
      icon: Globe, 
      title: 'Remote Opportunities', 
      description: 'Access thousands of remote jobs from companies around the world.',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    { 
      icon: Target, 
      title: 'Career Analytics', 
      description: 'Track your applications, profile views, and get insights to improve your job search.',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600'
    },
    { 
      icon: HeartHandshake, 
      title: 'Direct Messaging', 
      description: 'Connect directly with recruiters and hiring managers through our built-in chat.',
      color: 'bg-gradient-to-br from-teal-500 to-cyan-600'
    },
  ];

  const jobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Tashkent',
      salary: '$3,000 - $5,000',
      type: 'Full-time',
      postedAt: '2 days ago',
      logo: 'T',
      tags: ['React', 'TypeScript', 'Next.js']
    },
    {
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$4,000 - $6,000',
      type: 'Full-time',
      postedAt: '3 days ago',
      logo: 'S',
      tags: ['Product', 'Agile', 'Analytics']
    },
    {
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'Samarkand',
      salary: '$2,500 - $4,000',
      type: 'Full-time',
      postedAt: '1 week ago',
      logo: 'D',
      tags: ['Figma', 'UI/UX', 'Prototyping']
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Remote',
      salary: '$4,500 - $7,000',
      type: 'Full-time',
      postedAt: '5 days ago',
      logo: 'C',
      tags: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      title: 'Data Scientist',
      company: 'DataCorp',
      location: 'Tashkent',
      salary: '$3,500 - $6,000',
      type: 'Full-time',
      postedAt: '4 days ago',
      logo: 'DC',
      tags: ['Python', 'ML', 'SQL']
    },
    {
      title: 'Mobile Developer',
      company: 'AppWorks',
      location: 'Bukhara',
      salary: '$2,800 - $4,500',
      type: 'Full-time',
      postedAt: '1 day ago',
      logo: 'A',
      tags: ['React Native', 'iOS', 'Android']
    },
  ];

  const testimonials = [
    {
      quote: "Step.uz helped me land my dream job at a top tech company within just 3 weeks. The AI matching feature is incredibly accurate!",
      author: "Sarah Johnson",
      role: "Senior Developer",
      company: "Google"
    },
    {
      quote: "As an employer, we've found amazing talent through this platform. The quality of candidates is consistently high.",
      author: "Michael Chen",
      role: "HR Director",
      company: "TechCorp"
    },
    {
      quote: "The career resources and interview preparation tools helped me transition from a junior to a senior role. Highly recommended!",
      author: "David Kim",
      role: "Product Manager",
      company: "StartupXYZ"
    },
    {
      quote: "I love how easy it is to apply with just one click. The platform saves me so much time in my job search.",
      author: "Emily Davis",
      role: "UX Designer",
      company: "DesignStudio"
    },
    {
      quote: "The salary insights and company reviews helped me negotiate a better offer. Transparency is key!",
      author: "James Wilson",
      role: "Data Scientist",
      company: "DataCorp"
    },
    {
      quote: "Found a remote job that perfectly matches my skills and lifestyle. Couldn't be happier with the experience.",
      author: "Lisa Anderson",
      role: "Frontend Developer",
      company: "CloudTech"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Step.uz
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/jobs/search" className="text-muted-foreground hover:text-foreground transition-colors">Find Jobs</Link>
            <Link href="/companies" className="text-muted-foreground hover:text-foreground transition-colors">Companies</Link>
            <Link href="/salary-calculator" className="text-muted-foreground hover:text-foreground transition-colors">Salaries</Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Kirish</Button>
            </Link>
            <Link href="/register">
              <Button>Ro&apos;yxatdan o&apos;tish</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Sparkles size={16} />
              <span className="text-sm font-medium">O&apos;zbekiston yoshlari uchun #1 ish topish platformasi</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              Karyerangizni<br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Biz Bilan Boshlang
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              50,000+ dan ortiq ish o&apos;rinlari, 8,500+ kompaniyalar va sun&apos;iy intellekt asosida ish topish. 
              Orzuingizdagi ishni bugun toping!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-card border rounded-2xl shadow-lg">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Ish nomi, kalit so'z yoki kompaniya"
                    className="flex-1 py-3 bg-transparent outline-none"
                  />
                </div>
                <div className="hidden md:block w-px bg-border" />
                <div className="flex-1 flex items-center gap-3 px-4">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Joylashuv"
                    className="flex-1 py-3 bg-transparent outline-none"
                  />
                </div>
                <Button size="lg" className="px-8 rounded-xl">
                  <Search className="w-5 h-5 mr-2" />
                  Qidirish
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Tez ro&apos;yxatdan o&apos;tish
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Bir zumda ishga ariza yuborish
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Bepul xizmat
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Ommabop Kategoriyalar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              O&apos;zingizga mos sohani tanlang va orzuingizdagi ishni toping
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Songi Ish O&apos;rinlari</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Eng yangi va mashhur ish o&apos;rinlari bir joyda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Barcha Ishlarni Ko&apos;rish
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nima Uchun Step.uz?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Biz sizga eng yaxshi ish qidirish tajribasini taqdim etish uchun ishlab chiqilgan xususiyatlar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Foydalanuvchilarimiz Nima Deydi?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bizning platformamiz orqali ish topgan minglab odamlar bilan tanishing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="container mx-auto max-w-4xl relative text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bugun Orzuingizdagi Ishni Toping!
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              50,000+ dan ortiq ish o&apos;rinlari sizni kutmoqda. Bepul ro&apos;yxatdan o&apos;ting va karerangizni boshlang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary font-semibold px-8">
                Bepul Boshlash
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
                Ish Reklama Qilish
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block mb-4">
                Step.uz
              </Link>
              <p className="text-muted-foreground mb-4 max-w-xs">
                O&apos;zbekiston yoshlari uchun eng yaxshi ish topish platformasi. 
                2024-yildan beri xizmatdamiz.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ish Qidiruvchi</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/jobs/search" className="hover:text-primary transition-colors">Ish Qidirish</Link></li>
                <li><Link href="/companies" className="hover:text-primary transition-colors">Kompaniyalar</Link></li>
                <li><Link href="/salary-calculator" className="hover:text-primary transition-colors">Maosh Hisoblagichi</Link></li>
                <li><Link href="/career-resources" className="hover:text-primary transition-colors">Karyera Resurslari</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ish Beruvchi</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/post-job" className="hover:text-primary transition-colors">Ish E&apos;lon Qilish</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Narxlar</Link></li>
                <li><Link href="/solutions" className="hover:text-primary transition-colors">Yechimlar</Link></li>
                <li><Link href="/enterprise" className="hover:text-primary transition-colors">Korxona</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kompaniya</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">Biz Haqimizda</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Aloqa</Link></li>
                <li><Link href="/help" className="hover:text-primary transition-colors">Yordam</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Step.uz. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Maxfiylik Siyosati</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Foydalanish Shartlari</Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Siyosati</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
