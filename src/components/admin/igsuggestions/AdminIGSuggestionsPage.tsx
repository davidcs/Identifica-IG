import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIG } from '@/contexts/IGContext';
import IGSuggestionsTable from '../../IGSuggestionsTable';
import IGSuggestionFormDialog from '../IGSuggestionFormDialog';
import { IGSuggestion } from '@/types/ig';
import { saveSuggestion, deleteSuggestion } from '@/services/suggestionsService';

const AdminIGSuggestionsPage = () => {
  const { igs } = useIG(); // igs: IGBase[]
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get('edit');

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Type guard garantindo campos de IGSuggestion
  const suggestions = igs.filter(
    (ig): ig is IGSuggestion =>
      ig.type === 'Potencial' &&
      'submittedBy' in ig &&
      'status' in ig
  );

  const suggestionToEdit = suggestions.find(ig => ig.id === editingId) || null;

  const handleEdit = (id: string) => {
    searchParams.set('edit', id);
    setSearchParams(searchParams);
  };

  const handleCloseDialog = () => {
    searchParams.delete('edit');
    setSearchParams(searchParams);
  };

  const handleSave = async (updatedSuggestion: IGSuggestion) => {
    setIsLoading(true);
    try {
      await saveSuggestion(updatedSuggestion);
      console.log('Sugestão salva com sucesso');
    } catch (error) {
      console.error('Erro ao salvar sugestão:', error);
    } finally {
      setIsLoading(false);
      handleCloseDialog();
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteSuggestion(id);
      console.log('Sugestão excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir sugestão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <IGSuggestionsTable
        data={suggestions}
        title="Sugestões de Indicações Geográficas"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <IGSuggestionFormDialog
        open={!!editingId}
        onOpenChange={(open) => !open && handleCloseDialog()}
        suggestion={suggestionToEdit}
        isLoading={isLoading}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminIGSuggestionsPage;
