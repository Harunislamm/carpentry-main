"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Hammer, 
  MessageCircle, 
  Clock, 
  ArrowRight, 
  Send,
  Loader2,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Message received! We'll be in touch soon.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-amber-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-100">
          
          {/* LEFT COLUMN: BRAND & INFO */}
          <div className="lg:col-span-5 bg-[#120c0a] p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
                <Hammer size={600} strokeWidth={1} className="text-white" />
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative z-10 space-y-12"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="bg-amber-600 w-12 h-1 rounded-full" />
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                  Let's craft your <br />
                  <span className="text-amber-500 italic font-serif">next legacy.</span>
                </h1>
                <p className="text-stone-400 font-medium text-lg leading-relaxed max-w-sm">
                  Whether it's a bespoke kitchen or a single heirloom chair, every project starts with a conversation.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-[#1c1412] p-4 rounded-2xl group-hover:bg-amber-600 transition-colors">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">Send a Message</p>
                    <p className="text-white font-bold text-lg">workshop@harun.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-[#1c1412] p-4 rounded-2xl group-hover:bg-amber-600 transition-colors">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">Direct Workshop Line</p>
                    <p className="text-white font-bold text-lg">+389 7X XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-[#1c1412] p-4 rounded-2xl group-hover:bg-amber-600 transition-colors">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">Visit the Bench</p>
                    <p className="text-white font-bold text-lg">Industriska 12, <br />Prilep, Macedonia</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-8 border-t border-[#2b1d12]/30 flex items-center gap-10">
                 <div>
                   <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Workshop Hours</p>
                   <div className="flex items-center gap-2 text-stone-300 font-bold">
                     <Clock size={16} className="text-amber-500" />
                     <span>Mon — Sat, 8:00 — 18:00</span>
                   </div>
                 </div>
              </motion.div>
            </motion.div>

            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="text-[10px] text-stone-600 font-bold uppercase tracking-[0.3em] mt-12"
            >
               &copy; 2026 Harun Masterworks
            </motion.p>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7 p-10 lg:p-20 bg-white flex flex-col justify-center">
             {!submitted ? (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Project Inquiry</h2>
                    <p className="text-stone-500 font-medium">Briefly describe what you have in mind.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">The Project</label>
                    <select className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 appearance-none">
                      <option>Bespoke Furniture</option>
                      <option>Custom Cabinetry</option>
                      <option>Commercial Fitting</option>
                      <option>Restoration</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Tell us about it</label>
                    <textarea 
                      required
                      placeholder="Share your vision, dimensions, or specific wood preferences..." 
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300 min-h-[160px] resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-amber-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-stone-100"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Request Consultation
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
             ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                   <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shadow-inner">
                      <Check size={48} strokeWidth={3} />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black text-stone-900 tracking-tight">The bench is set.</h2>
                      <p className="text-stone-500 font-medium max-w-sm mx-auto">
                        Your inquiry has reached our workshop. Harun personally reviews all custom requests—we will be in touch shortly.
                      </p>
                   </div>
                   <button 
                    onClick={() => setSubmitted(false)}
                    className="text-amber-600 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-stone-900 transition-colors"
                   >
                     Send another message <ArrowRight size={14} />
                   </button>
                </motion.div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}