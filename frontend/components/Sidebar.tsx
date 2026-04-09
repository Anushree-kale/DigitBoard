'use client';

import React, { useState } from 'react';
import { MousePointer2, Image as ImageIcon, Sparkles, Wand2, Copy } from 'lucide-react';

const examples = [0, 1, 2, 3, 4, 5];

interface SidebarProps {
  onExampleHover?: (digit: number | null) => void;
}

export function Sidebar({ onExampleHover }: SidebarProps) {
  const [hoveredExample, setHoveredExample] = useState<number | null>(null);
  const [copiedDigit, setCopiedDigit] = useState<number | null>(null);

  const handleExampleHover = (digit: number) => {
    setHoveredExample(digit);
    onExampleHover?.(digit);
  };

  const handleExampleLeave = () => {
    setHoveredExample(null);
    onExampleHover?.(null);
  };

  const handleCopyDigit = (digit: number) => {
    setCopiedDigit(digit);
    setTimeout(() => setCopiedDigit(null), 2000);
  };

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-10 p-4 opacity-0 animate-slide-left" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
      {/* Instructions Section */}
      <div className="space-y-6 opacity-0 animate-slide-left" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF7A00] font-bold px-2 animate-slide-down" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>Instructions</h3>
        <div className="flex flex-col gap-4">
          <div className="animate-scale-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <InstructionCard icon={<MousePointer2 className="w-4 h-4" />} title="Draw a digit 0–9" />
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>
            <InstructionCard icon={<Wand2 className="w-4 h-4" />} title="Click Predict" />
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <InstructionCard icon={<ImageIcon className="w-4 h-4" />} title="See examples" />
          </div>
        </div>
      </div>

      {/* Example Gallery Section */}
      <div className="space-y-6 opacity-0 animate-slide-left" style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}>
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF7A00] font-bold">Example Gallery</h3>
          <span className="text-[10px] opacity-40 font-mono tracking-widest uppercase">0–9 Dataset</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {examples.map((digit) => (
            <div 
              key={digit} 
              className={`group relative h-28 bg-white rounded-3xl border-2 transition-all cursor-pointer overflow-hidden flex items-center justify-center shadow-sm active:scale-95 stagger-child animate-scale-in ${
                hoveredExample === digit 
                  ? 'border-[#FF7A00]/60 shadow-xl shadow-[#FF7A00]/20 scale-105' 
                  : 'border-black/5 hover:border-[#FF7A00]/40 hover:shadow-lg hover:shadow-[#FF7A00]/10'
              }`}
              style={{ animationDelay: `${0.8 + digit * 0.08}s`, animationFillMode: 'forwards' }}
              onMouseEnter={() => handleExampleHover(digit)}
              onMouseLeave={handleExampleLeave}
              onTouchStart={() => handleExampleHover(digit)}
              onTouchEnd={handleExampleLeave}
              onClick={() => handleCopyDigit(digit)}
            >
              <div className={`absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/5 to-transparent transition-opacity duration-300 ${hoveredExample === digit ? 'opacity-100' : 'opacity-0'}`} />
              
              <span className={`text-5xl font-display transition-all duration-300 drop-shadow-sm ${
                hoveredExample === digit
                  ? 'text-[#FF7A00] scale-125' 
                  : 'text-[#3C2F2F]/20 group-hover:text-[#FF7A00] group-hover:scale-110'
              }`}>
                {digit}
              </span>
              
              <div className={`absolute bottom-2 right-2 transition-all duration-300 ${
                hoveredExample === digit || copiedDigit === digit
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}>
                <div className="bg-[#FF7A00]/10 text-[#FF7A00] text-[9px] font-mono px-2 py-1 rounded-lg uppercase tracking-widest font-bold backdrop-blur-sm border border-[#FF7A00]/20 flex items-center gap-1">
                  {copiedDigit === digit ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Accuracy Card */}
      <div className="mt-auto bg-white/30 border border-black/5 p-6 rounded-[2rem] space-y-4 shadow-sm relative overflow-hidden group hover:bg-white/50 hover:border-[#FF7A00]/20 hover:shadow-lg transition-all cursor-default opacity-0 animate-scale-in" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF7A00]/10 transition-colors duration-300" />
        <div className="flex items-center gap-3 text-[#FF7A00] relative z-10 group-hover:translate-x-1 transition-transform">
          <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Model Accuracy</span>
        </div>
        <div className="text-3xl font-display text-[#3C2F2F] relative z-10">
            99.12<span className="text-lg text-[#FF7A00]">%</span> 
            <div className="text-[10px] opacity-40 font-mono uppercase tracking-widest mt-1">on test set</div>
        </div>
      </div>
    </aside>
  );
}

function InstructionCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-5 p-4 rounded-3xl bg-white/30 border border-black/5 hover:bg-white/50 hover:border-[#FF7A00]/20 hover:shadow-md hover:shadow-[#FF7A00]/10 transition-all cursor-default group hover:translate-x-1">
      <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#FF7A00] group-hover:scale-125 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-[#FF7A00]/20 transition-all shadow-sm">
        {icon}
      </div>
      <span className="text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:font-semibold transition-all tracking-wide">{title}</span>
    </div>
  );
}

function Check({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
