import { useForm } from 'react-hook-form';
import { ChurnPredictionRequest } from '../types';
import { Zap } from 'lucide-react';

interface Props {
  onSubmit: (data: ChurnPredictionRequest) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit } = useForm<ChurnPredictionRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800/50 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
      <h3 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
        <Zap className="text-blue-400" size={20} /> Dados Comportamentais
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Tempo de Contrato (Meses)</label>
          <input 
            type="number" 
            {...register("tempo_contrato_meses", { required: true, valueAsNumber: true })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="Ex: 12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Atrasos de Pagamento</label>
          <input 
            type="number" 
            {...register("atrasos_pagamento", { required: true, valueAsNumber: true })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="Ex: 0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Uso Mensal (Média)</label>
          <input 
            type="number" 
            step="0.1"
            {...register("uso_mensal", { required: true, valueAsNumber: true })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="Ex: 14.5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Plano Atual</label>
          <select 
            {...register("plano", { required: true })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
          >
            <option value="">Selecione...</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]"
      >
        {isLoading ? 'Calculando Probabilidades...' : 'Executar Modelo Preditivo'}
      </button>
    </form>
  );
}