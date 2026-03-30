"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Briefcase, Globe, Mail, Phone, CheckCircle } from "lucide-react";

export default function CompaniesPage() {
  const companies = [
    {
      id: "1",
      name: "TechCorp Uzbekistan",
      logo: "/companies/techcorp.png",
      description: "Leading technology company specializing in software development and IT consulting.",
      industry: "Information Technology",
      location: "Tashkent, Uzbekistan",
      employees: "200-500",
      website: "https://techcorp.uz",
      email: "jobs@techcorp.uz",
      phone: "+998 71 123 45 67",
      isVerified: true,
      openJobs: 12,
    },
    {
      id: "2",
      name: "Digital Solutions",
      logo: "/companies/digital.png",
      description: "Digital transformation and innovation company helping businesses grow.",
      industry: "Digital Services",
      location: "Samarkand, Uzbekistan",
      employees: "50-200",
      website: "https://digitalsolutions.uz",
      email: "careers@digitalsolutions.uz",
      phone: "+998 66 234 56 78",
      isVerified: true,
      openJobs: 8,
    },
    {
      id: "3",
      name: "InnovateTech",
      logo: "/companies/innovate.png",
      description: "Innovation hub for startups and technology enthusiasts.",
      industry: "Technology",
      location: "Tashkent, Uzbekistan",
      employees: "20-50",
      website: "https://innovatetech.uz",
      email: "hello@innovatetech.uz",
      phone: "+998 71 345 67 89",
      isVerified: false,
      openJobs: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Kompaniyalar</h1>
        <p className="text-muted-foreground">
          O&apos;zbekistondagi eng yaxshi kompaniyalar bilan tanishing
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {company.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {company.name}
                        {company.isVerified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {company.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {company.employees} xodim
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {company.website}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {company.email}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {company.openJobs} ochiq ish
                  </Badge>
                  <Button size="sm">Batafsil</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
