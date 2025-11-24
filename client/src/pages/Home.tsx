import React, { useState } from "react";
import { Sparkles, Search, ArrowRight, ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAssetPath } from "@/lib/utils";

// ✅ এই লাইনগুলো মিসিং ছিল, তাই এরর হচ্ছিল
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Book data types
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

// Sample books data
const booksData: Book[] = [
  {
    id: 1,
    title: "নিউটনিয়ান বলবিদ্যা - পদার্থবিজ্ঞান ১ম পত্র",
    price: 30,
    oldPrice: 50,
    category: "Physics",
    tag: "Hot",
    rating: 4.9,
    color: "bg-rose-500",
  },
  {
    id: 2,
    title: "জৈব রসায়ন (অক্সিজেন সিরিজ) - রসায়ন ২য় পত্র",
    price: 35,
    oldPrice: 55,
    category: "Chemistry",
    tag: "Best Seller",
    rating: 5.0,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "ম্যাট্রিক্স ও নির্ণায়ক - উচ্চতর গণিত ১ম পত্র",
    price: 25,
    oldPrice: 40,
    category: "Math",
    tag: "New",
    rating: 4.8,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "রক্ত ও সঞ্চালন - জীববিজ্ঞান ২য় পত্র",
    price: 40,
    oldPrice: 60,
    category: "Biology",
    tag: "",
    rating: 4.7,
    color: "bg-emerald-500",
  },
  {
    id: 5,
    title: "আইসিটি - নেটওয়ার্কিং ও ওয়েব",
    price: 20,
    oldPrice: 35,
    category: "ICT",
    tag: "Discount",
    rating: 4.6,
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "সোনার তরী - বাংলা ১ম পত্র",
    price: 15,
    oldPrice: 25,
    category: "Bangla",
    tag: "",
    rating: 4.5,
    color: "bg-orange-500",
  },
  {
    id: 7,
    title: "তাপগতিবিদ্যা - পদার্থবিজ্ঞান ২য় পত্র",
    price: 30,
    oldPrice: 42,
    category: "Physics",
    tag: "",
    rating: 4.8,
    color: "bg-cyan-500",
  },
  {
    id: 8,
    title: "গুণগত রসায়ন - রসায়ন ১ম পত্র",
    price: 20,
    oldPrice: 40,
    category: "Chemistry",
    tag: "Hot",
    rating: 4.9,
    color: "bg-fuchsia-500",
  },
];

const categories = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla"];

// Book Card Component (লোকালি রাখা হয়েছে)
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const formatPrice = (price: number) => `৳${price}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-2xl p-3 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-muted">
        {/* Tag */}
        {book.tag && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-3 py-1 bg-muted/90 backdrop-blur-md border border-border rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">{book.tag}</span>
          </div>
        )}

        {/* Gradient Placeholder */}
        <div className={`w-full h-full bg-gradient-to-br from-muted to-muted-foreground group-hover:scale-110 transition-transform duration-700 flex flex-col items-center justify-center p-6 text-center`}>
          <div className={`w-20 h-20 rounded-full ${book.color} opacity-20 blur-xl absolute`}></div>
          <div className="relative z-10 text-6xl font-black text-muted-foreground opacity-50 select-none group-hover:text-muted-foreground transition-colors">
            {book.category.substring(0, 2)}
          </div>
          <p className="relative z-10 text-xs text-muted-foreground font-medium tracking-[0.2em] mt-2 uppercase border border-border/50 px-2 py-1 rounded">
            {book.category} সিরিজ
          </p>
        </div>

        {/* Hover Buttons */}
        <div className="absolute inset-0 bg-muted/60 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition shadow-lg">
            প্রিভিউ
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-600 active:scale-95 transition shadow-lg shadow-primary/20">
            <ShoppingCart size={16} /> কিনুন
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="mt-4 px-2 space-y-2">
        {/* Rating */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded text-xs font-medium text-foreground">
            <Star size={12} className="fill-current text-orange-500" /> <span>{book.rating}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">স্টকে আছে</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
          {book.title}
        </h3>

        {/* Price & Cart Button */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">{formatPrice(book.oldPrice)}</span>
            <span className="text-xl font-bold text-foreground">{formatPrice(book.price)}</span>
          </div>
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rotate-12">
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

  // Filter books based on category and search
  const filteredBooks = booksData.filter((book) => {
    const matchCategory = activeCategory === "All" || book.category === activeCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-300">
      
      {/* Navbar Component Imported */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6 max-w-4xl mx-auto"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-primary text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">
            <Sparkles size={14} className="animate-spin" />
            <span>Next Gen Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
            তোমার ফিউচার, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              এখন আরও স্মার্ট
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
            ASG স্মার্ট নোটস এবং সাজেশন্স এর সাথে তোমার প্রস্তুতি হোক ১০০ তে ১০০। ডাউনলোড করো এখনি।
          </p>

          {/* Search Bar */}
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

      {/* Category Filter */}
      <div className="sticky top-[70px] z-40 px-6 py-4 flex justify-center pointer-events-none">
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
      <section className="max-w-7xl mx-auto px-6 pb-32 pt-10 min-h-[500px]">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
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

      {/* Footer Component Imported */}
      <Footer />
    </main>
  );
}