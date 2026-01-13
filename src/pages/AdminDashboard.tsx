import { useEffect, useState } from 'react';
import { api } from '../service/api';

export function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Exemplo de chamada que só admin consegue fazer
        api.get('/users').then(res => setUsers(res.data));
    }, []);

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-6 text-red-500">Painel do Administrador</h1>
            
            <div className="bg-slate-800 p-6 rounded-xl">
                <h2 className="text-xl mb-4">Usuários Cadastrados</h2>
                <ul className="space-y-2">
                    {users.map(u => (
                        <li key={u.id} className="p-3 bg-slate-700 rounded flex justify-between">
                            <span>{u.username}</span>
                            <span className="text-xs bg-blue-600 px-2 py-1 rounded">{u.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}