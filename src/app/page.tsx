"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Globe, Lock, Cpu, Anchor, Activity, ShieldAlert, Fingerprint, Map } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Standard Fade-Up utility
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const mainRef = useRef(null);
  
  // Parallax for Hero 1
  const hero1Ref = useRef(null);
  const { scrollYProgress: hero1Scroll } = useScroll({ target: hero1Ref, offset: ["start start", "end start"] });
  const yHero1 = useTransform(hero1Scroll, [0, 1], ["0%", "50%"]);
  const opacityHero1 = useTransform(hero1Scroll, [0, 0.8], [1, 0]);

  // Infrastructure Parallax
  const infraRef = useRef(null);
  const { scrollYProgress: infraScroll } = useScroll({ target: infraRef, offset: ["start end", "end start"] });
  const yInfra = useTransform(infraScroll, [0, 1], ["-20%", "20%"]);

  return (
    <main className="bg-[#050813] text-white selection:bg-emerald-500 selection:text-white" ref={mainRef}>
      
      {/* 1. HERO ENTRY (100vh) */}
      <section ref={hero1Ref} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero1, opacity: opacityHero1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050813]/90 to-[#050813] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" 
            alt="Corporate Monolith" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase">AURA Wealth Management</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-light tracking-tighter leading-[0.85] mb-8 max-w-5xl mx-auto">
              Absolute <br className="hidden md:block" />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-600">
                Command.
              </span>
            </h1>
          </motion.div>
          
          <FadeUp delay={0.4}>
            <p className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              We do not participate in the standard economy. We architect over it. Elite debt eradication, sovereign-level fund management, and non-traditional capital deployment.
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <Link href="/contact-us" className="inline-flex px-10 py-5 bg-white text-[#050813] font-bold text-lg hover:bg-emerald-400 hover:text-white transition-all duration-500 rounded-sm items-center gap-3 group">
              Initiate Protocol <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 2. INFINITE SCROLL TICKER */}
      <div className="py-6 bg-emerald-950/20 border-y border-emerald-500/20 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 text-emerald-500/50 font-bold uppercase tracking-widest text-sm items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Zero-Liability Asset Protection</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
              <span>Proprietary Debt Annihilation</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
              <span>Sovereign Fund Architecture</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. THE MANIFESTO (Rebuilt: No more sticky scroll trap. Massive Zig-Zag Typography) */}
      <section className="py-40 px-6 relative bg-[#050813] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-32">
          
          <FadeUp>
            <h2 className="text-5xl md:text-[6rem] font-light tracking-tighter leading-[1.1]">
              The system is designed to <br/><span className="text-red-500/80 font-medium">keep you liable.</span>
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.2} className="text-right">
            <h2 className="text-5xl md:text-[6rem] font-light tracking-tighter leading-[1.1]">
              Credit bureaus thrive on your <br/><span className="text-gray-500 font-medium">financial stagnation.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.4}>
             <h2 className="text-5xl md:text-[6rem] font-light tracking-tighter leading-[1.1] mb-8">
                We rewrite the <span className="text-emerald-500 font-medium">algorithm.</span>
             </h2>
             <div className="border-l-2 border-emerald-500 pl-8">
               <p className="text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">
                 By leveraging proprietary legal frameworks and private liquidity pools, AURA completely isolates you from retail banking constraints.
               </p>
             </div>
          </FadeUp>

        </div>
      </section>

      {/* 4. THE PHILOSOPHY */}
      <section className="py-40 px-6 bg-[#02030A]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Fingerprint className="w-16 h-16 text-emerald-500 mb-12 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-12">
              Wealth is not measured by accumulation. <br/>
              <span className="text-emerald-500">It is measured by immunity.</span>
            </h2>
          </FadeUp>
          <div className="space-y-12 border-l border-white/10 pl-8 md:pl-12">
            <FadeUp delay={0.2}>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                Most financial advisors teach you how to save. We teach you how to structure. If your capital is tied to your social security number, visible to public records, and subject to standard credit reporting, you are exposed.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                AURA operates in the space between standard banking and private equity. We eradicate derogatory debt not by asking nicely, but by aggressively enforcing FCRA compliance law until the bureaus are forced to delete the records. 
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                We originate high-yield commercial loans by bypassing the retail desk and speaking directly to private liquidity. We don't wait for permission; we engineer the approval.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 5. THE ARSENAL (Staggered Bento Grid) */}
      <section className="py-40 px-6 relative bg-[#050813] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-24">
            <p className="text-emerald-500 font-bold tracking-[0.2em] uppercase mb-4">Core Competencies</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">The Arsenal.</h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(380px,auto)]">
            
            <FadeUp delay={0.1} className="lg:col-span-2 group relative bg-[#0A1024] border border-white/5 p-10 overflow-hidden hover:border-emerald-500/50 transition-all duration-700 rounded-3xl flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div>
                 <Anchor className="w-12 h-12 text-white mb-6 group-hover:text-emerald-400 transition-colors" />
                 <h3 className="text-4xl font-medium mb-4 relative z-10">Debt Annihilation</h3>
                 <p className="text-gray-400 text-lg leading-relaxed relative z-10 max-w-lg">We weaponize compliance and consumer law to permanently erase derogatory marks and forcefully settle bad debt for pennies on the dollar.</p>
              </div>
              <Link href="/credit-management" className="relative z-10 w-fit mt-12 flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-sm group-hover:text-emerald-300">
                Deploy Strategy <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.2} className="lg:col-span-1 group relative bg-[#0A1024] border border-white/5 p-10 overflow-hidden hover:border-blue-500/50 transition-all duration-700 rounded-3xl flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div>
                 <Globe className="w-12 h-12 text-white mb-6 group-hover:text-blue-400 transition-colors" />
                 <h3 className="text-3xl font-medium mb-4 relative z-10">Private Liquidity</h3>
                 <p className="text-gray-400 leading-relaxed relative z-10">Access our shadow-network of private equity and bespoke lenders. We secure commercial mortgages when tier-1 institutions deny you.</p>
              </div>
              <Link href="/loan-mortgage" className="relative z-10 w-fit mt-12 flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-sm group-hover:text-blue-300">
                Access Capital <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.3} className="lg:col-span-1 group relative bg-[#0A1024] border border-white/5 p-10 overflow-hidden hover:border-purple-500/50 transition-all duration-700 rounded-3xl flex flex-col justify-between">
               <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/20 transition-all duration-700"></div>
               <div>
                  <ShieldAlert className="w-12 h-12 text-white mb-6 group-hover:text-purple-400 transition-colors" />
                  <h3 className="text-3xl font-medium mb-4 relative z-10">Risk Insulator</h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">Ironclad asset protection protocols designed to shield your liquidity from market volatility and aggressive litigation.</p>
               </div>
               <Link href="/insurance" className="relative z-10 w-fit mt-12 flex items-center gap-2 text-purple-500 font-bold uppercase tracking-widest text-sm group-hover:text-purple-300">
                View Shields <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.4} className="lg:col-span-2 group relative bg-[#0A1024] border border-white/5 p-10 overflow-hidden hover:border-amber-500/50 transition-all duration-700 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 transition-all duration-700 group-hover:bg-amber-500/20"></div>
              <div className="relative z-10 max-w-xl">
                <Lock className="w-12 h-12 text-white mb-6 group-hover:text-amber-400 transition-colors" />
                <h3 className="text-4xl font-medium mb-4">Sovereign Budget Engine</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Stop tracking pennies. We build algorithmic budget structures that automatically funnel cash flows into high-yield holding accounts and tax-advantaged vehicles.
                </p>
              </div>
              <Link href="/what-we-do" className="relative z-10 shrink-0 px-10 py-5 bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all duration-500 rounded-xl font-bold tracking-widest uppercase text-sm">
                View Framework
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 6. GLOBAL INFRASTRUCTURE */}
      <section ref={infraRef} className="py-40 relative overflow-hidden bg-[#020308]">
        <motion.div style={{ y: yInfra }} className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[#020308]/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop" 
            alt="Global Network" 
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <FadeUp>
            <Map className="w-16 h-16 text-emerald-500 mb-8" />
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">Infrastructure <br/>Without Borders.</h2>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-20">
              We operate across multiple jurisdictions. From Wyoming trusts to international private equity deployments, our network ensures your capital is fluid when you need it, and invisible when you don't.
            </p>
          </FadeUp>
          
          <div className="grid md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            {[
              { region: "North America", focus: "Corporate Structuring & Debt Scrubbing" },
              { region: "Caribbean", focus: "Offshore Asset Protection Vehicles" },
              { region: "Europe", focus: "Private Liquidity Sourcing" },
              { region: "Africa (HQ)", focus: "Strategic Emerging Market Deployment" }
            ].map((node, i) => (
               <FadeUp key={i} delay={i * 0.1}>
                 <h4 className="text-2xl font-medium text-white mb-2">{node.region}</h4>
                 <p className="text-gray-500 text-sm leading-relaxed">{node.focus}</p>
               </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DATA ENGINE */}
      <section className="py-40 bg-[#050813] border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <FadeUp>
                     <Cpu className="w-12 h-12 text-emerald-500 mb-8" />
                     <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">Data-driven <br/>Dominance.</h2>
                     <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
                       Our in-house cybersecurity and analytics teams actively monitor market volatility and credit algorithms. We compute the exact moment to strike for loan approvals and debt settlements.
                     </p>
                  </FadeUp>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "0.4ms", label: "Algorithm Speed" },
                    { val: "AES-256", label: "Data Encryption" },
                    { val: "$8.2B", label: "Capital Flow" },
                    { val: "100%", label: "Discretion" }
                  ].map((stat, i) => (
                    <FadeUp key={i} delay={i * 0.1}>
                       <div className="bg-[#0A1024] p-8 border border-white/5 h-full rounded-2xl flex flex-col justify-center">
                          <h4 className="text-3xl md:text-4xl font-medium text-white mb-2">{stat.val}</h4>
                          <p className="text-sm text-emerald-500 font-bold uppercase tracking-wider">{stat.label}</p>
                       </div>
                    </FadeUp>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 8. THE QUALIFICATION GATE */}
      <section className="py-40 px-6 bg-[#02030A]">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-12">Who We Accept.</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-16">
              AURA is not a mass-market retail firm. We allocate our infrastructure strictly to clients who are prepared to execute complex financial strategies without hesitation. 
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FadeUp delay={0.2} className="border-t border-emerald-500/50 pt-8">
              <h4 className="text-2xl font-medium mb-4 text-white">Aggressive Mindset</h4>
              <p className="text-gray-500">You understand that traditional banking is a game you are designed to lose. You are ready to rewrite the rules.</p>
            </FadeUp>
            <FadeUp delay={0.3} className="border-t border-emerald-500/50 pt-8">
              <h4 className="text-2xl font-medium mb-4 text-white">High Liquidity Needs</h4>
              <p className="text-gray-500">You require access to capital that exceeds standard retail limits for commercial acquisitions or private investments.</p>
            </FadeUp>
            <FadeUp delay={0.4} className="border-t border-emerald-500/50 pt-8">
              <h4 className="text-2xl font-medium mb-4 text-white">Total Discretion</h4>
              <p className="text-gray-500">You value anonymity. You want your assets protected behind ghost entities and irrevocable trusts.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050813]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
          <FadeUp>
            <Activity className="w-16 h-16 text-emerald-500 mx-auto mb-10" />
            <h2 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.9] text-white mb-10">
              The hierarchy <br/>
              <span className="font-medium text-emerald-500">ends here.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto">
              You are exactly one decision away from permanently altering your financial trajectory. The infrastructure is waiting.
            </p>
            <Link href="/contact-us" className="inline-block px-16 py-6 border-2 border-emerald-500 text-emerald-500 rounded-sm font-bold text-xl uppercase tracking-widest hover:bg-emerald-500 hover:text-[#050813] transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]">
              Enter The Portal
            </Link>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}