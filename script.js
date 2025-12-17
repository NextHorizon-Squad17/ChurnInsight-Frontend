const MockDB = {
    customers: [],
    async create(customer) {
        customer.__backendId = Date.now().toString() + Math.random();
        this.customers.push(customer); return { isOk: true, data: customer };
    },
    async update(customer) {
        const index = this.customers.findIndex(c => c.__backendId === customer.__backendId);
        if (index !== -1) { this.customers[index] = customer; return { isOk: true, data: customer }; }
        return { isOk: false };
    },
    async delete(customer) {
        this.customers = this.customers.filter(c => c.__backendId !== customer.__backendId);
        return { isOk: true };
    },
    getAll() { return [...this.customers]; }
};

const app = {
    state: { currentCustomers: [], isLoading: false },

    navigateToDashboard() {
        const landing = document.getElementById('landing-page');
        const dashboard = document.getElementById('dashboard-app');
        
        // Animação de saída
        landing.style.opacity = '0';
        landing.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            landing.classList.add('hidden');
            dashboard.classList.remove('hidden');
            void dashboard.offsetWidth; // Força reflow
            
            // Animação de entrada
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'translateY(0)';
            
            if(this.state.currentCustomers.length === 0) this.renderDashboard();
        }, 500);
    },

    generateSpeedometer(score, id) {

        let startColor = '#10b981'; let endColor = '#34d399'; // Verde
        let label = 'Saudável';
        let glowClass = 'shadow-glow-success';
        
        if (score < 40) {
            startColor = '#f43f5e'; endColor = '#fb7185'; label = 'Crítico'; // Vermelho
            glowClass = 'shadow-glow-danger';
        } else if (score < 70) {
            startColor = '#f59e0b'; endColor = '#fbbf24'; label = 'Risco'; // Amarelo
            glowClass = 'shadow-glow-warning';
        }

        const maxDash = 126;
        const dashOffset = maxDash - ((score / 100) * maxDash);
        const uniqueId = `grad-${id}-${Math.random().toString(36).substr(2, 9)}`;

        return `
        <div class="flex flex-col items-center justify-center relative w-32 group cursor-default" title="Satisfação Preditiva: ${score}">
            <svg viewBox="0 0 100 55" class="w-28 h-16 overflow-visible drop-shadow-xl">
                <defs>
                    <linearGradient id="${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="${startColor}" />
                        <stop offset="100%" stop-color="${endColor}" />
                    </linearGradient>
                </defs>
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" class="stroke-gray-200 dark:stroke-white/10" stroke-width="6" stroke-linecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#${uniqueId})" class="gauge-animate" stroke-width="6" stroke-linecap="round" stroke-dasharray="${maxDash}" stroke-dashoffset="${dashOffset}" />
                <text x="50" y="42" text-anchor="middle" font-size="22" font-weight="800" class="fill-slate-900 dark:fill-white drop-shadow-md">${score}</text>
            </svg>
            <div class="flex items-center gap-1.5 -mt-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                <div class="w-1.5 h-1.5 rounded-full ${glowClass}" style="background-color: ${startColor}"></div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">${label}</span>
            </div>
        </div>
        `;
    },

    renderCustomerMetrics(c) {
        const paymentHistory = c.payment_history.map(status => {
            const color = status === 'paid' ? 'bg-emerald-500 shadow-glow-success' : (status === 'late' ? 'bg-amber-500 shadow-glow-warning' : 'bg-rose-500 shadow-glow-danger');
            const title = status === 'paid' ? 'Pago' : (status === 'late' ? 'Atrasado' : 'Inadimplente');
            return `<div class="w-2.5 h-8 rounded-full ${color} opacity-90 transition-all hover:opacity-100 hover:scale-110 cursor-help" title="${title}"></div>`;
        }).join('');


        let barGradient = 'from-primary-600 to-primary-400';
        if (c.data_usage_percent > 90) barGradient = 'from-rose-600 to-rose-400';
        else if (c.data_usage_percent > 75) barGradient = 'from-amber-500 to-amber-400';

        const engId = `eng-${c.customer_id.replace(/\W/g, '')}`;
        const engColor1 = c.engagement_score > 70 ? '#10b981' : (c.engagement_score > 40 ? '#3b82f6' : '#94a3b8');
        const engColor2 = c.engagement_score > 70 ? '#34d399' : (c.engagement_score > 40 ? '#60a5fa' : '#cbd5e1');

        return `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                
                <div class="col-span-2 md:col-span-1">
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Consumo de Dados</span>
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-200 font-mono">${c.data_usage_percent}%</span>
                    </div>
                    <div class="relative h-2 w-full bg-gray-100 dark:bg-black/40 rounded-full overflow-hidden border border-transparent dark:border-white/5">
                        <div class="absolute top-0 left-0 h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-1000 shadow-lg" style="width: ${c.data_usage_percent}%"></div>
                    </div>
                    <p class="text-[10px] text-slate-400 mt-1.5 text-right font-mono">${c.data_usage_val} / ${c.data_plan}</p>
                </div>

                <div class="col-span-2 md:col-span-1">
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Histórico (6 Meses)</span>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400">${c.last_payment_delay > 0 ? `${c.last_payment_delay}d Atraso` : 'Em Dia'}</span>
                    </div>
                    <div class="flex gap-1.5 justify-between px-1">
                        ${paymentHistory}
                    </div>
                </div>

                <div class="col-span-1 pl-4 border-l border-gray-100 dark:border-white/5 hidden md:block">
                    <div class="flex flex-col gap-3 h-full justify-center">
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Contrato</span>
                            <span class="text-xs font-bold text-slate-700 dark:text-white bg-white/5 px-2 py-0.5 rounded">${c.contract_months} meses</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Chamados</span>
                            <span class="text-xs font-bold ${c.complaints > 0 ? 'text-rose-400' : 'text-emerald-400'}">${c.complaints}</span>
                        </div>
                    </div>
                </div>

                <div class="col-span-1 flex items-center justify-end gap-4">
                    <div class="text-right">
                        <p class="text-xs font-bold text-slate-700 dark:text-white">Engajamento</p>
                        <p class="text-[10px] text-slate-400 font-medium">Uso do App</p>
                    </div>
                    <div class="relative w-12 h-12 flex items-center justify-center filter drop-shadow-lg">
                        <svg class="w-full h-full transform -rotate-90 overflow-visible">
                            <defs>
                                <linearGradient id="${engId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="${engColor1}" />
                                    <stop offset="100%" stop-color="${engColor2}" />
                                </linearGradient>
                            </defs>
                            <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3" fill="none" class="text-gray-100 dark:text-white/5" />
                            <circle cx="24" cy="24" r="18" stroke="url(#${engId})" stroke-width="3" fill="none" stroke-dasharray="113" stroke-dashoffset="${113 - (c.engagement_score * 1.13)}" stroke-linecap="round" />
                        </svg>
                        <span class="absolute text-[10px] font-bold text-slate-600 dark:text-slate-300">${c.engagement_score}</span>
                    </div>
                </div>
            </div>
        `;
    },

    getRealPhotoUrl(id, name) {
        const numId = id.replace(/\D/g, '').slice(-2) || Math.floor(Math.random() * 99);
        const isFemale = ['Ana', 'Maria', 'Beatriz', 'Elena', 'Gabriela', 'Julia', 'Fernanda', 'Laura', 'Sofia', 'Isabela'].some(n => name.includes(n));
        return `https://randomuser.me/api/portraits/${isFemale ? 'women' : 'men'}/${parseInt(numId)}.jpg`;
    },

    // --- GERADOR DE DADOS ---
    async addSampleCustomer() {
        const btnAdd = document.getElementById('btn-add');
        const originalHtml = btnAdd.innerHTML;
        btnAdd.innerHTML = '<svg class="animate-spin w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
        
        const names = ['Ana Silva', 'Carlos Oliveira', 'Beatriz Santos', 'Daniel Costa', 'Elena Rocha', 'Felipe Souza', 'Marcos Dias', 'Julia Nogueira', 'Roberto Alves', 'Isabela Lima'];
        const risk = Math.floor(Math.random() * 100);
        let mood = Math.max(0, Math.min(100, (100 - risk) + (Math.random() * 40 - 20)));

        const paymentHistory = Array(6).fill(null).map(() => {
            const rand = Math.random();
            if (risk > 70) return rand > 0.4 ? 'late' : (rand > 0.7 ? 'default' : 'paid');
            if (risk > 40) return rand > 0.8 ? 'late' : 'paid';
            return 'paid';
        });

        const planLimit = [50, 100, 300, 500][Math.floor(Math.random() * 4)];
        const usagePercent = Math.floor(Math.random() * 100);
        const usageVal = Math.floor((usagePercent / 100) * planLimit);

        await MockDB.create({
            customer_id: `CLI-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
            customer_name: names[Math.floor(Math.random() * names.length)],
            churn_risk: risk,
            mood_score: Math.floor(mood),
            data_plan: planLimit + 'GB',
            data_usage_val: usageVal + 'GB',
            data_usage_percent: usagePercent,
            payment_history: paymentHistory,
            last_payment_delay: risk > 60 ? Math.floor(Math.random() * 15) : 0,
            engagement_score: Math.floor(Math.random() * 100),
            contract_months: Math.floor(Math.random() * 36) + 1,
            complaints: risk > 50 ? Math.floor(Math.random() * 5) : 0,
            plan_generated: false,
            retention_plan: ''
        });
        
        this.updateLocalData();
        btnAdd.innerHTML = originalHtml;
    },

    // --- MOTOR DE ESTRATÉGIA IA (Riqueza de Detalhes da v2) ---
    async generateRetentionPlan(backendId) {
        const customer = this.state.currentCustomers.find(c => c.__backendId === backendId);
        const btn = document.getElementById(`btn-${backendId}`);
        if(btn) {
            btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processando...`;
            btn.disabled = true;
            btn.classList.add('opacity-75');
        }

        // Simula processamento da IA
        await new Promise(r => setTimeout(r, 1500));
        
        let diagnosis = "";
        let options = [];

        // Lógica de Negócio Detalhada
        if (customer.last_payment_delay > 5) {
            diagnosis = "💸 Risco Financeiro: Atrasos recorrentes.";
            options = [
                { type: "Finanças", text: "Parcelamento s/ juros (3x).", icon: "💳" },
                { type: "Plano", text: "Downgrade temporário p/ Básico.", icon: "📉" },
                { type: "Contato", text: "Lembrete suave via WhatsApp.", icon: "📩" }
            ];
        } else if (customer.data_usage_percent > 90) {
            diagnosis = "🔥 Uso Intenso: Limite frequentemente excedido.";
             options = [
                { type: "Upsell", text: "Ofertar plano Turbo (+20GB).", icon: "🚀" },
                { type: "Cortesia", text: "Degustação 5GB (7 dias).", icon: "🎁" },
                { type: "Auditoria", text: "Verificar tethering indevido.", icon: "🔍" }
             ];
        } else if (customer.complaints > 2) {
            diagnosis = "😤 Insatisfação Técnica: Múltiplos tickets.";
             options = [
                { type: "Suporte", text: "Visita técnica prioritária.", icon: "🔧" },
                { type: "Retenção", text: "Isenção da próxima fatura.", icon: "🛡️" },
                { type: "Gerência", text: "Ligação do supervisor de área.", icon: "📞" }
             ];
        } else {
             diagnosis = "💎 Oportunidade: Cliente Leal e Saudável.";
             options = [
                { type: "Fidelidade", text: "Upgrade grátis de roteador.", icon: "📡" },
                { type: "Parceria", text: "3 meses de Streaming grátis.", icon: "🎬" },
                { type: "Indicação", text: "Convite programa Member-Get-Member.", icon: "🤝" }
             ];
        }

        const planHTML = `
            <div class="mb-4 pb-3 border-b border-gray-100 dark:border-white/5">
                <div class="flex items-center gap-2 mb-1">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <p class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Diagnóstico IA</p>
                </div>
                <p class="text-sm font-semibold text-slate-800 dark:text-white">${diagnosis}</p>
            </div>
            <div class="space-y-2">
                ${options.map(opt => `
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-primary-200 dark:hover:border-primary-500/30 transition-all cursor-pointer group/opt shadow-sm hover:shadow-md">
                        <div class="text-lg w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-white/10 shadow-sm border border-gray-100 dark:border-white/5 group-hover/opt:scale-110 transition-transform">${opt.icon}</div>
                        <div>
                            <p class="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide group-hover/opt:text-primary-500">${opt.type}</p>
                            <p class="text-xs font-medium text-slate-600 dark:text-slate-300 leading-tight">${opt.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        customer.retention_plan = planHTML;
        customer.plan_generated = true;
        
        await MockDB.update(customer); 
        this.updateLocalData();
    },

    async deleteCustomer(backendId) {
        if(confirm('Tem certeza que deseja arquivar este cliente?')) {
            const customer = this.state.currentCustomers.find(c => c.__backendId === backendId);
            await MockDB.delete(customer); this.updateLocalData();
        }
    },

    updateLocalData() {
        this.state.currentCustomers = MockDB.getAll().sort((a, b) => b.churn_risk - a.churn_risk);
        this.renderDashboard();
    },

    renderDashboard() {
        const listContainer = document.getElementById('customer-list');
        const statsContainer = document.getElementById('stats-container');
        const total = this.state.currentCustomers.length;
        const critical = this.state.currentCustomers.filter(c => c.churn_risk >= 75).length;
        const avgMood = total > 0 ? Math.round(this.state.currentCustomers.reduce((a, b) => a + b.mood_score, 0) / total) : 0;

        const statsCardStyle = `bg-white dark:bg-surface-highlight border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-black/20 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`;
        
        statsContainer.innerHTML = `
            <div class="${statsCardStyle}">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute top-0 right-0 p-4 opacity-10">
                    <svg class="w-16 h-16 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Base Monitorada</p>
                <p class="text-4xl font-extrabold text-slate-900 dark:text-white">${total}</p>
                <div class="w-full h-1 bg-gray-100 dark:bg-white/10 mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 w-full animate-pulse"></div>
                </div>
            </div>

            <div class="${statsCardStyle}">
                 <div class="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div class="absolute top-0 right-0 p-4 opacity-10">
                    <svg class="w-16 h-16 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </div>
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Alto Risco (Churn)</p>
                <p class="text-4xl font-extrabold text-slate-900 dark:text-white">${critical}</p>
                 <div class="w-full h-1 bg-gray-100 dark:bg-white/10 mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-rose-500" style="width: ${total > 0 ? (critical/total)*100 : 0}%"></div>
                </div>
            </div>

            <div class="${statsCardStyle}">
                 <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div class="absolute top-0 right-0 p-4 opacity-10">
                    <svg class="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clip-rule="evenodd"></path></svg>
                </div>
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Satisfação Média</p>
                <div class="flex items-end gap-2">
                    <p class="text-4xl font-extrabold text-slate-900 dark:text-white">${avgMood}</p>
                    <span class="text-lg text-slate-400 mb-1 font-medium">/ 100</span>
                </div>
                 <div class="w-full h-1 bg-gray-100 dark:bg-white/10 mt-4 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500" style="width: ${avgMood}%"></div>
                </div>
            </div>
        `;

        if (total === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-24 bg-gray-50/50 dark:bg-black/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10">
                    <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Banco de Dados Vazio</h3>
                    <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Nenhum dado recebido da API de telecom. Clique em "Simular Dados de Entrada" para testar o painel.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = this.state.currentCustomers.map((c, i) => {
            const riskColorClass = c.churn_risk >= 75 ? 'bg-rose-500 shadow-glow-danger' : (c.churn_risk >= 50 ? 'bg-amber-500 shadow-glow-warning' : 'bg-emerald-500 shadow-glow-success');
            const riskTextClass = c.churn_risk >= 75 ? 'text-rose-600 dark:text-rose-400' : (c.churn_risk >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400');
            const photoUrl = this.getRealPhotoUrl(c.customer_id, c.customer_name);
            
            return `
            <article class="bg-white dark:bg-surface-highlight border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-glow-primary transition-all duration-300 relative overflow-hidden animate-fade-in-up group" style="animation-delay: ${i * 75}ms">
                
                <div class="flex flex-col md:flex-row gap-6 items-center">
                    
                    <div class="flex items-center gap-5 flex-1 w-full md:w-auto">
                        <div class="relative group-hover:scale-105 transition-transform duration-300">
                            <img src="${photoUrl}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-white dark:ring-white/10 shadow-md">
                            <div class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full ${riskColorClass} border-2 border-white dark:border-surface-highlight z-20 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">!</div>
                        </div>
                        <div>
                            <h4 class="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">${c.customer_name}</h4>
                            <div class="flex items-center gap-3 mt-1.5 text-sm font-medium">
                                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs bg-gray-100 dark:bg-black/30 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">ID: ${c.customer_id}</span>
                                <span class="${riskTextClass} font-bold flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                    Risco ${c.churn_risk}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-auto flex justify-center py-4 md:py-0 md:px-10 border-t border-b md:border-y-0 md:border-l md:border-r border-gray-100 dark:border-white/5">
                        ${this.generateSpeedometer(c.mood_score, c.__backendId)}
                    </div>

                    <div class="flex-1 w-full md:pl-2">
                        ${!c.plan_generated ? `
                            <div class="flex flex-col justify-center h-full gap-2">
                                <button id="btn-${c.__backendId}" onclick="app.generateRetentionPlan('${c.__backendId}')" class="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group/btn">
                                    <svg class="w-4 h-4 group-hover/btn:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Gerar Estratégia IA
                                </button>
                                <button onclick="app.deleteCustomer('${c.__backendId}')" class="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors text-center w-full py-1">Arquivar Cliente</button>
                            </div>
                        ` : `
                            <div class="bg-white dark:bg-black/20 rounded-2xl p-1 border border-gray-100 dark:border-white/5 shadow-inner">
                                ${c.retention_plan}
                            </div>
                        `}
                    </div>
                </div>

                ${this.renderCustomerMetrics(c)}

            </article>
            `;
        }).join('');
    }
};