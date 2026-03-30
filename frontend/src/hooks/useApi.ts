import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/services/api';

interface UseApiOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  executeOnMount?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (overrideBody?: any) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApi<T = any>(options: UseApiOptions): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  const execute = useCallback(
    async (overrideBody?: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const body = overrideBody || options.body;
        let response;

        switch (options.method || 'GET') {
          case 'GET':
            response = await api.get<T>(options.url);
            break;
          case 'POST':
            response = await api.post<T>(options.url, body);
            break;
          case 'PUT':
            response = await api.put<T>(options.url, body);
            break;
          case 'PATCH':
            response = await api.patch<T>(options.url, body);
            break;
          case 'DELETE':
            response = await api.delete<T>(options.url);
            break;
          default:
            response = await api.get<T>(options.url);
        }

        if (response.success) {
          setData(response.data as T);
        } else {
          setError(response.message || 'Request failed');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [options.url, options.method, options.body]
  );

  const refetch = useCallback(() => execute(), [execute]);

  useEffect(() => {
    if (options.executeOnMount !== false) {
      execute();
    }
  }, [execute, options.executeOnMount]);

  return { data, isLoading, error, execute, refetch };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
