import React, { useState } from "react";
import { Sparkles, Search, ArrowRight, ShoppingCart, Star, Users, BookOpen, Award, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAssetPath } from "@/lib/utils";
import { useLocation } from "wouter"; 
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Book Interface
interface Book {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  category: string;
  tag: string;
  rating: number;
  color: string;
}

// Book Data
const booksData: Book[] = [
  { id: 1, title: "নিউটনিয়ান বলবিদ্যা - পদার্থবিজ্ঞান ১ম পত্র", price: 30, oldPrice: 50, category: "Physics", tag: "Hot", rating: 4.9, color: "bg-rose-500" },
  { id: 2, title: "জৈব রসায়ন (অক্সিজেন সিরিজ) - রসায়ন ২য় পত্র", price: 35, oldPrice: 55, category: "Chemistry", tag: "Best Seller", rating: 5.0, color: "bg-blue-500" },
  { id: 3, title: "ম্যাট্রিক্স ও নির্ণায়ক - উচ্চতর গণিত ১ম পত্র", price: 25, oldPrice: 40, category: "Math", tag: "New", rating: 4.8, color: "bg-amber-500" },
  { id: 4, title: "রক্ত ও সঞ্চালন - জীববিজ্ঞান ২য় পত্র", price: 40, oldPrice: 60, category: "Biology", tag: "", rating: 4.7, color: "bg-emerald-500" },
  { id: 5, title: "আইসিটি - নেটওয়ার্কিং ও ওয়েব", price: 20, oldPrice: 35, category: "ICT", tag: "Discount", rating: 4.6, color: "bg-purple-500" },
  { id: 6, title: "সোনার তরী - বাংলা ১ম পত্র", price: 15, oldPrice: 25, category: "Bangla", tag: "", rating: 4.5, color: "bg-orange-500" },
  { id: 7, title: "তাপগতিবিদ্যা - পদার্থবিজ্ঞান ২য় পত্র", price: 30, oldPrice: 42, category: "Physics", tag: "", rating: 4.8, color: "bg-cyan-500" },
  { id: 8, title: "গুণগত রসায়ন - রসায়ন ১ম পত্র", price: 20, oldPrice: 40, category: "Chemistry", tag: "Hot", rating: 4.9, color: "bg-fuchsia-500" },
];

const categories = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla"];

// Review Images
const reviewImages = [
  "Reviews/student1.png",
  "Reviews/student2.png",
  "Reviews/student3.png",
  "Reviews/student4.png",
  "Reviews/student5.png", 
  "Reviews/student6.png",
  "Reviews/student7.png",
];

// Stats Data
const stats = [
  { icon: Users, label: "শিক্ষার্থী", value: "৫০,০০০+", color: "text-blue-500", glow: "from-blue-500" },
  { icon: BookOpen, label: "নোট বিক্রি", value: "১,২০,০০০+", color: "text-green-500", glow: "from-green-500" },
  { icon: Award, label: "সন্তুষ্ট কাস্টমার", value: "৯৮%", color: "text-yellow-500", glow: "from-yellow-500" },
  { icon: Sparkles, label: "মোট নোট", value: "২৫০+", color: "text-purple-500", glow: "from-purple-500" },
];

