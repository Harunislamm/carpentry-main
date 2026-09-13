"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Hammer, ArrowRight, Award } from "lucide-react";
import FAQSection from "@/components/global/faq";
import TestimonialSection from "@/components/global/testimonials";
import MaterialLibrary from "@/components/home/material-library";
import ProcessSection from "@/components/home/process";
import CTASection from "@/components/global/cta";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

export default function HomePage() {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. HERO SECTION: Re-imagined for Luxury */}
      <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative (7 cols) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-amber-600" />
                <span className="text-amber-600 font-black uppercase tracking-[0.4em] text-[10px]">
                  Masterworks &bull; Est. 2024
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-black text-stone-900 tracking-tighter leading-[0.85]">
                Crafting <br />
                <span className="text-stone-500 italic font-serif font-light">Permanence.</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-lg space-y-8">
              <p className="text-lg md:text-xl text-stone-600 font-medium leading-relaxed border-l-4 border-amber-500/20 pl-6">
                Macedonian joinery meets architectural vision. We build high-performance furniture designed to hold space for generations.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link href="/products">
                  <Button size="lg" className="h-14 px-10 text-xs bg-[#1c1412] text-white rounded-2xl hover:bg-amber-600 transition-all duration-500 font-black uppercase tracking-widest group">
                    View Collection
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost" className="h-14 px-10 text-xs text-stone-900 border-2 border-stone-200 hover:bg-stone-100 rounded-2xl font-black uppercase tracking-widest transition-all">
                    Request Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-12 pt-8">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-[#FAF9F6] bg-stone-200 overflow-hidden">
                      <Image src={`/carpenter-picture.jpg`} width={40} height={40} alt="Avatar" className="object-cover" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-4 border-[#FAF9F6] bg-amber-600 flex items-center justify-center text-[10px] font-black text-white">
                    50+
                 </div>
              </div>
              <div>
                <p className="text-sm font-black text-stone-900 uppercase tracking-widest">Bespoke Projects</p>
                <p className="text-xs text-stone-500 font-medium">Completed this year across Europe</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Dynamic Visual (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl bg-stone-200 group">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="w-full h-full"
              >
                <Image
                  src="/hero-home.jpg"
                  alt="Craftsmanship"
                  fill
                  className="object-cover transition-all duration-700 select-none group-hover:scale-110"
                  priority
                />
              </motion.div>
              
              {/* Glass Card Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
                 <div className="flex items-center gap-4">
                    <div className="bg-amber-600 p-3 rounded-xl">
                       <Award className="text-white w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-white font-black text-sm uppercase tracking-widest">Handmade Quality</p>
                       <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Lifetime Guarantee</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Decorative Nodes */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-stone-900/5 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </section>
      {/* 2. LOGO / TRUST STRIP */}
      <section className="py-10 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-6">
            Trusted by businesses and homeowners across the region
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Placeholders for Logos */}
            {[
              "ArchiDigest",
              "ModernHome",
              "LuxeInteriors",
              "BuildWeekly",
              "CraftMag",
            ].map((brand) => (
              <span
                key={brand}
                className="text-xl font-bold font-serif text-stone-800"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTRO / PHILOSOPHY */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-none">
              The art of the{" "}
              <span className="italic font-serif text-amber-700">
                perfect joint.
              </span>
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              In an era of mass production, we choose the slow path. Every piece
              that leaves our workshop is shaped by human hands, using
              traditional joinery techniques that have stood the test of time.
            </p>
            <div className="space-y-4">
              {[
                "Sustainably sourced domestic and exotic hardwoods",
                "Traditional mortise and tenon joinery",
                "Zero-VOC natural oil finishes",
                "Lifetime structural warranty",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-stone-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[45  0px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/carpenter-picture.jpg"
              alt="Craftsman hands detailing wood"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <p className="font-serif italic text-stone-800 text-lg">
                "Wood is alive. You don't just cut it; you listen to where it
                wants to go."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTIONS (GRID) */}
      <section className="py-24 px-4 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Collections
              </h2>
              <p className="text-stone-500 max-w-md">
                Browse our signature lines, or let them inspire your custom
                commission.
              </p>
            </div>
            <Link href="/products"
              className="hidden md:flex bg-transparent border-stone-300 border px-3 py-2 rounded-md text-sm hover:bg-stone-300/20"
            >
              View Our Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Item 1 - Large Left */}
            <div className="md:col-span-6 relative group overflow-hidden rounded-2xl">
              <Image
                src="/collections-living.jpg"
                alt="Living Room"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 p-8 w-full text-white">
                <h3 className="text-3xl font-bold mb-2">Living & Dining</h3>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 text-sm">
                  Tables, Chairs, Consoles
                </p>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="md:col-span-6 flex flex-col gap-6 h-full">
              {/* Top Right */}
              <div className="flex-1 relative group overflow-hidden rounded-2xl">
                <Image
                  src="/collections-kitchen.jpg"
                  alt="Kitchen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 p-6 w-full text-white">
                  <h3 className="text-2xl font-bold">Kitchen & Cabinetry</h3>
                </div>
              </div>

              {/* Bottom Split */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-2xl">
                  <Image
                    src="/collections-decor.jpg"
                    alt="Decor"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 p-4 w-full text-white">
                    <h3 className="text-xl font-bold">Decor</h3>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                  <Image
                    src="/collections-bedroom-picture.jpg"
                    alt="Bedroom"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 p-4 w-full text-white">
                    <h3 className="text-xl font-bold">Bedroom</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PROCESS (Timeline) */}
      <ProcessSection />

      {/* 6. MATERIAL LIBRARY (Texture Showcase) */}
      <MaterialLibrary />

      {/* 7. TESTIMONIALS */}
      <TestimonialSection />

      {/* 8. CALL TO ACTION (Split Section with Interactive Card) */}
      <CTASection />
      {/* 8. FAQ SECTION (Accordion Style) */}
      <FAQSection />
    </main>
  );
}
