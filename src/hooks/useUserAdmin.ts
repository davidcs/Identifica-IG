
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { fetchUsers, updateUserRole, deleteUser } from '@/services/userService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  full_name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  role: z.enum(['user', 'moderator', 'admin'] as const),
});

export const useUserAdmin = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      role: "user",
    },
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser && editDialogOpen) {
      form.reset({
        full_name: selectedUser.name,
        role: selectedUser.role,
      });
    }
  }, [selectedUser, editDialogOpen, form]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const loadedUsers = await fetchUsers();
      setUsers(loadedUsers);
      console.log('Loaded users:', loadedUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: 'Erro ao carregar usuários',
        description: 'Não foi possível carregar a lista de usuários.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmEdit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedUser) return;
    
    setEditDialogOpen(false); // Close dialog first to prevent confusion
    
    try {
      toast({
        title: 'Atualizando usuário',
        description: 'Salvando alterações...',
      });
      
      await updateUserRole(selectedUser.id, values.role as UserRole, values.full_name);
      
      // Update local state only after successful database update
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, name: values.full_name, role: values.role as UserRole } 
          : u
      ));
      
      toast({
        title: 'Usuário atualizado',
        description: 'As informações do usuário foram atualizadas com sucesso.',
      });
      
      // Refresh user list from database to ensure we have the latest data
      loadUsers();
      
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: 'Erro ao atualizar usuário',
        description: error instanceof Error ? error.message : 'Não foi possível atualizar as informações do usuário.',
        variant: 'destructive',
      });
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    setDeleteDialogOpen(false); // Close dialog first to prevent confusion
    
    try {
      toast({
        title: 'Excluindo usuário',
        description: 'Removendo usuário...',
      });
      
      await deleteUser(selectedUser.id);
      
      // Only update local state after successful database operation
      setUsers(users.filter(u => u.id !== selectedUser.id));
      
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi removido com sucesso.',
      });
      
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro ao excluir usuário',
        description: error instanceof Error ? error.message : 'Não foi possível remover o usuário.',
        variant: 'destructive',
      });
    }
  };

  return {
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
    loadUsers,
  };
};
