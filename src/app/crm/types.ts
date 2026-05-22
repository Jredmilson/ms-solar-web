export type LeadStatus = 'novo' | 'contatado' | 'convertido';
export type LeadSource = 'simulacao' | 'whatsapp';
export type PropertyType = 'residencial' | 'comercial' | 'industrial' | 'rural';

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  valorConta: number;
  tipoImovel: PropertyType;
  origem: LeadSource;
  status: LeadStatus;
  data: Date;
  notes?: string;
}

export interface Simulation {
  id: string;
  nome: string;
  whatsapp: string;
  valorConta: number;
  cidade: string;
  resultadoEstimado: {
    economiaAnual: number;
    potenciaSistema: number;
    paineisSolares: number;
  };
  data: Date;
}

export interface WhatsAppClick {
  id: string;
  data: Date;
  origemPagina: string;
  dispositivo: 'mobile' | 'desktop';
}

export interface AbandonedLead {
  id: string;
  nome?: string;
  whatsapp?: string;
  etapaAlcancada: string;
  ultimaAtividade: Date;
}
