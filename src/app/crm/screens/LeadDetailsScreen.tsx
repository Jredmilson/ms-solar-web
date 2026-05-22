import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MessageCircle, Phone, MapPin, Calendar,
  DollarSign, Home, Save, ImagePlus, Trash2, ZoomIn, X, Upload,
} from "lucide-react";
import { leadsApi, leadImagensApi } from "../../api";
import { LeadStatus } from "../types";

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://ms-solar-api-production.up.railway.app';

// ── Lightbox ────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors" onClick={onClose}>
        <X size={32} />
      </button>
      <img
        src={src}
        alt="Instalação"
        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

// ── Galeria ──────────────────────────────────────────────
function GaleriaInstalacao({ leadId }: { leadId: string }) {
  const [imagens, setImagens] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [descricao, setDescricao] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const carregar = () =>
    leadImagensApi.listar(leadId).then(setImagens).catch(console.error);

  useEffect(() => { carregar(); }, [leadId]);

  const enviar = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      await leadImagensApi.upload(leadId, file, descricao || undefined);
      setDescricao('');
      await carregar();
    } catch (err: any) {
      alert(err.message || 'Erro ao enviar imagem.');
    } finally {
      setUploading(false);
    }
  };

  const remover = async (id: number) => {
    if (!confirm('Remover esta imagem?')) return;
    await leadImagensApi.remover(leadId, id).catch(console.error);
    await carregar();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) enviar(f);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) enviar(f);
  };

  return (
    <>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
        <h3 className="font-bold text-[#0A2540] text-lg border-b pb-3 flex items-center gap-2">
          <ImagePlus size={20} className="text-[#FDB813]" />
          Fotos da Instalação
        </h3>

        {/* Upload area */}
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="mb-3">
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição (opcional) — ex: Painel no telhado sul"
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-[#FDB813] bg-yellow-50' : 'border-gray-200 hover:border-[#FDB813] hover:bg-gray-50'
            }`}
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={24} className="animate-bounce" />
                <p className="text-sm">Enviando...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImagePlus size={28} className="text-gray-300" />
                <p className="text-sm text-gray-500">
                  Clique ou arraste uma imagem aqui
                </p>
                <p className="text-xs text-gray-400">JPEG, PNG, WEBP · até 10 MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Galeria */}
        {imagens.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhuma foto adicionada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imagens.map(img => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                <img
                  src={`${API_BASE}${img.caminho}`}
                  alt={img.descricao || img.nome_arquivo}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setLightbox(`${API_BASE}${img.caminho}`)}
                    className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors"
                    title="Ver em tela cheia"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => remover(img.id)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {img.descricao && (
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs truncate">{img.descricao}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {imagens.length > 0 && (
          <p className="text-xs text-gray-400 text-right">{imagens.length} foto{imagens.length > 1 ? 's' : ''}</p>
        )}
      </div>
    </>
  );
}

// ── Tela Principal ───────────────────────────────────────
export function LeadDetailsScreen() {
  const { id } = useParams();
  const [lead, setLead] = useState<any>(null);
  const [status, setStatus] = useState<LeadStatus>('novo');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    leadsApi.buscar(id).then((data) => {
      setLead(data);
      setStatus(data.status);
      setNotes(data.notes || '');
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Carregando lead...</div>;
  if (!lead) return (
    <div className="bg-white rounded-xl p-8 shadow-sm text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead não encontrado</h2>
      <Link to="/admin/leads" className="text-[#FDB813] hover:underline">Voltar para lista</Link>
    </div>
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await leadsApi.atualizar(String(lead.id), { status, notes });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Erro ao salvar alterações.');
    } finally {
      setSaving(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Olá ${lead.nome}! Sou da equipe MS Multi Serviços e gostaria de falar sobre sua simulação de energia solar.`);
    window.open(`https://wa.me/55${lead.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/leads" className="flex items-center gap-2 text-gray-600 hover:text-[#0A2540] transition-colors">
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
        <h2 className="text-xl font-bold text-[#0A2540]">{lead.nome}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda — info + galeria */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info do lead */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0A2540] text-lg border-b pb-3">Informações do Lead</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Phone size={18} />, label: 'WhatsApp', value: lead.whatsapp },
                { icon: <MapPin size={18} />, label: 'Cidade', value: lead.cidade },
                { icon: <DollarSign size={18} />, label: 'Valor da Conta', value: lead.valor_conta ? `R$ ${parseFloat(lead.valor_conta).toFixed(2)}` : '-' },
                { icon: <Home size={18} />, label: 'Tipo de Imóvel', value: lead.tipo_imovel },
                { icon: <Calendar size={18} />, label: 'Data de Captação', value: new Date(lead.created_at).toLocaleDateString('pt-BR') },
                { icon: null, label: 'Origem', value: lead.origem === 'simulacao' ? 'Simulação' : 'WhatsApp' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  {icon && <span className="text-[#FDB813]">{icon}</span>}
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{value || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Galeria de fotos */}
          <GaleriaInstalacao leadId={String(lead.id)} />
        </div>

        {/* Coluna direita — ações */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0A2540] border-b pb-3">Ações Rápidas</h3>
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#1da851] transition-colors"
            >
              <MessageCircle size={18} /> Enviar WhatsApp
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0A2540] border-b pb-3">Atualizar Status</h3>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as LeadStatus)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            >
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="convertido">Convertido</option>
            </select>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Observações sobre o lead..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813] resize-none text-sm"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0A2540] text-white rounded-lg font-medium hover:bg-[#0d3060] transition-colors disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? 'Salvando...' : saved ? '✓ Salvo!' : 'Salvar Alterações'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
