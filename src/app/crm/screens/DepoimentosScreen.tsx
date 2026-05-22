import { useState, useEffect, useRef } from 'react';
import { Star, Plus, Pencil, Trash2, Eye, EyeOff, X, Upload, Quote, ImagePlus } from 'lucide-react';
import { depoimentosApi } from '../../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://ms-solar-api-production.up.railway.app';

function FotoUpload({
  label, preview, onFile, hint,
}: { label: string; preview: string | null; onFile: (f: File) => void; hint?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#FDB813] transition-colors flex-shrink-0"
          onClick={() => ref.current?.click()}
        >
          {preview
            ? <img src={preview} alt="" className="w-full h-full object-cover" />
            : <Upload size={20} className="text-gray-400" />}
        </div>
        <div>
          <button type="button" onClick={() => ref.current?.click()} className="text-sm text-[#FDB813] font-medium hover:underline">
            {preview ? 'Trocar' : 'Selecionar'}
          </button>
          {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }} />
      </div>
    </div>
  );
}

function DepoimentoForm({ inicial, onSalvo, onFechar }: { inicial?: any; onSalvo: () => void; onFechar: () => void }) {
  const [nome, setNome]         = useState(inicial?.nome ?? '');
  const [cargo, setCargo]       = useState(inicial?.cargo ?? '');
  const [texto, setTexto]       = useState(inicial?.texto ?? '');
  const [economia, setEconomia] = useState(inicial?.economia ?? '');
  const [avaliacao, setAvaliacao] = useState<number>(inicial?.avaliacao ?? 5);
  const [ordem, setOrdem]       = useState<number>(inicial?.ordem ?? 0);
  const [previewFoto, setPreviewFoto] = useState<string | null>(inicial?.foto ? `${API_BASE}${inicial.foto}` : null);
  // fotos da obra: existentes (string de caminho) + novas (File)
  const [fotosObra, setFotosObra] = useState<(string | File)[]>(
    inicial?.fotos_obra?.length ? inicial.fotos_obra : []
  );
  const [removerIndices, setRemoverIndices] = useState<number[]>([]);
  const fotoFile = useRef<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim() || !texto.trim()) return alert('Nome e texto são obrigatórios.');
    setSaving(true);
    try {
      const form = new FormData();
      form.append('nome', nome);
      form.append('cargo', cargo);
      form.append('texto', texto);
      form.append('economia', economia);
      form.append('avaliacao', String(avaliacao));
      form.append('ordem', String(ordem));
      if (fotoFile.current) form.append('foto', fotoFile.current);
      fotosObra.filter(f => f instanceof File).forEach(f => form.append('fotos_obra', f as File));
      if (removerIndices.length) form.append('remover_fotos_obra', JSON.stringify(removerIndices));

      if (inicial?.id) await depoimentosApi.atualizar(inicial.id, form);
      else             await depoimentosApi.criar(form);
      onSalvo();
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onFechar}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-[#0A2540] text-lg">{inicial ? 'Editar depoimento' : 'Novo depoimento'}</h3>
          <button onClick={onFechar} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Foto cliente */}
          <FotoUpload
            label="Foto do cliente"
            preview={previewFoto}
            hint="JPEG/PNG · até 8 MB"
            onFile={f => { fotoFile.current = f; setPreviewFoto(URL.createObjectURL(f)); }}
          />

          {/* Fotos da obra — múltiplas */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              Fotos da obra / instalação <span className="font-normal text-gray-400">(até 5)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {fotosObra.map((f, i) => {
                const src = f instanceof File ? URL.createObjectURL(f) : `${API_BASE}${f}`;
                const removido = removerIndices.includes(i);
                return (
                  <div key={i} className={`relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 ${removido ? 'opacity-30' : ''}`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    {!removido && (
                      <button
                        type="button"
                        onClick={() => {
                          if (f instanceof File) {
                            setFotosObra(prev => prev.filter((_, j) => j !== i));
                          } else {
                            setRemoverIndices(prev => [...prev, i]);
                          }
                        }}
                        className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                );
              })}

              {fotosObra.filter((_, i) => !removerIndices.includes(i)).length < 5 && (
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#FDB813] flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <ImagePlus size={18} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400 mt-0.5">Adicionar</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setFotosObra(prev => [...prev, f]);
                    e.target.value = '';
                  }} />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">Placas no telhado, quadro elétrico, inversor...</p>
          </div>

          {/* Nome + Cargo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Nome *</label>
              <input value={nome} onChange={e => setNome(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
                placeholder="Carlos Mendes" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Cargo / Cidade</label>
              <input value={cargo} onChange={e => setCargo(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
                placeholder="Residencial · São Paulo" />
            </div>
          </div>

          {/* Texto */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Depoimento *</label>
            <textarea value={texto} onChange={e => setTexto(e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] resize-none"
              placeholder="Minha conta caiu de R$ 850 para R$ 45..." />
          </div>

          {/* Economia */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Economia gerada</label>
            <input value={economia} onChange={e => setEconomia(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
              placeholder="Economia de R$ 805/mês" />
          </div>

          {/* Avaliação + Ordem */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Avaliação</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setAvaliacao(n)}>
                    <Star size={22} className={n <= avaliacao ? 'fill-current text-[#FDB813]' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Ordem de exibição</label>
              <input type="number" min={0} value={ordem} onChange={e => setOrdem(parseInt(e.target.value) || 0)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813]" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button onClick={onFechar} className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50">Cancelar</button>
          <button onClick={handleSalvar} disabled={saving}
            className="px-5 py-2 text-sm rounded-lg font-semibold text-[#0A2540] disabled:opacity-60 hover:brightness-110"
            style={{ backgroundColor: '#FDB813' }}>
            {saving ? 'Salvando...' : 'Salvar depoimento'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CardPreview({ dep }: { dep: any }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border-2 transition-all ${dep.ativo ? 'border-transparent' : 'border-orange-200 opacity-60'}`}>
      <div className="flex items-start justify-between mb-3">
        <Quote size={20} className="text-[#FDB813] opacity-40" />
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${dep.ativo ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
          {dep.ativo ? 'Visível' : 'Oculto'}
        </span>
      </div>

      {/* Foto da obra (primeira) */}
      {dep.fotos_obra?.length > 0 ? (
        <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100 relative">
          <img src={`${API_BASE}${dep.fotos_obra[0]}`} alt="Obra" className="w-full h-full object-cover" />
          {dep.fotos_obra.length > 1 && (
            <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              +{dep.fotos_obra.length - 1} foto{dep.fotos_obra.length > 2 ? 's' : ''}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full h-20 rounded-lg mb-3 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200">
          <ImagePlus size={18} className="text-gray-300" />
          <span className="text-xs text-gray-300 ml-1">Sem foto da obra</span>
        </div>
      )}

      <div className="flex gap-0.5 mb-2">
        {[1,2,3,4,5].map(n => (
          <Star key={n} size={14} className={n <= dep.avaliacao ? 'fill-current text-[#FDB813]' : 'text-gray-200'} />
        ))}
      </div>
      <p className="text-sm text-gray-700 mb-3 line-clamp-2">"{dep.texto}"</p>
      {dep.economia && (
        <p className="text-xs font-medium mb-3 px-2 py-1 rounded-lg text-center" style={{ backgroundColor: '#FDB81315', color: '#FDB813' }}>
          ✓ {dep.economia}
        </p>
      )}
      <div className="flex items-center gap-3">
        {dep.foto
          ? <img src={`${API_BASE}${dep.foto}`} alt={dep.nome} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          : <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#FDB813', color: '#0A2540' }}>{dep.nome.charAt(0)}</div>}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{dep.nome}</p>
          {dep.cargo && <p className="text-xs text-gray-500 truncate">{dep.cargo}</p>}
        </div>
      </div>
    </div>
  );
}

export function DepoimentosScreen() {
  const [depoimentos, setDepoimentos] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [formAberto, setFormAberto]   = useState(false);
  const [editando, setEditando]       = useState<any | null>(null);

  const carregar = () => {
    setLoading(true);
    depoimentosApi.listarTodos().then(setDepoimentos).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const handleRemover = async (id: number) => {
    if (!confirm('Remover este depoimento?')) return;
    await depoimentosApi.remover(id).catch(console.error);
    carregar();
  };

  const handleToggle = async (dep: any) => {
    await depoimentosApi.alternarAtivo(dep.id, !dep.ativo).catch(console.error);
    carregar();
  };

  return (
    <div className="space-y-6">
      {formAberto && (
        <DepoimentoForm
          inicial={editando}
          onSalvo={() => { setFormAberto(false); setEditando(null); carregar(); }}
          onFechar={() => { setFormAberto(false); setEditando(null); }}
        />
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {depoimentos.filter(d => d.ativo).length} visíveis · {depoimentos.length} total
        </p>
        <button
          onClick={() => { setEditando(null); setFormAberto(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-[#0A2540] hover:brightness-110"
          style={{ backgroundColor: '#FDB813' }}
        >
          <Plus size={18} /> Novo depoimento
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Carregando...</div>
      ) : depoimentos.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Quote size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium mb-1">Nenhum depoimento ainda</p>
          <p className="text-sm text-gray-400 mb-6">Adicione o primeiro depoimento de cliente.</p>
          <button onClick={() => setFormAberto(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-[#0A2540]"
            style={{ backgroundColor: '#FDB813' }}>
            <Plus size={16} className="inline mr-1" /> Adicionar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {depoimentos.map(dep => (
            <div key={dep.id} className="relative group">
              <CardPreview dep={dep} />
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleToggle(dep)}
                  className="p-1.5 rounded-lg bg-white shadow text-gray-500 hover:text-[#0A2540]"
                  title={dep.ativo ? 'Ocultar' : 'Exibir'}>
                  {dep.ativo ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button onClick={() => { setEditando(dep); setFormAberto(true); }}
                  className="p-1.5 rounded-lg bg-white shadow text-gray-500 hover:text-[#0A2540]" title="Editar">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleRemover(dep.id)}
                  className="p-1.5 rounded-lg bg-white shadow text-gray-500 hover:text-red-500" title="Remover">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        Depoimentos "Visíveis" aparecem automaticamente na página inicial. Use a ordem para controlar a sequência.
      </p>
    </div>
  );
}
