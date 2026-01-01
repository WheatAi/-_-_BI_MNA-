
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Scale, 
  PieChart, 
  BrainCircuit, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line, 
  ComposedChart,
  ReferenceLine,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

// Components
import DashboardHeader from './components/DashboardHeader';
import RiskGauge from './components/RiskGauge';
import AnthroMonitor from './components/AnthroMonitor';
import TrendChart from './components/TrendChart';
import RadarSection from './components/RadarSection';
import HealthMatrix from './components/HealthMatrix';

const App: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Mock data matching the image
  const trendData = [
    { date: '2023年7月', score: 20, weight: 55 },
    { date: '2023年8月', score: 20, weight: 55 },
    { date: '2023年9月', score: 17, weight: 52 },
    { date: '2023年10月', score: 15, weight: 52 },
  ];

  const radarData = [
    { subject: '蛋白質攝取', value: 80, fullMark: 100 },
    { subject: '蔬果攝取', value: 45, fullMark: 100 },
    { subject: '液體攝取', value: 30, fullMark: 100 },
    { subject: '進食能力', value: 95, fullMark: 100 },
    { subject: '餐數', value: 70, fullMark: 100 },
  ];

  const anthroData = [
    { label: 'BMI (身體質量指數)', value: 18.5, min: 15, max: 25, thresholds: [19, 21, 23], unit: '' },
    { label: 'MAC (臂中圍)', value: 20.5, min: 18, max: 24, thresholds: [20, 21], unit: 'cm' },
    { label: 'CC (小腿圍)', value: 29.5, min: 25, max: 35, thresholds: [29, 31], unit: 'cm' },
  ];

  const generateAIInsight = async () => {
    setLoadingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `身為一位高齡營養師，請分析以下個案數據並提供臨床介入建議：
        - MNA 總分：15 (營養不良)
        - BMI：18.5 (偏低)
        - 小腿圍：29cm (肌肉流失風險高)
        - 趨勢：近三個月體重下降 3kg，MNA 分數持續下滑。
        - 飲食缺口：液體與蔬果攝取嚴重不足。
        請用繁體中文簡短回覆 3 點具體行動。`,
      });
      setInsight(response.text || '無法生成分析建議。');
    } catch (error) {
      setInsight('請檢查 API 金鑰設定。建議行動：1. 強力介入營養補充 2. 轉介牙科/復健 3. 增加流體攝取。');
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <DashboardHeader 
        title="將數據轉化為行動：高齡營養照護 BI 健康儀表板"
        subtitle="專為營養師設計的商業智慧儀表板，將「迷你營養評估 (MNA)」篩檢數據視覺化，幫助快速判斷個案風險、追蹤趨勢、找出問題根源，並採取精準的臨床行動。"
      />

      <main className="max-w-[1400px] mx-auto px-4 mt-6">
        {/* Top Section: Gauge & Anthropometric */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">核心風險狀態儀表 (MNA 總分)</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <RiskGauge score={15} />
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-500 mb-1">輔助關鍵指標</p>
                <div className="flex gap-4 justify-center">
                  <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded border border-orange-100">BMI: <span className="font-bold">18.5</span> (警示色)</span>
                  <span className="text-xs px-2 py-1 bg-slate-50 text-slate-700 rounded border border-slate-100">最近體重: <span className="font-bold">52 kg</span></span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic">篩檢日期：2023/10/27</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">身體組成與人體測量監測</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">針對高齡者特別關注肌肉量流失問題，將關鍵的人體測量指標並列監控。</p>
            <div className="space-y-8">
              {anthroData.map((data, idx) => (
                <AnthroMonitor key={idx} {...data} />
              ))}
            </div>
            <p className="text-[11px] text-red-500 mt-6 font-medium italic">＊低於標準將自動啟動警示系統，提醒臨床介入。</p>
          </div>
        </div>

        {/* Bottom Section: Trends, Radar, Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">營養歷程趨勢圖</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">監測連續變化，而非單點狀態。MNA 分數與體重變化一圖掌握。</p>
            <div className="h-[280px]">
              <TrendChart data={trendData} />
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              MNA 分數跌破風險參考線 (17分) 時，即代表風險等級發生改變。
              此圖表能直觀驗證「近三個月體重變化」的長期趨勢。
            </p>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">飲食攝取缺口雷達圖</h2>
            </div>
            <p className="text-sm text-slate-500 mb-2">分析營養不良的根本「原因」，多維度評估飲食型態。</p>
            <div className="flex-1 h-[250px]">
              <RadarSection data={radarData} />
            </div>
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mt-4">
              <p className="text-xs text-blue-800">
                <span className="font-bold">分析提示：</span> 若某個面向明顯凹陷（如液體攝取），則表示該項目是主要的衛教與干預重點。
              </p>
            </div>
          </div>

          {/* Subjective Matrix */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">自覺健康與神經心理矩陣</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">揭示影響進食意願的潛在因子。結合高齡者的主觀感受與精神狀況。</p>
            <HealthMatrix />
            <div className="mt-8">
               <button 
                onClick={generateAIInsight}
                disabled={loadingInsight}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md font-medium text-sm disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {loadingInsight ? '正在分析數據...' : '生成臨床 AI 洞察建議'}
              </button>
              {insight && (
                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900 animate-in fade-in slide-in-from-top-2 duration-300 whitespace-pre-wrap leading-relaxed">
                  <div className="flex items-center gap-1 font-bold mb-1 text-indigo-700">
                    <Info className="w-3 h-3" />
                    AI 臨床分析報告
                  </div>
                  {insight}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="max-w-[1400px] mx-auto px-4 mt-8 flex justify-between items-center text-[10px] text-slate-400">
        <p>© 2024 高齡營養照護系統 v2.5 - 專業版數據引擎</p>
        <p>資料遵循：迷你營養評估 (MNA®) 臨床指引</p>
      </footer>
    </div>
  );
};

export default App;
