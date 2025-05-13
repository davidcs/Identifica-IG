
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface SuggestionRejectDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}

const SuggestionRejectDialog: React.FC<SuggestionRejectDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  feedback,
  setFeedback,
}) => (
  <Dialog open={open} onOpenChange={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rejeitar Sugestão</DialogTitle>
        <DialogDescription>
          Por favor, forneça um feedback explicando o motivo da rejeição.
          Este feedback será visível para o usuário que enviou a sugestão.
        </DialogDescription>
      </DialogHeader>
      <Textarea
        placeholder="Escreva o motivo da rejeição..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="min-h-[100px]"
      />
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button variant="destructive" onClick={onConfirm} disabled={!feedback.trim()}>
          Rejeitar Sugestão
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SuggestionRejectDialog;

