import { memo, useState, useEffect, useRef, useCallback } from 'react';

// Memo wrapper for expensive components
export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return memo(Component, areEqual);
}

// Debounce hook for search and other input
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle hook for scroll events
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

// Optimized image component
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
});

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const startTime = useRef<number>();
  
  useEffect(() => {
    startTime.current = performance.now();
    
    return () => {
      if (startTime.current) {
        const endTime = performance.now();
        console.log(`${componentName} render time: ${endTime - startTime.current}ms`);
      }
    };
  });
}

// Error boundary for performance monitoring
export class PerformanceErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Performance Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

// Lazy loading component
export function LazyLoad({
  children,
  fallback = <div>Loading...</div>,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <div ref={elementRef}>
      {isIntersecting ? children : fallback}
    </div>
  );
}

export default memo;
