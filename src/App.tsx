import { useState, useEffect } from 'react';
import { api } from './services/api';
import { DashboardData, SelectedClient } from './types/dashboard';

// Importação dos Componentes
import { Sidebar } from './components/Sidebar';
import { KpiCard } from './components/KpiCard';
import { ChartSection } from './components/ChartSection';
import { ScoreGauge } from './components/ScoreGauge';
import { ClientSearch } from './components/ClientSearch';
import { ThemeToggle } from './components/ThemeToggle';
import { AiAssistant } from './components/AiAssistant';

function App() {
  // Estado para dados globais (vindos do Java)
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para cliente simulado (Front-only)
  const [simulatedClient, setSimulatedClient] = useState<SelectedClient | null>(null);

  // Busca dados do Backend ao carregar
  useEffect(() => {
    api.get('/dashboard/summary')
      .then(res => {
        setData({
          churnScore: res.data.churnRate || 4.2,
          totalCustomers: res.data.totalCustomers || 1240,
          accuracy: res.data.accuracy || 94.2,
          riskDistribution: res.data.riskDistribution || [30, 45, 25]
        });
      })
      .catch(() => {
        // Fallback se API estiver offline (para não quebrar a demo)
        setData({ churnScore: 4.8, totalCustomers: 1240, accuracy: 94.2, riskDistribution: [30, 45, 25] });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-screen bg-background dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-300">
      
      <Sidebar />

      <main className="flex-1 flex flex-col w-full overflow-y-auto p-4 md:p-8 relative">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Visão Geral <span className="text-horizon-cyan animate-pulse">.AI</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Monitoramento preditivo Squad 17</p>
          </div>
          <ThemeToggle />
        </header>

        {/* Linha 1: KPIs Globais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Churn Score Global" value={loading ? "..." : data?.churnScore + "%"} color="purple" trend={+1.2} />
          <KpiCard title="Clientes Monitorados" value={loading ? "..." : data?.totalCustomers || 0} color="brand" />
          <KpiCard title="Precisão do Modelo" value={loading ? "..." : data?.accuracy + "%"} color="cyan" />
        </div>

        {/* Linha 2: Gráficos e Simulação */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          
          {/* Gráfico de Distribuição */}
          <div className="bg-white dark:bg-horizon-dark p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <h3 className="font-semibold mb-6 text-slate-700 dark:text-white w-full">Distribuição da Base</h3>
            <ChartSection data={data?.riskDistribution || [0,0,0]} />
          </div>

          {/* Área Interativa */}
          <div className="lg:col-span-2 space-y-6">
            <ClientSearch onSelect={setSimulatedClient} />

            {/* Resultado da Simulação */}
            {simulatedClient ? (
              <div className="bg-white dark:bg-horizon-dark p-6 rounded-xl shadow-xl border-l-4 border-horizon-cyan animate-fade-in flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img src={simulatedClient.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-horizon-purple shadow-lg bg-slate-100" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Perfil Analisado</p>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{simulatedClient.name}</h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500 mt-2 inline-block">ID: #{simulatedClient.id}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center">
                  <ScoreGauge score={simulatedClient.riskScore} />
                </div>
              </div>
            ) : (
              <div className="h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
                <p>Busque um cliente acima para testar a IA</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
}

export default App;