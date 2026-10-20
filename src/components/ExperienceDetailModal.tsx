import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  TreePine, 
  Coins, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  UserCheck, 
  Download, 
  Check, 
  Calendar,
  Share2,
  Heart
} from 'lucide-react';
import { Experience } from '../types';

interface ExperienceDetailModalProps {
  experience: Experience;
  onClose: () => void;
  onBook: (exp: Experience) => void;
  isOffline: boolean;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  onClose,
  onBook,
  isOffline
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSavedOffline, setIsSavedOffline] = useState(false);

  const remainingSpots = experience.maxCapacityPerDay - experience.currentBookedCount;
  const isSoldOut = remainingSpots <= 0;

  const communityValue = (experience.priceTotal * experience.splitPercentages.communityAssociation) / 100;
  const guideValue = (experience.priceTotal * experience.splitPercentages.guide) / 100;
  const platformValue = (experience.priceTotal * experience.splitPercentages.platform) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-100 text-forest-800 border border-forest-200">
              {experience.category}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Rondônia Nativa • Turismo de Base Comunitária
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSavedOffline(!isSavedOffline)}
              title="Salvar Roteiro Offline"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                isSavedOffline 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isSavedOffline ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Salvo Offline</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar p/ Offline</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Gallery & Main Title */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={experience.images[activeImageIndex]}
                alt={experience.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center space-x-1 text-xs text-emerald-300 font-medium">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{experience.locationName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-1 text-white">
                  {experience.title}
                </h2>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {experience.images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {experience.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-forest-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duração</span>
              <p className="font-heading font-bold text-slate-800 text-sm sm:text-base flex items-center space-x-1 mt-0.5">
                <Clock className="w-4 h-4 text-forest-700" />
                <span>{experience.durationHours} horas</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dificuldade</span>
              <p className="font-heading font-bold text-slate-800 text-sm sm:text-base mt-0.5">
                {experience.difficulty}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Capacidade Carga</span>
              <p className="font-heading font-bold text-forest-700 text-sm sm:text-base flex items-center space-x-1 mt-0.5">
                <Users className="w-4 h-4 text-forest-700" />
                <span>Max {experience.maxCapacityPerDay} pessoas/dia</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vagas Restantes</span>
              <p className={`font-heading font-bold text-sm sm:text-base mt-0.5 ${remainingSpots <= 2 ? 'text-amber-600' : 'text-slate-800'}`}>
                {remainingSpots} vagas livres
              </p>
            </div>
          </div>

          {/* Legal Compliance Banner (RF03, RN03) */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-forest-700 shrink-0" />
                <span>Conformidade Legal & Territorial Verificada</span>
              </div>
              <p className="text-xs text-forest-800/90 mt-1">
                {experience.curatorshipNotes}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {experience.requiresFUNAI && (
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg">
                  FUNAI: {experience.funaiAuthNumber}
                </span>
              )}
              {experience.requiresICMBio && (
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg">
                  ICMBio: {experience.icmbioAuthNumber}
                </span>
              )}
              <span className="text-[11px] font-bold bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg">
                Cadastur: {experience.guide.cadastur}
              </span>
            </div>
          </div>

          {/* Social Split Transparency Box (RF06, RN04) */}
          <div className="border-2 border-emerald-900/10 bg-gradient-to-br from-emerald-50/50 to-amber-50/30 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h4 className="font-heading font-bold text-forest-950 text-base">
                  Transparência do Pagamento Social Split
                </h4>
              </div>
              <span className="text-xs font-bold text-forest-800 bg-white px-2.5 py-1 rounded-full border border-forest-200">
                Total: R$ {experience.priceTotal.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Ao reservar pela Rondônia Nativa, a divisão do seu pagamento é realizada instantaneamente via tecnologia de subcontas bancárias, garantindo repasse direto para as famílias e conservação:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-forest-800">
                  <span>Associação Local ({experience.splitPercentages.communityAssociation}%)</span>
                  <span className="text-emerald-700">R$ {communityValue.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Destinado ao Fundo Comunitário de {experience.association.name} para projetos de preservação e bem-estar social.
                </p>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Pix: {experience.association.pixKey}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>Guia Cadastur ({experience.splitPercentages.guide}%)</span>
                  <span className="text-amber-700">R$ {guideValue.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Remuneração justa do condutor profissional {experience.guide.name}.
                </p>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Registro: {experience.guide.cadastur}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Rondônia Nativa ({experience.splitPercentages.platform}%)</span>
                  <span className="text-slate-600">R$ {platformValue.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Manutenção da infraestrutura tecnológica offline-first, servidores e curadoria territorial.
                </p>
              </div>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-slate-900">Sobre esta Vivência</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {experience.description}
            </p>

            <div className="mt-4">
              <h5 className="font-bold text-sm text-slate-900 mb-2">Destaques da Experiência:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experience.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Timeline / Itinerary */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg text-slate-900">Roteiro e Cronograma de Campo</h4>
            <div className="relative pl-6 border-l-2 border-forest-200 space-y-4">
              {experience.itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-forest-700 border-4 border-white shadow-sm"></div>
                  <div>
                    <span className="inline-block text-xs font-extrabold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-md border border-forest-200">
                      {item.time}
                    </span>
                    <h5 className="font-bold text-sm text-slate-900 mt-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included / Not Included & Mandatory Safety Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-forest-900 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>O Que Está Incluso</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {experience.included.map((inc, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Itens Obrigatórios para a Trilha</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {experience.mandatoryItems.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guide & Association Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Guide Profile */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-3">
              <img
                src={experience.guide.avatarUrl}
                alt={experience.guide.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-forest-600"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Guia Credenciado Cadastur
                </span>
                <h5 className="font-bold text-sm text-slate-900">{experience.guide.name}</h5>
                <p className="text-xs text-slate-600 line-clamp-1">{experience.guide.specialty}</p>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                  <span className="text-amber-600 font-bold">★ {experience.guide.rating}</span>
                  <span>•</span>
                  <span>{experience.guide.totalExpeditions} expedições</span>
                </div>
              </div>
            </div>

            {/* Association Profile */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-3">
              <img
                src={experience.association.logoUrl}
                alt={experience.association.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-600"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Comunidade Tradicional Anfitriã
                </span>
                <h5 className="font-bold text-sm text-slate-900 line-clamp-1">{experience.association.name}</h5>
                <p className="text-xs text-slate-600">{experience.association.location}</p>
                <div className="text-[11px] text-forest-700 font-medium mt-1">
                  Liderança: {experience.association.leaderName}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer / CTA Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block">
              Valor por participante
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-forest-950 font-heading">
                R$ {experience.priceTotal.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                (Com 60%+ destinado diretamente à comunidade)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Voltar
            </button>

            <button
              onClick={() => {
                onClose();
                onBook(experience);
              }}
              disabled={isSoldOut}
              className={`px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center space-x-2 ${
                isSoldOut
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-forest-800 hover:bg-forest-900 text-white shadow-forest-900/20 hover:scale-102'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{isSoldOut ? 'Capacidade Esgotada' : 'Avançar para Reserva'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
