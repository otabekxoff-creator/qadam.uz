"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, Building2, AlertCircle } from "lucide-react";
import { authApi } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const { setUser, setTokens } = useAuthStore();

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.register({
        ...studentForm,
        role: "STUDENT",
      });
      
      if (response.success) {
        setUser(response.data.user);
        setTokens(response.data.token, response.data.refreshToken);
        router.push("/dashboard");
      } else {
        setError(response.message || "Ro'yxatdan o'tish muvaffaqiyatsiz");
      }
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.register({
        email: companyForm.email,
        password: companyForm.password,
        role: "COMPANY",
        companyName: companyForm.companyName,
      });
      
      if (response.success) {
        setUser(response.data.user);
        setTokens(response.data.token, response.data.refreshToken);
        router.push("/dashboard");
      } else {
        setError(response.message || "Ro'yxatdan o'tish muvaffaqiyatsiz");
      }
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Ro&apos;yxatdan o&apos;tish</CardTitle>
            <CardDescription>
              Hisobingizni yarating yoki{" "}
              <Link href="/login" className="text-primary hover:underline">
              kiring
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="gap-2">
                  <User size={16} /> Talaba
                </TabsTrigger>
                <TabsTrigger value="company" className="gap-2">
                  <Building2 size={16} /> Kompaniya
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ism</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Ali" 
                        required 
                        value={studentForm.firstName}
                        onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Familiya</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Valiyev" 
                        required 
                        value={studentForm.lastName}
                        onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Parol</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        required
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Yaratilmoqda..." : "Hisob yaratish"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="company">
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Kompaniya nomi</Label>
                    <Input 
                      id="companyName" 
                      placeholder="ACME Corp" 
                      required 
                      value={companyForm.companyName}
                      onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyEmail"
                        type="email"
                        placeholder="company@example.com"
                        className="pl-10"
                        required
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyPassword">Parol</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        required
                        value={companyForm.password}
                        onChange={(e) => setCompanyForm({ ...companyForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Yaratilmoqda..." : "Kompaniya hisobi yaratish"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                ← Bosh sahifaga qaytish
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
