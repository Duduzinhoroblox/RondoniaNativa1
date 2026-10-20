import React from 'react';
import { X, ShieldCheck, Heart, TreePine, FileCheck, CheckCircle2 } from 'lucide-react';
import { mockConductGuidelines } from '../data/mockData';

interface EthicalGuidelinesModalProps {
  onClose: () => void;
}

export const EthicalGuidelinesModal: React.FC<EthicalGuidelinesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-forest-900 text-white">
          <div className="flex items-center space-x-2">
            <TreePine className="w-5 h-5 text-emerald-300" />
            <h3 className="font-heading font-bold text-base text-white">
              Manual de Conduta Ética e Socioambiental (RF09)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-forest-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            O turismo em terras indígenas, quilombos e reservas extrativistas em Rondônia baseia-se na harmonia entre a visitação responsável e a salvaguarda inegociável da biodiversidade amazônica e das tradições ancestrais:
          </p>

          <div className="space-y-3">
            {mockConductGuidelines.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{item.title}</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">
                  {item.rule}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Por que é fundamental: {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-sm transition-all"
          >
            Entendido e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};
