'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar, MapPin, Users, Clock, ArrowRight, Star, Search, Filter,
  Video, Zap, Globe, Briefcase, GraduationCap, Award, CheckCircle,
  Play, Heart, Share2, Bell, ChevronDown, Sparkles, Mic, Users2, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const eventTypes = [
  { id: 'all', name: 'All Events', icon: Calendar, count: 48 },
  { id: 'webinar', name: 'Webinars', icon: Video, count: 15 },
  { id: 'workshop', name: 'Workshops', icon: Users2, count: 12 },
  { id: 'conference', name: 'Conferences', icon: Globe, count: 8 },
  { id: 'networking', name: 'Networking', icon: Users, count: 8 },
  { id: 'panel', name: 'Panel Discussions', icon: Mic, count: 5 },
];

const featuredEvents = [
  {
    id: '1',
    title: 'Tech Careers Summit 2024',
    description: 'Join 5,000+ tech professionals for the biggest virtual career event of the year.',
    type: 'conference',
    date: 'Dec 15, 2024',
    time: '10:00 AM - 4:00 PM EST',
    location: 'Virtual',
    attendees: 5234,
    speakers: 12,
    isFeatured: true,
    price: 'Free',
  },
  {
    id: '2',
    title: 'Resume Writing Masterclass',
    description: 'Learn how to craft a standout resume that gets you hired.',
    type: 'workshop',
    date: 'Dec 10, 2024',
    time: '2:00 PM - 4:00 PM EST',
    location: 'Virtual',
    attendees: 1200,
    isFeatured: true,
    price: 'Free',
  },
  {
    id: '3',
    title: 'Salary Negotiation Webinar',
    description: 'Expert strategies to negotiate your worth with confidence.',
    type: 'webinar',
    date: 'Dec 8, 2024',
    time: '1:00 PM - 2:30 PM EST',
    location: 'Virtual',
    attendees: 3400,
    isFeatured: true,
    price: 'Free',
  },
  {
    id: '4',
    title: 'Networking Night: Tech Professionals',
    description: 'Connect with hiring managers and tech leaders.',
    type: 'networking',
    date: 'Dec 12, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'San Francisco, CA',
    attendees: 150,
    isFeatured: true,
    price: '$25',
  },
];

const upcomingEvents = [
  {
    id: '5', title: 'Interview Skills Bootcamp', category: 'Workshop', date: 'Dec 18, 2024',
    time: '10:00 AM - 2:00 PM EST', location: 'Virtual', attendees: 800, maxAttendees: 1000,
    price: 'Free', speaker: 'Jennifer Lee', speakerRole: 'Career Coach', tags: ['Interview', 'Career'],
  },
  {
    id: '6', title: 'AI in the Workplace Panel', category: 'Panel Discussion', date: 'Dec 20, 2024',
    time: '3:00 PM - 4:30 PM EST', location: 'Virtual', attendees: 2100,
    price: 'Free', speaker: 'Multiple Speakers', speakerRole: 'Industry Experts', tags: ['AI', 'Future of Work'],
  },
  {
    id: '7', title: 'LinkedIn Optimization Workshop', category: 'Workshop', date: 'Jan 5, 2025',
    time: '11:00 AM - 1:00 PM EST', location: 'Virtual', attendees: 600, maxAttendees: 800,
    price: 'Free', speaker: 'David Chen', speakerRole: 'LinkedIn Expert', tags: ['LinkedIn', 'Personal Brand'],
  },
  {
    id: '8', title: 'Career Change Strategy Session', category: 'Webinar', date: 'Jan 8, 2025',
    time: '7:00 PM - 8:30 PM EST', location: 'Virtual', attendees: 450,
    price: 'Free', speaker: 'Sarah Johnson', speakerRole: 'Career Transition Coach', tags: ['Career Change', 'Planning'],
  },
  {
    id: '9', title: 'Tech Meetup: Startup Hiring', category: 'Networking', date: 'Jan 12, 2025',
    time: '6:30 PM - 9:00 PM', location: 'New York, NY', attendees: 85, maxAttendees: 120,
    price: '$15', tags: ['Startup', 'Hiring', 'Networking'],
  },
  {
    id: '10', title: 'Negotiation for Women in Tech', category: 'Workshop', date: 'Jan 15, 2025',
    time: '12:00 PM - 2:00 PM EST', location: 'Virtual', attendees: 1500,
    price: 'Free', speaker: 'Maria Garcia', speakerRole: 'Compensation Expert', tags: ['Women in Tech', 'Negotiation'],
  },
];

