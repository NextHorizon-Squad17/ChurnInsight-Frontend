```markdown
# 🚀 Next Horizon | ChurnInsight Frontend

> **Plataforma de Inteligência Preditiva com IA e Design Cyberpunk**
> *Squad 17 - Oracle Next Education (ONE)*

![React](https://img.shields.io/badge/Frontend-React_18-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?logo=docker)
![Status](https://img.shields.io/badge/Status-Concluído-success)

## 📄 Sobre o Projeto

O **Next Horizon** é a interface moderna para o sistema de predição de Churn do Squad 17. Diferente de dashboards comuns, este projeto foca na **experiência do usuário** e na **interatividade**, utilizando simulações em tempo real e assistentes virtuais conectados a modelos de Machine Learning.

A aplicação consome a API Java Spring Boot para autenticação, métricas globais e predição de risco.

---

## ✨ Funcionalidades Premium

### 🔐 Autenticação & Segurança
* **Login & Registro:** Sistema completo de cadastro e login de usuários com persistência de sessão (JWT).
* **Controle de Acesso (RBAC):** Proteção de rotas onde apenas usuários com perfil **ADMIN** acessam o Painel Administrativo.
* **Layouts Protegidos:** Redirecionamento automático para login caso o usuário não esteja autenticado.

### 🧠 Inteligência Artificial (Real-Time)
* **Simulador de Retenção (AI Assistant):** Formulário lateral onde o analista insere dados do cliente (Contrato, Mensalidade, Serviços) e recebe:
    * Probabilidade exata de Churn (%).
    * Classificação de Risco (Alto/Médio/Baixo).
    * **Estratégia de Retenção** gerada dinamicamente.
* **Velocímetro de Risco (Risk Gauge):** Visualização dinâmica da probabilidade de saída.

### 🎨 UI/UX Avançado (Design System)
* **Modo Cyberpunk (Dark Mode):** Tema escuro profundo com detalhes em Neon (Cyan, Roxo e Dourado) inspirado na identidade visual da marca.
* **Modo Diurno (Light Mode):** Interface corporativa limpa para ambientes claros.
* **Dashboard Interativo:** KPIs de Churn Score, Total de Clientes e Precisão do Modelo atualizados via API.

---

## 🛠️ Tecnologias Utilizadas

* **Core:** React 18, Vite, TypeScript
* **Roteamento:** React Router DOM v6 (Rotas Privadas e Públicas)
* **Estilização:** Tailwind CSS (Custom Theme "Horizon")
* **Gráficos:** Chart.js, React-Chartjs-2
* **Conexão API:** Axios (com Interceptors para Bearer Token)
* **Container:** Docker & Nginx

---

## 🚀 Como Rodar o Projeto

### Opção 1: Ambiente de Desenvolvimento (Node.js)

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/NextHorizon-Squad17/ChurnInsight-Frontend.git](https://github.com/NextHorizon-Squad17/ChurnInsight-Frontend.git)
    cd ChurnInsight-Frontend
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente**
    Crie um arquivo `.env` na raiz (baseado no `.env.example`):
    ```env
    VITE_API_URL=http://localhost:8080
    ```

4.  **Inicie o Servidor**
    ```bash
    npm run dev
    ```
    Acesse: `http://localhost:5173`

---

### Opção 2: Produção (Docker)

O projeto já conta com um `Dockerfile` otimizado em múltiplos estágios (Build -> Nginx Alpine).

1.  **Build da Imagem**
    ```bash
    docker build -t churn-frontend .
    ```

2.  **Rodar o Container**
    ```bash
    docker run -p 80:80 churn-frontend
    ```
    Acesse: `http://localhost`

---

## 📂 Estrutura do Projeto

```text
src/
├── assets/           # Imagens e Logos
├── components/       # Componentes Reutilizáveis
│   ├── AiAssistant.tsx   # Simulador de Risco (Conecta na API)
│   ├── AdminRoute.tsx    # Proteção de rotas Admin
│   ├── Sidebar.tsx       # Menu Lateral
│   └── ...
├── contexts/         # Gerenciamento de Estado Global
│   └── AuthContext.tsx   # Lógica de Login/Logout e Token
├── layouts/          # Estruturas de Página (MainLayout)
├── pages/            # Telas da Aplicação
│   ├── Login.tsx         # Tela de Acesso
│   ├── Dashboard.tsx     # Visão Geral (KPIs)
│   ├── AdminDashboard.tsx# Gestão de Usuários
│   └── RegisterUser.tsx  # Criação de Conta
├── services/         # Configuração do Axios (api.ts)
└── types/            # Interfaces TypeScript

```

## 🤝 Integração Backend

Este frontend espera os seguintes endpoints da API Java:

* `POST /auth/login`: Para autenticação (retorna Token JWT).
* `POST /auth/register`: Para criar novos analistas.
* `POST /api/churn/predict`: Para o Simulador de IA.
* `GET /users`: Para o Dashboard Admin.

---

<p align="center">
Desenvolvido por <strong>Rômulo Machado</strong> <strong>https://github.com/RomuloFelipe1309</strong> e <strong>Squad 17-Churn Insight- Next Horizon</strong> 





Oracle Next Education (ONE)
</p>

```

```
