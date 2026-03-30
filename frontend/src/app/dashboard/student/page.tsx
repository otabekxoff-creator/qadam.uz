"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Globe, 
  Edit,
  Download,
  Share2,
  Eye,
  ThumbsUp,
  Clock,
  Award,
  BookOpen,
  Code,
  Link as LinkedinIcon,
  GitBranch as GithubIcon
} from "lucide-react";

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const student = {
    name: "Azizbek Khayrullaev",
    title: "Software Engineering Student",
    avatar: "/students/azizbek.jpg",
    email: "azizbek@example.com",
    phone: "+998 90 123 45 67",
    location: "Tashkent, Uzbekistan",
    website: "https://azizbek.dev",
    linkedin: "https://linkedin.com/in/azizbek",
    github: "https://github.com/azizbek",
    university: "Toshkent Axborot Texnologiyalari Universiteti",
    faculty: "Kompyuter injiniringi",
    course: 3,
    gpa: 3.8,
    about: "Passionate software engineering student with strong foundation in full-stack development. Experienced in building web applications using React, Node.js, and modern technologies. Always eager to learn and contribute to meaningful projects.",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Python", level: 70 },
      { name: "PostgreSQL", level: 65 },
    ],
    experience: [
      {
        id: "1",
        title: "Frontend Developer Intern",
        company: "TechCorp Uzbekistan",
        location: "Tashkent",
        type: "Internship",
        startDate: "2024-01",
        endDate: "Present",
        description: "Developing responsive web interfaces using React and TypeScript. Collaborating with UX/UI team to implement design systems.",
        skills: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "2",
        title: "Web Development Freelancer",
        company: "Self-employed",
        location: "Remote",
        type: "Freelance",
        startDate: "2023-06",
        endDate: "2023-12",
        description: "Built 5+ websites for local businesses. Implemented e-commerce solutions and content management systems.",
        skills: ["Next.js", "Node.js", "MongoDB"],
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science",
        field: "Software Engineering",
        institution: "Toshkent Axborot Texnologiyalari Universiteti",
        startDate: "2022-09",
        endDate: "2026-06 (expected)",
        gpa: "3.8/4.0",
      },
    ],
    projects: [
      {
        id: "1",
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include user auth, product catalog, cart, and payment integration.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://github.com/azizbek/ecommerce",
        image: "/projects/ecommerce.jpg",
      },
      {
        id: "2",
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates using Socket.io and React.",
        technologies: ["React", "Socket.io", "Express", "MongoDB"],
        link: "https://github.com/azizbek/taskmanager",
        image: "/projects/taskmanager.jpg",
      },
    ],
    certifications: [
      { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2024-01" },
      { name: "React Developer Certificate", issuer: "Meta", date: "2023-08" },
      { name: "JavaScript Algorithms", issuer: "freeCodeCamp", date: "2023-05" },
    ],
    stats: {
      profileViews: 234,
      applications: 12,
      connections: 45,
      endorsements: 28,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{student.name}</h1>
                  <p className="text-xl text-muted-foreground mt-1">{student.title}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {student.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {student.university}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {student.course}-kurs
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Tahrirlash
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Rezyume
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {student.skills.slice(0, 5).map((skill) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
                <Badge variant="outline">+{student.skills.length - 5}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Eye className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold">{student.stats.profileViews}</div>
                  <div className="text-xs text-muted-foreground">Ko&apos;rishlar</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Briefcase className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold">{student.stats.applications}</div>
                  <div className="text-xs text-muted-foreground">Arizalar</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold">{student.stats.connections}</div>
                  <div className="text-xs text-muted-foreground">Bog&apos;lanishlar</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Award className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold">{student.stats.endorsements}</div>
                  <div className="text-xs text-muted-foreground">Tavsiyalar</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Umumiy</TabsTrigger>
          <TabsTrigger value="experience">Tajriba</TabsTrigger>
          <TabsTrigger value="projects">Loyihalar</TabsTrigger>
          <TabsTrigger value="skills">Ko&apos;nikmalar</TabsTrigger>
          <TabsTrigger value="education">Ta&apos;lim</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Men haqimda</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{student.about}</p>
              
              <div className="flex gap-2 mt-4">
                <a href={`mailto:${student.email}`}>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </a>
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <LinkedinIcon className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href={student.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <GithubIcon className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sertifikatlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <Award className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline">{cert.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ish tajribasi</CardTitle>
              <Button size="sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Qo&apos;shish
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {student.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary pl-4 pb-6 last:pb-0">
                  <h4 className="font-semibold text-lg">{exp.title}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <Badge variant="outline">{exp.type}</Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid md:grid-cols-2 gap-6">
            {student.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-16 h-16 text-primary/40" />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Ko&apos;rish
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Texnik ko&apos;nikmalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {student.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ta&apos;lim</CardTitle>
              <Button size="sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                Qo&apos;shish
              </Button>
            </CardHeader>
            <CardContent>
              {student.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-lg">{edu.degree}</h4>
                  <p className="text-primary font-medium">{edu.field}</p>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span>{edu.startDate} - {edu.endDate}</span>
                    <Badge variant="outline">GPA: {edu.gpa}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
