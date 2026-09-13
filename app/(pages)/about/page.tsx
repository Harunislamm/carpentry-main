"use client";

import React from 'react';
import { motion } from 'framer-motion';
import TraditionalCTA from '@/components/global/cta';
import { Trees, ArrowRight, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const specializations = [
    {
      title: "Design & 3D Modeling",
      description: "Where vision meets geometry. We draft every piece in 3D before a single cut is made.",
      year: "Phase 01",
      image: "/3dsketchup.jpg"
    },
    {
      title: "Joinery & Carpentry",
      description: "Traditional mortise and tenon techniques combined with modern structural engineering.",
      year: "Phase 02",
      image: "/carpenter-picture.jpg"
    },
    {
      title: "Hand Finishing",
      description: "Sanding to 400-grit and applying zero-VOC natural oils for a silk-like touch.",
      year: "Phase 03",
      image: "/carpentry-handfinishing.jpg"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] selection:bg-amber-100">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900 px-6">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/hero-home.jpg" 
            className="w-full h-full object-cover"
            alt="Wood shavings"
            fill
            priority
          />
          <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/40 to-[#FAF9F6]"></div>
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80 mb-6 block">Established MMXXIV &bull; Macedonia</span>
            <h1 className="text-7xl md:text-[140px] font-black text-white tracking-tighter leading-[0.85] mb-12">
              The <span className="font-serif italic font-light text-amber-500/50">Maker's</span> <br /> Manifesto
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-stone-300 uppercase tracking-[0.4em] text-[10px] font-bold">
              <span className="hover:text-amber-500 transition-colors cursor-default">Lineage</span>
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <span className="hover:text-amber-500 transition-colors cursor-default">Soul</span>
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <span className="hover:text-amber-500 transition-colors cursor-default">Geometry</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold rotate-90 mb-4 origin-left translate-x-1.5">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-amber-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. OUR STORY: IMPROVED STAGGERED LAYOUT */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Text Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-amber-600 mb-6">Since 2024</h2>
              <h3 className="text-5xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-8">
                Where architectural precision <br /> 
                <span className="text-stone-500 italic font-serif font-normal">meets organic soul.</span>
              </h3>
              <p className="text-stone-600 text-xl leading-relaxed">
                We believe that furniture shouldn't just occupy space—it should hold meaning. Our journey began in a small workshop with a single mission: to return to the era of the "Masterwork."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-bold text-stone-900">Lifetime Structure</h4>
                <p className="text-stone-500 text-sm">Every joint is engineered to survive generations of daily use.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <Trees className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-bold text-stone-900">Sustainably Sourced</h4>
                <p className="text-stone-500 text-sm">We only work with A-grade timber from FSC-certified forests.</p>
              </div>
            </div>
          </div>

          {/* Improved Image Composition */}
          <div className="relative">
            <div className="relative aspect-1/1 rounded-[3rem] overflow-hidden shadow-2xl z-10">
              <Image 
                src="/carpenter-about.jpg" 
                alt="Wood detail"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FULL-WIDTH TEXTURE SECTION (UNCHANGED BUT REFINED) */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-600/5 skew-x-12 translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-5xl font-bold mb-8 tracking-tighter italic font-serif">"The wood tells us what it wants to become."</h2>
                <p className="text-stone-400 text-lg leading-relaxed mb-8">
                  We source exclusively from forests where trees are harvested at the end of their natural life cycle. This isn't just sustainability—it's respect for the material.
                </p>
                <ul className="space-y-4">
                  {[
                    "Zero-VOC natural oil finishes",
                    "Traditional mortise and tenon joinery",
                    "FSC-certified sustainable hardwoods",
                    "Lifetime structural guarantee"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-300">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                      {text}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-stone-800 overflow-hidden relative">
                     <Image src="/collections-kitchen.jpg" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Timber" />
                  </div>
                  <div className="aspect-square rounded-2xl bg-stone-800 overflow-hidden relative">
                     <Image src="/collections-decor.jpg" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Joinery" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-square rounded-2xl bg-stone-800 overflow-hidden relative">
                     <Image src="/collections-living.jpg" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Shelf detail" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-stone-800 overflow-hidden relative">
                     <Image src="/carpentry.jpg" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Chair detail" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM (BENTO STYLE) */}
      <section className="py-32 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER: Minimalist & Wide */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-12 mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-8xl font-serif italic text-stone-900 tracking-tighter leading-none">
              The Guild
            </h2>
            <p className="text-stone-500 mt-6 text-lg uppercase tracking-widest font-bold">
              Precision. Patience. Provenance.
            </p>
          </div>
          <div className="text-stone-400 max-w-xs text-sm leading-relaxed">
            Our collective consists of designers, foresters, and master carpenters dedicated to the revival of slow craftsmanship.
          </div>
        </div>

        {/* CONTENT: Interactive Vertical List */}
        <div className="space-y-0">
          {specializations.map((spec, index) => (
            <div 
              key={index} 
              className="group relative border-b border-stone-200 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between transition-all hover:bg-white px-4 -mx-4"
            >
              {/* Left Side: Number and Title */}
              <div className="flex items-center gap-12 lg:gap-24 z-10">
                <span className="text-stone-300 font-mono text-sm tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter group-hover:text-amber-600 transition-colors duration-500">
                  {spec.title}
                </h3>
              </div>

              {/* Right Side: Description */}
              <div className="mt-6 lg:mt-0 max-w-sm">
                <p className="text-stone-500 leading-relaxed mb-4 group-hover:text-stone-900 transition-colors">
                  {spec.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 group-hover:text-amber-600">
                  {spec.year} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* FLOATING IMAGE REVEAL (Visible on Hover) */}
              <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-64 h-80 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-700 ease-out transform group-hover:-translate-x-12 group-hover:rotate-6 hidden xl:block">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-8 ring-white/50">
                  <Image 
                    src={spec.image} 
                    fill 
                    className="object-cover" 
                    alt={spec.title} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <TraditionalCTA />

    </div>
  );
}