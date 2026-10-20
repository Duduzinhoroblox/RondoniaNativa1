import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  MapPin, 
  Calendar, 
  Users, 
  TreePine, 
  ShieldCheck, 
  FileCode2, 
  ChevronRight,
  Target,
  BarChart3
} from 'lucide-react';

export const CentelhaProjectPitch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CRITERIOS' | 'ROADMAP' | 'ARQUITETURA' | 'DIFERENCIAIS'>('CRITERIOS');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Hero Centelha Banner */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Programa Centelha 3 Rondônia — Simulado Fase 1</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Rondônia Nativa: Tecnologia da Floresta para a Floresta em Pé
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span><strong>Proponente / Autor:</strong> Eduardo Renan Souza de Aquino</span>
            <span>•</span>
            <span>3º Ano B — Técnico em Informática</span>
            <span>•</span>
            <span className="text-emerald-300 font-semibold">Setor: Turismo, Meio Ambiente e TI</span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Uma plataforma de alta tecnologia desenvolvida especificamente para a realidade amazônica: 
            superando o isolamento de conectividade com arquitetura <strong className="text-emerald-300">Offline-First</strong>, 
            garantindo renda direta com <strong className="text-amber-300">Social Split Payment</strong> e blindando territórios tradicionais com travas rígidas de capacidade de carga.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'CRITERIOS', label: 'Critérios Centelha (Notas & Pesos)', icon: Target },
          { id: 'ROADMAP', label: 'Roadmap de 4 Etapas', icon: Calendar },
          { id: 'ARQUITETURA', label: 'Arquitetura Offline-First', icon: Cpu },
          { id: 'DIFERENCIAIS', label: 'Comparativo vs Airbnb/TripAdvisor', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                isActive
                  ? 'bg-forest-800 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Centelha Criteria Assessment */}
      {activeTab === 'CRITERIOS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          
          {/* Solução (Peso 2) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full">
                Solução Inovadora (Peso 2)
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Centelha 3</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Offline-First & Validação GPS Autônoma
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diferente de marketplaces globais que exigem 4G constante, o Rondônia Nativa armazena tiles vetoriais de mapas e vouchers criptografados em SQLite/WatermelonDB local, permitindo que turistas e guias credenciados validem ingressos e naveguem com GPS na foz do Rio Guaporé sem sinal celular.
            </p>
            <div className="pt-2 text-xs text-forest-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Resolve o principal gargalo tecnológico da floresta amazônica.</span>
            </div>
          </div>

          {/* Impacto (Peso 1) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Impacto Socioambiental (Peso 1)
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Centelha 3</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Economia da Floresta em Pé & Social Split
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O modelo de <strong>Social Split Payment</strong> repassa de 60% a 65% do valor da reserva diretamente para contas jurídicas de associações indígenas e quilombolas via PIX. Isso financia projetos comunitários (hortas agroecológicas, preservação de quelônios e energia solar) e combate o desmatamento ao gerar renda digna para os jovens locais.
            </p>
            <div className="pt-2 text-xs text-amber-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Inclusão sociodigital e valorização da cultura tradicional.</span>
            </div>
          </div>

          {/* Mercado (Peso 1) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
                Potencial de Mercado (Peso 1)
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Centelha 3</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Crescimento Exponencial do Ecoturismo
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O ecoturismo e o turismo de base comunitária crescem mais de 20% ao ano internacionalmente. Rondônia possui patrimônios incomparáveis (Real Forte Príncipe da Beira, T.I. Sete de Setembro, Resex Rio Cautário), mas carecia de canal seguro, legalizado e com reputação auditada para atrair turistas do Brasil e do mundo.
            </p>
            <div className="pt-2 text-xs text-cyan-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              <span>Posiciona Rondônia como novo polo ecológico na Amazônia.</span>
            </div>
          </div>

          {/* Execução (Peso 1) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                Capacidade de Execução (Peso 1)
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Centelha 3</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Roadmap Realista & Proponente Técnico
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proponente com formação técnica em Informática pelo IFRO, unindo competência técnica de desenvolvimento moderno (React, Node, SQLite, Leaflet GIS) a parcerias de campo articuladas com a SETUR-RO, cooperativas de guias Cadastur e lideranças TBC.
            </p>
            <div className="pt-2 text-xs text-rose-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Cronograma claro em 4 etapas bem delimitadas.</span>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Roadmap in 4 Phases */}
      {activeTab === 'ROADMAP' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            Cronograma de Desenvolvimento & Validação em Campo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-forest-800 bg-forest-100 px-2 py-0.5 rounded-full uppercase">
                Etapa 1: 40 Dias
              </span>
              <h4 className="font-bold text-sm text-slate-900">Imersão & Validação</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entrevistas com guias Cadastur e lideranças comunitárias no Guaporé e Cacoal para mapear desafios técnicos, modelos de smartphones e rotinas locais.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                Etapa 2: 50 Dias
              </span>
              <h4 className="font-bold text-sm text-slate-900">Protótipo No-Code MVP</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Construção de MVP funcional em Glide/Softr para validação rápida de UX e agendamentos com primeiros usuários testes em Porto Velho.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full uppercase">
                Etapa 3: 75 Dias
              </span>
              <h4 className="font-bold text-sm text-slate-900">App Native & Core Offline</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desenvolvimento completo da camada Offline-First (Leaflet/Mapbox Tiles), motor criptográfico de vouchers GPS e split de pagamento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                Etapa 4: 45 Dias
              </span>
              <h4 className="font-bold text-sm text-slate-900">Piloto Oficial Guaporé</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Homologação formal com SETUR-RO, FUNAI e ICMBio e lançamento comercial no polo Costa Marques - Real Forte Príncipe da Beira.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Offline Architecture */}
      {activeTab === 'ARQUITETURA' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            Arquitetura Técnica Integrada (Offline-First & Sincronização Resiliente)
          </h3>

          <div className="bg-slate-950 text-emerald-400 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`
+-----------------------------------------------------------------------+
|                           RONDÔNIA NATIVA                             |
+-----------------------------------------------------------------------+
|  [ Turista (App/Web) ]  |  [ Guia Credenciado ]  |  [ Liderança TBC ]  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    CAMADA DE APRESENTAÇÃO / UI                         |
|  - App Mobile (React Native / PWA Offline) - Android & iOS            |
|  - Web Portal (Next.js / Vite React) - Dashboard Admin e Vitrine Web  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                CAMADA OFFLINE-FIRST & NAVEGAÇÃO                       |
|  - Local Store: WatermelonDB / SQLite (Sincronização diferida)         |
|  - Geoprocessamento: Leaflet / OpenStreetMap Tiles Cache (MBTiles)    |
|  - Offline Voucher Engine: QR Code criptografado com verificação GPS  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                      SERVIÇOS DE BACKEND & API                        |
|  - API REST / GraphQL (Node.js / PostgreSQL / Supabase)               |
|  - Split Payment Gateway (Asaas / Pagar.me Subcontas Pix)             |
|  - Curadoria & Validação Legal (FUNAI / ICMBio / Cadastur SETUR-RO)    |
+-----------------------------------------------------------------------+
            `}</pre>
          </div>
        </div>
      )}

      {/* Tab 4: Comparison vs Big Tech Marketplaces */}
      {activeTab === 'DIFERENCIAIS' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            Por que as plataformas globais falham na Amazônia:
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Critério Operacional</th>
                  <th className="p-3">Airbnb / TripAdvisor</th>
                  <th className="p-3 text-forest-800 bg-emerald-50/70">Rondônia Nativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold">Conectividade Móvel</td>
                  <td className="p-3 text-rose-600">Exige sinal 4G contínuo para exibir vouchers e mapas.</td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/40">100% Offline-First com GPS e cache de mapas locais.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Repasse Financeiro</td>
                  <td className="p-3 text-rose-600">Taxas de até 20% em dólar; repasses demorados para bancos convencionais.</td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/40">Social Split direto via PIX nas contas jurídicas das associações.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Conformidade Indigenista/Ambiental</td>
                  <td className="p-3 text-rose-600">Ignora regras da FUNAI e ICMBio; estimula turismo desordenado.</td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/40">Curadoria prévia com trava obrigatória de autorização formal.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Capacidade de Carga Turística</td>
                  <td className="p-3 text-rose-600">Inexistente (vende até esgotar sem critério ambiental).</td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/40">Trava algorítmica inviolável pactuada com a comunidade.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
