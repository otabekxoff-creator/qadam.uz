'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Video, 
  UserPlus, 
  Heart, 
  Share2,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// =============================================
// Social Features Component
// =============================================

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  expertise: string[];
  rating: number;
  students: number;
  available: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'webinar' | 'meetup' | 'conference';
  attendees: number;
  maxAttendees: number;
  description: string;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export function SocialFeatures() {
  const [activeTab, setActiveTab] = useState('mentors');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);

  // Mock data - real app da API dan olinadi
  const mockMentors: Mentor[] = [
    {
      id: '1',
      name: 'Aziz Karimov',
      role: 'Senior Frontend Engineer',
      company: 'Google',
      avatar: '/avatars/mentor1.jpg',
      expertise: ['React', 'TypeScript', 'Next.js', 'System Design'],
      rating: 4.9,
      students: 127,
      available: true
    },
    {
      id: '2',
      name: 'Gulnora Saidova',
      role: 'Product Manager',
      company: 'Microsoft',
      avatar: '/avatars/mentor2.jpg',
      expertise: ['Product Strategy', 'Agile', 'Leadership', 'Career Development'],
      rating: 4.8,
      students: 89,
      available: false
    },
    {
      id: '3',
      name: 'Javlon Toshmatov',
      role: 'DevOps Engineer',
      company: 'Amazon Web Services',
      avatar: '/avatars/mentor3.jpg',
      expertise: ['DevOps', 'Cloud Architecture', 'Kubernetes', 'Docker'],
      rating: 4.7,
      students: 156,
      available: true
    },
  ];

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'React 18 Workshop',
      date: '2024-03-25',
      time: '18:00',
      location: 'Online',
      type: 'workshop',
      attendees: 45,
      maxAttendees: 100,
      description: 'React 18 ning yangi features larini o\'rganish va amaliyot qilish.'
    },
    {
      id: '2',
      title: 'IT Career Fair 2024',
      date: '2024-04-02',
      time: '10:00',
      location: 'Toshkent, Uzbekistan',
      type: 'conference',
      attendees: 500,
      maxAttendees: 1000,
      description: 'O\'zbekistondagi yirik IT kompaniyalari bilan uchrashuv imkoniyati.'
    },
    {
      id: '3',
      title: 'Remote Work Best Practices',
      date: '2024-03-28',
      time: '16:00',
      location: 'Online',
      type: 'webinar',
      attendees: 120,
      maxAttendees: 200,
      description: 'Masofaviy ishning eng yaxshi usullari va tajribalar.'
    },
  ];

  const mockCommunityPosts: CommunityPost[] = [
    {
      id: '1',
      author: 'Dilnoza Abdullayeva',
      avatar: '/avatars/user1.jpg',
      content: 'Step.uz platformasi orqali 3 oydan beri ishlayapti va men o\'z karyeramda katta yutuqlarga erishdim. Mentoring dasturi juda foydali bo\'ldi.',
      likes: 45,
      comments: 12,
      timestamp: '2 soat oldin',
      tags: ['success-story', 'mentoring', 'career']
    },
    {
      id: '2',
      author: 'Bekzod Ismoilov',
      avatar: '/avatars/user2.jpg',
      content: 'AI tavsiyalar tizimi menga to\'g\'ri mos ish topishda yordam berdi. React developer uchun 3 ta yangi imkoniyat topildi!',
      likes: 32,
      comments: 8,
      timestamp: '5 soat oldin',
      tags: ['ai-recommendations', 'job-search', 'success']
    },
    {
      id: '3',
      author: 'Malika Turaeva',
      avatar: '/avatars/user3.jpg',
      content: 'Step.uz orqali birinchi mukofot sovrinini oldim! 5 dan ortiq kompaniya takliflar oldi va ularning birini tanladim.',
      likes: 67,
      comments: 23,
      timestamp: '1 kun oldin',
      tags: ['success-story', 'job-offer', 'achievement']
    },
  ];

  useEffect(() => {
    setMentors(mockMentors);
    setEvents(mockEvents);
    setCommunityPosts(mockCommunityPosts);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ijtimoiy Xususiyatlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional network, mentoring va community features bilan karyerangizni yangi bosqichlarga olib chiqing.
          </p>
        </motion.div>

        {/* Social Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mentorlar
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tadbirlar
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Jamiyat
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mentors Section */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-lg font-medium">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                          {mentor.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="font-medium">{mentor.role}</span>
                          <span>•</span>
                          <span>{mentor.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500 fill-current" />
                            <span className="text-sm font-medium">{mentor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserPlus className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{mentor.students} student</span>
                          </div>
                        </div>
                      </div>
                      {mentor.available && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                          Hozir mavjud
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Mutaxassislik:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Profilni ko'rish
                      </Button>
                      <Button size="sm" className="flex-1">
                        Mentorlik so'rash
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Events Section */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Badge className="mb-2" variant={
                          event.type === 'workshop' ? 'default' :
                          event.type === 'webinar' ? 'secondary' : 'outline'
                        }>
                          {event.type === 'workshop' && 'Workshop'}
                          {event.type === 'webinar' && 'Webinar'}
                          {event.type === 'meetup' && 'Meetup'}
                          {event.type === 'conference' && 'Conference'}
                        </Badge>
                        <CardTitle className="text-xl font-semibold mb-2">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">
                          {event.attendees}/{event.maxAttendees} qatnashdi
                        </div>
                        <Button 
                          size="sm" 
                          className={event.attendees >= event.maxAttendees ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white'}
                          disabled={event.attendees >= event.maxAttendees}
                        >
                          {event.attendees >= event.maxAttendees ? 'To\'la' : 'Qatnashish'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed">
                      {event.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Community Section */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            {communityPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{post.author}</span>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-base leading-relaxed text-foreground">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Obuna bo\'lish
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
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-4">
                Jamiyatga Qo'shiling!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-white/90 mb-6">
                O'zbekistonning eng faol IT professionalari bilan bog'laning 
                va karyerangizni yangi bosqichlarga olib chiqing.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/95 w-full md:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5" />
                  Jamiyatga Qo'shilish
                </span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
