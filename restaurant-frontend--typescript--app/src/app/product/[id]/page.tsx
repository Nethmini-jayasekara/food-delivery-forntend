 'use client';
 import React, { useEffect, useState } from 'react';
 import { useRouter } from 'next/navigation';
 import { useSearchParams } from 'next/navigation';
 import { useCart } from '../../../components/CartProvider';
 export default function ProductPage({ params }: { params: { id: string } }){
 const { id } = params;
 const [product, setProduct] = useState<any>(null);
 const { addToCart } = useCart();
 useEffect(() => {
 fetch(`/api/products/${id.replace('/', '')}`.replace('/api/products/',
 process.env.NEXT_PUBLIC_API_URL + '/api/products/'))
 .then(r => r.json()).then(setProduct);
 }, [id]);
 if (!product) return <div>Loading...</div>;
 return (
 <div className="p-6">
 <h1 className="text-2xl font-bold">{product.name}</h1>
 <img src={product.imageUrl} className="h-64 w-full object-cover my-4" />
 <p>{product.description}</p>
 <div className="mt-4 flex gap-4">
 <div className="text-xl font-bold">${product.price}</div>
 <button onClick={() => addToCart(product)} className="px-4 py-2 bg
green-600 text-white rounded">Add to cart</button>
 </div>
 </div>
 );
 }