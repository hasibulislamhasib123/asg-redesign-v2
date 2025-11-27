import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "../components/AddToCartButton";

// Book Interface & Data (Expanded with Series)
interface Book {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  category: string;
  tag: string;
  rating: number;
  color: string;
  series: string;
}

const booksData: Book[] = [
  { id: 1, title: "নিউটনিয়ান বলবিদ্যা - পদার্থবিজ্ঞান ১ম", price: 30, oldPrice: 50, category: "Physics", tag: "Hot", rating: 4.9, color: "bg-rose-500", series: "Compressed Note Series" },
  { id: 2, title: "জৈব রসায়ন (অক্সিজেন সিরিজ)", price: 35, oldPrice: 55, category: "Chemistry", tag: "Best Seller", rating: 5.0, color: "bg-blue-500", series: "Oxygen Series" },
  { id: 3, title: "ম্যাট্রিক্স ও নির্ণায়ক - উচ্চতর গণিত", price: 25, oldPrice: 40, category: "Math", tag: "New", rating: 4.8, color: "bg-amber-500", series: "Compressed Note Series" },
  { id: 4, title: "রক্ত ও সঞ্চালন - জীববিজ্ঞান", price: 40, oldPrice: 60, category: "Biology", tag: "", rating: 4.7, color: "bg-emerald-500", series: "Oxygen Series" },
  { id: 5, title: "ফ্লিক্স - ফিজিক্স এনিমেশন", price: 50, oldPrice: 80, category: "Physics", tag: "Interactive", rating: 4.9, color: "bg-purple-500", series: "ASG Flix Series" },
  { id: 6, title: "জ্ঞান ও অনুধাবন - বাংলা ১ম", price: 20, oldPrice: 30, category: "Bangla", tag: "Essential", rating: 4.6, color: "bg-orange-500", series: "জ্ঞান ও অনুধাবন Series" },
  // Add more books as needed...
];

const seriesList = ["All", "Compressed Note Series", "Oxygen Series", "ASG Flix Series", "জ্ঞান ও অনুধাবন Series"];
const categories = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla"];

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const [, setLocation] = useLocation();
  
  const handleCardClick = () => {
    setLocation(`/book/${book.id}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Added to cart from Series:", book.title);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={handleCardClick}
      className="group relative bg-card rounded-2xl p-3 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative h-[240px] w-full overflow-hidden rounded-xl bg-muted">
        {book.tag && (
          <div className="absolute top-2 left-2 z-20 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase border border-white/10">
            {book.tag}
          </div>
        )}
        <div className={`w-full h-full bg-gradient-to-br ${book.color} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
        
        {/* Series Initial */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <h1 className="text-5xl font-black text-foreground/10 uppercase tracking-tighter select-none">{book.category.slice(0,2)}</h1>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-muted/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
             <Button 
                variant="secondary" 
                size="sm" 
                className="rounded-full font-bold"
                onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
             >
                প্রিভিউ
            </Button>
        </div>
      </div>
      
      <div className="mt-3 space-y-1 px-1">
        <div className="flex justify-between items-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold border border-border px-1.5 rounded">{book.series.split(" ")[0]}</p>
            <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold"><Star size={10} fill="currentColor"/> {book.rating}</div>
        </div>
        <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors h-10">{book.title}</h3>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
           <div className="flex flex-col">
              <span className="text-xs text-muted-foreground line-through">৳{book.oldPrice}</span>
              <span className="text-lg font-bold text-primary">৳{book.price}</span>
           </div>
               <AddToCartButton 
                  size="sm" 
                  text="কিনুন" 
                  onClick={(e) => { 
                    console.log("Add to cart clicked"); 
                  }}
                />
        </div>
      </div>
    </motion.div>
  );
};

export default function SeriesPage() {
  const [activeSeries, setActiveSeries] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10); 
  const [, setLocation] = useLocation();

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  const filteredBooks = booksData.filter((book) => {
    const matchSeries = activeSeries === "All" || book.series === activeSeries;
    const matchCategory = activeCategory === "All" || book.category === activeCategory;
    return matchSeries && matchCategory;
  });

  const displayBooks = filteredBooks.slice(0, visibleCount);

  return (
   <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-24 md:pb-20">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-10 px-6 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
            <Button variant="ghost" onClick={() => setLocation("/")} className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> ফিরে যান
            </Button>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">বই সিরিজ</span></h1>
            <p className="text-muted-foreground max-w-2xl text-lg">আপনার প্রয়োজনীয় সিরিজটি বেছে নিন এবং বিষয়ভিত্তিক ফিল্টার করে খুঁজে নিন সেরা নোটস।</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter Section */}
        <div className="mb-12 space-y-6">
            {/* Series Tabs */}
            <div className="flex flex-wrap gap-2">
            {seriesList.map((series) => (
                <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    activeSeries === series
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
                >
                {series}
                </button>
            ))}
            </div>

            {/* Subject Categories */}
            <div className="flex flex-wrap gap-2 items-center p-2 bg-muted/50 rounded-lg w-fit">
            <Filter size={16} className="text-muted-foreground mr-2 ml-2" />
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeCategory === cat
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>

        {/* Books Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence>
                {displayBooks.map((book) => (
                <BookCard key={book.id} book={book} />
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {visibleCount < filteredBooks.length && (
            <div className="flex justify-center mt-16">
                <Button onClick={loadMore} variant="outline" className="px-8 py-6 text-base rounded-full border-primary/20 hover:border-primary hover:bg-primary/5">
                আরও দেখুন
                </Button>
            </div>
        )}

        {/* Empty State */}
        {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-muted-foreground"/>
                </div>
                <h3 className="text-xl font-bold text-foreground">দুঃখিত! কিছু পাওয়া যায়নি</h3>
                <p className="text-muted-foreground mt-2">অন্য কোনো সিরিজ বা ক্যাটাগরি চেষ্টা করুন।</p>
            </div>
        )}
      </div>

      <Footer />
    </main>
  );
}