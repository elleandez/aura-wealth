"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ShieldCheck, Lock } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'inquiry' | 'processing' | 'done'>('email');
  const [clientEmail, setClientEmail] = useState("");
  const [input, setInput] = useState("");
  
  const [messages, setMessages] = useState<{role: 'agent'|'user', text: string}[]>([
    { role: 'agent', text: 'AURA Concierge initialized. To establish a secure two-way line, please provide your email address.' }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // STEP 1: Capture Email
    if (step === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'agent', text: 'Invalid format. A secure email address is required to proceed.' }]);
        setInput("");
        return;
      }
      
      setClientEmail(input);
      setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'agent', text: 'Identity logged. Secure line established. State your objective (Debt Annihilation, Capital Access, or Asset Protection).' }]);
      setStep('inquiry');
      setInput("");
      return;
    }

    // STEP 2: Capture Inquiry and Transmit
    if (step === 'inquiry') {
      const finalMessage = input;
      setMessages(prev => [...prev, { role: 'user', text: finalMessage }]);
      setInput("");
      setStep('processing');
      
      setMessages(prev => [...prev, { role: 'agent', text: 'Encrypting transmission and alerting Founding Partners...' }]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: clientEmail, message: finalMessage }),
        });

        const data = await response.json();

        setMessages(prev => {
          const filtered = prev.slice(0, -1); // Remove the "Encrypting..." message
          return [...filtered, { role: 'agent', text: data.reply }];
        });
        setStep('done');

      } catch (error) {
        setMessages(prev => {
          const filtered = prev.slice(0, -1);
          return [...filtered, { role: 'agent', text: 'Connection timeout. Please contact elleandez321@gmail.com directly.' }];
        });
        setStep('done');
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <button 
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'flex'} items-center gap-3 bg-emerald-500 text-[#050813] px-6 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform`}
      >
        <MessageSquare className="w-5 h-5" /> Secure Link
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-[#0A1024] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#050813] border-b border-white/10 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-white font-bold tracking-widest uppercase text-xs">AURA Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm ${msg.role === 'user' ? 'bg-emerald-500 text-black rounded-l-xl rounded-tr-xl' : 'bg-[#121A35] border border-white/5 text-gray-200 rounded-r-xl rounded-tl-xl'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#050813] border-t border-white/10 flex items-center gap-2">
              <input 
                type={step === 'email' ? 'email' : 'text'} 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={step === 'processing' || step === 'done'}
                placeholder={step === 'email' ? "Enter your email..." : step === 'done' ? "Transmission complete." : "Enter inquiry..."} 
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-600 disabled:opacity-50"
              />
              <button 
                onClick={handleSend} 
                disabled={step === 'processing' || step === 'done'}
                className="text-emerald-500 hover:text-emerald-400 transition-colors p-2 disabled:opacity-50"
              >
                {step === 'email' ? <Lock className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}