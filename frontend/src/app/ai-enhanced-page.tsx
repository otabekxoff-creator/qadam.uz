'use client';

import { AIRecommendations } from '@/components/ai/AIRecommendations';
import { ContentStrategy } from '@/components/content/ContentStrategy';
import { SocialFeatures } from '@/components/social/SocialFeatures';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* AI Recommendations Section */}
      <AIRecommendations />
      
      {/* Content Strategy Section */}
      <ContentStrategy />
      
      {/* Social Features Section */}
      <SocialFeatures />
    </div>
  );
}
