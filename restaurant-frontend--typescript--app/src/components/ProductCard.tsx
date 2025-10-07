 'use client';
 import Link from 'next/link';
 import { useCart } from './CartProvider';
 export default function ProductCard({ product }: any){
 const { addToCart } = useCart();
 return (
 <div className="border rounded p-4">
 <img src={product.imageUrl} alt={product.name} className="h-40 w-full 
object-cover mb-2" />
 <h3 className="font-semibold">{product.name}</h3>
 <p>{product.description}</p>
 <div className="flex justify-between items-center mt-2">
 <div className="text-lg font-bold">${product.price}</div>
 <div className="flex gap-2">
 <Link href={`/products/${product.id}`} className="underline">View</
 Link>
 <button onClick={() => addToCart(product)} className="px-3 py-1 bg
blue-600 text-white rounded">Add</button>
 </div>
 </div>
 </div>
 );
 }