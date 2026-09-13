"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Loader2, Check } from "lucide-react";
import { useCart } from "@/context/page";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  material: string;
  image: string;
  badge?: string;
  description?: string;
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) router.push('/products');
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  const handleAdd = () => {
    if (!product) return;
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${product.name} added to cart`, {
        icon: <Check className="w-4 h-4 text-white" />,
        style: { background: "#d97706", color: "white", padding: "16px", borderRadius: "16px", border: "none" }
      });
    }, 500);
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* IMAGE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[4/5] bg-stone-200 rounded-3xl overflow-hidden ring-1 ring-stone-900/5 shadow-2xl"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-stone-900 rounded-full">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* DETAILS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-2 mb-6">
              <p className="text-amber-600 font-bold uppercase tracking-widest text-xs">{product.category} &bull; {product.material}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-none">
                {product.name}
              </h1>
            </div>

            <p className="text-3xl font-mono font-bold text-stone-900 mb-8">${product.price}</p>
            
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {product.description || `The ${product.name} is a testament to traditional craftsmanship, meticulously shaped from premium ${product.material}. Designed to anchor your space with organic warmth and enduring strength.`}
            </p>

            <button 
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full bg-stone-900 text-white flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-600 hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-75 disabled:hover:bg-stone-900 disabled:hover:translate-y-0"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingBag className="w-5 h-5" />}
              {isAdding ? "Working..." : "Add to Cart"}
            </button>

            <div className="grid grid-cols-2 gap-4 mt-12 py-8 border-t border-stone-200">
               <div className="flex items-center gap-3 text-stone-600">
                 <Truck className="w-5 h-5 text-amber-600" />
                 <span className="text-sm font-medium">Free White-Glove Delivery</span>
               </div>
               <div className="flex items-center gap-3 text-stone-600">
                 <ShieldCheck className="w-5 h-5 text-amber-600" />
                 <span className="text-sm font-medium">Lifetime Structural Warranty</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
