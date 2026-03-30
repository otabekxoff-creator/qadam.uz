'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Code2,
  Database,
  Globe,
  Palette,
  Terminal,
  Cpu,
  Cloud,
  Shield,
  BarChart3,
  Smartphone,
  Gamepad2,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Star,
  Target,
  Zap,
  ChevronRight,
  Lock,
  Unlock,
  Play,
  Pause,
  RotateCcw,
  Award,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Download,
  Share2,
  Bookmark,
  Filter,
  Search,
  SlidersHorizontal,
  ArrowRight,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Skills categories
const categories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'HTML, CSS, JavaScript, React, Vue, Angular',
    tests: 12,
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: Terminal,
    color: 'from-green-500 to-emerald-500',
    description: 'Node.js, Python, Java, Go, Ruby',
    tests: 15,
  },
  {
    id: 'database',
    name: 'Database Management',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    description: 'SQL, PostgreSQL, MongoDB, Redis, GraphQL',
    tests: 8,
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-purple-500 to-pink-500',
    description: 'AWS, Azure, Docker, Kubernetes, CI/CD',
    tests: 10,
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500',
    description: 'iOS, Android, React Native, Flutter',
    tests: 6,
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    icon: Brain,
    color: 'from-indigo-500 to-violet-500',
    description: 'Python, TensorFlow, PyTorch, NLP, Computer Vision',
    tests: 9,
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    description: 'Network Security, Ethical Hacking, Cryptography',
    tests: 7,
  },
  {
    id: 'data',
    name: 'Data Science',
    icon: BarChart3,
    color: 'from-teal-500 to-cyan-500',
    description: 'Python, R, Statistics, Data Visualization',
    tests: 11,
  },
];

// Mock tests
const mockTests = [
  {
    id: '1',
    title: 'React Fundamentals',
    category: 'Frontend Development',
    level: 'Beginner',
    duration: 30,
    questions: 25,
    attempts: 1234,
    rating: 4.8,
    passingScore: 70,
    badges: ['React', 'JavaScript'],
    description: 'Test your knowledge of React basics including components, props, state, and hooks.',
    completed: true,
    score: 85,
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    category: 'Frontend Development',
    level: 'Advanced',
    duration: 45,
    questions: 40,
    attempts: 2345,
    rating: 4.9,
    passingScore: 75,
    badges: ['JavaScript', 'ES6+'],
    description: 'Deep dive into closures, prototypes, async programming, and advanced patterns.',
    completed: false,
  },
  {
    id: '3',
    title: 'Node.js & Express',
    category: 'Backend Development',
    level: 'Intermediate',
    duration: 40,
    questions: 35,
    attempts: 1890,
    rating: 4.7,
    passingScore: 70,
    badges: ['Node.js', 'Express'],
    description: 'Server-side JavaScript development with Node.js and Express framework.',
    completed: true,
    score: 92,
  },
  {
    id: '4',
    title: 'PostgreSQL Mastery',
    category: 'Database Management',
    level: 'Intermediate',
    duration: 35,
    questions: 30,
    attempts: 1456,
    rating: 4.6,
    passingScore: 70,
    badges: ['SQL', 'PostgreSQL'],
    description: 'Comprehensive PostgreSQL including queries, indexing, and optimization.',
    completed: false,
  },
  {
    id: '5',
    title: 'AWS Solutions Architect',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    duration: 60,
    questions: 50,
    attempts: 3456,
    rating: 4.8,
    passingScore: 80,
    badges: ['AWS', 'Cloud'],
    description: 'AWS architecture, services, security, and best practices.',
    completed: false,
  },
  {
    id: '6',
    title: 'Docker & Kubernetes',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    duration: 45,
    questions: 40,
    attempts: 2234,
    rating: 4.7,
    passingScore: 75,
    badges: ['Docker', 'Kubernetes'],
    description: 'Containerization and orchestration for modern applications.',
    completed: true,
    score: 78,
  },
  {
    id: '7',
    title: 'React Native Development',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: 40,
    questions: 35,
    attempts: 1234,
    rating: 4.5,
    passingScore: 70,
    badges: ['React Native', 'Mobile'],
    description: 'Cross-platform mobile app development with React Native.',
    completed: false,
  },
  {
    id: '8',
    title: 'Machine Learning Basics',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: 35,
    questions: 30,
    attempts: 5678,
    rating: 4.9,
    passingScore: 70,
    badges: ['ML', 'Python'],
    description: 'Introduction to machine learning concepts and algorithms.',
    completed: true,
    score: 88,
  },
];

// User progress
const userProgress = {
  totalTests: 86,
  completedTests: 24,
  averageScore: 82,
  totalTime: 1240,
  rank: 'Gold',
  streak: 7,
  certificates: 5,
  skills: [
    { name: 'React', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'AWS', level: 65 },
  ],
};

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillsAssessmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [activeTab, setActiveTab] = useState('explore');
  const [showFilters, setShowFilters] = useState(false);

  // Filter tests
  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.badges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || test.category.toLowerCase().includes(selectedCategory);
    const matchesLevel = selectedLevel === 'all' || test.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Prove Your Skills</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills Assessment Center
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Test your technical skills, earn certifications, and stand out to employers
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { value: '86+', label: 'Skill Tests' },
                { value: '50K+', label: 'Tests Taken' },
                { value: '15K+', label: 'Certificates' },
                { value: '4.8', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-indigo-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Progress Card */}
      <section className="-mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-800">Your Progress</h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                      {userProgress.rank} Rank
                    </span>
                  </div>
                  <p className="text-slate-500">
                    {userProgress.completedTests} of {userProgress.totalTests} tests completed
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Target, value: `${userProgress.averageScore}%`, label: 'Avg Score' },
                  { icon: Clock, value: `${Math.floor(userProgress.totalTime / 60)}h`, label: 'Total Time' },
                  { icon: Award, value: userProgress.certificates, label: 'Certificates' },
                  { icon: Zap, value: `${userProgress.streak} days`, label: 'Streak' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <stat.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Bars */}
              <div className="flex-1 max-w-md">
                <div className="space-y-2">
                  {userProgress.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600 w-20">{skill.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600 w-8">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Browse by Category</h2>
            <Link href="/skills/all" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-2 ${
                  selectedCategory === category.id ? 'border-indigo-500' : 'border-transparent'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{category.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-600 font-medium">{category.tests} tests</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Tabs & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-xl p-1">
              {[
                { id: 'explore', label: 'Explore' },
                { id: 'my-tests', label: 'My Tests' },
                { id: 'certificates', label: 'Certificates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                variants={itemVariants}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-lg ${
                  test.completed ? 'border-green-200' : 'border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        test.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        test.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {test.level}
                      </span>
                      {test.completed && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {test.score}%
                        </span>
                      )}
                    </div>
                    <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">{test.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{test.description}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {test.badges.map((badge) => (
                      <span key={badge} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {test.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-4 h-4" />
                      {test.questions} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {test.passingScore}%
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users className="w-4 h-4" />
                      {test.attempts.toLocaleString()} attempts
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-slate-700">{test.rating}</span>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${
                      test.completed
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    } text-white`}
                  >
                    {test.completed ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retake Test
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Test
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No tests found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Prove Your Skills?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have validated their skills and landed their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-indigo-900 hover:bg-slate-100 px-8 py-3">
              Browse All Tests
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
