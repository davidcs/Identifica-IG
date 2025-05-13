
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, FileIcon, Upload, File } from 'lucide-react';
import { IGDocument } from '@/types/ig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const DocumentsUploadField = () => {
  const { control, setValue, getValues } = useFormContext();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const currentDocs = getValues('documents') || [];

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Gerar um nome único para o arquivo
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        // Upload do arquivo para o Supabase Storage
        const { data, error } = await supabase
          .storage
          .from('ig_documents')
          .upload(filePath, file);

        if (error) {
          console.error('Erro no upload:', error);
          throw error;
        }

        // Criar objeto de URL pública
        const { data: publicUrlData } = supabase
          .storage
          .from('ig_documents')
          .getPublicUrl(filePath);

        // Criar novo documento
        const newDoc: IGDocument = {
          id: crypto.randomUUID(),
          name: file.name,
          url: publicUrlData.publicUrl,
          type: file.type,
          size: file.size,
          createdAt: new Date(),
        };

        return newDoc;
      });

      const uploadedDocs = await Promise.all(uploadPromises);
      
      // Atualizar o formulário com os novos documentos
      setValue('documents', [...currentDocs, ...uploadedDocs], { shouldValidate: true });
      
      toast({
        title: 'Upload concluído',
        description: `${uploadedDocs.length} arquivo(s) carregado(s) com sucesso.`,
      });
      
      // Limpar o input de arquivo
      event.target.value = '';
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível fazer o upload dos arquivos.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeDocument = (docId: string) => {
    const currentDocs = getValues('documents') || [];
    setValue(
      'documents',
      currentDocs.filter(doc => doc.id !== docId),
      { shouldValidate: true }
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <FormField
      control={control}
      name="documents"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Documentos</FormLabel>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                className="flex-1"
                disabled={isUploading}
              />
              <Button type="button" disabled={isUploading} variant="secondary" onClick={() => document.getElementById('fileInput')?.click()}>
                {isUploading ? 'Enviando...' : <Upload size={16} />}
              </Button>
            </div>
            
            <div className="grid gap-2">
              {field.value && field.value.length > 0 ? (
                field.value.map((doc: IGDocument) => (
                  <Card key={doc.id} className="bg-slate-50">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <FileIcon size={20} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Badge variant="outline" className="text-xs">{doc.type.split('/').pop()}</Badge>
                            <span>{formatFileSize(doc.size)}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-4 border border-dashed rounded-md text-gray-500">
                  <File className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-sm">Nenhum documento adicionado</p>
                  <p className="text-xs text-gray-400">Adicione documentos importantes como PDFs, imagens, DOC, XLS</p>
                </div>
              )}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentsUploadField;
