import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IGSuggestion } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import { useIG } from '@/contexts/IGContext'; // ou useIGSuggestions se tiver contexto separado
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const IGDetailSuggestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { igs, loading } = useIG(); // OU useIGSuggestions() se você tiver separado sugestões
  const [suggestion, setSuggestion] = useState<IGSuggestion | null>(null);

  useEffect(() => {
    if (!loading && id) {
      const found = igs.find((ig) => ig.id === id && ig.type === 'Potencial') as IGSuggestion | undefined;
      if (found) {
        setSuggestion(found);
      } else {
        toast({
          title: 'Sugestão não encontrada',
          description: 'A sugestão informada não foi localizada.',
          variant: 'destructive',
        });
        navigate('/igs');
      }
    }
  }, [id, igs, loading, toast, navigate]);

  if (loading || !suggestion) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">{suggestion.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Produto:</strong> {suggestion.productName}</p>
            <p><strong>Localização:</strong> {suggestion.location.city}, {suggestion.location.state}</p>
            <p><strong>Tipo:</strong> {suggestion.indicationType}</p>
            <p><strong>Maturidade:</strong> <Badge variant="outline">{suggestion.maturityLevel}</Badge></p>
            <p><strong>Status:</strong> <Badge>{suggestion.status}</Badge></p>
            <p><strong>Sugerido por:</strong> {suggestion.submittedBy}</p>
          </div>

          <div>
            <p><strong>Características:</strong></p>
            <p className="whitespace-pre-line">{suggestion.characteristics}</p>

            <p className="mt-4"><strong>Estrutura de Controle:</strong></p>
            <p className="whitespace-pre-line">{suggestion.controlStructure}</p>

            <p className="mt-4"><strong>Observações:</strong></p>
            <p className="whitespace-pre-line">{suggestion.observations || 'N/A'}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" onClick={() => navigate('/igs')}>Voltar</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IGDetailSuggestion;
