// Arquivo: SuggestPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIG } from '@/contexts/IGContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IGIndicationType, IGMaturityLevel, IGMedia, IGType } from '@/types/ig';

const SuggestPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { submitSuggestion } = useIG();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Potencial' as IGType,
    indicationType: 'Procedência' as IGIndicationType,
    technicalSpecifications: '',
    latitude: '',
    longitude: '',
    city: '',
    state: '',
    productName: '',
    characteristics: '',
    controlStructure: '',
    maturityLevel: 'Inicial' as IGMaturityLevel,
    relatedEntities: [{ name: '', website: '', contact: '' }],
    socialMedia: [{ type: 'website' as IGMedia['type'], url: '' }],
    salesChannels: [{ type: 'physical' as 'physical' | 'online', name: '', url: '' }],
    observations: '',
    images: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated[index] = value;
      return { ...prev, images: updated };
    });
  };

  const addImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Latitude e longitude devem ser números válidos');
      return;
    }

    try {
      await submitSuggestion({
        ...formData,
        location: {
          latitude,
          longitude,
          city: formData.city,
          state: formData.state,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      alert('Erro ao enviar sugestão. Tente novamente.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">É necessário fazer login</h1>
                  <p className="text-gray-600 mb-6">
                    Para sugerir uma Indicação Geográfica, você precisa estar logado na plataforma.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild>
                      <a href="/login">Fazer login</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/register">Criar conta</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Sugerir Indicação Geográfica</h1>
          <p className="text-gray-600 mb-6">
            Preencha o formulário abaixo para sugerir uma nova Indicação Geográfica para o mapeamento.
          </p>

          <Alert className="mb-6">
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Todas as sugestões são revisadas pela nossa equipe antes de serem publicadas no mapa.
              Forneça o máximo de informações possível para agilizar o processo de aprovação.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="name">Nome da IG*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="latitude">Latitude*</Label>
              <Input
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="longitude">Longitude*</Label>
              <Input
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade*</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="state">Estado*</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="productName">Produto*</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="images">Imagem (URL)</Label>
              <Input
                id="images"
                name="images"
                type="url"
                value={formData.images[0] || ''}
                onChange={(e) => handleImageChange(0, e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="characteristics">Características</Label>
              <Textarea
                id="characteristics"
                name="characteristics"
                value={formData.characteristics}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Enviar Sugestão
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuggestPage;