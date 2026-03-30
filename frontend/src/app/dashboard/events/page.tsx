"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: "1",
      title: "Career Fair 2024",
      description: "Join the biggest career fair in Uzbekistan. Meet top employers and find your dream job.",
      type: "career-fair",
      date: "2024-04-15",
      time: "10:00 - 17:00",
      location: "Tashkent, Expo Center",
      attendees: 500,
      maxAttendees: 1000,
      image: "/events/career-fair.jpg",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Tech Meetup: AI & Machine Learning",
      description: "Learn about the latest trends in AI and ML from industry experts.",
      type: "meetup",
      date: "2024-03-25",
      time: "18:00 - 20:00",
      location: "Samarkand, IT Park",
      attendees: 120,
      maxAttendees: 150,
      image: "/events/tech-meetup.jpg",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Resume Workshop",
      description: "Learn how to create a professional resume that stands out.",
      type: "workshop",
      date: "2024-03-20",
      time: "14:00 - 16:00",
      location: "Online (Zoom)",
      attendees: 80,
      maxAttendees: 100,
      image: "/events/workshop.jpg",
      status: "upcoming",
    },
    {
      id: "4",
      title: "Interview Skills Bootcamp",
      description: "Intensive training on interview techniques and soft skills.",
      type: "bootcamp",
      date: "2024-02-28",
      time: "09:00 - 17:00",
      location: "Tashkent, Innovation Center",
      attendees: 45,
      maxAttendees: 50,
      image: "/events/bootcamp.jpg",
      status: "completed",
    },
  ];

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter((e) => e.type === filter || e.status === filter);

  const eventTypes = [
    { value: "all", label: "Barcha" },
    { value: "career-fair", label: "Career Fair" },
    { value: "meetup", label: "Meetup" },
    { value: "workshop", label: "Workshop" },
    { value: "bootcamp", label: "Bootcamp" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tadbirlar</h1>
          <p className="text-muted-foreground">
            Karyera tadbirlari, workshoplar va meetuplar
          </p>
        </div>
        <Button>Yangi tadbir</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => (
          <Button
            key={type.value}
            variant={filter === type.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(type.value)}
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-primary/40" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">
                      {event.type}
                    </Badge>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </div>
                  {event.status === "completed" && (
                    <Badge variant="secondary">Tugagan</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("uz-UZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {event.attendees} / {event.maxAttendees} ishtirokchi
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    {event.status === "completed" ? "Qayta ko'rish" : "Ro'yxatdan o'tish"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
