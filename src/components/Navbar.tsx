"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* ULTRA-PREMIUM NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B132B]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-light tracking-tighter" onClick={closeMenu}>
            AURA<span className="text-emerald-500 font-bold">.</span>
          </Link>
          
          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-10 text-sm text-gray-300 font-medium tracking-wide">
            <div className="relative group h-24 flex items-center">
              <button className="hover:text-emerald-400 transition-colors flex items-center gap-2 outline-none">
                Expertise <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-72 bg-[#121A35]/95 backdrop-blur-2xl border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl overflow-hidden transform group-hover:translate-y-0 translate-y-4">
                <div className="p-2 flex flex-col">
                  <Link href="/loan-mortgage" className="px-4 py-3 hover:bg-white/5 rounded-lg transition-colors flex flex-col">
                    <span className="text-white font-semibold">Loans & Mortgages</span>
                    <span className="text-xs text-gray-400 mt-1">Commercial & Residential</span>
                  </Link>
                  <Link href="/credit-management" className="px-4 py-3 hover:bg-white/5 rounded-lg transition-colors flex flex-col">
                    <span className="text-white font-semibold">Credit Reclamation</span>
                    <span className="text-xs text-gray-400 mt-1">Eradicate bad debt</span>
                  </Link>
                  <Link href="/insurance" className="px-4 py-3 hover:bg-white/5 rounded-lg transition-colors flex flex-col">
                    <span className="text-white font-semibold">Risk & Insurance</span>
                    <span className="text-xs text-gray-400 mt-1">Ironclad asset protection</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/what-we-do" className="hover:text-emerald-400 transition-colors">Methodology</Link>
            <Link href="/founders" className="hover:text-emerald-400 transition-colors">Founders</Link>
            <Link href="/subscriptions" className="hover:text-emerald-400 transition-colors">Tiers</Link>
          </div>

          {/* Desktop CTA - LINKED TO /PORTAL */}
          <div className="hidden md:block">
            <Link href="/portal" className="px-8 py-3.5 bg-white text-black text-sm font-bold tracking-wide rounded-sm hover:bg-emerald-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              CLIENT PORTAL
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8 text-emerald-500" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-24 z-40 bg-[#050813]/95 backdrop-blur-3xl md:hidden overflow-y-auto border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-6 text-lg font-medium tracking-wide">
              
              {/* Mobile Expertise Dropdown */}
              <div className="flex flex-col space-y-4 border-b border-white/10 pb-6">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="flex items-center justify-between text-white w-full text-left"
                >
                  Expertise
                  <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: "auto", opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col space-y-4 pl-4 overflow-hidden border-l-2 border-emerald-500/30"
                    >
                      <Link href="/loan-mortgage" onClick={closeMenu} className="text-gray-400 hover:text-emerald-400">Loans & Mortgages</Link>
                      <Link href="/credit-management" onClick={closeMenu} className="text-gray-400 hover:text-emerald-400">Credit Reclamation</Link>
                      <Link href="/insurance" onClick={closeMenu} className="text-gray-400 hover:text-emerald-400">Risk & Insurance</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/what-we-do" onClick={closeMenu} className="text-white hover:text-emerald-400 transition-colors">Methodology</Link>
              <Link href="/founders" onClick={closeMenu} className="text-white hover:text-emerald-400 transition-colors">Founders</Link>
              <Link href="/subscriptions" onClick={closeMenu} className="text-white hover:text-emerald-400 transition-colors">Tiers</Link>
              
              <div className="pt-8">
                {/* Mobile Portal Link - LINKED TO /PORTAL */}
                <Link href="/portal" onClick={closeMenu} className="block w-full py-4 text-center bg-emerald-500 text-black font-bold tracking-widest uppercase rounded-sm">
                  Client Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}