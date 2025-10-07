'use client';

import React from 'react';
import { useCart } from '../../components/CartProvider';
import { postOrder } from '../../lib/api';

export default function CartPage() {
  const { items, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  async function handleSubmitOrder() {
    if (!items.length) return alert('Cart is empty');

    try {
      const order = { items: items.map(i => ({ productId: i.product.id, qty: i.qty })) };
      const res = await postOrder(order);
      alert('Order submitted! Order ID: ' + res.id);
      clearCart();
    } catch (err: any) {
      alert(err.message || 'Failed to submit order');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.map((item) => (
        <div key={item.product.id} className="flex justify-between mb-2">
          <div>{item.product.name} x {item.qty}</div>
          <div>${item.product.price * item.qty}</div>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ${total}</div>
      <button
        onClick={handleSubmitOrder}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Order
      </button>
    </div>
  );
}
