import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IGSuggestion } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import { useIG } from '@/contexts/IGContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Instagram, Facebook, Globe, ShoppingCart, ExternalLink } from 'lucide-react';

const IGDetailSuggestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { igs, loading } = useIG();
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Carregando informações...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const defaultImage = '/placeholder.svg';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1">
            <ArrowLeft size={16} />
            Voltar
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna da esquerda */}
            <div className="md:col-span-1">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={suggestion.images?.[0] || defaultImage}
                  alt={suggestion.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                  }}
                />
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin size={20} className="text-ig-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Localização</h3>
                    <p className="text-gray-600">{suggestion.location.city}, {suggestion.location.state}</p>
                  </div>
                </div>

                {suggestion.socialMedia?.length > 0 && (
                  <div className="pt-3 border-t">
                    <h3 className="font-medium text-sm mb-2">Redes Sociais</h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.socialMedia.map((media, index) => {
                        let icon;
                        switch (media.type) {
                          case 'instagram': icon = <Instagram size={16} />; break;
                          case 'facebook': icon = <Facebook size={16} />; break;
                          default: icon = <Globe size={16} />; break;
                        }

                        return (
                          <Button key={index} variant="outline" size="sm" className="text-xs" asChild>
                            <a
                              href={media.url?.startsWith('http') ? media.url : `https://${media.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              {icon}
                              <span>{media.type.charAt(0).toUpperCase() + media.type.slice(1)}</span>
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {suggestion.salesChannels?.length > 0 && (
                  <div className="pt-3 border-t">
                    <h3 className="font-medium text-sm mb-2">Onde Comprar</h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.salesChannels.map((channel, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          asChild={!!channel.url}
                        >
                          {channel.url ? (
                            <a href={channel.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                              <ShoppingCart size={16} />
                              {channel.name}
                            </a>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ShoppingCart size={16} />
                              {channel.name}
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Coluna da direita */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h1 className="text-3xl font-bold">{suggestion.name}</h1>
                <Badge className="bg-ig-yellow-500 text-white">Potencial</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">{suggestion.indicationType}</Badge>
                <Badge variant="outline">{suggestion.productName}</Badge>
                <Badge variant="outline">Maturidade: {suggestion.maturityLevel}</Badge>
              </div>

              {suggestion.description && (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                    <p className="text-gray-700">{suggestion.description}</p>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Características</h2>
                    <p className="text-gray-700 whitespace-pre-line">{suggestion.characteristics}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Estrutura de Controle</h2>
                    <p className="text-gray-700 whitespace-pre-line">{suggestion.controlStructure}</p>
                  </CardContent>
                </Card>
              </div>

              {suggestion.technicalSpecifications && (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Especificações Técnicas</h2>
                    <p className="text-gray-700">{suggestion.technicalSpecifications}</p>
                  </CardContent>
                </Card>
              )}

              {suggestion.relatedEntities?.length > 0 && (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Entidades Relacionadas</h2>
                    <ul className="space-y-2">
                      {suggestion.relatedEntities.map((entity, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-medium">{entity.name}</span>
                          {entity.website && (
                            <a
                              href={entity.website.startsWith('http') ? entity.website : `https://${entity.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-ig-blue-600 hover:underline flex items-center gap-1 text-sm"
                            >
                              {entity.website}
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {entity.contact && (
                            <span className="text-gray-600 text-sm">{entity.contact}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {suggestion.observations && (
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Observações Adicionais</h2>
                    <p className="text-gray-700 whitespace-pre-line">{suggestion.observations}</p>
                  </CardContent>
                </Card>
              )}

              {suggestion.submittedBy && (
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Sugerido por</h2>
                    <p className="text-gray-700 whitespace-pre-line">{suggestion.submittedBy}</p>
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IGDetailSuggestion;
