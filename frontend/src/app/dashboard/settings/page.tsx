"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sozlamalar</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" /> Profil
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" /> Kompaniya
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" /> Bildirishnomalar
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" /> Xavfsizlik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil ma&apos;lumotlari</CardTitle>
              <CardDescription>Shaxsiy ma&apos;lumotlaringizni yangilang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Rasm yuklash</Button>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ism</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Familiya</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="+998 90 123 45 67" />
              </div>

              <Button disabled={isLoading}>Saqlash</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Kompaniya ma&apos;lumotlari</CardTitle>
              <CardDescription>Kompaniya profilini yangilang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Kompaniya nomi</Label>
                <Input id="companyName" placeholder="ACME Corp" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Kompaniya haqida..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Veb-sayt</Label>
                <Input id="website" placeholder="https://example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Joylashuv</Label>
                <Input id="location" placeholder="Toshkent, O'zbekiston" />
              </div>

              <Button disabled={isLoading}>Saqlash</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirishnoma sozlamalari</CardTitle>
              <CardDescription>Qanday bildirishnomalarni olishni tanlang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Yangi ish e'lonlari", desc: "Sizga mos keladigan yangi ishlar" },
                { label: "Ariza holati o'zgarishi", desc: "Arizalaringiz holati o'zgarganda" },
                { label: "Xabarlar", desc: "Yangi xabarlar kelganda" },
                { label: "Tizim yangiliklari", desc: "Platforma yangiliklari va yangilanishlari" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              ))}
              <Button className="mt-4">Saqlash</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Parolni o'zgartirish</CardTitle>
              <CardDescription>Hisob xavfsizligini ta'minlash uchun parolingizni muntazam yangilang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Joriy parol</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Yangi parol</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button disabled={isLoading}>Parolni yangilash</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
