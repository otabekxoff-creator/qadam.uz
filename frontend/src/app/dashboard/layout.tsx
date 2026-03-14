'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      className="min-h-screen pt-24 pb-12 bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.div>
  );
}
