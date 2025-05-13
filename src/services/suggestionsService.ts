// 📁 src/services/suggestionsService.ts
import { supabase } from '@/integrations/supabase/client';
import { IGSuggestion } from '@/types/ig';
import { transformToRow, transformFromRow } from './suggestions/transformers';
import { uploadImage } from '@/services/uploadImage';

// ✅ Salvar ou atualizar sugestão (upsert)
export const saveSuggestion = async (suggestion: IGSuggestion): Promise<void> => {
  try {
    console.log("Salvando sugestão:", suggestion);

    const uploadedImageUrls: string[] = [];
    if (suggestion.images && Array.isArray(suggestion.images) && suggestion.images.length > 0) {
      const folder = suggestion.name.replace(/\s+/g, '-').toLowerCase();
      for (const image of suggestion.images as (string | File)[]) {
        if (typeof image === 'object' && image instanceof File) {
          const url = await uploadImage(image, folder);
          if (url) uploadedImageUrls.push(url);
        } else if (typeof image === 'string') {
          uploadedImageUrls.push(image);
        }
      }
    }

    const suggestionToInsert = transformToRow({
      ...suggestion,
      images: uploadedImageUrls
    });

    const { error } = await supabase
      .from('ig_suggestions')
      .upsert(suggestionToInsert);

    if (error) {
      console.error("Erro ao salvar sugestão no Supabase:", error);
      throw error;
    }

    console.log("Sugestão salva com sucesso!");
  } catch (err) {
    console.error('Failed to save suggestion:', err);

    // Fallback: save to localStorage
    try {
      const storedSuggestions = localStorage.getItem('ig_suggestions');
      const suggestions = storedSuggestions ? JSON.parse(storedSuggestions) : [];
      suggestions.push(suggestion);
      localStorage.setItem('ig_suggestions', JSON.stringify(suggestions));
      console.log("Sugestão salva no localStorage como fallback");
    } catch (storageErr) {
      console.error('Failed to save to localStorage:', storageErr);
      throw new Error('Failed to save suggestion');
    }
  }
};

// ✅ Buscar sugestões
export const fetchSuggestions = async (): Promise<IGSuggestion[]> => {
  try {
    console.log("Buscando sugestões do Supabase...");
    const { data, error } = await supabase
      .from('ig_suggestions')
      .select('*');

    if (error) {
      console.error("Erro ao buscar sugestões do Supabase:", error);
      throw error;
    }

    if (data && data.length > 0) {
      console.log(`Encontradas ${data.length} sugestões no Supabase`);
      return data.map(transformFromRow);
    }

    console.log("Nenhuma sugestão encontrada no Supabase");
    const storedSuggestions = localStorage.getItem('ig_suggestions');
    return storedSuggestions ? JSON.parse(storedSuggestions) : [];
  } catch (e) {
    console.error('Error querying Supabase for suggestions:', e);
    const storedSuggestions = localStorage.getItem('ig_suggestions');
    return storedSuggestions ? JSON.parse(storedSuggestions) : [];
  }
};

// ✅ Atualizar status (approve / reject)
export const updateSuggestionStatus = async (
  id: string,
  status: 'approved' | 'rejected',
  feedback?: string
): Promise<void> => {
  try {
    console.log(`Atualizando status da sugestão ${id} para ${status}`);
    const updateData = {
      status,
      admin_feedback: feedback || null
    };

    const { data, error } = await supabase
      .from('ig_suggestions')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Erro ao atualizar status da sugestão:", error);
      throw error;
    }

    console.log(`Status da sugestão atualizado para ${status}:`, data);
  } catch (err) {
    console.error('Failed to update suggestion status:', err);

    try {
      const storedSuggestions = localStorage.getItem('ig_suggestions');
      if (storedSuggestions) {
        let suggestions: IGSuggestion[] = JSON.parse(storedSuggestions);
        suggestions = suggestions.map((s) => {
          if (s.id === id) {
            return { ...s, status, adminFeedback: feedback || s.adminFeedback };
          }
          return s;
        });

        localStorage.setItem('ig_suggestions', JSON.stringify(suggestions));
      }
    } catch (storageErr) {
      console.error('Failed to update in localStorage:', storageErr);
      throw new Error('Failed to update suggestion status');
    }

    throw err;
  }
};

// ✅ NOVA FUNÇÃO: Excluir sugestão
export const deleteSuggestion = async (id: string): Promise<void> => {
  try {
    console.log(`Excluindo sugestão com id: ${id}`);

    const { error } = await supabase
      .from('ig_suggestions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Erro ao excluir sugestão do Supabase:", error);
      throw error;
    }

    console.log("Sugestão excluída com sucesso!");
  } catch (err) {
    console.error('Failed to delete suggestion:', err);

    try {
      // Fallback: remover do localStorage (modo offline)
      const storedSuggestions = localStorage.getItem('ig_suggestions');
      if (storedSuggestions) {
        let suggestions: IGSuggestion[] = JSON.parse(storedSuggestions);
        suggestions = suggestions.filter((s) => s.id !== id);
        localStorage.setItem('ig_suggestions', JSON.stringify(suggestions));
        console.log("Sugestão removida do localStorage como fallback");
      }
    } catch (storageErr) {
      console.error('Failed to delete from localStorage:', storageErr);
      throw new Error('Failed to delete suggestion');
    }

    throw err;
  }
};
