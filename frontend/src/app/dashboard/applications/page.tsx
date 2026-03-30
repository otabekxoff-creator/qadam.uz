"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { applicationsApi } from "@/services/api";
import { Application } from "@/types";

const statusConfig = {
  PENDING: { label: "Kutilmoqda", color: "bg-yellow-500", icon: Clock },
  REVIEWING: { label: "Ko'rib chiqilmoqda", color: "bg-blue-500", icon: Eye },
  INTERVIEW: { label: "Intervyu", color: "bg-purple-500", icon: Eye },
  OFFERED: { label: "Taklif", color: "bg-green-500", icon: CheckCircle },
  REJECTED: { label: "Rad etilgan", color: "bg-red-500", icon: XCircle },
  HIRED: { label: "Ishga olingan", color: "bg-green-600", icon: CheckCircle },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsApi.getMy();
      if (response.success) {
        setApplications(response.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedApplications = {
    all: applications,
    pending: applications.filter((a) => a.status === "PENDING"),
    reviewing: applications.filter((a) => ["REVIEWING", "INTERVIEW"].includes(a.status)),
    final: applications.filter((a) => ["OFFERED", "REJECTED", "HIRED"].includes(a.status)),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Arizalarim</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Barcha ({groupedApplications.all.length})</TabsTrigger>
          <TabsTrigger value="pending">Kutilmoqda ({groupedApplications.pending.length})</TabsTrigger>
          <TabsTrigger value="reviewing">Ko&apos;rib chiqish ({groupedApplications.reviewing.length})</TabsTrigger>
          <TabsTrigger value="final">Yakunlangan ({groupedApplications.final.length})</TabsTrigger>
        </TabsList>

        {["all", "pending", "reviewing", "final"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {isLoading ? (
              <div className="text-center py-8">Yuklanmoqda...</div>
            ) : groupedApplications[tab as keyof typeof groupedApplications].length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Hozircha arizalar yo&apos;q</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {groupedApplications[tab as keyof typeof groupedApplications].map((app, index) => {
                  const config = statusConfig[app.status as keyof typeof statusConfig];
                  const StatusIcon = config?.icon || Clock;

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{app.job?.title}</CardTitle>
                              <CardDescription>{app.job?.company?.name}</CardDescription>
                            </div>
                            <Badge className={`${config?.color} text-white`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {config?.label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {app.coverLetter && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {app.coverLetter}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Ariza sanasi: {new Date(app.createdAt).toLocaleDateString("uz-UZ")}</span>
                            <Button variant="outline" size="sm">
                              Batafsil
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
