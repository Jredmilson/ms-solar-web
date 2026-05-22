import { useState, useEffect } from "react";
import { TrendingUp, Users, Calculator, MessageCircle, RefreshCw } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { dashboardApi } from "../../api";

const COLORS = ['#0A2540', '#FDB813', '#25D366', '#3B82F6', '#8B5CF6'];

export function ReportsScreen() {
  const [dados, setDados] = useState<any>(null);
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDados = async () => {
    setLoading(true);
    try {
      const [relatorios, kpisData] = await Promise.all([
        dashboardApi.relatorios(),
        dashboardApi.kpis(),
      ]);
      setDados(relatorios);
      setKpis(kpisData);
    } catch (err) {
      console.error("Erro ao carregar relatórios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDados(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Carregando relatórios...
      </div>
    );
  }

  // Dados de distribuição de status para radar
  const statusDist = dados?.distribuicaoStatus || [];
  const performanceData = [
    { categoria: 'Total Leads', value: Math.min((kpis?.totalLeads || 0) / 2, 100) },
    { categoria: 'Simulações', value: Math.min((kpis?.totalSimulacoes || 0) * 2, 100) },
    { categoria: 'WhatsApp', value: Math.min((kpis?.totalWhatsappClicks || 0) * 3, 100) },
    { categoria: 'Hoje', value: Math.min((kpis?.leadsHoje || 0) * 10, 100) },
    {
      categoria: 'Conversão',
      value: parseFloat(
        dados?.conversaoPorOrigem?.reduce((acc: number, o: any) => acc + parseFloat(o.taxa || 0), 0) /
        Math.max(dados?.conversaoPorOrigem?.length || 1, 1) || 0
      ),
    },
  ];

  // Funil de conversão a partir dos dados reais
  const totalLeads = kpis?.totalLeads || 0;
  const contatados = statusDist.find((s: any) => s.status === 'contatado')?.quantidade || 0;
  const convertidos = statusDist.find((s: any) => s.status === 'convertido')?.quantidade || 0;
  const conversionFunnelData = [
    { etapa: 'Total Leads', quantidade: totalLeads },
    { etapa: 'Simulações', quantidade: kpis?.totalSimulacoes || 0 },
    { etapa: 'Contatados', quantidade: parseInt(contatados) },
    { etapa: 'Convertidos', quantidade: parseInt(convertidos) },
  ];

  const taxaConversao = totalLeads > 0
    ? ((parseInt(convertidos) / totalLeads) * 100).toFixed(1)
    : '0.0';

  const leadsPorSemana = dados?.leadsPorSemana || [];

  // Distribuição de origem para comparativo mensal
  const conversaoPorOrigem = dados?.conversaoPorOrigem || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0A2540]">Relatórios e Análises</h2>
        <button onClick={fetchDados}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <RefreshCw size={16} /> Atualizar
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Leads', valor: kpis?.totalLeads || 0, icon: <Users size={24} className="text-blue-600" />, bg: 'bg-blue-100', cor: 'text-[#0A2540]' },
          { label: 'Taxa de Conversão', valor: `${taxaConversao}%`, icon: <TrendingUp size={24} className="text-green-600" />, bg: 'bg-green-100', cor: 'text-green-600' },
          { label: 'Simulações', valor: kpis?.totalSimulacoes || 0, icon: <Calculator size={24} className="text-yellow-600" />, bg: 'bg-yellow-100', cor: 'text-[#FDB813]' },
          { label: 'Cliques WhatsApp', valor: kpis?.totalWhatsappClicks || 0, icon: <MessageCircle size={24} className="text-green-600" />, bg: 'bg-green-100', cor: 'text-[#25D366]' },
        ].map(({ label, valor, icon, bg, cor }) => (
          <div key={label} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{label}</p>
                <p className={`text-3xl font-bold ${cor}`}>{valor}</p>
              </div>
              <div className={`p-3 ${bg} rounded-lg`}>{icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads por semana */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Leads por Semana (últimas 8 semanas)</h3>
          {leadsPorSemana.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
              Ainda não há dados suficientes
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsPorSemana}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="semana" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="leads" stroke="#0A2540" strokeWidth={3} name="Leads" dot={{ r: 4, fill: '#FDB813' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Funil de conversão real */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Funil de Conversão</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="etapa" type="category" stroke="#666" width={100} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
              <Bar dataKey="quantidade" fill="#FDB813" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversão por origem */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Taxa de Conversão por Origem</h3>
          {conversaoPorOrigem.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">Sem dados</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversaoPorOrigem.map((o: any) => ({
                origem: o.origem === 'simulacao' ? 'Simulação' : 'WhatsApp',
                total: parseInt(o.total),
                convertidos: parseInt(o.convertidos),
                taxa: parseFloat(o.taxa),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="origem" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="total" fill="#0A2540" name="Total" radius={[8, 8, 0, 0]} />
                <Bar dataKey="convertidos" fill="#25D366" name="Convertidos" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Distribuição status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Distribuição por Status</h3>
          {statusDist.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">Sem dados</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDist.map((s: any) => ({
                    name: s.status.charAt(0).toUpperCase() + s.status.slice(1),
                    value: parseInt(s.quantidade),
                  }))}
                  cx="50%" cy="50%" outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusDist.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Métricas detalhadas reais */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A2540] mb-6">Métricas Detalhadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Taxa de Conversão Geral</h4>
            <p className="text-3xl font-bold text-blue-700 mb-1">{taxaConversao}%</p>
            <p className="text-xs text-blue-600">{convertidos} de {totalLeads} leads convertidos</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
            <h4 className="text-sm font-semibold text-yellow-900 mb-2">Leads por Simulação</h4>
            <p className="text-3xl font-bold text-yellow-700 mb-1">
              {kpis?.totalSimulacoes > 0
                ? ((kpis?.totalLeads || 0) / kpis?.totalSimulacoes).toFixed(1)
                : '—'}
            </p>
            <p className="text-xs text-yellow-700">{kpis?.totalSimulacoes} simulações realizadas</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">Leads Hoje</h4>
            <p className="text-3xl font-bold text-green-700 mb-1">{kpis?.leadsHoje || 0}</p>
            <p className="text-xs text-green-600">Captados nas últimas 24h</p>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#0A2540]/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Exportar Relatórios</h3>
            <p className="text-blue-200">Gere relatórios completos para análise detalhada</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white text-[#0A2540] rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Exportar PDF
            </button>
            <button className="px-6 py-3 bg-[#FDB813] text-[#0A2540] rounded-lg hover:bg-[#FDB813]/90 transition-colors font-medium">
              Exportar Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
