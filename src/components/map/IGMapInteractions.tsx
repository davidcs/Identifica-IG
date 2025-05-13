
import { useEffect } from 'react';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import ReactDOM from 'react-dom';
import IGPopupContent from './IGPopupContent';

interface IGMapInteractionsProps {
  map: Map | null;
  overlay: Overlay | null;
  popupElement: HTMLDivElement | null;
  onIGClick?: (id: string) => void;
}

const IGMapInteractions = ({ map, overlay, popupElement, onIGClick }: IGMapInteractionsProps) => {
  useEffect(() => {
    if (!map || !overlay || !popupElement) return;

    const handleMapClick = (evt: any) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feat: any) => feat);
      
      if (feature) {
        const ig = feature.get('ig');
        
        if (popupElement) {
          // Clear previous content
          while (popupElement.firstChild) {
            popupElement.removeChild(popupElement.firstChild);
          }
          
          // Create temporary container for React component
          const container = document.createElement('div');
          ReactDOM.render(
            <IGPopupContent 
              ig={ig} 
              onViewDetails={(id) => {
                if (onIGClick) {
                  onIGClick(id);
                }
              }} 
            />, 
            container
          );
          
          // Append the rendered content to popupElement
          popupElement.appendChild(container.firstChild!);
          overlay.setPosition(feature.getGeometry().getCoordinates());
        }
      } else {
        overlay.setPosition(undefined);
      }
    };

    const handlePointerMove = (evt: any) => {
      if (evt.dragging) {
        overlay.setPosition(undefined);
      }
    };
    
    map.on('singleclick', handleMapClick);
    map.on('pointermove', handlePointerMove);
    
    return () => {
      map.un('singleclick', handleMapClick);
      map.un('pointermove', handlePointerMove);
    };
  }, [map, overlay, popupElement, onIGClick]);
  
  return null; // This is a utility component with no visual output
};

export default IGMapInteractions;
