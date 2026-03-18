'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Award, 
  Lightbulb,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// =============================================
// AI Recommendations Component
// =============================================

interface AIRecommendation {
  id: string;
  type: 'job' | 'skill' | 'course' | 'salary';
  title: string;
  description: string;
  confidence: number;
  reason: string;
  action?: string;
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');

  // Mock AI recommendations - real app da AI API dan olinadi
  const mockRecommendations: AIRecommendation[] = [
    {
      id: '1',
      type: 'job',
      title: 'Senior React Developer',
      description: 'Sizning React tajribangiz asosida bu pozitsiya to\'g\'ri keladi. Kompaniyalar sizning React bilimingizni qadrlaydi.',
      confidence: 95,
      reason: '5+ yil React tajriba, TypeScript bilimi',
      action: 'Ariza topshirish'
    },
    {
      id: '2',
      type: 'skill',
      title: 'TypeScript Advanced',
      description: 'TypeScript da chuqurlikni oshirishingiz kerak. Bu sizning karyera rivojlanishingizga yordam beradi.',
      confidence: 88,
      reason: 'React loyihalarda TypeScript ishlatilgan',
      action: 'Kursni boshlash'
    },
    {
      id: '3',
      type: 'salary',
      title: 'Maosh oshishi potentsiali',
      description: 'Hozirgi o\'rtacha maoshdan 25% yuqori maosh olishingiz mumkin. Tajribangizni baholang.',
      confidence: 82,
      reason: 'Sovrinlangan maoshlar ma\'lumotlari',
      action: 'Maoshni baholash'
    },
    {
      id: '4',
      type: 'course',
      title: 'Cloud Architecture',
      description: 'AWS yoki Azure da chuqurlik olish zamonaviy talab qilinadi. Sizning karyera yo\'lida muhim.',
      confidence: 90,
      reason: 'Full-stack dasturlish trendlari',
      action: 'Kursga yozilish'
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  }, []);

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'job': return Brain;
      case 'skill': return TrendingUp;
      case 'salary': return BarChart3;
      case 'course': return Lightbulb;
      default: return Target;
    }
  };

  const getRecommendationColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-500';
    if (confidence >= 80) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const filteredRecommendations = recommendations.filter(rec => 
    activeTab === 'all' || rec.type === activeTab
  );

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20"></div>
              <Brain className="h-8 w-8 text-blue-500 relative z-10" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Tavsiyalar
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sun\'iy intellekt sizning karyerasini shaxsiy tahlil qiladi va individual tavsiyalar beradi.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Ishlar
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Ko\'nikmalar
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Kurslar
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Barchasi
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Recommendations Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 border-r-transparent border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">AI tavsiyalari yuklanmoqda...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group border-border/50 hover:border-blue-200 dark:hover:border-blue-800">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900`}>
                          <recommendation.type === 'job' && <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                          {recommendation.type === 'skill' && <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                          {recommendation.type === 'salary' && <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                          {recommendation.type === 'course' && <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {recommendation.type === 'job' && 'Ish tavsiyasi'}
                            {recommendation.type === 'skill' && 'Ko\'nikma'}
                            {recommendation.type === 'salary' && 'Maosh tahlili'}
                            {recommendation.type === 'course' && 'Kurs tavsiyasi'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className={`text-sm font-medium ${getRecommendationColor(recommendation.confidence)}`}>
                            {recommendation.confidence}% moslik
                          </span>
                        </div>
                        {recommendation.confidence >= 90 && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Juda yuqori
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {recommendation.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground mb-4">
                      {recommendation.description}
                    </CardDescription>
                    
                    {/* Confidence Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">AI ishonchiligi</span>
                        <span className={`text-sm font-medium ${getRecommendationColor(recommendation.confidence)}`}>
                          {recommendation.confidence}%
                        </span>
                      </div>
                      <Progress value={recommendation.confidence} className="h-2" />
                    </div>

                    {/* Reason */}
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border/50">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium mb-1">Sababi:</div>
                          <div className="text-xs text-muted-foreground">{recommendation.reason}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all group">
                        <span className="flex items-center justify-center gap-2">
                          {recommendation.action || 'Batafsilat'}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                AI Tahlillari
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Tavsiya aniqligi</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Kunlik tahlillar</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Foydalanuvchi mamnunligi</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-center text-sm text-muted-foreground">
                  AI tavsiyalari sizning profil ma\'lumotlari, ish tajribangiz va ko\'nikmalaringiz asosida 
                  shakllanadi. Ma\'lumotlaringizni yangilab turish tavsiya etiladi.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
