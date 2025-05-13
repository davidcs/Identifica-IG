
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { IGBase } from '@/types/ig';
import { 
  fetchIGs, 
  saveIG, 
  deleteIG, 
  mapDatabaseToIGBase 
} from '@/services/igAdminService';
import { supabase } from '@/integrations/supabase/client';

export const useIGAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [igs, setIGs] = useState<IGBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentIG, setCurrentIG] = useState<IGBase | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [igsToDelete, setIGsToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Check authentication and load data
  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'moderator')) {
      toast({
        title: 'Acesso restrito',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
    
    loadIGs();
  }, [isAuthenticated, user, navigate]);

  const loadIGs = async () => {
    try {
      setLoading(true);
      
      // Use direct Supabase query to ensure we get fresh data
      const { data, error } = await supabase
        .from('geographic_indications')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        console.log('IGs loaded directly from Supabase:', data.length);
        const formattedData = data.map(mapDatabaseToIGBase);
        setIGs(formattedData);
      }
    } catch (error) {
      console.error('Error loading IGs:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar indicações geográficas',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIG = async (ig: IGBase) => {
    try {
      setSaveLoading(true);
      console.log('Saving IG:', ig);
      
      // Make sure to update timestamps
      const igToSave = {
        ...ig,
        updatedAt: new Date(),
      };
      
      const result = await saveIG(igToSave);
      
      if (!result.success) {
        throw new Error(result.message || 'Erro ao salvar indicação geográfica');
      }
      
      toast({
        title: 'Sucesso',
        description: result.message,
      });
      
      setIsFormOpen(false);
      setCurrentIG(null);
      
      // Reload IGs to ensure we have the latest data
      await loadIGs();
    } catch (error: any) {
      console.error('Error saving IG:', error);
      toast({
        title: 'Erro ao salvar',
        description: error.message || 'Não foi possível salvar a indicação geográfica',
        variant: 'destructive',
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteIG = async () => {
    if (!igsToDelete) return;
    
    try {
      setDeleteLoading(true);
      console.log('Deleting IG:', igsToDelete);
      
      // Check if the IG exists before trying to delete it
      const { data: checkData, error: checkError } = await supabase
        .from('geographic_indications')
        .select('id')
        .eq('id', igsToDelete)
        .single();
      
      if (checkError) {
        if (checkError.code === 'PGRST116') {
          throw new Error(`IG with ID ${igsToDelete} not found. It might have been deleted.`);
        }
        throw checkError;
      }
      
      const result = await deleteIG(igsToDelete);
      
      if (!result.success) {
        throw new Error(result.message || 'Erro ao excluir indicação geográfica');
      }
      
      toast({
        title: 'Sucesso',
        description: result.message,
      });
      
      setIsDeleteDialogOpen(false);
      setIGsToDelete(null);
      
      // Remove from local state immediately for UI responsiveness
      setIGs(prev => prev.filter(ig => ig.id !== igsToDelete));
      
      // Reload IGs to ensure we have the latest data
      await loadIGs();
    } catch (error: any) {
      console.error('Error deleting IG:', error);
      toast({
        title: 'Erro ao excluir',
        description: error.message || 'Não foi possível excluir a indicação geográfica',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentIG(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log('Editing IG with ID:', id);
    const igToEdit = igs.find(ig => ig.id === id);
    if (igToEdit) {
      console.log('Found IG to edit:', igToEdit);
      // Make a deep copy to avoid reference issues
      const igCopy = JSON.parse(JSON.stringify(igToEdit));
      setCurrentIG(igCopy);
      setIsFormOpen(true);
    } else {
      console.error('Could not find IG with ID:', id);
      toast({
        title: 'Erro',
        description: 'Não foi possível encontrar a indicação geográfica para edição',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    setIGsToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  return {
    igs,
    loading,
    isFormOpen,
    setIsFormOpen,
    currentIG,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    igsToDelete,
    deleteLoading,
    saveLoading,
    handleSaveIG,
    handleDeleteIG,
    handleAdd,
    handleEdit,
    handleDelete,
    loadIGs
  };
};
