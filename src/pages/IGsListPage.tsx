import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IGTable from '@/components/IGTable';
import IGSuggestionsTable from '@/components/IGSuggestionsTable';
import IGSuggestionFormDialog from '@/components/admin/IGSuggestionFormDialog';
import { useIG } from '@/contexts/IGContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGBase, IGSuggestion } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const IGsListPage: React.FC = () => {
  const { igs, loading, refreshData } = useIG();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'concedidas';
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [concedidasIGs, setConcedidasIGs] = useState<IGBase[]>([]);
  const [potenciaisIGs, setPotenciaisIGs] = useState<IGSuggestion[]>([]);
  const [selectedIG, setSelectedIG] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState<IGSuggestion | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'moderator';

  useEffect(() => {
    if (igs && igs.length > 0) {
      setConcedidasIGs(igs.filter(ig => ig.type === 'Concedida'));

      const potenciais = igs
        .filter(ig => ig.type === 'Potencial')
        .map(ig => ({
          ...ig,
          submittedBy: 'Desconhecido',
          status: 'pending',
        })) as IGSuggestion[];

      setPotenciaisIGs(potenciais);
    }
  }, [igs]);

  const handleEditConcedida = (id: string) => {
    navigate(`/admin/igs?tab=concedidas&edit=${id}`);
  };


  useEffect(() => {
    const tabFromURL = searchParams.get('tab') || 'concedidas';
    setActiveTab(tabFromURL);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleEditSuggestion = (suggestion: IGSuggestion) => {
    setEditingSuggestion(suggestion);
  };

  const handleSaveSuggestion = async (updated: IGSuggestion) => {
  setIsSaving(true);
  try {
    const {
      id,
      documents,
      images,
      relatedEntities,
      salesChannels,
      socialMedia,
      location,
      ...rest
    } = updated;

    // ⚠️ Serializa os campos JSON para garantir compatibilidade
    const { error } = await supabase
      .from('ig_suggestions')
      .update({
        name: rest.name,
        description: rest.description,
        product_name: rest.productName,
        characteristics: rest.characteristics,
        technical_specifications: rest.technicalSpecifications,
        control_structure: rest.controlStructure,
        indication_type: rest.indicationType,
        type: rest.type,
        maturity_level: rest.maturityLevel,
        observations: rest.observations,
        submitted_by: rest.submittedBy,
        status: rest.status,
        location: location ? JSON.parse(JSON.stringify(location)) : null,
        documents: documents ? JSON.parse(JSON.stringify(documents)) : [],
        images: images ? JSON.parse(JSON.stringify(images)) : [],
        related_entities: relatedEntities ? JSON.parse(JSON.stringify(relatedEntities)) : [],
        sales_channels: salesChannels ? JSON.parse(JSON.stringify(salesChannels)) : [],
        social_media: socialMedia ? JSON.parse(JSON.stringify(socialMedia)) : [],
      })
      .eq('id', id);

    if (error) throw error;

    toast({ title: 'Sucesso', description: 'Sugestão atualizada com sucesso.' });
    setEditingSuggestion(null);
    await refreshData();
  } catch (err) {
    toast({
      title: 'Erro',
      description: 'Erro ao salvar sugestão.',
      variant: 'destructive',
    });
    console.error(err);
  } finally {
    setIsSaving(false);
  }
};


  const handleDelete = (id: string) => {
    setSelectedIG(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedIG) return;

    try {
      setIsDeleting(true);

      const ig = concedidasIGs.find(ig => ig.id === selectedIG)
        || potenciaisIGs.find(ig => ig.id === selectedIG);

      if (!ig) throw new Error('Indicação Geográfica não encontrada.');

      const tableName = ig.type === 'Potencial' ? 'ig_suggestions' : 'geographic_indications';

      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', selectedIG);

      if (deleteError) throw deleteError;

      toast({
        title: 'Sucesso',
        description: `Indicação geográfica excluída da tabela ${tableName}.`,
      });

      await refreshData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Não foi possível excluir a indicação geográfica.';

      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedIG(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Indicações Geográficas</h1>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/map')} className="bg-ig-green-600 hover:bg-ig-green-700">
                Explorar Mapa
              </Button>

              <Button onClick={() => navigate('/suggest')} className="bg-ig-green-600 hover:bg-ig-green-700">
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

          <Tabs value={activeTab} onValueChange={handleTabChange}>
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
                  onDelete={isAdmin ? handleDelete : undefined}
                  onEdit={isAdmin ? handleEditConcedida : undefined}

                />
              )}
            </TabsContent>

            <TabsContent value="potenciais">
              {loading ? (
                <div className="text-center py-12">
                  <p>Carregando IGs potenciais...</p>
                </div>
              ) : (
                <IGSuggestionsTable
                  data={potenciaisIGs}
                  title="Sugestões de Indicações Geográficas"
                  onDelete={isAdmin ? handleDelete : undefined}
                  onEdit={isAdmin ? handleEditSuggestion : undefined}
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
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editingSuggestion && (
        <IGSuggestionFormDialog
          open={!!editingSuggestion}
          onOpenChange={(open) => !open && setEditingSuggestion(null)}
          suggestion={editingSuggestion}
          isLoading={isSaving}
          onSave={handleSaveSuggestion}
        />
      )}

      <Footer />
    </div>
  );
};

export default IGsListPage;
