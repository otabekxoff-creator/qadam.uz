'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Save, Eye, EyeOff, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    if (user) {
      let firstName = '';
      let lastName = '';
      let phone = '';
      
      if (user.role === 'STUDENT' && (user as any).student) {
        const student = (user as any).student;
        firstName = student.firstName || '';
        lastName = student.lastName || '';
        phone = student.phone || '';
      } else if (user.role === 'COMPANY' && (user as any).company) {
        const company = (user as any).company;
        // For company, we might want to show company name in firstName field or handle differently
        // For now, we'll leave firstName/lastName empty and maybe show company name elsewhere
        phone = company.phone || '';
      } else if (user.role === 'ADMIN') {
        // Admin might not have firstName/lastName in the base user object
        // We'll leave them empty for now
      }
      
      setFormData({
        firstName,
        lastName,
        email: user.email || '',
        phone,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

   const handleSave = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);

     try {
       // Simulate API call
       await new Promise(resolve => setTimeout(resolve, 1000));
       
       // Update user in store based on role
       if (user) {
         if (user.role === 'STUDENT' && (user as any).student) {
           // Update student profile
           setUser(
             {
               ...user,
               email: formData.email,
             },
             {
               ...(user as any).student,
               firstName: formData.firstName,
               lastName: formData.lastName,
               phone: formData.phone,
             } as Student,
             undefined // company remains unchanged
           );
         } else if (user.role === 'COMPANY' && (user as any).company) {
           // Update company profile
           setUser(
             {
               ...user,
               email: formData.email,
             },
             undefined, // student remains unchanged
             {
               ...(user as any).company,
               phone: formData.phone,
               // For company, we might want to update name in firstName/lastName fields
               // but let's keep it simple and just update phone for now
             } as Company
           );
         } else if (user.role === 'ADMIN') {
           // Update admin user (if admin has firstName/lastName in base user object)
           setUser(
             {
               ...user,
               email: formData.email,
               firstName: formData.firstName,
               lastName: formData.lastName,
             },
             undefined, // student
             undefined  // company
           );
         } else {
           // Fallback - just update base user fields
           setUser(
             {
               ...user,
               email: formData.email,
             },
             undefined, // student
             undefined  // company
           );
         }
       }

       toast.success('Sozlamalar saqlandi!');
     } catch (error) {
       toast.error('Sozlamalarni saqlashda xatolik yuz berdi');
     } finally {
       setIsLoading(false);
     }
   };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Parol muvaffaqiyatli o\'zgartirildi!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Parolni o\'zgartirishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPrivacyPolicy = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '/documents/privacy-policy.pdf';
    link.download = 'maxfiylik-siyosati.pdf';
    link.click();
    toast.success('Maxfiylik siyosati yuklanmoqda...');
  };

  const downloadTerms = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '/documents/terms-of-service.pdf';
    link.download = 'foydalanish-shartlari.pdf';
    link.click();
    toast.success('Foydalanish shartlari yuklanmoqda...');
  };

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
              <User className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Sozlamalar</h1>
          <p className="text-lg text-muted-foreground">
            Profil ma'lumotlari va xavfsizlik sozlamalari
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profil ma'lumotlari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  Profil ma'lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ism</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Ismingiz"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Familiya</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Familiyangiz"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email manzilingiz"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+998 XX XXX XX XX"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Saqlanmoqda...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Saqlash
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Xavfsizlik sozlamalari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Parolni o'zgartirish */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-primary" />
                  Parolni o'zgartirish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Joriy parol</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        placeholder="Joriy parolingiz"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yangi parol</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        placeholder="Yangi parol"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Parolni tasdiqlash</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Parolni qayta kiriting"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        O'zgartirilmoqda...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Parolni o'zgartirish
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Hujjatlar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  Hujjatlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Platforma hujjatlarini PDF formatida yuklab olishingiz mumkin
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={downloadPrivacyPolicy}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Maxfiylik siyosati (PDF)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={downloadTerms}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Foydalanish shartlari (PDF)
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
