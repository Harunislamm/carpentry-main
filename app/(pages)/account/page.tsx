"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, User, LogOut, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Extend with basic fields for demo
type OrderItem = { name: string; price: number; quantity: number };
type Order = {
  _id: string;
  customerName: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data: Order[] = await res.json();
        // Simple client side filter, ideally should be server-side protected route
        setOrders(data.filter((o) => o.email === user.email));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user, router]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 px-4 sm:px-8 pb-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200">
            <div className="w-16 h-16 bg-amber-600/10 text-amber-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
            <p className="text-sm text-stone-500 mb-6">{user.email}</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-stone-50 text-stone-900 rounded-xl font-medium text-sm">
                <span className="flex items-center gap-2"><Package className="w-4 h-4" /> My Orders</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-between p-3 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-colors"
               >
                <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="md:col-span-9 bg-white rounded-3xl border border-stone-200 p-8">
          <h1 className="text-2xl font-bold text-stone-900 mb-8">Order History</h1>
          
          {orders.length === 0 ? (
             <div className="text-center py-12">
               <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-stone-900">No orders yet</h3>
               <p className="text-stone-500">When you place an order, it will appear here.</p>
             </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border border-stone-200 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-stone-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-stone-900 font-medium">{item.quantity}x {item.name}</span>
                        <span className="text-stone-500 font-mono">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center font-bold">
                    <span className="text-stone-900">Total</span>
                    <span className="text-lg font-mono">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
