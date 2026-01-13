import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useState } from 'react';

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Olá! Sou a IA do Next Horizon. Como posso ajudar a reduzir o Churn hoje?' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Entendi. Analisando "${input}" no banco de dados do Squad 17... Parece que a tendência é de estabilidade.` 
      }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-horizon-blue to-horizon-purple text-white p-4 rounded-full shadow-lg shadow-horizon-purple/50 hover:scale-110 transition animate-bounce">
          <MessageSquare size={28} />
        </button>
      ) : (
        <div className="bg-white dark:bg-horizon-dark border border-slate-200 dark:border-horizon-purple/50 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-horizon-blue to-horizon-purple p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2"><Bot size={20}/><span className="font-bold">Next AI</span></div>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-900/80">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.role === 'ai' ? 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm self-start' : 'bg-horizon-blue text-white self-end ml-auto'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t dark:border-slate-700 flex gap-2 bg-white dark:bg-horizon-dark">
            <input className="flex-1 bg-transparent dark:text-white text-sm focus:outline-none" placeholder="Digite..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="text-horizon-cyan hover:text-horizon-purple"><Send size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
}