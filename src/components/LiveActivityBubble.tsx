"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle } from "lucide-react";

const activityFeed = [
  { name: "Michael T.", action: "eradicated $24,500 in bad debt", time: "2 min ago", type: "red" },
  { name: "Sarah L.", action: "reached a 750 Credit Architecture Score", time: "5 min ago", type: "emerald" },
  { name: "David K.", action: "forced a hard inquiry deletion", time: "12 min ago", type: "emerald" },
  { name: "Jessica M.", action: "settled a $9,200 collection", time: "Just now", type: "red" },
  { name: "Marcus W.", action: "secured a $50k primary tradeline", time: "18 min ago", type: "emerald" },
  { name: "James R.", action: "synchronized AURA Identity", time: "Just now", type: "blue" },
];

export default function LiveActivityBubble() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const triggerNotification = () => {
      setIsVisible(true);
      
      // Hide the bubble after 4.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4500);
      
      // Wait a bit, then queue up the next message
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activityFeed.length);
      }, 5000); 
    };

    // Initial delay before the first popup fires (3 seconds after page load)
    const initialTimer = setTimeout(triggerNotification, 3000);
    
    // Fire a new popup every 15 seconds
    const interval = setInterval(triggerNotification, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const currentActivity = activityFeed[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[9999] flex items-center gap-4 bg-[#0A1024]/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-sm pointer-events-none"
        >
          <div className={`p-2 rounded-full ${
            currentActivity.type === 'red' ? 'bg-red-500/10 text-red-500' : 
            currentActivity.type === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
            'bg-emerald-500/10 text-emerald-500'
          }`}>
            {currentActivity.type === 'red' ? <ShieldAlert size={20} /> : <CheckCircle size={20} />}
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {currentActivity.name} <span className="text-gray-400 font-light">{currentActivity.action}</span>
            </p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              {currentActivity.time}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}