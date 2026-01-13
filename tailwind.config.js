/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ativa o modo noturno manual
  theme: {
    extend: {
      colors: {
        horizon: {
          dark: '#050a14',    // Fundo profundo (quase preto)
          blue: '#1e3a8a',    // Azul corporativo
          cyan: '#00d4ff',    // Neon Tech (Baixo Risco)
          purple: '#b026ff',  // Neon Horizonte (Alto Risco)
          gold: '#fbbf24',    // Dourado Squad 17 (Médio Risco)
        },
        background: '#f8fafc', // Fundo claro padrão
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}