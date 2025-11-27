
import React from "react";
import { useCart, DISCOUNT_CONFIG } from "../contexts/CartContext";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar"; // Assuming you have this
import Footer from "@/components/Footer"; // Assuming you have this

export default function CartPage() {
  const { cartItems, removeFromCart, subtotal, discountAmount, finalTotal } = useCart();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full p-6 pt-24">
        
        <button onClick={() => setLocation("/")} className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> কেনাকাটা চালিয়ে যান
        </button>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingBag /> আপনার কার্ট ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <p className="text-xl text-muted-foreground">আপনার কার্ট খালি</p>
            <button onClick={() => setLocation("/")} className="mt-4 text-primary font-bold hover:underline">
              বই দেখুন
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">${item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">${item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Discount Message */}
              {DISCOUNT_CONFIG.isEnabled && cartItems.length < DISCOUNT_CONFIG.minBundleCount && (
                <div className="p-3 bg-blue-500/10 text-blue-500 text-sm rounded-lg border border-blue-500/20 text-center">
                  আর মাত্র {DISCOUNT_CONFIG.minBundleCount - cartItems.length} টি বই কিনলে পাচ্ছেন {DISCOUNT_CONFIG.discountPercent}% ছাড়!
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border p-6 rounded-2xl shadow-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">অর্ডার সামারি</h3>
                <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সাবটোটাল</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>ডিসকাউন্ট ({DISCOUNT_CONFIG.discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>মোট</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-primary/20">
                  পেমেন্ট করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
