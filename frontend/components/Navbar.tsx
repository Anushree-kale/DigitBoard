'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';

export function Navbar() {
  const [isHovering, setIsHovering] = useState(false);
  const [rotationValue, setRotationValue] = useState(12);

  // Animate the logo rotation on hover
  useEffect(() => {
    if (!isHovering) {
      setRotationValue(12);
      return;
    }

    const interval = setInterval(() => {
      setRotationValue(prev => (prev + 6) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <nav className="h-20 w-full px-8 flex items-center justify-between bg-white/30 border-b border-black/5 backdrop-blur-md z-50 opacity-0 animate-slide-down" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
      {/* Logo Section */}
      <div 
        className="flex items-center gap-4 cursor-pointer group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`w-10 h-10 bg-[#FF7A00] rounded-xl flex items-center justify-center text-white font-display text-2xl shadow-lg transition-all duration-100 ${
          isHovering ? 'scale-125 shadow-[#FF7A00]/60 -rotate-12' : 'shadow-[#FF7A00]/30'
        }`} style={{ transform: `rotate(${rotationValue}deg)` }}>
          7
        </div>
        <div className="flex flex-col group-hover:translate-x-1 transition-transform">
          <span className="text-xl font-bold tracking-tight text-[#3C2F2F] leading-none group-hover:text-[#FF7A00] transition-colors duration-300">DigitAI</span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF7A00] font-bold">Intelligent OCR</span>
        </div>
      </div>

      {/* Status Section */}
      <div className="hidden md:flex items-center gap-8">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm font-medium opacity-60 group/badge hover:opacity-100 transition-all cursor-default hover:translate-x-1">
          <div className="w-2 h-2 rounded-full bg-[#FF7A00]/40 group-hover/badge:bg-[#FF7A00] animate-pulse group-hover/badge:animate-pulse transition-all" />
          <span className="group-hover/badge:font-semibold transition-all">Handwritten Digit Recognition</span>
        </div>

        {/* TensorFlow Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-full text-[10px] font-mono text-[#FF7A00] uppercase tracking-widest hover:bg-[#FF7A00]/10 hover:border-[#FF7A00]/40 hover:shadow-lg hover:shadow-[#FF7A00]/20 hover:scale-105 active:scale-95 transition-all cursor-default group">
          <Zap className="w-3 h-3 group-hover:animate-bounce group-hover:fill-[#FF7A00]" />
          <span className="group-hover:font-bold transition-all">Powered by TensorFlow</span>
        </div>
      </div>
    </nav>
  );
}
