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
    <footer className="border-t border-border bg-background/50 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-6 group">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-600 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <GraduationCap className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-sm text-sm sm:text-lg leading-relaxed">
              O'zbekiston yoshlari uchun innovatsion platforma. 
              Kelajagingizni biz bilan birga quring.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 sm:p-3 rounded-full glass border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">Platforma</h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors group text-sm sm:text-base inline-flex items-center"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 flex-shrink-0 mr-2" />
                    <span className="flex-shrink-0">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">Kompaniya</h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors group text-sm sm:text-base inline-flex items-center"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 flex-shrink-0 mr-2" />
                    <span className="flex-shrink-0">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">Yordam</h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors group text-sm sm:text-base inline-flex items-center"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 flex-shrink-0 mr-2" />
                    <span className="flex-shrink-0">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Sinergiya. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 text-center sm:text-left">
            <a href="mailto:info@sinergiya.uz" className="text-xs sm:text-sm text-muted-foreground hover:text-primary flex items-center gap-2 justify-center">
              <Mail size={14} className="sm:size-[16px]" /> info@sinergiya.uz
            </a>
            <a href="tel:+998880016777" className="text-xs sm:text-sm text-muted-foreground hover:text-primary flex items-center gap-2 justify-center">
              <Phone size={14} className="sm:size-[16px]" /> +998 88 001 67 77
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
