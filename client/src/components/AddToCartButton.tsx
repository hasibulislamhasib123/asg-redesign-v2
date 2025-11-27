import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  size?: 'sm' | 'lg';
  text?: string;
  className?: string;
}

// বইয়ের গ্রাফিক ডিজাইন (বইটি লাল রঙের দেওয়া হয়েছে যাতে কালো ব্যাকগ্রাউন্ডে ফুটে ওঠে)
const BookGraphic = () => (
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="0" width="20" height="28" rx="2" fill="#ef4444" />
    <rect x="18" y="0" width="4" height="28" rx="1" fill="#b91c1c" />
    <rect x="5" y="4" width="10" height="4" rx="1" fill="white" fillOpacity="0.4"/>
    <rect x="5" y="10" width="8" height="2" rx="1" fill="white" fillOpacity="0.4"/>
    <path d="M22 2H2V26H22V2Z" fill="black" fillOpacity="0.05"/>
  </svg>
);

const AddToCartButton = ({ onClick, size = 'lg', text = "Add to cart", className = "" }: AddToCartButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'animating' | 'success'>('idle');
  const [scope, animate] = useAnimate();

  // সাইজ অনুযায়ী ভেরিয়েবল
  const isSmall = size === 'sm';
  const heightClass = isSmall ? 'h-10 text-sm' : 'h-16 text-lg';
  const widthClass = isSmall ? 'w-36' : 'w-64'; // ছোট সাইজের জন্য উইডথ কমানো হয়েছে
  const iconSize = isSmall ? 16 : 24;
  const cartIconSize = isSmall ? 24 : 40;

  const handleClick = (e: React.MouseEvent) => {
    // প্যারেন্ট এলিমেন্টের ক্লিক ইভেন্ট বন্ধ করা (যাতে কার্ডে ক্লিক না পড়ে)
    e.stopPropagation();

    if (status !== 'idle') return;
    
    if (onClick) {
        onClick(e);
    }

    setStatus('animating');

    setTimeout(() => {
      setStatus('success');
    }, 2200);

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  useEffect(() => {
    if (status === 'animating') {
      const sequence = async () => {
        if (!scope.current) return;

        // রিসেট পজিশন
        animate("#book-obj", { y: -80, opacity: 0, scale: 0.5 }, { duration: 0 });
        animate("#cart-group", { x: 0, opacity: 1 }, { duration: 0 });

        // ১. বই উপর থেকে পড়বে
        await animate("#book-obj", 
          { y: isSmall ? -2 : -5, opacity: 1, scale: isSmall ? 0.8 : 1 }, 
          { duration: 0.5, type: "spring", bounce: 0.4 }
        );

        // ২. কার্ট একটু চ্যাপ্টা হবে (Squash Effect)
        await animate("#cart-icon", 
          { scaleY: 0.7, scaleX: 1.1, y: 5 }, 
          { duration: 0.15 }
        );
        await animate("#cart-icon", 
          { scaleY: 1, scaleX: 1, y: 0 }, 
          { duration: 0.15 }
        );

        // একটু বিরতি
        await new Promise(r => setTimeout(r, 100));

        // ৩. কার্ট পিছনে টান দিবে (Anticipation)
        await animate("#cart-group", 
          { x: -10 }, 
          { duration: 0.3, ease: "backOut" }
        );

        // ৪. কার্ট সামনের দিকে স্পিডে চলে যাবে
        animate("#cart-icon", { rotate: -10 }, { duration: 0.2 });
        
        await animate("#cart-group", 
          { x: 200, opacity: 0 }, 
          { duration: 0.8, ease: "backIn" } 
        );
      };

      sequence();
    }
  }, [status, animate, scope, isSmall]);

  return (
    <div className={`relative z-10 ${className}`}>
      <button
        onClick={handleClick}
        disabled={status !== 'idle'}
        className={`
          relative flex items-center justify-center 
          bg-white text-black 
          ${heightClass} ${widthClass} rounded-full font-bold
          shadow-[0_0_15px_rgba(255,255,255,0.3)]
          transition-all duration-200 active:scale-95
          overflow-hidden cursor-pointer border border-transparent hover:border-gray-200
        `}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* আইডল অবস্থা */}
          <div 
            className={`absolute flex items-center gap-2 transition-all duration-300 ${
              status === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <ShoppingCart size={iconSize} strokeWidth={2.5} />
            <span>{text}</span>
          </div>

          {/* এনিমেটিং অবস্থা */}
          {status === 'animating' && (
            <div ref={scope} className="absolute inset-0 flex items-center justify-center">
              <div id="cart-group" className="relative flex items-center justify-center">
                  
                  {/* বই */}
                  <div id="book-obj" className="absolute z-10" style={{ opacity: 0, transform: 'translateY(-80px)' }}>
                     <div style={{ transform: isSmall ? 'scale(0.6)' : 'scale(1)' }}>
                        <BookGraphic />
                     </div>
                  </div>

                  {/* কার্ট আইকন */}
                  <div id="cart-icon" className="relative z-20 flex flex-col items-center">
                      <ShoppingCart size={cartIconSize} className="text-black" strokeWidth={2} />
                      
                      {/* চাকা ঘুরার এনিমেশন */}
                      <div className="absolute bottom-0.5 -left-1">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                            className={`bg-black rounded-full border border-white ${isSmall ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} 
                          />
                      </div>
                      <div className="absolute bottom-0.5 -right-1">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                            className={`bg-black rounded-full border border-white ${isSmall ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} 
                          />
                      </div>
                  </div>
              </div>
            </div>
          )}

          {/* সাকসেস অবস্থা */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center gap-1.5 text-green-600"
              >
                <div className="bg-green-100 p-0.5 rounded-full">
                  <Check size={iconSize} strokeWidth={3} />
                </div>
                <span className="font-bold">Added</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </button>
    </div>
  );
};

export default AddToCartButton;
