'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { contactConfig } from '@/config/contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white">
              <MessageCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Aloqa</h1>
          <p className="text-lg text-muted-foreground">
            Biz bilan bog'laning va savollaringizga javob oling
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
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
