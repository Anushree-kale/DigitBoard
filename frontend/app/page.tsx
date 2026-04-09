'use client';

import React, { useState } from 'react';
import { DigitCanvas } from '@/components/DigitCanvas';

interface PredictionHistory {
  digit: number;
  confidence: number;
  timestamp: Date;
}

export default function Home() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [allProbs, setAllProbs] = useState<number[]>(new Array(10).fill(0));
  const [history, setHistory] = useState<PredictionHistory[]>([]);

  const handlePrediction = (digit: number, conf: number, probs: number[]) => {
    setPrediction(digit);
    setConfidence(conf);
    setAllProbs(probs);
    setHistory(prev => [{ digit, confidence: conf, timestamp: new Date() }, ...prev.slice(0, 4)]);
  };

  const handleClear = () => {
    setPrediction(null);
    setConfidence(0);
    setAllProbs(new Array(10).fill(0));
  };

  return (
    <main className="min-h-screen bg-[#F5EDE0] text-[#3C2F2F] flex flex-col gap-12 p-8 lg:p-24">
      
      {/* Header */}
      <div className="flex-1 flex flex-col max-w-2xl opacity-0 animate-slide-down">
        <h1 className="text-6xl lg:text-8xl font-display font-bold leading-none mb-6">
          <span className="inline-block">Digit</span><span className="inline-block text-[#FF7A00]">AI</span>
        </h1>
        <p className="text-xl lg:text-2xl font-serif opacity-80 leading-relaxed">
          Handwritten digit recognition. Draw a number from 0 to 9 in the canvas.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        
        {/* Canvas and Controls */}
        <div className="lg:col-span-2">
          <DigitCanvas onPrediction={handlePrediction} onClear={handleClear} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Prediction Display */}
          {prediction !== null ? (
            <div className="space-y-6 animate-slide-right opacity-0">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold opacity-50 block mb-4 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                  Neural Prediction
                </span>
                <div className="text-7xl font-display leading-[0.8] text-[#FF7A00] animate-number-flip" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  {prediction}
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="stagger-child animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold opacity-50">
                    Confidence
                  </span>
                  <span className="text-sm font-display text-[#FF7A00] font-bold">
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden border border-black/5 shadow-sm">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9D3D] transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Probability Distribution */}
              <div className="stagger-child animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold opacity-50 block mb-3">
                  All Probabilities
                </span>
                <div className="space-y-2">
                  {allProbs.map((prob, digit) => (
                    <div key={digit} className="flex items-center gap-3 group stagger-child animate-scale-in hover:translate-x-1 transition-transform" style={{ animationDelay: `${0.5 + digit * 0.05}s`, animationFillMode: 'forwards' }}>
                      <span className="w-6 text-sm font-display font-bold opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        {digit}
                      </span>
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-black/5 shadow-sm">
                        <div 
                          className={`h-full transition-all duration-700 rounded-full ${
                            digit === prediction 
                              ? 'bg-[#FF7A00] shadow-lg shadow-orange-400/30' 
                              : 'bg-gray-300'
                          }`}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                      <span className="text-xs opacity-50 min-w-[2.5rem] text-right group-hover:font-bold transition-all">
                        {(prob * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold opacity-50 block">
                Neural Prediction
              </span>
              <div className="text-7xl font-display leading-[0.8] opacity-5 animate-pulse-soft">
                —
              </div>
            </div>
          )}

          {/* Recent History */}
          {history.length > 0 && (
            <div className="pt-8 border-t border-black/5 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold opacity-50 block mb-4">
                Recent Predictions
              </span>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 rounded-xl bg-white/40 hover:bg-white/70 hover:shadow-md transition-all cursor-default group stagger-child animate-scale-in"
                    style={{ animationDelay: `${0.6 + idx * 0.08}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-display text-[#FF7A00] group-hover:scale-125 group-hover:-rotate-12 transition-transform">
                        {item.digit}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs opacity-60 font-mono group-hover:opacity-80 transition-opacity">
                          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-bold opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {(item.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
