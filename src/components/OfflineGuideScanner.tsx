import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  WifiOff, 
  Wifi, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  HardDrive, 
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Booking, OfflineValidationLog } from '../types';

interface OfflineGuideScannerProps {
  bookings: Booking[];
  onValidateBooking: (bookingId: string, gpsLat: number, gpsLng: number) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  offlineLogs: OfflineValidationLog[];
  onSyncAll: () => void;
}

export const OfflineGuideScanner: React.FC<OfflineGuideScannerProps> = ({
  bookings,
  onValidateBooking,
  isOffline,
  setIsOffline,
  offlineLogs,
  onSyncAll
}) => {
  const [selectedVoucherHash, setSelectedVoucherHash] = useState('');
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [currentGps, setCurrentGps] = useState<{ lat: number; lng: number }>({
    lat: -12.4282, // Costa Marques / Rio Guaporé coordinates
    lng: -64.4239
  });
  const [isReadingGps, setIsReadingGps] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    booking?: Booking;
  } | null>(null);

  // Read device GPS coordinates if supported, fallback to Guaporé
  const fetchDeviceGps = () => {
    setIsReadingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentGps({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4))
          });
          setIsReadingGps(false);
        },
        () => {
          // Fallback to Guaporé GPS
          setCurrentGps({ lat: -12.4282, lng: -64.4239 });
          setIsReadingGps(false);
        },
        { timeout: 4000 }
      );
    } else {
      setIsReadingGps(false);
    }
  };

  useEffect(() => {
    fetchDeviceGps();
  }, []);

  const handleValidate = (hashToValidate: string) => {
    const cleanHash = hashToValidate.trim();
    if (!cleanHash) {
      setValidationResult({
        success: false,
        message: 'Por favor, digite o código de hash do voucher ou selecione um ingresso da lista de teste.'
      });
      return;
    }

    const found = bookings.find(b => b.voucherHash.toLowerCase() === cleanHash.toLowerCase());

    if (!found) {
      setValidationResult({
        success: false,
        message: 'Código de voucher não encontrado no banco local (SQLite/WatermelonDB).'
      });
      return;
    }

    if (found.validatedOffline) {
      setValidationResult({
        success: false,
        message: `Atenção: Este voucher já foi validado em campo às ${new Date(found.validatedAtTimestamp || '').toLocaleTimeString()} por GPS.`,
        booking: found
      });
      return;
    }

    // Execute offline validation
    onValidateBooking(found.id, currentGps.lat, currentGps.lng);

    setValidationResult({
      success: true,
      message: `Voucher autenticado com sucesso em modo off-grid! Registro gravado localmente com coordenadas GPS.`,
      booking: found
    });

    setManualCodeInput('');
  };

  const pendingSyncLogs = offlineLogs.filter(l => !l.syncedToCloud);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-700/80 text-emerald-300 border border-emerald-500/30 mb-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Módulo de Campo do Guia (RF08 & RNF01)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Validador de Vouchers Offline por GPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
              Permite aos Guias de Turismo com Cadastur validar a entrada de visitantes no coração da floresta, mesmo com 0% de conectividade de dados móveis ou Wi-Fi.
            </p>
          </div>

          {/* Quick Network Status in Guia Panel */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Conexão Atual:</span>
            <div className="flex items-center space-x-2 mt-1">
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                  isOffline
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-emerald-600 text-white border-emerald-500'
                }`}
              >
                {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                <span>{isOffline ? 'Off-Grid (Floresta)' : 'Online (4G / Wi-Fi)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scanner & Quick Test */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-forest-700" />
              <h3 className="font-heading font-bold text-base text-slate-900">
                Leitor / Scanner de Voucher
              </h3>
            </div>

            {/* GPS Indicator */}
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
              <MapPin className="w-3.5 h-3.5 text-forest-700" />
              <span>
                {isReadingGps ? 'Lendo GPS...' : `${currentGps.lat}, ${currentGps.lng}`}
              </span>
            </div>
          </div>

          {/* Camera Simulation Viewfinder */}
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white border-4 border-slate-900">
            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-400"></div>

            {/* Laser scan line animation */}
            <div className="w-48 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse"></div>

            <QrCode className="w-20 h-20 text-slate-700 mt-3 opacity-60" />
            <span className="text-xs text-slate-300 font-mono mt-2">
              Aponte para o QR Code do Turista
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 mt-1">
              Descriptografia local ativa (AES-256)
            </span>
          </div>

          {/* Manual Voucher Input Simulation */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Ou digite o Código / Hash do Voucher:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ex: RN-VCH-849204A-GUAPORE-SECURE"
                value={manualCodeInput}
                onChange={(e) => setManualCodeInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
              />
              <button
                onClick={() => handleValidate(manualCodeInput)}
                className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Validar
              </button>
            </div>
          </div>

          {/* Quick Simulation Select */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Simular Leitura de Ingressos Cadastrados no Banco Local:
            </span>
            <div className="space-y-1.5">
              {bookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => handleValidate(booking.voucherHash)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-forest-300 hover:bg-forest-50/50 transition-all flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 block">{booking.touristName}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{booking.experienceTitle}</span>
                  </div>
                  <div className="text-right shrink-0">
                    {booking.validatedOffline ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                        ✓ Validado
                      </span>
                    ) : (
                      <span className="text-forest-800 font-bold bg-forest-50 px-2 py-0.5 rounded-md border border-forest-200 text-[10px]">
                        Testar Leitura
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Validation Feedback Message */}
          {validationResult && (
            <div className={`p-4 rounded-2xl border text-xs animate-fadeIn ${
              validationResult.success 
                ? 'bg-emerald-50 border-emerald-200 text-forest-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-start space-x-2">
                {validationResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block text-sm font-bold">
                    {validationResult.success ? 'Validação Aprovada!' : 'Aviso de Validação'}
                  </strong>
                  <p className="mt-0.5">{validationResult.message}</p>
                  
                  {validationResult.booking && (
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 font-mono text-[11px] space-y-0.5">
                      <div>Turista: {validationResult.booking.touristName} ({validationResult.booking.spotsCount} pessoas)</div>
                      <div>Roteiro: {validationResult.booking.experienceTitle}</div>
                      <div>GPS Registrado: {currentGps.lat}, {currentGps.lng}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sync Queue & Offline Logs (RNF05) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Deferred Sync Box (RNF05) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5 text-forest-700" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Fila de Sincronização Diferida
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                pendingSyncLogs.length > 0 
                  ? 'bg-amber-100 text-amber-800 animate-pulse' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {pendingSyncLogs.length} pendente(s)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Os registros de validação em campo são gravados com assinatura criptográfica no banco local (SQLite). Assim que o dispositivo restabelecer conexão (4G ou Wi-Fi comunitário), a sincronização é disparada sem duplicidade de dados.
            </p>

            <button
              onClick={onSyncAll}
              disabled={pendingSyncLogs.length === 0 || isOffline}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                isOffline
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : pendingSyncLogs.length > 0
                    ? 'bg-forest-800 hover:bg-forest-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>
                {isOffline 
                  ? 'Conecte-se para Sincronizar' 
                  : pendingSyncLogs.length > 0 
                    ? `Sincronizar ${pendingSyncLogs.length} Registro(s) com a Nuvem` 
                    : 'Banco Totalmente Sincronizado'}
              </span>
            </button>
          </div>

          {/* Validation History Logs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-forest-700" />
              <span>Histórico de Validações de Campo</span>
            </h4>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {offlineLogs.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  Nenhuma validação registrada hoje.
                </p>
              ) : (
                offlineLogs.map((log) => (
                  <div 
                    key={log.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{log.touristName}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        log.syncedToCloud 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.syncedToCloud ? 'Sincronizado' : 'Gravado Local'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {log.experienceTitle}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                      <span>{new Date(log.validatedAt).toLocaleTimeString()}</span>
                      <span>GPS: {log.latitude}, {log.longitude}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
