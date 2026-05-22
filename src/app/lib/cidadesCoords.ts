// Coordenadas das principais cidades brasileiras
// Usadas como fallback quando o CEP não retorna lat/lon diretamente
// Fonte: IBGE + OpenStreetMap

export interface CidadeCoord {
  lat: number;
  lon: number;
  estado: string;
}

export const cidadesCoords: Record<string, CidadeCoord> = {
  // São Paulo
  'são paulo': { lat: -23.5505, lon: -46.6333, estado: 'SP' },
  'campinas': { lat: -22.9056, lon: -47.0608, estado: 'SP' },
  'guarulhos': { lat: -23.4636, lon: -46.5333, estado: 'SP' },
  'são bernardo do campo': { lat: -23.6939, lon: -46.5650, estado: 'SP' },
  'santo andré': { lat: -23.6639, lon: -46.5383, estado: 'SP' },
  'osasco': { lat: -23.5322, lon: -46.7919, estado: 'SP' },
  'ribeirão preto': { lat: -21.1775, lon: -47.8103, estado: 'SP' },
  'sorocaba': { lat: -23.5015, lon: -47.4526, estado: 'SP' },
  'santos': { lat: -23.9618, lon: -46.3322, estado: 'SP' },
  'bauru': { lat: -22.3147, lon: -49.0608, estado: 'SP' },
  'jundiaí': { lat: -23.1864, lon: -46.8964, estado: 'SP' },
  'franca': { lat: -20.5386, lon: -47.4008, estado: 'SP' },
  'piracicaba': { lat: -22.7253, lon: -47.6492, estado: 'SP' },
  'limeira': { lat: -22.5647, lon: -47.4019, estado: 'SP' },
  // Rio de Janeiro
  'rio de janeiro': { lat: -22.9068, lon: -43.1729, estado: 'RJ' },
  'niterói': { lat: -22.8831, lon: -43.1042, estado: 'RJ' },
  'nova iguaçu': { lat: -22.7597, lon: -43.4511, estado: 'RJ' },
  'duque de caxias': { lat: -22.7858, lon: -43.3117, estado: 'RJ' },
  'petrópolis': { lat: -22.5050, lon: -43.1786, estado: 'RJ' },
  'volta redonda': { lat: -22.5231, lon: -44.1047, estado: 'RJ' },
  // Minas Gerais
  'belo horizonte': { lat: -19.9167, lon: -43.9345, estado: 'MG' },
  'uberlândia': { lat: -18.9186, lon: -48.2772, estado: 'MG' },
  'juiz de fora': { lat: -21.7642, lon: -43.3503, estado: 'MG' },
  'betim': { lat: -19.9678, lon: -44.1983, estado: 'MG' },
  'montes claros': { lat: -16.7286, lon: -43.8614, estado: 'MG' },
  'uberaba': { lat: -19.7478, lon: -47.9319, estado: 'MG' },
  'governador valadares': { lat: -18.8511, lon: -41.9494, estado: 'MG' },
  'ipatinga': { lat: -19.4728, lon: -42.5364, estado: 'MG' },
  // Bahia
  'salvador': { lat: -12.9714, lon: -38.5014, estado: 'BA' },
  'feira de santana': { lat: -12.2667, lon: -38.9667, estado: 'BA' },
  'vitória da conquista': { lat: -14.8619, lon: -40.8444, estado: 'BA' },
  'camaçari': { lat: -12.6997, lon: -38.3244, estado: 'BA' },
  'juazeiro': { lat: -9.4142, lon: -40.5036, estado: 'BA' },
  // Rio Grande do Sul
  'porto alegre': { lat: -30.0346, lon: -51.2177, estado: 'RS' },
  'caxias do sul': { lat: -29.1678, lon: -51.1794, estado: 'RS' },
  'pelotas': { lat: -31.7654, lon: -52.3376, estado: 'RS' },
  'canoas': { lat: -29.9178, lon: -51.1839, estado: 'RS' },
  'santa maria': { lat: -29.6842, lon: -53.8069, estado: 'RS' },
  'novo hamburgo': { lat: -29.6783, lon: -51.1306, estado: 'RS' },
  // Paraná
  'curitiba': { lat: -25.4297, lon: -49.2711, estado: 'PR' },
  'londrina': { lat: -23.3045, lon: -51.1696, estado: 'PR' },
  'maringá': { lat: -23.4205, lon: -51.9333, estado: 'PR' },
  'ponta grossa': { lat: -25.0944, lon: -50.1608, estado: 'PR' },
  'cascavel': { lat: -24.9578, lon: -53.4553, estado: 'PR' },
  'foz do iguaçu': { lat: -25.5478, lon: -54.5881, estado: 'PR' },
  // Pernambuco
  'recife': { lat: -8.0476, lon: -34.8770, estado: 'PE' },
  'olinda': { lat: -7.9986, lon: -34.8550, estado: 'PE' },
  'caruaru': { lat: -8.2761, lon: -35.9761, estado: 'PE' },
  'petrolina': { lat: -9.3889, lon: -40.5028, estado: 'PE' },
  'jaboatão dos guararapes': { lat: -8.1128, lon: -35.0050, estado: 'PE' },
  // Ceará
  'fortaleza': { lat: -3.7172, lon: -38.5433, estado: 'CE' },
  'juazeiro do norte': { lat: -7.2133, lon: -39.3150, estado: 'CE' },
  'sobral': { lat: -3.6878, lon: -40.3492, estado: 'CE' },
  // Pará
  'belém': { lat: -1.4558, lon: -48.5044, estado: 'PA' },
  'santarém': { lat: -2.4441, lon: -54.7083, estado: 'PA' },
  'marabá': { lat: -5.3686, lon: -49.1178, estado: 'PA' },
  // Goiás
  'goiânia': { lat: -16.6869, lon: -49.2648, estado: 'GO' },
  'anápolis': { lat: -16.3281, lon: -48.9531, estado: 'GO' },
  'rio verde': { lat: -17.7983, lon: -50.9239, estado: 'GO' },
  // Distrito Federal
  'brasília': { lat: -15.7801, lon: -47.9292, estado: 'DF' },
  // Espírito Santo
  'vitória': { lat: -20.2976, lon: -40.2958, estado: 'ES' },
  'vila velha': { lat: -20.3297, lon: -40.2922, estado: 'ES' },
  'serra': { lat: -20.1297, lon: -40.3086, estado: 'ES' },
  'cariacica': { lat: -20.2639, lon: -40.4169, estado: 'ES' },
  // Mato Grosso do Sul
  'campo grande': { lat: -20.4697, lon: -54.6201, estado: 'MS' },
  'dourados': { lat: -22.2211, lon: -54.8058, estado: 'MS' },
  // Mato Grosso
  'cuiabá': { lat: -15.5989, lon: -56.0949, estado: 'MT' },
  // Amazonas
  'manaus': { lat: -3.1190, lon: -60.0217, estado: 'AM' },
  // Maranhão
  'são luís': { lat: -2.5297, lon: -44.3028, estado: 'MA' },
  'imperatriz': { lat: -5.5247, lon: -47.4911, estado: 'MA' },
  // Rio Grande do Norte
  'natal': { lat: -5.7945, lon: -35.2110, estado: 'RN' },
  'mossoró': { lat: -5.1878, lon: -37.3442, estado: 'RN' },
  // Paraíba
  'joão pessoa': { lat: -7.1195, lon: -34.8450, estado: 'PB' },
  'campina grande': { lat: -7.2306, lon: -35.8811, estado: 'PB' },
  // Alagoas
  'maceió': { lat: -9.6658, lon: -35.7350, estado: 'AL' },
  // Piauí
  'teresina': { lat: -5.0892, lon: -42.8019, estado: 'PI' },
  // Sergipe
  'aracaju': { lat: -10.9472, lon: -37.0731, estado: 'SE' },
  // Rondônia
  'porto velho': { lat: -8.7612, lon: -63.9004, estado: 'RO' },
  // Tocantins
  'palmas': { lat: -10.1689, lon: -48.3317, estado: 'TO' },
  // Acre
  'rio branco': { lat: -9.9754, lon: -67.8249, estado: 'AC' },
  // Amapá
  'macapá': { lat: -0.0349, lon: -51.0694, estado: 'AP' },
  // Roraima
  'boa vista': { lat: 2.8235, lon: -60.6758, estado: 'RR' },
  // Santa Catarina
  'florianópolis': { lat: -27.5954, lon: -48.5480, estado: 'SC' },
  'joinville': { lat: -26.3044, lon: -48.8456, estado: 'SC' },
  'blumenau': { lat: -26.9194, lon: -49.0661, estado: 'SC' },
  'chapecó': { lat: -27.0983, lon: -52.6150, estado: 'SC' },
  'criciúma': { lat: -28.6775, lon: -49.3697, estado: 'SC' },
  'itajaí': { lat: -26.9078, lon: -48.6619, estado: 'SC' },
};

