import { whatsappLink } from '../../lib/config';
import { Menu, X, Sun, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../../../assets/ms-logo.png';

const NAV_LINKS = [
  { id: 'beneficios',    label: 'Benefícios'    },
  { id: 'simulacao',     label: 'Simulação'     },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'depoimentos',   label: 'Depoimentos'   },
  { id: 'faq',           label: 'FAQ'           },
];

export function HeaderV3() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const [barVisible, setBarVisible]   = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setBarVisible(y < 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── BARRA DE ANÚNCIO ─────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: '#FDB813',
          height: barVisible ? '36px' : '0px',
          opacity: barVisible ? 1 : 0,
        }}
      >
        <Sun size={14} className="shrink-0" style={{ color: '#0A2540' }} />
        <p className="text-xs font-semibold whitespace-nowrap" style={{ color: '#0A2540' }}>
          Economize até 95% na conta de luz · Orçamento 100% gratuito e sem compromisso
        </p>
        <button
          onClick={() => go('simulacao')}
          className="hidden sm:flex items-center gap-0.5 text-xs font-bold underline underline-offset-2 ml-2 hover:opacity-70 transition-opacity"
          style={{ color: '#0A2540' }}
        >
          Simule Agora! <ChevronRight size={12} />
        </button>
      </div>

      {/* ── HEADER PRINCIPAL ─────────────────────────────── */}
      <header
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: barVisible ? '36px' : '0px',
          backgroundColor: '#0A2540',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.35)'
            : '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Linha de destaque amarela no topo do header */}
        {!barVisible && (
          <div className="h-0.5 w-full" style={{ backgroundColor: '#FDB813' }} />
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="grid items-center transition-all duration-300"
            style={{
              height: scrolled ? '68px' : '84px',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '2rem',
            }}
          >

            {/* LOGO */}
            <button
              onClick={() => go('inicio')}
              className="flex items-center focus:outline-none group shrink-0"
              aria-label="Ir ao início"
            >
              <div
                className="flex items-center justify-center rounded-xl p-1.5 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(253,184,19,0.12)',
                  border: '1px solid rgba(253,184,19,0.25)',
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain transition-all duration-300"
                  style={{ height: scrolled ? '48px' : '62px', width: 'auto' }}
                />
              </div>
            </button>

            {/* NAV DESKTOP */}
            <nav className="hidden lg:flex items-center justify-center gap-6">
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className="relative py-2 text-sm font-medium whitespace-nowrap group transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    style={{ backgroundColor: '#FDB813' }}
                  />
                </button>
              ))}
            </nav>

            {/* AÇÕES DESKTOP */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={() => window.open(whatsappLink('Olá! Gostaria de saber mais sobre energia solar.'), '_blank')}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap transition-all hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: '#25D366' }}
              >
                WhatsApp
              </button>
            </div>

            {/* HAMBURGUER MOBILE */}
            <button
              className="lg:hidden col-start-3 p-2 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen
                ? <X  className="w-5 h-5 text-white" />
                : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? '480px' : '0px',
            backgroundColor: '#081d33',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 pb-6 pt-2 flex flex-col gap-1">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {label}
              </button>
            ))}
            <div className="mt-3 pt-3 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => window.open(whatsappLink('Olá! Gostaria de saber mais sobre energia solar.'), '_blank')}
                className="w-full py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Espaçador para compensar header fixo */}
      <div style={{ height: barVisible ? '120px' : '84px', transition: 'height 0.3s' }} />
    </>
  );
}
