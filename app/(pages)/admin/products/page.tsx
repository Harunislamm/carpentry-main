"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, Loader2, AlertTriangle, Package, ExternalLink, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      setDeleteId(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-amber-600 w-8 h-8" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Workshop Inventory</h1>
          <p className="text-stone-500 font-medium">Manage and monitor all your physical masterpieces.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm w-full md:w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-stone-200 rounded-xl text-stone-500 hover:text-stone-900 hover:border-stone-300 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest">Masterpiece</th>
              <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest hidden sm:table-cell">Category</th>
              <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest">Price</th>
              <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredProducts.map((p, i) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                key={p._id}
                className="hover:bg-stone-50/50 transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden bg-stone-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                      <img src={p.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900 leading-tight">{p.name}</span>
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">{p.material}</span>
                    </div>
                  </div>
                </td>
                <td className="p-6 hidden sm:table-cell">
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-wider">
                    {p.category}
                  </span>
                </td>
                <td className="p-6">
                  <span className="font-black text-stone-900">${p.price.toLocaleString()}</span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(p._id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-stone-900">No pieces found</h3>
            <p className="text-stone-500 max-w-xs mx-auto mt-2">Try adjusting your search terms or add a new masterpiece to your catalog.</p>
          </div>
        )}
      </div>

      {/* --- CUSTOM DELETE MODAL --- */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-stone-200 overflow-hidden relative z-10"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="text-2xl font-black text-stone-900 leading-tight">Final Decision?</h3>
                <p className="text-stone-500 text-sm mt-3 font-medium">
                  This masterpiece will be struck from the workshop records and catalog forever.
                </p>
              </div>

              <div className="flex p-4 gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-4 text-xs font-bold text-stone-500 hover:bg-stone-50 active:scale-95 transition-all rounded-2xl uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-red-200"
                >
                  {isDeleting ? <Loader2 size={16} className="animate-spin" /> : "Delete Forever"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
