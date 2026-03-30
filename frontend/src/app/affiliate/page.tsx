'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, Gift, TrendingUp, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Total Clicks', value: '1,234', change: '+12%' },
    { label: 'Conversions', value: '56', change: '+8%' },
    { label: 'Commission Earned', value: '$2,450', change: '+23%' },
    { label: 'Pending', value: '$340', change: '+5%' },
  ];

  const tiers = [
    { name: 'Bronze', referrals: '0-10', commission: '10%', bonus: '$0' },
    { name: 'Silver', referrals: '11-50', commission: '15%', bonus: '$100' },
    { name: 'Gold', referrals: '51-100', commission: '20%', bonus: '$500' },
    { name: 'Platinum', referrals: '100+', commission: '25%', bonus: '$1,500' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText('https://SINERGIYA/?ref=AFFILIATE123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Affiliate Program</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partner with SINERGIYA and earn commission for every new user you refer
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl p-6 text-center shadow-sm border">
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-green-500 mt-1">{stat.change}</p>
              </div>
            ))}
          </motion.div>

          {/* Affiliate Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-8 shadow-lg border mb-16"
          >
            <h2 className="text-xl font-semibold mb-4">Your Affiliate Link</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value="https://SINERGIYA/?ref=AFFILIATE123"
                readOnly
                className="flex-1 px-4 py-3 rounded-lg border bg-secondary"
              />
              <button
                onClick={copyLink}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </motion.div>

          {/* Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8">Commission Tiers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    tier.name === 'Gold' ? 'bg-yellow-50 border-yellow-200' : 'bg-card'
                  }`}
                >
                  <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.referrals} referrals</p>
                  <p className="text-3xl font-bold text-primary mb-1">{tier.commission}</p>
                  <p className="text-sm text-muted-foreground">commission per sale</p>
                  {tier.bonus !== '$0' && (
                    <p className="text-sm text-green-600 mt-3">+ {tier.bonus} bonus</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
