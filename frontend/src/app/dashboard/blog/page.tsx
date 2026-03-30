'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Bookmark,
  Share2,
  MessageSquare,
  ThumbsUp,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// ============================================================================
// Blog Data
// ============================================================================

const BLOG_POSTS = [
  {
    id: 1,
    title: '2026-yilda eng talab qilinadigan IT kasblari',
    excerpt: 'Sun\'iy intellekt, bulutli texnologiyalar va kiberxavfsizlik sohalaridagi eng mashhur kasblar...',
    content: 'Full article content here...',
    author: { name: 'Dilshod Rahimov', avatar: null },
    category: 'Karyera',
    tags: ['IT', 'Karyera', '2026'],
    status: 'published',
    featured: true,
    views: 12543,
    likes: 892,
    comments: 45,
    publishedAt: '2026-03-28',
    image: '/blog/career-2026.jpg',
  },
  {
    id: 2,
    title: 'Rezyume yaratish: 10 ta amaliy maslahat',
    excerpt: 'Professional rezyume yaratishning eng muhim qoidalari va xatolardan qochish usullari...',
    content: 'Full article content here...',
    author: { name: 'Malika Karimova', avatar: null },
    category: 'Rezyume',
    tags: ['Rezyume', 'Ish qidirish', 'HR'],
    status: 'published',
    featured: false,
    views: 8432,
    likes: 567,
    comments: 23,
    publishedAt: '2026-03-26',
    image: '/blog/resume-tips.jpg',
  },
  {
    id: 3,
    title: 'Intervyuga tayyorgarlik: to\'liq qo\'llanma',
    excerpt: 'Texnik va HR suhbatlariga tayyorgarlik strategiyasi va eng yaxshi amaliyotlar...',
    content: 'Full article content here...',
    author: { name: 'Akmal Khusanov', avatar: null },
    category: 'Intervyu',
    tags: ['Intervyu', 'Suhbat', 'Tayyorgarlik'],
    status: 'draft',
    featured: false,
    views: 0,
    likes: 0,
    comments: 0,
    publishedAt: null,
    image: '/blog/interview-prep.jpg',
  },
  {
    id: 4,
    title: 'Junior dan Middle darajasiga yetish yo\'li',
    excerpt: 'Dasturchi sifatida o\'sish bosqichlari va har bir darajaga yetish uchun kerakli ko\'nikmalar...',
    content: 'Full article content here...',
    author: { name: 'Shoxrux Yusupov', avatar: null },
    category: 'Karyera',
    tags: ['Karyera', 'O\'sish', 'Dasturlash'],
    status: 'published',
    featured: true,
    views: 9876,
    likes: 723,
    comments: 56,
    publishedAt: '2026-03-22',
    image: '/blog/career-growth.jpg',
  },
];

const BLOG_STATS = {
  totalPosts: 156,
  published: 142,
  drafts: 14,
  totalViews: 456789,
  totalLikes: 12345,
  totalComments: 2341,
  avgReadTime: '5:32',
  growthRate: 23.5,
};

const CATEGORIES = [
  { name: 'Karyera', count: 45, color: 'bg-blue-100 text-blue-700' },
  { name: 'Rezyume', count: 28, color: 'bg-green-100 text-green-700' },
  { name: 'Intervyu', count: 32, color: 'bg-purple-100 text-purple-700' },
  { name: "Ko'nikmalar", count: 24, color: 'bg-orange-100 text-orange-700' },
  { name: 'Texnologiya', count: 18, color: 'bg-pink-100 text-pink-700' },
  { name: 'Yangiliklar', count: 9, color: 'bg-gray-100 text-gray-700' },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function BlogDashboardPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-0',
      draft: 'bg-yellow-100 text-yellow-700 border-0',
      archived: 'bg-gray-100 text-gray-700 border-0',
    };
    return <Badge className={styles[status as keyof typeof styles] || ''}>{status}</Badge>;
  };

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-sm text-gray-500">Manage blog posts and content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Blog Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input placeholder="Enter post title..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option>Select category</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Excerpt</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                        placeholder="Brief description of the post..."
                      />
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Drop image here or click to upload</p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowNewPostDialog(false)}>
                        Create Post
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Total Posts', value: BLOG_STATS.totalPosts, icon: FileText },
                { label: 'Published', value: BLOG_STATS.published, icon: CheckCircle },
                { label: 'Drafts', value: BLOG_STATS.drafts, icon: Clock },
                { label: 'Total Views', value: BLOG_STATS.totalViews.toLocaleString(), icon: BarChart3 },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search posts..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <select className="px-3 py-2 border rounded-md">
                <option>All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Posts Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-slate-50">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Post</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Author</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stats</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <div className="flex items-start gap-3">
                              <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                                <ImageIcon className="w-6 h-6 text-slate-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{post.title}</p>
                                <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {post.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{post.author.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{post.category}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(post.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.views.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {post.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {post.comments}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Traffic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Traffic chart placeholder</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">45.2K</p>
                      <p className="text-sm text-gray-500">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">12.3K</p>
                      <p className="text-sm text-gray-500">Unique Visitors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">3:42</p>
                      <p className="text-sm text-gray-500">Avg. Read Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-blue-500" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Likes</span>
                        <span className="font-medium">12,345</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Comments</span>
                        <span className="font-medium">2,341</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Shares</span>
                        <span className="font-medium">8,234</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {CATEGORIES.map((category) => (
                <Card key={category.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{category.count}</p>
                        <p className="text-sm text-gray-500">posts</p>
                      </div>
                      <Badge className={category.color}>{category.count}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
