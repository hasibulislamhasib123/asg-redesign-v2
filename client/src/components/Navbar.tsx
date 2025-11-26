import React, { useState } from "react";
import { ShoppingCart, User, Sun, Moon, Home, BookOpen, Package, UserCircle, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAssetPath } from "@/lib/utils";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog"; // AuthDialog component import for authentication functionality

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  
  // Authentication state management: Currently false, will be dynamically updated through proper auth service
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Helper function: Determines if the current route matches the provided path for active state styling
  const isActive = (path: string) => location === path;

  const handleLogin = () => {
    // Login event handler: Updates authentication state and closes login modal
    setIsLoggedIn(true);
    setShowLoginDialog(false);
  };

  return (
    <>
      {/* Top Navbar: Fixed position header with logo, navigation menu, and user actions */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-border bg-background/80 backdrop-blur-xl shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          
          {/* Logo Area: Brand identity with responsive logo images for different themes */}
          <div className="flex items-center group cursor-pointer" onClick={() => setLocation("/")}>
            {theme === "dark" ? (
              <img 
                src={getAssetPath("logos/night-logo.png")} 
                alt="ASG Notes Night" 
                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            ) : (
              <>
                <img 
                  src={getAssetPath("logos/logo-mobile.png")} 
                  alt="ASG Notes Mobile" 
                  className="block md:hidden h-8 w-auto object-contain transition-transform group-hover:scale-105" 
                />
                <img 
                  src={getAssetPath("logos/logo-pc.png")} 
                  alt="ASG Notes PC" 
                  className="hidden md:block h-10 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              </>
            )}
          </div>

          {/* Desktop Navigation Menu: Links for main pages (Home, Series, Bundles, Special Offers) */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-muted-foreground">
            <Link href="/" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${isActive('/') ? 'text-primary font-bold' : ''}`}>
              হোম
            </Link>
            <Link href="/series" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${isActive('/series') ? 'text-primary font-bold' : ''}`}>
              সিরিজ
            </Link>
            <Link href="/bundles" className={`hover:text-foreground transition hover:underline decoration-primary decoration-2 underline-offset-4 ${isActive('/bundles') ? 'text-primary font-bold' : ''}`}>
              বান্ডেল
            </Link>
            <Link href="/offers" className="text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full hover:bg-primary/20 transition">
              স্পেশাল অফার
            </Link>
          </div>

          {/* Right Side Actions: Theme toggle, shopping cart, and authentication buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle: Animated switch between light and dark modes */}
            <div
              className={`relative w-14 h-7 md:w-16 md:h-8 rounded-full p-1 cursor-pointer transition-all duration-300 flex items-center border ${
                theme === "dark" ? "bg-slate-800 justify-end border-slate-700" : "bg-orange-100 justify-start border-orange-200"
              }`}
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              <motion.div
                layout
                className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              >
                {theme === "dark" ? (
                  <Moon size={12} className="text-primary fill-primary" />
                ) : (
                  <Sun size={12} className="text-orange-500 fill-orange-500" />
                )}
              </motion.div>
            </div>

            {/* Shopping Cart Button: Displays cart items count badge */}
            <button className="hidden md:block relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-[10px] md:text-xs rounded-full flex items-center justify-center font-bold border-2 border-background">
                3
              </span>
            </button>

            {/* Desktop Authentication UI: Conditionally renders profile or login button */}
            {isLoggedIn ? (
               // When authenticated: Shows user profile button with profile icon
              <button className="hidden md:flex items-center gap-2 text-muted-foreground text-sm font-bold border border-border px-4 py-2 rounded-full hover:border-primary hover:text-foreground transition bg-card">
                <UserCircle size={20} /> Profile
              </button>
            ) : (
               // When not authenticated: Shows login button
              <button 
                onClick={() => setShowLoginDialog(true)}
                className="hidden md:flex items-center gap-2 text-muted-foreground text-sm font-bold border border-border px-5 py-2 rounded-full hover:border-primary hover:text-foreground transition bg-card"
              >
                <User size={16} /> Login
              </button>
            )}

            {/* Mobile Top Cart: Shopping cart button visible only on mobile */}
             <button className="md:hidden relative p-2 text-muted-foreground">
               <ShoppingCart size={20} />
               <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold border border-background">
                3
              </span>
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation: Fixed position navigation bar visible only on mobile devices */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border md:hidden pb-safe">
        <div className="flex justify-around items-center h-16 px-1">
          
          <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <Link href="/series" className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${isActive('/series') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <BookOpen size={22} strokeWidth={isActive('/series') ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Series</span>
          </Link>

          <Link href="/bundles" className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${isActive('/bundles') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <Package size={22} strokeWidth={isActive('/bundles') ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Bundles</span>
          </Link>

          {/* Mobile Profile Logic: Displays profile or login button based on authentication state */}
          {isLoggedIn ? (
            <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-foreground active:scale-95 transition-transform">
              <UserCircle size={22} strokeWidth={2} />
              <span className="text-[10px] font-medium">Profile</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowLoginDialog(true)}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
            >
              <LogIn size={22} strokeWidth={2} />
              <span className="text-[10px] font-medium">Login</span>
            </button>
          )}

        </div>
      </div>

      {/* Login Dialog: Modal component for user authentication */}
      <AuthDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;