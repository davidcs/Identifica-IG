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
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  
  // Form state
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
  
  const handleEntityChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedEntities = [...prev.relatedEntities];
      updatedEntities[index] = { ...updatedEntities[index], [field]: value };
      return { ...prev, relatedEntities: updatedEntities };
    });
  };
  
  const addEntity = () => {
    setFormData((prev) => ({
      ...prev,
      relatedEntities: [...prev.relatedEntities, { name: '', website: '', contact: '' }],
    }));
  };
  
  const removeEntity = (index: number) => {
    setFormData((prev) => {
      const updatedEntities = [...prev.relatedEntities];
      updatedEntities.splice(index, 1);
      return { ...prev, relatedEntities: updatedEntities };
    });
  };
  
  const handleSocialMediaChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedSocialMedia = [...prev.socialMedia];
      if (field === 'type' && (value === 'facebook' || value === 'instagram' || value === 'website' || value === 'other')) {
        updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value as IGMedia['type'] };
      } else {
        updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value };
      }
      return { ...prev, socialMedia: updatedSocialMedia };
    });
  };
  
  const addSocialMedia = () => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { type: 'website' as IGMedia['type'], url: '' }],
    }));
  };
  
  const removeSocialMedia = (index: number) => {
    setFormData((prev) => {
      const updatedSocialMedia = [...prev.socialMedia];
      updatedSocialMedia.splice(index, 1);
      return { ...prev, socialMedia: updatedSocialMedia };
    });
  };
  
  const handleSalesChannelChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedSalesChannels = [...prev.salesChannels];
      if (field === 'type' && (value === 'physical' || value === 'online')) {
        updatedSalesChannels[index] = { ...updatedSalesChannels[index], [field]: value as 'physical' | 'online' };
      } else {
        updatedSalesChannels[index] = { ...updatedSalesChannels[index], [field]: value };
      }
      return { ...prev, salesChannels: updatedSalesChannels };
    });
  };
  
  const addSalesChannel = () => {
    setFormData((prev) => ({
      ...prev,
      salesChannels: [...prev.salesChannels, { type: 'physical' as 'physical' | 'online', name: '', url: '' }],
    }));
  };
  
  const removeSalesChannel = (index: number) => {
    setFormData((prev) => {
      const updatedSalesChannels = [...prev.salesChannels];
      updatedSalesChannels.splice(index, 1);
      return { ...prev, salesChannels: updatedSalesChannels };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add validation here
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Latitude e longitude devem ser números válidos');
      return;
    }
    
    submitSuggestion({
      ...formData,
      location: {
        latitude,
        longitude,
        city: formData.city,
        state: formData.state,
      },
    });
    
    navigate('/');
  };

// E adicione as seguintes funções ao componente SuggestPage:

const handleImageChange = (index: number, value: string) => {
  setFormData((prev) => {
    const updatedImages = [...prev.images];
    updatedImages[index] = value;
    return { ...prev, images: updatedImages };
  });
};

const addImage = () => {
  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ''],
  }));
};

