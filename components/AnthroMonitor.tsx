
import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  thresholds: number[];
  unit: string;
}

const AnthroMonitor: React.FC<Props> = ({ label, value, min, max, thresholds, unit }) => {
  // Calculate percentage for positioning
  const getPercent = (val: number) => {
    const p = ((val - min) / (max - min)) * 100;
    return Math.min(Math.max(p, 0), 100);
  };

  const currentPos = getPercent(value);
  const isDanger = value < (thresholds[0] || 0);

  return (
    <div className="relative mb-4">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-slate-700">{label}</span>
          <Info className="w-3 h-3 text-slate-300 cursor-help" />
        </div>
        <div className={`text-xl font-black ${isDanger ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
          {value}<span className="text-xs ml-0.5 font-normal text-slate-400">{unit}</span>
        </div>
      </div>
      
      {/* Track */}
      <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-visible flex items-center">
        {/* Background gradient zones */}
        <div className="absolute inset-0 rounded-full flex overflow-hidden">
           <div className="h-full bg-red-100/50" style={{ width: '25%' }}></div>
           <div className="h-full bg-orange-100/50" style={{ width: '35%' }}></div>
           <div className="h-full bg-green-100/50" style={{ width: '40%' }}></div>
        </div>

        {/* Threshold marks */}
        {thresholds.map((t, i) => (
          <div 
            key={i} 
            className="absolute h-4 w-0.5 bg-slate-300 z-10" 
            style={{ left: `${getPercent(t)}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">{t}</span>
          </div>
        ))}

        {/* Current indicator */}
        <div 
          className="absolute h-6 w-1 z-20 flex items-center justify-center transition-all duration-700 ease-out"
          style={{ left: `${currentPos}%` }}
        >
          <div className="absolute -top-3 w-3 h-3 bg-slate-800 rotate-45 transform"></div>
          <div className="h-full w-full bg-slate-800 shadow-md"></div>
        </div>
      </div>
      
      {/* Value marker at bottom */}
      <div 
        className="absolute -bottom-5 text-[10px] font-black text-slate-800"
        style={{ left: `${currentPos}%`, transform: 'translateX(-50%)' }}
      >
        {value}
      </div>
    </div>
  );
};

export default AnthroMonitor;
