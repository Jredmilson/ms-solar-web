import { DollarSign, Leaf, TrendingUp, Shield } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: 'Economia Imediata',
      description: 'Reduza até 95% na sua conta de energia logo após a instalação'
    },
    {
      icon: <Leaf className="w-10 h-10" />,
      title: 'Energia Sustentável',
      description: 'Contribua para um planeta mais limpo com energia 100% renovável'
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Valorização do Imóvel',
      description: 'Aumente o valor de mercado do seu imóvel em até 30%'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Retorno Garantido',
      description: 'ROI em 3-5 anos com garantia de 25 anos nos equipamentos'
    }
  ];

  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#0A2540' }}>
            Por que escolher energia solar?
          </h2>
          <p className="text-xl" style={{ color: '#0A2540', opacity: 0.7 }}>
            Investimento inteligente com benefícios imediatos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl border-2 hover:shadow-2xl transition-all group cursor-pointer"
              style={{ borderColor: '#E0E0E0' }}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#FDB81320' }}
              >
                <div style={{ color: '#FDB813' }}>
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#0A2540' }}>
                {benefit.title}
              </h3>
              <p style={{ color: '#0A2540', opacity: 0.7 }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
