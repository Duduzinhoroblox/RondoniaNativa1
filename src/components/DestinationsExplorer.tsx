import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Calendar, 
  Car, 
  Ship, 
  Plane, 
  TreePine, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { mockDestinations } from '../data/destinationsData';
import { RondoniaDestination, Experience } from '../types';

interface DestinationsExplorerProps {
  experiences: Experience[];
  onSelectExperience: (exp: Experience) => void;
  onOpenMap: () => void;
}

export const DestinationsExplorer: React.FC<DestinationsExplorerProps> = ({
  experiences,
  onSelectExperience,
  onOpenMap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('ALL');
  const [selectedDestination, setSelectedDestination] = useState<RondoniaDestination>(mockDestinations[0]);

  const filteredDestinations = mockDestinations.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ecosystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.baciaHidrografica.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeason = selectedSeason === 'ALL' || d.seasonType === selectedSeason;

    return matchesSearch && matchesSeason;
  });

  const getRelatedExperiences = (dest: RondoniaDestination) => {
    return experiences.filter(e => dest.relatedExperienceIds.includes(e.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Guia Territorial & Descoberta de Destinos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Explorador de Lugares de Rondônia
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light max-w-2xl leading-relaxed">
            Descubra as joias naturais, territórios indígenas demarcados, fortalezas históricas e comunidades ribeirinhas ao longo das bacias do Guaporé, Madeira e Mamoré, com distâncias e logística de acesso detalhadas.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por município, bacia hidrográfica ou ecossistema (ex: Guaporé, Cacoal, Resex)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400">Época:</span>
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'SECA_PRAIAS', label: 'Praias de Rio (Seca)' },
            { id: 'CHEIA_IGAPO', label: 'Cachoeiras / Igapó' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSeason(s.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedSeason === s.id
                  ? 'bg-forest-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid: Destination Selection on Left, Full Deep-Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Destination List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Destinos Mapeados ({filteredDestinations.length})
          </span>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 group ${
                  selectedDestination.id === dest.id
                    ? 'bg-white border-forest-600 shadow-md ring-2 ring-forest-600/20'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <img
                  src={dest.photos[0]}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1 text-[11px] text-forest-700 font-semibold">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{dest.municipality}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 truncate mt-0.5">
                    {dest.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1 font-mono">
                    <span>{dest.distanceFromPortoVelhoKm} km de Porto Velho</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  selectedDestination.id === dest.id ? 'text-forest-700 translate-x-1' : 'text-slate-300'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Comprehensive Destination Inspector */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Main Hero Photo & Title */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={selectedDestination.photos[0]}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/80 text-white border border-emerald-400 mb-1 inline-block">
                  {selectedDestination.baciaHidrografica}
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {selectedDestination.name}
                </h3>
                <p className="text-xs text-slate-200 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedDestination.municipality}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Distância da Capital</span>
              <span className="font-heading font-bold text-slate-800 text-sm mt-0.5 block">
                {selectedDestination.distanceFromPortoVelhoKm} km
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ecossistema</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate" title={selectedDestination.ecosystem}>
                {selectedDestination.ecosystem}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Regime de Proteção</span>
              <span className="font-bold text-forest-800 text-xs mt-0.5 block truncate" title={selectedDestination.conservationUnitOrIndigenousLand}>
                {selectedDestination.conservationUnitOrIndigenousLand}
              </span>
            </div>
          </div>

          {/* Description & History */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">Sobre este Lugar</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedDestination.description}
            </p>
            <p className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
              <strong className="text-forest-900 block mb-0.5">Contexto Histórico & Cultural:</strong>
              {selectedDestination.historyAndCulture}
            </p>
          </div>

          {/* Logistics & How to Get There */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <Navigation className="w-4 h-4 text-forest-700" />
              <span>Logística & Como Chegar</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                <Car className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Acesso Rodoviário:</strong>
                  <span className="text-slate-600">{selectedDestination.howToGetThere.rodoviario}</span>
                </div>
              </div>

              {selectedDestination.howToGetThere.fluvial && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                  <Ship className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Acesso Fluvial:</strong>
                    <span className="text-slate-600">{selectedDestination.howToGetThere.fluvial}</span>
                  </div>
                </div>
              )}

              {selectedDestination.howToGetThere.aereo && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                  <Plane className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Acesso Aéreo Regional:</strong>
                    <span className="text-slate-600">{selectedDestination.howToGetThere.aereo}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Best Season */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block">Melhor Época para Visitar:</strong>
              <span>{selectedDestination.bestSeason}</span>
            </div>
          </div>

          {/* Related Experiences at this Destination */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              Vivências Homologadas Disponíveis Neste Destino:
            </h4>

            {getRelatedExperiences(selectedDestination).length === 0 ? (
              <p className="text-xs text-slate-400">
                Nenhum roteiro público disponível no momento para este destino.
              </p>
            ) : (
              <div className="space-y-2">
                {getRelatedExperiences(selectedDestination).map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-2xl border border-forest-200 bg-forest-50/40 flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-xs text-forest-950">{exp.title}</h5>
                      <span className="text-[11px] text-slate-500">{exp.durationHours}h de duração • Guia {exp.guide.name}</span>
                    </div>

                    <button
                      onClick={() => onSelectExperience(exp)}
                      className="px-3.5 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1"
                    >
                      <span>Ver Roteiro</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
