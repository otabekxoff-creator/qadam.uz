'use client';

import { useState } from 'react';

export default function JobsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Vakansiyalar</h1>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Senior Frontend Developer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">TechCorp Uzbekistan</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Toshkent, O'zbekiston</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Bizga React, Next.js va TypeScript bo'yicha tajribali Senior Frontend Developer kerak.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Batafsilat
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Product Manager</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">StartupHub</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Remote</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Innovativ startap uchun Product Manager kerak. Agile metodologiyada ishlash tajribasi.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Batafsilat
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">UX/UI Designer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Design Studio Pro</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Samarqand</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Zamonaviy va foydalanuvchi dizaynlar yaratish uchun UX/UI Designer kerak.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Batafsilat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
