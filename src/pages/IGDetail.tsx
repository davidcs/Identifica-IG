
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIG } from '@/contexts/IGContext';
import { IGBase } from '@/types/ig';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Globe, ExternalLink, Instagram, Facebook, ShoppingCart } from 'lucide-react';

const IGDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { igs, loading } = useIG();
  const [ig, setIg] = useState<IGBase | null>(null);

  useEffect(() => {
    if (!loading && id) {
      const foundIg = igs.find((item) => item.id === id);
      if (foundIg) {
        setIg(foundIg);
      }
    }
  }, [id, igs, loading]);

  const goBack = () => {
    navigate(-1);
  };

  const defaultImage = '/placeholder.svg';

  if (loading) {
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

  if (!ig) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" onClick={goBack} className="mb-4 flex items-center gap-1">
              <ArrowLeft size={16} />
              Voltar
            </Button>
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold mb-4">IG não encontrada</h1>
              <p className="text-gray-600 mb-8">
                A indicação geográfica que você está procurando não foi encontrada.
              </p>
              <Button onClick={() => navigate('/map')}>Ver todas as IGs</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={goBack} className="mb-4 flex items-center gap-1">
            <ArrowLeft size={16} />
            Voltar
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Image */}
            <div className="md:col-span-1">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={ig.images?.[0] || defaultImage}
                  alt={ig.name}
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
                    <p className="text-gray-600">{ig.location.city}, {ig.location.state}</p>
                  </div>
                </div>
                
                {ig.socialMedia.length > 0 && (
                  <div className="pt-3 border-t">
                    <h3 className="font-medium text-sm mb-2">Redes Sociais</h3>
                    <div className="flex flex-wrap gap-2">
                      {ig.socialMedia.map((media, index) => {
                        let icon;
                        switch (media.type) {
                          case 'instagram':
                            icon = <Instagram size={16} />;
                            break;
                          case 'facebook':
                            icon = <Facebook size={16} />;
                            break;
                          case 'website':
                          default:
                            icon = <Globe size={16} />;
                            break;
                        }
                        
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                          <a
                            href={media.url && typeof media.url === 'string' ? media.url.startsWith('http') ? media.url : `https://${media.url}` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            {icon}
                            <span>
                              {media.type === 'website' ? 'Site' : media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                            </span>
                          </a>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {ig.salesChannels.length > 0 && (
                  <div className="pt-3 border-t">
                    <h3 className="font-medium text-sm mb-2">Onde Comprar</h3>
                    <div className="flex flex-wrap gap-2">
                      {ig.salesChannels.map((channel, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          asChild={!!channel.url}
                        >
                          {channel.url ? (
                            <a
                              href={channel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
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
            
            {/* Right Column - Details */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h1 className="text-3xl font-bold">{ig.name}</h1>
                <Badge className={`${
                  ig.type === 'Concedida' ? 'bg-ig-green-600' : 'bg-ig-yellow-500'
                } text-white`}>
                  {ig.type}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">{ig.indicationType}</Badge>
                <Badge variant="outline">{ig.productName}</Badge>
                <Badge variant="outline">Maturidade: {ig.maturityLevel}</Badge>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                  <p className="text-gray-700">{ig.description}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Características</h2>
                    <p className="text-gray-700">{ig.characteristics}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Estrutura de Controle</h2>
                    <p className="text-gray-700">{ig.controlStructure}</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">Especificações Técnicas</h2>
                  <p className="text-gray-700">{ig.technicalSpecifications}</p>
                </CardContent>
              </Card>
              
              {ig.relatedEntities.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Entidades Relacionadas</h2>
                    <ul className="space-y-2">
                      {ig.relatedEntities.map((entity, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-medium">{entity.name}</span>
                          {entity.website && (
                            <a
                              href={
                                entity.website.startsWith('http://') || entity.website.startsWith('https://')
                                  ? entity.website
                                  : `https://${entity.website}`
                              }
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
            </div>
          </div>
          
          {ig.observations && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Observações Adicionais</h2>
              <p className="text-gray-700">{ig.observations}</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IGDetail;
