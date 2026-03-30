"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Bepul",
      description: "Boshlang'ich uchun",
      price: "0",
      period: "so'm/oy",
      icon: Sparkles,
      features: [
        "1 ta rezyume yaratish",
        "5 ta ish e'loniga ariza",
        "Asosiy profil",
        "Email support",
        "Kompaniyalar katalogi",
      ],
      cta: "Boshlash",
      popular: false,
    },
    {
      name: "Professional",
      description: "Faol ish qidiruvchilar uchun",
      price: "99,000",
      period: "so'm/oy",
      icon: Zap,
      features: [
        "Cheksiz rezyume",
        "Cheksiz arizalar",
        "Professional profil",
        "Priority support",
        "Rezyume review",
        "Intervyu tayyorlik",
        "Karyera maslahat",
      ],
      cta: "Professional tanlash",
      popular: true,
    },
    {
      name: "Kompaniya",
      description: "Kompaniyalar uchun",
      price: "299,000",
      period: "so'm/oy",
      icon: Building2,
      features: [
        "10 ta ish e'loni",
        "Kompaniya profili",
        "Arizalar boshqaruvi",
        "Analytics dashboard",
        "Priority support",
        "API access",
        "Branding options",
      ],
      cta: "Kompaniya uchun",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Orqaga
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Narxlar</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sizning ehtiyojlaringizga mos tarifni tanlang. Barcha tariflarda 14 kunlik bepul sinov mavjud.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-2 border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Eng mashhur
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Savollaringiz bormi?</h2>
          <p className="text-muted-foreground mb-6">
            Bizning jamoamiz sizga yordam berishga tayyor
          </p>
          <Link href="/contact">
            <Button variant="outline">Bog'lanish</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
