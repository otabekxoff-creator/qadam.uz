'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Video, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  MapPin,
  Star,
  Play,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// =============================================
// Content Strategy Component
// =============================================

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  avatar: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'tool' | 'course';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  downloads: number;
}

export function ContentStrategy() {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // Mock data - real app da API dan olinadi
  const mockBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'React 18 da yangi imkoniyatlar',
      excerpt: 'React 18 chiqarilishi bilan kelayotgan o\'zgarishlar va yangi features lar haqida to\'liq ma\'lumot.',
      author: 'Abdulaziz Karimov',
      role: 'Senior Frontend Developer',
      avatar: '/avatars/author1.jpg',
      publishedAt: '2024-03-15',
      readTime: 8,
      category: 'Development',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: '2',
      title: 'O\'zbekistonda IT karyerasi: 2024 trendlari',
      excerpt: 'O\'zbekiston IT bozorida 2024 yilda kuzatilayotgan asosiy trendlar va imkoniyatlar.',
      author: 'Dilnoza Abdullayeva',
      role: 'HR Manager',
      avatar: '/avatars/author2.jpg',
      publishedAt: '2024-03-14',
      readTime: 12,
      category: 'Career',
      tags: ['IT', 'Career', 'Trends']
    },
    {
      id: '3',
      title: 'Remote ish uchun zarur ko\'nikmalar',
      excerpt: 'Masofaviy ishlayotgan dasturchilar uchun eng muhim ko\'nikmalar va vositalar.',
      author: 'Bekzod Ismoilov',
      role: 'Full Stack Developer',
      avatar: '/avatars/author3.jpg',
      publishedAt: '2024-03-13',
      readTime: 10,
      category: 'Skills',
      tags: ['Remote', 'Skills', 'Productivity']
    },
  ];

  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Professional Resume Template',
      description: 'Zamonaviy va ATS-friendly resume shabloni. Sotish uchun tayyor.',
      type: 'template',
      difficulty: 'intermediate',
      duration: '2 soat',
      rating: 4.8,
      downloads: 1250
    },
    {
      id: '2',
      title: 'Interview Preparation Guide',
      description: 'Texnik intervyular uchun to\'liq tayyorlash bo\'yicha. 50+ umumiy savol.',
      type: 'guide',
      difficulty: 'advanced',
      duration: '4 soat',
      rating: 4.9,
      downloads: 890
    },
    {
      id: '3',
      title: 'Portfolio Builder Tool',
      description: 'Portfolio veb-saytini 10 daqiqada qurish uchun online vosita.',
      type: 'tool',
      difficulty: 'beginner',
      duration: '30 daqiqa',
      rating: 4.6,
      downloads: 2100
    },
    {
      id: '4',
      title: 'Salary Negotiation Course',
      description: 'Maosh muzokarasi san\'atlari va strategiyalari. Amaliy mashqlar.',
      type: 'course',
      difficulty: 'intermediate',
      duration: '6 soat',
      rating: 4.7,
      downloads: 560
    },
  ];

  useEffect(() => {
    setBlogPosts(mockBlogPosts);
    setResources(mockResources);
  }, []);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return BookOpen;
      case 'template': return Award;
      case 'tool': return TrendingUp;
      case 'course': return Video;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Karyera Resurslari va Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional rivojlanish uchun to\'liq resurslar, ko\'llash-malumotlar va amaliy qo\'llanma.
          </p>
        </motion.div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Resurslar
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Blog Posts */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.publishedAt}
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.role}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{post.readTime} daqiqa o\'qish</span>
                      </div>
                      <Button variant="outline" size="sm" className="group">
                        To\'liqni o\'qish
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Resources */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getDifficultyColor(resource.difficulty)}`}>
                          <getResourceIcon(resource.type) className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-2">
                            {resource.type === 'guide' && 'Qo\'llanma'}
                            {resource.type === 'template' && 'Shablon'}
                            {resource.type === 'tool' && 'Vosita'}
                            {resource.type === 'course' && 'Kurs'}
                          </Badge>
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{resource.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span>{resource.downloads} yuklab olingan</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {resource.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <Badge className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty === 'beginner' && 'Boshlang\'ich'}
                          {resource.difficulty === 'intermediate' && 'O\'rta'}
                          {resource.difficulty === 'advanced' && 'Ilgari'}
                        </Badge>
                      </div>
                      <Button className="flex-1 group">
                        <span className="flex items-center justify-center gap-2">
                          {resource.type === 'guide' && 'Qo\'llanmani ochish'}
                          {resource.type === 'template' && 'Shablondan foydalanish'}
                          {resource.type === 'tool' && 'Vositadan foydalanish'}
                          {resource.type === 'course' && 'Kursga yozilish'}
                          <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-4">
                Karyera rivojlanishingizni tezlashtiring!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-white/90">Professional maqolalar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">1000+</div>
                  <div className="text-white/90">Video darslar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-white/90">Haftalik vebinarlar</div>
                </div>
              </div>
              <p className="text-white/90 mb-6 text-center">
                Bizning keng resurslar kutubxonamiz bilan sizning karyera yo\'lida 
                muvaffaqiyatga erishishingizga yordam beramiz.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/95 w-full md:w-auto">
                Barcha resurslarni ko'rish
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
