import { useState, useEffect } from "react";
import { Monitor, Smartphone, RefreshCw } from "lucide-react";
import { whatsappClicksApi } from "../../api";

export function WhatsAppClicksScreen() {
  const [clicks, setClicks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchClicks = async () => {
    setLoading(true);
    try {
      const result = await whatsappClicksApi.listar();
      setClicks(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error("Erro ao carregar cliques:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClicks(); }, []);

  const mobileCount = clicks.filter(c => c.dispositivo === 'mobile').length;
  const desktopCount = clicks.filter(c => c.dispositivo === 'desktop').length;

  const origemCount = clicks.reduce((acc: any, c) => {
    acc[c.origem_pagina] = (acc[c.origem_pagina] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0A2540]">Cliques no WhatsApp</h2>
        <button onClick={fetchClicks} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <RefreshCw size={16} /> Atualizar
        </button>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total de Cliques</p>
            <p className="text-3xl font-bold text-[#0A2540] mt-1">{total}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-3">
            <Smartphone className="text-[#25D366]" size={28} />
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="text-2xl font-bold text-[#0A2540]">{mobileCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-3">
            <Monitor className="text-blue-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">Desktop</p>
              <p className="text-2xl font-bold text-[#0A2540]">{desktopCount}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && Object.keys(origemCount).length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Cliques por Origem</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(origemCount).map(([origem, count]) => (
              <div key={origem} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">{origem}</p>
                <p className="text-2xl font-bold text-[#0A2540]">{count as number}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Carregando cliques...</div>
        ) : clicks.length === 0 ? (
          <div className="p-10 text-center text-gray-500">Nenhum clique registrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['#', 'Origem da Página', 'Dispositivo', 'Data/Hora'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clicks.map((click, idx) => (
                  <tr key={click.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">{idx + 1}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{click.origem_pagina}</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 text-xs font-medium ${click.dispositivo === 'mobile' ? 'text-green-600' : 'text-blue-600'}`}>
                        {click.dispositivo === 'mobile' ? <Smartphone size={14} /> : <Monitor size={14} />}
                        {click.dispositivo === 'mobile' ? 'Mobile' : 'Desktop'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(click.created_at).toLocaleString('pt-BR')}
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
