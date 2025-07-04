import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IGTable from '@/components/IGTable';
import { useIG } from '@/contexts/IGContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGBase } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus } from 'lucide-react';
import { deleteIG } from '@/services/igAdminService';
import { supabase } from '@/integrations/supabase/client';

const IGsListPage: React.FC = () => {
  const { igs, loading, refreshData } = useIG();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [concedidasIGs, setConcedidasIGs] = useState<IGBase[]>([]);
  const [potenciaisIGs, setPotenciaisIGs] = useState<IGBase[]>([]);
  const [selectedIG, setSelectedIG] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (igs && igs.length > 0) {
      setConcedidasIGs(igs.filter(ig => ig.type === 'Concedida'));
      setPotenciaisIGs(igs.filter(ig => ig.type === 'Potencial'));
    }
  }, [igs]);

  const handleNavigateToMap = () => navigate('/map');
  const handleNavigateToSuggest = () => navigate('/suggest');

  const handleEdit = (id: string, type: 'Concedida' | 'Potencial') => {
    if (type === 'Concedida') {
      navigate(`/admin/igs?edit=${id}`);
    } else {
      navigate(`/admin/suggestions?edit=${id}`);
    }
  };

  const handleDelete = (id: string, type: 'Concedida' | 'Potencial') => {
    if (type === 'Concedida') {
      setSelectedIG(id);
      setDeleteDialogOpen(true);
    } else {
      navigate(`/admin/suggestions?delete=${id}`);
    }
  };

  const confirmDelete = async () => {
    if (!selectedIG) return;

    try {
      setIsDeleting(true);

      const { data: checkData, error: checkError } = await supabase
        .from('geographic_indications')
        .select('id')
        .eq('id', selectedIG)
        .single();

      if (checkError) {
        if (checkError.code === 'PGRST116') {
          throw new Error(`IG with ID ${selectedIG} not found. It might have been deleted.`);
        }
        throw checkError;
      }

      const result = await deleteIG(selectedIG);

      if (!result.success) {
        throw new Error(result.message || 'Erro ao excluir indicação geográfica');
      }

      setConcedidasIGs(prev => prev.filter(ig => ig.id !== selectedIG));

      toast({
        title: 'Sucesso',
        description: 'Indicação geográfica excluída com sucesso.',
      });

      await refreshData();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível excluir a indicação geográfica.';
      console.error('Erro ao excluir IG:', error);

      toast({
        title: 'Erro',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedIG(null);
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'moderator';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Indicações Geográficas</h1>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleNavigateToMap} className="bg-ig-green-600 hover:bg-ig-green-700">
                Explorar Mapa
              </Button>

              <Button onClick={handleNavigateToSuggest} className="bg-ig-green-600 hover:bg-ig-green-700">
                Sugerir IG
              </Button>

              {isAdmin && (
                <Button onClick={() => navigate('/admin/igs')} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Gerenciar IGs
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="concedidas">
            <TabsList className="mb-6">
              <TabsTrigger value="concedidas">IGs Concedidas</TabsTrigger>
              <TabsTrigger value="potenciais">IGs Potenciais</TabsTrigger>
            </TabsList>

            <TabsContent value="concedidas">
              {loading ? (
                <div className="text-center py-12">
                  <p>Carregando IGs concedidas...</p>
                </div>
              ) : (
                <IGTable
                  data={concedidasIGs}
                  title="Indicações Geográficas Concedidas"
                  onDelete={isAdmin ? (id => handleDelete(id, 'Concedida')) : undefined}
                  onEdit={isAdmin ? (id => handleEdit(id, 'Concedida')) : undefined}
                />
              )}
            </TabsContent>

            <TabsContent value="potenciais">
              {loading ? (
                <div className="text-center py-12">
                  <p>Carregando IGs potenciais...</p>
                </div>
              ) : (
                <IGTable
                  data={potenciaisIGs}
                  title="Indicações Geográficas Potenciais"
                  onDelete={isAdmin ? (id => handleDelete(id, 'Potencial')) : undefined}
                  onEdit={isAdmin ? (id => handleEdit(id, 'Potencial')) : undefined}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta Indicação Geográfica? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default IGsListPage;
