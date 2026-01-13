import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  color?: "default" | "brand" | "cyan" | "gold" | "purple";
  trend?: number;
}

export function KpiCard({ title, value, color = "default", trend }: KpiCardProps) {
  const colorClasses = {
    default: "text-slate-800 dark:text-white",
    brand: "text-horizon-blue dark:text-blue-400",
    cyan: "text-horizon-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]",
    gold: "text-horizon-gold",
    purple: "text-horizon-purple drop-shadow-[0_0_8px_rgba(176,38,255,0.5)]",
  };

  return (
    <div className="bg-white dark:bg-horizon-dark p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 hover:border-horizon-cyan/30 transition duration-300 group">
      <div className="flex justify-between items-start">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
            trend > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
          }`}>
            {trend > 0 ? <ArrowUpRight size={14} className="mr-1"/> : <ArrowDownRight size={14} className="mr-1"/>}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className={`text-3xl font-bold mt-3 ${colorClasses[color]} group-hover:scale-105 transition-transform origin-left`}>
        {value}
      </h3>
    </div>
  );
}