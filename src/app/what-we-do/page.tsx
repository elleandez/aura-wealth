"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Network, Terminal, ShieldAlert, Zap, Cpu, ArrowRight, EyeOff, Layers, Workflow } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

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

export default function Methodology() {
  const containerRef = useRef(null);
  
  // Blueprint Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // The Master Timeline Line Animation
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineScroll } = useScroll({ target: timelineRef, offset: ["start center", "end end"] });
  const lineHeight = useTransform(timelineScroll, [0, 1], ["0%", "100%"]);

  return (
    <main className="bg-[#02040A] min-h-screen text-white overflow-hidden" ref={containerRef}>
      
      {/* 1. THE BLUEPRINT HERO */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-[#02040A]/90 to-[#02040A] z-10" />
          {/* Abstract Grid Background simulating a blueprint */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <Workflow className="w-16 h-16 text-emerald-500 mx-auto mb-8 opacity-80" />
            <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.85] mb-8">
              The <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-emerald-500">
                Architecture.
              </span>
            </h1>
          </motion.div>
          
          <FadeUp delay={0.3} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
              We do not rely on standard retail banking procedures. AURA operates on a proprietary sequence of legal, financial, and algorithmic maneuvers designed to extract maximum leverage from the system.
            </p>
            <Link href="#timeline" className="inline-flex items-center gap-3 px-8 py-4 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-sm rounded-sm">
              View The Playbook
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY OF EXPLOITATION */}
      <section className="py-40 px-6 relative z-20 bg-[#02040A] border-t border-white/5">
         <div className="max-w-5xl mx-auto text-center">
            <FadeUp>
               <Layers className="w-16 h-16 text-gray-600 mx-auto mb-8" />
               <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-gray-300">
                 The system is a machine. <br/>
                 <span className="text-emerald-500 font-medium">We have the source code.</span>
               </h2>
               <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
                 Retail banks, credit bureaus, and the IRS operate on predictable, automated algorithms. They rely on the ignorance of the consumer to maintain their hierarchy. By understanding the exact legal triggers and data thresholds they use, we force the system to yield to your demands.
               </p>
            </FadeUp>
         </div>
      </section>

      {/* 3. THE MASSIVE VERTICAL TIMELINE */}
      <section id="timeline" className="py-40 relative bg-[#050813] border-t border-white/10" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <FadeUp className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">Operational <span className="text-emerald-500">Phases.</span></h2>
          </FadeUp>

          {/* Center Glowing Line */}
          <div className="absolute left-6 md:left-1/2 top-64 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
             <motion.div style={{ height: lineHeight }} className="w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]"></motion.div>
          </div>

          <div className="space-y-40">
            {/* Phase 01 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block w-[45%] text-right pr-16">
                <FadeUp delay={0.1}>
                  <Terminal className="w-16 h-16 text-emerald-500/30 ml-auto group-hover:text-emerald-400 transition-colors duration-500" />
                </FadeUp>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#050813] border-4 border-emerald-500 rounded-full -translate-x-1/2 z-10 group-hover:scale-150 group-hover:bg-emerald-500 transition-all duration-500"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-16">
                <FadeUp>
                  <p className="text-emerald-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Phase 01</p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Infiltration & Audit.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    We initiate a deep-dive forensic audit of your entire financial footprint. We pull raw, unformatted data from all major bureaus, LexisNexis, and public records to identify compliance violations, reporting errors, and hidden liabilities.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Phase 02 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
              <div className="hidden md:block w-[45%] pl-16">
                <FadeUp delay={0.1}>
                  <ShieldAlert className="w-16 h-16 text-red-500/30 group-hover:text-red-500 transition-colors duration-500" />
                </FadeUp>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#050813] border-4 border-red-500 rounded-full -translate-x-1/2 z-10 group-hover:scale-150 group-hover:bg-red-500 transition-all duration-500"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pr-16 md:text-right flex flex-col md:items-end">
                <FadeUp>
                  <p className="text-red-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Phase 02</p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Aggressive Annihilation.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    Using precise FCRA and FDCPA legal frameworks, we corner creditors and bureaus. If they cannot verify a debt with 100% wet-ink accuracy within 30 days, we force federal deletion protocols. Bankruptcies, charge-offs, and late payments are eradicated.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Phase 03 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block w-[45%] text-right pr-16">
                <FadeUp delay={0.1}>
                  <Zap className="w-16 h-16 text-blue-500/30 ml-auto group-hover:text-blue-400 transition-colors duration-500" />
                </FadeUp>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#050813] border-4 border-blue-500 rounded-full -translate-x-1/2 z-10 group-hover:scale-150 group-hover:bg-blue-500 transition-all duration-500"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-16">
                <FadeUp>
                  <p className="text-blue-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Phase 03</p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Liquidity Injection.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    With a pristine credit foundation, we construct high-limit primary tradelines. Once the algorithm favors you, we bypass retail banking and tap directly into our private equity and shadow-banking network to secure jumbo mortgages and massive commercial capital.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Phase 04 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
              <div className="hidden md:block w-[45%] pl-16">
                <FadeUp delay={0.1}>
                  <EyeOff className="w-16 h-16 text-purple-500/30 group-hover:text-purple-400 transition-colors duration-500" />
                </FadeUp>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#050813] border-4 border-purple-500 rounded-full -translate-x-1/2 z-10 group-hover:scale-150 group-hover:bg-purple-500 transition-all duration-500"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pr-16 md:text-right flex flex-col md:items-end">
                <FadeUp>
                  <p className="text-purple-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Phase 04</p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Fortress Construction.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    To ensure you never face exposure again, we structure irrevocable asset trusts and Delaware/Wyoming ghost entities. Your capital becomes legally detached from your physical identity, rendering you immune to audits and predatory litigation.
                  </p>
                </FadeUp>
              </div>
            </div>

             {/* Phase 05 */}
             <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block w-[45%] text-right pr-16">
                <FadeUp delay={0.1}>
                  <Cpu className="w-16 h-16 text-amber-500/30 ml-auto group-hover:text-amber-400 transition-colors duration-500" />
                </FadeUp>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#050813] border-4 border-amber-500 rounded-full -translate-x-1/2 z-10 group-hover:scale-150 group-hover:bg-amber-500 transition-all duration-500"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-16">
                <FadeUp>
                  <p className="text-amber-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm">Phase 05</p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Algorithmic Maintenance.</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    Our cyber division constantly monitors your financial perimeter. Budgets are algorithmically funneled into high-yield, tax-advantaged holding accounts. You step away from daily management and ascend to total operational oversight.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE DATA NODE GRID */}
      <section className="py-40 bg-[#02040A] border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <FadeUp className="text-center mb-20">
               <Network className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
               <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">The AURA Engine.</h2>
               <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                 Behind the legal architecture is a sovereign tech stack. Your data is never exposed to third-party vulnerabilities.
               </p>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "Military-Grade Encryption", desc: "All client communication and document transfer happens behind AES-256 end-to-end encryption." },
                 { title: "Zero-Knowledge Storage", desc: "Your financial data is siloed. Even our own junior architects cannot view your total net worth without your biometric approval." },
                 { title: "Real-Time Volatility Tracking", desc: "Our algorithms monitor micro-fluctuations in interest rates, locking in your loan exactly when the market dips." }
               ].map((node, i) => (
                 <FadeUp key={i} delay={i * 0.1}>
                    <div className="bg-[#050813] border border-white/5 p-10 h-full rounded-2xl hover:border-emerald-500/30 transition-colors">
                       <h3 className="text-2xl font-medium text-white mb-4">{node.title}</h3>
                       <p className="text-gray-400 leading-relaxed">{node.desc}</p>
                    </div>
                 </FadeUp>
               ))}
            </div>
         </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-40 px-6 relative flex items-center justify-center overflow-hidden bg-[#050813]">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#050813] to-[#050813] z-0" />
         
         <div className="relative z-10 max-w-4xl mx-auto text-center">
            <FadeUp>
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
                 The blueprint is useless <br/>without <span className="font-medium text-emerald-500">execution.</span>
               </h2>
               <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                 You have seen the architecture. Now, deploy the team. Select your retainer tier and initiate the process.
               </p>
               <Link href="/subscriptions" className="inline-block px-16 py-6 border border-emerald-500 bg-emerald-500/10 text-emerald-400 rounded-sm font-bold text-xl uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                 Select Retainer
               </Link>
            </FadeUp>
         </div>
      </section>

    </main>
  );
}