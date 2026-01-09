import { ChurnPredictionResponse } from '../types';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  result: ChurnPredictionResponse;
}

export function ResultCard({ result }: Props) {
  const isHighRisk = result.previsao.toLowerCase().includes('cancel') || result.probabilidade > 0.5;
  const percentage = (result.probabilidade * 100).toFixed(1);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur-xl p-6 shadow-2xl transition-all duration-500 hover:border-white/20">
      
      {/* Efeitos de Luz de Fundo */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 ${isHighRisk ? 'bg-red-600' : 'bg-green-600'}`} />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 uppercase tracking-wider">
            <Activity size={14} /> Análise IA
          </div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isHighRisk ? 'bg-red-500' : 'bg-green-500'}`} />
        </div>

        <div>
          <span className="text-gray-400 text-sm font-light">Probabilidade de Churn</span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mt-2">
            {percentage}%
          </h1>
          
          <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div 
              className={`h-full relative shadow-[0_0_15px_rgba(255,255,255,0.3)] ${isHighRisk ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-emerald-400 to-green-600'}`}
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>

        <div className={`flex items-start gap-3 p-4 rounded-xl border ${isHighRisk ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
          {isHighRisk ? <AlertTriangle className="text-red-400" /> : <CheckCircle className="text-green-400" />}
          <div>
            <h3 className={`font-bold text-sm ${isHighRisk ? 'text-red-200' : 'text-green-200'}`}>
              {result.previsao}
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              {isHighRisk ? 'Ação imediata recomendada.' : 'Cliente estável.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}