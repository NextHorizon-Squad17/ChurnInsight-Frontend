// ... imports

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rotas de Usuário Comum */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* ROTA SECRETA DE ADMIN */}
          <Route element={<MainLayout />}> {/* Usa o mesmo layout (sidebar) */}
             <Route element={<AdminRoute />}> {/* Mas com proteção extra */}
                <Route path="/admin" element={<AdminDashboard />} />
             </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}