
import { z } from 'zod';
import { IGType, IGIndicationType, IGMaturityLevel, IGDocument } from '@/types/ig';

// Location schema
const LocationSchema = z.object({
  city: z.string().min(1, { message: 'Cidade é obrigatória' }),
  state: z.string().min(1, { message: 'Estado é obrigatório' }),
  latitude: z.union([
    z.number(),
    z.string().transform((val, ctx) => {
      const parsed = Number(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Latitude deve ser um número",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  ]),
  longitude: z.union([
    z.number(),
    z.string().transform((val, ctx) => {
      const parsed = Number(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Longitude deve ser um número",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  ]),
});

// Document schema
const DocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number(),
  createdAt: z.date()
});

// Form schema
export const igFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  type: z.enum(['Potencial', 'Concedida'] as const),
  indicationType: z.enum(['Procedência', 'Denominação de Origem'] as const),
  productName: z.string().min(1, { message: 'Nome do produto é obrigatório' }),
  technicalSpecifications: z.string().min(1, { message: 'Especificações técnicas são obrigatórias' }),
  characteristics: z.string().min(1, { message: 'Características são obrigatórias' }),
  controlStructure: z.string().min(1, { message: 'Estrutura de controle é obrigatória' }),
  maturityLevel: z.enum(['Inicial', 'Em desenvolvimento', 'Avançado', 'Finalizado'] as const),
  observations: z.string().optional(),
  location: LocationSchema,
  documents: z.array(DocumentSchema).optional().default([]),
});

export type IGFormValues = z.infer<typeof igFormSchema>;
