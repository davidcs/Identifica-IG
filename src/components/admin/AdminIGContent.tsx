
import React from 'react';
import { IGBase } from '@/types/ig';
import IGTable from '@/components/IGTable';
import IGFormDialog from '@/components/admin/IGFormDialog';
import IGDeleteDialog from '@/components/admin/IGDeleteDialog';

interface AdminIGContentProps {
  igs: IGBase[];
  loading: boolean;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  currentIG: IGBase | null;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  igsToDelete: string | null;
  deleteLoading: boolean;
  saveLoading: boolean;''
  handleSaveIG: (ig: IGBase) => void;
  handleDeleteIG: () => void;
  handleAdd: () => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AdminIGContent: React.FC<AdminIGContentProps> = ({
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
  handleDelete
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Indicações Geográficas</h1>
      
      <IGTable 
        data={igs} 
        loading={loading} 
        onAdd={handleAdd} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        title="Indicações Geográficas"
      />
      
      <IGFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        ig={currentIG}
        onSave={handleSaveIG}
        isLoading={saveLoading}
      />
      
      <IGDeleteDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onConfirm={handleDeleteIG}
        isLoading={deleteLoading}
        igName={igs.find(ig => ig.id === igsToDelete)?.name}
      />
    </div>
  );
};

export default AdminIGContent;
