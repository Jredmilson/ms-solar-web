// ============================================
// CONFIGURAÇÃO CENTRAL DO SITE
// Altere aqui para refletir em todo o projeto
// ============================================

export const SITE_CONFIG = {
  // Número do WhatsApp (somente dígitos, com DDI)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '551125334837',

  // Nome da empresa
  empresa: import.meta.env.VITE_EMPRESA_NOME || 'MS - Multi Serviços',

  // E-mail de contato
  emailContato: import.meta.env.VITE_EMAIL_CONTATO || 'msmultiservicos2026@gmail.com',

  // Custo estimado por kWp (R$) — usado na simulação
  custoInstalacaoKwp: Number(import.meta.env.VITE_CUSTO_KWP) || 4500,
};

export function whatsappLink(mensagem: string): string {
  const msg = encodeURIComponent(mensagem);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`;
}