// Book Card Component
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const formatPrice = (price: number) => `৳${price}`;
  const [, setLocation] = useLocation(); 

  const handleCardClick = () => {
    setLocation(`/book/${book.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="group relative bg-card rounded-2xl p-3 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-muted">
        {book.tag && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-3 py-1 bg-muted/90 backdrop-blur-md border border-border rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">{book.tag}</span>
          </div>
        )}
        <div className={`w-full h-full bg-gradient-to-br from-muted to-muted-foreground group-hover:scale-110 transition-transform duration-700 flex flex-col items-center justify-center p-6 text-center`}>
          <div className={`w-20 h-20 rounded-full ${book.color} opacity-20 blur-xl absolute`}></div>
          <div className="relative z-10 text-6xl font-black text-muted-foreground opacity-50 select-none group-hover:text-muted-foreground transition-colors">
            {book.category.substring(0, 2)}
          </div>
          <p className="relative z-10 text-xs text-muted-foreground font-medium tracking-[0.2em] mt-2 uppercase border border-border/50 px-2 py-1 rounded">
            {book.category} সিরিজ
          </p>
        </div>
        <div className="absolute inset-0 bg-muted/60 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
            className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition shadow-lg"
          >
            প্রিভিউ
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); console.log("Add to cart clicked"); }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-600 active:scale-95 transition shadow-lg shadow-primary/20"
          >
            <ShoppingCart size={16} /> কিনুন
          </button>
        </div>
      </div>
      <div className="mt-4 px-2 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded text-xs font-medium text-foreground">
            <Star size={12} className="fill-current text-orange-500" /> <span>{book.rating}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">স্টকে আছে</span>
        </div>
        <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
          {book.title}
        </h3>
        <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">{formatPrice(book.oldPrice)}</span>
            <span className="text-xl font-bold text-foreground">{formatPrice(book.price)}</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); console.log("Add to cart"); }}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rotate-12"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredBooks = booksData.filter((book) => {
    const matchCategory = activeCategory === "All" || book.category === activeCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-300 overflow-x-hidden">
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-primary text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">
            <Sparkles size={14} className="animate-spin" />
            <span>Next Gen Learning Platform</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
            তোমার ফিউচার, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              এখন আরও স্মার্ট
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
            ASG স্মার্ট নোটস এবং সাজেশন্স এর সাথে তোমার প্রস্তুতি হোক ১০০ তে ১০০। ডাউনলোড করো এখনি।
          </p>
          <div className="max-w-xl mx-auto relative mt-10 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-full p-2 shadow-2xl">
              <Search className="ml-4 text-muted-foreground group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="text"
                placeholder="কোন টপিক বা বই খুঁজছো?..."
                className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground text-lg px-4 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <button className="bg-primary hover:bg-red-600 text-primary-foreground p-3 rounded-full transition-all duration-300 hover:scale-105">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section (Transparent & Glass Glow) */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center group relative">
                {/* Glass Glow Behind Icon */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br ${stat.glow} to-transparent blur-[40px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon only (No background card) */}
                <div className={`mb-4 ${stat.color} transition-all duration-300 relative z-10 transform group-hover:scale-110 drop-shadow-lg`}>
                  <stat.icon size={56} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-4xl font-black text-foreground mb-1 relative z-10 tracking-tight">{stat.value}</h3>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest relative z-10">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[70px] z-40 px-6 py-6 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex flex-wrap justify-center gap-2 bg-card/80 backdrop-blur-xl p-2 rounded-2xl border border-border shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${
                activeCategory === cat
                  ? "bg-muted text-primary border-primary/30 shadow-lg shadow-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20 min-h-[500px]">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">দুঃখিত! কিছু পাওয়া যায়নি</h3>
            <p className="text-muted-foreground mt-2">অন্য কোনো কি-ওয়ার্ড দিয়ে চেষ্টা করো।</p>
          </motion.div>
        )}
      </section>

      {/* ✨ Testimonials Section: Super-Wide Strip Look, Micro-Modal */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              আমাদের শিক্ষার্থীরা <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">যা বলছেন</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              হাজার হাজার শিক্ষার্থী আমাদের নোট পড়ে তাদের কাঙ্ক্ষিত সাফল্য অর্জন করেছে।
            </p>
          </div>

          {/* Wide Strip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewImages.map((image, index) => (
              <motion.div 
                key={index} 
                layoutId={`review-${index}`} // For shared layout animation
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Glass Glow Layer */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Image Container - Pill Shape (980x128 ratio enforced by aspect class) */}
                <div className="aspect-[980/128] w-full rounded-full overflow-hidden border-2 border-card/50 backdrop-blur-xl shadow-lg relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02] bg-muted">
                    <img 
                      src={getAssetPath(image)} 
                      alt={`Student Review ${index + 1}`} 
                      className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/980x128?text=Review+${index + 1}`;
                      }}
                    />
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Quote className="text-white w-6 h-6 drop-shadow-lg" />
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Micro-Modal (No Fullscreen Backdrop) */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              {/* The Modal Card - pointer-events-auto to allow interaction */}
              <motion.div
                layoutId={`review-${reviewImages.indexOf(selectedImage)}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="pointer-events-auto relative bg-card border border-border rounded-2xl shadow-2xl max-w-3xl w-[90vw] overflow-hidden"
              >
                {/* Close Button */}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 z-20 bg-background/50 backdrop-blur-md hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={20} />
                </Button>

                {/* Expanded Image */}
                <img 
                  src={getAssetPath(selectedImage)} 
                  alt="Review Expanded" 
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </motion.div>
              
              {/* Invisible backdrop to close on click outside (optional, removes interaction with page while open) */}
              {/* If you strictly want NO backdrop, remove this div, but then closing needs the X button */}
              <div 
                className="absolute inset-0 pointer-events-auto" 
                onClick={() => setSelectedImage(null)}
              ></div>
            </div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}