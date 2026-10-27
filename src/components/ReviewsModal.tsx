import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { Experience, Review, User } from '../types';

interface ReviewsModalProps {
  experience: Experience;
  onClose: () => void;
  onAddReview: (expId: string, review: Review) => void;
  currentUser: User | null;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  experience,
  onClose,
  onAddReview,
  currentUser
}) => {
  const [rating, setRating] = useState(5);
  const [hospitality, setHospitality] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [environmental, setEnvironmental] = useState(5);
  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Default reviews if none exist
  const existingReviews: Review[] = experience.reviews || [
    {
      id: 'rev-1',
      experienceId: experience.id,
      touristName: 'Carolina Braga',
      touristAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      communityHospitalityRating: 5,
      guidePerformanceRating: 5,
      environmentalRespectRating: 5,
      comment: 'Uma das vivências mais profundas da minha vida. O acolhimento pela comunidade foi emocionante e o guia demonstrou um conhecimento milenar sobre os rios e a floresta. Sem falar na tranquilidade de saber que meu dinheiro ficou na aldeia!',
      date: '14 de Outubro de 2026'
    },
    {
      id: 'rev-2',
      experienceId: experience.id,
      touristName: 'Thiago Alencar',
      touristAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      communityHospitalityRating: 5,
      guidePerformanceRating: 5,
      environmentalRespectRating: 5,
      comment: 'O aplicativo funcionou perfeitamente offline na floresta! O guia leu meu QR Code na canoa e não precisei de internet em nenhum momento. Recomendo demais!',
      date: '02 de Outubro de 2026'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = (currentUser?.name || authorName).trim();
    if (!cleanName || cleanName.length < 3) {
      setFormError('Por favor, informe seu nome (mínimo de 3 caracteres).');
      return;
    }

    const cleanComment = comment.trim();
    if (!cleanComment || cleanComment.length < 10) {
      setFormError('Seu comentário deve ter pelo menos 10 caracteres para enriquecer o relato.');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      experienceId: experience.id,
      touristName: cleanName,
      touristAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating,
      communityHospitalityRating: hospitality,
      guidePerformanceRating: guideRating,
      environmentalRespectRating: environmental,
      comment: cleanComment,
      date: 'Hoje'
    };

    onAddReview(experience.id, newRev);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-forest-900 text-white">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
            <h3 className="font-heading font-bold text-base text-white">
              Avaliações & Feedback Sustentável (RF10)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {submitted ? (
            <div className="text-center py-8 space-y-2 text-forest-900 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg">Obrigado pelo seu depoimento!</h4>
              <p className="text-xs text-slate-500">
                Sua avaliação fortalece o turismo de base comunitária em Rondônia.
              </p>
            </div>
          ) : (
            <>
              {/* Form to leave review */}
              <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  Deixe sua avaliação sobre "{experience.title}":
                </span>

                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {!currentUser && (
                  <div>
                    <label className="text-[11px] text-slate-600 font-semibold block mb-1">Seu Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Mariana Vasconcelos"
                      value={authorName}
                      onChange={(e) => {
                        setAuthorName(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Hospitalidade Comunitária</label>
                    <div className="flex space-x-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setHospitality(s)}
                          className={`text-sm ${s <= hospitality ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 block">Atuação do Guia Cadastur</label>
                    <div className="flex space-x-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setGuideRating(s)}
                          className={`text-sm ${s <= guideRating ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Conte como foi sua experiência, o que mais marcou você na floresta..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-forest-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Enviar Avaliação Sustentável
                </button>
              </form>

              {/* Reviews list */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Depoimentos de Ecoturistas Anteriores:
                </span>

                <div className="space-y-2.5">
                  {existingReviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src={rev.touristAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-bold text-xs text-slate-900">{rev.touristName}</span>
                        </div>
                        <div className="flex text-amber-500 text-xs">
                          {'★'.repeat(rev.rating)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "{rev.comment}"
                      </p>
                      <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
