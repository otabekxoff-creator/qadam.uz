'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  ChevronRight,
  LogOut,
  Edit,
  Camera,
  MapPin,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Award,
  FileText,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

// Mock user data
const USER_DATA = {
  id: '1',
  email: 'student@example.com',
  role: 'STUDENT',
  student: {
    firstName: 'Azizbek',
    lastName: 'Rahimov',
    avatar: null,
    phone: '+998 90 123 45 67',
    bio: 'Full-stack developer with 3 years of experience. Passionate about building scalable web applications.',
    major: 'Computer Science',
    university: 'Tashkent State Technical University',
    course: 4,
    educationLevel: 'BACHELOR',
    location: 'Tashkent, Uzbekistan',
    expectedSalary: 8000000,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS'],
    experience: [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Solutions',
        location: 'Tashkent',
        startDate: '2023-01',
        endDate: null,
        isCurrent: true,
        description: 'Developing modern web applications using React and Next.js',
      },
      {
        id: 2,
        title: 'Junior Developer',
        company: 'Startup Hub',
        location: 'Remote',
        startDate: '2022-06',
        endDate: '2022-12',
        isCurrent: false,
        description: 'Worked on MVP development for a fintech startup',
      },
    ],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        url: 'https://github.com/aziz/ecommerce',
        technologies: ['Next.js', 'Stripe', 'Prisma'],
      },
      {
        id: 2,
        name: 'Task Management App',
        description: 'Real-time collaborative task management tool',
        url: 'https://github.com/aziz/taskapp',
        technologies: ['React', 'Socket.io', 'Node.js'],
      },
    ],
    certifications: [
      { id: 1, name: 'AWS Certified Developer', organization: 'Amazon', issueDate: '2023-05' },
      { id: 2, name: 'React Developer Certificate', organization: 'Meta', issueDate: '2022-11' },
    ],
    languages: [
      { name: 'Uzbek', proficiency: 'NATIVE' },
      { name: 'English', proficiency: 'FLUENT' },
      { name: 'Russian', proficiency: 'INTERMEDIATE' },
    ],
  },
};

const SAVED_JOBS = [
  { id: 1, title: 'Senior Frontend Developer', company: 'Tech Solutions', salary: '8,000,000 - 15,000,000 UZS', savedAt: '2026-03-28' },
  { id: 2, title: 'Full Stack Engineer', company: 'Digital Agency', salary: '10,000,000 - 18,000,000 UZS', savedAt: '2026-03-27' },
];

const APPLICATIONS = [
  { id: 1, jobTitle: 'React Developer', company: 'Startup Hub', status: 'INTERVIEW', appliedAt: '2026-03-25' },
  { id: 2, jobTitle: 'Frontend Engineer', company: 'Global Tech', status: 'PENDING', appliedAt: '2026-03-20' },
  { id: 3, jobTitle: 'Web Developer', company: 'Local Company', status: 'REJECTED', appliedAt: '2026-03-15' },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-700 border-0',
      INTERVIEW: 'bg-blue-100 text-blue-700 border-0',
      OFFERED: 'bg-green-100 text-green-700 border-0',
      HIRED: 'bg-purple-100 text-purple-700 border-0',
      REJECTED: 'bg-red-100 text-red-700 border-0',
    };
    return <Badge className={styles[status as keyof typeof styles] || ''}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-500">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              <Button variant="outline" className="text-red-500">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {USER_DATA.student.firstName[0]}{USER_DATA.student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mt-4">
                    {USER_DATA.student.firstName} {USER_DATA.student.lastName}
                  </h2>
                  <p className="text-gray-500">{USER_DATA.student.major}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {USER_DATA.student.location}
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: User },
                    { id: 'applications', label: 'Applications', icon: Briefcase },
                    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Completion */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                        <p className="text-sm text-gray-500">Complete your profile to increase visibility</p>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        ✓ Basic Info
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        ✓ Education
                      </Badge>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                        ⚠ Skills
                      </Badge>
                      <Badge variant="outline" className="text-gray-600">
                        ✗ Experience
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <p className="font-medium">{USER_DATA.student.firstName} {USER_DATA.student.lastName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <p className="font-medium">{USER_DATA.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <p className="font-medium">{USER_DATA.student.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Location</label>
                        <p className="font-medium">{USER_DATA.student.location}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-green-500" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">University</label>
                        <p className="font-medium">{USER_DATA.student.university}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Major</label>
                        <p className="font-medium">{USER_DATA.student.major}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Course</label>
                        <p className="font-medium">{USER_DATA.student.course}th year</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Degree</label>
                        <p className="font-medium">{USER_DATA.student.educationLevel}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Skills
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {USER_DATA.student.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-orange-500" />
                        Work Experience
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {USER_DATA.student.experience.map((exp) => (
                      <div key={exp.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-sm text-gray-500">
                              {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                            </p>
                            <p className="text-gray-600 mt-2">{exp.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-pink-500" />
                        Projects
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {USER_DATA.student.projects.map((project) => (
                      <div key={project.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{project.name}</h4>
                            <p className="text-gray-600">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {APPLICATIONS.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{app.jobTitle}</h4>
                          <p className="text-gray-600">{app.company}</p>
                          <p className="text-sm text-gray-500">Applied on {app.appliedAt}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {getStatusBadge(app.status)}
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'saved' && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {SAVED_JOBS.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <p className="text-gray-600">{job.company}</p>
                          <p className="text-sm text-gray-500">{job.salary}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Apply Now
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about your applications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Browser notifications for new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive job recommendations and career tips</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-gray-500">Make your profile visible to employers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Open to Work</p>
                        <p className="text-sm text-gray-500">Show that you are looking for opportunities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
