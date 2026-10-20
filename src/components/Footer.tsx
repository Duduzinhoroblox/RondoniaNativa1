import React from 'react';
import { Compass, TreePine, ShieldCheck, Heart, MapPin, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onOpenGuidelines: () => void;
  onOpenCentelha: () => void;
  onOpenMap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuidelines,
  onOpenCentelha,
  onOpenMap
}) => {
  return (
    <footer className="bg-forest-950 text-slate-300 border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  Rondônia<span className="text-forest-400">Nativa</span>
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">
                  Ecoturismo e Turismo de Base Comunitária (TBC)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              Projeto de inovação tecnológica elaborado para o <strong className="text-slate-200">Programa Centelha 3 Rondônia (Simulado Fase 1)</strong> pelo estudante <strong className="text-slate-200">Eduardo Renan Souza de Aquino</strong> (3º Ano B - Técnico em Informática).
            </p>

            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conformidade com FUNAI, ICMBio e Cadastur SETUR-RO</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenMap} className="hover:text-emerald-300 transition-colors">
                  Mapa Georreferenciado
                </button>
              </li>
              <li>
                <button onClick={onOpenGuidelines} className="hover:text-emerald-300 transition-colors">
                  Manual de Conduta Ética
                </button>
              </li>
              <li>
                <button onClick={onOpenCentelha} className="hover:text-emerald-300 transition-colors">
                  Dossiê Centelha 3
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs in Rondônia */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Polos de Atuação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Vale do Guaporé</span>
              </li>
              <li className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Resex Rio Cautário</span>
              </li>
              <li className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>T.I. Sete de Setembro</span>
              </li>
              <li className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Real Forte Príncipe</span>
              </li>
            </ul>
          </div>

          {/* Institutional Partners / Badges */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Apoio Institucional</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium">
              <div className="p-2.5 rounded-xl bg-forest-900/60 border border-forest-800 text-center">
                <span className="block font-bold text-amber-300">CENTELHA 3</span>
                <span className="text-[10px] text-slate-400">FAPERO / FINEP</span>
              </div>
              <div className="p-2.5 rounded-xl bg-forest-900/60 border border-forest-800 text-center">
                <span className="block font-bold text-emerald-300">SETUR-RO</span>
                <span className="text-[10px] text-slate-400">Governo de RO</span>
              </div>
              <div className="p-2.5 rounded-xl bg-forest-900/60 border border-forest-800 text-center">
                <span className="block font-bold text-slate-200">IFRO</span>
                <span className="text-[10px] text-slate-400">Campus RO</span>
              </div>
              <div className="p-2.5 rounded-xl bg-forest-900/60 border border-forest-800 text-center">
                <span className="block font-bold text-slate-200">TBC BRASIL</span>
                <span className="text-[10px] text-slate-400">Rede Comunitária</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 border-t border-forest-900/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 Rondônia Nativa — Desenvolvido por Eduardo Renan Souza de Aquino. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Privacidade & LGPD</span>
            <span>•</span>
            <span>Termos de Uso Comunitário</span>
            <span>•</span>
            <span>Código de Ética da Floresta</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
