
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserCog } from 'lucide-react';
import UserEditDialog from '@/components/admin/UserEditDialog';
import UserDeleteDialog from '@/components/admin/UserDeleteDialog';
import UserTable from '@/components/admin/UserTable';
import { useUserAdmin } from '@/hooks/useUserAdmin';

const UsersAdminPage: React.FC = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    users,
    isLoading,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedUser,
    form,
    handleEdit,
    handleDelete,
    confirmEdit,
    confirmDelete,
  } = useUserAdmin();

  useEffect(() => {
    if (!isAuthenticated || (currentUser?.role !== 'admin')) {
      toast({
        title: 'Acesso não autorizado',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAuthenticated, currentUser, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <UserCog className="h-8 w-8" /> 
              Administração de Usuários
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <UserTable 
                users={users}
                currentUserId={currentUser?.id}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <UserEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        form={form}
        onConfirm={confirmEdit}
      />

      <UserDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        userName={selectedUser?.name}
        onConfirm={confirmDelete}
      />

      <Footer />
    </div>
  );
};

export default UsersAdminPage;
