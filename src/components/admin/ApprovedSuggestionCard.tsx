
import React from 'react';
import { IGSuggestion } from '@/types/ig';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface ApprovedSuggestionCardProps {
  suggestion: IGSuggestion;
  onViewDetails: () => void;
}

const ApprovedSuggestionCard: React.FC<ApprovedSuggestionCardProps> = ({ suggestion, onViewDetails }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">{suggestion.name}</CardTitle>
          <Badge className="bg-green-500">Aprovada</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">
            {suggestion.location.city}, {suggestion.location.state}
          </span>
        </div>
        <p className="text-sm line-clamp-2">{suggestion.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Aprovada: {formatDate(new Date())}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApprovedSuggestionCard;
