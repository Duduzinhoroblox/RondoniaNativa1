import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  TreePine, 
  Users, 
  ArrowUpRight, 
  Sliders, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CommunityAssociation, Experience } from '../types';

interface CommunityFundDashboardProps {
  associations: CommunityAssociation[];
  experiences: Experience[];
  onUpdateCapacity: (experienceId: string, newCapacity: number) => void;
}

export const CommunityFundDashboard: React.FC<CommunityFundDashboardProps> = ({
  associations,
  experiences,
  onUpdateCapacity
}) => {
  const [selectedAssocId, setSelectedAssocId] = useState(associations[0].id);

  const selectedAssoc = associations.find(a => a.id === selectedAssocId) || associations[0];
  const assocExperiences = experiences.filter(e => e.associationId === selectedAssoc.id);

  // Total funds accumulated
  const grandTotalFunds = associations.reduce((acc, curr) => acc + curr.totalFundsReceived, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>Transparência Financeira do Social Split (RF06 & RN04)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Painel do Fundo Comunitário & Governança TBC
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
              Acompanhamento em tempo real dos repasses automáticos via PIX para associações indígenas, quilombolas e cooperativas de guias de Rondônia.
            </p>
          </div>

          {/* Grand Total Injected in Traditional Communities */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-300 block tracking-wider">
              Total Fomentado Diretamente
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading block mt-0.5">
              R$ {grandTotalFunds.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-emerald-300 font-medium">
              100% creditado nas contas comunitárias
            </span>
          </div>
        </div>
      </div>

      {/* Association Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
        {associations.map((assoc) => (
          <button
            key={assoc.id}
            onClick={() => setSelectedAssocId(assoc.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
              selectedAssocId === assoc.id
                ? 'bg-forest-800 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{assoc.name.split('(')[1]?.replace(')', '') || assoc.name.split(' ')[1]}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedAssocId === assoc.id ? 'bg-forest-700 text-emerald-200' : 'bg-slate-100 text-slate-500'
            }`}>
              R$ {assoc.totalFundsReceived.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </span>
          </button>
        ))}
      </div>

      {/* Active Association Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Bank & Governance Info */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-start space-x-4">
            <img
              src={selectedAssoc.logoUrl}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border-2 border-forest-600 shadow-sm"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Entidade Comunitária Parceira
              </span>
              <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                {selectedAssoc.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedAssoc.location}</p>
            </div>
          </div>

          {/* Legal and Bank Account Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">CNPJ Jurídico:</span>
              <span className="font-mono font-bold text-slate-800">{selectedAssoc.cnpj}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Chave PIX de Split:</span>
              <span className="font-mono font-bold text-forest-800 truncate max-w-[200px]" title={selectedAssoc.pixKey}>
                {selectedAssoc.pixKey}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Domicílio Bancário:</span>
              <span className="font-medium text-slate-800">{selectedAssoc.bankAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Liderança / Representante:</span>
              <span className="font-bold text-slate-800">{selectedAssoc.leaderName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Famílias Beneficiadas:</span>
              <span className="font-bold text-slate-800">{selectedAssoc.peopleCount} pessoas</span>
            </div>
          </div>

          {/* Impact Projects Financed */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <TreePine className="w-4 h-4 text-forest-700" />
              <span>Projetos Sustentáveis Financiados pelo Turismo</span>
            </h4>
            <div className="space-y-2">
              {selectedAssoc.communityProjects.map((project, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start space-x-2 text-xs text-forest-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{project}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Capacity of Load Regulator (RF04, RN02) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-forest-700" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Regulador Territorial de Capacidade de Carga (RF04)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                O conselho comunitário tem poder soberano para ajustar o teto máximo de visitantes diários.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {assocExperiences.map((exp) => (
              <div 
                key={exp.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{exp.title}</h5>
                    <span className="text-xs text-slate-500">{exp.locationName}</span>
                  </div>
                  <span className="text-xs font-bold text-forest-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                    {exp.splitPercentages.communityAssociation}% Repasse
                  </span>
                </div>

                {/* Interactive Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">Teto Máximo Pactuado:</span>
                    <span className="font-bold text-forest-800 text-sm">
                      {exp.maxCapacityPerDay} visitantes/dia
                    </span>
                  </div>

                  <input
                    type="range"
                    min="4"
                    max="30"
                    step="1"
                    value={exp.maxCapacityPerDay}
                    onChange={(e) => onUpdateCapacity(exp.id, parseInt(e.target.value))}
                    className="w-full accent-forest-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>4 (Conservação Rígida)</span>
                    <span>15 (Médio Impacto)</span>
                    <span>30 (Capacidade Máxima)</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>Vagas já reservadas para o período:</span>
                  <span className="font-bold text-slate-800">{exp.currentBookedCount} pessoas</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
