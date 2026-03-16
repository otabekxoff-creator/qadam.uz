'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Users, DollarSign, Calendar, MapPin,
  Filter, X, ArrowRight, Sparkles, Rocket, Heart, Eye, Share2,
  Clock, Award, Target, Lightbulb, Building2, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import type { Startup, StartupStatus } from '@/types';

// =============================================
// Mock Data
// =============================================

const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EduTech Platform',
    description: 'AI-powered education platform for personalized learning. Using machine learning to create customized learning paths for students.',
    stage: 'IDEA',
    fundingNeeded: 50000,
    fundingCurrency: 'USD',
    logo: undefined,
    status: 'PENDING',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    student: {
      id: '1',
      userId: '1',
      firstName: 'Azizbek',
      lastName: 'Toshmatov',
      university: 'TUIT',
      major: 'Software Engineering',
      avatar: undefined,
      isLookingForJob: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10',
    },
  },
  {
    id: '2',
    name: 'HealthConnect',
    description: 'Telemedicine platform connecting patients with doctors. Remote consultations and digital health records.',
    stage: 'IDEA',
    fundingNeeded: 25000,
    fundingCurrency: 'USD',
    logo: undefined,
    status: 'PENDING',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    student: {
      id: '2',
      userId: '2',
      firstName: 'Dilora',
      lastName: 'Karimova',
      university: 'Tashkent Medical Academy',
      major: 'Medicine',
      avatar: undefined,
      isLookingForJob: true,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
    },
  },
  {
    id: '3',
    name: 'AgriTech Solutions',
    description: 'Smart farming solutions using IoT sensors and AI analytics. Helping farmers optimize crop yields.',
    stage: 'MVP',
    fundingNeeded: 75000,
    fundingCurrency: 'USD',
    logo: undefined,
    status: 'APPROVED',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15',
    student: {
      id: '3',
      userId: '3',
      firstName: 'Jahongir',
      lastName: 'Karimov',
      university: 'TDAU',
      major: 'Agricultural Engineering',
      avatar: undefined,
      isLookingForJob: true,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-18',
    },
  },
  {
    id: '4',
    name: 'FinTech Wallet',
    description: 'Digital wallet and payment solution for Uzbekistan market. Secure, fast, and user-friendly.',
    stage: 'GROWTH',
    fundingNeeded: 150000,
    fundingCurrency: 'USD',
    logo: undefined,
    status: 'FUNDED',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20',
    student: {
      id: '4',
      userId: '4',
      firstName: 'Sardor',
      lastName: 'Alimov',
      university: 'WIUT',
      major: 'Finance',
      avatar: undefined,
      isLookingForJob: false,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-20',
    },
  },
];

const categories = [
  'All',
  'Education',
  'Healthcare',
  'Agriculture',
  'Finance',
  'E-commerce',
  'Transport',
  'Energy',
  'Entertainment',
  'Real Estate',
];

const stages = ['All', 'IDEA', 'MVP', 'SEED', 'SERIES_A'];

const teamSizes = ['All', '1-2', '3-5', '6-10', '11-20', '20+'];

// =============================================
// Skeleton Components
// =============================================

