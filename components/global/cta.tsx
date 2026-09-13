import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function TraditionalCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto bg-stone-900 rounded-[2rem] overflow-hidden relative shadow-2xl">
        {/* Subtle Decorative Wood Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
        
        <div className="relative z-10 py-16 px-8 md:px-16 text-center">
          <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs">
            Start Your Project
          </span>
          
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tight">
            Ready to bring your <br className="hidden sm:block" /> 
            vision to life?
          </h2>
          
          <p className="mt-6 text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
            From custom dining tables to full library installations, we craft 
            each piece with precision and heritage techniques.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white py-4 px-10 rounded-full font-bold text-md transition-transform hover:scale-105 active:scale-95 group">
              Book Free Consultation
            </Link>

            {/* Secondary Button */}
            <Link href="/products" className="border-stone-700 text-white hover:bg-stone-800 py-4 px-10 rounded-full font-bold text-md bg-transparent">
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}