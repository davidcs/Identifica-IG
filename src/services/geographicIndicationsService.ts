
import { supabase } from '@/integrations/supabase/client';
import { IGBase } from '@/types/ig';
import { mockIgData } from '@/data/igData';
import { Database } from '@/integrations/supabase/types';

type GeographicIndication = Database['public']['Tables']['geographic_indications']['Row'];
type IGSuggestionRow = Database['public']['Tables']['ig_suggestions']['Row'];

export const initializeIGData = async () => {
  try {
    console.log('Fetching IGs from Supabase...');
    
    // Fetch registered geographic indications
    const { data: igsData, error: igsError } = await supabase
      .from('geographic_indications')
      .select('*')
      .eq('visible', true);
      
    if (igsError) {
      console.error('Error fetching data from geographic_indications:', igsError);
      return mockIgData; // Fallback to mock data
    }
    
    // Fetch approved suggestions
    const { data: suggestionsData, error: suggestionsError } = await supabase
      .from('ig_suggestions')
      .select('*')
      .eq('status', 'approved');
    
    if (suggestionsError) {
      console.error('Error fetching data from ig_suggestions:', suggestionsError);
      return igsData ? igsData.map(transformToIGBase) : mockIgData;
    }
    
    // If we have data from either source
    if ((igsData && igsData.length > 0) || (suggestionsData && suggestionsData.length > 0)) {
      console.log(`IGs found: ${igsData?.length || 0} registered + ${suggestionsData?.length || 0} approved`);
      
      // Transform and combine both data sources
      const registeredIGs = igsData ? igsData.map(transformToIGBase) : [];
      const approvedSuggestions = suggestionsData ? suggestionsData.map(transformSuggestionToIGBase) : [];
      
      console.log('Registered IGs:', registeredIGs.length);
      console.log('Approved suggestions:', approvedSuggestions.length);
      
      return [...registeredIGs, ...approvedSuggestions];
    } else {
      console.log("No IGs found in Supabase, using mock data");
      return mockIgData; // Fallback to mock data if no data in Supabase
    }
  } catch (err) {
    console.error('Error fetching data from Supabase:', err);
    return mockIgData; // Fallback to mock data
  }
};

export const fetchIGById = async (id: string): Promise<IGBase | null> => {
  try {
    // First try to find in geographic_indications
    const { data: igData, error: igError } = await supabase
      .from('geographic_indications')
      .select('*')
      .eq('id', id)
      .single();
        
    if (!igError && igData) {
      return transformToIGBase(igData);
    }
    
    // If not found or error, try in approved ig_suggestions
    const { data: suggestionData, error: suggestionError } = await supabase
      .from('ig_suggestions')
      .select('*')
      .eq('id', id)
      .eq('status', 'approved')
      .single();
      
    if (!suggestionError && suggestionData) {
      return transformSuggestionToIGBase(suggestionData);
    }
  } catch (e) {
    console.error('Error querying Supabase:', e);
  }
  
  // Fallback to mock data
  const mockIG = mockIgData.find(ig => ig.id === id);
  return mockIG || null;
};

const transformToIGBase = (data: GeographicIndication): IGBase => ({
  id: data.id,
  name: data.name,
  description: data.description,
  type: data.type as IGBase['type'],
  indicationType: data.indication_type as IGBase['indicationType'],
  technicalSpecifications: data.technical_specifications,
  location: data.location as unknown as IGBase['location'],
  productName: data.product_name,
  characteristics: data.characteristics,
  controlStructure: data.control_structure,
  maturityLevel: data.maturity_level as IGBase['maturityLevel'],
  relatedEntities: data.related_entities as unknown as IGBase['relatedEntities'],
  socialMedia: data.social_media as unknown as IGBase['socialMedia'],
  salesChannels: data.sales_channels as unknown as IGBase['salesChannels'],
  observations: data.observations || '',
  images: data.images as string[],
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
  visible: data.visible
});

const transformSuggestionToIGBase = (data: IGSuggestionRow): IGBase => ({
  id: data.id,
  name: data.name,
  description: data.description,
  type: 'Potencial', // Always mark suggestions as 'Potencial'
  indicationType: data.indication_type as IGBase['indicationType'],
  technicalSpecifications: data.technical_specifications,
  location: data.location as unknown as IGBase['location'],
  productName: data.product_name,
  characteristics: data.characteristics,
  controlStructure: data.control_structure,
  maturityLevel: data.maturity_level as IGBase['maturityLevel'],
  relatedEntities: data.related_entities as unknown as IGBase['relatedEntities'],
  socialMedia: data.social_media as unknown as IGBase['socialMedia'],
  salesChannels: data.sales_channels as unknown as IGBase['salesChannels'],
  observations: data.observations || '',
  images: data.images as string[],
  createdAt: new Date(), // We don't have created_at in the suggestion type
  updatedAt: new Date(), // We don't have updated_at in the suggestion type
  visible: true
});
