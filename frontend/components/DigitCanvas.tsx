'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { config } from '@/lib/config';
import { Loader2, Trash2, Zap } from 'lucide-react';

interface DigitCanvasProps {
  onPrediction: (digit: number, confidence: number, probs: number[]) => void;
  onClear: () => void;
  isCapturing?: boolean;
}

export function DigitCanvas({ onPrediction, onClear, isCapturing }: DigitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 280;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle grid
    ctx.strokeStyle = '#F5EDE0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 280; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 280);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(280, i);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const getCoordinates = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX: number, clientY: number;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e.nativeEvent as any);
    if (!coords) return;
    setIsDrawing(true);
    setLastPoint(coords);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPoint) return;
    const coords = getCoordinates(e.nativeEvent as any);
    if (!coords) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#3C2F2F'; // Dark brown ink
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setLastPoint(coords);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not found');
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject()), 'image/png');
      });
      const formData = new FormData();
      formData.append('image', blob, 'digit.png');
      const response = await fetch(`${config.apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error ${response.status}`);
      const result = await response.json();
      const mockProbs = result.probabilities || new Array(10).fill(0).map((_, i) =>
        i === result.prediction ? result.confidence : (1 - result.confidence) / 9
      );
      onPrediction(result.prediction ?? -1, result.confidence ?? 0, mockProbs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInternal = () => {
    initCanvas();
    onClear();
  };

  return (
    <div className="flex flex-col items-center gap-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
      {/* Canvas Container */}
      <div className={`relative p-2 bg-white rounded-2xl transition-all duration-500 shadow-2xl overflow-hidden ${
        isLoading 
          ? 'ring-2 ring-[#FF7A00] ring-offset-2 ring-offset-[#F5EDE0] scale-[0.98]' 
          : isDrawing 
          ? 'scale-[1.02] shadow-orange-400/40' 
          : 'shadow-orange-400/20'
      }`}>
        {/* Loading shimmer overlay */}
        {isLoading && (
          <div className="absolute inset-0 animate-shimmer rounded-xl pointer-events-none z-10" style={{ animationDuration: '1.5s' }} />
        )}
        
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none rounded-xl block transition-opacity"
          style={{ 
            width: '280px', 
            height: '280px',
            opacity: isLoading ? 0.6 : 1
          }}
        />
      </div>

      {/* Button Controls */}
      <div className="flex gap-6 w-full max-w-[320px]">
        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={isLoading || isCapturing}
          className="flex-1 h-16 bg-[#FF7A00] text-black rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-[#FF7A00]/50 shadow-lg shadow-[#FF7A00]/30 relative overflow-hidden group"
        >
          {/* Button glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent transition-opacity ${isLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          
          {/* Content */}
          <div className="relative flex items-center justify-center gap-3 transition-all">
            {isLoading ? (
              <>
                <div className="relative w-5 h-5">
                  <Loader2 className="w-5 h-5 animate-spin text-black absolute inset-0" />
                  <div className="absolute inset-0 animate-pulse-soft" />
                </div>
                <span className="animate-pulse-soft">Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black text-black group-hover:animate-float" />
                <span>Predict</span>
              </>
            )}
          </div>
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClearInternal}
          disabled={isLoading || isCapturing}
          className="w-16 h-16 bg-white/40 text-[#FF7A00] rounded-2xl hover:bg-white/60 active:scale-95 transition-all flex items-center justify-center group hover:shadow-md shadow-sm border border-black/5 relative disabled:opacity-50"
          title="Clear Canvas"
        >
          <Trash2 className="w-5 h-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
        </button>
      </div>

      {/* Loading state feedback text */}
      {isLoading && (
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF7A00] opacity-60 animate-pulse-soft">
          Analyzing your digit...
        </div>
      )}
    </div>
  );
}
