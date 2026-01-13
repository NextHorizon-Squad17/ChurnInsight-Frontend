# 🚀 Next Horizon | ChurnInsight Frontend

> **Plataforma de Inteligência Preditiva com IA e Design Cyberpunk**
> *Squad 17 - Oracle Next Education (ONE)*

![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue)
![Tailwind](https://img.shields.io/badge/Style-Tailwind%20CSS-38bdf8)
![Status](https://img.shields.io/badge/Status-Concluído-success)

## 📄 Sobre o Projeto

O **Next Horizon** é a interface moderna para o sistema de predição de Churn do Squad 17. Diferente de dashboards comuns, este projeto foca na **experiência do usuário** e na **interatividade**, utilizando simulações em tempo real e assistentes virtuais.

A aplicação consome a API Java Spring Boot para exibir métricas globais e utiliza lógica local para simular análises individuais de clientes com geração de avatares.

---

## ✨ Funcionalidades Premium

### 🧠 Inteligência Artificial & Simulação
* **Next AI Assistant:** Chatbot flutuante integrado que responde a dúvidas sobre os dados.
* **Simulador de Clientes:** Gera perfis de clientes fictícios com **Avatares Únicos** (via DiceBear API) e calcula o risco de Churn em tempo real.
* **Velocímetro de Risco (Risk Gauge):** Visualização dinâmica da probabilidade de saída do cliente.

### 🎨 UI/UX Avançado (Design System)
* **Modo Cyberpunk (Dark Mode):** Tema escuro profundo com detalhes em Neon (Cyan, Roxo e Dourado) inspirado na identidade visual da marca.
* **Modo Diurno (Light Mode):** Interface corporativa limpa para ambientes claros.
* **Animações Suaves:** Transições de fade-in, elementos pulsantes e hover effects interativos.

### 📊 Dados & Métricas
* **KPIs em Tempo Real:** Conexão direta com o Backend para buscar Churn Rate, MRR e Total de Clientes.
* **Gráficos Interativos:** Gráficos de Rosca (Chart.js) mostrando a segmentação da base.

---

## 🛠️ Tecnologias Utilizadas

* **Core:** React 18, Vite, TypeScript
* **Estilização:** Tailwind CSS (Custom Theme)
* **Gráficos:** Chart.js, React-Chartjs-2
* **Ícones:** Lucide React
* **Conexão API:** Axios
* **Avatares:** DiceBear API (External)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js (v18+)
* Backend Java rodando na porta 8080 (Opcional para a simulação, obrigatório para os KPIs globais)

### Passo a Passo

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
    Crie um arquivo `.env` na raiz do projeto:
    ```env
    VITE_API_URL=http://localhost:8080/api
    ```

4.  **Inicie o Servidor de Desenvolvimento**
    ```bash
    npm run dev
    ```

5.  **Acesse a Aplicação**
    Abra `http://localhost:5173` no seu navegador.

---

## 📂 Estrutura do Projeto

```text
src/
├── assets/           # Imagens e Logos
├── components/       # Componentes Reutilizáveis
│   ├── AiAssistant.tsx   # Chatbot Flutuante
│   ├── ClientSearch.tsx  # Lógica de Simulação
│   ├── ScoreGauge.tsx    # Gráfico de Velocímetro
│   ├── Sidebar.tsx       # Navegação Lateral
│   ├── ThemeToggle.tsx   # Botão Sol/Lua
│   └── ...
├── services/         # Configuração do Axios (api.ts)
├── types/            # Interfaces TypeScript
└── App.tsx           # Tela Principal (Dashboard)
🤝 Integração Backend (Squad 17)
Este frontend espera que a API Java forneça os dados no seguinte formato JSON no endpoint /dashboard/summary:

```JSON

{
  "churnRate": 4.8,
  "totalCustomers": 1240,
  "accuracy": 94.2,
  "riskDistribution": [30, 45, 25]
}

```

<p align="center"> Desenvolvido por [Rômulo Machado] <strong>https://github.com/RomuloFelipe1309</strong> </p>