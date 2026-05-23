import { whatsappLink } from '../../lib/config';
import { useState, useRef } from 'react';
import {
  Calculator, MessageCircle, TrendingDown, DollarSign,
  Zap, MapPin, Loader2, CheckCircle2, Home, Building2,
  Sun, Battery, Ruler, Clock
} from 'lucide-react';
import { simulacoesApi } from '../../api';
import { buscarCEP, calcularSimulacao, formatarMoeda, formatarPayback } from '../../lib/simulacaoSolar';
import { buscarCoordenadasCidade } from '../../lib/cidadesCoords';
import type { ResultadoSimulacao } from '../../lib/simulacaoSolar';

type CepStatus = 'idle' | 'loading' | 'found' | 'error';

const inputStyle = {
  base: 'w-full px-5 py-4 rounded-xl border-2 focus:outline-none transition-all text-gray-800 bg-white',
  border: '#E0E0E0',
  focus: '#FDB813',
};

function InputField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-2 font-medium" style={{ color: '#0A2540' }}>{label}</label>
      {children}
    </div>
  );
}

export function SimulationV3() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    cep: '',
    billValue: '',
    propertyType: 'residencial',
  });

  const [cepStatus, setCepStatus] = useState<CepStatus>('idle');
  const [cepInfo, setCepInfo] = useState<{ cidade: string; estado: string; lat: number; lon: number } | null>(null);
  const [cepLabel, setCepLabel] = useState('');

  const [isCalculating, setIsCalculating] = useState(false);
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);

  const resultadoRef = useRef<HTMLDivElement>(null);

  // ——— CEP lookup ———
  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setCepStatus('loading');
    setCepInfo(null);
    setCepLabel('');

    const dados = await buscarCEP(cep);
    if (!dados) {
      setCepStatus('error');
      return;
    }

    let coords = buscarCoordenadasCidade(dados.localidade);

    if (!coords) {
      coords = buscarCoordenadasCidade(dados.uf === 'SP' ? 'são paulo'
        : dados.uf === 'RJ' ? 'rio de janeiro'
        : dados.uf === 'MG' ? 'belo horizonte'
        : dados.uf === 'RS' ? 'porto alegre'
        : dados.uf === 'PR' ? 'curitiba'
        : dados.uf === 'BA' ? 'salvador'
        : dados.uf === 'CE' ? 'fortaleza'
        : dados.uf === 'PE' ? 'recife'
        : dados.uf === 'GO' ? 'goiânia'
        : dados.uf === 'DF' ? 'brasília'
        : dados.localidade);
    }

    if (!coords) {
      setCepStatus('error');
      return;
    }

    setCepInfo({ cidade: dados.localidade, estado: dados.uf, lat: coords.lat, lon: coords.lon });
    setCepLabel(`${dados.localidade} — ${dados.uf}`);
    setCepStatus('found');
  };

  const formatCep = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  };

  // ——— Submit ———
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInfo) return;

    setIsCalculating(true);
    setResultado(null);

    try {
      const res = await calcularSimulacao({
        valorContaReais: parseFloat(formData.billValue) || 0,
        lat: cepInfo.lat,
        lon: cepInfo.lon,
        estado: cepInfo.estado,
        cidade: cepInfo.cidade,
      });

      setResultado(res);

      setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

      simulacoesApi.criar({
        nome: formData.name,
        whatsapp: formData.whatsapp,
        valorConta: parseFloat(formData.billValue),
        cidade: cepInfo.cidade,
        tipoImovel: formData.propertyType,
        economiaAnualReal: res.economiasAnual,
        potenciaSistemaReal: res.potenciaSistemaKwp,
        paineisSolaresReal: res.paineisSolares,
      } as any).catch(() => {});

    } catch (err) {
      console.error('Erro na simulação:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="simulacao" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#0A2540' }}>
            Calcule sua economia agora
          </h2>
          <p className="text-xl" style={{ color: '#0A2540', opacity: 0.7 }}>
            Simulação real baseada na irradiação solar da sua cidade
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nome + WhatsApp */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Nome completo *">
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputStyle.base}
                  style={{ borderColor: inputStyle.border }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = inputStyle.focus)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = inputStyle.border)}
                  placeholder="Digite seu nome"
                />
              </InputField>

              <InputField label="WhatsApp *">
                <input
                  type="tel" required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className={inputStyle.base}
                  style={{ borderColor: inputStyle.border }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = inputStyle.focus)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = inputStyle.border)}
                  placeholder="(11) 98765-4321"
                />
              </InputField>
            </div>

            {/* CEP + Valor Conta */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="CEP *">
                <div className="relative">
                  <input
                    type="text" required
                    value={formData.cep}
                    onChange={(e) => {
                      setFormData({ ...formData, cep: formatCep(e.target.value) });
                      setCepStatus('idle');
                      setCepInfo(null);
                      setCepLabel('');
                    }}
                    onBlur={handleCepBlur}
                    className={inputStyle.base}
                    style={{
                      borderColor: cepStatus === 'found' ? '#25D366'
                        : cepStatus === 'error' ? '#ef4444'
                        : inputStyle.border,
                      paddingRight: '3rem',
                    }}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {cepStatus === 'loading' && <Loader2 size={20} className="animate-spin text-gray-400" />}
                    {cepStatus === 'found' && <CheckCircle2 size={20} className="text-[#25D366]" />}
                    {cepStatus === 'idle' && <MapPin size={20} className="text-gray-400" />}
                    {cepStatus === 'error' && (
                      <span className="text-red-500 text-xs font-medium">CEP inválido</span>
                    )}
                  </div>
                </div>
                {cepLabel && (
                  <p className="mt-1.5 text-sm font-medium flex items-center gap-1" style={{ color: '#25D366' }}>
                    <MapPin size={14} /> {cepLabel}
                  </p>
                )}
                {cepStatus === 'error' && (
                  <p className="mt-1.5 text-sm text-red-500">CEP não encontrado. Verifique e tente novamente.</p>
                )}
              </InputField>

              <InputField label="Valor médio da conta de energia (R$) *">
                <input
                  type="number" required min="50"
                  value={formData.billValue}
                  onChange={(e) => setFormData({ ...formData, billValue: e.target.value })}
                  className={inputStyle.base}
                  style={{ borderColor: inputStyle.border }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = inputStyle.focus)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = inputStyle.border)}
                  placeholder="500"
                />
              </InputField>
            </div>

            {/* Tipo de Imóvel */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: '#0A2540' }}>
                Tipo de imóvel *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'residencial', label: 'Residencial', icon: <Home size={18} /> },
                  { value: 'comercial', label: 'Comercial', icon: <Building2 size={18} /> },
                ].map(({ value, label, icon }) => (
                  <button
                    key={value} type="button"
                    onClick={() => setFormData({ ...formData, propertyType: value })}
                    className="px-6 py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium"
                    style={{
                      backgroundColor: formData.propertyType === value ? '#FDB813' : 'white',
                      borderColor: formData.propertyType === value ? '#FDB813' : '#E0E0E0',
                      color: formData.propertyType === value ? '#0A2540' : '#666',
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit — spans always in DOM to avoid React insertBefore errors */}
            <button
              type="submit"
              disabled={isCalculating || !cepInfo || !formData.billValue}
              className="w-full py-5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-white text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#FDB813' }}
            >
              <span className="flex items-center justify-center gap-3" style={{ display: isCalculating ? 'flex' : 'none' }}>
                <Loader2 className="w-6 h-6 animate-spin" /> Calculando com dados reais...
              </span>
              <span className="flex items-center justify-center gap-3" style={{ display: isCalculating ? 'none' : 'flex' }}>
                <Calculator className="w-6 h-6" /> Calcular Minha Economia
              </span>
            </button>
          </form>

          {/* ——— RESULTADO — always in DOM, visible only when resultado exists ——— */}
          <div ref={resultadoRef} className="mt-10 space-y-6" style={{ display: resultado ? undefined : 'none' }}>
            {resultado && (
              <>
                {/* Badge fonte de dados */}
                <div className="flex items-center justify-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
                    resultado.fonte === 'nasa'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Sun size={14} />
                    {resultado.fonte === 'nasa'
                      ? 'Cálculo com dados reais da NASA POWER (22 anos de satélite)'
                      : 'Estimativa baseada em dados históricos da região'}
                  </span>
                </div>

                {/* Cabeçalho resultado */}
                <div className="p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0d3a6e 100%)' }}>
                  <Zap className="w-10 h-10 mx-auto mb-3" style={{ color: '#FDB813' }} />
                  <h3 className="text-2xl font-bold text-white mb-1">Sua Economia Estimada</h3>
                  <p className="text-blue-200 text-sm">
                    {resultado.cidade} — {resultado.estado} · Irradiação: {resultado.irradiacaoDiaria} kWh/m²/dia · Tarifa: R$ {resultado.tarifaKwh.toFixed(2)}/kWh
                  </p>
                </div>

                {/* Cards de economia */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Card especial: nova conta mensal */}
                  <div className="bg-white border-2 p-6 rounded-2xl text-center shadow-sm" style={{ borderColor: '#FDB813' }}>
                    <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ backgroundColor: '#FDB813', color: '#0A2540' }}>
                      <TrendingDown />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Nova conta mensal</p>
                    <p className="text-2xl font-bold" style={{ color: '#FDB813' }}>{formatarMoeda(resultado.novoValorMensal)}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      antes: {formatarMoeda(resultado.economiasMensal + resultado.novoValorMensal)}
                      {resultado.novoValorMensal === 70 && <span className="block text-[#FDB813]">taxa mínima de conexão</span>}
                    </p>
                  </div>

                  {[
                    { icon: <DollarSign />, label: 'Economia por ano', valor: formatarMoeda(resultado.economiasAnual) },
                    { icon: <DollarSign />, label: 'Em 25 anos', valor: formatarMoeda(resultado.economias25Anos) },
                  ].map(({ icon, label, valor }) => (
                    <div key={label} className="bg-white border-2 p-6 rounded-2xl text-center shadow-sm" style={{ borderColor: '#FDB813' }}>
                      <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ backgroundColor: '#FDB813', color: '#0A2540' }}>
                        {icon}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{label}</p>
                      <p className="text-2xl font-bold" style={{ color: '#FDB813' }}>{valor}</p>
                    </div>
                  ))}
                </div>

                {/* Cards técnicos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      icon: <Battery size={20} />,
                      label: 'Potência do sistema',
                      valor: `${resultado.potenciaSistemaKwp} kWp`,
                      sub: `Sistema dimensionado`,
                      cor: '#0A2540',
                    },
                    {
                      icon: <Zap size={20} />,
                      label: 'Geração mensal',
                      valor: `${resultado.geracaoMensalKwh} kWh`,
                      sub: `${resultado.geracaoAnualKwh} kWh/ano`,
                      cor: '#0A2540',
                    },
                    {
                      icon: <Ruler size={20} />,
                      label: 'Área de telhado',
                      valor: `${resultado.areaTetoNecessariaM2} m²`,
                      sub: `área estimada`,
                      cor: '#0A2540',
                    },
                    {
                      icon: <Clock size={20} />,
                      label: 'Retorno do investimento',
                      valor: formatarPayback(resultado.paybackAnos),
                      sub: `Investimento ~${formatarMoeda(resultado.custoEstimadoInstalacao)}`,
                      cor: '#25D366',
                    },
                  ].map(({ icon, label, valor, sub, cor }) => (
                    <div key={label} className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: cor }}>
                        {icon}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                      <p className="text-lg font-bold" style={{ color: '#0A2540' }}>{valor}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* CTA WhatsApp */}
                <button
                  onClick={() => window.open(
                    whatsappLink(`Olá! Fiz a simulação para ${resultado.cidade}/${resultado.estado} e vi que posso economizar ${formatarMoeda(resultado.economiasAnual)}/ano. Gostaria de receber um orçamento!`),
                    '_blank'
                  )}
                  className="w-full py-5 rounded-xl transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 text-white text-lg font-semibold"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-6 h-6" />
                  Receber Orçamento no WhatsApp
                </button>

                <p className="text-center text-xs text-gray-400">
                  * Valores estimados. O orçamento final pode variar conforme vistoria técnica, tipo de telhado e consumo real.
                  {resultado.fonte === 'nasa' && ' Dados de irradiação fornecidos pela NASA POWER (22 anos de satélite).'}
                </p>
              </>
            )}
          </div>

          {/* ——— CTA — always in DOM, hidden when resultado exists ——— */}
          <div className="mt-8 text-center" style={{ display: resultado ? 'none' : undefined }}>
            <p className="mb-4" style={{ color: '#0A2540', opacity: 0.7 }}>
              Ou fale direto com um especialista
            </p>
            <button
              onClick={() => window.open(whatsappLink('Olá! Quero falar com um especialista.'), '_blank')}
              className="px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-white mx-auto"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Conversar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
