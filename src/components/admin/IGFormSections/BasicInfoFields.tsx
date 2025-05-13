
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const BasicInfoFields: React.FC = () => {
  const { control } = useFormContext();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da IG</FormLabel>
            <FormControl>
              <Input placeholder="Nome da IG" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Produto</FormLabel>
            <FormControl>
              <Input placeholder="Nome do produto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Potencial">Potencial</SelectItem>
                <SelectItem value="Concedida">Concedida</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="indicationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Indicação</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de indicação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Procedência">Procedência</SelectItem>
                <SelectItem value="Denominação de Origem">Denominação de Origem</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="maturityLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nível de Maturidade</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível de maturidade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Inicial">Inicial</SelectItem>
                <SelectItem value="Em desenvolvimento">Em desenvolvimento</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