const removeImage = (index: number) => {
  setFormData((prev) => {
    const updatedImages = [...prev.images];
    updatedImages.splice(index, 1);
    return { ...prev, images: updatedImages };
  });
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
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informações Básicas</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Indicação Geográfica*</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Café do Cerrado Mineiro"
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
                    placeholder="Descreva a indicação geográfica, sua história, importância e características gerais"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label>Tipo*</Label>
                  <RadioGroup 
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Concedida" id="type-concedida" />
                      <Label htmlFor="type-concedida" className="font-normal">
                        Concedida - Já reconhecida oficialmente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Potencial" id="type-potencial" />
                      <Label htmlFor="type-potencial" className="font-normal">
                        Potencial - Em estruturação ou processo de reconhecimento
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Tipo de Indicação*</Label>
                  <RadioGroup 
                    value={formData.indicationType}
                    onValueChange={(value) => handleSelectChange('indicationType', value)}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Procedência" id="indication-procedencia" />
                      <Label htmlFor="indication-procedencia" className="font-normal">
                        Indicação de Procedência
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Denominação de Origem" id="indication-denominacao" />
                      <Label htmlFor="indication-denominacao" className="font-normal">
                        Denominação de Origem
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            {/* Localização */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Localização</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude*</Label>
                  <Input 
                    id="latitude" 
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Ex: -15.7801"
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
                    placeholder="Ex: -47.9292"
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
                    placeholder="Nome da cidade principal"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado*</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleSelectChange('state', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Detalhes do Produto */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detalhes do Produto</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="productName">Nome do Produto*</Label>
                  <Input 
                    id="productName" 
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Categoria do produto (ex: Café, Queijo, Artesanato)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Imagem do Produto*</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => handleImageChange(0, e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    required
                  />
                </div>
                 <div>
                  <Label htmlFor="characteristics">Características/Especificações*</Label>
                  <Textarea 
                    id="characteristics" 
                    name="characteristics"
                    value={formData.characteristics}
                    onChange={handleChange}
                    placeholder="Descreva as características específicas que tornam este produto único"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="technicalSpecifications">Especificações Técnicas</Label>
                  <Textarea 
                    id="technicalSpecifications" 
                    name="technicalSpecifications"
                    value={formData.technicalSpecifications}
                    onChange={handleChange}
                    placeholder="Descreva as especificações técnicas do produto"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="controlStructure">Estrutura de Controle</Label>
                  <Textarea 
                    id="controlStructure" 
                    name="controlStructure"
                    value={formData.controlStructure}
                    onChange={handleChange}
                    placeholder="Descreva como é feito o controle de qualidade e autenticidade do produto"
                  />
                </div>
                
                <div>
                  <Label>Nível de Maturidade*</Label>
                  <Select
                    value={formData.maturityLevel}
                    onValueChange={(value) => handleSelectChange('maturityLevel', value as IGMaturityLevel)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de maturidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inicial">Inicial</SelectItem>
                      <SelectItem value="Em desenvolvimento">Em desenvolvimento</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                      <SelectItem value="Finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Entidades Relacionadas */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Entidades Relacionadas</h2>
                <Button type="button" variant="outline" size="sm" onClick={addEntity}>
                  Adicionar Entidade
                </Button>
              </div>
              
              {formData.relatedEntities.map((entity, index) => (
                <Card key={index}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Entidade {index + 1}</h3>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 h-8 px-2"
                          onClick={() => removeEntity(index)}
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`entity-name-${index}`}>Nome da Entidade*</Label>
                        <Input 
                          id={`entity-name-${index}`} 
                          value={entity.name}
                          onChange={(e) => handleEntityChange(index, 'name', e.target.value)}
                          placeholder="Nome da associação, cooperativa, etc."
                          required={index === 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`entity-website-${index}`}>Website</Label>
                        <Input 
                          id={`entity-website-${index}`} 
                          value={entity.website}
                          onChange={(e) => handleEntityChange(index, 'website', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`entity-contact-${index}`}>Contato</Label>
                        <Input 
                          id={`entity-contact-${index}`} 
                          value={entity.contact}
                          onChange={(e) => handleEntityChange(index, 'contact', e.target.value)}
                          placeholder="Email, telefone ou endereço"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Mídias Sociais */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mídias Sociais</h2>
                <Button type="button" variant="outline" size="sm" onClick={addSocialMedia}>
                  Adicionar Mídia Social
                </Button>
              </div>
              
              {formData.socialMedia.map((media, index) => (
                <Card key={index}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Mídia Social {index + 1}</h3>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 h-8 px-2"
                          onClick={() => removeSocialMedia(index)}
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`social-type-${index}`}>Tipo*</Label>
                        <Select
                          value={media.type}
                          onValueChange={(value) => handleSocialMediaChange(index, 'type', value)}
                        >
                          <SelectTrigger id={`social-type-${index}`}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`social-url-${index}`}>URL*</Label>
                        <Input 
                          id={`social-url-${index}`} 
                          value={media.url}
                          onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                          placeholder="https://..."
                          required={index === 0}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Canais de Venda */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Canais de Venda</h2>
                <Button type="button" variant="outline" size="sm" onClick={addSalesChannel}>
                  Adicionar Canal de Venda
                </Button>
              </div>
              
              {formData.salesChannels.map((channel, index) => (
                <Card key={index}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Canal de Venda {index + 1}</h3>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 h-8 px-2"
                          onClick={() => removeSalesChannel(index)}
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`sales-type-${index}`}>Tipo*</Label>
                        <Select
                          value={channel.type}
                          onValueChange={(value) => handleSalesChannelChange(index, 'type', value)}
                        >
                          <SelectTrigger id={`sales-type-${index}`}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physical">Ponto de venda físico</SelectItem>
                            <SelectItem value="online">Loja online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`sales-name-${index}`}>Nome*</Label>
                        <Input 
                          id={`sales-name-${index}`} 
                          value={channel.name}
                          onChange={(e) => handleSalesChannelChange(index, 'name', e.target.value)}
                          placeholder="Nome do estabelecimento ou site"
                          required={index === 0}
                        />
                      </div>
                      {channel.type === 'online' && (
                        <div className="md:col-span-2">
                          <Label htmlFor={`sales-url-${index}`}>URL</Label>
                          <Input 
                            id={`sales-url-${index}`} 
                            value={channel.url}
                            onChange={(e) => handleSalesChannelChange(index, 'url', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Observações */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Observações Adicionais</h2>
              
              <div>
                <Label htmlFor="observations">Observações</Label>
                <Textarea 
                  id="observations" 
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Informações adicionais que você considera relevantes"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                * Campos obrigatórios
              </p>
              <p className="text-sm text-gray-600">
                Ao enviar este formulário, você concorda que as informações fornecidas serão revisadas 
                pela equipe do Identifica-IG e poderão ser publicadas no mapa após aprovação.
              </p>
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
