"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Building2, Landmark, ShieldCheck, Map } from "lucide-react";
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

export default function LoanMortgage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#0B132B] min-h-screen text-white overflow-hidden" ref={containerRef}>
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[110vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 scale-110 origin-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/40 via-transparent to-[#0B132B] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" 
            alt="Corporate Architecture" 
            className="w-full h-full object-cover animate-pulse-slow"
          />
        </motion.div>

        <div className="relative z-20 max-w-6xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-emerald-400 font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-emerald-400"></span> Private Lending Architecture
            </p>
            <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-[0.9] mb-10">
              Capital. <br/>
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">Without Borders.</span>
            </h1>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Traditional retail banks look at algorithms. We look at assets, potential, and leverage. AURA structures complex, high-yield mortgages and commercial loans for individuals who operate outside the standard banking matrix.
              </p>
            </FadeUp>
            <FadeUp delay={0.5} className="flex items-end">
              <Link href="/contact-us" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold text-lg hover:bg-emerald-400 hover:text-white transition-all duration-500 w-fit">
                Apply for Capital <ArrowRight className="w-6 h-6" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. THE AURA ADVANTAGE */}
      <section className="py-40 px-6 bg-[#0B132B] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <FadeUp>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 leading-tight">
                  Why settle for <br/> <span className="text-gray-500">retail limits?</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  The financial system is designed to keep you constrained within neat, predefined boxes. DTI ratios, rigid credit algorithms, and inflexible terms are the tools of mass-market banking.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  At AURA, we bypass the retail desk entirely. We tap directly into institutional liquidity pools, private equity funds, and bespoke lending consortiums to architect loan structures that banks simply cannot underwrite. We don't say no; we figure out how.
                </p>
              </FadeUp>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {[
                { title: "Non-QM Mortgages", desc: "No standard W2? No problem. We underwrite based on bank statements, asset depletion, and DSCR for real estate investors." },
                { title: "Jumbo & Super Jumbo", desc: "For properties exceeding standard conforming loan limits. We secure rates that aggressively compete with standard residential mortgages." },
                { title: "Bridge Capital", desc: "Short-term, high-velocity funding to acquire assets instantly while long-term financing is being structured." },
                { title: "Commercial Portfolios", desc: "Multifamily, retail, and industrial lending. From $5M to $500M+ structures handled entirely in-house." }
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.15}>
                  <div className="bg-[#121A35]/50 border border-white/5 p-8 h-full rounded-sm hover:border-emerald-500/30 transition-colors">
                    <CheckCircle2 className="text-emerald-500 mb-6 w-8 h-8" />
                    <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX STAT SECTION */}
      <section className="py-40 relative flex items-center justify-center overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 bg-fixed" />
        <div className="absolute inset-0 bg-[#0B132B]/80 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <FadeUp>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">Execution is <span className="font-medium text-emerald-400">Everything.</span></h2>
            <p className="text-2xl text-gray-300 font-light mb-16">Over $4.2 Billion in complex real estate and commercial debt structured since inception.</p>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
             <FadeUp delay={0.2} className="border-l border-emerald-500 pl-6">
                <p className="text-5xl font-medium text-white mb-2">14 Days</p>
                <p className="text-gray-400">Average closing time for bridge and hard money commercial assets.</p>
             </FadeUp>
             <FadeUp delay={0.4} className="border-l border-emerald-500 pl-6">
                <p className="text-5xl font-medium text-white mb-2">94%</p>
                <p className="text-gray-400">Approval rate for clients previously denied by Tier 1 retail banking institutions.</p>
             </FadeUp>
             <FadeUp delay={0.6} className="border-l border-emerald-500 pl-6">
                <p className="text-5xl font-medium text-white mb-2">$500M+</p>
                <p className="text-gray-400">Dedicated private liquidity pool for immediate deployment.</p>
             </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. THE PROCESS */}
      <section className="py-40 px-6">
         <div className="max-w-7xl mx-auto">
            <FadeUp>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-20 text-center">The AURA <span className="text-emerald-500">Deployment.</span></h2>
            </FadeUp>

            <div className="space-y-12">
              {[
                { step: "01", title: "Discovery & Analysis", desc: "You are assigned a dedicated lending architect. We audit your financial footprint, dissecting tax returns, asset schedules, and corporate structures to find the hidden leverage points." },
                { step: "02", title: "Structuring the Deal", desc: "We don't just submit applications; we build a narrative. We present your file directly to our private network, negotiating terms, interest-only periods, and LTVs on your behalf." },
                { step: "03", title: "Aggressive Underwriting", desc: "Our internal team pre-underwrites the file. By the time it reaches the final lender, it is bulletproof. We handle the appraisals, the title work, and the legal friction." },
                { step: "04", title: "Funding & Execution", desc: "Wires are deployed. Assets are secured. You move forward with capital that empowers your strategy rather than choking your cash flow." }
              ].map((item, i) => (
                <FadeUp key={i} delay={0.1}>
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
                    <div className="text-6xl md:text-8xl font-bold text-[#121A35] group-hover:text-emerald-900 transition-colors duration-500">
                      {item.step}
                    </div>
                    <div className="pt-4 border-t border-white/10 flex-grow group-hover:border-emerald-500/50 transition-colors duration-500">
                      <h3 className="text-3xl font-medium mb-4 text-white group-hover:text-emerald-400 transition-colors duration-500">{item.title}</h3>
                      <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
         </div>
      </section>

      {/* 5. FINAL MASSIVE CTA */}
      <section className="py-40 px-6 relative bg-emerald-950 flex justify-center text-center">
         <div className="relative z-10 max-w-4xl mx-auto">
            <FadeUp>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white mb-8">Ready to move <br/><span className="font-semibold">serious capital?</span></h2>
              <p className="text-xl text-emerald-200 mb-12 font-light">Stop waiting on committees. Secure your funding with the architects of modern wealth.</p>
              <Link href="/contact-us" className="inline-block px-14 py-6 bg-white text-emerald-950 rounded-sm font-bold text-xl hover:bg-black hover:text-white transition-all duration-300 shadow-2xl hover:scale-105">
                Initiate Application
              </Link>
            </FadeUp>
         </div>
      </section>

    </main>
  );
}