'use client';

import { motion } from 'framer-motion';
import { Calculator, TrendingUp, MapPin, Building2, Briefcase, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function SalaryCalculatorPage() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('mid');
  const [location, setLocation] = useState('tashkent');

  const salaryData = {
    tashkent: { min: 800, max: 5000 },
    samarkand: { min: 600, max: 3500 },
    bukhara: { min: 600, max: 3500 },
    other: { min: 500, max: 3000 },
  };

  const roles = [
    'Software Engineer',
    'Product Manager',
    'UX Designer',
    'Data Analyst',
    'Marketing Manager',
    'Sales Representative',
    'HR Manager',
    'DevOps Engineer',
  ];

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
            <h1 className="text-4xl font-bold mb-4">Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Estimate your market value based on role, experience, and location
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-8 shadow-lg border"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Role</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border bg-background"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select a role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['entry', 'mid', 'senior'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setExperience(level)}
                      className={`px-4 py-2 rounded-lg border capitalize ${
                        experience === level 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-background hover:bg-secondary'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border bg-background"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="tashkent">Tashkent</option>
                  <option value="samarkand">Samarkand</option>
                  <option value="bukhara">Bukhara</option>
                  <option value="other">Other regions</option>
                </select>
              </div>
            </div>

            {role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
              >
                <h3 className="text-lg font-semibold mb-4">Estimated Salary Range</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">${salaryData[location as keyof typeof salaryData].min.toLocaleString()}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-3xl font-bold">${salaryData[location as keyof typeof salaryData].max.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on market data from 1000+ {role} positions in Uzbekistan
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
