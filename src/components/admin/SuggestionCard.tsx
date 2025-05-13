
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, User, CheckCircle, XCircle, Eye } from 'lucide-react';
import { IGSuggestion } from '@/types/ig';

interface SuggestionCardProps {
  suggestion: IGSuggestion;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (suggestion: IGSuggestion) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onApprove, onReject, onViewDetails }) => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle>{suggestion.name}</CardTitle>
      <CardDescription className="flex items-center gap-1">
        <MapPin size={14} />
        {suggestion.location.city}, {suggestion.location.state}
      </CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={suggestion.type === 'Concedida' ? 'default' : 'secondary'}>
          {suggestion.type}
        </Badge>
        <Badge variant="outline">{suggestion.indicationType}</Badge>
        <Badge variant="outline">{suggestion.productName}</Badge>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
        {suggestion.description}
      </p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
        <User size={14} />
        <span>Enviado por: Usuário #{suggestion.submittedBy}</span>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => onViewDetails(suggestion)}
      >
        <Eye size={16} />
        Detalhes
      </Button>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
          onClick={() => onReject(suggestion.id)}
        >
          <XCircle size={16} />
          Rejeitar
        </Button>
        <Button 
          size="sm"
          className="flex items-center gap-1 bg-ig-green-600 hover:bg-ig-green-700"
          onClick={() => onApprove(suggestion.id)}
        >
          <CheckCircle size={16} />
          Aprovar
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default SuggestionCard;
