"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, PackagePlus, ShoppingCart, Package, Settings, Loader2, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
        <p className="text-stone-500 font-medium animate-pulse tracking-widest uppercase text-xs">Authenticating Workshop Admin... </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Sidebar - Premium Redesign */}
      <aside className="w-72 bg-stone-950 text-stone-300 flex flex-col fixed h-full z-40 border-r border-stone-800 shadow-2xl">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-amber-600 p-2 rounded-xl text-white shadow-lg shadow-amber-900/40 group-hover:scale-110 transition-transform">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tighter leading-none">HARUN</h2>
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] leading-normal">Management</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 mt-4 space-y-1">
          <div className="px-4 mb-4">
             <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Main Menu</p>
          </div>
          <NavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === '/admin'} />
          <NavLink href="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" active={pathname === '/admin/orders'} />
          
          <div className="px-4 mt-8 mb-4">
             <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Store Management</p>
          </div>
          <NavLink href="/admin/products" icon={<Package size={18} />} label="Inventory" active={pathname === '/admin/products'} />
          <NavLink href="/admin/add-product" icon={<PackagePlus size={18} />} label="New Masterpiece" active={pathname === '/admin/add-product'} />
        </nav>

        <div className="p-6 border-t border-stone-900 bg-stone-950/50 backdrop-blur-md">
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-sm font-bold text-red-400/80 hover:text-red-400 hover:bg-red-500/5 px-4 py-3 rounded-xl transition-all w-full group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Sub-Header / Top Bar */}
        <header className="h-20 border-b border-stone-200 bg-white/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900">
               <ChevronLeft size={20} />
             </Link>
             <h2 className="font-bold text-stone-500 text-sm uppercase tracking-widest">
               {pathname.split('/').slice(2).join(' / ') || 'Overview'}
             </h2>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-stone-900 leading-none">{user.name}</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">Workshop Master</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-stone-900 border-2 border-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0)}
             </div>
           </div>
        </header>

        <div className="p-10">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm font-bold uppercase tracking-wider group relative ${
        active 
          ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20' 
          : 'text-stone-500 hover:bg-stone-900 hover:text-stone-200'
      }`}
    >
      <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</span>
      {label}
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
        />
      )}
    </Link>
  );
}