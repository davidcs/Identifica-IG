
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { IGBase } from '@/types/ig';
import { Button } from './ui/button';

interface IGCardProps {
  ig: IGBase;
  onClick?: () => void;
}

const IGCard: React.FC<IGCardProps> = ({ ig, onClick }) => {
  const defaultImage = '/placeholder.svg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={ig.images?.[0] || defaultImage}
          alt={ig.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <Badge
          className={`absolute top-2 right-2 ${
            ig.type === 'Concedida' ? 'bg-ig-green-600' : 'bg-ig-yellow-500'
          }`}
        >
          {ig.type}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{ig.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin size={14} />
          {ig.location.city}, {ig.location.state}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{ig.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {ig.indicationType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {ig.productName}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {ig.maturityLevel}
          </Badge>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={onClick}
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IGCard;
