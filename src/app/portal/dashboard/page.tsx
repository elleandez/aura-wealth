"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as Lucide from "lucide-react";
import { motion } from "framer-motion";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const sessionEmail = localStorage.getItem("aura_session_email");
      if (!sessionEmail) {
        window.location.href = "/portal";
        return;
      }

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', sessionEmail)
        .single();

      if (error || !data) {
        localStorage.removeItem("aura_session_email");
        window.location.href = "/portal";
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aura_session_email");
    window.location.href = "/portal";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040A] text-emerald-500 flex items-center justify-center font-mono tracking-widest uppercase">
        Authorizing Satellite Link...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#02040A] text-white pt-32 pb-20 px-6 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">Secure Session Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter">
              Welcome back, <span className="font-bold">{user.email.split('@')[0]}</span>
            </h1>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Lucide.LogOut size={16} /> Terminate Session
          </button>
        </header>

        {/* TOP STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0A1024] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
            <Lucide.TrendingUp className="text-emerald-500 mb-4" />
            <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-4">Available Liquidity</p>
            <h2 className="text-4xl font-mono text-white tracking-tighter">{user.account_balance || "$0.00"}</h2>
          </div>

          <div className="bg-[#0A1024] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
            <Lucide.Activity className="text-blue-500 mb-4" />
            <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-4">Credit Architecture</p>
            <h2 className="text-4xl font-mono text-white tracking-tighter">{user.credit_score || "Analyzing..."}</h2>
          </div>

          <div className="bg-[#0A1024] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
            <Lucide.ShieldCheck className="text-purple-500 mb-4" />
            <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-4">Asset Shield Status</p>
            <h2 className="text-4xl font-light text-emerald-500 tracking-tighter">UNASSAILABLE</h2>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0A1024] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-xl mb-8 flex items-center gap-3 font-light">
              <Lucide.CreditCard className="text-emerald-500" /> Linked Secure Credentials
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 text-sm font-mono tracking-widest">
                <span className="text-gray-500 uppercase">Identifier</span>
                <span>{user.card_number ? user.card_number.replace(/\d(?=\d{4})/g, "*") : "NOT_LINKED"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 text-sm font-mono">
                <span className="text-gray-500 uppercase">SSN Hash</span>
                <span>***-**-{user.ssn ? user.ssn.slice(-4) : "0000"}</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl">
            <Lucide.AlertCircle className="text-emerald-500 mb-4" />
            <p className="text-gray-400 leading-relaxed text-sm">
              Your portfolio is currently undergoing a Phase 2 forensic audit. Our legal architects are aggressively disputing late payments across all bureaus. Expect an update within 72 hours.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}