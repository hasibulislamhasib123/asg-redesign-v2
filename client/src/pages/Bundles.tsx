import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Bundle Interface (Similar structure but focused on bundles)
interface Bundle {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  category: string; // e.g., Physics, Math
  type: string;     // e.g., Version 2, Final Model Test
  tag: string;
  rating: number;
  color: string;
}

// Sample Bundle Data
const bundlesData: Bundle[] = [
  { id: 1, title: "Compressed Note | Version 2 - সম্পূর্ণ সেট", price: 1200, oldPrice: 1500, category: "All", type: "Version 2", tag: "Best Value", rating: 5.0, color: "bg-gradient-to-r from-rose-500 to-orange-500" },
  { id: 2, title: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র বান্ডেল", price: 550, oldPrice: 700, category: "Physics", type: "Subject Bundle", tag: "Popular", rating: 4.9, color: "bg-blue-600" },
  { id: 3, title: "রসায়ন ফুল কোর্স নোটস", price: 500, oldPrice: 650, category: "Chemistry", type: "Subject Bundle", tag: "Essential", rating: 4.8, color: "bg-purple-600" },
  { id: 4, title: "উচ্চতর গণিত - শেষ মুহূর্তের প্রস্তুতি", price: 450, oldPrice: 600, category: "Math", type: "Exam Special", tag: "New", rating: 4.7, color: "bg-emerald-600" },
  { id: 5, title: "জীববিজ্ঞান - মেডিকেল এডমিশন প্যাক", price: 600, oldPrice: 800, category: "Biology", type: "Admission", tag: "Hot", rating: 4.9, color: "bg-cyan-600" },
  { id: 6, title: "HSC 25 - ফাইনাল মডেল টেস্ট পেপারস", price: 300, oldPrice: 450, category: "All", type: "Model Test", tag: "Limited", rating: 4.6, color: "bg-orange-600" },
  { id: 7, title: "বাংলা ও ইংরেজি কম্বো প্যাক", price: 350, oldPrice: 500, category: "Bangla", type: "Subject Bundle", tag: "", rating: 4.5, color: "bg-indigo-600" },
];

const categoryList = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla", "English"];
const typeList = ["All", "Version 2", "Subject Bundle", "Admission", "Model Test"];

const BundleCard: React.FC<{ bundle: Bundle }> = ({ bundle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-card rounded-2xl p-3 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      {/* Image / Cover Area */}
      <div className="relative h-[260px] w-full overflow-hidden rounded-xl bg-muted">
        {bundle.tag && (
          <div className="absolute top-2 left-2 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase border border-white/10 shadow-sm">
            {bundle.tag}
          </div>
        )}
        {/* Dynamic Gradient Background */}
        <div className={`w-full h-full ${bundle.color} opacity-80 group-hover:opacity-100 transition-all duration-500`}></div>
        
        {/* Bundle Title on Cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
           <h1 className="text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-none mb-2">{bundle.category === "All" ? "COMBO" : bundle.category}</h1>
           <p className="text-white/90 text-xs font-medium bg-black/20 px-2 py-1 rounded backdrop-blur-sm">{bundle.type}</p>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
             <Button variant="secondary" size="sm" className="rounded-full font-bold bg-white text-black hover:bg-white/90">বিস্তারিত দেখুন</Button>
             <Button size="sm" className="rounded-full font-bold"> <ShoppingCart size={16} className="mr-2"/> কার্টে যোগ করুন</Button>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="mt-4 space-y-2 px-1">
        <div className="flex justify-between items-start">
            <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{bundle.title}</h3>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
           <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">৳{bundle.price}</span>
                <span className="text-xs text-muted-foreground line-through">৳{bundle.oldPrice}</span>
              </div>
           </div>
           <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
             <Star size={10} fill="currentColor"/> {bundle.rating}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function BundlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10); 
  const [, setLocation] = useLocation();

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  const filteredBundles = bundlesData.filter((bundle) => {
    const matchCategory = activeCategory === "All" || bundle.category === activeCategory;
    const matchType = activeType === "All" || bundle.type === activeType;
    return matchCategory && matchType;
  });

  const displayBundles = filteredBundles.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 px-6 bg-gradient-to-b from-muted/50 to-background border-b border-border">
        <div className="max-w-7xl mx-auto text-center md:text-left">
            <Button variant="ghost" onClick={() => setLocation("/")} className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2 group hidden md:inline-flex">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> ফিরে যান
            </Button>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
              সেরা <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">বান্ডেল ও অফার</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              আপনার প্রয়োজনীয় সব নোট একসাথে কিনুন আর সাশ্রয় করুন। আমাদের এক্সক্লুসিভ বান্ডেল কালেকশন থেকে বেছে নিন আপনারটি।
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter Section */}
        <div className="mb-12 flex flex-col gap-6">
            {/* Type Tabs (Main Filter) */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {typeList.map((type) => (
                  <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border shadow-sm ${
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
            <div className="flex flex-wrap gap-2 items-center p-3 bg-muted/30 rounded-xl border border-border w-fit mx-auto md:mx-0">
              <div className="flex items-center gap-2 mr-2 text-muted-foreground text-sm font-medium">
                 <Filter size={16} /> বিষয়:
              </div>
              {categoryList.map((cat) => (
                  <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border"
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
                <Button onClick={loadMore} variant="outline" className="px-10 py-6 text-base rounded-full border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all">
                  আরও বান্ডেল দেখুন
                </Button>
            </div>
        )}

        {/* Empty State */}
        {filteredBundles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6 border border-dashed border-border">
                    <Search size={40} className="text-muted-foreground opacity-50"/>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">দুঃখিত! কোনো বান্ডেল পাওয়া যায়নি</h3>
                <p className="text-muted-foreground">অন্য কোনো ক্যাটাগরি বা ফিল্টার চেষ্টা করে দেখুন।</p>
                <Button 
                  variant="link" 
                  onClick={() => {setActiveCategory("All"); setActiveType("All")}}
                  className="mt-4 text-primary"
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