🚀 Next Horizon | Enterprise AI Dashboard 
"Onde a estética imersiva encontra a clareza de dados."

Este projeto é uma Simulação de Dashboard de Inteligência Artificial focado na predição de Churn (cancelamento) para empresas de telecomunicações. 

📸 Demonstração Visual
(Espaço reservado para colocar um print da tela inicial e do dashboard)

Nota: O design apresenta um tema Dark Mode profundo com efeitos de glassmorphism (vidro) e gradientes neon para destacar métricas críticas.

✨ Funcionalidades Principais


🎨 1. UX & UI Imersiva 
Tema "Deep Space": Fundo azul-meia-noite (midnight) com sombras de luz (glow effects) para criar profundidade.

Animações Suaves: Transições de entrada (fade-in-up), velocímetros animados e elementos flutuantes 3D.

Responsividade: Layout fluido adaptável a desktops e dispositivos móveis usando Tailwind CSS.

📊 2. Visualização de Dados Premium
Velocímetros Híbridos: Indicadores de "Satisfação do Cliente" com gradientes condicionais (Verde, Amarelo, Vermelho).

Barras de Progresso Inteligentes: Mudam de cor automaticamente baseadas no risco (ex: uso de dados > 90% fica vermelho).

Heatmap em Pílulas: Histórico de pagamento visualizado em pílulas nítidas, facilitando a leitura rápida de inadimplência.

🧠 3. Simulação de IA (Mock Backend)
Geração de Clientes: Botão para simular a entrada de novos dados via API fictícia (MockDB).

Motor de Estratégia: Ao clicar em "Gerar Estratégia IA", o sistema analisa os dados do cliente (atrasos, queixas, uso) e sugere um plano de retenção personalizado (Financeiro, Upsell ou Técnico).

Gestão de Estado: Capacidade de adicionar, diagnosticar e arquivar (deletar) clientes da lista.

🛠️ Tecnologias Utilizadas
O projeto foi construído com foco em performance e simplicidade (sem necessidade de build complexo), utilizando tecnologias modernas:

HTML5 Semântico

Tailwind CSS (via CDN)

JavaScript (Vanilla ES6+)

CSS3 (Animações Customizadas)

📂 Estrutura de Arquivos
Bash

/next-horizon-dashboard
│
├── index.html      # Estrutura principal e importação do Tailwind
├── style.css       # Animações customizadas (keyframes) e scrollbar
├── script.js       # Lógica do MockDB, UI e Motor de IA
└── README.md       # Documentação do projeto


🚀 Como Rodar o Projeto
Como o projeto utiliza Tailwind via CDN e JavaScript puro, não é necessário instalar dependências (Node.js, NPM, etc).

Clone o repositório (ou baixe os arquivos):

Bash

git clone https://github.com/NextHorizon-Squad17/ChurnInsight-Frontend.git
Abra o arquivo index.html:

Basta dar um clique duplo no arquivo para abrir no seu navegador padrão (Chrome, Edge, Firefox).

Para uma melhor experiência, recomendo usar a extensão Live Server do VS Code.

🕹️ Como Usar (Guia Rápido)
Landing Page: Clique no botão "Acessar Demo" ou "Iniciar Dashboard" para ver a transição suave para o aplicativo.

Simular Dados: No painel, se a lista estiver vazia, clique em "Simular Dados de Entrada". O sistema criará um cliente aleatório com nome, foto e métricas de risco.

Analisar Risco: Observe o Velocímetro (Satisfação) e as barras de Risco de Churn.

Ação de IA: Clique no botão "Gerar Estratégia IA". Aguarde o processamento simulado para ver o diagnóstico e as 3 opções de retenção sugeridas.

Arquivar: Caso o cliente não seja mais relevante, clique em "Arquivar Cliente".

🔮 Futuras Melhorias (Roadmap)
[ ] Integração com uma API Real (Python/Flask) para previsão de Churn.

[ ] Gráficos de linha usando Chart.js para histórico de consumo.

[ ] Sistema de Login/Autenticação real.

[ ] Modo Light refinado (atualmente focado no Dark Mode).

📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e aprender com ele.

<p align="center"> Desenvolvido com 💙 e Código Limpo. </p>

focado em frontend

Mostrar raciocínio
Com certeza. O foco no Front-End é o ponto forte deste projeto, pois ele demonstra domínio sobre DOM, reatividade, design systems e UX sem depender de frameworks pesados (como React ou Vue), usando apenas o poder do navegador (Vanilla JS + Tailwind).

Aqui está uma versão revisada do README.md especificamente ajustada para destacar suas habilidades de Front-End (ideal para portfólio de desenvolvedor Front-End/Full Stack).

Eu enfatizei a Arquitetura, a Manipulação do DOM e o Design System.

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
2. Componentização via Template Strings
Ao invés de JSX, utilizei o poder das Template Strings (ES6) para criar componentes funcionais puros que retornam HTML dinâmico, facilitando a manutenção e leitura:

JavaScript

// Exemplo de Componente Funcional em Vanilla JS
renderCustomerMetrics(c) {
    return `
        <div class="grid grid-cols-4 gap-6">
            ${c.payment_history.map(status => `...`).join('')}
        </div>
    `;
}
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

Bash

/src
│
├── index.html      # Entry Point (DOM inicial e Configuração Tailwind)
├── style.css       # Estilos globais, Scrollbars e Keyframes complexos
└── script.js       # Core Application:
    ├── MockDB      # Camada de Dados (Model)
    ├── App Logic   # Camada de Controle (Controller)
    └── Renderers   # Camada de Visualização (View Components)


🚀 Como Executar
Simples, leve e rápido. Sem npm install.

Clone o repositório.

Abra o index.html em qualquer navegador moderno.

(Opcional) Use a extensão "Live Server" no VSCode para hot-reload.

🔮 Melhorias Front-End Futuras
[ ] Refatoração para React ou Vue.js para escalabilidade de componentes.

[ ] Adição de TypeScript para tipagem forte das entidades de Cliente.

[ ] Implementação de Chart.js ou Recharts para gráficos de histórico complexos.

[ ] Testes Unitários com Jest ou Vitest.

<p align="center"> Desenvolvido por [https://github.com/RomuloFelipe1309] | Front-End Developer </p>
