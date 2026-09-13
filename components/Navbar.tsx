"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag, User, LogOut, LayoutDashboard, Loader2, Trash2, ArrowRight, Hammer, Menu, X
} from 'lucide-react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/context/page';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { cart, removeFromCart, cartCount, subtotal, clearCart } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Check login status on mount and path change
  useEffect(() => {
    const hasToken = document.cookie.includes('token');
    setIsLoggedIn(hasToken);
  }, [pathname]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      setIsLoggedIn(false);
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (pathname === '/signin' || pathname === '/signup') return null;

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#2b1d12]/90 backdrop-blur-xl border-b border-[#30241a]/50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <div className="bg-stone-800 p-2 rounded-lg relative z-10 transition-colors group-hover:bg-amber-600">
                <Hammer className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-lg tracking-tighter leading-none">HARUN.</span>
              <span className="text-[9px] text-stone-300 font-bold uppercase tracking-[0.3em] leading-normal group-hover:text-amber-500 transition-colors">Masterworks</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/products' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative py-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-stone-300 hover:text-white'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#1c1412] border border-[#30241a] flex items-center justify-center text-amber-500 font-bold text-xs uppercase transition-all group-hover:border-amber-500/50">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64 p-2 bg-[#1c1412] border border-[#30241a] shadow-2xl rounded-xl text-stone-300">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-stone-800" />

                  <DropdownMenuItem asChild className="focus:bg-stone-800 focus:text-white rounded-lg cursor-pointer">
                    <Link href="/account" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> My Account
                    </Link>
                  </DropdownMenuItem>

                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="focus:bg-stone-800 focus:text-white rounded-lg cursor-pointer">
                      <Link href="/admin" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:bg-red-500/10 focus:text-red-300 rounded-lg cursor-pointer">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin" className="hidden sm:block text-[10px] font-bold text-stone-300 hover:text-white transition-all uppercase tracking-[0.2em]">
                Sign In
              </Link>
            )}

            {/* SHOPPING CART TRIGGER */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 text-stone-400 hover:text-white transition-all group">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>

              <SheetContent className="w-full sm:max-w-md flex flex-col bg-stone-950 border-l border-stone-900 p-0 shadow-2xl text-stone-200">
                <SheetHeader className="p-6 border-b border-stone-900">
                  <SheetTitle className="text-2xl font-black tracking-tight text-white">Project Cart</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 group items-center">
                      <div className="relative h-20 w-20 shrink-0">
                        <img src={item.image} className="h-full w-full object-cover rounded-xl" alt={item.name} />
                        <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <p className="text-stone-500 text-sm font-mono">${item.price} <span className="opacity-50">x</span> {item.quantity}</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-400 text-xs flex items-center gap-1 mt-2 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove from project
                        </button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <div className="text-center text-stone-600 mt-20 italic font-serif py-12 border-2 border-dashed border-stone-900 rounded-3xl mx-6">
                      The workshop is quiet... <br />Your cart is empty.
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <SheetFooter className="p-8 border-t border-stone-900 bg-stone-950/80 backdrop-blur-md">
                    <div className="w-full space-y-6">
                      <div className="flex justify-between items-end text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Estimating Total</p>
                        <p className="font-black text-3xl font-mono">${subtotal.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-500 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

            {/* MOBILE MENU TRIGGER */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-stone-400 hover:text-white transition-colors">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full bg-stone-950 border-stone-900 p-0 overflow-hidden text-stone-200 h-auto rounded-b-2xl shadow-2xl">
                  <div className="flex flex-col items-center py-12 space-y-8 animate-in slide-in-from-top duration-500">
                    <div className="mb-4">
                      <Link href="/" className="flex items-center gap-3">
                        <div className="bg-stone-900 p-2 rounded-xl">
                          <Hammer className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-white text-xl tracking-tighter">HARUN.</span>
                      </Link>
                    </div>

                    {[
                      { name: 'Home', path: '/' },
                      { name: 'Shop', path: '/products' },
                      { name: 'About', path: '/about' },
                      { name: 'Contact', path: '/contact' },
                    ].map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`text-2xl font-black uppercase tracking-tighter transition-all ${pathname === link.path ? 'text-amber-500 scale-110' : 'text-stone-400'
                          }`}
                      >
                        <SheetTrigger className="w-full">
                          {link.name}
                        </SheetTrigger>
                      </Link>
                    ))}

                    <div className="pt-8 w-full px-8">
                      {!user && (
                        <Link href="/signin" className="block w-full text-center py-4 bg-stone-900 border border-stone-800 rounded-2xl text-white font-bold uppercase tracking-widest text-sm">
                          <SheetTrigger className="w-full">Sign In</SheetTrigger>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}
