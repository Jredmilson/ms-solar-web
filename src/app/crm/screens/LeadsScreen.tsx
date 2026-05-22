import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, RefreshCw, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { leadsApi } from "../../api";
import { LeadStatus, LeadSource } from "../types";

const STATUS_STYLE: Record<string, string> = {
  novo:       'bg-blue-100 text-blue-700',
  contatado:  'bg-yellow-100 text-yellow-700',
  convertido: 'bg-green-100 text-green-700',
};

export function LeadsScreen() {
  const [leads, setLeads]               = useState<any[]>([]);
  const [total, setTotal]               = useState(0);
  const [loading, setLoading]           = useState(true);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'todos'>('todos');
  const [sourceFilter, setSourceFilter] = useState<LeadSource | 'todos'>('todos');
  const [searchTerm, setSearchTerm]     = useState('');
  const [page, setPage]                 = useState(1);
  const [limit, setLimit]               = useState(10);
  const [tooltip, setTooltip]           = useState<{ id: number; text: string } | null>(null);

  const totalPages = Math.ceil(total / limit);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit };
      if (statusFilter !== 'todos') params.status  = statusFilter;
      if (sourceFilter !== 'todos') params.origem  = sourceFilter;
      if (searchTerm)               params.search  = searchTerm;
      const result = await leadsApi.listar(params);
      setLeads(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error('Erro ao carregar leads:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sourceFilter, searchTerm, page, limit]);

  useEffect(() => {
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  // Ao mudar filtros, volta para página 1
  useEffect(() => { setPage(1); }, [statusFilter, sourceFilter, searchTerm, limit]);

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja remover este lead?')) return;
    try { await leadsApi.remover(id); fetchLeads(); }
    catch { alert('Erro ao remover lead.'); }
  };

  return (
    <div className="space-y-4">

      {/* ── Filtros ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text" placeholder="Buscar por nome ou cidade..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[220px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]">
            <option value="todos">Todos os Status</option>
            <option value="novo">Novo</option>
            <option value="contatado">Contatado</option>
            <option value="convertido">Convertido</option>
          </select>
          <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]">
            <option value="todos">Todas as Origens</option>
            <option value="simulacao">Simulação</option>
            <option value="whatsapp">WhatsApp</option>
          </select>

          {/* Itens por página */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 whitespace-nowrap">Exibir</span>
            <select value={limit} onChange={e => setLimit(Number(e.target.value))}
              className="px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]">
              {[10, 20, 30, 40, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-xs text-gray-500 whitespace-nowrap">por página</span>
          </div>

          <button onClick={fetchLeads} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50" title="Atualizar">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ── Tabela ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Carregando leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">Nenhum lead encontrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Nome', 'WhatsApp', 'Cidade', 'Valor Conta', 'Tipo', 'Origem', 'Status', 'Data', 'Ações'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                    {/* Nome + badge de observação */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{lead.nome}</span>
                        {lead.notes && lead.notes.trim() && (
                          <div className="relative">
                            <button
                              onMouseEnter={() => setTooltip({ id: lead.id, text: lead.notes })}
                              onMouseLeave={() => setTooltip(null)}
                              className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FDB813]/20 text-[#0A2540] hover:bg-[#FDB813]/40 transition-colors"
                              title={lead.notes}
                            >
                              <MessageSquare size={11} />
                            </button>

                            {/* Tooltip */}
                            {tooltip?.id === lead.id && (
                              <div className="absolute left-6 top-0 z-20 w-56 bg-[#0A2540] text-white text-xs rounded-xl px-3 py-2 shadow-xl pointer-events-none">
                                <p className="font-semibold mb-0.5 text-[#FDB813]">Observação</p>
                                <p className="leading-relaxed opacity-90 line-clamp-4">{tooltip.text}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-sm text-gray-600">{lead.whatsapp}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.cidade || '—'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {lead.valor_conta ? `R$ ${parseFloat(lead.valor_conta).toFixed(0)}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 capitalize">{lead.tipo_imovel || '—'}</td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.origem === 'simulacao' ? 'bg-[#FDB813]/20 text-[#0A2540]' : 'bg-[#25D366]/20 text-green-800'
                      }`}>
                        {lead.origem === 'simulacao' ? 'Simulação' : 'WhatsApp'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/admin/leads/${lead.id}`}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Ver detalhes">
                          <Eye size={16} />
                        </Link>
                        <button onClick={() => handleDelete(String(lead.id))}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Remover">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Paginação ─────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">
            {((page - 1) * limit) + 1}–{Math.min(page * limit, total)} de <span className="font-medium text-gray-700">{total}</span> leads
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce<(number | '...')[]>((acc, n, i, arr) => {
                if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(n);
                return acc;
              }, [])
              .map((n, i) =>
                n === '...'
                  ? <span key={`e${i}`} className="px-2 text-gray-400 text-sm">…</span>
                  : <button key={n}
                      onClick={() => setPage(n as number)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        page === n ? 'text-[#0A2540]' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                      style={page === n ? { backgroundColor: '#FDB813' } : {}}
                    >{n}</button>
              )}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
