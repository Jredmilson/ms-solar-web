import { useState, useEffect } from "react";
import { RefreshCw, MessageCircle } from "lucide-react";
import { leadsAbandonadosApi } from "../../api";

export function AbandonedLeadsScreen() {
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const result = await leadsAbandonadosApi.listar();
      setLeads(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error("Erro ao carregar leads abandonados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleWhatsApp = (lead: any) => {
    if (!lead.whatsapp) return;
    const message = encodeURIComponent(
      `Olá${lead.nome ? ` ${lead.nome}` : ''}! Vimos que você iniciou uma simulação de energia solar. Podemos ajudá-lo a concluir e descobrir sua economia!`
    );
    window.open(`https://wa.me/55${lead.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0A2540]">Carrinho Abandonado</h2>
        <button onClick={fetchLeads} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <RefreshCw size={16} /> Atualizar
        </button>
      </div>

      {!loading && (
        <div className="bg-white rounded-xl p-5 shadow-sm inline-block">
          <p className="text-sm text-gray-500">Total de Abandonos</p>
          <p className="text-3xl font-bold text-[#0A2540] mt-1">{total}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Carregando...</div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center text-gray-500">Nenhum abandono registrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Nome', 'WhatsApp', 'Etapa Alcançada', 'Última Atividade', 'Ações'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{lead.nome || <span className="text-gray-400 italic">Não informado</span>}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.whatsapp || <span className="text-gray-400 italic">Não informado</span>}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        {lead.etapa_alcancada}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(lead.ultima_atividade).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      {lead.whatsapp && (
                        <button onClick={() => handleWhatsApp(lead)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-medium hover:bg-[#1da851] transition-colors">
                          <MessageCircle size={14} /> Contatar
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
