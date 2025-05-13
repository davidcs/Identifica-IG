
import React from 'react';
import { IGBase } from '@/types/ig';
import { getMaturityStars } from '@/utils/mapUtils';

interface IGPopupContentProps {
  ig: IGBase;
  onViewDetails: (id: string) => void;
}

const IGPopupContent: React.FC<IGPopupContentProps> = ({ ig, onViewDetails }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg" style={{ minWidth: '300px' }}>
      <div className="font-bold text-lg mb-2">{ig.name}</div>
      <div className="grid gap-2">
        <div>
          <span className="font-semibold">Localização:</span>
          <span className="ml-1">{ig.location.city}, {ig.location.state}</span>
        </div>
        <div>
          <span className="font-semibold">Tipo:</span>
          <span className={`ml-1 inline-block px-2 py-1 text-xs rounded ${
            ig.type === 'Concedida' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}>{ig.type}</span>
        </div>
        <div>
          <span className="font-semibold">Maturidade:</span>
          <span className="ml-1">{getMaturityStars(ig.maturityLevel)}</span>
        </div>
        <div>
          <span className="font-semibold">Tipo de Indicação:</span>
          <span className="ml-1">{ig.indicationType}</span>
        </div>
        <div>
          <span className="font-semibold">Produto:</span>
          <span className="ml-1">{ig.productName}</span>
        </div>
        <div className="mt-2">
          <button 
            id="view-details-btn" 
            className="w-full bg-ig-green-600 hover:bg-ig-green-700 text-white py-2 px-4 rounded text-sm"
            onClick={() => onViewDetails(ig.id)}
          >
            Ver detalhes completos
          </button>
        </div>
      </div>
    </div>
  );
};

export default IGPopupContent;
