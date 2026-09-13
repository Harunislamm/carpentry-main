"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Search, Check, Loader2, AlertCircle } from "lucide-react";
import { useCart } from '@/context/page';
import Link from 'next/link';

// --- Types ---
// Note: We extended this to include _id (MongoDB's default ID)
type Product = {
  _id: string; // Changed from id: number
  name: string;
  price: number;
  category: string;
  material: string;
  image: string;
  badge?: string;
};

const CATEGORIES = ["All Furniture", "Chairs", "Tables", "Storage", "Office", "Bedroom"];
const MATERIALS = ["Solid Oak", "Walnut", "Reclaimed Pine", "Mahogany"];

export default function ProductsPage() {
  // --- State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Furniture");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showToast, setShowToast] = useState(false);
  
  const { addToCart } = useCart();

  // --- 1. Fetch Data from DB ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Filtering Logic (Client Side) ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Furniture" || product.category === selectedCategory;
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      
      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [searchQuery, selectedCategory, selectedMaterials, products]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // --- Handlers ---
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Furniture");
    setSelectedMaterials([]);
  };

  // --- Render: Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
        <p className="text-stone-500 font-medium animate-pulse">Gathering the collection...</p>
      </div>
    );
  }

  // --- Render: Error State ---
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <div className="bg-red-50 p-4 rounded-full text-red-600">
            <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Connection Error</h2>
        <p className="text-stone-500">{error}</p>
        <button onClick={() => window.location.reload()} className="text-amber-700 font-bold underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-amber-100 pt-28">
      
      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-stone-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10">
          <div className="bg-amber-500 rounded-full p-1 text-stone-900"><Check className="w-4 h-4" /></div>
          <span className="font-medium">Item added to your workshop cart!</span>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white/50 backdrop-blur-md border-b border-[#2b1d12]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Workshop Collection</h1>
              <p className="text-sm text-stone-500">
                {filteredProducts.length} results {searchQuery && `for "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search furniture..." 
                  className="w-full bg-[#FAF9F6] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR FILTERS */}
          <aside className="lg:w-64 flex-shrink-0 space-y-8 hidden lg:block">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Categories</h3>
                {(selectedCategory !== "All Furniture" || selectedMaterials.length > 0) && (
                  <button onClick={resetFilters} className="text-[10px] font-bold text-amber-600 hover:underline">RESET</button>
                )}
              </div>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between cursor-pointer transition-colors group ${selectedCategory === cat ? 'text-amber-700' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    <span className="text-sm font-medium">{cat}</span>
                    {selectedCategory === cat && <Check className="w-3 h-3" />}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Material</h3>
              <div className="space-y-2">
                {MATERIALS.map((wood) => (
                  <label key={wood} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedMaterials.includes(wood)}
                      onChange={() => toggleMaterial(wood)}
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4" 
                    />
                    <span className={`text-sm group-hover:text-stone-900 ${selectedMaterials.includes(wood) ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>
                      {wood}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 animate-in fade-in duration-500">
                {displayedProducts.map((product) => (
                  <div key={product._id} className="group relative">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 mb-4">
                      <Link href={`/products/${product._id}`}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        />
                      </Link>
                      
                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-900 rounded-full shadow-sm">
                          {product.badge}
                        </span>
                      )}

                      <div className="absolute inset-x-0 bottom-0 pointer-events-none p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                        <button 
                          onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          className="w-full bg-[#120c0a] text-white py-3 rounded-xl font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-amber-700 shadow-xl pointer-events-auto"
                        >
                          <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">{product.material}</span>
                      <Link href={`/products/${product._id}`}>
                        <h3 className="text-lg font-bold text-stone-900 tracking-tight hover:text-amber-600 transition-colors cursor-pointer">{product.name}</h3>
                      </Link>
                      <p className="text-xl font-mono font-semibold text-stone-900">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">No pieces found</h3>
                <p className="text-stone-500 mb-6">Try adjusting your filters or search query.</p>
                <button onClick={resetFilters} className="text-amber-700 font-bold hover:underline">Clear all filters</button>
              </div>
            )}

            {/* LOAD MORE */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-20 border-t border-stone-200 pt-12 text-center">
                <p className="text-sm text-stone-500 mb-6 font-medium">
                  Viewing {displayedProducts.length} of {filteredProducts.length} pieces
                </p>
                <button 
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="px-10 py-4 border-2 border-stone-900 rounded-full text-sm font-bold text-stone-900 hover:bg-stone-900 hover:text-white transition-all active:scale-95"
                >
                  Load More Masterpieces
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}