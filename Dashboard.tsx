import { useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { PredictionForm } from '../components/PredictionForm';
import { ResultCard } from '../components/ResultCard';
import { predictionService } from '../service/api';
import { ChurnPredictionRequest, ChurnPredictionResponse } from '../types';

export function Dashboard() {
  const [result, setResult] = useState<ChurnPredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: ChurnPredictionRequest) => {
    setLoading(true);
    try {
      const response = await predictionService.predict(data);
      setResult(response);
    } catch (error) {
      alert("Erro ao conectar com a IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Painel de Retenção</h1>
        <p className="text-gray-400 mt-2">Analise o risco de evasão de clientes em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <PredictionForm onSubmit={handlePredict} isLoading={loading} />
        </div>
        <div className="lg:col-span-1 sticky top-8">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center text-gray-500">
              Preencha os dados para ver a projeção holográfica.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}