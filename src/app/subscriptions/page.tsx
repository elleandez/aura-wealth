"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Star, Crown, Shield, Zap, Bell, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
);

// 67 Random Names and Massive Debt Amounts for the FOMO Pop-ups
const recentClearances = [
  { name: "Michael T.", amount: "$42,500" }, { name: "Sarah J.", amount: "$18,200" }, { name: "David K.", amount: "$105,000" },
  { name: "Jessica R.", amount: "$64,350" }, { name: "James L.", amount: "$22,000" }, { name: "Robert B.", amount: "$89,900" },
  { name: "Emily C.", amount: "$12,400" }, { name: "William H.", amount: "$250,000" }, { name: "Ashley M.", amount: "$34,700" },
  { name: "Brian D.", amount: "$56,800" }, { name: "Matthew G.", amount: "$78,200" }, { name: "Lauren S.", amount: "$15,600" },
  { name: "Christopher P.", amount: "$112,000" }, { name: "Amanda W.", amount: "$45,900" }, { name: "Joshua F.", amount: "$93,400" },
  { name: "Megan L.", amount: "$28,500" }, { name: "Andrew T.", amount: "$134,000" }, { name: "Rachel K.", amount: "$67,100" },
  { name: "Daniel V.", amount: "$41,200" }, { name: "Nicole N.", amount: "$88,500" }, { name: "Anthony R.", amount: "$210,000" },
  { name: "Justin E.", amount: "$33,400" }, { name: "Samantha P.", amount: "$52,900" }, { name: "Kevin W.", amount: "$18,800" },
  { name: "Oluwaseun A.", amount: "$95,000" }, { name: "Chinedu E.", amount: "$44,200" }, { name: "Fatima S.", amount: "$76,300" }
];

