import { whatsappLink, SITE_CONFIG } from '../../lib/config';
import { ArrowRight, MessageCircle, Star, CheckCircle, Award } from 'lucide-react';

export function HeroV3() {
  const scrollToSimulation = () => {
    const element = document.getElementById('simulacao');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMHNvbGFyJTIwcGFuZWxzJTIwc3Vuc2V0fGVufDF8fHx8MTc3NjcxNDAxMnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Casa moderna com painéis solares"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.95) 0%, rgba(10, 37, 64, 0.85) 100%)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(253, 184, 19, 0.2)', border: '1px solid #FDB813' }}>
            <Award className="w-4 h-4" style={{ color: '#FDB813' }} />
            <span className="text-sm" style={{ color: '#FDB813' }}>
              Empresa Certificada INMETRO
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-white">
            Economize até <span style={{ color: '#FDB813' }}>95%</span> na sua conta de energia com energia solar
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white opacity-90">
            Simule sua economia gratuitamente em menos de 30 segundos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={scrollToSimulation}
              className="px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl text-white text-lg"
              style={{ backgroundColor: '#FDB813' }}
            >
              Fazer Simulação Gratuita
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => window.open('' + whatsappLink('Olá! Quero saber mais sobre energia solar.') + '', '_blank')}
              className="px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl text-white text-lg border-2"
              style={{ borderColor: '#25D366', backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-6 h-6" />
              Falar no WhatsApp
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#FDB813' }} />
                ))}
              </div>
              <span className="text-white text-sm">4.9/5 Clientes</span>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
              <CheckCircle className="w-5 h-5" style={{ color: '#FDB813' }} />
              <span className="text-white text-sm">+1.200 Instalações</span>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
              <CheckCircle className="w-5 h-5" style={{ color: '#FDB813' }} />
              <span className="text-white text-sm">Atendimento Especializado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
