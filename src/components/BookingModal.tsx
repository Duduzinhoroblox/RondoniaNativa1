import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Coins, 
  QrCode, 
  Check, 
  Copy, 
  Sparkles, 
  AlertCircle,
  FileCheck2,
  ChevronRight,
  ArrowLeft,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Experience, Booking } from '../types';

interface BookingModalProps {
  experience: Experience;
  onClose: () => void;
  onSuccess: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  experience,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Step 1 Form State
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [spotsCount, setSpotsCount] = useState(1);
  const [touristName, setTouristName] = useState('Mariana Vasconcelos');
  const [touristEmail, setTouristEmail] = useState('mariana.vasconcelos@ecotur.com.br');
  const [touristPhone, setTouristPhone] = useState('(69) 99344-9988');
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2 Form State (Ethics Checklist)
  const [ethicsChecked, setEthicsChecked] = useState({
    consent: false,
    zeroWaste: false,
    noHarvesting: false,
    guideFollow: false,
    fairTrade: false
  });

  // Step 3 Payment State
  const [pixCopied, setPixCopied] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Capacity calculations
  const remainingSpots = experience.maxCapacityPerDay - experience.currentBookedCount;
  const isOverCapacity = spotsCount > remainingSpots;

  // Split calculations
  const totalPrice = experience.priceTotal * spotsCount;
  const assocAmount = (totalPrice * experience.splitPercentages.communityAssociation) / 100;
  const guideAmount = (totalPrice * experience.splitPercentages.guide) / 100;
  const platformAmount = (totalPrice * experience.splitPercentages.platform) / 100;

  const allEthicsAccepted = Object.values(ethicsChecked).every(Boolean);

  const handleAdvanceToEthics = () => {
    setStep1Error(null);
    if (!touristName.trim() || touristName.trim().length < 3) {
      setStep1Error('Por favor, informe o nome completo do turista responsável (mínimo de 3 caracteres).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!touristEmail.trim() || !emailRegex.test(touristEmail.trim())) {
      setStep1Error('Por favor, informe um endereço de e-mail válido para envio do voucher.');
      return;
    }

    const digitsOnly = touristPhone.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      setStep1Error('Por favor, informe um telefone/WhatsApp de contato válido com DDD.');
      return;
    }

    if (spotsCount < 1 || isOverCapacity) {
      setStep1Error(`A quantidade de vagas deve estar entre 1 e o limite restante (${remainingSpots}).`);
      return;
    }

    setStep(2);
  };

