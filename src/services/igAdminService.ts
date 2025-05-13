
import { supabase } from '@/integrations/supabase/client';
import { IGBase } from '@/types/ig';
import { Json } from '@/integrations/supabase/types';

export const fetchIGs = async () => {
  console.log('Fetching all IGs from database');
  try {
    const { data, error } = await supabase
      .from('geographic_indications')
      .select('*');
      
    if (error) {
      console.error('Error fetching IGs:', error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} IGs`);
    return data;
  } catch (error) {
    console.error('Error in fetchIGs:', error);
    throw error;
  }
};

export const saveIG = async (ig: IGBase) => {
  try {
    const igToSave = mapIGBaseToDatabase(ig);
    const isEditing = !!ig.id;
    
    console.log(`${isEditing ? 'Updating' : 'Creating'} IG:`, igToSave);
    
    if (isEditing) {
      // Verify if the record exists before updating
      const { data: checkData, error: checkError } = await supabase
        .from('geographic_indications')
        .select('id')
        .eq('id', ig.id)
        .single();
        
      if (checkError) {
        console.error('Error checking if IG exists:', checkError);
        if (checkError.code === 'PGRST116') {
          throw new Error(`IG with ID ${ig.id} not found. It might have been deleted.`);
        }
        throw checkError;
      }
      
      // Perform update
      const { data, error } = await supabase
        .from('geographic_indications')
        .update({
          name: igToSave.name,
          description: igToSave.description,
          type: igToSave.type,
          indication_type: igToSave.indication_type,
          product_name: igToSave.product_name,
          technical_specifications: igToSave.technical_specifications,
          characteristics: igToSave.characteristics,
          control_structure: igToSave.control_structure,
          maturity_level: igToSave.maturity_level,
          location: igToSave.location,
          related_entities: igToSave.related_entities,
          social_media: igToSave.social_media,
          sales_channels: igToSave.sales_channels,
          observations: igToSave.observations,
          images: igToSave.images,
          documents: igToSave.documents,
          updated_at: igToSave.updated_at,
          visible: igToSave.visible
        })
        .eq('id', ig.id)
        .select();
        
      if (error) {
        console.error('Supabase error updating IG:', error);
        throw error;
      }
      
      console.log('Updated IG successfully:', data);
      
      // Verify update was successful
      const { data: verificationData, error: verificationError } = await supabase
        .from('geographic_indications')
        .select('*')
        .eq('id', ig.id)
        .single();
        
      if (verificationError) {
        console.error('Error verifying IG update:', verificationError);
        return { success: false, message: 'Failed to verify update' };
      }
      
      console.log('Verification of update:', verificationData);
      return { success: true, message: 'Indicação geográfica atualizada com sucesso', data: verificationData };
    } else {
      // For new IGs, generate a unique ID if not provided
      if (!igToSave.id) {
        igToSave.id = crypto.randomUUID();
      }
      
      const { data, error } = await supabase
        .from('geographic_indications')
        .insert([igToSave])
        .select();
        
      if (error) {
        console.error('Error creating IG:', error);
        throw error;
      }
      
      console.log('Created new IG successfully:', data);
      return { success: true, message: 'Indicação geográfica criada com sucesso', data };
    }
  } catch (error: any) {
    console.error('Error saving IG:', error);
    return { 
      success: false, 
      message: error.message || 'Erro ao salvar indicação geográfica' 
    };
  }
};

export const deleteIG = async (id: string) => {
  console.log('Deleting IG with ID:', id);
  try {
    // Verify if the record exists before deleting
    const { data: checkData, error: checkError } = await supabase
      .from('geographic_indications')
      .select('id')
      .eq('id', id)
      .single();
      
    if (checkError) {
      console.error('Error checking if IG exists before delete:', checkError);
      if (checkError.code === 'PGRST116') {
        throw new Error(`IG with ID ${id} not found. It might have been already deleted.`);
      }
      throw checkError;
    }
    
    const { data, error } = await supabase
      .from('geographic_indications')
      .delete()
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error deleting IG:', error);
      throw error;
    }
    
    console.log('Deleted IG successfully:', data);
    
    // Verify deletion was successful
    const { data: verificationData, error: verificationError } = await supabase
      .from('geographic_indications')
      .select('id')
      .eq('id', id);
      
    if (verificationError) {
      console.error('Error verifying IG deletion:', verificationError);
      return { success: false, message: 'Failed to verify deletion' };
    } else {
      console.log('Verification of deletion:', verificationData);
      if (verificationData.length > 0) {
        console.error('IG was not deleted correctly from database.');
        return { success: false, message: 'IG não foi excluída corretamente do banco de dados.' };
      } else {
        console.log('IG successfully deleted from database.');
      }
    }
    
    return { success: true, message: 'Indicação geográfica excluída com sucesso' };
  } catch (error: any) {
    console.error('Error deleting IG:', error);
    return { 
      success: false, 
      message: error.message || 'Erro ao excluir indicação geográfica' 
    };
  }
};

export const mapDatabaseToIGBase = (item: any): IGBase => ({
  id: item.id,
  name: item.name,
  description: item.description,
  type: item.type,
  indicationType: item.indication_type,
  technicalSpecifications: item.technical_specifications,
  location: item.location,
  productName: item.product_name,
  characteristics: item.characteristics,
  controlStructure: item.control_structure,
  maturityLevel: item.maturity_level,
  relatedEntities: item.related_entities || [],
  socialMedia: item.social_media || [],
  salesChannels: item.sales_channels || [],
  observations: item.observations || '',
  images: item.images || [],
  documents: Array.isArray(item.documents) 
    ? item.documents.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        url: doc.url,
        type: doc.type,
        size: doc.size,
        createdAt: new Date(doc.createdAt || doc.created_at)
      }))
    : [],
  createdAt: new Date(item.created_at),
  updatedAt: new Date(item.updated_at),
  visible: item.visible
});

export const mapIGBaseToDatabase = (ig: IGBase) => {
  // Convert documents array to a format compatible with Supabase Json type
  const documents = ig.documents && ig.documents.length > 0 
    ? ig.documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        url: doc.url,
        type: doc.type,
        size: doc.size,
        createdAt: doc.createdAt.toISOString()
      }))
    : [];

  return {
    id: ig.id,
    name: ig.name,
    description: ig.description,
    type: ig.type,
    indication_type: ig.indicationType,
    technical_specifications: ig.technicalSpecifications,
    location: ig.location as any,
    product_name: ig.productName,
    characteristics: ig.characteristics,
    control_structure: ig.controlStructure,
    maturity_level: ig.maturityLevel,
    related_entities: ig.relatedEntities as any,
    social_media: ig.socialMedia as any,
    sales_channels: ig.salesChannels as any,
    observations: ig.observations,
    images: ig.images,
    documents: documents as unknown as Json,
    created_at: ig.id ? undefined : new Date().toISOString(), // Don't update creation date for existing records
    updated_at: new Date().toISOString(), // Always update the updated_at timestamp
    visible: ig.visible !== undefined ? ig.visible : true
  };
};
