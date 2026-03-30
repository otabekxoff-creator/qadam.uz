"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Download, Clock, Star, PlayCircle } from "lucide-react";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");

  const resources = {
    articles: [
      {
        id: "1",
        title: "10 ta effektiv rezyume yozish usuli",
        description: "Rezyumeni professional yozish bo'yicha eng yaxshi amaliyotlar.",
        category: "Career Tips",
        readTime: "5 daqiqa",
        rating: 4.8,
        views: 1250,
      },
      {
        id: "2",
        title: "Intervyuda muvaffaqiyat qozonish sirlari",
        description: "Texnik va behavior intervyular uchun tayyorgarlik.",
        category: "Interview",
        readTime: "8 daqiqa",
        rating: 4.9,
        views: 2100,
      },
      {
        id: "3",
        title: "2024-yil top 10 tech ko'nikmalari",
        description: "Zamonaviy IT sohasida talab qilinadigan ko'nikmalar.",
        category: "Skills",
        readTime: "6 daqiqa",
        rating: 4.7,
        views: 3400,
      },
    ],
    videos: [
      {
        id: "1",
        title: "LinkedIn profilini optimallashtirish",
        description: "Professional LinkedIn profil yaratish bo'yicha qo'llanma.",
        duration: "15:30",
        views: 5600,
      },
      {
        id: "2",
        title: "Networking asoslari",
        description: "Professional aloqalar o'rnatish san'ati.",
        duration: "22:15",
        views: 4200,
      },
      {
        id: "3",
        title: "Salary negotiation strategiyalari",
        description: "Ish haqi bo'yicha muzokaralar qilish usullari.",
        duration: "18:45",
        views: 3800,
      },
    ],
    templates: [
      {
        id: "1",
        title: "Professional Rezyume Shakli",
        description: "HRlar tomonidan tasdiqlangan rezyume shablonlari.",
        downloads: 8500,
        format: "PDF, DOCX",
      },
      {
        id: "2",
        title: "Cover Letter Namunalari",
        description: "Turli sohalar uchun murojaat xatlari.",
        downloads: 6200,
        format: "PDF, DOCX",
      },
      {
        id: "3",
        title: "Portfolio Shakli",
        description: "Dizayner va dasturchilar uchun portfolio shablonlari.",
        downloads: 4100,
        format: "PDF, Figma",
      },
    ],
  };

  const filteredArticles = resources.articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resurslar</h1>
          <p className="text-muted-foreground">
            Karyerangizni rivojlantirish uchun foydali materiallar
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Resurs qidirish..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles" className="gap-2">
            <BookOpen className="w-4 h-4" /> Maqolalar
          </TabsTrigger>
          <TabsTrigger value="videos" className="gap-2">
            <PlayCircle className="w-4 h-4" /> Videolar
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Download className="w-4 h-4" /> Shakllar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-4">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {article.category}
                        </Badge>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{article.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                        <span>{article.views} o'qish</span>
                      </div>
                      <Button size="sm">O'qish</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-primary/40" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.duration}</span>
                    <span>{video.views} ko'rish</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center mb-4">
                    <Download className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{template.format}</span>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Yuklash
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
