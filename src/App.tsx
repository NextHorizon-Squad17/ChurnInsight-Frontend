import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute'; // Certifique-se que este import está correto

function App() {
  return (
    <BrowserRouter> {/* 1. Router deve ser o pai de todos */}
      <AuthProvider> {/* 2. Provider agora tem acesso ao contexto de navegação */}
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rotas de Usuário Comum */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* ROTA SECRETA DE ADMIN */}
          <Route element={<MainLayout />}>
             <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
             </Route>
          </Route>

          {/* Redirecionamento padrão (opcional, mas recomendado) */}
          <Route path="/" element={<Login />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;