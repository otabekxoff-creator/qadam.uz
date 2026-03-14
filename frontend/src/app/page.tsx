'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { FeaturedJobsSection } from '@/components/home/FeaturedJobsSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedJobsSection />
      <CTASection />
    </main>
  );
}
