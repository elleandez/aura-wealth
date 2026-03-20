import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- GLOBAL COMPONENTS ---
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import LiveActivityBubble from "@/components/LiveActivityBubble"; 

const inter = Inter({ subsets: ["latin"] });

// --- GLOBAL METADATA (LOCKED IN LOGO CONVENTIONS) ---
export const metadata: Metadata = {
  // Replace with your live Vercel URL once deployed
  metadataBase: new URL("https://aura-wealth.vercel.app"), 
  
  title: {
    default: "AURA | Elite Wealth & Debt Management",
    template: "%s | AURA",
  },
  description: "Advanced Wealth Management, Loan Structuring, and Debt Relief services for discerning clients.",
  
  // Icon and Open Graph configuration is handled automatically by Next.js
  // by placing files in the /src/app/ folder.
  openGraph: {
    title: "AURA | Elite Wealth & Debt Management",
    description: "Eradicate Debt. Structure Capital. Command your Financial Data.",
    url: "https://aura-wealth.vercel.app",
    siteName: "AURA Protocol",
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "AURA | Elite Wealth & Debt Management",
    description: "Eradicate Debt. Structure Capital. Command your Financial Data.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0B132B] text-slate-50 antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen`}>
        
        <Navbar />

        <main className="flex-grow pt-24 overflow-x-hidden relative">
          {children}
        </main>

        {/* --- GLOBAL FLOATING WIDGETS --- */}
        <LiveActivityBubble /> 
        <ChatWidget />

        <footer className="border-t border-white/5 py-16 text-center text-sm text-gray-500 bg-[#050813]">
            <h2 className="text-2xl font-light text-white mb-6">AURA<span className="text-emerald-500">.</span></h2>
            <p>AURA Wealth Management | North Carolina HQ</p>
            <p className="mt-2">Direct Inquiries: AURA.4.LIF34U@gmail.com | +234 814 446 2467</p>
            <div className="mt-8 pt-8 border-t border-white/5 max-w-4xl mx-auto text-xs text-gray-600 px-6">
              AURA Wealth Management is a registered financial entity. All loans and investment products are subject to credit approval. 
            </div>
        </footer>
      </body>
    </html>
  );
}