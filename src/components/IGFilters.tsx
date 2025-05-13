import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IGFilters } from '@/contexts/IGContext';
import { Search, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface IGFiltersProps {
  onFilterChange: (filters: IGFilters) => void;
  className?: string;
}

const maturityLevels = ['Inicial', 'Em desenvolvimento', 'Avançado', 'Finalizado'] as const;

const IGFiltersComponent: React.FC<IGFiltersProps> = ({ onFilterChange, className }) => {
  const [filters, setFilters] = useState<IGFilters>({
    search: '',
    type: [],
    state: [],
    maturityLevel: [],
    indicationType: [],
  });

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  const handleCheckboxChange = (field: keyof Omit<IGFilters, 'search'>, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[field] as string[] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      const newFilters = { ...prev, [field]: updatedValues };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilters = { ...prev, search: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      type: [],
      state: [],
      maturityLevel: [],
      indicationType: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <div className="mb-6">
        <Label htmlFor="search" className="mb-2 block">
          Buscar por nome ou descrição
        </Label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="search"
            placeholder="Buscar..."
            className="pl-9"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="type">
          <AccordionTrigger className="py-2 text-sm font-medium">Tipo</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-concedida"
                  checked={filters.type?.includes('Concedida')}
                  onCheckedChange={() => handleCheckboxChange('type', 'Concedida')}
                />
                <Label htmlFor="type-concedida" className="text-sm">Concedida</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-potencial"
                  checked={filters.type?.includes('Potencial')}
                  onCheckedChange={() => handleCheckboxChange('type', 'Potencial')}
                />
                <Label htmlFor="type-potencial" className="text-sm">Potencial</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="indicationType">
          <AccordionTrigger className="py-2 text-sm font-medium">Tipo de Indicação</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="indication-procedencia"
                  checked={filters.indicationType?.includes('Procedência')}
                  onCheckedChange={() => handleCheckboxChange('indicationType', 'Procedência')}
                />
                <Label htmlFor="indication-procedencia" className="text-sm">Procedência</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="indication-denominacao"
                  checked={filters.indicationType?.includes('Denominação de Origem')}
                  onCheckedChange={() => handleCheckboxChange('indicationType', 'Denominação de Origem')}
                />
                <Label htmlFor="indication-denominacao" className="text-sm">Denominação de Origem</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="maturityLevel">
          <AccordionTrigger className="py-2 text-sm font-medium">Nível de Maturidade</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {(maturityLevels as readonly string[]).map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level}`}
                    checked={filters.maturityLevel?.includes(level as any)}
                    onCheckedChange={() => handleCheckboxChange('maturityLevel', level)}
                  />
                  <Label htmlFor={`level-${level}`} className="text-sm">{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="states">
          <AccordionTrigger className="py-2 text-sm font-medium">Estados</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {states.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={filters.state?.includes(state)}
                    onCheckedChange={() => handleCheckboxChange('state', state)}
                  />
                  <Label htmlFor={`state-${state}`} className="text-sm">{state}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="outline"
        className="w-full mt-4 flex items-center justify-center gap-2"
        onClick={clearFilters}
      >
        <X size={16} />
        Limpar filtros
      </Button>
    </div>
  );
};

export default IGFiltersComponent;
