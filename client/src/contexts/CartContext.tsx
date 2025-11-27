import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

// --- CONFIGURATION ---
// আপনি চাইলে এখান থেকে সহজেই ডিসকাউন্ট অন/অফ বা পরিবর্তন করতে পারবেন
export const DISCOUNT_CONFIG = {
  isEnabled: true,      // ডিসকাউন্ট চালু আছে কিনা
  minBundleCount: 2,    // কয়টি বান্ডিল কিনলে ডিসকাউন্ট পাবে
  discountPercent: 15,  // কত পারসেন্ট ডিসকাউন্ট (15%)
};

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  lastAddedTime: number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastAddedTime, setLastAddedTime] = useState<number | null>(null);

  const addToCart = (item: CartItem) => {
    setLastAddedTime(Date.now());
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Calculation Logic
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Discount Logic
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  let discountAmount = 0;
  
  if (DISCOUNT_CONFIG.isEnabled && totalQuantity >= DISCOUNT_CONFIG.minBundleCount) {
    discountAmount = (subtotal * DISCOUNT_CONFIG.discountPercent) / 100;
  }

  const finalTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, 
      subtotal, discountAmount, finalTotal, lastAddedTime 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
