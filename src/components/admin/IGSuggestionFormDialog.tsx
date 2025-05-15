import React, { useEffect, useState, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IGSuggestion, IGIndicationType, IGMaturityLevel, IGType } from '@/types/ig';

interface IGSuggestionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestion: IGSuggestion | null;
  isLoading: boolean;
  onSave: (suggestion: IGSuggestion) => void;
}

const IGSuggestionFormDialog: React.FC<IGSuggestionFormDialogProps> = ({
  open,
  onOpenChange,
  suggestion,
  isLoading,
  onSave,
}) => {
  const [formData, setFormData] = useState<IGSuggestion | null>(suggestion);

  useEffect(() => {
    setFormData(suggestion);
  }, [suggestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  const handleJsonChange = (e: ChangeEvent<HTMLTextAreaElement>, field: keyof IGSuggestion) => {
    if (!formData) return;
    try {
      const parsed = JSON.parse(e.target.value);
      setFormData({ ...formData, [field]: parsed });
    } catch {
      console.error(`Erro no JSON do campo ${field}`);
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Sugestão de Indicação Geográfica</DialogTitle>
          <DialogDescription>Preencha os detalhes da sugestão abaixo.</DialogDescription>
        </DialogHeader>

        {/* Informações Básicas */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Informações Básicas</h2>

          <div>
            <Label htmlFor="name">Nome da Indicação Geográfica*</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Café do Cerrado Mineiro" required />
          </div>

          <div>
            <Label htmlFor="description">Descrição*</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="História, importância e características" className="min-h-[100px]" required />
          </div>

          <div>
            <Label>Tipo*</Label>
            <RadioGroup value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as IGType })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Concedida" id="concedida" />
                <Label htmlFor="concedida">Concedida - Oficialmente reconhecida</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Potencial" id="potencial" />
                <Label htmlFor="potencial">Potencial - Em estruturação</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Tipo de Indicação*</Label>
            <RadioGroup value={formData.indicationType} onValueChange={(value) => setFormData({ ...formData, indicationType: value as IGIndicationType })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Procedência" id="procedencia" />
                <Label htmlFor="procedencia">Indicação de Procedência</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Denominação de Origem" id="denominacao" />
                <Label htmlFor="denominacao">Denominação de Origem</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Localização */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Localização</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Cidade*</Label>
              <Input id="city" name="city" value={formData.location?.city || ''} onChange={handleLocationChange} placeholder="Cidade principal" required />
            </div>
            <div>
              <Label htmlFor="state">Estado*</Label>
              <Input id="state" name="state" value={formData.location?.state || ''} onChange={handleLocationChange} placeholder="UF" required />
            </div>
          </div>
        </div>

        {/* Detalhes do Produto */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Detalhes do Produto</h2>

          <div>
            <Label htmlFor="productName">Nome do Produto*</Label>
            <Input id="productName" name="productName" value={formData.productName} onChange={handleChange} placeholder="Ex: Café, Queijo, Artesanato" required />
          </div>

          <div>
            <Label htmlFor="characteristics">Características/Especificações*</Label>
            <Textarea id="characteristics" name="characteristics" value={formData.characteristics} onChange={handleChange} placeholder="O que torna o produto único?" className="min-h-[100px]" required />
          </div>

          <div>
            <Label htmlFor="technicalSpecifications">Especificações Técnicas</Label>
            <Textarea id="technicalSpecifications" name="technicalSpecifications" value={formData.technicalSpecifications} onChange={handleChange} placeholder="Detalhes técnicos do produto" className="min-h-[100px]" />
          </div>

          <div>
            <Label htmlFor="controlStructure">Estrutura de Controle</Label>
            <Textarea id="controlStructure" name="controlStructure" value={formData.controlStructure} onChange={handleChange} placeholder="Como é feito o controle de qualidade" className="min-h-[100px]" />
          </div>

          <div>
            <Label>Nível de Maturidade*</Label>
            <Select value={formData.maturityLevel} onValueChange={(value) => setFormData({ ...formData, maturityLevel: value as IGMaturityLevel })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inicial">Inicial</SelectItem>
                <SelectItem value="Em desenvolvimento">Em desenvolvimento</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Observações</h2>
          <Textarea id="observations" name="observations" value={formData.observations || ''} onChange={handleChange} placeholder="Informações complementares" className="min-h-[100px]" />
        </div>

        {/* JSON Advanced Fields */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Avançado (JSON)</h2>
          {['documents', 'images', 'relatedEntities', 'salesChannels', 'socialMedia'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} (JSON)</Label>
              <Textarea id={field} name={field} value={JSON.stringify(formData[field as keyof IGSuggestion] || {}, null, 2)} onChange={(e) => handleJsonChange(e, field as keyof IGSuggestion)} className="font-mono text-sm" rows={6} />
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IGSuggestionFormDialog;
