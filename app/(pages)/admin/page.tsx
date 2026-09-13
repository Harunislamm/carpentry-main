"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Loader2, 
  Package,
  Calendar,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

type Stats = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  avgOrderValue: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    avgOrderValue: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [materialStats, setMaterialStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders')
        ]);
        
        const products = await prodRes.json();
        const orders = await orderRes.json();
        
        const revenue = orders.reduce((acc: number, o: any) => acc + o.total, 0);
        
        setStats({
          totalRevenue: revenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          avgOrderValue: orders.length > 0 ? revenue / orders.length : 0
        });

        // Calculate material distribution
        const mCount = products.reduce((acc: any, p: any) => {
          acc[p.material] = (acc[p.material] || 0) + 1;
          return acc;
        }, {});
        setMaterialStats(mCount);
        
        setRecentOrders(orders.slice(0, 5));
      } catch (e) {
        console.error("Dashboard data fetch failed", e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const cards = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} />, color: "bg-emerald-500", text: "text-emerald-500" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: <ShoppingBag size={20} />, color: "bg-amber-500", text: "text-amber-500" },
    { label: "Active Pieces", value: stats.totalProducts.toString(), icon: <Package size={20} />, color: "bg-blue-500", text: "text-blue-500" },
    { label: "Avg. Transaction", value: `$${stats.avgOrderValue.toFixed(0)}`, icon: <TrendingUp size={20} />, color: "bg-purple-500", text: "text-purple-500" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Workshop Overview</h1>
        <p className="text-stone-500 font-medium">Here's what's happening in your workshop today.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.color} p-3 rounded-2xl text-white shadow-lg`}>
                {card.icon}
              </div>
              <div className="bg-stone-50 p-2 rounded-full text-stone-400 group-hover:text-stone-900 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-3xl font-black text-stone-900 tracking-tighter">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ORDERS */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden mb-12">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <Clock className="text-amber-600" size={20} /> Recent Commissions
            </h3>
            <button className="text-xs font-bold text-amber-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="divide-y divide-stone-50">
            {recentOrders.map((order) => (
              <div key={order._id} className="p-6 hover:bg-stone-50/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{order.customerName}</h4>
                    <p className="text-xs text-stone-500 font-medium">{new Date(order.createdAt).toLocaleDateString()} &bull; {order.items?.length || 0} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-stone-900 text-lg">${order.total}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <div className="p-12 text-center text-stone-400 font-serif italic">
                No active commissions found.
              </div>
            )}
          </div>
        </div>

        {/* MATERIAL DISTRIBUTION (Valuable Insight) */}
        <div className="space-y-6">
           <div className="bg-[#1c1412] rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-[#30241a]">
              <div className="relative z-10">
                <Package className="text-amber-500 mb-4" size={32} />
                <h3 className="text-2xl font-black mb-6 leading-tight">Material Focus</h3>
                
                <div className="space-y-4">
                   {Object.entries(materialStats).map(([material, count]) => {
                     const percentage = Math.round((count / stats.totalProducts) * 100);
                     return (
                       <div key={material} className="space-y-1.5">
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-stone-300">{material}</span>
                           <span className="text-amber-500">{count} pieces</span>
                         </div>
                         <div className="w-full h-1.5 bg-[#2b1d12] rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${percentage}%` }}
                             className="h-full bg-amber-600"
                           />
                         </div>
                       </div>
                     );
                   })}
                   {Object.keys(materialStats).length === 0 && (
                     <p className="text-stone-500 text-xs italic">No materials found.</p>
                   )}
                </div>
              </div>
              
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
           </div>

           <div className="bg-white rounded-[2.5rem] border border-stone-200 p-8 shadow-sm">
             <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Workshop Tip</h4>
             <p className="text-stone-600 italic font-serif leading-relaxed">
               "Sustainable material sourcing increases perceived value to high-end clients by up to 40%."
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}