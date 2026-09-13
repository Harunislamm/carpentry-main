"use client";

import React, { useState } from 'react';
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Camera, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Chairs',
    material: 'Solid Oak',
    image: '',
    badge: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500">
           <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">New Piece</h1>
          <p className="text-stone-500 font-medium">Add a new handcrafted masterpiece to your workshop catalog.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Title of the Work</label>
                <input 
                  name="name" 
                  required 
                  onChange={handleChange} 
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300" 
                  placeholder="e.g. Scandi Minimalist Oak Chair" 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Market Price ($)</label>
                <div className="relative">
                   <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">$</span>
                   <input 
                    name="price" 
                    type="number" 
                    required 
                    onChange={handleChange} 
                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-10 pr-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300" 
                    placeholder="0.00" 
                   />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Collection</label>
                <select name="category" onChange={handleChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 appearance-none">
                  <option>Chairs</option>
                  <option>Tables</option>
                  <option>Storage</option>
                  <option>Office</option>
                  <option>Bedroom</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Primary Material</label>
                <input name="material" required onChange={handleChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900" placeholder="e.g. Solid Walnut" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Showcase Badge</label>
                <input name="badge" onChange={handleChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900" placeholder="e.g. Limited Edition" />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Showcase Image Source</label>
                <div className="relative group">
                  <Camera className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                  <input 
                    name="image" 
                    required 
                    onChange={handleChange} 
                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-5 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
                <p className="mt-2 text-[10px] text-stone-400 font-medium px-1 italic">Pro Tip: Use high-resolution Unsplash URLs for maximum impact.</p>
              </div>
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-amber-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-stone-200">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
            Publish to Storefront
          </button>
        </form>

        {/* PREVIEW CARD */}
        <div className="lg:col-span-2 space-y-4 sticky top-28">
           <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Live Storefront Preview</label>
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl group"
           >
              <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-300">
                    <ImageIcon size={48} strokeWidth={1} />
                    <p className="text-xs font-bold uppercase tracking-widest mt-2">No Image Provided</p>
                  </div>
                )}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   {formData.badge && (
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-900 border border-stone-100 shadow-lg">
                        {formData.badge}
                      </span>
                   )}
                   <span className="bg-amber-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-amber-500 shadow-lg w-fit">
                     {formData.category}
                   </span>
                </div>
              </div>
              <div className="p-8">
                 <h3 className="text-2xl font-black text-stone-900 tracking-tight mb-1">{formData.name || "Masterpiece Title"}</h3>
                 <p className="text-stone-400 font-bold text-xs uppercase tracking-widest mb-4">{formData.material || "Crafted Material"}</p>
                 <div className="flex justify-between items-end">
                    <p className="text-3xl font-black text-amber-600 tracking-tighter">${formData.price || "0"}</p>
                    <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-lg">
                       <Save size={20} />
                    </div>
                 </div>
              </div>
           </motion.div>

           <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
              <div className="bg-amber-100 p-2 rounded-xl h-fit">
                 <Loader2 size={16} className="text-amber-600" />
              </div>
              <p className="text-xs text-amber-900/70 font-medium leading-relaxed">
                Changes made here appear instantly on the public catalog. Please ensure all details are historically accurate.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}