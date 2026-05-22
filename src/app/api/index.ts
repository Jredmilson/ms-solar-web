// ============================================
// Cliente de API - Solar CRM
// Centraliza todas as chamadas ao backend
// ============================================

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ms-solar-api-production.up.railway.app/api';

// Helper para obter token JWT do sessionStorage
function getToken(): string | null {
  const usuario = sessionStorage.getItem('crm_usuario');
  if (!usuario) return null;
  const parsed = JSON.parse(usuario);
  return parsed?.token || null;
}

// Helper base para fetch com autenticação
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(err.error || `Erro ${res.status}`);
  }

  return res.json();
}

// ============================================
// AUTH
// ============================================
export const authApi = {
  login: (email: string, senha: string) =>
    apiFetch<{ token: string; usuario: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),

  me: () => apiFetch<any>('/auth/me'),
};

// ============================================
// LEADS
// ============================================
export const leadsApi = {
  listar: (params?: {
    status?: string;
    origem?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const qs = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: any[]; total: number; page: number; limit: number }>(
      `/leads${qs ? `?${qs}` : ''}`
    );
  },

  buscar: (id: string) => apiFetch<any>(`/leads/${id}`),

  criar: (data: any) =>
    apiFetch<any>('/leads', { method: 'POST', body: JSON.stringify(data) }),

  atualizar: (id: string, data: any) =>
    apiFetch<any>(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  atualizarStatus: (id: string, status: string) =>
    apiFetch<any>(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  remover: (id: string) =>
    apiFetch<any>(`/leads/${id}`, { method: 'DELETE' }),
};

// ============================================
// SIMULAÇÕES
// ============================================
export const simulacoesApi = {
  criar: (data: {
    nome: string;
    whatsapp?: string;
    valorConta: number;
    cidade?: string;
    tipoImovel?: string;
  }) =>
    apiFetch<{ simulacao: any; resultado: any }>('/simulacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  listar: (params?: { search?: string; date?: string; page?: number }) => {
    const qs = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: any[]; total: number }>(`/simulacoes${qs ? `?${qs}` : ''}`);
  },
};

// ============================================
// WHATSAPP CLICKS
// ============================================
export const whatsappClicksApi = {
  registrar: (origemPagina: string, dispositivo: 'mobile' | 'desktop' = 'desktop') =>
    apiFetch<any>('/whatsapp-clicks', {
      method: 'POST',
      body: JSON.stringify({ origemPagina, dispositivo }),
    }),

  listar: (params?: { page?: number }) => {
    const qs = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: any[]; total: number }>(
      `/whatsapp-clicks${qs ? `?${qs}` : ''}`
    );
  },
};

// ============================================
// LEADS ABANDONADOS
// ============================================
export const leadsAbandonadosApi = {
  registrar: (data: { nome?: string; whatsapp?: string; etapaAlcancada: string }) =>
    apiFetch<any>('/leads-abandonados', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  listar: (params?: { page?: number }) => {
    const qs = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: any[]; total: number }>(
      `/leads-abandonados${qs ? `?${qs}` : ''}`
    );
  },
};

// ============================================
// DEPOIMENTOS
// ============================================
export const depoimentosApi = {
  listar: () => apiFetch<any[]>('/depoimentos'),

  listarTodos: () => apiFetch<any[]>('/depoimentos/todos'),

  criar: async (data: FormData): Promise<any> => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/depoimentos`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: data,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(err.error || `Erro ${res.status}`);
    }
    return res.json();
  },

  atualizar: async (id: number, data: FormData): Promise<any> => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/depoimentos/${id}`, {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: data,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(err.error || `Erro ${res.status}`);
    }
    return res.json();
  },

  remover: (id: number) =>
    apiFetch<any>(`/depoimentos/${id}`, { method: 'DELETE' }),

  alternarAtivo: (id: number, ativo: boolean) => {
    const form = new FormData();
    form.append('ativo', String(ativo));
    return depoimentosApi.atualizar(id, form);
  },
};

// ============================================
// IMAGENS DE LEADS
// ============================================
export const leadImagensApi = {
  listar: (leadId: string) =>
    apiFetch<any[]>(`/leads/${leadId}/imagens`),

  upload: async (leadId: string, file: File, descricao?: string): Promise<any> => {
    const token = getToken();
    const form = new FormData();
    form.append('imagem', file);
    if (descricao) form.append('descricao', descricao);

    const res = await fetch(`${BASE_URL}/leads/${leadId}/imagens`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(err.error || `Erro ${res.status}`);
    }
    return res.json();
  },

  remover: (leadId: string, imagemId: number) =>
    apiFetch<any>(`/leads/${leadId}/imagens/${imagemId}`, { method: 'DELETE' }),
};

// ============================================
// DASHBOARD
// ============================================
export const dashboardApi = {
  kpis: () =>
    apiFetch<{
      totalLeads: number;
      totalSimulacoes: number;
      totalWhatsappClicks: number;
      leadsHoje: number;
    }>('/dashboard/kpis'),

  leadsDiarios: () => apiFetch<{ data: string; leads: number }[]>('/dashboard/leads-diarios'),

  origemLeads: () =>
    apiFetch<{ name: string; value: number; color: string }[]>('/dashboard/origem-leads'),

  comparativoOrigem: () =>
    apiFetch<{ tipo: string; quantidade: number }[]>('/dashboard/comparativo-origem'),

  ultimosLeads: () => apiFetch<any[]>('/dashboard/ultimos-leads'),

  relatorios: () => apiFetch<any>('/dashboard/relatorios'),
};
