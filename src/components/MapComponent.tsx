
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { IGBase } from '@/types/ig';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Fix Leaflet default icon issues
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Create custom icons for different IG types
const concedidaIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const potencialIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getMaturityStars = (level: string) => {
  switch (level) {
    case 'Inicial':
      return '⭐';
    case 'Em desenvolvimento':
      return '⭐⭐';
    case 'Avançado':
      return '⭐⭐⭐';
    case 'Finalizado':
      return '⭐⭐⭐⭐';
    default:
      return '';
  }
};

interface MapComponentProps {
  igs: IGBase[];
  onIGClick?: (id: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ igs, onIGClick }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    if (onIGClick) {
      onIGClick(id);
    } else {
      navigate(`/ig/${id}`);
    }
  };

  console.log("Rendering map with IGs:", igs.length, igs);

  return (
    <MapContainer
      center={[-15.7801, -47.9292]}
      zoom={4}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-md z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {igs.map((ig) => {
        if (!ig.location || !ig.location.latitude || !ig.location.longitude) {
          console.warn("IG sem localização válida:", ig);
          return null;
        }
        
        return (
          <Marker
            key={ig.id}
            position={[ig.location.latitude, ig.location.longitude]}
            icon={ig.type === 'Concedida' ? concedidaIcon : potencialIcon}
          >
            <Popup>
              <Card className="w-[280px] border-none shadow-none">
                <CardHeader className="p-3 pb-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{ig.name}</CardTitle>
                    <Badge
                      className={ig.type === 'Concedida' ? 'bg-red-500' : 'bg-blue-500'}
                    >
                      {ig.type}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {ig.location.city}, {ig.location.state}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-3 pt-1 pb-1">
                  <p className="text-xs text-gray-700 line-clamp-2">{ig.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {ig.indicationType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {ig.productName}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-semibold">Maturidade: </span>
                    <span className="text-xs">{getMaturityStars(ig.maturityLevel)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 pt-1">
                  <Button 
                    size="sm" 
                    className="w-full text-xs" 
                    onClick={() => handleViewDetails(ig.id)}
                  >
                    Ver detalhes
                  </Button>
                </CardFooter>
              </Card>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
