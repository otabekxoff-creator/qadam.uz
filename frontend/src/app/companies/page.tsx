'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, Building2, MapPin, Users, Filter, X,
  ArrowRight, Globe, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Company } from '@/types';

// =============================================
// Mock Data
// =============================================

const mockCompanies: Company[] = [
  {
    id: '1',
    userId: '1',
    name: 'TechPark',
    logo: undefined,
    description: 'O\'zbekistondagi eng yirik IT kompaniya. Zamonaviy texnologiyalar yordamida innovatsion yechimlar yaratamiz.',
    website: 'https://techpark.uz',
    city: 'Toshkent',
    industry: 'IT',
    companySize: '201-500',
    isVerified: true,
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Yillik ta\'til', 'O\'quv kurslari'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    name: 'Uzum',
    logo: undefined,
    description: 'O\'zbekistondagi eng yirik e-commerce platformasi. Onlayn savdo va yetkazib berish xizmatlari.',
    website: 'https://uzum.uz',
    city: 'Toshkent',
    industry: 'E-commerce',
    companySize: '501-1000',
    isVerified: true,
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Sport zal', 'Bepul ovqat'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: '3',
    name: 'Kapital Bank',
    logo: undefined,
    description: 'O\'zbekistondagi yetakchi banklardan biri. Zamonaviy bank xizmatlari va innovatsion yechimlar.',
    website: 'https://kapitalbank.uz',
    city: 'Toshkent',
    industry: 'Banking',
    companySize: '1000+',
    isVerified: true,
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Pensiya fondi', 'Bonuslar'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    userId: '4',
    name: 'Payme',
    logo: undefined,
    description: 'To\'lov tizimlari va moliyaviy texnologiyalar sohasida yetakchi kompaniya.',
    website: 'https://payme.uz',
    city: 'Toshkent',
    industry: 'Fintech',
    companySize: '201-500',
    isVerified: true,
    benefits: ['Ish vaqti moslashuvchan', 'Stock optsionlar', 'O\'quv byudjeti'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    userId: '5',
    name: 'Yandex Uzbekistan',
    logo: undefined,
    description: 'Qidiruv tizimlari, xaritalar va boshqa IT xizmatlar. O\'zbekiston bozori uchun maxsus yechimlar.',
    website: 'https://yandex.uz',
    city: 'Toshkent',
    industry: 'IT',
    companySize: '51-200',
    isVerified: true,
    benefits: ['Ish vaqti moslashuvchan', 'Sog\'liqni saqlash sug\'urtasi', 'Konferensiyalar'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    userId: '6',
    name: 'TBC Bank',
    logo: undefined,
    description: 'Gruziyaning yetakchi banki O\'zbekiston bozorida. Zamonaviy bank xizmatlari.',
    website: 'https://tbcbank.uz',
    city: 'Toshkent',
    industry: 'Banking',
    companySize: '201-500',
    isVerified: true,
    benefits: ['Xalqaro tajriba', 'Sog\'liqni saqlash sug\'urtasi', 'Karyera o\'sishi'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    userId: '7',
    name: 'Udevs',
    logo: undefined,
    description: 'Outsourcing va software development kompaniya. Web va mobil ilovalar yaratish.',
    website: 'https://udevs.io',
    city: 'Toshkent',
    industry: 'IT',
    companySize: '51-200',
    isVerified: false,
    benefits: ['Ish vaqti moslashuvchan', 'Masofaviy ish', 'O\'quv kurslari'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    userId: '8',
    name: 'Beeline Uzbekistan',
    logo: undefined,
    description: 'Telekommunikatsiya xizmatlari. Mobil aloqa va internet provayder.',
    website: 'https://beeline.uz',
    city: 'Toshkent',
    industry: 'Telecommunications',
    companySize: '1000+',
    isVerified: true,
    benefits: ['Sog\'liqni saqlash sug\'urtasi', 'Mobil aloqa chegirmalari', 'Karyera dasturlari'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// =============================================
// Constants
// =============================================

const industries = ['IT', 'E-commerce', 'Fintech', 'Banking', 'Telecommunications', 'Education', 'Healthcare'];
const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon'];

// =============================================
// Helper Functions
// =============================================

const companySizeLabels: Record<string, string> = {
  '1-10': '1-10 xodim',
  '11-50': '11-50 xodim',
  '51-200': '51-200 xodim',
  '201-500': '201-500 xodim',
  '501-1000': '501-1000 xodim',
  '1000+': '1000+ xodim',
};

// =============================================
// Company Card Component
// =============================================

function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  company.name[0]
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{company.name}</p>
                  {company.isVerified && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{company.industry}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {company.description}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{company.city}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{companySizeLabels[company.companySize || '1-10']}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-wrap gap-1">
              {company.benefits?.slice(0, 2).map((benefit) => (
                <Badge key={benefit} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {company.benefits && company.benefits.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{company.benefits.length - 2}
                </Badge>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

// =============================================
// Filter Panel Component
// =============================================

interface Filters {
  search: string;
  industries: string[];
  companySizes: string[];
  cities: string[];
  isVerified: boolean;
}

function FilterPanel({ 
  filters, 
  setFilters 
}: { 
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const clearFilters = () => {
    setFilters({
      search: '',
      industries: [],
      companySizes: [],
      cities: [],
      isVerified: false,
    });
  };

  const hasActiveFilters = filters.industries.length > 0 || 
    filters.companySizes.length > 0 || 
    filters.cities.length > 0 || 
    filters.isVerified;

  return (
    <div className="space-y-6">
      {/* Industry */}
      <div>
        <h4 className="font-medium mb-3">Soxa</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={`ind-${industry}`}
                checked={filters.industries.includes(industry)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    industries: checked
                      ? [...prev.industries, industry]
                      : prev.industries.filter((i) => i !== industry),
                  }));
                }}
              />
              <Label htmlFor={`ind-${industry}`} className="text-sm font-normal cursor-pointer">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Company Size */}
      <div>
        <h4 className="font-medium mb-3">Kompaniya hajmi</h4>
        <div className="space-y-2">
          {companySizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.companySizes.includes(size)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    companySizes: checked
                      ? [...prev.companySizes, size]
                      : prev.companySizes.filter((s) => s !== size),
                  }));
                }}
              />
              <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                {companySizeLabels[size]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* City */}
      <div>
        <h4 className="font-medium mb-3">Shahar</h4>
        <div className="space-y-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={filters.cities.includes(city)}
                onCheckedChange={(checked: boolean) => {
                  setFilters((prev) => ({
                    ...prev,
                    cities: checked
                      ? [...prev.cities, city]
                      : prev.cities.filter((c) => c !== city),
                  }));
                }}
              />
              <Label htmlFor={`city-${city}`} className="text-sm font-normal cursor-pointer">
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Verified */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={filters.isVerified}
          onCheckedChange={(checked: boolean) => {
            setFilters((prev) => ({
              ...prev,
              isVerified: checked,
            }));
          }}
        />
        <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
          Faqat tasdiqlangan
        </Label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Filtrlarni tozalash
        </Button>
      )}
    </div>
  );
}

// =============================================
// Main Companies Page
// =============================================

export default function CompaniesPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    industries: [],
    companySizes: [],
    cities: [],
    isVerified: false,
  });

  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((company) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(search);
        const matchesDescription = company.description?.toLowerCase().includes(search);
        if (!matchesName && !matchesDescription) return false;
      }

      // Industry filter
      if (filters.industries.length > 0 && company.industry && 
          !filters.industries.includes(company.industry)) {
        return false;
      }

      // Company size filter
      if (filters.companySizes.length > 0 && company.companySize && 
          !filters.companySizes.includes(company.companySize)) {
        return false;
      }

      // City filter
      if (filters.cities.length > 0 && company.city && 
          !filters.cities.includes(company.city)) {
        return false;
      }

      // Verified filter
      if (filters.isVerified && !company.isVerified) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = filters.industries.length + 
    filters.companySizes.length + 
    filters.cities.length + 
    (filters.isVerified ? 1 : 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-cyan-50 via-blue-50 to-background dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Kompaniyalar
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O&apos;zbekistondagi eng yaxshi kompaniyalarni kashf eting va ular bilan ishlash imkoniyatini qo&apos;lga kiriting
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Kompaniya nomi bo'yicha qidiring..."
                  value={filters.search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 md:hidden relative">
                    <Filter className="h-5 w-5" />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                    <SheetDescription>
                      Kompaniyalarni filtrlash orqali qidiring
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="font-semibold">Filtrlar</h3>
                </CardHeader>
                <CardContent>
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </CardContent>
              </Card>
            </aside>

            {/* Companies Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredCompanies.length}</span> ta kompaniya topildi
                </p>
                <Select defaultValue="name">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Saralash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nom bo&apos;yicha</SelectItem>
                    <SelectItem value="size">Hajm bo&apos;yicha</SelectItem>
                    <SelectItem value="newest">Eng yangi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Companies */}
              {filteredCompanies.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {filteredCompanies.map((company, index) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CompanyCard company={company} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Kompaniya topilmadi</h3>
                  <p className="text-muted-foreground mb-4">
                    Filtrlarni o&apos;zgartirib qayta urinib ko&apos;ring
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setFilters({
                      search: '',
                      industries: [],
                      companySizes: [],
                      cities: [],
                      isVerified: false,
                    })}
                  >
                    Filtrlarni tozalash
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
