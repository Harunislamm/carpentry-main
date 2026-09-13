import React from 'react';
import { Phone, Ruler, Hammer, CheckCircle2, ArrowDownRight, ArrowBigDown } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Phone,
    title: "Discovery Consultation",
    desc: "Every masterpiece begins with a conversation. We discuss your space, lifestyle, and aesthetic preferences to define the project's soul.",
    tag: "Phase 01"
  },
  {
    icon: Ruler,
    title: "Technical Drafting",
    desc: "Our designers create high-fidelity 3D renderings and structural blueprints, ensuring every millimeter aligns with your architectural needs.",
    tag: "Phase 02"
  },
  {
    icon: Hammer,
    title: "The Workshop Build",
    desc: "Using traditional joinery techniques and modern precision tools, our master craftsmen bring the timber to life over several weeks.",
    tag: "Phase 03"
  },
  {
    icon: CheckCircle2,
    title: "Final Placement",
    desc: "White-glove delivery and precision installation. We ensure the piece sits perfectly in its new environment, ready for generations of use.",
    tag: "Phase 04"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 bg-stone-950 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header - Left Aligned for a more modern look */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-amber-600 font-mono text-sm tracking-[0.3em] uppercase mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
              From Raw Timber <br />
              <span className="text-stone-500 italic font-serif">to Refined Legacy</span>
            </h3>
          </div>
          <p className="text-stone-400 max-w-sm text-sm leading-relaxed border-l border-stone-800 pl-6">
            A meticulous four-stage journey ensuring your custom commission exceeds every expectation of quality and form.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-stone-950 p-6 md:p-16 flex flex-col justify-between min-h-[320px] md:min-h-[400px] hover:bg-stone-900 transition-colors duration-500"
            >
              <div className="flex justify-between items-start">
                {/* Visual Icon with subtle glow */}
                <div className="p-4 bg-stone-900 rounded-2xl group-hover:bg-amber-600 transition-colors duration-500 border border-stone-800 group-hover:border-amber-500 shadow-inner">
                  <step.icon className="w-8 h-8 text-amber-500 group-hover:text-white" />
                </div>
                <span className="text-stone-800 font-mono text-3xl md:text-4xl font-black group-hover:text-amber-600/20 transition-colors">
                  {step.tag}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-amber-600" />
                  <h4 className="text-2xl font-bold tracking-tight">{step.title}</h4>
                </div>
                <p className="text-stone-400 leading-relaxed text-base max-w-md">
                  {step.desc}
                </p>

                {/* Call to action within the card */}
                <Link href="/contact" className='mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                  Get in Touch <ArrowDownRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}