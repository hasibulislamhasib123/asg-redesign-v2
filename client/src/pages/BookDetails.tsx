import React, { useState, useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, ShoppingCart, Star, Share2, Heart, CheckCircle2, 
  BookOpen, TrendingUp, Award, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { booksData, Book } from "@/lib/mockData";
import AddToCartButton from "../components/AddToCartButton";

// Logic Helpers: Utility functions for book series organization and recommendation calculations

function getSeriesBooks(currentBook: Book, allBooks: Book[]) {
  if (!currentBook.series) return [];
  
  return allBooks
    .filter(book => 
      book.series?.id === currentBook.series?.id && 
      book.id !== currentBook.id
    )
    .sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0));
}

function getRecommendedBooks(currentBook: Book, allBooks: Book[]) {
  return allBooks
    .filter(book => book.id !== currentBook.id)
    .map(book => {
      let score = book.salesCount;
      // Scoring algorithm: Boost points for same author, category match, and similar price range
      if (book.author === currentBook.author) score += 500;
      if (book.category === currentBook.category) score += 300;
      if (Math.abs(book.price - currentBook.price) < 50) score += 100;
      return { ...book, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4); // Returns top 4 most relevant book recommendations
}

// Suggested Book Card Component: Displays individual recommended books with match percentage and quick actions
const SuggestedBookCard: React.FC<{ book: Book; currentCategory: string }> = ({ book, currentCategory }) => {
  const [, setLocation] = useLocation();
  const formatPrice = (price: number) => `$${price}`;

  const handleCardClick = () => {
    setLocation(`/book/${book.id}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Added to cart:", book.title);
    // Cart logic handler: Will integrate with cart management system
  };

  // Calculate match percentage for visual display based on category relevance
  const isHighMatch = book.category === currentCategory;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="group relative bg-card border border-border rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Color Block Cover: Solid gradient background with category abbreviation */}
      <div className={`h-40 w-full ${book.color} rounded-xl mb-4 relative overflow-hidden`}>
        {/* Match Badge: Displays relevance percentage to indicate recommendation fit */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
           {isHighMatch ? "95% Match" : "80% Match"}
        </div>
        
        {/* Category Abbreviation: Large background text for visual identity */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
           <h1 className="text-6xl font-black text-white uppercase tracking-tighter select-none">
             {book.category.substring(0, 2)}
           </h1>
        </div>
      </div>

      {/* Content Section: Book title, author information */}
      <div className="space-y-1">
        <h3 className="font-bold text-foreground line-clamp-1 leading-tight group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">{book.author}</p>
        
        {/* Footer Section: Price and add to cart action */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
           <span className="text-lg font-bold text-primary">{formatPrice(book.price)}</span>
           
           {/* Add to Cart Button: Quick action to add book to shopping cart */}
           <button 
             onClick={handleAddToCart}
             className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md active:scale-95"
             title="Add to Cart"
           >
              <ShoppingCart size={14}/>
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function BookDetails() {
  const [, params] = useRoute("/book/:id");
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);

  const bookId = params ? parseInt(params.id) : 0;
  const book = booksData.find((b) => b.id === bookId);

  // Derived Data: Memoized calculations for series books and recommendations to prevent unnecessary re-renders
  const seriesBooks = useMemo(() => book ? getSeriesBooks(book, booksData) : [], [book]);
  const recommendedBooks = useMemo(() => book ? getRecommendedBooks(book, booksData) : [], [book]);

  if (!book) return null;

  const formatPrice = (price: number) => `$${price}`;

  return (
   <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-24 md:pb-20">
      <Navbar />

      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")} 
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary gap-2 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Books
        </Button>

        {/* Main Product Section: Book cover image and detailed information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden bg-muted relative group shadow-2xl border border-border">
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${book.color} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <BookOpen size={100} className="text-foreground/20 mb-6 drop-shadow-lg" />
                <h1 className="text-5xl md:text-7xl font-black text-foreground/10 uppercase tracking-tighter select-none">
                  {book.category.slice(0, 3)}
                </h1>
              </div>
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {book.tag && (
                    <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs font-bold rounded-full border border-border shadow-sm flex items-center gap-1">
                        <Sparkles size={12} className="text-yellow-500" /> {book.tag}
                    </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {book.category}
                </span>
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                   <TrendingUp size={14}/> {book.salesCount}+ copies sold
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
                {book.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {book.description || "এইচএসসি এবং অ্যাডমিশন প্রস্তুতির জন্য একটি পূর্ণাঙ্গ গাইড। সহজ ভাষায় লেখা এবং প্রচুর উদাহরণ সহ।"}
              </p>
              
              <div className="flex items-center gap-3 mb-8 p-3 bg-muted/50 rounded-xl w-fit border border-border/50">
                 <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {book.author.charAt(0)}
                 </div>
                 <div>
                    <p className="text-xs text-muted-foreground">লেখক</p>
                    <p className="text-sm font-bold text-foreground">{book.author}</p>
                 </div>
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-5xl font-black text-primary">{formatPrice(book.price)}</span>
              <span className="text-xl text-muted-foreground line-through mb-2 decoration-2">{formatPrice(book.oldPrice)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-input rounded-full h-12 w-fit px-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 hover:text-primary font-bold text-lg">-</button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 hover:text-primary font-bold text-lg">+</button>
              </div>
                  <AddToCartButton 
                  size="sm" 
                  text="কার্টে যোগ করুন" 
                  onClick={(e) => { 
                    console.log("Add to cart clicked"); 
                  }}
                />
              <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-input hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                <Heart size={20} />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* --- Series Timeline Section --- */}
        {book.series && seriesBooks.length > 0 && (
            <div className="mb-24">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            আরও পড়ুন: <span className="text-primary">{book.series.name}</span>
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            এই সিরিজের {book.series.totalBooks} টি বইয়ের মধ্যে এটি {book.series.order} নম্বর বই
                        </p>
                    </div>
                    <Button variant="link" className="text-primary p-0 h-auto font-bold hover:underline">পুরো সিরিজ দেখুন</Button>
                </div>
                {/* Timeline Grid (Simplified for brevity, logic remains same) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {seriesBooks.map(sb => (
                         <div key={sb.id} onClick={() => setLocation(`/book/${sb.id}`)} className="bg-card border border-border p-4 rounded-xl cursor-pointer hover:border-primary/50">
                             <div className={`h-16 w-full ${sb.color} rounded mb-2 opacity-60`}></div>
                             <p className="text-sm font-bold line-clamp-1">{sb.title}</p>
                         </div>
                     ))}
                </div>
            </div>
        )}

        {/* --- ✨ Recommended Books Section (Updated Design) --- */}
        <div>
            <div className="flex items-center gap-2 mb-8">
                <Award className="text-orange-500" />
                <h2 className="text-2xl font-bold text-foreground">আপনার জন্য সুপারিশ</h2>
            </div>
            
            {/* Grid with New Card Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedBooks.map((recBook) => (
                    <SuggestedBookCard key={recBook.id} book={recBook} currentCategory={book.category} />
                ))}
            </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}