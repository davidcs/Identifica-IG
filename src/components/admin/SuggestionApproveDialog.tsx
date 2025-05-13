
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SuggestionApproveDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SuggestionApproveDialog: React.FC<SuggestionApproveDialogProps> = ({
  open,
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Aprovação</DialogTitle>
        <DialogDescription>
          Você está prestes a aprovar esta sugestão. Ela será adicionada ao mapa como uma IG oficial.
          Tem certeza que deseja continuar?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar Aprovação</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SuggestionApproveDialog;

