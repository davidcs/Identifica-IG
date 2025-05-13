
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, User, CheckCircle, Eye } from 'lucide-react';
import { IGSuggestion } from '@/types/ig';

interface RejectedSuggestionCardProps {
  suggestion: IGSuggestion;
  onViewDetails: () => void;
  onApprove: (id: string) => void;
}

const RejectedSuggestionCard: React.FC<RejectedSuggestionCardProps> = ({ suggestion, onViewDetails, onApprove }) => (
  <Card className="overflow-hidden border-red-100">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle>{suggestion.name}</CardTitle>
        <Badge variant="destructive">Rejeitada</Badge>
      </div>
      <CardDescription className="flex items-center gap-1">
        <MapPin size={14} />
        {suggestion.location.city}, {suggestion.location.state}
      </CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="outline">{suggestion.type}</Badge>
        <Badge variant="outline">{suggestion.indicationType}</Badge>
        <Badge variant="outline">{suggestion.productName}</Badge>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 mb-2">
        {suggestion.description}
      </p>
      {suggestion.adminFeedback && (
        <div className="mt-3">
          <h4 className="text-xs font-medium text-red-600">Motivo da rejeição:</h4>
          <p className="text-xs text-red-500 italic line-clamp-3">{suggestion.adminFeedback}</p>
        </div>
      )}
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
        onClick={onViewDetails}
      >
        <Eye size={16} />
        Detalhes
      </Button>
      <Button
        size="sm"
        className="flex items-center gap-1 bg-ig-green-600 hover:bg-ig-green-700"
        onClick={() => onApprove(suggestion.id)}
      >
        <CheckCircle size={16} />
        Aprovar
      </Button>
    </CardFooter>
  </Card>
);

export default RejectedSuggestionCard;
