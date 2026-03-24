'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  Heart, 
  ArrowRight,
  Calendar,
  Building,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// =============================================
// Jobs Page Component
// =============================================

interface JobFilters {
  search: string;
  category: string;
  location: string;
  jobType: string;
  experience: string;
  salary: number[];
  remote: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  description: string;
  requirements: string[];
  postedAt: string;
  isUrgent: boolean;
  isRemote: boolean;
  matchScore?: number;
}

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: '',
    location: '',
    jobType: '',
    experience: '',
    salary: [0, 200000],
    remote: false,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - real app da API dan olinadi
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Uzbekistan',
      location: 'Toshkent, O\'zbekiston',
      salary: '5,000,000 - 8,000,000 UZS',
      type: 'FULL_TIME',
      category: 'IT',
      description: 'Bizga React, Next.js va TypeScript bo\'yicha tajribali Senior Frontend Developer kerak.',
      requirements: ['5+ yil React tajriba', 'Next.js bilimi', 'TypeScript', 'English language'],
      postedAt: '2024-03-15',
      isUrgent: true,
      isRemote: false,
      matchScore: 95,
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'StartupHub',
      location: 'Remote',
      salary: '$3,000 - $5,000',
      type: 'REMOTE',
      category: 'Management',
      description: 'Innovativ startap uchun Product Manager kerak. Agile metodologiyada ishlash tajribasi.',
      requirements: ['3+ yil PM tajriba', 'Agile/Scrum', 'Product management', 'Leadership skills'],
      postedAt: '2024-03-14',
      isUrgent: false,
      isRemote: true,
      matchScore: 88,
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'Design Studio Pro',
      location: 'Samarqand',
      salary: '3,000,000 - 4,500,000 UZS',
      type: 'HYBRID',
      category: 'Design',
      description: 'Zamonaviy va foydalanuvchi dizaynlar yaratish uchun UX/UI Designer kerak.',
      requirements: ['Figma, Sketch, Adobe XD', 'Portfolio talabi', '3+ yil tajriba'],
      postedAt: '2024-03-13',
      isUrgent: false,
      isRemote: false,
      matchScore: 82,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || job.category === filters.category;
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = !filters.jobType || job.type === filters.jobType;
      const matchesSalary = filters.salary[1] === 0 || 
                           (job.salary.includes('$') ? 
                            parseInt(job.salary.replace(/[^0-9]/g, '')) >= filters.salary[0] && 
                            parseInt(job.salary.replace(/[^0-9]/g, '')) <= filters.salary[1] :
                            true);
      const matchesRemote = !filters.remote || job.isRemote === filters.remote;

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesSalary && matchesRemote;
    });
  }, [jobs, searchQuery, filters]);

  const handleFilterChange = useCallback((key: keyof JobFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      location: '',
      jobType: '',
      experience: '',
      salary: [0, 200000],
      remote: false,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O'zbekistonning eng yaxshi ish imkoniyatlari
            </h1>
            <p className="text-xl mb-8 text-white/90">
              10,000+ vakansiya, 500+ kompaniya, professional rivojlanish
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/95">
                <Briefcase className="mr-2 h-5 w-5" />
                Ishlarni ko'rish
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Building className="mr-2 h-5 w-5" />
                Kompaniya uchun
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ishlar, kompaniyalar yoki kalit so'zlar bilan qidiring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 text-lg bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Advanced Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2">Kategoriya</label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Barcha kategoriyalar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Barchasi</SelectItem>
                        <SelectItem value="IT">IT va Dasturlash</SelectItem>
                        <SelectItem value="Design">Dizayn</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sotish</SelectItem>
                        <SelectItem value="Management">Boshqaruv</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2">Joylashuv</label>
                    <Input
                      type="text"
                      placeholder="Shahar yoki viloyat"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2">Ish turi</label>
                    <Select value={filters.jobType} onValueChange={(value) => handleFilterChange('jobType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ish turi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Barchasi</SelectItem>
                        <SelectItem value="FULL_TIME">To'liq kunlik</SelectItem>
                        <SelectItem value="PART_TIME">Qisman kunlik</SelectItem>
                        <SelectItem value="REMOTE">Masofaviy</SelectItem>
                        <SelectItem value="HYBRID">Gibrid</SelectItem>
                        <SelectItem value="CONTRACT">Shartnoma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2">Maosh oralig'i (UZS)</label>
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.salary[0]}
                        onChange={(e) => handleFilterChange('salary', [parseInt(e.target.value) || 0, filters.salary[1]])}
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.salary[1]}
                        onChange={(e) => handleFilterChange('salary', [filters.salary[0], parseInt(e.target.value) || 0])}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={filters.remote}
                      onCheckedChange={(checked) => handleFilterChange('remote', checked)}
                    />
                    <label htmlFor="remote" className="text-sm font-medium">
                      Masofaviy ish
                    </label>
                  </div>

                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Filtrlarni tozalash
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-8 justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{filteredJobs.length}</div>
              <div className="text-sm text-muted-foreground">topilgan ishlar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">yangi ishlar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">95%</div>
              <div className="text-sm text-muted-foreground">moslik darajasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid/List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `"${searchQuery}" bo'yicha natijalar` : 'Oxirgi ishlar'}
            </h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <div className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <div className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary border-r-transparent border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Ishlar yuklanmoqda...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-muted-foreground mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Ishlar topilmadi</h3>
              <p className="text-muted-foreground">
                Filtrlarni o'zgartiring yoki yangi qidiruv amalga oshiring
              </p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={viewMode === 'grid' ? '' : 'mb-6'}
                >
                  {viewMode === 'grid' ? (
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span>{job.company}</span>
                              {job.isRemote && (
                                <Badge variant="secondary" className="ml-2">Remote</Badge>
                              )}
                            </div>
                          </div>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="shrink-0">
                              <Clock className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold text-foreground">{job.salary}</span>
                        </div>
                        <CardDescription className="line-clamp-3 mb-4">
                          {job.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.requirements.length - 3} ko'proq
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            Batafsilat
                          </Button>
                          <Button>
                            Ariza topshirish
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Building className="h-4 w-4" />
                              <span>{job.company}</span>
                              <div className="flex gap-2">
                                <Badge variant="outline">{job.type}</Badge>
                                {job.isRemote && (
                                  <Badge variant="secondary" className="ml-2">Remote</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-semibold text-foreground">{job.salary}</span>
                            </div>
                          </div>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="mb-3">
                              <Clock className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
