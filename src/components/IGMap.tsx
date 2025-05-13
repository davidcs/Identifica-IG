
import React, { useState, useEffect } from 'react';
import { IGBase } from '@/types/ig';
import MapComponent from './MapComponent';
import 'leaflet/dist/leaflet.css';

interface IGMapProps {
  igs: IGBase[];
  onIGClick?: (id: string) => void;
}

const IGMap: React.FC<IGMapProps> = ({ igs, onIGClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!igs || igs.length === 0) {
    return (
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Nenhuma Indicação Geográfica encontrada.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] relative">
      {isClient ? (
        <MapComponent 
          igs={igs} 
          onIGClick={onIGClick}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
          <p>Carregando mapa...</p>
        </div>
      )}
    </div>
  );
};

export default IGMap;
