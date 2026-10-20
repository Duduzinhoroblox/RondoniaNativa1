import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceCard } from './components/ExperienceCard';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { BookingModal } from './components/BookingModal';
import { VoucherModal } from './components/VoucherModal';
import { OfflineGuideScanner } from './components/OfflineGuideScanner';
import { InteractiveMap } from './components/InteractiveMap';
import { DestinationsExplorer } from './components/DestinationsExplorer';
import { CommunityFundDashboard } from './components/CommunityFundDashboard';
import { LegalCuratorshipModal } from './components/LegalCuratorshipModal';
import { EthicalGuidelinesModal } from './components/EthicalGuidelinesModal';
import { CentelhaProjectPitch } from './components/CentelhaProjectPitch';
import { AuthModal } from './components/AuthModal';
import { CreateExperienceModal } from './components/CreateExperienceModal';
import { ReviewsModal } from './components/ReviewsModal';
import { Footer } from './components/Footer';

import { 
  mockExperiences, 
  mockBookings, 
  mockAssociations, 
  mockGuides,
  mockCuratorshipProposals 
} from './data/mockData';
import { 
  Experience, 
  Booking, 
  UserProfile, 
  OfflineValidationLog, 
  CuratorshipProposal,
  User,
  Review
} from './types';

import { 
  Compass, 
  QrCode, 
  Calendar, 
  Users, 
  MapPin, 
  Sparkles, 
  AlertCircle,
  Ticket,
  ChevronRight,
  WifiOff,
  Plus
} from 'lucide-react';

