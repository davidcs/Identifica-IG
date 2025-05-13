
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-ig-green-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
            Por favor, retorne para a página inicial.
          </p>
          <Button 
            onClick={handleGoHome}
            className="flex items-center gap-2 bg-ig-green-600 hover:bg-ig-green-700 mx-auto"
          >
            <Home size={16} />
            Voltar para o início
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
