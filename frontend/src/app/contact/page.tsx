'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
                onClick={() => window.location.href = 'tel:+998880016777'}
              >
                <Phone className="h-4 w-4 mr-2" />
                +998 88 001 6777
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
                onClick={() => window.location.href = 'mailto:info@step.uz'}
              >
                <Mail className="h-4 w-4 mr-2" />
                info@step.uz
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
              <p className="text-muted-foreground">
                Farg'ona viloyati, O'zbekiston tumani<br />
                Ziyokor ko'chasi
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Koordinatalar:</strong><br />
                  40°22'30.3"N 70°48'42.7"E<br />
                  40.37509, 70.81185
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
                <p><strong>Dushanba - Juma:</strong> 09:00 - 18:00</p>
                <p><strong>Shanba:</strong> 10:00 - 16:00</p>
              </div>
              <div>
                <p><strong>Yakshanba:</strong> Dam olish kuni</p>
                <p><strong>Toshkent vaqti:</strong> UTC+5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
