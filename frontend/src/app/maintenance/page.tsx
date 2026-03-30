'use client';

import { motion } from 'framer-motion';
import { Wrench, ArrowLeft, Clock, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-muted-foreground mb-8">
          We&apos;re currently performing scheduled maintenance to improve your experience. 
          We&apos;ll be back shortly!
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
          <Clock className="w-4 h-4" />
          <span>Expected downtime: 2 hours</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <Link 
            href="/"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
