
import { useEffect } from 'react';
import { IGBase } from '@/types/ig';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import { createMarkerStyle } from '@/utils/mapUtils';

interface IGMarkersLayerProps {
  map: Map | null;
  igs: IGBase[];
}

const IGMarkersLayer = ({ map, igs }: IGMarkersLayerProps) => {
  useEffect(() => {
    if (!map) return;
    
    console.log("IGs to render on map:", igs.length, igs);
    
    // Remove previous layers
    map.getLayers().forEach((layer, i) => {
      if (i > 0) map.removeLayer(layer);
    });

    const features = igs
      .filter(ig => ig.location && ig.location.latitude && ig.location.longitude)
      .map((ig) => {
        const f = new Feature({
          geometry: new Point(fromLonLat([
            ig.location.longitude,
            ig.location.latitude,
          ])),
          ig,
        });
        
        f.setStyle(createMarkerStyle(ig.type));
        return f;
    });

    const vectorSource = new VectorSource({
      features,
    });

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(markerLayer);
  }, [map, igs]);

  return null; // This is a utility component with no visual output
};

export default IGMarkersLayer;
