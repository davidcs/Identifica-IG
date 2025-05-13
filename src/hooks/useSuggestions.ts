
import { useState, useCallback } from 'react';
import { IGSuggestion } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import { saveSuggestion, updateSuggestionStatus, fetchSuggestions } from '@/services/suggestionsService';

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<IGSuggestion[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const { toast } = useToast();

  const submitSuggestion = async (suggestion: Omit<IGSuggestion, 'status' | 'submittedBy' | 'id'>, userId: string) => {
    const newSuggestion: IGSuggestion = {
      ...suggestion,
      id: `suggestion-${Date.now()}`,
      submittedBy: userId,
      status: 'pending',
    };

    try {
      await saveSuggestion(newSuggestion);
      setSuggestions((prev) => [...prev, newSuggestion]);
      toast({
        title: 'Sugestão enviada com sucesso',
        description: 'Sua sugestão foi enviada para análise',
      });
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      toast({
        title: 'Erro ao enviar sugestão',
        description: 'Não foi possível enviar sua sugestão. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  const approveSuggestion = async (id: string) => {
    try {
      await updateSuggestionStatus(id, 'approved');
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: 'approved' } : s
        )
      );
      toast({
        title: 'Sugestão aprovada',
        description: 'A sugestão foi aprovada e adicionada ao mapa',
      });
    } catch (error) {
      console.error('Error approving suggestion:', error);
      toast({
        title: 'Erro ao aprovar sugestão',
        description: 'Não foi possível aprovar a sugestão. Tente novamente mais tarde.',
        variant: 'destructive',
      });
      throw error; // Propagar o erro para tratamento adicional se necessário
    }
  };

  const rejectSuggestion = async (id: string, feedback: string) => {
    try {
      await updateSuggestionStatus(id, 'rejected', feedback);
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: 'rejected', adminFeedback: feedback }
            : s
        )
      );
      toast({
        title: 'Sugestão rejeitada',
        description: 'A sugestão foi rejeitada',
      });
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      toast({
        title: 'Erro ao rejeitar sugestão',
        description: 'Não foi possível rejeitar a sugestão. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  const loadSuggestions = useCallback(async () => {
    try {
      // Check if we've fetched data within the last 30 seconds
      const now = Date.now();
      if (now - lastFetchTime < 30000 && suggestions.length > 0) {
        console.log('Suggestions fetched recently, using cached data');
        return suggestions;
      }
      
      const loadedSuggestions = await fetchSuggestions();
      setSuggestions(loadedSuggestions);
      setLastFetchTime(now);
      return loadedSuggestions;
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast({
        title: 'Erro ao carregar sugestões',
        description: 'Não foi possível carregar as sugestões. Tente novamente mais tarde.',
        variant: 'destructive',
      });
      return [];
    }
  }, [toast, suggestions, lastFetchTime]);

  return {
    suggestions,
    setSuggestions,
    submitSuggestion,
    approveSuggestion,
    rejectSuggestion,
    loadSuggestions,
  };
};
