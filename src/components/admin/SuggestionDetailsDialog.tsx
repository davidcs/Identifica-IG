
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IGSuggestion } from '@/types/ig';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, User } from 'lucide-react';

interface SuggestionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestion: IGSuggestion | null;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const SuggestionDetailsDialog: React.FC<SuggestionDetailsDialogProps> = ({
  open,
  onOpenChange,
  suggestion,
  onApprove,
  onReject,
}) => {
  if (!suggestion) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{suggestion.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            {suggestion.location.city}, {suggestion.location.state}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge
                className={suggestion.type === 'Concedida' ? 'bg-ig-green-600' : 'bg-ig-yellow-500'}
              >
                {suggestion.type}
              </Badge>
              <Badge variant="outline">{suggestion.indicationType}</Badge>
              <Badge variant="outline">{suggestion.productName}</Badge>
              <Badge variant="outline">{suggestion.maturityLevel}</Badge>
              <Badge variant={suggestion.status === 'approved' ? 'default' : suggestion.status === 'rejected' ? 'destructive' : 'secondary'}>
                {suggestion.status === 'approved' ? 'Aprovada' : suggestion.status === 'rejected' ? 'Rejeitada' : 'Pendente'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Descrição</h3>
                <p className="text-gray-700 whitespace-pre-line">{suggestion.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Informações de Localização</h3>
                <p><span className="font-medium">Cidade:</span> {suggestion.location.city}</p>
                <p><span className="font-medium">Estado:</span> {suggestion.location.state}</p>
                <p><span className="font-medium">Latitude:</span> {suggestion.location.latitude}</p>
                <p><span className="font-medium">Longitude:</span> {suggestion.location.longitude}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Especificações Técnicas</h3>
              <p className="text-gray-700 whitespace-pre-line">{suggestion.technicalSpecifications}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Características</h3>
              <p className="text-gray-700 whitespace-pre-line">{suggestion.characteristics}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Estrutura de Controle</h3>
              <p className="text-gray-700 whitespace-pre-line">{suggestion.controlStructure}</p>
            </div>

            {suggestion.observations && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Observações</h3>
                  <p className="text-gray-700 whitespace-pre-line">{suggestion.observations}</p>
                </div>
              </>
            )}

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Informações da Submissão</h3>
              <div className="flex items-center gap-1 text-gray-500">
                <User className="h-4 w-4" />
                <span>Enviado por: Usuário #{suggestion.submittedBy}</span>
              </div>
            </div>

            {suggestion.adminFeedback && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Feedback do Administrador</h3>
                  <p className="text-gray-700 whitespace-pre-line">{suggestion.adminFeedback}</p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          
          <div className="flex gap-2">
            {onReject && suggestion.status === 'pending' && (
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                onClick={() => {
                  onReject(suggestion.id);
                  onOpenChange(false);
                }}
              >
                Rejeitar
              </Button>
            )}
            
            {onApprove && (suggestion.status === 'pending' || suggestion.status === 'rejected') && (
              <Button 
                className="bg-ig-green-600 hover:bg-ig-green-700"
                onClick={() => {
                  onApprove(suggestion.id);
                  onOpenChange(false);
                }}
              >
                Aprovar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionDetailsDialog;
