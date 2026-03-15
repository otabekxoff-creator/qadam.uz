'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "O'zbekistonda IT karyerasi: 2024 yil natijalari",
    excerpt: "IT sohasidagi o'zgarishlar va yangi imkoniyatlar to'g'risida",
    author: "Aziz Karimov",
    date: "2024-03-15",
    readTime: "5 daqiqa",
    category: "Karyera"
  },
  {
    id: 2,
    title: "Talabalar uchun startap yaratish bo'yicha yo'riqnoma",
    excerpt: "O'qish davomida o'z startapingizni qanday boshlash mumkin",
    author: "Dilnoza Raximova",
    date: "2024-03-10",
    readTime: "8 daqiqa",
    category: "Startap"
  },
  {
    id: 3,
    title: "Ish intervyusiga tayyorlanish: 10 ta muhim savol",
    excerpt: "Eng ko'p uchraydigan intervyu savollari va javoblari",
    author: "Javohir Toshmatov",
    date: "2024-03-05",
    readTime: "6 daqiqa",
    category: "Intervyu"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Karyera va startaplar haqida foydali maqolalar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    To'liq o'qish
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
