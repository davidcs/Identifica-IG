
import { IGBase } from '@/types/ig';
import { Style, Icon } from 'ol/style';

export const IGTypeColor = {
  Concedida: '#e74c3c', // Red for Granted IGs
  Potencial: '#3498db', // Blue for Potential IGs
};

export const getMaturityStars = (level: string): string => {
  switch (level) {
    case 'Inicial':
      return '⭐';
    case 'Em desenvolvimento':
      return '⭐⭐';
    case 'Avançado':
      return '⭐⭐⭐⭐';
    case 'Finalizado':
      return '⭐⭐⭐⭐⭐';
    default:
      return '';
  }
};

export const createMarkerStyle = (igType: string): Style => {
  const color = IGTypeColor[igType] || '#666';
  return new Style({
    image: new Icon({
      src: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='14' fill='${color}' stroke='white' stroke-width='2'/></svg>`,
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      scale: 1,
    }),
  });
};
