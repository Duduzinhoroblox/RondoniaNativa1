import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Coins, 
  ChevronRight, 
  Download, 
  Check, 
  Sparkles,
  TreePine,
  AlertCircle,
  Star
} from 'lucide-react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  onSelect: (exp: Experience) => void;
  onBook: (exp: Experience) => void;
  onOpenReviews?: (exp: Experience) => void;
  isOffline: boolean;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onSelect,
  onBook,
  onOpenReviews,
  isOffline
}) => {
  const [downloadedOffline, setDownloadedOffline] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Capacity calculations
  const remainingSpots = experience.maxCapacityPerDay - experience.currentBookedCount;
  const capacityPercent = Math.round((experience.currentBookedCount / experience.maxCapacityPerDay) * 100);
  const isNearLimit = remainingSpots <= 2 && remainingSpots > 0;
  const isSoldOut = remainingSpots <= 0;

  // Split calculations
  const communityValue = (experience.priceTotal * experience.splitPercentages.communityAssociation) / 100;
  const guideValue = (experience.priceTotal * experience.splitPercentages.guide) / 100;

  const handleDownloadOffline = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadedOffline(true);
    }, 800);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'CULTURAL': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'HISTORICO': return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'TRILHA': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'FAUNA': return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div 
      onClick={() => onSelect(experience)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-forest-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image & Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border backdrop-blur-md shadow-sm ${getCategoryColor(experience.category)}`}>
            {experience.category}
          </span>

          <div className="flex items-center space-x-1.5">
            {/* Reviews Trigger */}
            {onOpenReviews && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenReviews(experience);
                }}
                title="Ver avaliações da vivência"
                className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-amber-900 flex items-center space-x-1 hover:bg-white transition-all shadow-sm"
              >
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>4.9</span>
              </button>
            )}

            {/* Offline Guide Button */}
            <button
              onClick={handleDownloadOffline}
              title={downloadedOffline ? "Guia e mapa salvos localmente" : "Baixar pacote do roteiro para uso offline"}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
                downloadedOffline
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/80 text-slate-800 hover:bg-white'
              }`}
            >
              {isDownloading ? (
                <span className="w-4 h-4 border-2 border-forest-800 border-t-transparent rounded-full animate-spin block"></span>
              ) : downloadedOffline ? (
                <Check className="w-4 h-4" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Details on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center space-x-1 text-xs text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{experience.locationName}</span>
          </div>
          <h3 className="font-heading font-bold text-lg leading-snug line-clamp-1 mt-0.5 text-white group-hover:text-emerald-300 transition-colors">
            {experience.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Subtitle & Specs */}
        <div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {experience.subtitle}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{experience.durationHours}h duração</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>Dificuldade: <strong className="text-slate-700">{experience.difficulty}</strong></span>
          </div>
        </div>

        {/* Capacity of Load Progress (RF04) */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-forest-700" />
              <span>Capacidade de Carga Diária:</span>
            </span>
            <span className={`font-bold ${isSoldOut ? 'text-rose-600' : isNearLimit ? 'text-amber-600' : 'text-forest-700'}`}>
              {experience.currentBookedCount} / {experience.maxCapacityPerDay} vagas ({capacityPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isSoldOut ? 'bg-rose-500' : isNearLimit ? 'bg-amber-500' : 'bg-forest-600'
              }`}
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            ></div>
          </div>

          {isNearLimit && !isSoldOut && (
            <p className="text-[10px] text-amber-700 font-medium mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Restam apenas {remainingSpots} vagas para preservar o ecossistema local.
            </p>
          )}
        </div>

        {/* Social Split Preview (RF06, RN04) */}
        <div className="border border-emerald-900/10 bg-emerald-50/50 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-xs text-forest-900 font-semibold mb-1">
            <span className="flex items-center space-x-1">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>Divisão Social do Valor (Split):</span>
            </span>
            <span className="text-[11px] text-forest-700">Automático</span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-center text-[10px] font-medium pt-1">
            <div className="bg-white/80 p-1 rounded-md border border-emerald-200/50">
              <span className="block font-bold text-forest-800">{experience.splitPercentages.communityAssociation}%</span>
              <span className="text-slate-500 block truncate" title="Associação Comunitária">Associação</span>
              <span className="text-emerald-700 font-semibold text-[9px]">R$ {communityValue.toFixed(0)}</span>
            </div>
            <div className="bg-white/80 p-1 rounded-md border border-amber-200/50">
              <span className="block font-bold text-amber-800">{experience.splitPercentages.guide}%</span>
              <span className="text-slate-500 block truncate" title="Guia Credenciado">Guia Cadastur</span>
              <span className="text-amber-700 font-semibold text-[9px]">R$ {guideValue.toFixed(0)}</span>
            </div>
            <div className="bg-white/80 p-1 rounded-md border border-slate-200/50">
              <span className="block font-bold text-slate-700">{experience.splitPercentages.platform}%</span>
              <span className="text-slate-500 block truncate" title="Plataforma">Tecnologia</span>
              <span className="text-slate-600 font-semibold text-[9px]">R$ {(experience.priceTotal * experience.splitPercentages.platform / 100).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Legal Seals & Authorizations (RF03) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {experience.requiresFUNAI && (
            <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              <span>FUNAI Deferido</span>
            </span>
          )}
          {experience.requiresICMBio && (
            <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full">
              <TreePine className="w-3 h-3 text-emerald-600" />
              <span>ICMBio Resex</span>
            </span>
          )}
          <span className="inline-flex items-center space-x-1 text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full">
            <span>Cadastur: {experience.guide.cadastur.split('/')[0]}</span>
          </span>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Investimento
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-forest-950 font-heading">
                R$ {experience.priceTotal.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-500">/pessoa</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBook(experience);
              }}
              disabled={isSoldOut}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1 ${
                isSoldOut
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-forest-800 hover:bg-forest-900 text-white shadow-forest-900/10'
              }`}
            >
              <span>{isSoldOut ? 'Esgotado' : 'Reservar'}</span>
              {!isSoldOut && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
