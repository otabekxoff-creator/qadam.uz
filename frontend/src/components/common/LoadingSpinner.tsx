'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// =============================================
// Loading Spinner Component
// =============================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <Loader2 className={cn('animate-spin text-emerald-500', spinnerSizes[size], className)} />
  );
}

// =============================================
// Full Page Loader
// =============================================

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'Yuklanmoqda...' }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

// =============================================
// Loading Overlay
// =============================================

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export function LoadingOverlay({ isLoading, message }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-8 shadow-lg">
        <LoadingSpinner size="lg" />
        {message && <p className="text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
