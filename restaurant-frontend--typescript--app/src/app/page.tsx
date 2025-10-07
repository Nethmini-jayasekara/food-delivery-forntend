 import React from 'react';
 import { getProducts } from '../lib/api';
 import ProductCard from '../components/ProductCard';
 export default async function HomePage() {
 const products = await getProducts();
 return (
 <main className="p-6">
 <h1 className="text-2xl font-bold mb-4">Menu</h1>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
 {products.map((p:any) => <ProductCard key={p.id} product={p} />)}
 </div>
 </main>
 );
 }