import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Quanto custa instalar energia solar?',
      answer: 'O investimento varia de acordo com o tamanho do sistema necessário. Para uma residência média, o investimento fica entre R$ 15.000 e R$ 30.000, com retorno em 3-5 anos. Fazemos uma análise gratuita para calcular o valor exato para seu caso.'
    },
    {
      question: 'Em quanto tempo terei retorno do investimento?',
      answer: 'O retorno típico é entre 3 e 5 anos, dependendo do seu consumo e da tarifa da sua região. Após esse período, toda a energia gerada representa economia pura. Os painéis têm garantia de 25 anos.'
    },
    {
      question: 'Funciona em dias nublados ou chuvosos?',
      answer: 'Sim! Os painéis solares funcionam mesmo em dias nublados, embora com eficiência reduzida. O sistema está conectado à rede elétrica, então você continua tendo energia normalmente. A economia é calculada com base na média anual de geração.'
    },
    {
      question: 'Preciso fazer manutenção nos painéis solares?',
      answer: 'A manutenção é mínima. Recomendamos limpeza semestral dos painéis (pode ser feita com água) e inspeção anual do sistema. Os equipamentos são muito duráveis e exigem pouquíssima manutenção.'
    },
    {
      question: 'E se eu gerar mais energia do que consumo?',
      answer: 'O excedente é injetado na rede elétrica e vira créditos na sua conta, que podem ser utilizados por até 60 meses. Isso significa que você pode "guardar" energia para usar quando precisar.'
    },
    {
      question: 'Quanto tempo leva a instalação?',
      answer: 'Após aprovação do projeto, a instalação física leva de 1 a 3 dias. O processo completo, incluindo homologação na concessionária, leva em média 60 dias.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#0A2540' }}>
            Perguntas Frequentes
          </h2>
          <p className="text-xl" style={{ color: '#0A2540', opacity: 0.7 }}>
            Tire suas dúvidas sobre energia solar
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 rounded-2xl overflow-hidden transition-all"
              style={{ borderColor: openIndex === index ? '#FDB813' : '#E0E0E0' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-lg pr-4" style={{ color: '#0A2540' }}>
                  {faq.question}
                </span>
                <ChevronDown
                  className="w-6 h-6 flex-shrink-0 transition-transform"
                  style={{
                    color: '#FDB813',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5" style={{ backgroundColor: '#F8F9FA' }}>
                  <p className="text-lg leading-relaxed" style={{ color: '#0A2540', opacity: 0.8 }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
