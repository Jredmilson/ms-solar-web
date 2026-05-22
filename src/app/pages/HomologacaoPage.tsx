import { whatsappLink } from '../lib/config';
import {
  MessageCircle, Upload, SearchCheck, ClipboardList, BadgeCheck,
  Plug, Clock, ShieldCheck, Headphones, FileWarning, ArrowRight,
  Zap, CheckCircle2, AlertTriangle, Building2,
  User, HardHat, Star,
} from 'lucide-react';
import logo from '../../assets/MS_logo_FINAL.png';

// ── DADOS ────────────────────────────────────────────────

const STEPS = [
  {
    num: '01', icon: <Upload size={24} />,
    title: 'Você envia o projeto',
    desc: 'Nos envie via WhatsApp ou e-mail a documentação da instalação já concluída: memorial descritivo, diagrama unifilar, fotos da instalação e nota fiscal dos equipamentos.',
  },
  {
    num: '02', icon: <SearchCheck size={24} />,
    title: 'Análise técnica',
    desc: 'Nosso engenheiro revisa toda a documentação, emite a ART (Anotação de Responsabilidade Técnica) e prepara o processo exigido pela distribuidora de energia da sua região.',
  },
  {
    num: '03', icon: <ClipboardList size={24} />,
    title: 'Protocolo junto à distribuidora',
    desc: 'Abrimos o processo formalmente junto à concessionária (CEMIG, ENEL, CPFL, ENERGISA etc.) e acompanhamos o andamento em tempo real, respondendo a qualquer solicitação.',
  },
  {
    num: '04', icon: <BadgeCheck size={24} />,
    title: 'Aprovação oficial',
    desc: 'Recebemos o parecer de acesso aprovado e comunicamos você imediatamente com toda a documentação oficial para seu arquivo.',
  },
  {
    num: '05', icon: <Plug size={24} />,
    title: 'Conexão à rede',
    desc: 'O sistema entra em operação legal, começa a gerar créditos de energia e você finalmente aproveita tudo que investiu na instalação.',
  },
];

const PUBLICOS = [
  {
    icon: <HardHat size={28} />,
    titulo: 'Instaladores e Técnicos',
    desc: 'Você faz a instalação, a gente homologa. Parceria perfeita para quem quer focar no campo e deixar a burocracia com especialistas.',
    cor: '#FDB813',
  },
  {
    icon: <Building2 size={28} />,
    titulo: 'Empresas de Energia Solar',
    desc: 'Terceirize o processo de homologação para sua empresa. Atendemos volume, com prazo e qualidade garantidos.',
    cor: '#25D366',
  },
  {
    icon: <User size={28} />,
    titulo: 'Pessoa Física',
    desc: 'Instalou painéis e ficou perdido na burocracia? A gente resolve tudo por você, sem precisar entender nada de regulamentação.',
    cor: '#FDB813',
  },
];

const DIFERENCIAIS = [
  { icon: <Clock size={22} />, titulo: 'Protocolo ágil', desc: 'Após receber a documentação completa, iniciamos o protocolo junto à distribuidora o mais rápido possível — sem enrolação.' },
  { icon: <ShieldCheck size={22} />, titulo: '100% da burocracia por nossa conta', desc: 'Formulários, laudos, ART, comunicados à ANEEL, respostas a exigências — cuidamos de tudo.' },
  { icon: <Headphones size={22} />, titulo: 'Suporte via WhatsApp', desc: 'Canal direto com o técnico responsável pelo seu processo. Sem chatbot, sem fila de espera.' },
  { icon: <CheckCircle2 size={22} />, titulo: 'Atendimento nacional', desc: 'Trabalhamos com todas as distribuidoras do Brasil: CEMIG, ENEL, CPFL, Energisa, Equatorial e mais.' },
];

const DOCUMENTOS = [
  'Memorial descritivo do projeto',
  'Diagrama unifilar',
  'ART do instalador elétrico',
  'Nota fiscal dos equipamentos (módulos e inversor)',
  'Fotos da instalação (painéis, inversor e quadro)',
  'Procuração (quando necessária)',
  'Conta de energia da unidade consumidora',
];

const FAQS = [
  {
    q: 'Quanto tempo leva a homologação?',
    a: 'Depende da distribuidora e da região. Em geral, após o protocolo, o prazo é de 30 a 90 dias. Acompanhamos o processo e cobramos a distribuidora quando o prazo é extrapolado.',
  },
  {
    q: 'Preciso contratar a instalação com vocês para homologar?',
    a: 'Não! Atendemos qualquer instalação já realizada, independentemente de quem instalou. Basta enviar a documentação técnica.',
  },
  {
    q: 'O serviço funciona para todo o Brasil?',
    a: 'Sim. Trabalhamos com todas as distribuidoras de energia do país. A homologação é feita de forma remota e não requer visita presencial.',
  },
  {
    q: 'O que acontece se a distribuidora pedir documentação adicional?',
    a: 'Gerenciamos todas as exigências. Entramos em contato com você apenas se for necessário algo que só o proprietário pode fornecer.',
  },
];

// ── COMPONENTES ──────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b py-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <p className="font-semibold text-white mb-2">{q}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{a}</p>
    </div>
  );
}

// ── PÁGINA ───────────────────────────────────────────────

