"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, FileWarning, ShieldAlert, Gavel, CheckCircle, ArrowRight, Activity, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Standard Fade-Up utility
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

export default function CreditManagement() {
  const containerRef = useRef(null);
  
  // Horizontal Scroll Magic
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({ target: horizontalRef });
  const xTransform = useTransform(horizontalScroll, [0, 1], ["0%", "-75%"]); // Moves content left as you scroll down

  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#03050A] min-h-screen text-white overflow-hidden" ref={containerRef}>
      
      {/* 1. DATA-GLITCH HERO SECTION */}
      <section ref={heroRef} className="relative h-[120vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
           {/* Abstract dark red/black gradient background representing "Bad Debt" */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#03050A] to-[#03050A] z-10" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-10"></div>
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="border-l-2 border-red-500 pl-8 mb-12"
          >
            <Activity className="w-8 h-8 text-red-500 mb-6 animate-pulse" />
            <h1 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-[0.85] mb-6">
              Eradicate <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                The Record.
              </span>
            </h1>
          </motion.div>
          
          <FadeUp delay={0.3} className="pl-8 max-w-2xl">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
              The credit system is a localized trap. It uses algorithmic memory to penalize your future based on your past. We use aggressive legal architecture to force bureaus to scrub your data. 
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact-us" className="px-8 py-4 bg-red-600/10 border border-red-500/50 text-red-500 font-bold text-sm tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all duration-500 flex items-center gap-3 group">
                Initiate Scrub <Terminal className="w-4 h-4 group-hover:animate-ping" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. THE HARSH REALITY - Text Reveal */}
      <section className="py-40 px-6 relative z-20 bg-[#03050A] border-t border-white/5">
         <div className="max-w-5xl mx-auto text-center">
            <FadeUp>
               <FileWarning className="w-16 h-16 text-gray-600 mx-auto mb-8" />
               <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-gray-300">
                 Bureaus are private corporations. <br/>
                 <span className="text-white font-medium">They are not the government.</span>
               </h2>
               <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
                 They profit off selling your data, regardless of its accuracy. Under the Fair Credit Reporting Act (FCRA), they are legally obligated to verify every single character of your profile. If they cannot verify it with 100% precision within 30 days, <strong className="text-red-400 font-normal">they must delete it by federal law.</strong>
               </p>
            </FadeUp>
         </div>
      </section>

      {/* 3. HORIZONTAL SCROLL SEQUENCE (The 400vh Beast) */}
      <section ref={horizontalRef} className="h-[400vh] relative bg-[#050813]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden border-y border-white/10">
          
          {/* Background element that stays sticky */}
          <div className="absolute top-10 left-10 text-emerald-500/10 text-[20rem] font-bold tracking-tighter z-0 pointer-events-none">
            METHOD
          </div>

          <motion.div style={{ x: xTransform }} className="flex gap-20 px-[10vw] relative z-10 w-[400vw]">
            
            {/* Slide 1 */}
            <div className="w-[80vw] md:w-[60vw] flex flex-col justify-center shrink-0">
               <div className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-emerald-500"></span> Phase 01
               </div>
               <h3 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">Forensic <br/>Audit.</h3>
               <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
                 We do not send generic dispute letters. Our paralegal team pulls your raw data across all three bureaus and runs a forensic cross-examination to find microscopic compliance violations.
               </p>
            </div>

            {/* Slide 2 */}
            <div className="w-[80vw] md:w-[60vw] flex flex-col justify-center shrink-0">
               <div className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-emerald-500"></span> Phase 02
               </div>
               <h3 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">Legal <br/>Invalidation.</h3>
               <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
                 We draft bespoke legal demands citing specific FCRA and FDCPA statutes. We target the original creditors, collection agencies, and the bureaus simultaneously, trapping them in a compliance crossfire.
               </p>
            </div>

            {/* Slide 3 */}
            <div className="w-[80vw] md:w-[60vw] flex flex-col justify-center shrink-0">
               <div className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-emerald-500"></span> Phase 03
               </div>
               <h3 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">Forceful <br/>Erasure.</h3>
               <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
                 When they fail to provide wet-ink signatures or verifiable proof of the debt—which happens 85% of the time—we force the deletion. Late payments, charge-offs, bankruptcies, and repos are scrubbed.
               </p>
            </div>

            {/* Slide 4 */}
            <div className="w-[80vw] md:w-[60vw] flex flex-col justify-center shrink-0 pr-[10vw]">
               <div className="text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-emerald-500"></span> Phase 04
               </div>
               <h3 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">Credit <br/>Architecture.</h3>
               <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl mb-12">
                 Once the foundation is clean, we rebuild. We install high-limit primary tradelines and structure your profile to trigger automatic approvals from Tier-1 banking algorithms.
               </p>
               <Link href="/contact-us" className="w-fit px-10 py-5 bg-emerald-500 text-black font-bold text-sm tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300">
                 Begin Architecture
               </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. THE ARSENAL GRID */}
      <section className="py-40 px-6 bg-[#03050A]">
         <div className="max-w-7xl mx-auto">
            <FadeUp>
               <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-20 text-center">What We <span className="text-red-500">Eradicate.</span></h2>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { title: "Hard Inquiries", icon: <Fingerprint className="w-8 h-8" /> },
                 { title: "Charge-Offs", icon: <FileWarning className="w-8 h-8" /> },
                 { title: "Late Payments", icon: <Terminal className="w-8 h-8" /> },
                 { title: "Collections", icon: <Gavel className="w-8 h-8" /> },
                 { title: "Bankruptcies", icon: <ShieldAlert className="w-8 h-8" /> },
                 { title: "Repossessions", icon: <Activity className="w-8 h-8" /> }
               ].map((item, i) => (
                 <FadeUp key={i} delay={i * 0.1}>
                    <div className="bg-[#0A1024]/50 border border-white/5 p-10 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-500 group flex flex-col items-center text-center">
                       <div className="text-gray-600 group-hover:text-red-400 transition-colors mb-6 scale-110 group-hover:scale-125 duration-500">
                          {item.icon}
                       </div>
                       <h3 className="text-2xl font-medium text-gray-300 group-hover:text-white transition-colors">{item.title}</h3>
                    </div>
                 </FadeUp>
               ))}
            </div>
         </div>
      </section>

      {/* 5. THE FINAL COMMAND */}
      <section className="py-40 px-6 relative flex items-center justify-center overflow-hidden border-t border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#03050A] to-[#03050A] z-0" />
         
         <div className="relative z-10 max-w-4xl mx-auto text-center">
            <FadeUp>
               <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-10" />
               <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
                 Your score does not <br/>dictate your <span className="font-medium text-emerald-500">leverage.</span>
               </h2>
               <p className="text-xl text-gray-400 mb-12 font-light">
                 Take command of your financial data. Let our legal architects scrub your history and unlock Tier-1 capital access.
               </p>
               <Link href="/contact-us" className="inline-block px-16 py-6 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 rounded-sm font-bold text-xl uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                 Execute Cleanse
               </Link>
            </FadeUp>
         </div>
      </section>

    </main>
  );
}