
import { IGSuggestion } from '@/types/ig';
import { Database } from '@/integrations/supabase/types';
import { Json } from '@/integrations/supabase/types';

type IGSuggestionRow = Database['public']['Tables']['ig_suggestions']['Row'];

export const transformToRow = (suggestion: IGSuggestion): Omit<IGSuggestionRow, 'id'> & { id: string } => {
  // Convert documents array to a format compatible with Supabase Json type
  const documents = suggestion.documents && suggestion.documents.length > 0 
    ? suggestion.documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        url: doc.url,
        type: doc.type,
        size: doc.size,
        createdAt: doc.createdAt.toISOString()
      }))
    : [];

  return {
    id: suggestion.id,
    name: suggestion.name,
    description: suggestion.description,
    type: suggestion.type,
    indication_type: suggestion.indicationType,
    technical_specifications: suggestion.technicalSpecifications,
    location: suggestion.location as any,
    product_name: suggestion.productName,
    characteristics: suggestion.characteristics,
    control_structure: suggestion.controlStructure,
    maturity_level: suggestion.maturityLevel,
    related_entities: suggestion.relatedEntities as any,
    social_media: suggestion.socialMedia as any,
    sales_channels: suggestion.salesChannels as any,
    observations: suggestion.observations || null,
    images: suggestion.images as any,
    documents: documents as unknown as Json,
    submitted_by: suggestion.submittedBy,
    status: suggestion.status,
    admin_feedback: suggestion.adminFeedback || null
  };
};

export const transformFromRow = (row: IGSuggestionRow): IGSuggestion => ({
  id: row.id,
  name: row.name,
  description: row.description,
  type: row.type as IGSuggestion['type'],
  indicationType: row.indication_type as IGSuggestion['indicationType'],
  technicalSpecifications: row.technical_specifications,
  location: row.location as unknown as IGSuggestion['location'],
  productName: row.product_name,
  characteristics: row.characteristics,
  controlStructure: row.control_structure,
  maturityLevel: row.maturity_level as IGSuggestion['maturityLevel'],
  relatedEntities: row.related_entities as unknown as IGSuggestion['relatedEntities'],
  socialMedia: row.social_media as unknown as IGSuggestion['socialMedia'],
  salesChannels: row.sales_channels as unknown as IGSuggestion['salesChannels'],
  observations: row.observations || '',
  images: row.images as string[],
  documents: Array.isArray(row.documents) 
    ? row.documents.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        url: doc.url,
        type: doc.type,
        size: doc.size,
        createdAt: new Date(doc.createdAt || doc.created_at)
      }))
    : [],
  submittedBy: row.submitted_by,
  status: row.status as IGSuggestion['status'],
  adminFeedback: row.admin_feedback || ''
});