const pastEvents = [
  { title: 'DevRel Careers Panel', date: 'Nov 28, 2024', attendees: 1800, recording: true },
  { title: 'Product Management 101', date: 'Nov 20, 2024', attendees: 3200, recording: true },
  { title: 'UX Design Portfolio Review', date: 'Nov 15, 2024', attendees: 950, recording: true },
];

const speakers = [
  { name: 'Jennifer Lee', role: 'Career Coach', events: 12, rating: 4.9, specialty: 'Interview Skills' },
  { name: 'David Chen', role: 'LinkedIn Expert', events: 8, rating: 4.8, specialty: 'Personal Branding' },
  { name: 'Maria Garcia', role: 'Compensation Expert', events: 15, rating: 4.9, specialty: 'Salary Negotiation' },
  { name: 'Sarah Johnson', role: 'Career Transition Coach', events: 6, rating: 4.7, specialty: 'Career Change' },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || event.category.toLowerCase().includes(selectedType);
    return matchesSearch && matchesType;
  });

  const registerForEvent = (id: string) => setRegisteredEvents(prev => [...prev, id]);
  const toggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
              <Sparkles className="w-5 h-5" /><span className="font-medium">Connect & Learn</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Events & Workshops</h1>
            <p className="text-xl text-indigo-100 mb-8">Join live events, learn from experts, and connect with professionals</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[{ value: '48+', label: 'Events' }, { value: '50K+', label: 'Attendees' }, { value: '200+', label: 'Speakers' }, { value: '100%', label: 'Free' }].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-sm text-indigo-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {eventTypes.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type.id)} className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${selectedType === type.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <motion.div key={event.id} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white/50" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">{event.type}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Video className="w-3 h-3" />{event.location}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{event.description}</p>
                  <div className="space-y-1 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{event.date}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" />{event.attendees.toLocaleString()} attending</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {event.price === 'Free' ? 'Register Free' : `Register - ${event.price}`}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Upcoming Events</h2>
            <Button variant="outline" className="flex items-center gap-2"><Calendar className="w-4 h-4" />View Calendar</Button>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants} className="bg-slate-50 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div>
                      <span className="text-xs text-purple-600 font-medium">{event.category}</span>
                      <h3 className="font-semibold text-slate-800">{event.title}</h3>
                    </div>
                  </div>
                  <button onClick={() => toggleFavorite(event.id)} className="text-slate-400 hover:text-red-500">
                    <Heart className={`w-5 h-5 ${favorites.includes(event.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <div className="space-y-2 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" />{event.attendees.toLocaleString()} attending</div>
                </div>
                {event.speaker && (
                  <div className="flex items-center gap-2 mb-4 p-3 bg-white rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">{event.speaker[0]}</div>
                    <div><p className="text-sm font-medium text-slate-700">{event.speaker}</p><p className="text-xs text-slate-500">{event.speakerRole}</p></div>
                  </div>
                )}
                <div className="flex gap-2">
                  {registeredEvents.includes(event.id) ? (
                    <Button variant="outline" className="flex-1 bg-green-50 text-green-600 border-green-200" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />Registered
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white" onClick={() => registerForEvent(event.id)}>
                      {event.price === 'Free' ? 'Register Free' : `Register ${event.price}`}
                    </Button>
                  )}
                  <Button variant="outline" size="icon"><Bell className="w-4 h-4" /></Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Speakers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">{speaker.name[0]}</div>
                <h3 className="font-semibold text-slate-800">{speaker.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{speaker.role}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium">{speaker.rating}</span>
                  <span className="text-xs text-slate-400">({speaker.events} events)</span>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">{speaker.specialty}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Watch Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div><h3 className="font-semibold">{event.title}</h3><p className="text-sm text-slate-400">{event.date}</p></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 flex items-center gap-1"><Users className="w-4 h-4" />{event.attendees.toLocaleString()} watched</span>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">Watch Recording</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
