'use client';

import { motion } from 'framer-motion';
import { Heart, Share2, MessageCircle, MoreHorizontal, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// This would normally come from a database or API
const blogPosts = [
  {
    id: 1,
    title: '10 Tips for Acing Your Technical Interview',
    excerpt: 'Master the art of technical interviews with these proven strategies from industry experts.',
    content: `
      <p>Technical interviews can be nerve-wracking, but with the right preparation, you can walk in confident and ready to impress. Here are 10 essential tips to help you succeed:</p>
      
      <h2>1. Understand the Format</h2>
      <p>Before your interview, research the company's interview process. Some companies focus heavily on algorithms, while others emphasize system design or practical coding exercises.</p>
      
      <h2>2. Practice Problem-Solving</h2>
      <p>Use platforms like LeetCode, HackerRank, or CodeSignal to practice coding problems daily. Focus on understanding patterns rather than memorizing solutions.</p>
      
      <h2>3. Master the Basics</h2>
      <p>Make sure you're solid on data structures (arrays, linked lists, trees, graphs) and algorithms (sorting, searching, dynamic programming).</p>
      
      <h2>4. Think Out Loud</h2>
      <p>Interviewers want to see your thought process. Verbalize your approach, discuss trade-offs, and explain why you're making certain decisions.</p>
      
      <h2>5. Test Your Code</h2>
      <p>Always walk through your code with example inputs to catch edge cases and bugs before the interviewer points them out.</p>
      
      <h2>6. Optimize Your Solution</h2>
      <p>Start with a working solution, then discuss how to optimize it for better time or space complexity.</p>
      
      <h2>7. Prepare System Design Questions</h2>
      <p>For senior roles, expect system design questions. Practice designing scalable systems and discussing trade-offs.</p>
      
      <h2>8. Ask Clarifying Questions</h2>
      <p>Don't assume requirements. Ask about scale, constraints, and specific use cases before diving into solutions.</p>
      
      <h2>9. Stay Calm Under Pressure</h2>
      <p>If you get stuck, take a deep breath. It's okay to ask for a hint or take a moment to think.</p>
      
      <h2>10. Follow Up</h2>
      <p>Send a thank-you email within 24 hours, reiterating your interest and highlighting key discussion points.</p>
      
      <p>Remember, technical skills are important, but so is your ability to communicate and collaborate. Good luck!</p>
    `,
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'Senior Technical Recruiter',
    },
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Interview Tips',
    image: '/blog/interview-tips.jpg',
    likes: 245,
    comments: 32,
    tags: ['interviews', 'career', 'tech', 'jobs'],
  },
  {
    id: 2,
    title: 'The Future of Remote Work in Central Asia',
    excerpt: 'How the region is adapting to global remote work trends and what it means for job seekers.',
    content: `
      <p>The landscape of work in Central Asia is undergoing a dramatic transformation. As global companies embrace remote work, opportunities for local talent are expanding beyond borders.</p>
      
      <h2>The Remote Work Revolution</h2>
      <p>Central Asian professionals now have access to positions at international companies without leaving their home countries. This shift is creating new possibilities for career growth and higher salaries.</p>
      
      <h2>Key Trends</h2>
      <ul>
        <li>Increased demand for tech talent</li>
        <li>Rise of English language proficiency requirements</li>
        <li>Growing startup ecosystem</li>
        <li>Improved digital infrastructure</li>
      </ul>
      
      <h2>Challenges and Opportunities</h2>
      <p>While the opportunities are exciting, remote work also brings challenges including timezone differences, cultural adaptation, and the need for self-discipline.</p>
    `,
    author: {
      name: 'Aziz Karimov',
      avatar: '/avatars/aziz.jpg',
      role: 'Workplace Analyst',
    },
    date: 'March 12, 2024',
    readTime: '6 min read',
    category: 'Industry Trends',
    image: '/blog/remote-work.jpg',
    likes: 189,
    comments: 24,
    tags: ['remote work', 'central asia', 'trends'],
  },
];

// Get the first blog post as default
const post = blogPosts[0];

export default function BlogPostPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Image */}
      <div className="w-full h-[400px] bg-gradient-to-r from-primary/20 to-primary/40 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background to-transparent">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-white/70">{post.author.role}</p>
                </div>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Action Bar */}
          <div className="flex items-center justify-between py-4 border-y mb-8 sticky top-0 bg-background/95 backdrop-blur z-10">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-card rounded-xl border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{post.author.name}</h3>
                <p className="text-muted-foreground">{post.author.role}</p>
                <p className="mt-2 text-sm">
                  Expert in technical recruitment with 10+ years of experience helping candidates land their dream jobs at top tech companies.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.slice(1).map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40" />
                  <div className="p-4">
                    <span className="text-xs text-primary font-medium">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-semibold mt-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
