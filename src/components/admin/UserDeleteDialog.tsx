
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string | null;
  onConfirm: () => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({
  open,
  onOpenChange,
  userName,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle>Excluir usuário</DialogTitle>
        </div>
        <DialogDescription className="text-center pt-2">
          {userName ? (
            <>
              Tem certeza que deseja excluir o usuário <strong>{userName}</strong>?
              <br />Esta ação não poderá ser desfeita.
            </>
          ) : (
            <>
              Tem certeza que deseja excluir este usuário?
              <br />Esta ação não poderá ser desfeita.
            </>
          )}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default UserDeleteDialog;
