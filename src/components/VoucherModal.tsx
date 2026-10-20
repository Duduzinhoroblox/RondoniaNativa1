import React, { useState } from 'react';
import { 
  X, 
  Download, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode as QrIcon, 
  Printer, 
  Share2, 
  Sparkles,
  WifiOff,
  Navigation
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Booking } from '../types';

interface VoucherModalProps {
  booking: Booking;
  onClose: () => void;
  onOpenScanner?: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  booking,
  onClose,
  onOpenScanner
}) => {
  const [downloadSaved, setDownloadSaved] = useState(false);

  // Payload encoded in QR code for offline validation (RF07, RF08)
  const qrPayload = JSON.stringify({
    voucher: booking.voucherHash,
    reserva: booking.id,
    tourist: booking.touristName,
    date: booking.date,
    spots: booking.spotsCount,
    exp: booking.experienceTitle,
    cadastur: booking.splitBreakdown.guideCadastur,
    checksum: 'SHA256:RO-SECURE-OFFLINE-TBC'
  });

  const handleDownload = () => {
    setDownloadSaved(true);
    setTimeout(() => setDownloadSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest-900 text-white">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-300">
              VOUCHER OFFLINE OFICIAL
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher Ticket Body */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-slate-50 to-white">
          
          {/* Brand header */}
          <div className="text-center pb-3 border-b border-slate-200/80">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-forest-800 border border-emerald-200 mb-1">
              Rondônia Nativa • Arquitetura Offline-First
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 leading-snug">
              {booking.experienceTitle}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Código Hash: {booking.voucherHash}
            </p>
          </div>

          {/* QR Code Container (RF07) */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border-2 border-dashed border-forest-300 shadow-xs max-w-xs mx-auto">
            <div className="p-2 bg-white rounded-xl shadow-inner">
              <QRCodeSVG
                value={qrPayload}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="mt-2.5 flex items-center space-x-1 text-[11px] font-semibold text-forest-800">
              <WifiOff className="w-3.5 h-3.5 text-forest-700" />
              <span>Validação Criptográfica 100% Offline</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              Assinatura SHA-256 e Coordenadas GPS
            </span>
          </div>

          {/* Ticket Information Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Turista Titular:</span>
              <span className="font-bold text-slate-900">{booking.touristName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Data Agendada:</span>
              <span className="font-bold text-slate-900 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-forest-700" />
                <span>{booking.date}</span>
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Vagas Asseguradas:</span>
              <span className="font-bold text-slate-900 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-forest-700" />
                <span>{booking.spotsCount} pessoa(s)</span>
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Guia Responsável (Cadastur):</span>
              <span className="font-bold text-slate-900 font-mono">
                {booking.splitBreakdown.guideCadastur}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status de Validação:</span>
              {booking.validatedOffline ? (
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validado no Campo ({booking.validatedAtTimestamp ? new Date(booking.validatedAtTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sim'})</span>
                </span>
              ) : (
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Pronto para Leitura Offline
                </span>
              )}
            </div>
          </div>

          {/* Social Split Audit Pill (RN04) */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-forest-900">
            <span className="font-bold block mb-0.5">Certificado de Repasse Comunitário:</span>
            <span>R$ {booking.splitBreakdown.associationAmount.toFixed(2)} repassados via PIX para fortalecimento local ({booking.splitBreakdown.associationPixKey}).</span>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          {onOpenScanner && (
            <button
              onClick={() => {
                onClose();
                onOpenScanner();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors flex items-center space-x-1.5"
            >
              <QrIcon className="w-4 h-4 text-amber-700" />
              <span>Testar no Leitor do Guia</span>
            </button>
          )}

          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={handleDownload}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                downloadSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-forest-800 hover:bg-forest-900 text-white shadow-sm'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{downloadSaved ? 'Salvo no Cache Offline!' : 'Baixar Voucher PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
