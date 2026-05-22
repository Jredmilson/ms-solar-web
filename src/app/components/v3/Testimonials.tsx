import { useEffect, useState, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { depoimentosApi } from '../../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://ms-solar-api-production.up.railway.app';

const FALLBACK = [
  { id: -1, nome: 'Carlos Mendes',  cargo: 'Residencial · São Paulo', foto: null, fotos_obra: [], avaliacao: 5, texto: 'Minha conta de energia caiu de R$ 850 para R$ 45! O investimento já está se pagando. Recomendo muito!', economia: 'Economia de R$ 805/mês' },
  { id: -2, nome: 'Marina Silva',   cargo: 'Empresária · Campinas',    foto: null, fotos_obra: [], avaliacao: 5, texto: 'Instalei na minha empresa e a economia foi surpreendente. Atendimento profissional do início ao fim.', economia: 'Economia de R$ 2.400/mês' },
  { id: -3, nome: 'Roberto Santos', cargo: 'Residencial · Santos',     foto: null, fotos_obra: [], avaliacao: 5, texto: 'Processo rápido e sem complicação. Em 3 meses já estava economizando. Vale muito a pena!', economia: 'Economia de R$ 560/mês' },
];

function imgUrl(caminho: string | null) {
  return caminho ? `${API_BASE}${caminho}` : null;
}

// ── Modal ────────────────────────────────────────────────
function Modal({ dep, onClose }: { dep: any; onClose: () => void }) {
  const [fotoIdx, setFotoIdx] = useState(0);

  const fotosObra: string[] = (dep.fotos_obra ?? []).map((c: string) => `${API_BASE}${c}`);
  const fotoCliente = imgUrl(dep.foto);
  const temFotos = fotosObra.length > 0;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Galeria de fotos da obra */}
        {temFotos ? (
          <div className="relative w-full h-64 bg-gray-900 overflow-hidden">
            <img
              src={fotosObra[fotoIdx]}
              alt="Instalação"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Navegação entre fotos */}
            {fotosObra.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setFotoIdx(i => (i - 1 + fotosObra.length) % fotosObra.length); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setFotoIdx(i => (i + 1) % fotosObra.length); }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {fotosObra.map((_, i) => (
                    <button key={i} onClick={e => { e.stopPropagation(); setFotoIdx(i); }}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{ backgroundColor: i === fotoIdx ? 'white' : 'rgba(255,255,255,0.4)' }}
                    />
                  ))}
                </div>
              </>
            )}

            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70">
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
          </div>
        )}

        {/* Conteúdo */}
        <div className="p-8">
          <Quote size={32} className="mb-4 opacity-20" style={{ color: '#FDB813' }} />

          <div className="flex gap-1 mb-4">
            {[...Array(dep.avaliacao ?? 5)].map((_, i) => (
              <Star key={i} size={18} className="fill-current" style={{ color: '#FDB813' }} />
            ))}
          </div>

          <p className="text-lg leading-relaxed mb-6" style={{ color: '#0A2540', opacity: 0.85 }}>
            "{dep.texto}"
          </p>

          {dep.economia && (
            <div className="inline-block px-4 py-2 rounded-xl mb-6 text-sm font-medium" style={{ backgroundColor: '#FDB81320', color: '#FDB813' }}>
              ✓ {dep.economia}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {fotoCliente
              ? <img src={fotoCliente} alt={dep.nome} className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-[#FDB813]/30" />
              : <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#FDB813', color: '#0A2540' }}>
                  {dep.nome.charAt(0)}
                </div>}
            <div>
              <p className="font-semibold" style={{ color: '#0A2540' }}>{dep.nome}</p>
              {dep.cargo && <p className="text-sm text-gray-500">{dep.cargo}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card ────────────────────────────────────────────────
function Card({ dep, onClick }: { dep: any; onClick: () => void }) {
  const fotosObra   = dep.fotos_obra ?? [];
  const fotoObra    = fotosObra.length > 0 ? `${API_BASE}${fotosObra[0]}` : null;
  const fotoCliente = imgUrl(dep.foto);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group overflow-hidden flex flex-col h-full"
      onClick={onClick}
    >
      {/* Foto da obra */}
      {fotoObra && (
        <div className="relative w-full h-44 overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={fotoObra} alt="Instalação" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={14} style={{ color: '#0A2540' }} />
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <Quote className="w-8 h-8 mb-3 flex-shrink-0" style={{ color: '#FDB813', opacity: 0.3 }} />

        <div className="flex gap-0.5 mb-3">
          {[...Array(dep.avaliacao ?? 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#FDB813' }} />
          ))}
        </div>

        <p className="text-base mb-4 flex-1 line-clamp-3" style={{ color: '#0A2540', opacity: 0.8 }}>
          "{dep.texto}"
        </p>

        {dep.economia && (
          <div className="px-3 py-2 rounded-xl mb-4 text-sm text-center" style={{ backgroundColor: '#FDB81315', color: '#FDB813' }}>
            ✓ {dep.economia}
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          {fotoCliente
            ? <img src={fotoCliente} alt={dep.nome} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
            : <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#FDB813', color: '#0A2540' }}>
                {dep.nome.charAt(0)}
              </div>}
          <div className="min-w-0">
            <p className="font-medium text-sm truncate" style={{ color: '#0A2540' }}>{dep.nome}</p>
            {dep.cargo && <p className="text-xs text-gray-500 truncate">{dep.cargo}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Seção principal ──────────────────────────────────────
export function Testimonials() {
  const [lista, setLista]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [atual, setAtual]       = useState(0);
  const [modal, setModal]       = useState<any | null>(null);

  useEffect(() => {
    depoimentosApi.listar()
      .then(data => setLista(data.length > 0 ? data : FALLBACK))
      .catch(() => setLista(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const dados = loading ? FALLBACK : lista;
  const usaCarrossel = dados.length > 3;

  // Quantos cards mostrar por vez (3 desktop, 1 mobile via CSS)
  const VISIVEIS = 3;
  const totalPages = Math.ceil(dados.length / VISIVEIS);

  const prev = useCallback(() => setAtual(a => (a - 1 + totalPages) % totalPages), [totalPages]);
  const next = useCallback(() => setAtual(a => (a + 1) % totalPages), [totalPages]);

  const paginaAtual = usaCarrossel ? dados.slice(atual * VISIVEIS, atual * VISIVEIS + VISIVEIS) : dados;

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
      {modal && <Modal dep={modal} onClose={() => setModal(null)} />}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#0A2540' }}>
            O que nossos clientes dizem
          </h2>
          <p className="text-xl" style={{ color: '#0A2540', opacity: 0.7 }}>
            Histórias reais de economia e sustentabilidade
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {paginaAtual.map((dep, i) => (
            <Card key={dep.id ?? i} dep={dep} onClick={() => setModal(dep)} />
          ))}
        </div>

        {/* Controles do carrossel */}
        {usaCarrossel && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border-2 transition-all hover:scale-105"
              style={{ borderColor: '#FDB813', color: '#FDB813' }}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAtual(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{ backgroundColor: i === atual ? '#FDB813' : '#D1D5DB' }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border-2 transition-all hover:scale-105"
              style={{ borderColor: '#FDB813', color: '#FDB813' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <p className="text-center text-sm mt-8 text-gray-400">
          Clique em um depoimento para ver mais detalhes
        </p>
      </div>
    </section>
  );
}
