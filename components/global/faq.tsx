'use client'
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "What is your typical lead time?",
    a: "For custom furniture, our lead time is typically 6-8 weeks. Larger architectural projects like kitchens may take 10-12 weeks depending on complexity.",
  },
  {
    q: "Do you offer design services?",
    a: "Yes. Every project begins with a design consultation and 3D modeling to ensure the final piece matches your vision perfectly.",
  },
  {
    q: "What types of wood do you use?",
    a: "We primarily use sustainable hardwoods like Oak, Walnut, Ash, and Maple. We can also source specific exotic woods upon request.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship throughout North America and Europe. For other regions, please contact us for a custom white-glove delivery quote.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500">Everything you need to know about our handcrafted process.</p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`
                  overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
                  ${isOpen 
                    ? 'bg-white border-amber-200 shadow-xl shadow-stone-200/50 translate-y-[-2px]' 
                    : 'bg-stone-100/50 border-stone-200 hover:border-stone-300'}
                `}
              >
                <div className="p-6 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`
                      text-xs font-mono font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors
                      ${isOpen ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}
                    `}>
                      0{i + 1}
                    </span>
                    <h3 className={`font-bold transition-colors ${isOpen ? 'text-stone-900' : 'text-stone-700'}`}>
                      {item.q}
                    </h3>
                  </div>
                  <ChevronDown className={`
                    w-5 h-5 transition-transform duration-500 
                    ${isOpen ? 'rotate-180 text-amber-600' : 'text-stone-400'}
                  `} />
                </div>

                {/* Animated Answer Content */}
                <div className={`
                  grid transition-all duration-300 ease-in-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0 ml-12 text-stone-500 text-sm leading-relaxed border-t border-stone-50 mt-2">
                      <div className="pt-4">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}