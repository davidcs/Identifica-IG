
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
          
          <Tabs defaultValue="info" className="mb-6">
            <TabsList>
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="password">Alterar Senha</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Usuário</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium">Nome:</span>
                    <span className="ml-2">{user.name}</span>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{user.email}</span>
                  </div>
                  <div>
                    <span className="font-medium">Função:</span>
                    <span className="ml-2 capitalize">{user.role}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password">
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
