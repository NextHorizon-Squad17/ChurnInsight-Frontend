🚀 Next Horizon | Enterprise AI Dashboard (Front-End Demo)


"Uma demonstração de arquitetura Front-End limpa, reatividade manual e UX imersiva sem dependências complexas."


Este projeto é uma SPA (Single Page Application) simulada, focada na visualização de dados e interatividade para um painel de Inteligência Artificial Corporativa. O objetivo técnico foi unir a estética "Deep Space" com a clareza de dados ("Data Visualization"), criando uma experiência fluida usando apenas JavaScript Puro (Vanilla ES6+) e Tailwind CSS.


🎨 Destaques de UX/UI (Front-End)


A interface foi construída pensando na Psicologia das Cores e na Hierarquia Visual:

Glassmorphism & Profundidade: Uso intensivo de backdrop-filter: blur, bordas semitransparentes e sombras de luz (glow) para criar camadas visuais (Z-Index context).

Micro-interações:

Hover States: Cards que levitam e acendem ao passar o mouse.

Feedback Visual: Botões que mudam de estado (loading/disabled) durante requisições assíncronas simuladas.

Transições de Página: Animação suave (fade-in-up e slide) entre a Landing Page e o Dashboard sem recarregar a página (DOM Manipulation).

Data Viz (Visualização de Dados):

Velocímetros SVG Dinâmicos: Renderizados via JavaScript com stroke-dasharray calculado matematicamente baseando-se na pontuação (0-100).

Barras de Progresso Condicionais: Mudança de gradientes CSS baseada em lógica JS (Ex: >90% torna-se vermelho/crítico).


🛠️ Arquitetura Técnica

O código segue padrões modernos de desenvolvimento Front-End sem a necessidade de bundlers (Webpack/Vite), focando na performance nativa do navegador.

1. Gestão de Estado (State Management)
Embora não use Redux ou Context API, implementei um padrão de gerenciamento de estado local simples e reativo:

```

JavaScript

const app = {
    state: {
        currentCustomers: [], // Fonte única da verdade
        isLoading: false
    },
    // O estado é atualizado e dispara a re-renderização do DOM automaticamente
    updateLocalData() {
        this.state.currentCustomers = MockDB.getAll().sort((a, b) => b.churn_risk - a.churn_risk);
        this.renderDashboard(); // Reatividade manual
    }
};

```


2. Componentização via Template Strings
Ao invés de JSX, utilizei o poder das Template Strings (ES6) para criar componentes funcionais puros que retornam HTML dinâmico, facilitando a manutenção e leitura:


```

JavaScript

// Exemplo de Componente Funcional em Vanilla JS
renderCustomerMetrics(c) {
    return `
        <div class="grid grid-cols-4 gap-6">
            ${c.payment_history.map(status => `...`).join('')}
        </div>
    `;
}


```


3. Mock Database & Assincronismo
Simulação de um backend RESTful utilizando Promises e setTimeout para criar uma experiência realista de latência de rede e estados de carregamento (Loading Spinners):

Métodos: create, update, delete.

Simulação de latência de IA (1.5s) para gerar "suspense" na UX.


💻 Tecnologias & Ferramentas

HTML5 Semântico: Estrutura acessível e organizada.

Tailwind CSS (CDN): Utilizado para estilização atômica, responsividade e Dark Mode nativo. Configuração customizada no <script> para estender a paleta de cores (midnight, primary, glow).

JavaScript (ES6+):

Arrow Functions.

Async/Await.

DOM Manipulation API.

Local Storage (para persistência de tema Dark/Light).

CSS3 Animations: Keyframes customizados (@keyframes) para efeitos de entrada e pulse.


📂 Estrutura do Código

```

Bash

/src
│
├── index.html      # Entry Point (DOM inicial e Configuração Tailwind)
├── style.css       # Estilos globais, Scrollbars e Keyframes complexos
└── script.js       # Core Application:
    ├── MockDB      # Camada de Dados (Model)
    ├── App Logic   # Camada de Controle (Controller)
    └── Renderers   # Camada de Visualização (View Components)

```


🚀 Como Executar


Simples, leve e rápido. Sem npm install.

1. Clone o repositório. [https://github.com/NextHorizon-Squad17/ChurnInsight-Frontend.git]

2. Abra o index.html em qualquer navegador moderno.

3. (Opcional) Use a extensão "Live Server" no VSCode para hot-reload.



🔮 Melhorias Front-End Futuras

[ ] Refatoração para React ou Vue.js para escalabilidade de componentes.

[ ] Adição de TypeScript para tipagem forte das entidades de Cliente.

[ ] Implementação de Chart.js ou Recharts para gráficos de histórico complexos.

[ ] Testes Unitários com Jest ou Vitest.

<p align="center"> Desenvolvido por [https://github.com/RomuloFelipe1309] | Front-End Developer </p>
