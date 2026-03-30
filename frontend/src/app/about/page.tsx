"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Heart, 
  Target, 
  Lightbulb, 
  Shield, 
  Zap,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Star,
  Rocket,
  Eye,
  Handshake,
  GraduationCap,
  Building2,
  Clock,
  Phone,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Quote
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Timeline data
const timeline = [
  {
    year: "2020",
    title: "Platform Launch",
    description: "Step.uz platformasi ishga tushdi va ilk foydalanuvchilarimizni qabul qila boshladi.",
    icon: Rocket,
    milestone: "1,000 foydalanuvchi"
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Sun'iy intellekt asosida ish matching tizimi joriy etildi va natijalar 3 barobar yaxshilandi.",
    icon: Zap,
    milestone: "10,000+ moslashtirish"
  },
  {
    year: "2022",
    title: "Mobile App Launch",
    description: "iOS va Android ilovalarimiz ishga tushdi, foydalanuvchilarimiz soni keskin oshdi.",
    icon: Target,
    milestone: "50,000 yuklab olish"
  },
  {
    year: "2023",
    title: "Enterprise Solutions",
    description: "Katta kompaniyalar uchun maxsus yechimlar ishlab chiqildi va 500+ kompaniya a'zo bo'ldi.",
    icon: Building2,
    milestone: "500+ korporativ mijoz"
  },
  {
    year: "2024",
    title: "International Expansion",
    description: "Markaziy Osiyo davlatlariga xizmat ko'rsatishni boshladik va yangi ofislar ochdik.",
    icon: Globe,
    milestone: "5 davlat"
  }
];

// Extended team data
const leadershipTeam = [
  { 
    name: "Bekzod Khamidov", 
    role: "Founder & CEO", 
    bio: "Harvard Business School bitiruvchisi. 10+ yillik texnologiya va startup tajribasi.",
    image: "/team/bekzod.jpg",
    socials: { linkedin: "#", twitter: "#" }
  },
  { 
    name: "Dilnoza Rakhimova", 
    role: "Chief Product Officer", 
    bio: "Stanford Universiteti. Oldin Google va Meta kompaniyalarida ishlagan.",
    image: "/team/dilnoza.jpg",
    socials: { linkedin: "#", twitter: "#" }
  },
  { 
    name: "Jasur Toshmatov", 
    role: "Chief Technology Officer", 
    bio: "MIT bitiruvchisi. 15+ yillik dasturiy ta'minot ishlab chiqish tajribasi.",
    image: "/team/jasur.jpg",
    socials: { linkedin: "#", github: "#" }
  },
  { 
    name: "Alisher Karimov", 
    role: "Chief Operating Officer", 
    bio: "INSEAD MBA. Operations va biznes rivojlantirish bo'yicha mutaxassis.",
    image: "/team/alisher.jpg",
    socials: { linkedin: "#", twitter: "#" }
  },
];

const engineeringTeam = [
  { name: "Sardor Aliyev", role: "Lead Frontend Engineer", image: "/team/sardor.jpg" },
  { name: "Nodira Ismoilova", role: "Senior Backend Engineer", image: "/team/nodira.jpg" },
  { name: "Komil Rakhimov", role: "DevOps Engineer", image: "/team/komil.jpg" },
  { name: "Sevara Khamidova", role: "UI/UX Designer", image: "/team/sevara.jpg" },
  { name: "Timur Karimov", role: "Mobile Developer", image: "/team/timur.jpg" },
  { name: "Malika Toshpulatova", role: "QA Engineer", image: "/team/malika.jpg" },
];

// Office locations
const offices = [
  {
    city: "Toshkent",
    country: "O'zbekiston",
    address: "Amir Temur shoh ko'chasi, 100A",
    phone: "+998 71 123 4567",
    employees: "45 ishchi",
    isHeadquarters: true
  },
  {
    city: "Samarqand",
    country: "O'zbekiston",
    address: "Registon maydoni, 15",
    phone: "+998 66 234 5678",
    employees: "12 ishchi",
    isHeadquarters: false
  },
  {
    city: "Almaty",
    country: "Qozog'iston",
    address: "Nazarbaev prospekti, 50",
    phone: "+7 727 345 6789",
    employees: "18 ishchi",
    isHeadquarters: false
  },
  {
    city: "Bishkek",
    country: "Qirg'iziston",
    address: "Manas prospekti, 25",
    phone: "+996 312 456 789",
    employees: "8 ishchi",
    isHeadquarters: false
  }
];

