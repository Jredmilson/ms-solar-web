// ============================================
// Serviço de Simulação Solar Real
// Fluxo: CEP → ViaCEP → coordenadas → NASA POWER → cálculo
// ============================================

import {
  buscarCoordenadasCidade,
  tarifasPorEstado,
  CUSTO_POR_KWP,
  PERDA_SISTEMA,
  AREA_POR_PAINEL,
  POTENCIA_POR_PAINEL,
} from './cidadesCoords';

export interface DadosCEP {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;        // estado
  erro?: boolean;
}

export interface ResultadoIrradiacao {
  kwhAnuaisPorKwp: number; // kWh/ano gerados por cada kWp instalado
  irradiacaoDiaria: number; // kWh/m²/dia (média anual)
  fonte: 'nasa' | 'estimativa';
}

export interface ResultadoSimulacao {
  // Localização
  cidade: string;
  estado: string;
  // Dados energéticos reais
  tarifaKwh: number;
  consumoMensalKwh: number;
  irradiacaoDiaria: number;
  // Sistema solar dimensionado
  potenciaSistemaKwp: number;
  paineisSolares: number;
  areaTetoNecessariaM2: number;
  geracaoMensalKwh: number;
  geracaoAnualKwh: number;
  // Economia financeira
  economiasMensal: number;
  economiasAnual: number;
  economias25Anos: number;
  novoValorMensal: number; // valor que o cliente pagará após solar (mín. R$ 70)
  // Payback
  custoEstimadoInstalacao: number;
  paybackAnos: number;
  // Meta
  fonte: 'nasa' | 'estimativa';
}