// Tarifas médias de energia por estado (R$/kWh) — dados ANEEL 2024
// Atualizar periodicamente conforme resoluções tarifárias
export const tarifasPorEstado: Record<string, number> = {
  AC: 0.88, AL: 0.72, AM: 0.84, AP: 0.75, BA: 0.75,
  CE: 0.70, DF: 0.68, ES: 0.72, GO: 0.71, MA: 0.73,
  MG: 0.74, MS: 0.71, MT: 0.68, PA: 0.76, PB: 0.70,
  PE: 0.73, PI: 0.72, PR: 0.65, RJ: 0.88, RN: 0.71,
  RO: 0.79, RR: 0.68, RS: 0.68, SC: 0.68, SE: 0.73,
  SP: 0.70, TO: 0.72,
};

// Custo médio de instalação por kWp no Brasil (R$) — mercado 2024
export const CUSTO_POR_KWP = 4500;
// Perda de eficiência dos painéis assumida (%)
export const PERDA_SISTEMA = 14;
// Área média por painel (m²)
export const AREA_POR_PAINEL = 2.0;
// Potência por painel (kWp)
export const POTENCIA_POR_PAINEL = 0.40;

export function buscarCoordenadasCidade(cidade: string): CidadeCoord | null {
  const normalizar = (s: string) =>
    s.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const chave = normalizar(cidade);
  for (const [nome, coord] of Object.entries(cidadesCoords)) {
    if (normalizar(nome) === chave) return coord;
  }
  return null;
}