export function App() {
  // Navigation & Profile State
  const [currentView, setCurrentView] = useState('catalog');
  const [activeProfile, setActiveProfile] = useState<UserProfile>('TURISTA');
  const [isOffline, setIsOffline] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rondonia_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Core Data State (persisted in session)
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('rondonia_experiences');
    return saved ? JSON.parse(saved) : mockExperiences;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rondonia_bookings');
    return saved ? JSON.parse(saved) : mockBookings;
  });

  const [offlineLogs, setOfflineLogs] = useState<OfflineValidationLog[]>(() => {
    const saved = localStorage.getItem('rondonia_offline_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'LOG-001',
        voucherHash: 'RN-VCH-391044B-PAITER-SURUI',
        touristName: 'Lucas Vinicius Silveira',
        experienceTitle: 'Vivência Ancestral Paiter Suruí: Saberes e Trilha Etnobotânica',
        validatedAt: '2026-10-20T11:30:15Z',
        latitude: -11.2386,
        longitude: -61.4429,
        syncedToCloud: true,
        guideCadastur: 'RO-26.0112/2023-TUR'
      }
    ];
  });

  const [curatorshipProposals, setCuratorshipProposals] = useState<CuratorshipProposal[]>(() => {
    const saved = localStorage.getItem('rondonia_proposals');
    return saved ? JSON.parse(saved) : mockCuratorshipProposals;
  });

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modals State
  const [detailExperience, setDetailExperience] = useState<Experience | null>(null);
  const [bookingExperience, setBookingExperience] = useState<Experience | null>(null);
  const [activeVoucherModal, setActiveVoucherModal] = useState<Booking | null>(null);
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateExperienceOpen, setIsCreateExperienceOpen] = useState(false);
  const [reviewExperience, setReviewExperience] = useState<Experience | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('rondonia_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('rondonia_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('rondonia_offline_logs', JSON.stringify(offlineLogs));
  }, [offlineLogs]);

  useEffect(() => {
    localStorage.setItem('rondonia_proposals', JSON.stringify(curatorshipProposals));
  }, [curatorshipProposals]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rondonia_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rondonia_current_user');
    }
  }, [currentUser]);

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveProfile(user.role);
    setIsAuthModalOpen(false);

    if (user.role === 'GUIA') setCurrentView('scanner');
    if (user.role === 'LIDERANCA') setCurrentView('split');
    if (user.role === 'ADMIN') setCurrentView('curatorship');
    if (user.role === 'TURISTA') setCurrentView('catalog');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveProfile('TURISTA');
    setCurrentView('catalog');
  };

  // Experience Handlers
  const handleBookingSuccess = (newBooking: Booking) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === newBooking.experienceId) {
        return {
          ...exp,
          currentBookedCount: exp.currentBookedCount + newBooking.spotsCount
        };
      }
      return exp;
    }));

    setBookings(prev => [newBooking, ...prev]);
    setActiveVoucherModal(newBooking);
  };

  const handleCreateExperience = (newExp: Experience) => {
    setExperiences(prev => [newExp, ...prev]);
    setIsCreateExperienceOpen(false);
    setCurrentView('catalog');
  };

  const handleAddReview = (expId: string, review: Review) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) {
        const currentReviews = exp.reviews || [];
        return {
          ...exp,
          reviews: [review, ...currentReviews]
        };
      }
      return exp;
    }));
  };

  const handleValidateBooking = (bookingId: string, gpsLat: number, gpsLng: number) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;

    const timestamp = new Date().toISOString();

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          validatedOffline: true,
          validatedAtTimestamp: timestamp,
          validatedGpsCoordinates: { lat: gpsLat, lng: gpsLng }
        };
      }
      return b;
    }));

    const newLog: OfflineValidationLog = {
      id: `LOG-${Date.now()}`,
      voucherHash: target.voucherHash,
      touristName: target.touristName,
      experienceTitle: target.experienceTitle,
      validatedAt: timestamp,
      latitude: gpsLat,
      longitude: gpsLng,
      syncedToCloud: !isOffline,
      guideCadastur: target.splitBreakdown.guideCadastur
    };

    setOfflineLogs(prev => [newLog, ...prev]);
  };

  const handleSyncAllLogs = () => {
    setOfflineLogs(prev => prev.map(log => ({ ...log, syncedToCloud: true })));
  };

  const handleUpdateCapacity = (experienceId: string, newCapacity: number) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === experienceId) {
        return { ...exp, maxCapacityPerDay: newCapacity };
      }
      return exp;
    }));
  };

  const handleApproveProposal = (proposalId: string) => {
    setCuratorshipProposals(prev => prev.map(p => {
      if (p.id === proposalId) return { ...p, status: 'APROVADO' };
      return p;
    }));
  };

  const handleRejectProposal = (proposalId: string) => {
    setCuratorshipProposals(prev => prev.map(p => {
      if (p.id === proposalId) return { ...p, status: 'REJEITADO' };
      return p;
    }));
  };

  // Filter experiences
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.locationName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = !selectedRegion || exp.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesCategory = !selectedCategory || exp.category === selectedCategory;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  const pendingSyncCount = offlineLogs.filter(l => !l.syncedToCloud).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        offlineQueueCount={pendingSyncCount}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenCreateExperience={() => setIsCreateExperienceOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1">
        
        {/* VIEW 1: CATALOG & VOUCHERS */}
        {currentView === 'catalog' && (
          <div className="space-y-12">
            
            {/* Hero Banner with Filters */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreClick={() => {
                const el = document.getElementById('catalog-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenMap={() => setCurrentView('map')}
              onOpenGuidelines={() => setIsEthicsModalOpen(true)}
            />

            {/* Tourist Active Bookings / Offline Vouchers Drawer */}
            {bookings.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-5 border border-forest-200/80 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <Ticket className="w-5 h-5 text-forest-700" />
                      <h3 className="font-heading font-bold text-base text-slate-900">
                        Meus Vouchers Digitais Offline ({bookings.length})
                      </h3>
                    </div>
                    <span className="text-xs text-forest-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                      <WifiOff className="w-3.5 h-3.5" />
                      <span>Salvos no Dispositivo • Acesso Sem Internet</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        onClick={() => setActiveVoucherModal(booking)}
                        className="p-3.5 rounded-2xl border border-slate-200/90 hover:border-forest-600 hover:bg-forest-50/40 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 block">
                            {booking.voucherHash}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-forest-800 transition-colors">
                            {booking.experienceTitle}
                          </h4>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                            <span>{booking.date}</span>
                            <span>•</span>
                            <span>{booking.spotsCount} pessoa(s)</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-forest-50 text-forest-800 group-hover:bg-forest-800 group-hover:text-white transition-colors shrink-0 ml-2">
                          <QrCode className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Catalog Grid */}
            <div id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    Vivências e Roteiros Homologados
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Mostrando {filteredExperiences.length} experiências sustentáveis com travas de capacidade de carga.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentView('destinations')}
                    className="text-xs font-bold text-forest-800 hover:text-forest-900 underline underline-offset-4"
                  >
                    Ver por Destino / Cidade
                  </button>
                  <button
                    onClick={() => setIsCreateExperienceOpen(true)}
                    className="px-3.5 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Cadastrar Roteiro</span>
                  </button>
                </div>
              </div>

              {filteredExperiences.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                  <Compass className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="font-heading font-bold text-lg text-slate-700">
                    Nenhum roteiro encontrado com esses filtros
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Tente limpar a pesquisa ou selecionar "Todas as Regiões" para ver as vivências em terras indígenas, quilombos e reservas de Rondônia.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('');
                      setSelectedCategory('');
                    }}
                    className="mt-2 px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-bold hover:bg-forest-900 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredExperiences.map((exp) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      onSelect={(e) => setDetailExperience(e)}
                      onBook={(e) => setBookingExperience(e)}
                      onOpenReviews={(e) => setReviewExperience(e)}
                      isOffline={isOffline}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* VIEW 2: DESTINATIONS EXPLORER ("Achar Lugares") */}
        {currentView === 'destinations' && (
          <DestinationsExplorer
            experiences={experiences}
            onSelectExperience={(exp) => setDetailExperience(exp)}
            onOpenMap={() => setCurrentView('map')}
          />
        )}

        {/* VIEW 3: MAP */}
        {currentView === 'map' && (
          <InteractiveMap
            experiences={experiences}
            onSelectExperience={(exp) => setDetailExperience(exp)}
            isOffline={isOffline}
          />
        )}

        {/* VIEW 4: OFFLINE SCANNER */}
        {currentView === 'scanner' && (
          <OfflineGuideScanner
            bookings={bookings}
            onValidateBooking={handleValidateBooking}
            isOffline={isOffline}
            setIsOffline={setIsOffline}
            offlineLogs={offlineLogs}
            onSyncAll={handleSyncAllLogs}
          />
        )}

        {/* VIEW 5: COMMUNITY FUND & SPLIT */}
        {currentView === 'split' && (
          <CommunityFundDashboard
            associations={mockAssociations}
            experiences={experiences}
            onUpdateCapacity={handleUpdateCapacity}
          />
        )}

        {/* VIEW 6: CURATORSHIP & ADMIN */}
        {currentView === 'curatorship' && (
          <LegalCuratorshipModal
            proposals={curatorshipProposals}
            onApproveProposal={handleApproveProposal}
            onRejectProposal={handleRejectProposal}
          />
        )}

        {/* VIEW 7: CENTELHA PITCH & DOSSIER */}
        {currentView === 'centelha' && (
          <CentelhaProjectPitch />
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenGuidelines={() => setIsEthicsModalOpen(true)}
        onOpenCentelha={() => setCurrentView('centelha')}
        onOpenMap={() => setCurrentView('map')}
      />

      {/* MODALS */}
      
      {/* Experience Details */}
      {detailExperience && (
        <ExperienceDetailModal
          experience={detailExperience}
          onClose={() => setDetailExperience(null)}
          onBook={(exp) => {
            setDetailExperience(null);
            setBookingExperience(exp);
          }}
          isOffline={isOffline}
        />
      )}

      {/* Booking & Pix Split Payment Flow */}
      {bookingExperience && (
        <BookingModal
          experience={bookingExperience}
          onClose={() => setBookingExperience(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Digital Voucher Modal */}
      {activeVoucherModal && (
        <VoucherModal
          booking={activeVoucherModal}
          onClose={() => setActiveVoucherModal(null)}
          onOpenScanner={() => setCurrentView('scanner')}
        />
      )}

      {/* Mandatory Ethical Conduct Guidelines Modal */}
      {isEthicsModalOpen && (
        <EthicalGuidelinesModal
          onClose={() => setIsEthicsModalOpen(false)}
        />
      )}

      {/* Authentication & User Register Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Create Experience Modal (RF02) */}
      {isCreateExperienceOpen && (
        <CreateExperienceModal
          onClose={() => setIsCreateExperienceOpen(false)}
          onSubmitExperience={handleCreateExperience}
          associations={mockAssociations}
          guides={mockGuides}
          currentUser={currentUser}
        />
      )}

      {/* Reviews & Sustainable Feedback Modal (RF10) */}
      {reviewExperience && (
        <ReviewsModal
          experience={reviewExperience}
          onClose={() => setReviewExperience(null)}
          onAddReview={handleAddReview}
          currentUser={currentUser}
        />
      )}

    </div>
  );
}
export default App;
