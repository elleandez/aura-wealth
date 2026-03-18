"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Sovereign",
    price: "Free",
    desc: "Entry-level asset monitoring and credit architecture initialization.",
    features: ["Basic Credit Audit", "Debt Visualization", "Standard Support", "Digital Wallet Access"],
    icon: <Zap className="text-emerald-500" />,
    color: "emerald"
  },
  {
    name: "Syndicate",
    price: "$499/mo",
    desc: "Aggressive debt annihilation and legal forensic auditing.",
    features: ["Forensic Bureau Disputes", "Identity Theft Protection", "Priority Support", "Private Lending Access"],
    icon: <Shield className="text-blue-500" />,
    color: "blue",
    popular: true
  },
  {
    name: "Apex Oracle",
    price: "Custom",
    desc: "Complete shadow-liquidity management and offshore protection.",
    features: ["Unlimited Bureau Strikes", "Asset Shielding", "24/7 Dedicated Architect", "Global Concierge"],
    icon: <Crown className="text-purple-500" />,
    color: "purple"
  }
];

export default function Subscriptions() {
  return (
    <main className="min-h-screen bg-[#02040A] text-white pt-24 pb-20 px-4 md:px-8">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-emerald-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
          >
            Tier Selection Protocol
          </motion.span>
          <h1 className="text-3xl md:text-6xl font-light tracking-tighter mb-4">
            Select Your <span className="font-bold">Clearance Level</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto px-4">
            AURA operates on tiers of extreme efficiency. Choose the architecture that aligns with your capital objectives.
          </p>
        </header>

        {/* RESPONSIVE GRID: 1 column on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-[#0A1024] border ${tier.popular ? 'border-emerald-500/50' : 'border-white/5'} p-6 md:p-10 rounded-[2rem] flex flex-col justify-between group overflow-hidden`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Lethal
                </div>
              )}

              <div>
                <div className="mb-6">{tier.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {tier.desc}
                </p>
                <div className="text-3xl md:text-4xl font-mono mb-8">{tier.price}</div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
                      <Check className="text-emerald-500 w-4 h-4 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/portal"
                className={`w-full py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 
                  ${tier.popular ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
              >
                Initiate Setup <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="mt-16 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            All subscriptions are encrypted and billed through secure shadow-channels.
          </p>
        </footer>
      </div>
    </main>
  );
}