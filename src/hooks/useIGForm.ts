
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IGBase, IGType, IGIndicationType, IGMaturityLevel, IGLocation, IGDocument } from '@/types/ig';
import { igFormSchema, IGFormValues } from '@/schemas/igFormSchema';

interface UseIGFormProps {
  ig: IGBase | null;
  onSave: (data: IGBase) => void;
}

export const useIGForm = ({ ig, onSave }: UseIGFormProps) => {
  const [formError, setFormError] = React.useState<string | null>(null);
  
  const form = useForm<IGFormValues>({
    resolver: zodResolver(igFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'Potencial' as IGType,
      indicationType: 'Procedência' as IGIndicationType,
      productName: '',
      technicalSpecifications: '',
      characteristics: '',
      controlStructure: '',
      maturityLevel: 'Inicial' as IGMaturityLevel,
      observations: '',
      location: {
        city: '',
        state: '',
        latitude: 0,
        longitude: 0,
      },
      documents: [],
    },
    mode: 'onChange', // Validate on change for immediate feedback
  });

  // Reset form when IG changes
  React.useEffect(() => {
    setFormError(null);
    
    if (ig) {
      form.reset({
        name: ig.name,
        description: ig.description,
        type: ig.type as IGType,
        indicationType: ig.indicationType as IGIndicationType,
        productName: ig.productName,
        technicalSpecifications: ig.technicalSpecifications || '',
        characteristics: ig.characteristics || '',
        controlStructure: ig.controlStructure || '',
        maturityLevel: ig.maturityLevel as IGMaturityLevel,
        observations: ig.observations || '',
        location: {
          city: ig.location.city,
          state: ig.location.state,
          latitude: ig.location.latitude,
          longitude: ig.location.longitude,
        },
        documents: ig.documents || [],
      });
    } else {
      form.reset({
        name: '',
        description: '',
        type: 'Potencial',
        indicationType: 'Procedência',
        productName: '',
        technicalSpecifications: '',
        characteristics: '',
        controlStructure: '',
        maturityLevel: 'Inicial',
        observations: '',
        location: {
          city: '',
          state: '',
          latitude: 0,
          longitude: 0,
        },
        documents: [],
      });
    }
  }, [ig, form]);

  const handleSubmit = async (data: IGFormValues) => {
    try {
      setFormError(null);
      
      // Ensure all required fields are properly formed
      const location: IGLocation = {
        city: data.location.city,
        state: data.location.state,
        latitude: Number(data.location.latitude),
        longitude: Number(data.location.longitude),
      };

      // Convert form data to IGBase format
      const igData: IGBase = {
        id: ig?.id || crypto.randomUUID(),
        name: data.name,
        description: data.description,
        type: data.type,
        indicationType: data.indicationType,
        productName: data.productName,
        technicalSpecifications: data.technicalSpecifications || '',
        characteristics: data.characteristics || '',
        controlStructure: data.controlStructure || '',
        maturityLevel: data.maturityLevel,
        observations: data.observations,
        location: location,
        relatedEntities: ig?.relatedEntities || [],
        socialMedia: ig?.socialMedia || [],
        salesChannels: ig?.salesChannels || [],
        images: ig?.images || [],
        documents: data.documents as IGDocument[], // Ensure type safety
        createdAt: ig?.createdAt || new Date(),
        updatedAt: new Date(),
        visible: ig?.visible !== undefined ? ig.visible : true
      };
      
      onSave(igData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  return {
    form,
    formError,
    setFormError,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};
