
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import DocumentsUploadField from './DocumentsUploadField';

export const DescriptionFields = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Descrição e Documentação</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={control}
          name="technicalSpecifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especificações Técnicas *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detalhe as especificações técnicas" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="characteristics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva as características distintivas" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="controlStructure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estrutura de Controle *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Explique a estrutura de controle" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações (Opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Outras observações relevantes" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para upload de documentos 
        <DocumentsUploadField />*/}
      </div>
    </div>
  );
};
