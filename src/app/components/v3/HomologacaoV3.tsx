import { whatsappLink } from '../../lib/config';
import {
  MessageCircle, Upload, SearchCheck, ClipboardList,
  BadgeCheck, Plug, Clock, ShieldCheck, Headphones, FileWarning,
  ArrowRight, Zap,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Upload size={22} />,
    title: 'Envio do Projeto',
    desc: 'Você nos envia a documentação técnica da instalação já concluída via WhatsApp ou e-mail.',
  },
  {
    num: '02',
    icon: <SearchCheck size={22} />,
    title: 'Análise Técnica',
    desc: 'Nosso engenheiro revisa o projeto, identifica pendências e prepara toda a documentação exigida pela distribuidora.',
  },
  {
    num: '03',
    icon: <ClipboardList size={22} />,
    title: 'Protocolo',
    desc: 'Abrimos o processo junto à concessionária (ANEEL / distribuidora local) e acompanhamos cada etapa do andamento.',
  },
  {
    num: '04',
    icon: <BadgeCheck size={22} />,
    title: 'Aprovação',
    desc: 'Recebemos o parecer de aprovação e comunicamos você imediatamente. Sem surpresas, sem burocracia.',
  },
  {
    num: '05',
    icon: <Plug size={22} />,
    title: 'Conexão à Rede',
    desc: 'Sistema oficialmente conectado e gerando créditos de energia. Missão cumprida!',
  },
];

const DIFERENCIAIS = [
  {
    icon: <Clock size={28} />,
    titulo: 'Agilidade acima da média',
    texto: 'Protocolamos em até 48h após receber a documentação e monitoramos o prazo da distribuidora diariamente.',
    cor: '#FDB813',
  },
  {
    icon: <ShieldCheck size={28} />,
    titulo: 'Zero dor de cabeça',
    texto: 'Cuidamos de 100% da burocracia: formulários, laudos, ART, comunicados à ANEEL. Você só assina onde precisar.',
    cor: '#25D366',
  },
  {
    icon: <Headphones size={28} />,
    titulo: 'Suporte direto e humano',
    texto: 'Canal exclusivo via WhatsApp com atualizações em tempo real. Sem chatbot, sem fila de espera.',
    cor: '#FDB813',
  },
];

export function HomologacaoV3() {
  const msgWpp = 'Olá! Preciso homologar um projeto solar junto à distribuidora. Podem me ajudar?';

  return (
    <section
      id="homologacao"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A2540 0%, #0d3560 55%, #0A2540 100%)' }}
    >
      {/* grade de pontos decorativa */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* linha amarela superior */}
      <div className="h-1 w-full" style={{ backgroundColor: '#FDB813' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── TOPO ─────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.4)', color: '#FDB813' }}
          >
            <Zap size={14} />
            Serviço Especializado B2B &amp; B2C
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Homologação Solar <br />
            <span style={{ color: '#FDB813' }}>sem burocracia</span>, do início ao fim
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Você instalou os painéis. A gente cuida de tudo o que vem depois: documentação,
            aprovação na distribuidora e conexão à rede elétrica.
          </p>
        </div>

        {/* ── O QUE É / POR QUE OBRIGATÓRIA ───────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: 'rgba(253,184,19,0.15)' }}
            >
              <FileWarning size={24} style={{ color: '#FDB813' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">O que é homologação?</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
              É o processo oficial de regularização do sistema fotovoltaico junto à distribuidora
              de energia. Após a instalação física dos painéis, o sistema ainda não pode gerar
              créditos nem injetar energia na rede sem essa aprovação formal — com laudo técnico,
              ART do engenheiro e todos os formulários exigidos pela ANEEL.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: 'rgba(253,184,19,0.08)', border: '1px solid rgba(253,184,19,0.25)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: 'rgba(253,184,19,0.2)' }}
            >
              <BadgeCheck size={24} style={{ color: '#FDB813' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Por que é obrigatória?</h3>
            <ul className="space-y-2.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {[
                'Exigência legal da Resolução Normativa ANEEL 1.000/2021',
                'Sem homologação, o sistema não gera créditos de energia',
                'Risco de multa e corte de fornecimento pela distribuidora',
                'Necessária para ativar garantias de equipamentos e financiamentos',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: '#FDB813' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── TIMELINE DE ETAPAS ───────────────────────────── */}
        <div className="mb-20">
          <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-12">
            Como funciona o processo
          </h3>

          {/* desktop: linha horizontal conectando os steps */}
          <div className="relative">
            <div
              className="hidden lg:block absolute top-9 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5"
              style={{ background: 'linear-gradient(90deg, #FDB813 0%, rgba(253,184,19,0.2) 100%)' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center group">
                  {/* conector vertical mobile */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="lg:hidden absolute top-[72px] left-1/2 -translate-x-1/2 w-0.5 h-6"
                      style={{ backgroundColor: 'rgba(253,184,19,0.3)' }}
                    />
                  )}

                  {/* número + ícone */}
                  <div className="relative mb-4 z-10">
                    <div
                      className="w-[56px] h-[56px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: '#FDB813' }}
                    >
                      <span style={{ color: '#0A2540' }}>{step.icon}</span>
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{ backgroundColor: '#0A2540', color: '#FDB813', border: '1px solid #FDB813' }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm mb-2">{step.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DIFERENCIAIS ─────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {DIFERENCIAIS.map(({ icon, titulo, texto, cor }) => (
            <div
              key={titulo}
              className="rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${cor}20` }}
              >
                <span style={{ color: cor }}>{icon}</span>
              </div>
              <h4 className="font-bold text-white text-base mb-2">{titulo}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {texto}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(253,184,19,0.3)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#FDB813' }}>
            Pronto para regularizar?
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Envie seu projeto agora
          </h3>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Instaladores, técnicos, empresas de energia solar e pessoas físicas. Atendemos
            todo o Brasil. Resposta em até 2 horas úteis.
          </p>
          <button
            onClick={() => window.open(whatsappLink(msgWpp), '_blank')}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold transition-all hover:scale-105 hover:shadow-2xl text-white"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={20} />
            Solicitar Homologação no WhatsApp
          </button>
          <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Atendimento de segunda a sexta, das 8h às 18h · Orçamento gratuito e sem compromisso
          </p>
        </div>

      </div>

      {/* linha amarela inferior */}
      <div className="h-1 w-full" style={{ backgroundColor: '#FDB813' }} />
    </section>
  );
}
