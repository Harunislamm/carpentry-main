import React from 'react';
import Link from 'next/link';
import { Hammer, Instagram, Facebook, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1412] text-stone-400 py-20 px-6 border-t border-[#30241a]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

          {/* 1. BRAND & NEWSLETTER */}
          <div className="md:col-span-5 space-y-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-amber-600 p-2 rounded-lg group-hover:bg-stone-900 transition-colors">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg md:text-xl tracking-tighter leading-none">CARPENTRY</span>
                <span className="text-[11px] md:text-[12px] text-amber-500 font-bold uppercase tracking-[0.2em]">Masterworks</span>
              </div>
            </Link>

            <div className="max-w-sm">
              <h3 className="text-white font-serif italic text-xl mb-4">Join the Workshop Journal</h3>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                Occasional updates on new timber arrivals, finished commissions, and woodworking philosophy.
              </p>
              <form className="relative group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-600 transition-colors"
                />
                <button className="absolute right-0 bottom-3 text-stone-500 hover:text-amber-500 transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* 2. NAVIGATION LINKS */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/products" className="hover:text-amber-500 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">About</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* 4. STUDIO INFO */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">Location</h4>
            <p className="text-sm leading-relaxed max-w-[200px]">
              <br />
              Struga, North Macedonia<br />
              <span className="text-white mt-2 block">harunislam008@gmail.com</span>
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="#" className="p-2 border border-stone-800 rounded-full hover:border-amber-600 hover:text-amber-600 transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 border border-stone-800 rounded-full hover:border-amber-600 hover:text-amber-600 transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 border border-stone-800 rounded-full hover:border-amber-600 hover:text-amber-600 transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-700">
            Designed for longevity. Hand-crafted for life.
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-stone-700">
            © {currentYear} Carpentry. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}