"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock, EyeOff, AlertTriangle, ArrowRight, Umbrella, Activity, Crosshair } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function RiskInsurance() {
  const containerRef = useRef(null);
  
  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const scaleShield = useTransform(heroScroll, [0, 1], [1, 1.5]);

  return (
    <main className="bg-[#050813] min-h-screen text-white overflow-hidden" ref={containerRef}>
      
      {/* 1. THE IMPENETRABLE HERO */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050813] to-[#050813] z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] border-[1px] border-indigo-500/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-[600px] border-[1px] border-indigo-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-20 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Shield className="w-20 h-20 text-indigo-500 mx-auto mb-8 opacity-80" />
            <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.85] mb-6">
              Total <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-500">
                Insulation.
              </span>
            </h1>
          </motion.div>
          
          <FadeUp delay={0.4} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
              Wealth without a perimeter is just a target. We architect ironclad legal and financial shields to insulate your liquid assets, real estate, and legacy from litigation, market collapse, and systemic exposure.
            </p>
            <div className="flex justify-center items-center gap-6">
              <Link href="/subscriptions" className="px-10 py-5 bg-indigo-600/10 border border-indigo-500/50 text-indigo-400 font-bold text-sm tracking-widest uppercase hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                Deploy Shields
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. THE THREAT MATRIX */}
      <section className="py-40 px-6 relative z-20 bg-[#020308] border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <FadeUp>
                  <AlertTriangle className="w-12 h-12 text-amber-500 mb-8" />
                  <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 leading-tight">
                    The modern landscape is <br/> <span className="text-amber-500/80 font-medium">inherently hostile.</span>
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed mb-8">
                    Lawsuits, audits, aggressive creditors, and sudden economic downturns do not announce themselves. By the time you realize you are exposed, your capital is already bleeding. 
                  </p>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    Standard insurance policies are drafted to protect the insurer, not you. AURA builds bespoke risk-transfer vehicles that put absolute zero-liability walls between you and the public domain.
                  </p>
               </FadeUp>
               
               <div className="relative">
                  <motion.div style={{ scale: scaleShield }} className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] z-0"></motion.div>
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                     {[
                        { label: "Asset Freezes", desc: "Blocked by sovereign trust structures." },
                        { label: "Predatory Litigation", desc: "Deflected via multi-layer corporate veils." },
                        { label: "Market Collapse", desc: "Hedged via non-correlated private policies." },
                        { label: "Data Exposure", desc: "Erased via financial anonymity protocols." }
                     ].map((threat, i) => (
                        <FadeUp key={i} delay={i * 0.15}>
                           <div className="bg-[#0A1024] border border-white/5 p-8 rounded-xl hover:border-indigo-500/50 transition-colors">
                              <h4 className="text-white font-medium text-xl mb-3">{threat.label}</h4>
                              <p className="text-sm text-gray-500">{threat.desc}</p>
                           </div>
                        </FadeUp>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. THE ARSENAL (Hover Expansions) */}
      <section className="py-40 px-6 bg-[#050813]">
         <div className="max-w-7xl mx-auto">
            <FadeUp>
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-20 text-center">Layers of <span className="text-indigo-500">Defense.</span></h2>
            </FadeUp>
            
            <div className="space-y-6">
               {[
                 { title: "Irrevocable Asset Trusts", icon: <Lock className="w-8 h-8" />, desc: "We physically and legally detach your wealth from your personal identity, rendering it untouchable by domestic creditors or hostile legal judgments." },
                 { title: "Key-Man & Corporate Life", icon: <Activity className="w-8 h-8" />, desc: "Multi-million dollar liquidity injections triggered instantly upon critical operational losses, ensuring your empire does not collapse under sudden succession crises." },
                 { title: "Ghost-Entity Structuring", icon: <EyeOff className="w-8 h-8" />, desc: "We establish Wyoming and Delaware holding companies nested inside offshore trust networks, providing absolute financial anonymity." },
                 { title: "High-Limit Umbrella Policies", icon: <Umbrella className="w-8 h-8" />, desc: "From $10M to $100M+ in personal and commercial liability coverage, covering the massive gaps left by traditional retail insurance." }
               ].map((item, i) => (
                 <FadeUp key={i} delay={0.1}>
                    <div className="group bg-[#0A1024]/50 border border-white/5 p-10 md:p-14 hover:bg-indigo-900/10 hover:border-indigo-500/40 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-10">
                       <div className="bg-[#050813] p-6 rounded-full text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl">
                          {item.icon}
                       </div>
                       <div className="flex-1">
                          <h3 className="text-3xl font-medium text-white mb-4">{item.title}</h3>
                          <p className="text-xl text-gray-400 leading-relaxed">{item.desc}</p>
                       </div>
                       <div className="hidden md:block">
                          <ArrowRight className="w-8 h-8 text-indigo-500/30 group-hover:text-indigo-400 group-hover:translate-x-4 transition-all duration-500" />
                       </div>
                    </div>
                 </FadeUp>
               ))}
            </div>
         </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-40 px-6 relative flex items-center justify-center overflow-hidden border-t border-white/5">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5 z-0"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto text-center">
            <FadeUp>
               <Crosshair className="w-20 h-20 text-indigo-500 mx-auto mb-10" />
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
                 Remove the <br/>target from your <span className="font-medium text-indigo-500">back.</span>
               </h2>
               <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                 Do not wait for the subpoena, the audit, or the collapse. Architect your financial fortress today.
               </p>
               <Link href="/subscriptions" className="inline-block px-16 py-6 bg-white text-[#050813] rounded-sm font-bold text-xl uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-2xl hover:scale-105">
                 Establish Perimeter
               </Link>
            </FadeUp>
         </div>
      </section>
    </main>
  );
}