export default function Subscriptions() {
  const [currentNotification, setCurrentNotification] = useState<{name: string, amount: string} | null>(null);

  // Logic to show a random pop-up every 4 to 8 seconds
  useEffect(() => {
    const triggerNotification = () => {
      const randomClearance = recentClearances[Math.floor(Math.random() * recentClearances.length)];
      setCurrentNotification(randomClearance);
      
      // Hide it after 4 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);

      // Schedule next one randomly between 5 to 10 seconds later
      const nextTime = Math.floor(Math.random() * 5000) + 5000;
      setTimeout(triggerNotification, nextTime);
    };

    // Start the first one after 2 seconds
    const initialTimer = setTimeout(triggerNotification, 2000);
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <main className="bg-[#02040A] min-h-screen text-white overflow-hidden pt-32 pb-40 relative">
      
      {/* FOMO NOTIFICATION POP-UP (Bottom Right) */}
      <div className="fixed bottom-8 right-8 z-[100] pointer-events-none">
        <AnimatePresence>
          {currentNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="bg-[#0B132B]/95 backdrop-blur-md border border-emerald-500/30 p-4 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-4 min-w-[300px]"
            >
              <div className="bg-emerald-500/20 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Just settled bad debt</p>
                <p className="text-white font-bold">
                  {currentNotification.name} <span className="text-emerald-400 ml-1">cleared {currentNotification.amount}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 1. HEADER */}
      <section className="relative px-6 text-center max-w-5xl mx-auto mb-32">
        <FadeUp>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase">Client Retainer Models</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
            Access the <br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">
              Inner Circle.
            </span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            We do not take on everyone. Select the tier that matches your current crisis or future ambition. We handle the rest.
          </p>
        </FadeUp>
      </section>

      {/* 2. PRICING GRID (Rewritten for absolute clarity) */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* BRONZE TIER - The "Fix My Credit" Tier */}
          <FadeUp delay={0.2}>
            <div className="bg-[#0A1024] border border-white/10 p-10 rounded-2xl hover:border-orange-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-700/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-600/20 transition-all"></div>
              
              <div className="relative z-10 flex-grow">
                <h3 className="text-orange-400 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Tier I : Bronze</h3>
                <h2 className="text-4xl font-light mb-6">Credit Rescue</h2>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-medium">$2,500</span>
                  <span className="text-gray-500">/retainer</span>
                </div>
                
                <p className="text-gray-400 mb-10 h-20">Perfect for individuals drowning in bad debt who need their credit score fixed and collections stopped immediately.</p>
                
                <ul className="space-y-5 mb-12">
                  <li className="flex items-center gap-4 text-sm font-medium"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> We delete late payments & charge-offs</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> We legally force debt collectors to stop calling</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> We remove hard inquiries from your report</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Fast score boosting strategies</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-gray-600"><X className="w-5 h-5 shrink-0" /> No Loan Procurement</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-gray-600"><X className="w-5 h-5 shrink-0" /> No Asset Hiding / Trusts</li>
                </ul>
              </div>
              <Link href="/contact-us" className="relative z-10 block w-full py-4 text-center border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm mt-auto">
                Select Bronze
              </Link>
            </div>
          </FadeUp>

          {/* GOLD TIER - The "Untouchable" Tier */}
          <FadeUp delay={0.4}>
            <div className="bg-[#0F152D] border-2 border-yellow-500/50 p-12 rounded-2xl hover:border-yellow-400 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)] transition-all duration-500 group relative overflow-hidden transform lg:scale-105 z-10 flex flex-col h-full">
              <div className="absolute top-0 left-1/2 w-full h-full bg-yellow-500/5 rounded-full blur-[100px] -translate-x-1/2 transition-all group-hover:bg-yellow-500/10"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600"></div>

              <div className="relative z-10 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-2">
                    <Crown className="w-4 h-4" /> Tier III : Gold
                  </h3>
                  <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-yellow-500/20">Apex Status</span>
                </div>
                
                <h2 className="text-5xl font-light mb-6 text-white">The Fortress</h2>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-medium">$15,000</span>
                  <span className="text-gray-400">/retainer</span>
                </div>
                
                <p className="text-gray-300 mb-10 h-20">The ultimate level of wealth management. We hide your assets, secure massive commercial capital, and provide total legal immunity.</p>
                
                <ul className="space-y-5 mb-12">
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> Includes everything in Bronze & Silver</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> Setup of Offshore & Anonymous Bank Accounts</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> Creation of Irrevocable Trusts (Lawsuit proof)</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> Direct access to our Private Equity network</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> Jumbo Commercial Real Estate Loans</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-white"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0" /> 24/7 direct cell access to a Founding Partner</li>
                </ul>
              </div>
              <Link href="/contact-us" className="relative z-10 block w-full py-5 text-center bg-yellow-500 text-[#02040A] hover:bg-yellow-400 transition-all duration-300 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(234,179,8,0.2)] mt-auto">
                Apply For Gold
              </Link>
            </div>
          </FadeUp>

          {/* SILVER TIER - The "Get Me Funded" Tier */}
          <FadeUp delay={0.3}>
            <div className="bg-[#0A1024] border border-white/10 p-10 rounded-2xl hover:border-slate-400/50 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-slate-400/20 transition-all"></div>
              
              <div className="relative z-10 flex-grow">
                <h3 className="text-slate-400 font-bold tracking-[0.2em] uppercase mb-2 text-sm">Tier II : Silver</h3>
                <h2 className="text-4xl font-light mb-6">Capital Access</h2>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-medium">$7,500</span>
                  <span className="text-gray-500">/retainer</span>
                </div>
                
                <p className="text-gray-400 mb-10 h-20">For those who have a clean slate (or need one) and are ready to secure high-limit funding for businesses or mortgages.</p>
                
                <ul className="space-y-5 mb-12">
                  <li className="flex items-center gap-4 text-sm font-medium"><Shield className="w-5 h-5 text-slate-400 shrink-0" /> Includes everything in Bronze</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Shield className="w-5 h-5 text-slate-400 shrink-0" /> We add high-limit tradelines to your profile</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Shield className="w-5 h-5 text-slate-400 shrink-0" /> Underwriting for difficult residential mortgages</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Shield className="w-5 h-5 text-slate-400 shrink-0" /> Business credit structuring and funding</li>
                  <li className="flex items-center gap-4 text-sm font-medium"><Shield className="w-5 h-5 text-slate-400 shrink-0" /> Automated Wealth Management dashboard</li>
                  <li className="flex items-center gap-4 text-sm font-medium text-gray-600"><X className="w-5 h-5 shrink-0" /> No Offshore Accounts or Trusts</li>
                </ul>
              </div>
              <Link href="/contact-us" className="relative z-10 block w-full py-4 text-center border border-white/20 hover:bg-slate-300 hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm mt-auto">
                Select Silver
              </Link>
            </div>
          </FadeUp>

        </div>
      </section>
    </main>
  );
}