"use client";

import React, { useEffect, useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Truck, 
  Loader2, 
  Package, 
  Calendar, 
  User, 
  ChevronRight,
  MoreVertical,
  Search,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-amber-600 w-8 h-8" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Commissions</h1>
          <p className="text-stone-500 font-medium">Manage customer orders and fulfillment status.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search commissions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm w-full md:w-64 shadow-sm"
          />
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredOrders.map((order, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={order._id} 
            className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden group hover:border-amber-200 transition-all"
          >
            <div className="p-8">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 leading-none mb-1">{order.customerName}</h3>
                    <div className="flex items-center gap-2 text-stone-400 font-medium text-xs">
                       <Mail size={12} /> {order.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Status</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-stone-100 hidden lg:block" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Commissioned</span>
                    <div className="flex items-center gap-2 text-stone-900 font-bold text-sm bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                       <Calendar size={14} className="text-stone-400" />
                       {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                <div className="lg:col-span-2">
                  <div className="bg-stone-50/50 rounded-[2rem] p-6 border border-stone-100">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Line Items</p>
                    <div className="space-y-3">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-50 shadow-sm">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-stone-400">
                               {idx + 1}
                             </div>
                             <span className="font-bold text-stone-700 text-sm">{item.name}</span>
                             <span className="text-[10px] font-bold bg-stone-100 px-1.5 py-0.5 rounded text-stone-500 uppercase tracking-tighter">x{item.quantity}</span>
                          </div>
                          <span className="font-black text-stone-900 text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-stone-200/50 flex justify-between items-center px-2">
                      <span className="text-sm font-bold text-stone-500">Order Revenue</span>
                      <span className="text-2xl font-black text-stone-900 tracking-tighter">${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4 ml-2">Fulfillment</p>
                  <button 
                    onClick={() => updateStatus(order._id, 'Pending')} 
                    className={`w-full flex items-center gap-3 text-xs font-black uppercase tracking-widest px-6 py-4 rounded-2xl transition-all ${
                      order.status === 'Pending' ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}
                  >
                    <Clock size={16} /> Mark Pending
                  </button>
                  <button 
                    onClick={() => updateStatus(order._id, 'Shipped')} 
                    className={`w-full flex items-center gap-3 text-xs font-black uppercase tracking-widest px-6 py-4 rounded-2xl transition-all ${
                      order.status === 'Shipped' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-stone-50 text-stone-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 border border-transparent'
                    }`}
                  >
                    <Truck size={16} /> Ship Commission
                  </button>
                  <button 
                    onClick={() => updateStatus(order._id, 'Delivered')} 
                    className={`w-full flex items-center gap-3 text-xs font-black uppercase tracking-widest px-6 py-4 rounded-2xl transition-all ${
                      order.status === 'Delivered' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-stone-50 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 border border-transparent'
                    }`}
                  >
                    <CheckCircle size={16} /> Mark Completed
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-stone-200 text-center">
             <div className="w-16 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
                <Package size={32} />
             </div>
             <h3 className="text-xl font-bold text-stone-900">No matching orders</h3>
             <p className="text-stone-500 max-w-xs mx-auto mt-2">Check your spelling or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}