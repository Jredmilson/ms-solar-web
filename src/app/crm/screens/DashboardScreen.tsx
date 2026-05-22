import { useState, useEffect } from "react";
import { Users, Calculator, MessageCircle, TrendingUp } from "lucide-react";
import { KPICard } from "../components/KPICard";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { dashboardApi } from "../../api";

export function DashboardScreen() {
  const [kpis, setKpis] = useState({ totalLeads: 0, totalSimulacoes: 0, totalWhatsappClicks: 0, leadsHoje: 0 });
  const [leadsDiarios, setLeadsDiarios] = useState<any[]>([]);
  const [comparativo, setComparativo] = useState<any[]>([]);
  const [origemLeads, setOrigemLeads] = useState<any[]>([]);
  const [ultimosLeads, setUltimosLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [kpisData, diarios, comp, origem, ultimos] = await Promise.all([
          dashboardApi.kpis(),
          dashboardApi.leadsDiarios(),
          dashboardApi.comparativoOrigem(),
          dashboardApi.origemLeads(),
          dashboardApi.ultimosLeads(),
        ]);
        setKpis(kpisData);
        setLeadsDiarios(diarios);
        setComparativo(comp);
        setOrigemLeads(origem);
        setUltimosLeads(ultimos);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#0A2540] text-lg">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total de Leads" value={kpis.totalLeads} icon={Users}
          trend={{ value: "+12% vs mês anterior", isPositive: true }}
          iconBgColor="bg-[#0A2540]" iconColor="text-white" />
        <KPICard title="Total de Simulações" value={kpis.totalSimulacoes} icon={Calculator}
          trend={{ value: "+8% vs mês anterior", isPositive: true }}
          iconBgColor="bg-[#FDB813]" iconColor="text-[#0A2540]" />
        <KPICard title="Cliques no WhatsApp" value={kpis.totalWhatsappClicks} icon={MessageCircle}
          trend={{ value: "+15% vs mês anterior", isPositive: true }}
          iconBgColor="bg-[#25D366]" iconColor="text-white" />
        <KPICard title="Leads Novos Hoje" value={kpis.leadsHoje} icon={TrendingUp}
          iconBgColor="bg-blue-500" iconColor="text-white" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Leads por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadsDiarios}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="data" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="leads" stroke="#0A2540" strokeWidth={3}
                dot={{ fill: '#FDB813', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Simulações vs WhatsApp</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="tipo" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
              <Bar dataKey="quantidade" fill="#FDB813" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A2540] mb-4">Origem dos Leads</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={origemLeads} cx="50%" cy="50%" labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100} dataKey="value">
              {origemLeads.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A2540] mb-4">Últimos Leads</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nome</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cidade</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Origem</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
              </tr>
            </thead>
            <tbody>
              {ultimosLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900">{lead.nome}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{lead.cidade}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.origem === 'simulacao' ? 'bg-[#FDB813]/20 text-[#0A2540]' : 'bg-[#25D366]/20 text-green-900'
                    }`}>
                      {lead.origem === 'simulacao' ? 'Simulação' : 'WhatsApp'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'novo' ? 'bg-blue-100 text-blue-700'
                        : lead.status === 'contatado' ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
