import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { churnService } from '../service/api';
import { PredictionRequest, PredictionResponse } from '../types/dashboard';

const AiAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Estado inicial padrão (Perfil de Risco Alto para teste)
  const [formData, setFormData] = useState<PredictionRequest>({
    Gender: "Female",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    TenureMonths: 1,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 70.0,
    TotalCharges: 70.0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'MonthlyCharges' || name === 'TotalCharges' || name === 'TenureMonths' || name === 'SeniorCitizen') 
        ? Number(value) 
        : value
    }));
  };

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await churnService.predictChurn(formData);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com a IA. Verifique se o Backend Java está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 h-full overflow-y-auto max-h-[80vh]">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <div className="p-2 bg-purple-600/20 rounded-lg">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
            <h2 className="text-xl font-bold text-white">Simulador de Retenção</h2>
            <p className="text-xs text-slate-400">Powered by Squad17 AI</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Formulário */}
        <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="col-span-2">
                <label className="text-slate-400 text-xs font-bold">Tipo de Contrato</label>
                <select name="Contract" value={formData.Contract} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700 focus:border-purple-500 outline-none">
                    <option value="Month-to-month">Mensal (Risco Alto)</option>
                    <option value="One year">Anual</option>
                    <option value="Two year">Bienal (Fidelizado)</option>
                </select>
            </div>
            <div>
                <label className="text-slate-400 text-xs">Meses de Cliente</label>
                <input type="number" name="TenureMonths" value={formData.TenureMonths} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700" />
            </div>
            <div>
                <label className="text-slate-400 text-xs">Mensalidade ($)</label>
                <input type="number" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700" />
            </div>
            <div>
                <label className="text-slate-400 text-xs">Internet</label>
                <select name="InternetService" value={formData.InternetService} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700">
                    <option value="Fiber optic">Fibra Óptica</option>
                    <option value="DSL">DSL</option>
                    <option value="No">Nenhuma</option>
                </select>
            </div>
            <div>
                <label className="text-slate-400 text-xs">Pagamento</label>
                <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700">
                    <option value="Electronic check">Electronic check</option>
                    <option value="Mailed check">Mailed check</option>
                    <option value="Bank transfer (automatic)">Bank transfer</option>
                    <option value="Credit card (automatic)">Credit card</option>
                </select>
            </div>
        </div>
        
        {/* Botão */}
        <button 
          onClick={handleSimulate}
          disabled={loading}
          className={`w-full py-3 mt-4 font-bold rounded-lg transition-all shadow-lg flex justify-center items-center gap-2 ${
            loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
          }`}
        >
          {loading ? 'Calculando...' : 'CALCULAR RISCO'}
        </button>

        {/* Erro */}
        {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-xs">{error}</div>}

        {/* Resultado */}
        {result && (
          <div className="mt-6 animate-fade-in border-t border-slate-700 pt-4">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-slate-400 text-xs uppercase font-bold">Probabilidade</p>
                    <p className={`text-4xl font-extrabold ${
                        result.risk_level === 'ALTO' ? 'text-red-500' : 
                        result.risk_level === 'MÉDIO' ? 'text-yellow-400' : 
                        'text-green-400'
                    }`}>
                        {(result.probability * 100).toFixed(1)}%
                    </p>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    result.risk_level === 'ALTO' ? 'bg-red-500 text-white' : 
                    result.risk_level === 'MÉDIO' ? 'bg-yellow-500 text-black' : 
                    'bg-green-500 text-white'
                }`}>
                    Risco {result.risk_level}
                </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h3 className="text-xs font-bold text-purple-400 mb-3 uppercase">Estratégia Recomendada:</h3>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-sm leading-relaxed">
                    <ReactMarkdown>{result.retention_strategy}</ReactMarkdown>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;