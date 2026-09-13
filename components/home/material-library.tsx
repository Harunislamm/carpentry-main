import { Info } from 'lucide-react';

const woods = [
  {
    name: "American Walnut",
    color: "bg-[#5d4037]",
    desc: "Prized for its dark, chocolate hues and straight, fine grain.",
    density: "Medium-High", // ~610 kg/m³
    picture: ""
  },
  {
    name: "White Oak",
    color: "bg-[#d7c4a3]",
    desc: "Highly durable with a prominent grain; naturally rot-resistant.",
    density: "High", // ~770 kg/m³
    picture: ""
  },
  {
    name: "Hard Maple",
    color: "bg-[#efebe0]",
    desc: "Heavy, hard, and resistant to abrasion; features a light, uniform sapwood.",
    density: "High", // ~705 kg/m³
    picture: ""
  },
  {
    name: "Cherry",
    color: "bg-[#8b5a2b]",
    desc: "Renowned for its smooth texture and deep reddish-brown patina over time.",
    density: "Medium", // ~560 kg/m³
    picture: ""
  },
  {
    name: "Ash",
    color: "bg-[#e3dcd1]",
    desc: "Flexible and shock-resistant with a grain pattern similar to Oak.",
    density: "Medium-High", // ~670 kg/m³
    picture: ""
  },
  {
    name: "Mahogany",
    color: "bg-[#7e3517]",
    desc: "A stable, reddish-brown hardwood with a fine, even texture.",
    density: "Medium-High", // ~640 kg/m³
    picture: ""
  },
  {
    name: "Hickory",
    color: "bg-[#c4a484]",
    desc: "The toughest domestic hardwood; offers extreme strength and stiffness.",
    density: "Extreme", // ~800+ kg/m³
    picture: ""
  },
  {
    name: "Teak",
    color: "bg-[#a67b5b]",
    desc: "Oil-rich timber with exceptional weather resistance and durability.",
    density: "Medium-High", // ~650 kg/m³
    picture: ""
  },
  {
    name: "MDF Board",
    color: "bg-[#a67b5b]",
    desc: "Engineered wood made from broken down hardwood/softwood fibers and wax.",
    density: "High", // ~700-800 kg/m³ (Very uniform)
    picture: "/path-to-mdf.jpg"
  },
  {
    name: "Particle Board",
    color: "bg-[#a67b5b]",
    desc: "Cost-effective panel made from wood chips and synthetic resin.",
    density: "Medium", // ~600-700 kg/m³
    picture: "/path-to-particle.jpg"
  },
];

export default function MaterialLibrary() {
  return (
    <section className="py-24 px-4 overflow-hidden bg-[#faf9f6] relative ">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10C30 10 30 90 90 90' stroke='%23000' fill='none'/%3E%3C/svg%3E")` }}
      />
      <div className="max-w-7xl mx-auto text-center mb-20">
        <div className="inline-block px-4 py-1.5 mb-4 border border-stone-200 rounded-full">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Species Gallery</span>
        </div>
        <h2 className="text-4xl font-bold mb-4 text-stone-900 tracking-tight">The Material Library</h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          We work exclusively with premium A-grade timber, sustainably sourced and kiln-dried to perfection.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16 ">
        {woods.map((wood, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center cursor-pointer relative"
          >
            {/* Swatch Container */}
            <div className="relative mb-6">
              {/* Decorative Ring */}
              <div className="absolute -inset-2 border border-stone-100 rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>

              <div
                className={`w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl ${wood.color} relative overflow-hidden border-[6px] border-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 z-10`}
              >
                {/* Wood Grain Overlay */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-overlay"></div>

                {/* Light Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30"></div>
              </div>

              {/* Hover Info Card (Glassmorphism) */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 md:w-48 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 pointer-events-none border border-white">
                <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Character</p>
                <p className="text-[11px] text-stone-600 leading-tight mb-2">{wood.desc}</p>
                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                  <span className="text-[10px] text-stone-400 uppercase">Density</span>
                  <span className="text-[10px] font-bold text-stone-900">{wood.density}</span>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="text-center">
              <span className="block text-[10px] font-mono text-stone-400 mb-1">0{idx + 1}</span>
              <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                {wood.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainability Disclaimer */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-2 text-stone-400 text-sm">
          <Info className="w-4 h-4" />
          <p>Each grain pattern is unique. Variations in color and texture are expected in natural timber.</p>
        </div>
      </div>
    </section>
  );
}