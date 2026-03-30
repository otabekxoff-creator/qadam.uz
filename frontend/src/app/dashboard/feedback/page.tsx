'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, ThumbsUp, ThumbsDown, Lightbulb, Bug, Heart } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [message, setMessage] = useState('');

  const feedbackTypes = [
    { id: 'suggestion', name: 'Suggestion', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'bug', name: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { id: 'praise', name: 'Praise', icon: Heart, color: 'text-pink-500' },
    { id: 'complaint', name: 'Complaint', icon: ThumbsDown, color: 'text-orange-500' },
  ];

  const recentFeedback = [
    {
      id: 1,
      type: 'suggestion',
      user: 'John Doe',
      content: 'Would be great to have dark mode support!',
      rating: 5,
      date: '2 days ago',
      status: 'reviewed',
    },
    {
      id: 2,
      type: 'bug',
      user: 'Jane Smith',
      content: 'Job search filter not working properly on mobile.',
      rating: 3,
      date: '3 days ago',
      status: 'in-progress',
    },
    {
      id: 3,
      type: 'praise',
      user: 'Mike Johnson',
      content: 'Love the new analytics dashboard!',
      rating: 5,
      date: '1 week ago',
      status: 'resolved',
    },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Share Feedback</h1>
        <p className="text-muted-foreground mb-8">Help us improve Step.uz with your suggestions and feedback</p>

        {/* Feedback Form */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <h2 className="text-lg font-semibold mb-6">Send Feedback</h2>

          {/* Feedback Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Type of Feedback</label>
            <div className="flex flex-wrap gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    feedbackType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <type.icon className={`w-4 h-4 ${type.color}`} />
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">How would you rate your experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Feedback</label>
            <textarea
              rows={5}
              className="w-full px-4 py-2 rounded-lg border bg-background resize-none"
              placeholder="Tell us what you think..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </div>

        {/* Recent Feedback */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Feedback from Community</h2>
          <div className="space-y-4">
            {recentFeedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${
                      item.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-muted-foreground">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
