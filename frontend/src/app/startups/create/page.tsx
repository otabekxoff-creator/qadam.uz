'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Rocket, Users, DollarSign, Target, Calendar, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores';

export default function CreateStartupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, student } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    stage: 'IDEA',
    fundingGoal: '',
    teamSize: '',
    website: '',
    pitch: '',
    lookingFor: '',
    timeline: ''
  });

  const industries = [
    'Fintech', 'Edtech', 'Healthcare', 'E-commerce', 'SaaS',
    'AI/ML', 'Blockchain', 'IoT', 'Gaming', 'Social Media',
    'Transportation', 'Energy', 'Agriculture', 'Real Estate', 'Other'
  ];

  const stages = [
    { value: 'IDEA', label: 'Goya bosqichi' },
    { value: 'PROTOTYPE', label: 'Prototip' },
    { value: 'MVP', label: 'MVP' },
    { value: 'GROWTH', label: "O'sish bosqichi" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fayl hajmi katta",
          description: "Fayl hajmi 5MB dan oshmasligi kerak",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      
      // Basic info
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('industry', formData.industry);
      submitData.append('stage', formData.stage);
      submitData.append('fundingGoal', formData.fundingGoal);
      submitData.append('teamSize', formData.teamSize);
      submitData.append('website', formData.website);
      submitData.append('pitch', formData.pitch);
      submitData.append('lookingFor', formData.lookingFor);
      submitData.append('timeline', formData.timeline);
      
      // Student info
      submitData.append('studentId', student?.id || '');
      submitData.append('founderName', `${student?.firstName} ${student?.lastName}`);
      submitData.append('founderEmail', user?.email || '');
      submitData.append('founderUniversity', student?.university || '');
      
      // Logo/Image
      if (uploadedFile) {
        submitData.append('logo', uploadedFile);
      }

      const response = await fetch('/api/startups', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: submitData
      });

      if (!response.ok) {
        throw new Error('Startap yaratishda xatolik');
      }

      const result = await response.json();
      
      toast({
        title: "Muvaffaqiyatli!",
        description: "Startap loyihasi muvaffaqiyatli yaratildi",
      });

      router.push(`/startups/${result.data.id}`);
      
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Startap yaratishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Orqaga
            </Button>
            <h1 className="text-2xl font-bold">Yangi Startap Yaratish</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Asosiy ma'lumotlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Startap nomi *</Label>
                  <Input
                    id="name"
                    placeholder="Misol: TechEdu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Soha *</Label>
                  <select
                    id="industry"
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                  >
                    <option value="">Sohani tanlang</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif *</Label>
                <Textarea
                  id="description"
                  placeholder="Startapingiz haqida qisqacha tavsif..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pitch">Pitch (qisqa taqdimot)</Label>
                <Textarea
                  id="pitch"
                  placeholder="Investorlarga 30 sekundda ayta oladigan pitch..."
                  rows={3}
                  value={formData.pitch}
                  onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stage & Funding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Bosqich va moliyaviy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stage">Hozirgi bosqich *</Label>
                  <select
                    id="stage"
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    required
                  >
                    {stages.map(stage => (
                      <option key={stage.value} value={stage.value}>{stage.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingGoal">Moliyaviy maqsad</Label>
                  <Input
                    id="fundingGoal"
                    placeholder="Misol: $50,000"
                    value={formData.fundingGoal}
                    onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Jamoa hajmi</Label>
                  <select
                    id="teamSize"
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  >
                    <option value="">Jamoa hajmi</option>
                    <option value="1">1</option>
                    <option value="2-3">2-3</option>
                    <option value="4-5">4-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11+">11+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Veb-sayt</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Jamoa va talablar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lookingFor">Qidirayotgan jamoa a'zolari</Label>
                <Textarea
                  id="lookingFor"
                  placeholder="Qanday mutaxassislarni qidiryapsiz? (Misol: Frontend developer, UX designer...)"
                  rows={3}
                  value={formData.lookingFor}
                  onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Vaqt reja</Label>
                <Textarea
                  id="timeline"
                  placeholder="Keyin 6 oyda qanday maqsadlarga erishishni rejalashtiraysiz?"
                  rows={3}
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Logo yuklash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preview ? (
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Logo preview"
                      className="h-24 w-24 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={removeFile}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        Logo yuklash (ixtiyoriy)
                      </span>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              className="bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Yaratilmoqda...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Startap yaratish
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