export function HomologacaoPage() {
  const msgWpp = 'Olá! Preciso homologar um projeto solar junto à distribuidora. Podem me ajudar?';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A2540' }}>

      {/* ── NAVBAR SIMPLES ─────────────────────────────── */}
      <nav
        className="sticky top-0 z-40 px-6 lg:px-12 flex items-center justify-between"
        style={{ backgroundColor: '#0A2540', borderBottom: '1px solid rgba(253,184,19,0.2)', height: '72px' }}
      >
        <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(whatsappLink(msgWpp), '_blank')}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#25D366' }}
          >
            WhatsApp
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* grade de pontos */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* brilho dourado */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(253,184,19,0.15) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{ backgroundColor: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.35)', color: '#FDB813' }}
          >
            <Zap size={12} /> Serviço Especializado · Todo o Brasil
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Homologação Solar<br />
            <span style={{ color: '#FDB813' }}>sem complicação</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Seu sistema instalado, mas ainda sem gerar créditos? A MS cuida de
            todo o processo burocrático junto à distribuidora — do protocolo à conexão.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open(whatsappLink(msgWpp), '_blank')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={20} /> Solicitar Homologação
            </button>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:bg-white/10"
              style={{ border: '2px solid rgba(253,184,19,0.4)', color: '#FDB813' }}
            >
              Ver como funciona <ArrowRight size={18} />
            </a>
          </div>

          {/* mini stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { n: '100%', l: 'da burocracia por nossa conta' },
              { n: 'Todo', l: 'o Brasil atendido' },
              { n: 'Online', l: 'sem visita presencial' },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="text-3xl font-extrabold" style={{ color: '#FDB813' }}>{n}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALERTA: POR QUE É OBRIGATÓRIA ──────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start"
            style={{ backgroundColor: 'rgba(253,184,19,0.08)', border: '1px solid rgba(253,184,19,0.3)' }}
          >
            <div className="shrink-0">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253,184,19,0.2)' }}
              >
                <AlertTriangle size={28} style={{ color: '#FDB813' }} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Por que a homologação é obrigatória?</h2>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                A <strong className="text-white">Resolução Normativa ANEEL nº 1.000/2021</strong> exige que todo
                sistema de geração distribuída (painéis solares) seja formalmente aprovado pela distribuidora
                antes de conectar à rede elétrica. Sem isso:
              </p>
              <ul className="space-y-2">
                {[
                  'O sistema não gera créditos de energia — você paga a conta cheia mesmo com os painéis instalados',
                  'Risco de multa e corte de fornecimento pela concessionária',
                  'Garantias dos equipamentos podem ser invalidadas',
                  'Financiamentos e seguros podem ser comprometidos',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" style={{ color: '#FDB813' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUEM ATENDEMOS ──────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Quem atendemos</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>B2B ou B2C — não importa. Se tem instalação, a gente homologa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PUBLICOS.map(({ icon, titulo, desc, cor }) => (
              <div
                key={titulo}
                className="rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${cor}20` }}>
                  <span style={{ color: cor }}>{icon}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ───────────────────────────────── */}
      <section id="como-funciona" className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Como funciona</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>5 etapas simples, do envio à conexão</p>
          </div>

          <div className="relative space-y-0">
            {/* linha vertical conectora */}
            <div
              className="absolute left-[27px] top-10 bottom-10 w-0.5 hidden md:block"
              style={{ background: 'linear-gradient(180deg, #FDB813 0%, rgba(253,184,19,0.1) 100%)' }}
            />

            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex gap-6 pb-10 last:pb-0">
                {/* círculo numerado */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg"
                    style={{ backgroundColor: '#FDB813', color: '#0A2540' }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-2xl p-6 md:p-7"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ color: '#FDB813' }}>{step.icon}</span>
                    <h3 className="font-bold text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTOS NECESSÁRIOS ──────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileWarning size={22} style={{ color: '#FDB813' }} />
                <h2 className="text-2xl font-bold text-white">Documentos necessários</h2>
              </div>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Envie o que tiver — analisamos e te dizemos exatamente o que falta.
              </p>
              <ul className="space-y-3">
                {DOCUMENTOS.map(doc => (
                  <li key={doc} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    <CheckCircle2 size={16} style={{ color: '#FDB813' }} className="shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                <p className="text-white font-semibold mb-1">Não sabe se tem tudo?</p>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Nos mande o que tiver. Nossa equipe avalia gratuitamente e te orienta.
                </p>
                <button
                  onClick={() => window.open(whatsappLink('Olá! Gostaria de enviar a documentação para análise de homologação.'), '_blank')}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle size={16} className="inline mr-2" />
                  Enviar documentação
                </button>
              </div>
              <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Análise gratuita · Resposta em até 2 horas úteis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Por que escolher a MS?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {DIFERENCIAIS.map(({ icon, titulo, desc }) => (
              <div
                key={titulo}
                className="flex gap-4 rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(253,184,19,0.15)' }}>
                  <span style={{ color: '#FDB813' }}>{icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{titulo}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Perguntas frequentes</h2>
          </div>
          {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-12"
            style={{ background: 'linear-gradient(135deg, rgba(253,184,19,0.12) 0%, rgba(253,184,19,0.04) 100%)', border: '1px solid rgba(253,184,19,0.3)' }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-current" style={{ color: '#FDB813' }} />)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para conectar seu sistema à rede?
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Fale com a gente agora. Análise gratuita, resposta rápida e sem burocracia para você.
            </p>
            <button
              onClick={() => window.open(whatsappLink(msgWpp), '_blank')}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={20} /> Solicitar Homologação Agora
            </button>
            <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Seg a Sex · 8h às 18h · Orçamento gratuito e sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* ── RODAPÉ SIMPLES ──────────────────────────────── */}
      <div
        className="px-6 py-6 text-center text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
      >
        © 2026 MS Multi Serviços · Todos os direitos reservados
      </div>
    </div>
  );
}
