
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminIGContent from '@/components/admin/AdminIGContent';
import { useIGAdmin } from '@/hooks/useIGAdmin';
import { useNavigate } from 'react-router-dom';

const AdminIGPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const {
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
  } = useIGAdmin();

  // Enhanced authorization check with redirect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // If authentication check is still processing, show a loading indicator
  if (loading && (!isAuthenticated || !user)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-6 bg-gray-50 flex items-center justify-center">
          <p>Verificando suas permissões...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authorized, render nothing (the useEffect will redirect)
  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'moderator')) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <AdminIGContent
          igs={igs}
          loading={loading}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          currentIG={currentIG}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          igsToDelete={igsToDelete}
          deleteLoading={deleteLoading}
          saveLoading={saveLoading}
          handleSaveIG={handleSaveIG}
          handleDeleteIG={handleDeleteIG}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
};

export default AdminIGPage;
