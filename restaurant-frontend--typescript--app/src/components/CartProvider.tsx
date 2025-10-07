'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Product type locally if import is failing
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
}

type CartItem = { product: Product; qty: number };

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  function addToCart(product: Product, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(p => p.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += qty;
        return copy;
      }
      return [...prev, { product, qty }];
    });
  }

  function removeFromCart(productId: number) {
    setItems(prev => prev.filter(p => p.product.id !== productId));
  }

  function updateQuantity(productId: number, qty: number) {
    setItems(prev => {
      if (qty <= 0) return prev.filter(p => p.product.id !== productId);
      return prev.map(item => 
        item.product.id === productId ? { ...item, qty } : item
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};