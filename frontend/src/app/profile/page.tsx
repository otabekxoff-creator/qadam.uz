'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Camera, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, student, company, token, isAuthenticated, updateStudent, updateCompany } = useAuthStore();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', university: '', major: '', gpa: '', about: '', skills: '',
    companyName: '', description: '', industry: '', website: '', location: '', size: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user?.role === 'STUDENT' && student) {
      setFormData(prev => ({ ...prev, firstName: student.firstName || '', lastName: student.lastName || '', phone: student.phone || '', university: student.university || '', major: student.major || '', gpa: student.gpa?.toString() || '', about: student.about || '', skills: student.skills?.join(', ') || '' }));
    } else if (user?.role === 'COMPANY' && company) {
      setFormData(prev => ({ ...prev, companyName: company.name || '', description: company.description || '', industry: company.industry || '', website: company.website || '', location: company.location || '', size: company.size || '' }));
    }
  }, [user, student, company, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const submitData = new FormData();
      
      if (user?.role === 'STUDENT') {
        submitData.append('firstName', formData.firstName);
        submitData.append('lastName', formData.lastName);
        if (formData.phone) submitData.append('phone', formData.phone);
        if (formData.university) submitData.append('university', formData.university);
        if (formData.major) submitData.append('major', formData.major);
        if (formData.gpa) submitData.append('gpa', formData.gpa);
        if (formData.about) submitData.append('about', formData.about);
        if (formData.skills) submitData.append('skills', formData.skills);
        if (avatarFile) submitData.append('avatar', avatarFile);
      } else {
        submitData.append('companyName', formData.companyName);
        if (formData.description) submitData.append('description', formData.description);
        if (formData.industry) submitData.append('industry', formData.industry);
        if (formData.website) submitData.append('website', formData.website);
        if (formData.location) submitData.append('location', formData.location);
        if (formData.size) submitData.append('size', formData.size);
        if (avatarFile) submitData.append('logo', avatarFile);
      }

      // To'g'ridan-to'g'ri Express API'ga jo'natamiz
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitData, // FormData content-type'ni o'zi avtomatik sozlaydi
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Saqlashda xatolik');

      // Update Zustand state
      if (user?.role === 'STUDENT') {
        updateStudent(data.data);
      } else if (user?.role === 'COMPANY') {
        updateCompany(data.data);
      }
      
      toast({ title: 'Muvaffaqiyatli!', description: 'Profil yangilandi' });
      setIsEditing(false);
      setAvatarFile(null);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Xatolik', description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted || !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  const isStudent = user.role === 'STUDENT';
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
  const displayAvatar = avatarFile ? URL.createObjectURL(avatarFile) : 
    (isStudent ? (student?.avatar ? `${baseUrl}${student.avatar}` : '') : (company?.logo ? `${baseUrl}${company.logo}` : ''));

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Profil</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6 text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4 border shadow-sm">
                <AvatarImage src={displayAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-3xl">
                  {isStudent ? formData.firstName?.[0] : formData.companyName?.[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div>
                  <Label htmlFor="avatar-upload" className="cursor-pointer flex items-center justify-center gap-2 text-sm border p-2 rounded-md hover:bg-muted transition-colors">
                    <Camera className="h-4 w-4" /> Rasm yuklash
                  </Label>
                  <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
                </div>
              )}
              <div className="mt-4">
                <Badge className="bg-emerald-100 text-emerald-700">{isStudent ? 'Talaba' : 'Kompaniya'}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isStudent ? "Shaxsiy ma'lumotlar" : "Kompaniya ma'lumotlari"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isStudent ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Ism</Label><Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} disabled={!isEditing} required /></div>
                    <div className="space-y-2"><Label>Familiya</Label><Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} disabled={!isEditing} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Email</Label><Input value={user.email} disabled className="bg-muted" /></div>
                    <div className="space-y-2"><Label>Telefon</Label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Universitet</Label><Input value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} disabled={!isEditing} /></div>
                    <div className="space-y-2"><Label>Yo'nalish</Label><Input value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} disabled={!isEditing} /></div>
                  </div>
                  <div className="space-y-2"><Label>O'zim haqimda</Label><Textarea value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} disabled={!isEditing} /></div>
                  <div className="space-y-2"><Label>Ko'nikmalar (Vergul bilan ajrating)</Label><Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} disabled={!isEditing} placeholder="React, Node.js" /></div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Kompaniya nomi</Label><Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} disabled={!isEditing} required /></div>
                    <div className="space-y-2"><Label>Soha</Label><Input value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} disabled={!isEditing} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Manzil</Label><Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} disabled={!isEditing} /></div>
                    <div className="space-y-2"><Label>Veb-sayt</Label><Input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} disabled={!isEditing} /></div>
                  </div>
                  <div className="space-y-2"><Label>Kompaniya haqida</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} disabled={!isEditing} /></div>
                </>
              )}

              {isEditing && (
                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white mt-4" disabled={isSaving}>
                  {isSaving ? <Loader2 className="mr-2 animate-spin" /> : 'Saqlash'}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Tahrirlash tugmasi */}
          <div className="lg:col-span-2">
            <Button variant={isEditing ? 'default' : 'outline'} onClick={() => setIsEditing(!isEditing)} className={isEditing ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : ''}>
              {isEditing ? <><Save className="h-4 w-4 mr-2" /> Bekor qilish</> : <><Edit2 className="h-4 w-4 mr-2" /> Tahrirlash</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
