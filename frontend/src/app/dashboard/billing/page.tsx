'use client';

import { motion } from 'framer-motion';
import { CreditCard, Receipt, Download, Calendar, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['5 job postings', 'Basic analytics', 'Email support'],
      current: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 99,
      features: ['50 job postings', 'Advanced analytics', 'Priority support', 'API access'],
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: ['Unlimited jobs', 'Custom integrations', 'Dedicated manager', 'SLA guarantee'],
      current: false,
    },
  ];

  const invoices = [
    { id: 'INV-2024-001', date: '2024-03-01', amount: 99, status: 'paid' },
    { id: 'INV-2024-002', date: '2024-02-01', amount: 99, status: 'paid' },
    { id: 'INV-2024-003', date: '2024-01-01', amount: 99, status: 'paid' },
  ];

  const paymentMethods = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', default: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '08/26', default: false },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground mb-8">Manage your subscription and payment methods</p>

        {/* Current Plan */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <p className="text-muted-foreground">Professional Plan - $99/month</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Next billing date: April 1, 2024
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl p-6 border ${
                plan.current 
                  ? 'bg-primary/5 border-primary' 
                  : 'bg-card hover:border-primary/50'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <button className="w-full py-2 bg-primary text-white rounded-lg" disabled>
                  Current Plan
                </button>
              ) : (
                <button className="w-full py-2 border rounded-lg hover:bg-secondary transition-colors">
                  Upgrade
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium capitalize">{method.type} ending in {method.last4}</p>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                {method.default && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">Default</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Invoice History</h2>
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-3 font-medium">Invoice</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b last:border-0">
                  <td className="p-3">{invoice.id}</td>
                  <td className="p-3">{invoice.date}</td>
                  <td className="p-3">${invoice.amount}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm capitalize">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
