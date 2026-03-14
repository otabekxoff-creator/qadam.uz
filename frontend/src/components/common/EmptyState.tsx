'use client';

import { cn } from '@/lib/utils';
import { FileQuestion, FolderOpen, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// =============================================
// Empty State Types
// =============================================

type EmptyStateType = 'default' | 'search' | 'jobs' | 'startups' | 'companies' | 'applications';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// =============================================
// Empty State Icons
// =============================================

const typeIcons: Record<EmptyStateType, React.ReactNode> = {
  default: <FileQuestion className="h-12 w-12 text-muted-foreground" />,
  search: <Search className="h-12 w-12 text-muted-foreground" />,
  jobs: <FolderOpen className="h-12 w-12 text-muted-foreground" />,
  startups: <FolderOpen className="h-12 w-12 text-muted-foreground" />,
  companies: <Users className="h-12 w-12 text-muted-foreground" />,
  applications: <FolderOpen className="h-12 w-12 text-muted-foreground" />,
};

const typeMessages: Record<EmptyStateType, { title: string; description: string }> = {
  default: {
    title: 'Ma\'lumot topilmadi',
    description: 'Bu yerda hozircha hech narsa yo\'q',
  },
  search: {
    title: 'Hech narsa topilmadi',
    description: 'Boshqa kalit so\'zlar bilan qidiring',
  },
  jobs: {
    title: 'Ish e\'lonlari yo\'q',
    description: 'Hozircha ish e\'lonlari mavjud emas',
  },
  startups: {
    title: 'Startaplar yo\'q',
    description: 'Hozircha startaplar mavjud emas',
  },
  companies: {
    title: 'Kompaniyalar yo\'q',
    description: 'Hozircha kompaniyalar mavjud emas',
  },
  applications: {
    title: 'Arizalar yo\'q',
    description: 'Siz hali hech qayerga ariza topshirmagansiz',
  },
};

// =============================================
// Empty State Component
// =============================================

export function EmptyState({
  type = 'default',
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const messages = typeMessages[type];

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 rounded-full bg-muted p-6">
        {icon || typeIcons[type]}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        {title || messages.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        {description || messages.description}
      </p>

      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