// Awards and recognition
const awards = [
  { year: "2024", title: "Best HR Tech Platform", organization: "Tech Awards Central Asia" },
  { year: "2024", title: "Top 10 Startups", organization: "Forbes Uzbekistan" },
  { year: "2023", title: "Innovation Award", organization: "Silk Road Tech Summit" },
  { year: "2023", title: "Best UX Design", organization: "Central Asian Design Awards" },
  { year: "2022", title: "Rising Star", organization: "Startup Competition Uzbekistan" },
];

// Testimonials
const testimonials = [
  {
    quote: "Step.uz platformasi bizning kompaniyamizga ajoyib mutaxassislarni topishga yordam berdi. HR jarayonlarimiz 60% tezlashtirildi.",
    author: "Aziz Yusupov",
    role: "HR Director",
    company: "UzbekTech Solutions",
    image: "/testimonials/aziz.jpg"
  },
  {
    quote: "Talaba sifatida bu platforma menga o'z soham bo'yicha ideal ish topishga yordam berdi. AI tavsiyalari juda aniq va foydali.",
    author: "Nilufar Rahimova",
    role: "Software Engineering Student",
    company: "TUIT",
    image: "/testimonials/nilufar.jpg"
  },
  {
    quote: "Platformaning foydalanish osonligi va professional dizayni menga juda yoqdi. Barcha funksiyalar intuitiv va samarali.",
    author: "Rustam Karimov",
    role: "Product Manager",
    company: "Digital Uzbekistan",
    image: "/testimonials/rustam.jpg"
  }
];

