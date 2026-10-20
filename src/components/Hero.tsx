import React from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Coins, 
  WifiOff, 
  Search, 
  Filter, 
  TreePine,
  Sparkles,
  Users
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRegion: string;
  setSelectedRegion: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  onExploreClick: () => void;
  onOpenMap: () => void;
  onOpenGuidelines: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  onExploreClick,
  onOpenMap,
  onOpenGuidelines
}) => {
  const regions = [
    'Todas as Regiões',
    'Vale do Guaporé (Costa Marques)',
    'Cacoal / T.I. Sete de Setembro',
    'Guajará-Mirim / Costa Marques',
    'São Francisco do Guaporé',
    'Teixeirópolis / Vale do Paraíso',
    'Porto Velho'
  ];

  const categories = [
    { id: 'ALL', label: 'Todas as Experiências' },
    { id: 'CULTURAL', label: 'Vivência Cultural & Indígena' },
    { id: 'HISTORICO', label: 'História & Fortalezas' },
    { id: 'TRILHA', label: 'Trilhas & Cachoeiras' },
    { id: 'FAUNA', label: 'Observação de Fauna & Quelônios' }
  ];

  return (
    <div className="relative bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white overflow-hidden pb-16 pt-10 sm:pt-16">
      
      {/* Background Decorative Foliage & Gradients */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-forest-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-terracotta-500/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centelha 3 Badge and Subtitle */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Programa Centelha 3 Rondônia — Simulado Fase 1</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200 border border-white/10">
            <TreePine className="w-3.5 h-3.5 text-forest-400" />
            <span>Eduardo Renan Souza de Aquino (IFRO)</span>
          </span>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight sm:leading-none text-white">
            Ecoturismo e Turismo de Base Comunitária em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300">
              Rondônia
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed">
            Conectando viajantes conscientes a comunidades tradicionais (indígenas, quilombolas e ribeirinhos) e guias credenciados com tecnologia <strong className="text-emerald-300 font-semibold">Offline-First</strong> e divisão justa de renda (<strong className="text-amber-300 font-semibold">Social Split</strong>).
          </p>
        </div>

        {/* 4 Pillars Grid / Highlights */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3.5 transition-all hover:bg-white/10">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <WifiOff className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Offline-First</span>
            </div>
            <p className="text-xs text-slate-300 font-light">
              Navegação GPS e vouchers QR Code validados sem precisar de sinal de internet.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3.5 transition-all hover:bg-white/10">
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Social Split</span>
            </div>
            <p className="text-xs text-slate-300 font-light">
              Até 65% do valor da reserva vai direto via Pix para a associação comunitária.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3.5 transition-all hover:bg-white/10">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Capacidade Carga</span>
            </div>
            <p className="text-xs text-slate-300 font-light">
              Limite diário rígido de visitantes para impedir a superexploração do território.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3.5 transition-all hover:bg-white/10">
            <div className="flex items-center space-x-2 text-rose-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Curadoria Legal</span>
            </div>
            <p className="text-xs text-slate-300 font-light">
              Roteiros autorizados com FUNAI, ICMBio e guias com registro oficial Cadastur.
            </p>
          </div>
        </div>

        {/* Interactive Search & Filter Card */}
        <div className="mt-8 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-800 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por atração (ex: Forte Príncipe, Paiter Suruí, Trilha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
              />
            </div>

            {/* Region Select */}
            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent bg-white text-slate-700 font-medium"
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg === 'Todas as Regiões' ? '' : reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-3 flex space-x-2">
              <button
                onClick={onExploreClick}
                className="flex-1 bg-forest-800 hover:bg-forest-900 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-forest-900/20 flex items-center justify-center space-x-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar</span>
              </button>

              <button
                onClick={onOpenMap}
                title="Ver Roteiros no Mapa"
                className="bg-forest-100 hover:bg-forest-200 text-forest-900 font-semibold py-2.5 px-3 rounded-xl text-sm transition-colors flex items-center justify-center"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Badges */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Tipo:
            </span>
            {categories.map((cat) => {
              const isSelected = (selectedCategory === '' && cat.id === 'ALL') || selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === 'ALL' ? '' : cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    isSelected
                      ? 'bg-forest-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            <button
              onClick={onOpenGuidelines}
              className="ml-auto text-xs text-forest-700 hover:text-forest-900 font-medium underline underline-offset-2 flex items-center space-x-1"
            >
              <span>Manual de Conduta Ética</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
