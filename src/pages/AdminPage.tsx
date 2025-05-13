
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIG } from '@/contexts/IGContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AdminDashboardCards from '@/components/admin/AdminDashboardCards';
import SuggestionCard from '@/components/admin/SuggestionCard';
import ApprovedSuggestionCard from '@/components/admin/ApprovedSuggestionCard';
import RejectedSuggestionCard from '@/components/admin/RejectedSuggestionCard';
import SuggestionApproveDialog from '@/components/admin/SuggestionApproveDialog';
import SuggestionRejectDialog from '@/components/admin/SuggestionRejectDialog';
import SuggestionDetailsDialog from '@/components/admin/SuggestionDetailsDialog';
import { IGSuggestion } from '@/types/ig';
import { Button } from '@/components/ui/button';

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { suggestions, approveSuggestion, rejectSuggestion, loadSuggestions } = useIG();
  const navigate = useNavigate();

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [viewingSuggestion, setViewingSuggestion] = useState<IGSuggestion | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'moderator')) {
      navigate('/');
    }
    
    loadSuggestions();
  }, [isAuthenticated, user, navigate, loadSuggestions]);

  const handleViewDetails = (suggestion: IGSuggestion) => {
    setViewingSuggestion(suggestion);
    setDetailsDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setSelectedSuggestion(id);
    setDialogOpen(true);
  };

  const handleReject = (id: string) => {
    setSelectedSuggestion(id);
    setRejectDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (selectedSuggestion) {
      try {
        await approveSuggestion(selectedSuggestion);
        setDialogOpen(false);
        setSelectedSuggestion(null);
        await loadSuggestions();
      } catch (error) {
        console.error('Error approving suggestion:', error);
      }
    }
  };

  const confirmReject = async () => {
    if (selectedSuggestion) {
      try {
        rejectSuggestion(selectedSuggestion, feedbackText);
        setFeedbackText('');
        setRejectDialogOpen(false);
        setSelectedSuggestion(null);
        await loadSuggestions();
      } catch (error) {
        console.error('Error rejecting suggestion:', error);
      }
    }
  };

  const navigateToUserAdmin = () => { navigate('/admin/users'); };
  const navigateToIGsList = () => { navigate('/igs-list'); };
  const navigateToIGsAdmin = () => { navigate('/admin/igs'); };

  const pendingSuggestions = suggestions.filter((s) => s.status === 'pending');
  const approvedSuggestions = suggestions.filter((s) => s.status === 'approved');
  const rejectedSuggestions = suggestions.filter((s) => s.status === 'rejected');

  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'moderator')) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">
              Gerencie sugestões de IGs, usuários e conteúdo do site.
            </p>
            <div className="mt-4">
              <Button
                variant="default"
                className="bg-ig-green-600 hover:bg-ig-green-700 mr-2"
                onClick={navigateToIGsAdmin}
              >
                Gerenciar Indicações Geográficas
              </Button>
            </div>
          </div>

          <AdminDashboardCards
            onNavigateUsers={navigateToUserAdmin}
            onNavigateIGs={navigateToIGsList}
            pendingCount={pendingSuggestions.length}
          />

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="relative">
                Pendentes
                {pendingSuggestions.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingSuggestions.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Aprovadas</TabsTrigger>
              <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <h2 className="text-xl font-semibold mb-4">Sugestões Pendentes</h2>
              {pendingSuggestions.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Não há sugestões pendentes no momento.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingSuggestions.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onViewDetails={() => handleViewDetails(suggestion)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved">
              <h2 className="text-xl font-semibold mb-4">Sugestões Aprovadas</h2>
              {approvedSuggestions.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Nenhuma sugestão foi aprovada ainda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {approvedSuggestions.map((suggestion) => (
                    <ApprovedSuggestionCard 
                      key={suggestion.id} 
                      suggestion={suggestion}
                      onViewDetails={() => handleViewDetails(suggestion)} 
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected">
              <h2 className="text-xl font-semibold mb-4">Sugestões Rejeitadas</h2>
              {rejectedSuggestions.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Nenhuma sugestão foi rejeitada ainda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rejectedSuggestions.map((suggestion) => (
                    <RejectedSuggestionCard 
                      key={suggestion.id} 
                      suggestion={suggestion}
                      onViewDetails={() => handleViewDetails(suggestion)}
                      onApprove={handleApprove}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SuggestionApproveDialog
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={confirmApprove}
      />
      
      <SuggestionRejectDialog
        open={rejectDialogOpen}
        onCancel={() => setRejectDialogOpen(false)}
        onConfirm={confirmReject}
        feedback={feedbackText}
        setFeedback={setFeedbackText}
      />
      
      <SuggestionDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        suggestion={viewingSuggestion}
        onApprove={viewingSuggestion?.status === 'pending' || viewingSuggestion?.status === 'rejected' ? handleApprove : undefined}
        onReject={viewingSuggestion?.status === 'pending' ? handleReject : undefined}
      />
      
      <Footer />
    </div>
  );
};

export default AdminPage;
