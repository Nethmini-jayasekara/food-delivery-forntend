 'use client';
 import Link from 'next/link';
 import { useCart } from './CartProvider';
 export default function Navbar(){
 const { items } = useCart();
 const count = items.reduce((s:any, it:any) => s + it.qty, 0);
 return (
 <nav className="bg-white shadow p-4 flex justify-between">
 <Link href="/" className="font-bold">FoodDelivery</Link>
 <div className="flex gap-4 items-center">
 <Link href="/cart">Cart ({count})</Link>
 <Link href="/login">Login</Link>
 </div>
 </nav>
 );
 }