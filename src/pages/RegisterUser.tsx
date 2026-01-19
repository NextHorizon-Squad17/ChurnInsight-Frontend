import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { api } from '../service/api'; // Importando a instância configurada
import Logo from '../components/Logo'; // Ajuste o caminho se a pasta ainda for 'componets'

export function RegisterUser() {
    const navigate = useNavigate();
    
    // Estados para formulário e feedback visual
    const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // A URL agora é relativa. O interceptor da API cuida do resto.
            await api.post('/auth/register', formData);
            
            // Sucesso!
            alert('Conta criada com sucesso! Faça login para continuar.');
            navigate('/login');
            
        } catch (err: any) {
            console.error("Erro no registro:", err);
            
            // Tenta pegar a mensagem específica enviada pelo Backend Java, se houver
            const backendMessage = err.response?.data?.message || err.response?.data;
            setError(typeof backendMessage === 'string' ? backendMessage : 'Erro ao criar conta. Tente outro usuário.');
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl animate-fade-in">
                
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Criar Nova Conta</h2>
                <p className="text-slate-400 text-sm text-center mb-6">Junte-se ao Squad 17 na análise de Churn</p>
                
                {/* Exibição de Erro */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-slate-400 text-xs uppercase font-bold mb-1 block">Usuário</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Ex: analista_squad17"
                            value={formData.username}
                            onChange={e => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="text-slate-400 text-xs uppercase font-bold mb-1 block">Senha</label>
                        <input 
                            type="password" 
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2
                            ${loading 
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-[0.98]'
                            }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Registrando...
                            </>
                        ) : (
                            'Criar Conta'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm">
                        Já tem acesso?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors">
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}