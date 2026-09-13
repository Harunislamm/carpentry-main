"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/page";
import { ArrowLeft, Loader2, Lock, LayoutDashboard, Truck, ShieldCheck, Mail, User, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, cartCount } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsProcessing(true);

    const fullAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cart, 
          total: subtotal,
          shippingAddress: fullAddress 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          // Fallback logic
          clearCart();
          router.push("/?success=true");
        }
      } else {
        alert("There was an issue processing your checkout. Please try again.");
      }
    } catch (err) {
      console.error("Checkout Error", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#2b1d12] flex flex-col items-center justify-center pt-24 pb-20">
        <h2 className="text-3xl font-black text-amber-500 mb-6">Your Cart is Empty</h2>
        <Link href="/products" className="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">Checkout.</h1>
          <p className="text-stone-500 mt-2">Complete your masterworks order.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* CHECKOUT FORM */}
          <div className="lg:col-span-7">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-stone-900/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-stone-900 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Shipping Details</h2>
              </div>

              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-stone-400" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-stone-400" />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                    placeholder="123 Woodsmith Lane"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                      placeholder="Portland"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                      placeholder="97204"
                    />
                  </div>
                </div>
              </form>

            </motion.div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-5">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-[#2b1d12] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h2 className="text-2xl font-black text-white tracking-tight mb-8 relative z-10">Order Summary</h2>

              <div className="space-y-6 mb-8 relative z-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-stone-800">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <p className="text-stone-400 text-xs mt-1 font-mono">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-mono font-bold text-amber-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#402e20] pt-6 space-y-4 mb-8 relative z-10">
                <div className="flex justify-between text-stone-400 text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400 text-sm font-medium">
                  <span>Shipping</span>
                  <span className="text-amber-500">Complimentary</span>
                </div>
                <div className="pt-4 border-t border-[#402e20] flex justify-between items-end text-white">
                  <span className="text-lg font-black tracking-tight">Total</span>
                  <span className="text-3xl font-black font-mono">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-500 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all disabled:opacity-50 relative z-10"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Complete Purchase
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-stone-500 text-xs font-medium relative z-10">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure SSL Encrypted Checkout</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
