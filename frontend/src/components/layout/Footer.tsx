'use client';

import Link from 'next/link';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';

// =============================================
// Footer Links
// =============================================

const footerLinks = {
  platform: [
    { label: 'Ishlar', href: '/jobs' },
    { label: 'Startaplar', href: '/startups' },
    { label: 'Kompaniyalar', href: '/companies' },
    { label: 'Talabalar', href: '/students' },
  ],
  company: [
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Aloqa', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Karyera', href: '/careers' },
  ],
  support: [
    { label: 'Yordam markazi', href: '/help' },
    { label: 'Ko\'p so\'raladigan savollar', href: '/faq' },
    { label: 'Maxfiylik siyosati', href: '/privacy' },
    { label: 'Foydalanish shartlari', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

// =============================================
// Footer Component
// =============================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-600 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                Step.uz
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm text-lg leading-relaxed">
              O'zbekiston yoshlari uchun innovatsion platforma. 
              Kelajagingizni biz bilan birga quring.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-full glass border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground">Platforma</h3>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground">Kompaniya</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground">Yordam</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Step.uz. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-8">
            <a href="mailto:info@step.uz" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
              <Mail size={16} /> info@step.uz
            </a>
            <a href="tel:+998880016777" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
              <Phone size={16} /> +998 88 001 67 77
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
