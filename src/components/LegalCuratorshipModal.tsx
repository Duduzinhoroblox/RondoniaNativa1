import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Check, 
  X, 
  AlertTriangle, 
  TreePine, 
  CheckCircle2, 
  Clock, 
  Building2,
  Lock
} from 'lucide-react';
import { CuratorshipProposal } from '../types';

interface LegalCuratorshipModalProps {
  proposals: CuratorshipProposal[];
  onApproveProposal: (proposalId: string) => void;
  onRejectProposal: (proposalId: string) => void;
}

export const LegalCuratorshipModal: React.FC<LegalCuratorshipModalProps> = ({
  proposals,
  onApproveProposal,
  onRejectProposal
}) => {
  const [selectedPropId, setSelectedPropId] = useState(proposals[0]?.id || '');

  const selectedProposal = proposals.find(p => p.id === selectedPropId) || proposals[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Módulo de Curadoria e Governança Territorial (RF03 & RN03)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Homologação Legal de Roteiros (FUNAI & ICMBio)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
              Nenhuma experiência em Terras Indígenas ou Unidades de Conservação é liberada para venda ao público sem verificação rigorosa de autorizações de órgãos fiscalizadores e lideranças nativas.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">
              Trava Sistêmica Ativa
            </span>
            <span className="text-sm font-bold text-emerald-300 flex items-center justify-end space-x-1 mt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Regra RN03 Inviolável</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Proposal List */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Roteiros em Análise Prévia</span>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              {proposals.length} propostas
            </span>
          </h3>

          <div className="space-y-2.5">
            {proposals.map((prop) => (
              <button
                key={prop.id}
                onClick={() => setSelectedPropId(prop.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  selectedPropId === prop.id
                    ? 'border-forest-600 bg-forest-50/60 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    prop.status === 'APROVADO' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : prop.status === 'REJEITADO' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {prop.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{prop.submissionDate}</span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{prop.experienceTitle}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{prop.community}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Proposal Inspection Panel */}
        {selectedProposal && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Auditoria Documental do Roteiro
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">
                  {selectedProposal.experienceTitle}
                </h3>
                <p className="text-xs text-slate-500">{selectedProposal.community}</p>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                selectedProposal.status === 'APROVADO'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {selectedProposal.status}
              </span>
            </div>

            {/* Checklist of Mandatory Regulatory Requirements */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Checklist Obrigatório de Conformidade Territorial:
              </h4>

              <div className="space-y-2 text-xs">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  selectedProposal.funaiDocAttached ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {selectedProposal.funaiDocAttached ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">
                      Autorização de Ingresso em Terra Indígena (FUNAI / Coordenação Regional)
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold ${selectedProposal.funaiDocAttached ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {selectedProposal.funaiDocAttached ? 'Anexado & Verificado' : 'Não Aplicável / Pendente'}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  selectedProposal.icmbioDocAttached ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      Termo de Parceria em Unidade de Conservação (ICMBio Resex)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">
                    Homologado
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  selectedProposal.cadasturVerified ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      Certidão de Regularidade Cadastur do Guia Responsável (SETUR-RO)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">
                    Vigente
                  </span>
                </div>
              </div>
            </div>

            {/* Curatorship Notes */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 block">Parecer da Comissão de Curadoria:</span>
              <p className="text-slate-600 leading-relaxed">
                {selectedProposal.notes}
              </p>
            </div>

            {/* Approval / Rejection Action Buttons */}
            {selectedProposal.status === 'PENDENTE' && (
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => onApproveProposal(selectedProposal.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Aprovar & Publicar no Catálogo</span>
                </button>

                <button
                  onClick={() => onRejectProposal(selectedProposal.id)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-all flex items-center justify-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Rejeitar Proposta</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
