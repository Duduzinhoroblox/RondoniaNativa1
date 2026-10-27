import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  MapPin, 
  ShieldCheck, 
  TreePine, 
  Coins, 
  Calendar, 
  Users, 
  Clock, 
  Check, 
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { Experience, CommunityAssociation, Guide, User } from '../types';

interface CreateExperienceModalProps {
  onClose: () => void;
  onSubmitExperience: (newExp: Experience) => void;
  associations: CommunityAssociation[];
  guides: Guide[];
  currentUser: User | null;
}

export const CreateExperienceModal: React.FC<CreateExperienceModalProps> = ({
  onClose,
  onSubmitExperience,
  associations,
  guides,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'CULTURAL' | 'TRILHA' | 'FLUVIAL' | 'FAUNA' | 'HISTORICO'>('TRILHA');
  const [region, setRegion] = useState('Vale do Guaporé (Costa Marques)');
  const [locationName, setLocationName] = useState('Costa Marques / Rio Guaporé - RO');
  const [durationHours, setDurationHours] = useState(8);
  const [difficulty, setDifficulty] = useState<'Leve' | 'Moderado' | 'Desafiador'>('Moderado');
  const [maxCapacityPerDay, setMaxCapacityPerDay] = useState(10);
  const [priceTotal, setPriceTotal] = useState(350);
  const [formError, setFormError] = useState<string | null>(null);

  // Split percentages
  const [communitySplit, setCommunitySplit] = useState(60);
  const [guideSplit, setGuideSplit] = useState(28);
  const platformSplit = Math.max(0, 100 - communitySplit - guideSplit);

  // Compliance
  const [requiresFUNAI, setRequiresFUNAI] = useState(false);
  const [funaiAuthNumber, setFunaiAuthNumber] = useState('');
  const [requiresICMBio, setRequiresICMBio] = useState(true);
  const [icmbioAuthNumber, setIcmbioAuthNumber] = useState('ICMBio-RO-2026/042');

  const [selectedAssocId, setSelectedAssocId] = useState(associations[0]?.id || '');
  const [selectedGuideId, setSelectedGuideId] = useState(guides[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || title.trim().length < 5) {
      setFormError('O título do roteiro deve conter pelo menos 5 caracteres.');
      return;
    }

    if (!subtitle.trim() || subtitle.trim().length < 10) {
      setFormError('O subtítulo resumido deve conter pelo menos 10 caracteres.');
      return;
    }

    if (!description.trim() || description.trim().length < 20) {
      setFormError('A descrição detalhada deve conter pelo menos 20 caracteres.');
      return;
    }

    if (priceTotal <= 0) {
      setFormError('O preço total por turista deve ser maior que zero.');
      return;
    }

    if (maxCapacityPerDay < 2) {
      setFormError('A capacidade de carga diária deve ser de no mínimo 2 participantes.');
      return;
    }

    if (communitySplit < 50) {
      setFormError('Conforme a regra RN04 da plataforma, a associação comunitária deve receber no mínimo 50% do valor total.');
      return;
    }

    if (communitySplit + guideSplit > 100) {
      setFormError('A soma dos percentuais da comunidade e do guia não pode ultrapassar 100%.');
      return;
    }

    const assoc = associations.find(a => a.id === selectedAssocId) || associations[0];
    const guide = guides.find(g => g.id === selectedGuideId) || guides[0];

    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      category,
      region: region.trim(),
      locationName: locationName.trim(),
      latitude: -12.4282 + (Math.random() - 0.5) * 2,
      longitude: -63.7431 + (Math.random() - 0.5) * 2,
      priceTotal,
      durationHours,
      difficulty,
      maxCapacityPerDay,
      currentBookedCount: 0,
      highlights: [
        'Acompanhamento de condutor credenciado Cadastur',
        'Imersão profunda na cultura e biodiversidade de Rondônia',
        'Divisão social transparente de 60%+ para a comunidade local'
      ],
      itinerary: [
        { time: '08:00', title: 'Ponto de Encontro e Briefing', description: 'Recepção e conferência do termo de conduta ética.', location: locationName },
        { time: '10:00', title: 'Atividade de Campo Principal', description: 'Trilha ou navegação interpretativa.', location: 'Área Preservada' },
        { time: '12:30', title: 'Almoço Típico Regional', description: 'Refeição preparada com ingredientes agroecológicos locais.', location: 'Base Comunitária' },
        { time: '16:00', title: 'Roda de Saberes e Encerramento', description: 'Avaliação e retorno.', location: locationName }
      ],
      included: ['Guia Cadastur', 'Almoço regional', 'Taxas de preservação comunitária', 'Seguro ecoturístico'],
      notIncluded: ['Bebidas alcoólicas', 'Transporte aéreo ou rodoviário até a cidade'],
      mandatoryItems: ['Garrafa de água', 'Protetor solar ecológico', 'Calçado fechado de trilha'],
      images: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
      ],
      requiresFUNAI,
      funaiAuthNumber: requiresFUNAI ? funaiAuthNumber : undefined,
      requiresICMBio,
      icmbioAuthNumber: requiresICMBio ? icmbioAuthNumber : undefined,
      cadasturGuideId: guide.id,
      guide,
      associationId: assoc.id,
      association: assoc,
      curatorshipStatus: 'APROVADO',
      curatorshipNotes: 'Roteiro submetido por Guia/Liderança e aprovado no Conselho Territorial.',
      splitPercentages: {
        communityAssociation: communitySplit,
        guide: guideSplit,
        platform: platformSplit
      }
    };

    onSubmitExperience(newExp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-forest-900 text-white">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-emerald-300" />
            <h3 className="font-heading font-bold text-base text-white">
              Cadastrar Novo Roteiro ou Vivência (RF02)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Título do Roteiro</label>
            <input
              type="text"
              required
              placeholder="Ex: Travessia Noturna no Igarapé das Araras"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subtítulo Resumido</label>
            <input
              type="text"
              required
              placeholder="Ex: Canoagem silenciosa sob a copa da floresta primária com condutor nativo."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Detalhada</label>
            <textarea
              rows={3}
              required
              placeholder="Descreva a vivência, o que o turista aprenderá e o contato com a comunidade tradicional..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
            ></textarea>
          </div>

          {/* Category, Region & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="CULTURAL">Vivência Cultural & Indígena</option>
                <option value="TRILHA">Trilha & Cachoeira</option>
                <option value="FLUVIAL">Passeio Fluvial</option>
                <option value="FAUNA">Observação de Fauna</option>
                <option value="HISTORICO">História & Fortalezas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dificuldade</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="Leve">Leve (Caminhada suave)</option>
                <option value="Moderado">Moderado</option>
                <option value="Desafiador">Desafiador (Mata densa)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duração (Horas)</label>
              <input
                type="number"
                min="1"
                max="24"
                value={durationHours}
                onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Região de Rondônia</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ponto de Encontro / Local</label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* Capacity of Load & Price (RF04) */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-amber-700" />
                <span>Capacidade de Carga Diária (Trava RF04)</span>
              </label>
              <input
                type="number"
                min="2"
                max="30"
                value={maxCapacityPerDay}
                onChange={(e) => setMaxCapacityPerDay(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white"
              />
              <span className="text-[10px] text-amber-800">
                Limite máximo de turistas permitido por dia para preservar a comunidade.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 mb-1">
                Preço Total por Turista (R$)
              </label>
              <input
                type="number"
                min="50"
                max="5000"
                value={priceTotal}
                onChange={(e) => setPriceTotal(parseFloat(e.target.value) || 50)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-bold text-forest-800"
              />
            </div>
          </div>

          {/* Social Split Settings (RF06, RN04) */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-forest-950 block flex items-center space-x-1.5">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Configuração da Divisão Social (Split Payment)</span>
            </span>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-300 text-center">
                <label className="block text-[10px] text-slate-500 font-bold uppercase">Associação Local</label>
                <input
                  type="number"
                  min="50"
                  max="80"
                  value={communitySplit}
                  onChange={(e) => setCommunitySplit(parseInt(e.target.value) || 50)}
                  className="w-16 mx-auto text-center font-bold text-forest-800 border rounded"
                /> %
                <span className="block text-[10px] text-emerald-700 mt-1">R$ {(priceTotal * communitySplit / 100).toFixed(0)}</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-amber-300 text-center">
                <label className="block text-[10px] text-slate-500 font-bold uppercase">Guia Cadastur</label>
                <input
                  type="number"
                  min="15"
                  max="40"
                  value={guideSplit}
                  onChange={(e) => setGuideSplit(parseInt(e.target.value) || 15)}
                  className="w-16 mx-auto text-center font-bold text-amber-800 border rounded"
                /> %
                <span className="block text-[10px] text-amber-700 mt-1">R$ {(priceTotal * guideSplit / 100).toFixed(0)}</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-300 text-center">
                <label className="block text-[10px] text-slate-500 font-bold uppercase">Plataforma</label>
                <span className="block text-base font-bold text-slate-700">{platformSplit}%</span>
                <span className="block text-[10px] text-slate-500 mt-1">R$ {(priceTotal * platformSplit / 100).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Legal Compliance & Associations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Comunidade Anfitriã</label>
              <select
                value={selectedAssocId}
                onChange={(e) => setSelectedAssocId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {associations.map((assoc) => (
                  <option key={assoc.id} value={assoc.id}>{assoc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Guia Cadastur Responsável</label>
              <select
                value={selectedGuideId}
                onChange={(e) => setSelectedGuideId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {guides.map((g) => (
                  <option key={g.id} value={g.id}>{g.name} ({g.cadastur.split('/')[0]})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Publicar Roteiro na Plataforma</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