function StartupCardSkeleton() {
  return (
    <Card className="h-full border border-border/60 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-16 rounded-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

// =============================================
// Main Component
// =============================================

export default function EnhancedStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedTeamSize, setSelectedTeamSize] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [likedStartups, setLikedStartups] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStartups(mockStartups);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStartups = useMemo(() => {
    let filtered = startups.filter(startup => {
      const matchesSearch = startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           startup.founderName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
      const matchesStage = selectedStage === 'All' || startup.stage === selectedStage;
      const matchesTeamSize = selectedTeamSize === 'All' || startup.teamSize === selectedTeamSize;

      return matchesSearch && matchesCategory && matchesStage && matchesTeamSize;
    });

    // Sort startups
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'most_viewed':
          return b.views - a.views;
        case 'most_liked':
          return b.likes - a.likes;
        case 'most_funded':
          return b.fundingRaised - a.fundingRaised;
        default:
          return 0;
      }
    });

    return filtered;
  }, [startups, searchQuery, selectedCategory, selectedStage, selectedTeamSize, sortBy]);

  const toggleLike = (startupId: string) => {
    setLikedStartups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(startupId)) {
        newSet.delete(startupId);
      } else {
        newSet.add(startupId);
      }
      return newSet;
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'IDEA': return 'bg-blue-100 text-blue-800';
      case 'MVP': return 'bg-green-100 text-green-800';
      case 'SEED': return 'bg-yellow-100 text-yellow-800';
      case 'SERIES_A': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-100 text-orange-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'FUNDED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFundingProgress = (raised: number, goal: string) => {
    const goalNumber = parseInt(goal.replace(/[$,]/g, ''));
    return Math.min((raised / goalNumber) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Innovatsion Startaplar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O'zbekistonning eng iqtidorli yoshlari yaratgan innovatsion loyihalarni kashf eting
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Jami Startaplar</p>
                  <p className="text-3xl font-bold">{startups.length}</p>
                </div>
                <Rocket className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Jami Investitsiya</p>
                  <p className="text-3xl font-bold">
                    ${startups.reduce((sum, s) => sum + s.fundingRaised, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Investorlar</p>
                  <p className="text-3xl font-bold">
                    {startups.reduce((sum, s) => sum + s.investors, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Jami Ko'rishlar</p>
                  <p className="text-3xl font-bold">
                    {startups.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Startaplar, asoschilar yoki tavsiflar bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Kategoriya" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'All' ? 'Barcha kategoriyalar' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Bosqich" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage === 'All' ? 'Barchasi' : stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Saralash" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Eng yangi</SelectItem>
                  <SelectItem value="oldest">Eng eski</SelectItem>
                  <SelectItem value="most_viewed">Eng ko'rilgan</SelectItem>
                  <SelectItem value="most_liked">Eng yoqilgan</SelectItem>
                  <SelectItem value="most_funded">Eng ko'p moliyalashtirilgan</SelectItem>
                </SelectContent>
              </Select>

              {/* Advanced Filters */}
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrlar
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filtrlar</SheetTitle>
                    <SheetDescription>
                      Startaplarni aniqroq filtrlash uchun
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <Label className="text-sm font-medium">Jamoa hajmi</Label>
                      <div className="mt-2 space-y-2">
                        {teamSizes.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                              id={size}
                              checked={selectedTeamSize === size}
                              onCheckedChange={() => setSelectedTeamSize(size)}
                            />
                            <Label htmlFor={size} className="text-sm">
                              {size === 'All' ? 'Barcha jamoa hajmlari' : size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredStartups.length} startap topildi
          </p>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Premium filtrlar faol
            </span>
          </div>
        </div>

        {/* Startups Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <StartupCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredStartups.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Rocket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Startaplar topilmadi
              </h3>
              <p className="text-muted-foreground">
                Filtrlarni o'zgartirib ko'ring yoki yangi qidiruv urinib ko'ring
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={startup.logo} alt={startup.title} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                              <Rocket className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {startup.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {startup.founderName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStageColor(startup.stage)}>
                            {startup.stage}
                          </Badge>
                          <Badge className={getStatusColor(startup.status)}>
                            {startup.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {startup.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{startup.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{startup.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{startup.student.university}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Moliyalashtirish</span>
                          <span className="font-medium">
                            ${startup.fundingRaised.toLocaleString()} / {startup.fundingGoal}
                          </span>
                        </div>
                        <Progress 
                          value={formatFundingProgress(startup.fundingRaised, startup.fundingGoal)} 
                          className="h-2"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{startup.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{startup.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{startup.investors}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(startup.createdAt).toLocaleDateString('uz-UZ')}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 space-y-2">
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleLike(startup.id)}
                          className="flex-1"
                        >
                          <Heart className={`h-4 w-4 mr-1 ${likedStartups.has(startup.id) ? 'fill-current text-red-500' : ''}`} />
                          {likedStartups.has(startup.id) ? 'Yoqilgan' : 'Yoqish'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Link href={`/startups/${startup.id}`} className="w-full">
                        <Button className="w-full group-hover:scale-105 transition-transform">
                          Batafsil <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Create Startup CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                O'zingizning startapingizni yarating!
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Innovatsion g'oyangizni moliyalashtirish olish va professional jamoa bilan tanilish uchun startapingizni platformamizga qo'shing.
              </p>
              <Link href="/startups/create">
                <Button size="lg" className="group-hover:scale-105 transition-transform">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Startap Yaratish
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
