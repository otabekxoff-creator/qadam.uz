'use client';

import { motion } from 'framer-motion';
import { Gift, Users, TrendingUp, DollarSign, Copy, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'STEP2024';
  const referralLink = `https://SINERGIYA/register?ref=${referralCode}`;

  const stats = [
    { label: 'Total Referrals', value: 12 },
    { label: 'Successful Hires', value: 3 },
    { label: 'Earnings', value: '$150' },
    { label: 'Pending', value: '$50' },
  ];

  const rewards = [
    { referrals: 1, reward: '$10', description: 'For each friend who signs up' },
    { referrals: 5, reward: '$50', description: 'Bonus for 5 successful referrals' },
    { referrals: 10, reward: '$150', description: 'Bonus for 10 successful referrals' },
    { referrals: 25, reward: '$500', description: 'Bonus for 25 successful referrals' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
            <p className="text-xl text-muted-foreground">
              Invite friends to join SINERGIYA and earn rewards for each successful referral
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl p-4 text-center shadow-sm border">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Referral Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 shadow-lg border mb-12"
          >
            <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg border bg-secondary"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </motion.div>

          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Reward Tiers</h2>
            <div className="space-y-4">
              {rewards.map((tier, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{tier.referrals} Referrals</p>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{tier.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
