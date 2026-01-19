import { useState } from 'react';
import { SelectedClient } from '../types/dashboard';
import { ClientSearch } from '../components/ClientSearch';
import { ScoreGauge } from '../components/ScoreGauge';
import { ThemeToggle } from '../components/ThemeToggle';
import AiAssistant from '../components/AiAssistant';

export default function Dashboard() {
    const [simulatedClient, setSimulatedClient] = useState<SelectedClient | null>(null);

    return (
        <div>
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Visão Geral <span className="text-cyan-400">.AI</span></h2>
                    <p className="text-slate-400">Monitoramento Squad 17</p>
                </div>
                <ThemeToggle />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2">
                        <ClientSearch onSelect={setSimulatedClient} />
                        {simulatedClient && (
                            <div className="mt-6 p-6 bg-slate-800 rounded-xl border border-slate-700 flex justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">{simulatedClient.name}</h3>
                                    <p>Risco Calculado</p>
                                </div>
                                <ScoreGauge score={simulatedClient.riskScore} />
                            </div>
                        )}
                    </div>
                </div>
                <AiAssistant retentionStrategy={simulatedClient?.retentionStrategy}/>
            </div>
        </div>
    );
}