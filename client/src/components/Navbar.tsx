import React from "react";
import { ShoppingCart, User, Menu, Sun, Moon, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAssetPath } from "@/lib/utils";
import { useLocation, Link } from "wouter";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-border bg-background/80 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Area */}
        <div className="flex items-center group cursor-pointer" onClick={() => setLocation("/")}>
          {theme === "dark" ? (
            <img 
              src={getAssetPath("logos/night-logo.png")} 
              alt="ASG Notes Night" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          ) : (
            <>
              <img 
                src={getAssetPath("logos/logo-mobile.png")} 
                alt="ASG Notes Mobile" 
                className="block md:hidden h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <img 
                src={getAssetPath("logos/logo-pc.png")} 
                alt="ASG Notes PC" 
                className="hidden md:block h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-muted-foreground">
          <Link href="/" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${location === '/' ? 'text-primary font-bold' : ''}`}>
            হোম
          </Link>
          <Link href="/series" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${location === '/series' ? 'text-primary font-bold' : ''}`}>
            সিরিজ
          </Link>
          <Link href="/bundles" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${location === '/bundles' ? 'text-primary font-bold' : ''}`}>
            বান্ডেল
          </Link>
          <Link href="/offers" className="text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full hover:bg-primary/20 transition">
            স্পেশাল অফার
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Switch */}
          <div
            className={`relative w-16 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 flex items-center border ${
              theme === "dark" ? "bg-slate-800 justify-end border-slate-700" : "bg-orange-100 justify-start border-orange-200"
            }`}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            <motion.div
              layout
              className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center z-10"
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              {theme === "dark" ? (
                <Moon size={14} className="text-primary fill-primary" />
              ) : (
                <Sun size={14} className="text-orange-500 fill-orange-500" />
              )}
            </motion.div>
          </div>

          {/* Cart Button */}
          <button className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold border-2 border-background">
              3
            </span>
          </button>

          {/* Login Button */}
          <button className="hidden md:flex items-center gap-2 text-muted-foreground text-sm font-bold border border-border px-5 py-2 rounded-full hover:border-primary hover:text-foreground transition bg-card">
            <User size={16} /> লগইন
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground p-2 bg-card rounded-lg hover:bg-muted transition">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;