// Core values extended
const coreValues = [
  {
    icon: Heart,
    title: "Inson Markazlilik",
    description: "Har bir foydalanuvchimizning muvaffaqiyati bizning muvaffaqiyatimizdir. Insonlar birinchi o'rinda.",
    color: "from-red-500 to-pink-600"
  },
  {
    icon: Globe,
    title: "Global Ko'nikmalar",
    description: "Dunyo standartlariga mos platforma. LinkedIn, Indeed darajasidagi xizmatlar.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Award,
    title: "Sifat Kafolati",
    description: "Faqat tekshirilgan kompaniyalar va real ish o'rinlari. Sifat - bizning tamoyilimiz.",
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: Lightbulb,
    title: "Innovatsiya",
    description: "Sun'iy intellekt va zamonaviy texnologiyalar orqali eng yaxshi natijalar.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Shield,
    title: "Ishonch va Xavfsizlik",
    description: "Ma'lumotlaringiz xavfsizligi bizning ustuvor vazifamiz. Maxfiylik kafolati.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Handshake,
    title: "Hamkorlik",
    description: "Kompaniyalar, talabalar va o'quv muassasalari bilan mustahkam hamkorlik.",
    color: "from-teal-500 to-cyan-600"
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("leadership");

  const stats = [
    { icon: Users, value: "50,000+", label: "Foydalanuvchilar", sublabel: "10,000+ faol ish qidiruvchilar" },
    { icon: Building2, value: "8,500+", label: "Kompaniyalar", sublabel: "500+ korporativ mijozlar" },
    { icon: Briefcase, value: "15,000+", label: "Ish O'rinlari", sublabel: "Har kuni 200+ yangi vakansiya" },
    { icon: TrendingUp, value: "95%", label: "Muvaffaqiyat", sublabel: "O'rtacha ish topish tezligi: 2 hafta" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Since 2020</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Biz <span className="text-primary">Kelajakni</span><br />
              Quramiz
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Step.uz - O'zbekiston va Markaziy Osiyoning eng zamonaviy karyera platformasi. 
              Bizning maqsadimiz - har bir yoshning orzulariga erishishiga yordam berish va 
              mamlakatimizning rivojlanishiga hissa qo'shish.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/careers">
                <Button size="lg" className="gap-2">
                  Bizga Qo'shiling <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Bog'lanish
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <Target className="w-4 h-4" />
                Vazifamiz
              </div>
              <h2 className="text-4xl font-bold mb-6">O'zbekiston Yoshlari uchun Imkoniyatlar Eshigini Ochish</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Biz O'zbekiston yoshlarining karyera rivojlanishini qo'llab-quvvatlash, ularga dunyo 
                miqyosidagi imkoniyatlarni taqdim etish va mamlakatimizning kelajagini yaratishda 
                ularning salohiyatini to'liq ochib berishni maqsad qilganmiz.
              </p>
              <ul className="space-y-3">
                {[
                  "50,000+ ish qidiruvchiga ish topishda yordam berdik",
                  "500+ kompaniya a'zoligi bilan hamkorlik qilamiz",
                  "AI texnologiyasi bilan moslashuvchanlikni oshirdik"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border">
                  <Eye className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Ko'z-ko'zimiz</h3>
                  <p className="text-sm text-muted-foreground">Markaziy Osiyoning #1 ish topish platformasi bo'lish</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border">
                  <Heart className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">Qadriyatlarimiz</h3>
                  <p className="text-sm text-muted-foreground">Insonlar birinchi o'rinda, sifat va innovatsiya</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border">
                  <Rocket className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="font-semibold mb-2">O'sish</h3>
                  <p className="text-sm text-muted-foreground">Har yili 100% o'sish va yangi bozorlarga chiqish</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border">
                  <GraduationCap className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="font-semibold mb-2">Ta'lim</h3>
                  <p className="text-sm text-muted-foreground">Yosh mutaxassislarni ta'lim va mentorlik orqali qo'llab-quvvatlash</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Qadriyatlarimiz</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Biz har kuni o'z ishimizda qo'llaydigan asosiy tamoyillar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Bizning Yo'l</h2>
            <p className="text-muted-foreground text-lg">
              2020-yildan beri qilgan sayohatimiz
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-px" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-8 md:left-1/2 md:-ml-5">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg z-10 relative">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="ml-20 md:ml-0 md:w-1/2">
                  <Card className={`hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {item.milestone}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Bizning Jamoa</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              50+ nafar professional mutaxassislar jamoasi sizga xizmat ko'rsatadi
            </p>
            
            <div className="flex justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveTab("leadership")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === "leadership"
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Rahbariyat
              </button>
              <button
                onClick={() => setActiveTab("engineering")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === "engineering"
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Dasturchilar
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "leadership"
              ? leadershipTeam.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center overflow-hidden group hover:shadow-xl transition-shadow">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                        <Users className="w-16 h-16 text-primary/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                        <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                        <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                        <div className="flex justify-center gap-2">
                          {member.socials.linkedin && (
                            <a href={member.socials.linkedin} className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.socials.twitter && (
                            <a href={member.socials.twitter} className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                          {member.socials.github && (
                            <a href={member.socials.github} className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              : engineeringTeam.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Users className="w-12 h-12 text-primary/40" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Bizning Ofislar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              O'zbekiston va Markaziy Osiyoning turli shaharlarida ofislarimiz faoliyat yuritadi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-shadow ${office.isHeadquarters ? 'border-primary' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{office.city}</h3>
                        <p className="text-muted-foreground">{office.country}</p>
                      </div>
                      {office.isHeadquarters && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Bosh ofis
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {office.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {office.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {office.employees}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Yutuqlarimiz</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bizning ishimiz e'tirof etildi va ko'plab mukofotlarga sazovor bo'ldi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
                  <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                  <p className="font-bold text-lg mb-1">{award.year}</p>
                  <p className="font-medium text-sm mb-1">{award.title}</p>
                  <p className="text-xs text-muted-foreground">{award.organization}</p>
                </div>
              </motion.div>
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
            <h2 className="text-4xl font-bold mb-4">Mijozlarimiz Fikrlari</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Biz bilan ishlagan kompaniyalar va foydalanuvchilar nima deydi?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
        </div>

        <div className="container mx-auto max-w-4xl relative text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bizga Qo'shiling!
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Ajoyib jamoamizning bir qismi bo'ling va O'zbekiston yoshlarining kelajagini yaratishga hissa qo'shing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers">
                <Button size="lg" variant="secondary" className="text-primary font-semibold px-8">
                  Bo'sh Ish O'rinlari
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
                  Biz bilan Bog'laning
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
