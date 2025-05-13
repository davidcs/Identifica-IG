
export type IGType = 'Potencial' | 'Concedida';
export type IGIndicationType = 'Procedência' | 'Denominação de Origem';
export type IGMaturityLevel = 'Inicial' | 'Em desenvolvimento' | 'Avançado' | 'Finalizado';

export interface IGLocation {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface IGEntity {
  name: string;
  website?: string;
  contact?: string;
}

export interface IGMedia {
  type: 'facebook' | 'instagram' | 'website' | 'other';
  url: string;
}

export interface IGSales {
  type: 'physical' | 'online';
  name: string;
  url?: string;
}

export interface IGFilters {
  search?: string;
  type?: IGType[];
  state?: string[];
  maturityLevel?: IGMaturityLevel[];
  indicationType?: IGIndicationType[];
}

export interface IGDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: Date;
}

export interface IGBase {
  id: string;
  name: string;
  description: string;
  type: IGType;
  indicationType: IGIndicationType;
  technicalSpecifications: string;
  location: IGLocation;
  productName: string;
  characteristics: string;
  controlStructure: string;
  maturityLevel: IGMaturityLevel;
  relatedEntities: IGEntity[];
  socialMedia: IGMedia[];
  salesChannels: IGSales[];
  observations?: string;
  images: string[];
  documents?: IGDocument[];
  createdAt: Date;
  updatedAt: Date;
  visible?: boolean;
}

export interface IGSuggestion extends Omit<IGBase, 'id' | 'createdAt' | 'updatedAt'> {
  id: string;
  submittedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  adminFeedback?: string;
}
