
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { IGBase } from '@/types/ig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Import form sections
import { BasicInfoFields } from './IGFormSections/BasicInfoFields';
import { LocationFields } from './IGFormSections/LocationFields';
import { DescriptionFields } from './IGFormSections/DescriptionFields';

// Import custom hook for form logic
import { useIGForm } from '@/hooks/useIGForm';

interface IGFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: IGBase) => void;
  ig: IGBase | null;
  isLoading: boolean;
}

const IGFormDialog: React.FC<IGFormDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  ig,
  isLoading,
}) => {
  const { form, formError, handleSubmit } = useIGForm({ ig, onSave });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{ig ? 'Editar' : 'Criar'} Indicação Geográfica</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da indicação geográfica abaixo.
          </DialogDescription>
        </DialogHeader>

        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInfoFields />
            <LocationFields />
            <DescriptionFields />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !form.formState.isValid}
                className="relative"
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
                {!form.formState.isValid && form.formState.isDirty && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default IGFormDialog;
