import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Download, 
  Check, 
  WifiOff, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Experience } from '../types';

interface InteractiveMapProps {
  experiences: Experience[];
  onSelectExperience: (exp: Experience) => void;
  isOffline: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  experiences,
  onSelectExperience,
  isOffline
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isDownloadingTiles, setIsDownloadingTiles] = useState(false);
  const [tilesDownloaded, setTilesDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of Rondônia coordinates
      const map = L.map(mapContainerRef.current, {
        center: [-11.2, -62.8],
        zoom: 7,
        zoomControl: true
      });

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Rondônia Nativa GIS',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Filter experiences
    const filtered = selectedFilter === 'ALL' 
      ? experiences 
      : experiences.filter(e => e.category === selectedFilter);

    // Add custom markers
    filtered.forEach((exp) => {
      // Custom colored icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: #14532d;
            border: 2px solid #4ade80;
            color: white;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            📍
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      const remainingSpots = exp.maxCapacityPerDay - exp.currentBookedCount;

      const marker = L.marker([exp.latitude, exp.longitude], { icon: customIcon }).addTo(map);

      // Popup HTML content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 max-w-[240px] text-slate-800';
      popupContent.innerHTML = `
        <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 2px;">
          ${exp.title}
        </div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
          ${exp.locationName}
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; padding: 4px 6px; background: #f8fafc; border-radius: 6px;">
          <span>Vagas: <strong>${remainingSpots} livres</strong></span>
          <span style="color: #15803d; font-weight: bold;">R$ ${exp.priceTotal.toFixed(2)}</span>
        </div>
        <button id="marker-btn-${exp.id}" style="
          width: 100%;
          background: #15803d;
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 11px;
          border: none;
          cursor: pointer;
        ">
          Ver Vivência Completa
        </button>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`marker-btn-${exp.id}`);
        if (btn) {
          btn.onclick = () => onSelectExperience(exp);
        }
      });

      markersRef.current.push(marker);
    });

  }, [experiences, selectedFilter, onSelectExperience]);

  // Simulate MBTiles package download (RNF02)
  const handleDownloadOfflineTiles = () => {
    setIsDownloadingTiles(true);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloadingTiles(false);
          setTilesDownloaded(true);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Top Controls & Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-100 text-forest-800 border border-forest-200 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Geoprocessamento Territorial (Leaflet & OSM)</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900">
              Mapa Interativo de Ecoturismo de Rondônia
            </h2>
            <p className="text-xs text-slate-500">
              Localização exata de Terras Indígenas homologadas pela FUNAI, Reservas Extrativistas (ICMBio) e Fortalezas Coloniais no Vale do Guaporé.
            </p>
          </div>

          {/* Offline Tile Pack Simulator (RNF01, RNF02) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadOfflineTiles}
              disabled={isDownloadingTiles}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border shadow-sm ${
                tilesDownloaded
                  ? 'bg-emerald-50 text-forest-800 border-emerald-300'
                  : 'bg-forest-800 hover:bg-forest-900 text-white border-transparent'
              }`}
            >
              {tilesDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Pacote MBTiles Rondônia Salvo (42 MB)</span>
                </>
              ) : isDownloadingTiles ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Baixando Ladrilhos ({downloadProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Baixar Mapas Offline da Região</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Camadas:</span>
          </span>
          {[
            { id: 'ALL', label: 'Todos os Roteiros' },
            { id: 'HISTORICO', label: 'Fortaleza & História' },
            { id: 'CULTURAL', label: 'Terras Indígenas (T.I.)' },
            { id: 'TRILHA', label: 'Resex & Trilhas' },
            { id: 'FAUNA', label: 'Santuários de Fauna' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                selectedFilter === cat.id
                  ? 'bg-forest-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Leaflet Container */}
      <div className="relative h-[550px] sm:h-[620px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full"></div>

        {/* Floating Map Legend */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 text-xs max-w-xs space-y-2 hidden sm:block">
          <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
            Legenda Territorial
          </span>
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="w-3 h-3 rounded-full bg-forest-800 border border-emerald-400"></span>
            <span>Roteiro Ecoturístico Cadastrado</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600"></span>
            <span>Terra Indígena Homologada FUNAI</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-700"></span>
            <span>Reserva Extrativista (ICMBio)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
