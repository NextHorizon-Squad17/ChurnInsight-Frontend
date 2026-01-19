import React, { useEffect, useState } from 'react';

interface Props {
  retentionStrategy?: string | null;
}

const AiAssistant: React.FC<Props> = ({ retentionStrategy }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (retentionStrategy) {
      setLoading(false);
    }
  }, [retentionStrategy]);

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 h-full overflow-y-auto max-h-[80vh]">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <div className="p-2 bg-purple-600/20 rounded-lg">
          <svg
            className="w-6 h-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">Simulador de Retenção</h2>
          <p className="text-xs text-slate-400">Powered by Squad17 AI</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="space-y-4 text-sm text-slate-300">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse">
            <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
            <span>Gerando plano de retenção...</span>
          </div>
        ) : retentionStrategy ? (
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-purple-400 font-semibold mb-2">
              Plano de Retenção Recomendado
            </h3>
            <p className="leading-relaxed">
              {retentionStrategy}
            </p>
          </div>
        ) : (
          <p className="text-slate-500 italic">
            Nenhum plano de retenção disponível.
          </p>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
