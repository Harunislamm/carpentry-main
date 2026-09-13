'use client'
import Image from 'next/image';
import { Quote, CheckCircle2, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    location: "Private Residence, Skopje",
    text: "We hired them to build a custom library wall. The attention to detail is unlike anything I've seen. They matched the stain perfectly to our existing floors.",
    stars: 5,
    project: "Custom Library"
  },
  {
    name: "Marko T.",
    location: "Restaurant Renovation",
    text: "Professional from start to finish. The team provided 3D renderings that helped us visualize the kitchen island before a single piece of wood was cut.",
    stars: 5,
    project: "Kitchen Island"
  },
  {
    name: "Marko T.",
    location: "Restaurant Renovation",
    text: "Professional from start to finish. The team provided 3D renderings that helped us visualize the kitchen island before a single piece of wood was cut.",
    stars: 5,
    project: "Kitchen Island"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[#faf9f6] relative overflow-hidden border-y border-stone-200">
      {/* Background Decorative Wood Grain Pattern (Optional CSS Pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10C30 10 30 90 90 90' stroke='%23000' fill='none'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-9/10 mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600 mb-3">Client Stories</h2>
          <p className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight italic">"Crafted with soul, cherished for generations."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-2xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-2 relative"
            >
              {/* Massive Decorative Quote Icon */}
              <Quote className="absolute top-6 right-8 text-stone-50 w-24 h-24 z-0 transform group-hover:text-amber-50 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <blockquote className="text-xl text-stone-800 leading-relaxed mb-8 font-medium italic font-serif">
                  "{item.text}"
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 bg-amber-200 rounded-full rotate-6 group-hover:rotate-12 transition-transform" />
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src="/carpentry.jpg" // Replace with actual user image
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 leading-none mb-1">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 uppercase tracking-widest">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}