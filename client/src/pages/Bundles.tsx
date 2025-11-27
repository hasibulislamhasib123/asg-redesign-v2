import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowLeft, ShoppingCart, Star, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "../components/AddToCartButton";
// Bundle Interface
interface Bundle {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  category: string; 
  type: string;     
  tag: string;
  rating: number;
  color: string;
  items: string[]; 
}

// Sample Bundle Data
const bundlesData: Bundle[] = [
  { 
    id: 1, 
    title: "Compressed Note | Complete Set Version 2 (7 Books)", 
    price: 1200, 
    oldPrice: 1500, 
    category: "All", 
    type: "Version 2", 
    tag: "Best Value", 
    rating: 5.0, 
    color: "bg-gradient-to-r from-rose-500 to-orange-500",
    items: ["Physics 1st", "Physics 2nd", "Chemistry 1st", "Chemistry 2nd", "Math 1st", "Math 2nd", "Biology"]
  },
  { 
    id: 2, 
    title: "Physics 1st & 2nd Paper Bundle", 
    price: 550,
    oldPrice: 700, 
    category: "Physics", 
    type: "Subject Bundle", 
    tag: "Popular", 
    rating: 4.9, 
    color: "bg-blue-600",
    items: ["Physics 1st Paper", "Physics 2nd Paper"]
  },
  // ... (Other bundle data remains same) ...
  // For brevity, keeping just 2, but you should keep your full list
  { id: 3, title: "রসায়ন ফুল কোর্স নোটস (অক্সিজেন সিরিজ)", price: 500, oldPrice: 650, category: "Chemistry", type: "Subject Bundle", tag: "Essential", rating: 4.8, color: "bg-purple-600", items: ["Chemistry 1st Paper", "Chemistry 2nd Paper"] },
  { id: 4, title: "উচ্চতর গণিত - শেষ মুহূর্তের প্রস্তুতি", price: 450, oldPrice: 600, category: "Math", type: "Exam Special", tag: "New", rating: 4.7, color: "bg-emerald-600", items: ["Math 1st Paper", "Math 2nd Paper"] },
  { id: 5, title: "জীববিজ্ঞান - মেডিকেল এডমিশন প্যাক", price: 600, oldPrice: 800, category: "Biology", type: "Admission", tag: "Hot", rating: 4.9, color: "bg-cyan-600", items: ["Biology 1st Paper", "Biology 2nd Paper", "Admission Guide"] },
  { id: 6, title: "HSC 25 - ফাইনাল মডেল টেস্ট পেপারস (সকল বিষয়)", price: 300, oldPrice: 450, category: "All", type: "Model Test", tag: "Limited", rating: 4.6, color: "bg-orange-600", items: ["All Subjects Model Test", "Solve Sheet"] },
  { id: 7, title: "বাংলা ও ইংরেজি কম্বো প্যাক", price: 350, oldPrice: 500, category: "Bangla", type: "Subject Bundle", tag: "", rating: 4.5, color: "bg-indigo-600", items: ["Bangla 1st", "Bangla 2nd", "English Grammar"] },
  { id: 8, title: "আইসিটি - জিরো টু হিরো বান্ডেল", price: 250, oldPrice: 350, category: "ICT", type: "Subject Bundle", tag: "Beginner Friendly", rating: 4.8, color: "bg-pink-600", items: ["ICT Main Book", "Programming Note", "MCQ Bank"] },
];

const categoryList = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla", "English"];
const typeList = ["All", "Version 2", "Subject Bundle", "Admission", "Model Test"];

