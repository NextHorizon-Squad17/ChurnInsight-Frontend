import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ScoreGauge({ score }: { score: number }) {
  const data = {
    labels: ['Risco', 'Seguro'],
    datasets: [{
      data: [score, 100 - score],
      backgroundColor: [
        score > 70 ? '#b026ff' : score > 40 ? '#fbbf24' : '#00d4ff', 
        '#334155' // Cor escura para a parte "vazia"
      ],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
    }]
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-48 h-24 overflow-hidden relative">
        <Doughnut data={data} options={{ cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
      </div>
      <div className="absolute top-16 flex flex-col items-center">
        <span className="text-4xl font-bold dark:text-white text-slate-800">{score}%</span>
      </div>
      <p className={`mt-4 font-bold tracking-widest ${
        score > 70 ? "text-horizon-purple animate-pulse" : 
        score > 40 ? "text-horizon-gold" : 
        "text-horizon-cyan"
      }`}>
        {score > 70 ? "ALTO RISCO" : score > 40 ? "ATENÇÃO" : "BAIXO RISCO"}
      </p>
    </div>
  );
}