import React, { useState } from 'react';
import { 
  Compass, 
  Wifi, 
  WifiOff, 
  User, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  DollarSign, 
  QrCode, 
  Award,
  ChevronDown,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  activeProfile: UserProfile;
  setActiveProfile: (role: UserProfile) => void;
  offlineQueueCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  isOffline,
  setIsOffline,
  activeProfile,
  setActiveProfile,
  offlineQueueCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileLabels: Record<UserProfile, { title: string; subtitle: string; badgeColor: string }> = {
    TURISTA: {
      title: 'Turista Consciente',
      subtitle: 'Explorador Ecoturístico',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    GUIA: {
      title: 'Guia Cadastur',
      subtitle: 'Condutor Credenciado',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    LIDERANCA: {
      title: 'Liderança TBC',
      subtitle: 'Associação Comunitária',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    ADMIN: {
      title: 'Curadoria & Admin',
      subtitle: 'Gestor da Plataforma',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    }
  };

  const navItems = [
    { id: 'catalog', label: 'Roteiros & Vivências', icon: Compass },
    { id: 'map', label: 'Mapa Georreferenciado', icon: MapPin },
    { id: 'scanner', label: 'Validador Offline', icon: QrCode },
    { id: 'split', label: 'Fundo Comunitário & Split', icon: DollarSign },
    { id: 'curatorship', label: 'Curadoria FUNAI/ICMBio', icon: ShieldCheck },
    { id: 'centelha', label: 'Projeto Centelha 3', icon: Award }
  ];

  return (
    <>
      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-900 px-4 py-2 font-medium text-xs sm:text-sm flex items-center justify-between shadow-inner transition-all duration-300">
          <div className="flex items-center space-x-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 text-slate-950 animate-pulse" />
            <span>
              <strong>MODO OFFLINE ATIVADO (Simulação de Floresta):</strong> Navegação com mapas locais e vouchers criptografados com validação GPS autônoma ativa.
            </span>
            {offlineQueueCount > 0 && (
              <span className="bg-slate-900 text-amber-300 text-xs px-2 py-0.5 rounded-full ml-auto font-mono">
                {offlineQueueCount} na fila de sincronização
              </span>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Identity */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setCurrentView('catalog')}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-800 to-forest-600 flex items-center justify-center text-white shadow-md shadow-forest-900/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading font-extrabold text-xl sm:text-2xl text-forest-950 tracking-tight">
                    Rondônia<span className="text-forest-600">Nativa</span>
                  </span>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-forest-800 border border-emerald-200 uppercase tracking-wider">
                    Centelha 3
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Plataforma Integrada de Ecoturismo & Turismo de Base Comunitária
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'text-slate-600 hover:text-forest-900 hover:bg-forest-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Connectivity Switch & Profile Switcher */}
            <div className="flex items-center space-x-3">
              
              {/* Online / Offline Simulator Toggle */}
              <button
                onClick={() => setIsOffline(!isOffline)}
                title={isOffline ? "Alternar para Modo Online (4G/Wi-Fi)" : "Simular Perda de Sinal na Floresta (Modo Offline)"}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isOffline
                    ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                    <span className="hidden sm:inline">Offline (Off-grid)</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Online (4G)</span>
                  </>
                )}
              </button>

              {/* Profile Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${profileLabels[activeProfile].badgeColor}`}
                >
                  <User className="w-3.5 h-3.5" />
                  <div className="text-left hidden sm:block">
                    <span className="block font-bold">{profileLabels[activeProfile].title}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Alternar Visão do Sistema (RF01)
                      </p>
                    </div>
                    {(Object.keys(profileLabels) as UserProfile[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setActiveProfile(role);
                          setProfileDropdownOpen(false);
                          if (role === 'GUIA') setCurrentView('scanner');
                          if (role === 'LIDERANCA') setCurrentView('split');
                          if (role === 'ADMIN') setCurrentView('curatorship');
                          if (role === 'TURISTA') setCurrentView('catalog');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          activeProfile === role ? 'bg-forest-50/70 text-forest-900 font-bold' : 'text-slate-600'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{profileLabels[role].title}</p>
                          <p className="text-[11px] text-slate-400">{profileLabels[role].subtitle}</p>
                        </div>
                        {activeProfile === role && (
                          <div className="w-2 h-2 rounded-full bg-forest-600"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-forest-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Menu de Navegação</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-forest-800 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