const BundleCard: React.FC<{ bundle: Bundle }> = ({ bundle }) => {
  const [, setLocation] = useLocation();

  const handleCardClick = () => {
    // For now redirecting to book details, but ideally should have a bundle details page
    // Using a dummy ID strategy or mapping to existing books if possible
    setLocation(`/book/${bundle.id}`); 
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Added bundle to cart:", bundle.title);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={handleCardClick}
      className="group relative bg-card rounded-2xl p-3 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer h-full flex flex-col"
    >
      {/* Image / Cover Area */}
      <div className="relative h-[260px] w-full overflow-hidden rounded-xl bg-muted shrink-0">
        {bundle.tag && (
          <div className="absolute top-2 left-2 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase border border-white/10 shadow-sm flex items-center gap-1">
            <Sparkles size={10} className="text-yellow-400 fill-yellow-400" /> {bundle.tag}
          </div>
        )}
        {/* Dynamic Gradient Background */}
        <div className={`w-full h-full ${bundle.color} opacity-80 group-hover:opacity-100 transition-all duration-500 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay`}></div>
        
        {/* Bundle Title on Cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
           <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg leading-none mb-2 opacity-90 group-hover:scale-110 transition-transform duration-500">
             {bundle.category === "All" ? "COMBO" : bundle.category.slice(0, 3)}
           </h1>
           <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
             <p className="text-white text-xs font-bold tracking-wider uppercase">{bundle.type}</p>
           </div>
        </div>

        {/* Items List (Visible on Hover) */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
             <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-widest border-b border-white/20 pb-1">এই বান্ডেলে যা আছে:</h4>
             <ul className="text-slate-300 text-xs space-y-1.5">
                {bundle.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> {item}
                  </li>
                ))}
             </ul>
        </div>

        {/* Hover Actions (Bottom) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
             <Button 
                size="sm" 
                variant="secondary" 
                className="rounded-full font-bold bg-white text-black hover:bg-white/90"
                onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
             >
                বিস্তারিত দেখুন
                  </Button>
             </div> {/* close hover actions */}
                </div> {/* close cover / image container */}
                {/* Info Section */}
      <div className="mt-4 px-2 space-y-3 flex flex-col flex-grow justify-between">
        <div>
            <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">{bundle.category} Bundle</p>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                    <Star size={10} fill="currentColor"/> {bundle.rating}
                </div>
            </div>
            <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{bundle.title}</h3>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
           <div className="flex flex-col">
              <span className="text-xs text-muted-foreground line-through">৳{bundle.oldPrice}</span>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black text-foreground">৳{bundle.price}</span>
                <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-1.5 py-0.5 rounded">-{Math.round(((bundle.oldPrice - bundle.price) / bundle.oldPrice) * 100)}%</span>
              </div>
           </div>
          <AddToCartButton 
  size="sm" 
  text="কিনুন" 
  onClick={(e) => { 
    console.log("Add to cart clicked"); 
  }} />
        </div>
      </div>
    </motion.div>
  );
};

export default function BundlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8); 
  const [, setLocation] = useLocation();

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  const filteredBundles = bundlesData.filter((bundle) => {
    const matchCategory = activeCategory === "All" || bundle.category === activeCategory;
    const matchType = activeType === "All" || bundle.type === activeType;
    return matchCategory && matchType;
  });

  const displayBundles = filteredBundles.slice(0, visibleCount);

  return (
   <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-24 md:pb-20">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 px-6 bg-gradient-to-b from-muted/50 to-background border-b border-border">
        <div className="max-w-7xl mx-auto text-center md:text-left">
            <Button variant="ghost" onClick={() => setLocation("/")} className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2 group hidden md:inline-flex">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> ফিরে যান
            </Button>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight leading-tight">
              সেরা <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">বান্ডেল ও অফার</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              আপনার প্রয়োজনীয় সব নোট একসাথে কিনুন আর সাশ্রয় করুন। আমাদের এক্সক্লুসিভ বান্ডেল কালেকশন থেকে বেছে নিন আপনারটি।
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Section */}
        <div className="mb-12 flex flex-col gap-6">
            {/* Type Tabs (Main Filter) */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {typeList.map((type) => (
                  <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border shadow-sm active:scale-95 ${
                      activeType === type
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground hover:shadow-md"
                  }`}
                  >
                  {type}
                  </button>
              ))}
            </div>

            {/* Category Tags (Secondary Filter) */}
            <div className="flex flex-wrap gap-2 items-center p-1.5 bg-muted/40 rounded-xl border border-border/50 w-fit mx-auto md:mx-0 backdrop-blur-sm">
              <div className="flex items-center gap-2 px-3 text-muted-foreground text-sm font-medium">
                 <Filter size={16} /> বিষয়:
              </div>
              {categoryList.map((cat) => (
                  <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCategory === cat
                      ? "bg-background text-primary shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                  >
                  {cat}
                  </button>
              ))}
            </div>
        </div>

        {/* Bundles Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence>
                {displayBundles.map((bundle) => (
                   <BundleCard key={bundle.id} bundle={bundle} />
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {visibleCount < filteredBundles.length && (
            <div className="flex justify-center mt-20">
                <Button onClick={loadMore} variant="outline" className="px-10 py-6 text-base rounded-full border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all shadow-sm">
                  View More Bundles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        )}

        {/* Empty State */}
        {filteredBundles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-border">
                    <Search size={40} className="text-muted-foreground opacity-50"/>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No Bundles Found</h3>
                <p className="text-muted-foreground">অন্য কোনো ক্যাটাগরি বা ফিল্টার চেষ্টা করে দেখুন।</p>
                <Button 
                  variant="link" 
                  onClick={() => {setActiveCategory("All"); setActiveType("All")}}
                  className="mt-4 text-primary font-bold"
                >
                  সব ফিল্টার রিসেট করুন
                </Button>
            </div>
        )}
      </div>

      <Footer />
    </main>
  );
}