
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type IGSuggestionRow = Database['public']['Tables']['ig_suggestions']['Row'];
type Result = { error?: Error };

export const transformSuggestionToIG = (suggestion: IGSuggestionRow) => ({
  id: `ig-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Generate a unique ID for the new IG
  name: suggestion.name,
  description: suggestion.description,
  type: 'Potencial', // Always mark as potential when approved
  indication_type: suggestion.indication_type,
  technical_specifications: suggestion.technical_specifications,
  location: suggestion.location,
  product_name: suggestion.product_name,
  characteristics: suggestion.characteristics,
  control_structure: suggestion.control_structure,
  maturity_level: suggestion.maturity_level,
  related_entities: suggestion.related_entities,
  social_media: suggestion.social_media,
  sales_channels: suggestion.sales_channels,
  observations: suggestion.observations,
  images: suggestion.images,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  visible: true
});

export const addApprovedSuggestionToIGs = async (suggestion: IGSuggestionRow): Promise<Result> => {
  try {
    console.log('Adding approved suggestion to IGs:', suggestion);
    const igData = transformSuggestionToIG(suggestion);
    
    const { error: insertError } = await supabase
      .from('geographic_indications')
      .insert(igData);
          
    if (insertError) {
      console.error('Error adding approved suggestion to IGs:', insertError);
      return { error: insertError };
    }
    
    console.log('Successfully added new IG from approved suggestion:', igData);
    return {};
  } catch (error) {
    console.error('Failed to add approved suggestion to IGs:', error);
    return { error: error instanceof Error ? error : new Error('Unknown error') };
  }
};
