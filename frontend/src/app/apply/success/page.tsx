'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, HelpCircle, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full mx-4"
      >
        <div className="bg-card rounded-2xl p-8 shadow-xl border text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Your application for <strong>Senior Frontend Developer</strong> at <strong>TechCorp</strong> has been successfully submitted.
          </p>

          {/* Timeline */}
          <div className="text-left mb-8">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</div>
                  <div className="w-0.5 h-8 bg-secondary mt-2" />
                </div>
                <div>
                  <p className="font-medium">Application Review</p>
                  <p className="text-sm text-muted-foreground">The hiring team will review your application within 3-5 business days.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-sm font-medium">2</div>
                  <div className="w-0.5 h-8 bg-secondary mt-2" />
                </div>
                <div>
                  <p className="font-medium">Initial Screening</p>
                  <p className="text-sm text-muted-foreground">If selected, you will be contacted for a phone or video screening.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-sm font-medium">3</div>
                </div>
                <div>
                  <p className="font-medium">Interview Process</p>
                  <p className="text-sm text-muted-foreground">Successful candidates will proceed to technical and cultural interviews.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/applied-jobs"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View My Applications
            </Link>
            <Link
              href="/jobs/search"
              className="flex items-center justify-center gap-2 w-full py-3 border rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Browse More Jobs
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-3">Have questions about your application?</p>
            <Link href="/help" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Visit Help Center
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
