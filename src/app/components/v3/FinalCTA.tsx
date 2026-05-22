import { whatsappLink, SITE_CONFIG } from '../../lib/config';
import { MessageCircle, ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const scrollToSimulation = () => {
    const element = document.getElementById('simulacao');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1A4D6D 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl mb-6 text-white">
          Pare de pagar caro na sua conta de energia
        </h2>

        <p className="text-xl md:text-2xl mb-10 text-white opacity-90">
          Comece a economizar hoje mesmo com energia solar
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={scrollToSimulation}
            className="px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3 text-white text-lg"
            style={{ backgroundColor: '#FDB813' }}
          >
            Solicitar Orçamento
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => window.open('' + whatsappLink('Quero economizar na minha conta de energia!') + '', '_blank')}
            className="px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3 text-white text-lg"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp
          </button>
        </div>

        <p className="mt-8 text-white opacity-70">
          ⚡ Atendimento imediato • 💰 Orçamento gratuito • 🏆 Garantia de 25 anos
        </p>
      </div>
    </section>
  );
}
