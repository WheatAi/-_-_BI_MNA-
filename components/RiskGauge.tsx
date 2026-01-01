
import React from 'react';

interface Props {
  score: number;
}

const RiskGauge: React.FC<Props> = ({ score }) => {
  // Constants for arc
  const radius = 90;
  const strokeWidth = 18;
  const innerRadius = radius - strokeWidth;
  const centerX = 150;
  const centerY = 130;
  
  // Calculate needle rotation based on 0-30 scale
  // 0 is -180deg, 30 is 0deg
  const rotation = -180 + (score / 30) * 180;

  return (
    <div className="relative w-[300px] h-[180px]">
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Red Zone (0-17) */}
        <path 
          d="M 60 130 A 90 90 0 0 1 150 40 L 150 58 A 72 72 0 0 0 78 130 Z" 
          fill="#d32f2f" 
          stroke="none"
          opacity="0.85"
        />
        {/* Yellow Zone (17.5-23) */}
        <path 
          d="M 150 40 A 90 90 0 0 1 220 70 L 206 82 A 72 72 0 0 0 150 58 Z" 
          fill="#ffa000" 
          stroke="none"
          opacity="0.85"
        />
        {/* Green Zone (>=23.5) */}
        <path 
          d="M 220 70 A 90 90 0 0 1 240 130 L 222 130 A 72 72 0 0 0 206 82 Z" 
          fill="#388e3c" 
          stroke="none"
          opacity="0.85"
        />

        {/* Labels */}
        <text x="35" y="110" className="text-[10px] font-bold fill-red-700">紅燈 (0-17 分)：</text>
        <text x="35" y="122" className="text-[10px] fill-red-700">營養不良</text>
        
        <text x="170" y="25" className="text-[10px] font-bold fill-orange-700">黃燈 (17.5-23 分)：</text>
        <text x="170" y="37" className="text-[10px] fill-orange-700">有營養不良危險</text>

        <text x="235" y="90" className="text-[10px] font-bold fill-green-700">綠燈 (≧23.5 分)：</text>
        <text x="235" y="102" className="text-[10px] fill-green-700">營養狀況良好</text>

        {/* Reference marks */}
        <text x="145" y="75" className="text-xs font-bold fill-slate-700">15</text>

        {/* Needle */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          <g transform={`rotate(${rotation})`}>
            <path d="M -80 0 L 0 -5 L 0 5 Z" fill="#2c3e50" />
            <circle cx="0" cy="0" r="10" fill="#2c3e50" stroke="white" strokeWidth="2" />
          </g>
        </g>
      </svg>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <h3 className="text-xl font-black text-slate-800 tracking-wider">MNA 總分：{score}</h3>
      </div>
    </div>
  );
};

export default RiskGauge;
