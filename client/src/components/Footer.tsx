import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getAssetPath } from "@/lib/utils";
import { Link } from "wouter";
import { Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-muted/50 border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* 1. Brand Info & Contact */}
          <div className="space-y-6 md:col-span-2">
            {/* Logo */}
            <Link href="/" className="block w-fit">
              <img 
                src={getAssetPath(theme === "dark" ? "logos/night-logo.png" : "logos/logo-pc.png")} 
                alt="ASG Notes" 
                className="h-10 w-auto object-contain" 
              />
            </Link>
            
            <p className="text-muted-foreground text-sm font-medium">
              Make Study Easier
            </p>

            {/* Contact Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-muted-foreground text-sm group">
                <div className="p-2 rounded-full bg-background border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div className="mt-1.5">
                  <span className="font-bold text-foreground block mb-0.5">Address:</span>
                  <p className="leading-relaxed">House No - 1332, Flat A/5, Avenue 2,<br/> Mirpur DOHS, Dhaka 1216</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground text-sm group">
                <div className="p-2 rounded-full bg-background border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <span className="font-bold text-foreground inline-block mr-2">Phone:</span>
                  <span className="font-mono">+8801918000955</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground text-sm group">
                <div className="p-2 rounded-full bg-background border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                   <span className="font-bold text-foreground inline-block mr-2">Email:</span>
                   <span>support@asgcompressnote.com</span>
                </div>
              </div>
            </div>

            {/* Social Media Icons with Glassy Glow Effect */}
            <div className="flex gap-4 pt-4">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/asgcompressnote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-background border border-border transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Facebook size={20} className="relative z-10 text-muted-foreground group-hover:text-blue-600 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/8801918000955" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-background border border-border transition-all duration-300 hover:-translate-y-1 hover:border-green-500/50"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MessageCircle size={20} className="relative z-10 text-muted-foreground group-hover:text-green-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Home</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* 3. Services */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm font-medium">
              <li>
                <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Complain</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Find/Recover My Account/Books</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border pt-8 mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} <span className="font-bold text-foreground">ASG Compressed Note</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;