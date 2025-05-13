import { supabase } from '@/integrations/supabase/client';

export const uploadImage = async (file: File, folder?: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from('ig-images')
    .upload(filePath, file);

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return null;
  }

  const { data } = supabase.storage.from('ig-images').getPublicUrl(filePath);
  return data?.publicUrl || null;
};
