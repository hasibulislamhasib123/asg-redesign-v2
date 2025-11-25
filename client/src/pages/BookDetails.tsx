import React, { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
// ✅ Sparkles এখানে ইমপোর্ট করা হয়েছে
import { ArrowLeft, ShoppingCart, Star, Share2, Heart, CheckCircle2, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAssetPath } from "@/lib/utils";

// বইয়ের ডাটা টাইপ
interface Book {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  category: string;
  tag: string;
  rating: number;
  color: string;
  description?: string;
  features?: string[];
}

// স্যাম্পল ডাটা
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
    description: "এইচএসসি এবং ভর্তি পরীক্ষার জন্য পদার্থবিজ্ঞান ১ম পত্রের নিউটনিয়ান বলবিদ্যা অধ্যায়ের সম্পূর্ণ কম্প্রেসড নোট। এখানে শর্টকাট টেকনিক, গাণিতিক সমস্যার সমাধান এবং বিগত বছরের প্রশ্নগুলো সুন্দরভাবে সাজানো আছে।",
    features: ["সম্পূর্ণ রঙিন নোট", "শর্টকাট টেকনিক", "বিগত বছরের প্রশ্ন সমাধান", "মোবাইল ফ্রেন্ডলি PDF"]
  },
  { id: 2, title: "জৈব রসায়ন (অক্সিজেন সিরিজ) - রসায়ন ২য় পত্র", price: 35, oldPrice: 55, category: "Chemistry", tag: "Best Seller", rating: 5.0, color: "bg-blue-500", description: "জৈব রসায়নের ভয় দূর করতে অক্সিজেন সিরিজ সেরা। বিক্রিয়া মনে রাখার সহজ কৌশল এবং ফ্লো-চার্ট দিয়ে সাজানো।", features: ["বিক্রিয়ার মেকানিজম", "নামকরণ ফ্লো-চার্ট", "সহজ ব্যাখ্যা"] },
  { id: 3, title: "ম্যাট্রিক্স ও নির্ণায়ক - উচ্চতর গণিত ১ম পত্র", price: 25, oldPrice: 40, category: "Math", tag: "New", rating: 4.8, color: "bg-amber-500", description: "ম্যাট্রিক্স ও নির্ণায়কের সকল প্রকার অংকের সমাধান এবং ক্যালকুলেটর হ্যাকস।", features: ["ক্যালকুলেটর ট্রিক্স", "সৃজনশীল প্রশ্ন সমাধান"] },
  { id: 4, title: "রক্ত ও সঞ্চালন - জীববিজ্ঞান ২য় পত্র", price: 40, oldPrice: 60, category: "Biology", tag: "", rating: 4.7, color: "bg-emerald-500", description: "হৃৎপিণ্ডের গঠন ও কাজ এবং রক্ত সঞ্চালন প্রক্রিয়ার বিস্তারিত রঙিন চিত্রসহ আলোচনা।", features: ["রঙিন ডায়াগ্রাম", "ছক ও সারণি", "গুরুত্বপূর্ণ তথ্য হাইলাইট"] },
  { id: 5, title: "আইসিটি - নেটওয়ার্কিং ও ওয়েব", price: 20, oldPrice: 35, category: "ICT", tag: "Discount", rating: 4.6, color: "bg-purple-500", description: "এইচটিএমএল এবং নেটওয়ার্কিংয়ের বেসিক থেকে অ্যাডভান্সড টপিক।", features: ["HTML কোড উদাহরণ", "সৃজনশীল প্র্যাকটিস"] },
  { id: 6, title: "সোনার তরী - বাংলা ১ম পত্র", price: 15, oldPrice: 25, category: "Bangla", tag: "", rating: 4.5, color: "bg-orange-500", description: "রবীন্দ্রনাথ ঠাকুরের সোনার তরী কবিতার মূলভাব, শব্দার্থ এবং সৃজনশীল প্রশ্নের উত্তর।", features: ["কবি পরিচিতি", "মূলভাব বিশ্লেষণ", "MCQ প্র্যাকটিস"] },
  { id: 7, title: "তাপগতিবিদ্যা - পদার্থবিজ্ঞান ২য় পত্র", price: 30, oldPrice: 42, category: "Physics", tag: "", rating: 4.8, color: "bg-cyan-500", description: "তাপগতিবিদ্যার সূত্র এবং গাণিতিক সমস্যার সহজ সমাধান।", features: ["সূত্রাবলী", "গাণিতিক উদাহরণ"] },
  { id: 8, title: "গুণগত রসায়ন - রসায়ন ১ম পত্র", price: 20, oldPrice: 40, category: "Chemistry", tag: "Hot", rating: 4.9, color: "bg-fuchsia-500", description: "গুণগত রসায়নের জটিল টপিকগুলো সহজে বোঝার জন্য সেরা নোট।", features: ["দ্রাব্যতা ও গুণফল", "আয়ন শনাক্তকরণ"] },
];

export default function BookDetails() {
  const [, params] = useRoute("/book/:id");
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);

  const bookId = params ? parseInt(params.id) : 0;
  const book = booksData.find((b) => b.id === bookId);

  // যদি বই না পাওয়া যায়
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">বইটি পাওয়া যায়নি!</h2>
          <Button onClick={() => setLocation("/")}>হোমে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => `৳${price}`;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")} 
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary gap-2 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> ফিরে যান
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`aspect-[4/5] w-full rounded-3xl overflow-hidden bg-muted relative group`}>
              {/* Dynamic Background based on book color */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${book.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <BookOpen size={80} className="text-foreground/20 mb-4" />
                <h1 className="text-4xl md:text-6xl font-black text-foreground/10 uppercase tracking-tighter select-none">
                  {book.category.slice(0, 3)}
                </h1>
              </div>

              {/* Tag */}
              {book.tag && (
                <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="text-yellow-500" /> {book.tag}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {book.category} Series
                </span>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Star size={14} className="fill-orange-500 text-orange-500" /> {book.rating} (৫০+ রিভিউ)
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
                {book.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {book.description || "এই বইটিতে রয়েছে অধ্যায়ভিত্তিক বিস্তারিত আলোচনা, শর্টকাট টেকনিক এবং বিগত বছরের প্রশ্ন সমাধান।"}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-5xl font-black text-primary">{formatPrice(book.price)}</span>
              <span className="text-xl text-muted-foreground line-through mb-2 decoration-2">{formatPrice(book.oldPrice)}</span>
              <span className="text-sm font-bold text-green-500 mb-2 bg-green-500/10 px-2 py-0.5 rounded">
                {Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)}% ছাড়
              </span>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4">যা যা থাকছে:</h3>
              <ul className="grid grid-cols-2 gap-3">
                {(book.features || ["হাই কোয়ালিটি PDF", "প্রিন্ট উপযোগী", "লাইফটাইম এক্সেস", "২৪/৭ সাপোর্ট"]).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-input rounded-full h-12 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 hover:text-primary transition-colors"
                >-</button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 hover:text-primary transition-colors"
                >+</button>
              </div>
              
              <Button size="lg" className="flex-1 rounded-full text-base h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <ShoppingCart className="mr-2 h-5 w-5" /> কার্টে যোগ করুন - {formatPrice(book.price * quantity)}
              </Button>
              
              <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-input hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                <Heart size={20} />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-input hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                <Share2 size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}