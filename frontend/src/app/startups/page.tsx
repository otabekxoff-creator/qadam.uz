'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Users, ArrowRight, ArrowLeft, CheckCircle, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StartupsPage() {
  const [showForm, setShowForm] = useState(false);

  const startups = [
    {
      id: 1,
      name: 'EcoTech Solutions',
      description: 'Atrof-muhitni muhofaza qilish uchun aqlli energiya boshqaruv tizimi',
      author: 'Nodirbek Rahimov',
      category: 'Ekotexnologiya',
      stage: 'Idea'
    },
    {
      id: 2,
      name: 'EduPro Platform',
      description: 'Talabalar uchun onlayn o\'qish va karyera rivojlanish platformasi',
      author: 'Malika Karimova',
      category: 'Ta\'lim',
      stage: 'MVP'
    },
    {
      id: 3,
      name: 'MedConnect',
      description: 'Sog\'liqni saqlash sohasida masofaviy konsultatsiya xizmati',
      author: 'Javohir Toxirov',
      category: 'Sog\'liqni saqlash',
      stage: 'Beta'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </Button>
        </Link>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Startuplar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Talabalar va yosh tadbirkorlar o\'z startup loyihalarini yuborib, 
              investorlar va kompaniyalar e\'tiborini jalb qilishlari mumkin
            </p>
          </motion.div>

          {!showForm ? (
            <>
              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center mb-16"
              >
                <Button size="lg" onClick={() => setShowForm(true)}>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Startup Loyihangizni Yuboring
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Faqat ro\'yxatdan o\'tgan talabalar loyiha yubora oladi
                </p>
              </motion.div>

              {/* Startups List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-8 text-center">
                  So\'nggi Startup Loyihalar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {startups.map((startup, index) => (
                    <motion.div
                      key={startup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Rocket className="w-6 h-6 text-primary" />
                        </div>
                        <span className="px-3 py-1 bg-secondary text-xs rounded-full">
                          {startup.stage}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{startup.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {startup.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          <Users className="w-4 h-4 inline mr-1" />
                          {startup.author}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {startup.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* For Companies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center"
              >
                <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-4">
                  Kompaniya sifatida startuplarni kuzatmoqchimisiz?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Ro\'yxatdan o\'ting va talabalar tomonidan yuborilgan eng yangi 
                  startup loyihalarini ko\'ring. Investitsiya imkoniyatlarini kashf eting.
                </p>
                <Link href="/register">
                  <Button>
                    Kompaniya sifatida ro\'yxatdan o\'ting
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </>
          ) : (
            /* Submission Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card rounded-xl p-8 shadow-lg border">
                <h2 className="text-2xl font-bold mb-6">Startup Loyihangizni Yuboring</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loyiha nomi</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      placeholder="Startup nomini kiriting"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Qisqa tavsifi</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border bg-background h-24"
                      placeholder="Loyihangiz haqida qisqacha ma\'lumot..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Soha</label>
                      <select className="w-full px-4 py-2 rounded-lg border bg-background">
                        <option>Texnologiya</option>
                        <option>Ta\'lim</option>
                        <option>Sog\'liqni saqlash</option>
                        <option>Finans</option>
                        <option>Ekotexnologiya</option>
                        <option>Boshqa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bosqich</label>
                      <select className="w-full px-4 py-2 rounded-lg border bg-background">
                        <option>G\'oya</option>
                        <option>MVP</option>
                        <option>Beta</option>
                        <option>Ishga tushirilgan</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Aloqa email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                      Bekor qilish
                    </Button>
                    <Button type="submit" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Yuborish
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
