import { FileText, BarChart3, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <FileText className="w-10 h-10" />,
      title: 'Solicite sua simulação',
      description: 'Preencha o formulário rápido e receba uma análise inicial gratuita'
    },
    {
      number: '02',
      icon: <BarChart3 className="w-10 h-10" />,
      title: 'Receba análise personalizada',
      description: 'Nossa equipe prepara um projeto sob medida para suas necessidades'
    },
    {
      number: '03',
      icon: <Zap className="w-10 h-10" />,
      title: 'Instale e comece a economizar',
      description: 'Instalação profissional e comece a gerar sua própria energia'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#0A2540' }}>
            Como funciona?
          </h2>
          <p className="text-xl" style={{ color: '#0A2540', opacity: 0.7 }}>
            Processo simples em 3 etapas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-full w-full h-1 -ml-6" style={{ background: 'linear-gradient(90deg, #FDB813 0%, transparent 100%)' }}></div>
              )}

              <div className="text-center relative z-10">
                <div className="relative inline-block mb-6">
                  <div
                    className="w-32 h-32 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: '#FDB81320' }}
                  >
                    <div style={{ color: '#FDB813' }}>
                      {step.icon}
                    </div>
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: '#FDB813', color: 'white' }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="text-2xl mb-4" style={{ color: '#0A2540' }}>
                  {step.title}
                </h3>
                <p className="text-lg" style={{ color: '#0A2540', opacity: 0.7 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