  const pixCopyPastePayload = `00020126580014BR.GOV.BCB.PIX0136${experience.association.pixKey}520400005303986540${totalPrice.toFixed(2)}5802BR5925Rondonia Nativa TBC6010Porto Velho62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyPastePayload);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const newBooking: Booking = {
        id: `RN-RES-2026-${Math.floor(100 + Math.random() * 900)}`,
        experienceId: experience.id,
        experienceTitle: experience.title,
        touristName,
        touristEmail,
        touristPhone,
        date: selectedDate,
        spotsCount,
        totalPrice,
        voucherHash: `RN-VCH-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${experience.category}`,
        status: 'CONFIRMADA',
        createdAt: new Date().toISOString(),
        splitBreakdown: {
          associationAmount: assocAmount,
          guideAmount: guideAmount,
          platformAmount: platformAmount,
          associationPixKey: experience.association.pixKey,
          guideCadastur: experience.guide.cadastur
        },
        validatedOffline: false,
        ethicsCodeAccepted: true,
        downloadedForOffline: true
      };

      setStep(4);
      onSuccess(newBooking);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Agendamento Seguro & Social Split
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 line-clamp-1">
              {experience.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-forest-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-forest-700 text-white' : 'bg-slate-200'}`}>
              1
            </span>
            <span className="hidden sm:inline">Data & Vagas</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>
          
          <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-forest-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-forest-700 text-white' : 'bg-slate-200'}`}>
              2
            </span>
            <span className="hidden sm:inline">Manual Ético</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>

          <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-forest-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-forest-700 text-white' : 'bg-slate-200'}`}>
              3
            </span>
            <span className="hidden sm:inline">Split & Pix</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>

          <div className={`flex items-center space-x-1.5 ${step === 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>
              ✓
            </span>
            <span className="hidden sm:inline">Voucher GPS</span>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: Date, spots & tourist info */}
          {step === 1 && (
            <div className="space-y-4">
              
              {/* Capacity of Load Warning Banner (RN02) */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-start space-x-3 text-xs text-amber-900">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Trava Inviolável de Capacidade de Carga (RN02):</strong> Para preservar o ecossistema e as comunidades, este roteiro suporta no máximo {experience.maxCapacityPerDay} visitantes/dia. 
                  <span className="font-bold ml-1 text-forest-800">
                    Restam {remainingSpots} vagas disponíveis para agendamento.
                  </span>
                </div>
              </div>

              {/* Date & Spots Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Data da Vivência
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      min="2026-10-21"
                      max="2026-12-31"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Número de Participantes
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max={remainingSpots}
                      value={spotsCount}
                      onChange={(e) => setSpotsCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                  {isOverCapacity && (
                    <p className="text-[11px] text-rose-600 font-medium mt-1">
                      Limite excedido. O máximo permitido é de {remainingSpots} pessoas.
                    </p>
                  )}
                </div>
              </div>

              {/* Tourist Personal Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Dados do Turista Responsável (LGPD Protegido)
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={touristName}
                    onChange={(e) => setTouristName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={touristEmail}
                      onChange={(e) => setTouristEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Telefone</label>
                    <input
                      type="tel"
                      value={touristPhone}
                      onChange={(e) => setTouristPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                </div>
              </div>

              {/* Total Preview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Valor Total ({spotsCount}x R$ {experience.priceTotal.toFixed(2)})</span>
                  <p className="text-xl font-extrabold text-forest-950 font-heading">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right text-xs text-forest-800 font-medium">
                  {experience.splitPercentages.communityAssociation}% direto para a comunidade anfitriã
                </div>
              </div>

              {/* Step 1 Error Banner */}
              {step1Error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{step1Error}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Mandatory Ethical Code Checklist (RF09, RN05) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
                  <FileCheck2 className="w-5 h-5 text-forest-700" />
                  <span>Manual de Conduta Ética e Socioambiental Mandatório (RF09)</span>
                </div>
                <p className="text-xs text-forest-800/90 mt-1">
                  Em conformidade com a <strong>Regra RN05</strong> da plataforma Rondônia Nativa e diretrizes da FUNAI e ICMBio, a confirmação de qualquer reserva exige a leitura e o aceite obrigatório de todos os princípios socioambientais:
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={ethicsChecked.consent}
                    onChange={(e) => setEthicsChecked({ ...ethicsChecked, consent: e.target.checked })}
                    className="mt-0.5 rounded text-forest-700 focus:ring-forest-600"
                  />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">1. Respeito e Consentimento Prévio:</strong>
                    Comprometo-me a não fotografar, filmar ou gravar membros de comunidades indígenas ou mestres quilombolas sem autorização expressa prévia.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={ethicsChecked.zeroWaste}
                    onChange={(e) => setEthicsChecked({ ...ethicsChecked, zeroWaste: e.target.checked })}
                    className="mt-0.5 rounded text-forest-700 focus:ring-forest-600"
                  />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">2. Política Resíduo Zero (Leave No Trace):</strong>
                    Trarei de volta para a cidade todo e qualquer lixo produzido durante a experiência. Não deixarei plástico, cascas ou resíduos na floresta.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={ethicsChecked.noHarvesting}
                    onChange={(e) => setEthicsChecked({ ...ethicsChecked, noHarvesting: e.target.checked })}
                    className="mt-0.5 rounded text-forest-700 focus:ring-forest-600"
                  />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">3. Preservação Total da Fauna e Flora:</strong>
                    Não colherei sementes, flores, orquídeas ou minerais, nem alimentarei ou tocarei em animais silvestres como botos, araras ou quelônios.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={ethicsChecked.guideFollow}
                    onChange={(e) => setEthicsChecked({ ...ethicsChecked, guideFollow: e.target.checked })}
                    className="mt-0.5 rounded text-forest-700 focus:ring-forest-600"
                  />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">4. Subordinação às Regras do Guia Cadastur:</strong>
                    Seguirei rigorosamente as determinações de segurança e rotas definidas pelo condutor credenciado responsável pela expedição.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={ethicsChecked.fairTrade}
                    onChange={(e) => setEthicsChecked({ ...ethicsChecked, fairTrade: e.target.checked })}
                    className="mt-0.5 rounded text-forest-700 focus:ring-forest-600"
                  />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">5. Comércio Justo e Valorização do Artesanato:</strong>
                    Valorizarei a arte tradicional e apoiarei a economia das famílias locais de forma justa e digna.
                  </div>
                </label>
              </div>

              {!allEthicsAccepted && (
                <p className="text-xs text-amber-700 font-medium flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  Marque todos os 5 compromissos éticos para poder avançar para o pagamento.
                </p>
              )}
            </div>
          )}

          {/* STEP 3: Social Split Payment (RF06, RN04) */}
          {step === 3 && (
            <div className="space-y-4">
              
              {/* Split Breakdown Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <span>Divisão Social do Pagamento (Split Automático)</span>
                  </h4>
                  <span className="font-bold text-xs text-forest-800">
                    Total: R$ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-200">
                    <div>
                      <span className="font-bold text-forest-900 block">
                        Associação {experience.association.name} ({experience.splitPercentages.communityAssociation}%)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Chave Pix: {experience.association.pixKey}
                      </span>
                    </div>
                    <span className="text-emerald-700 font-extrabold text-sm">
                      R$ {assocAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200">
                    <div>
                      <span className="font-bold text-amber-900 block">
                        Guia Cadastur: {experience.guide.name} ({experience.splitPercentages.guide}%)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Registro: {experience.guide.cadastur}
                      </span>
                    </div>
                    <span className="text-amber-700 font-extrabold text-sm">
                      R$ {guideAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Taxa Plataforma Rondônia Nativa ({experience.splitPercentages.platform}%)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Infraestrutura offline-first e curadoria legal
                      </span>
                    </div>
                    <span className="text-slate-700 font-extrabold text-sm">
                      R$ {platformAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Pix Simulation */}
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-5 text-center space-y-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pix com Repasse Instantâneo às Subcontas</span>
                </div>

                <div className="flex justify-center py-1">
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
                    <QrCode className="w-28 h-28 text-slate-900" />
                    <span className="text-[10px] text-slate-400 font-mono mt-1">PIX Dinâmico</span>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCopyPastePayload}
                      className="w-full bg-white px-3 py-2 text-[11px] font-mono border border-slate-200 rounded-xl text-slate-500 truncate"
                    />
                    <button
                      onClick={handleCopyPix}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center space-x-1 shrink-0"
                    >
                      {pixCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Success & Voucher Preview */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-2xl text-forest-950">
                  Reserva Confirmada com Sucesso!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  O repasse de <strong>R$ {assocAmount.toFixed(2)}</strong> foi registrado para a <strong>{experience.association.name}</strong>. Seu voucher digital offline foi gerado e salvo no aplicativo.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Agendada:</span>
                  <span className="font-bold text-slate-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Participantes:</span>
                  <span className="font-bold text-slate-900">{spotsCount} pessoa(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guia Cadastur:</span>
                  <span className="font-bold text-slate-900">{experience.guide.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Offline:</span>
                  <span className="font-bold text-emerald-700">✓ Salvo no Dispositivo</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
          ) : (
            <div></div>
          )}

          {step === 1 && (
            <button
              onClick={handleAdvanceToEthics}
              disabled={isOverCapacity}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md ${
                isOverCapacity
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-forest-800 hover:bg-forest-900 text-white shadow-forest-900/20'
              }`}
            >
              <span>Avançar para Manual Ético</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={() => setStep(3)}
              disabled={!allEthicsAccepted}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md ${
                !allEthicsAccepted
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-forest-800 hover:bg-forest-900 text-white shadow-forest-900/20'
              }`}
            >
              <span>Confirmar Aceite & Ver Split</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all flex items-center space-x-2"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processando Split...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Simular Pagamento PIX Concluído</span>
                </>
              )}
            </button>
          )}

          {step === 4 && (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-md transition-all ml-auto"
            >
              Concluir e Ver Meus Vouchers
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
