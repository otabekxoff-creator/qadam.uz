"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, GraduationCap, Briefcase, Star, Calendar, Clock } from "lucide-react";

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState("mentors");

  const mentors = [
    {
      id: "1",
      name: "Dr. Alisher Karimov",
      role: "Senior Software Engineer",
      company: "Google",
      avatar: "/mentors/alisher.jpg",
      expertise: ["Software Architecture", "Cloud Computing", "Leadership"],
      rating: 4.9,
      reviews: 45,
      sessions: 120,
      availability: "Dushanba, Chorshanba, Juma",
      bio: "10+ yillik tajribaga ega software engineer. Google'da 5 yil ishlagan.",
    },
    {
      id: "2",
      name: "Dilnoza Rakhimova",
      role: "Product Manager",
      company: "Meta",
      avatar: "/mentors/dilnoza.jpg",
      expertise: ["Product Strategy", "Agile", "Data Analysis"],
      rating: 4.8,
      reviews: 38,
      sessions: 95,
      availability: "Seshanba, Payshanba",
      bio: "Meta'da product manager. Stanford MBA. Startap mentor.",
    },
    {
      id: "3",
      name: "Jasur Toshmatov",
      role: "Data Science Lead",
      company: "Amazon",
      avatar: "/mentors/jasur.jpg",
      expertise: ["Machine Learning", "AI", "Big Data"],
      rating: 5.0,
      reviews: 52,
      sessions: 150,
      availability: "Har kuni 18:00-20:00",
      bio: "PhD in Computer Science. 20+ ta ilmiy maqola muallifi.",
    },
  ];

  const mySessions = [
    {
      id: "1",
      mentor: mentors[0],
      date: "2024-03-25",
      time: "15:00",
      topic: "Career Growth Strategy",
      status: "upcoming",
      notes: "O'zimning karyera yo'limni rejalashtirish",
    },
    {
      id: "2",
      mentor: mentors[1],
      date: "2024-03-18",
      time: "16:30",
      topic: "Product Management Basics",
      status: "completed",
      notes: "PM asoslari va agile metodologiya",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentorship</h1>
          <p className="text-muted-foreground">
            Tajribali mutaxassislardan o'rganing va karyerangizni rivojlantiring
          </p>
        </div>
        <Button>Tashabbus ko'rsatish</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mentors" className="gap-2">
            <GraduationCap className="w-4 h-4" /> Mentors
          </TabsTrigger>
          <TabsTrigger value="sessions" className="gap-2">
            <Calendar className="w-4 h-4" /> Mening seanslarim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mentors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mentor.role}</p>
                        <p className="text-sm font-medium">{mentor.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.reviews} baho)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{mentor.bio}</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Mutaxassisligi:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        {mentor.sessions} seans o'tkazgan
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Mavjud: {mentor.availability}
                      </div>
                    </div>

                    <Button className="w-full">Seans buyurtma qilish</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="space-y-4">
            {mySessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {session.mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{session.topic}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Mentor: {session.mentor.name}
                          </p>
                        </div>
                      </div>
                      <Badge variant={session.status === "upcoming" ? "default" : "secondary"}>
                        {session.status === "upcoming" ? "Kutilmoqda" : "Yakunlangan"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(session.date).toLocaleDateString("uz-UZ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      <span className="font-medium">Eslatma:</span> {session.notes}
                    </p>
                    <div className="flex gap-2">
                      {session.status === "upcoming" ? (
                        <>
                          <Button size="sm">Kirish</Button>
                          <Button size="sm" variant="outline">Bekor qilish</Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">Yozuvni ko'rish</Button>
                          <Button size="sm" variant="ghost">Baholash</Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
