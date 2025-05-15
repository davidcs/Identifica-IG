import React, { useState, useEffect } from 'react';
import { IGSuggestion } from '@/types/ig';
import { useSuggestions } from '@/hooks/useSuggestions';
import { useToast } from '@/hooks/use-toast';

const AdminSuggestionsPage: React.FC = () => {
  const { 
    suggestions, 
    loadSuggestions, 
    updateSuggestionContent, 
    deleteSuggestion 
  } = useSuggestions();

  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<IGSuggestion | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [suggestionToDelete, setSuggestionToDelete] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  const handleAdd = () => {
    setCurrentSuggestion(null); // modo criar nova
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id) || null;
    setCurrentSuggestion(suggestion);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setSuggestionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveSuggestion = async (updatedSuggestion: IGSuggestion) => {
    setSaveLoading(true);
    try {
      await updateSuggestionContent(updatedSuggestion);
      toast({ title: 'Sugestão atualizada com sucesso.' });
      setIsFormOpen(false);
    } catch (error) {
      toast({ title: 'Erro ao salvar sugestão.', variant: 'destructive' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteSuggestion = async () => {
    if (!suggestionToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteSuggestion(suggestionToDelete);
      toast({ title: 'Sugestão excluída com sucesso.' });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({ title: 'Erro ao excluir sugestão.', variant: 'destructive' });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <AdminSuggestionContent
      suggestions={suggestions}
      loading={false}
      isFormOpen={isFormOpen}
      setIsFormOpen={setIsFormOpen}
      currentSuggestion={currentSuggestion}
      isDeleteDialogOpen={isDeleteDialogOpen}
      setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      suggestionToDelete={suggestionToDelete}
      deleteLoading={deleteLoading}
      saveLoading={saveLoading}
      handleSaveSuggestion={handleSaveSuggestion}
      handleDeleteSuggestion={handleDeleteSuggestion}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default AdminSuggestionsPage;
