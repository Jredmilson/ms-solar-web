import { useState, useEffect, useCallback } from "react";
import { Calendar, MessageCircle, Sun, Zap } from "lucide-react";
import { simulacoesApi } from "../../api";

export function SimulationsScreen() {
  const [simulacoes, setSimulacoes] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchSimulacoes = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (dateFilter) params.date = dateFilter;
      const result = await simulacoesApi.listar(params);
      setSimulacoes(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error("Erro ao carregar simulações:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, dateFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchSimulacoes, 300);
    return () => clearTimeout(timer);
  }, [fetchSimulacoes]);

  const totalEconomia = simulacoes.reduce((acc, s) => acc + parseFloat(s.economia_anual || 0), 0);

  const handleWhatsApp = (sim: any) => {
    const message = encodeURIComponent(
      `Olá ${sim.nome}! Vi sua simulação de energia solar. Gostaria de conversar sobre como podemos ajudá-lo a economizar R$ ${parseFloat(sim.economia_anual).toFixed(2)} por ano!`
    );
    window.open(`https://wa.me/55${sim.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[250px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
          />
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>
          <span className="text-sm text-gray-500">{total} simulação(ões)</span>
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FDB813]/20 rounded-xl flex items-center justify-center">
              <Sun className="text-[#0A2540]" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Simulações</p>
              <p className="text-2xl font-bold text-[#0A2540]">{total}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Zap className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Economia Anual Estimada</p>
              <p className="text-2xl font-bold text-[#0A2540]">
                R$ {totalEconomia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Carregando simulações...</div>
        ) : simulacoes.length === 0 ? (
          <div className="p-10 text-center text-gray-500">Nenhuma simulação encontrada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Nome', 'WhatsApp', 'Cidade', 'Valor Conta', 'Economia Anual', 'Potência', 'Painéis', 'Data', 'Ações'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {simulacoes.map((sim) => (
                  <tr key={sim.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{sim.nome}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sim.whatsapp || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sim.cidade || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">R$ {parseFloat(sim.valor_conta).toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">
                      R$ {parseFloat(sim.economia_anual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{parseFloat(sim.potencia_sistema).toFixed(1)} kWp</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sim.paineis_solares} painéis</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(sim.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      {sim.whatsapp && (
                        <button onClick={() => handleWhatsApp(sim)}
                          className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                          <MessageCircle size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
