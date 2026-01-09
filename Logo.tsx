import { Orbit, Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export function NextHorizonLogo({ variant = 'full', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 32, text: 'text-2xl', gap: 'gap-3' },
    lg: { icon: 48, text: 'text-4xl', gap: 'gap-4' },
  };
  const current = sizes[size];

  return (
    <div className={`flex items-center ${current.gap} select-none`}>
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
        <Orbit size={current.icon} className="text-white relative z-10 animate-[spin_10s_linear_infinite]" />
        <Sparkles size={current.icon / 2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200" />
      </div>
      {variant === 'full' && (
        <h1 className={`${current.text} font-bold tracking-tight text-white`}>
          NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">HORIZON</span>
        </h1>
      )}
    </div>
  );
}