// ============================================
// 1. Buscar dados do CEP via ViaCEP
// ============================================
export async function buscarCEP(cep: string): Promise<DadosCEP | null> {
  const cepLimpo = cep.replace(/\D/g, '');
  if (cepLimpo.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    if (!res.ok) return null;
    const data: DadosCEP = await res.json();
    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
}

// ============================================
// 2. Buscar irradiação via NASA POWER API (proxy no backend)
// Parâmetro: ALLSKY_SFC_SW_DWN = irradiância global horizontal (kWh/m²/dia)
// Dados climatológicos de 22 anos — excelente precisão para o Brasil
// Performance Ratio de 0.80 = perdas típicas BR (temperatura, cabos, inversor)
// ============================================
const BACKEND_URL = (import.meta as any).env?.VITE_API_URL || 'https://ms-solar-api-production.up.railway.app/api';

const PERFORMANCE_RATIO = 0.80; // PR típico para sistemas fotovoltaicos no Brasil

async function buscarNasaPower(lat: number, lon: number): Promise<ResultadoIrradiacao | null> {
  try {
    const params = new URLSearchParams({
      lat: lat.toFixed(4),
      lon: lon.toFixed(4),
    });

    const res = await fetch(`${BACKEND_URL}/simulacoes/nasa-power?${params}`);
    if (!res.ok) return null;

    const data = await res.json();

    // NASA POWER response: properties.parameter.ALLSKY_SFC_SW_DWN.ANN (média anual)
    const irradiacaoDiaria = data?.properties?.parameter?.ALLSKY_SFC_SW_DWN?.ANN as number;

    // -999 é o código NASA para "sem dados"
    if (!irradiacaoDiaria || irradiacaoDiaria === -999) return null;

    // kWh gerados por kWp por ano = irradiação_diária × 365 dias × Performance Ratio
    const kwhAnuaisPorKwp = irradiacaoDiaria * 365 * PERFORMANCE_RATIO;

    return { kwhAnuaisPorKwp, irradiacaoDiaria, fonte: 'nasa' };
  } catch {
    return null;
  }
}

// ============================================
// 3. Estimativa sem PVGIS (fallback por estado)
// Baseado em médias históricas do CRESESB/INMET
// ============================================
const irradiacaoPorEstado: Record<string, number> = {
  // Norte — alta irradiação equatorial
  AM: 5.2, PA: 5.4, RO: 5.3, AC: 5.0, AP: 5.1, RR: 5.3, TO: 5.7,
  // Nordeste — maior irradiação do Brasil
  MA: 5.6, PI: 6.0, CE: 5.9, RN: 5.8, PB: 5.7, PE: 5.6, AL: 5.5, SE: 5.4, BA: 5.8,
  // Centro-Oeste
  MT: 5.5, MS: 5.3, GO: 5.5, DF: 5.5,
  // Sudeste
  MG: 5.4, ES: 5.2, RJ: 4.9, SP: 4.8,
  // Sul — menor irradiação
  PR: 4.7, SC: 4.5, RS: 4.3,
};

function estimarSemNasa(estado: string): ResultadoIrradiacao {
  const irradiacaoDiaria = irradiacaoPorEstado[estado] ?? 5.0;
  const kwhAnuaisPorKwp = irradiacaoDiaria * 365 * PERFORMANCE_RATIO;
  return { kwhAnuaisPorKwp, irradiacaoDiaria, fonte: 'estimativa' };
}

// ============================================
// 4. Função principal: calcular simulação completa
// ============================================
export async function calcularSimulacao(params: {
  valorContaReais: number;
  lat: number;
  lon: number;
  estado: string;
  cidade: string;
}): Promise<ResultadoSimulacao> {
  const { valorContaReais, lat, lon, estado, cidade } = params;

  // Tarifa do estado (R$/kWh)
  const tarifaKwh = tarifasPorEstado[estado] ?? 0.72;

  // Consumo mensal estimado (kWh/mês)
  const consumoMensalKwh = valorContaReais / tarifaKwh;

  // Dimensionamento inicial do sistema (kWp)
  // Fórmula: consumo_mensal / (irradiação_média × 30 × eficiência)
  // Usamos 5.0 de irradiação como referência para dimensionar; depois corrigimos com PVGIS
  const irradiacaoRef = irradiacaoPorEstado[estado] ?? 5.0;
  const eficiencia = 1 - PERDA_SISTEMA / 100;
  const potenciaSistemaKwp = consumoMensalKwh / (irradiacaoRef * 30 * eficiencia);

  // Buscar irradiação real via NASA POWER (ou fallback por estado)
  let irradiacao = await buscarNasaPower(lat, lon);
  if (!irradiacao) {
    irradiacao = estimarSemNasa(estado);
  }

  // Geração real do sistema
  const geracaoAnualKwh = irradiacao.kwhAnuaisPorKwp * potenciaSistemaKwp;
  const geracaoMensalKwh = geracaoAnualKwh / 12;

  // Economia financeira (geração × tarifa)
  // O cliente sempre paga no mínimo R$ 70 de taxa de conexão à rede
  const TAXA_MINIMA = 70;
  const economiaMaxima = Math.max(0, valorContaReais - TAXA_MINIMA);
  const economiasMensal = Math.min(geracaoMensalKwh * tarifaKwh, economiaMaxima);
  const novoValorMensal = Math.max(TAXA_MINIMA, valorContaReais - economiasMensal);
  const economiasAnual = economiasMensal * 12;
  const economias25Anos = economiasAnual * 25;

  // Número de painéis e área
  const paineisSolares = Math.ceil(potenciaSistemaKwp / POTENCIA_POR_PAINEL);
  const areaTetoNecessariaM2 = paineisSolares * AREA_POR_PAINEL;

  // Payback
  const custoEstimadoInstalacao = potenciaSistemaKwp * CUSTO_POR_KWP;
  const paybackAnos = custoEstimadoInstalacao / economiasAnual;

  return {
    cidade,
    estado,
    tarifaKwh,
    consumoMensalKwh: Math.round(consumoMensalKwh),
    irradiacaoDiaria: parseFloat(irradiacao.irradiacaoDiaria.toFixed(2)),
    potenciaSistemaKwp: parseFloat(potenciaSistemaKwp.toFixed(2)),
    paineisSolares,
    areaTetoNecessariaM2: parseFloat(areaTetoNecessariaM2.toFixed(1)),
    geracaoMensalKwh: Math.round(geracaoMensalKwh),
    geracaoAnualKwh: Math.round(geracaoAnualKwh),
    economiasMensal: parseFloat(economiasMensal.toFixed(2)),
    economiasAnual: parseFloat(economiasAnual.toFixed(2)),
    economias25Anos: parseFloat(economias25Anos.toFixed(2)),
    novoValorMensal: parseFloat(novoValorMensal.toFixed(2)),
    custoEstimadoInstalacao: Math.round(custoEstimadoInstalacao),
    paybackAnos: parseFloat(paybackAnos.toFixed(1)),
    fonte: irradiacao.fonte,
  };
}

// ============================================
// 5. Helpers de formatação
// ============================================
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarPayback(anos: number): string {
  const anosInteiros = Math.floor(anos);
  const meses = Math.round((anos - anosInteiros) * 12);
  if (meses === 0) return `${anosInteiros} anos`;
  if (anosInteiros === 0) return `${meses} meses`;
  return `${anosInteiros} anos e ${meses} meses`;
}
