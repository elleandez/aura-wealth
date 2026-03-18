"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { EyeOff, Fingerprint, Activity, Quote, Terminal, Globe2, Shield } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
    {children}
  </motion.div>
);

export default function Founders() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Reduced from 400vh to 250vh to eliminate the black screen dead zone
  const loreRef = useRef(null);
  const { scrollYProgress: loreScroll } = useScroll({ target: loreRef, offset: ["start start", "end end"] });
  const lore1 = useTransform(loreScroll, [0, 0.3, 0.4], [0, 1, 0]);
  const lore2 = useTransform(loreScroll, [0.4, 0.6, 0.7], [0, 1, 0]);
  const lore3 = useTransform(loreScroll, [0.7, 0.85, 1], [0, 1, 1]);

  return (
    <main className="bg-[#02030A] min-h-screen text-white overflow-hidden" ref={containerRef}>
      
      {/* 1. HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0 scale-105">
          <div className="absolute inset-0 bg-gradient-to-b from-[#02030A]/60 via-[#02030A]/90 to-[#02030A] z-10" />
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop" alt="Shadow Boardroom" className="w-full h-full object-cover grayscale opacity-40" />
        </motion.div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <EyeOff className="w-16 h-16 text-gray-500 mx-auto mb-8 opacity-60" />
            <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.85] mb-8 max-w-4xl mx-auto">
              The <br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-400">Architects.</span>
            </h1>
          </motion.div>
          <FadeUp delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-12">
              AURA was not built by standard bankers. It was forged by legal strategists, cyber-security specialists, and private equity operators.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. STICKY ORIGIN LORE (Optimized Length) */}
      <section ref={loreRef} className="h-[250vh] relative bg-[#02030A]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden border-y border-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
            <motion.div style={{ opacity: lore1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <p className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-6 text-sm">Genesis</p>
              <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white">It started as a <span className="text-emerald-500 font-medium">private intelligence</span> firm.</h2>
            </motion.div>
            <motion.div style={{ opacity: lore2 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <p className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-6 text-sm">Port Harcourt HQ</p>
              <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-gray-300">Operating quietly out of West Africa, we engineered asset protection for high-net-worth individuals.</h2>
            </motion.div>
            <motion.div style={{ opacity: lore3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
               <p className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-6 text-sm">Global Expansion</p>
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">We weaponized our tactics for the <span className="text-emerald-500 font-medium">global market.</span></h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE FOUNDING PARTNERS (Image Bugs Fixed) */}
      <section className="py-40 px-6 bg-[#050813]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-32 text-center">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">The <span className="text-emerald-500">Syndicate.</span></h2>
          </FadeUp>
          <div className="space-y-12">
            
            {/* Founder 1 */}
            <FadeUp>
              <div className="group relative bg-[#02030A] border border-white/5 p-12 md:p-16 overflow-hidden hover:border-emerald-500/30 transition-all duration-700 flex flex-col md:flex-row gap-12 items-center rounded-3xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                <div className="w-40 h-40 shrink-0 rounded-full p-1 bg-gradient-to-br from-emerald-500 to-[#02030A] group-hover:scale-105 transition-transform duration-700 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#050813]">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" alt="The Algorithm" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                </div>
                <div className="relative z-10 max-w-2xl text-center md:text-left">
                  <h3 className="text-emerald-500 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Partner 01</h3>
                  <h4 className="text-4xl font-light text-white mb-6">"The Algorithm"</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">Former lead data-architect for a major global credit bureau. He built the systems that trap consumers in bad debt. Now, he operates entirely for AURA.</p>
                </div>
              </div>
            </FadeUp>

            {/* Founder 2 */}
            <FadeUp delay={0.1}>
              <div className="group relative bg-[#02030A] border border-white/5 p-12 md:p-16 overflow-hidden hover:border-blue-500/30 transition-all duration-700 flex flex-col md:flex-row-reverse gap-12 items-center rounded-3xl">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
                <div className="w-40 h-40 shrink-0 rounded-full p-1 bg-gradient-to-br from-blue-500 to-[#02030A] group-hover:scale-105 transition-transform duration-700 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#050813]">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="The Broker" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                </div>
                <div className="relative z-10 max-w-2xl text-center md:text-right">
                  <h3 className="text-blue-500 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Partner 02</h3>
                  <h4 className="text-4xl font-light text-white mb-6">"The Broker"</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">A ghost in the private equity sector. The Broker handles AURA's tier-1 liquidity, securing massive non-QM and jumbo loans bypassing standard banking.</p>
                </div>
              </div>
            </FadeUp>

            {/* Founder 3 */}
            <FadeUp delay={0.2}>
              <div className="group relative bg-[#02030A] border border-white/5 p-12 md:p-16 overflow-hidden hover:border-purple-500/30 transition-all duration-700 flex flex-col md:flex-row gap-12 items-center rounded-3xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]"></div>
                <div className="w-40 h-40 shrink-0 rounded-full p-1 bg-gradient-to-br from-purple-500 to-[#02030A] group-hover:scale-105 transition-transform duration-700 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#050813]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="The Vault" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                </div>
                <div className="relative z-10 max-w-2xl text-center md:text-left">
                  <h3 className="text-purple-500 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Partner 03</h3>
                  <h4 className="text-4xl font-light text-white mb-6">"The Vault"</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">A mastermind in international tax law and sovereign asset protection. The Vault establishes the irrevocable trusts that render our clients invisible.</p>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* 4. CLASSIFIED DIRECTIVES (Compressed from min-h-screen to standard padding to prevent massive gaps) */}
      <section className="bg-[#02030A] border-y border-white/5 py-40 px-6">
        <div className="max-w-6xl mx-auto space-y-40">
           <FadeUp className="text-center">
              <Quote className="w-12 h-12 text-emerald-500/50 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 text-white leading-tight">
                "If you play by their rules, you are their product. Weaponize their compliance laws against them, and you become the <span className="text-emerald-500 font-medium">architect.</span>"
              </h2>
           </FadeUp>
           <FadeUp className="text-center">
              <Quote className="w-12 h-12 text-blue-500/50 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 text-white leading-tight">
                "Capital is never scarce. It is merely gated behind artificial risk committees. We do not ask for permission; we <span className="text-blue-500 font-medium">bypass the gate entirely.</span>"
              </h2>
           </FadeUp>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#050813]">
        <div className="absolute z-20 max-w-4xl mx-auto text-center px-6">
          <FadeUp>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">Step into the <span className="font-medium text-emerald-500">inner circle.</span></h2>
            <Link href="/subscriptions" className="inline-block px-14 py-5 bg-white text-[#050813] rounded-sm font-bold text-lg uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300">
              View Retainer Tiers
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}