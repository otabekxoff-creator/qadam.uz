'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { contactConfig } from '@/config/contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 dark:from-background dark:via-background dark:to-secondary/10">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-glow-lg">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            <span className="text-gradient">Aloqa</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Biz bilan bog'laning va savollaringizga javob oling
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground mb-2">+998 88 001 67 77</p>
                <p className="text-muted-foreground">Ish vaqti: 9:00 - 18:00</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground mb-2">info@step.uz</p>
                <p className="text-muted-foreground">24/7 javob beramiz</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Manzil</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg text-foreground mb-2">Toshkent, Shayxontohur tumani</p>
              <p className="text-muted-foreground">Bunyodkor ko'chasi, 15-uy</p>
              <Button className="mt-6 group" variant="outline">
                Xaritada ko'rish
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                Telefon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => window.location.href = `tel:${contactConfig.phone}`}
              >
                <Phone className="h-4 w-4 mr-2" />
                {contactConfig.phone}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = `mailto:${contactConfig.email}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                {contactConfig.email}
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                Manzil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {contactConfig.address.full}
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Koordinatalar:</strong><br />
                  {contactConfig.address.coordinates.dms}<br />
                  {contactConfig.address.coordinates.decimal}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ish vaqti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p><strong>{contactConfig.workingHours.weekdays}</strong></p>
                <p><strong>{contactConfig.workingHours.saturday}</strong></p>
              </div>
              <div>
                <p><strong>{contactConfig.workingHours.sunday}</strong></p>
                <p><strong>{contactConfig.workingHours.timezone}</strong></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
