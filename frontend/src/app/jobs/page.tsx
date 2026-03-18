'use client';

import { useState } from 'react';

export default function JobsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Vakansiyalar</h1>
        
        {loading ? (
          <div className="text-center">
            <p>Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Senior Frontend Developer</h2>
              <p className="text-muted-foreground mb-2">TechCorp Uzbekistan</p>
              <p className="text-muted-foreground mb-4">Toshkent, O'zbekiston</p>
              <p className="mb-4">Bizga React, Next.js va TypeScript bo'yicha tajribali Senior Frontend Developer kerak.</p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                Batafsilat
              </button>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Product Manager</h2>
              <p className="text-muted-foreground mb-2">StartupHub</p>
              <p className="text-muted-foreground mb-4">Remote</p>
              <p className="mb-4">Innovativ startap uchun Product Manager kerak. Agile metodologiyada ishlash tajribasi.</p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                Batafsilat
              </button>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">UX/UI Designer</h2>
              <p className="text-muted-foreground mb-2">Design Studio Pro</p>
              <p className="text-muted-foreground mb-4">Samarqand</p>
              <p className="mb-4">Zamonaviy va foydalanuvchi dizaynlar yaratish uchun UX/UI Designer kerak.</p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                Batafsilat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
