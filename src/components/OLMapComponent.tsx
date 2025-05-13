
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { IGBase } from '@/types/ig';
import { useNavigate } from 'react-router-dom';
import IGMarkersLayer from './map/IGMarkersLayer';
import IGMapInteractions from './map/IGMapInteractions';

interface OLMapComponentProps {
  igs: IGBase[];
  onIGClick?: (id: string) => void;
}

const OLMapComponent: React.FC<OLMapComponentProps> = ({ igs, onIGClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const rasterLayer = new TileLayer({
        source: new OSM(),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [rasterLayer],
        view: new View({
          center: fromLonLat([-53.0, -15.0]), // Brazil (lon, lat)
          zoom: 4,
        }),
      });

      if (popupRef.current) {
        const overlay = new Overlay({
          element: popupRef.current,
          autoPan: true,
          positioning: 'bottom-center',
          stopEvent: true,
          offset: [0, -30],
        });
        overlayRef.current = overlay;
        map.addOverlay(overlay);
      }

      mapInstance.current = map;
    }

    return () => {
      mapInstance.current?.setTarget(undefined);
    };
  }, []);

  const handleIGClick = (id: string) => {
    if (onIGClick) {
      onIGClick(id);
    } else {
      navigate(`/ig/${id}`);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ height: '100%' }} />
      <div ref={popupRef} className="ol-popup z-50" />
      
      <IGMarkersLayer 
        map={mapInstance.current} 
        igs={igs} 
      />
      
      <IGMapInteractions 
        map={mapInstance.current} 
        overlay={overlayRef.current} 
        popupElement={popupRef.current} 
        onIGClick={handleIGClick} 
      />
    </div>
  );
};

export default OLMapComponent;
