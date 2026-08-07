import { whatsappLink, SITE_CONFIG } from '../../lib/config';
import { Sun, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterV3() {
  return (
    <footer className="pt-16 pb-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0A2540' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDB813' }}>
                <Sun className="w-7 h-7" style={{ color: '#0A2540' }} />
              </div>
            </div>
            <p className="mb-6 text-white opacity-80">
              Especialistas em energia solar fotovoltaica. Ajudamos você a economizar e contribuir para um planeta mais sustentável.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#FDB813' }}
              >
                <Facebook className="w-5 h-5" style={{ color: '#0A2540' }} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#FDB813' }}
              >
                <Instagram className="w-5 h-5" style={{ color: '#0A2540' }} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#FDB813' }}
              >
                <Linkedin className="w-5 h-5" style={{ color: '#0A2540' }} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-white">Serviços</h4>
            <div className="space-y-2 mb-6">
              <Link to="/homologacao" className="block text-white opacity-70 hover:opacity-100 transition-opacity text-sm">
                Homologação de Projetos Solares
              </Link>
              <a href="/#simulacao" className="block text-white opacity-70 hover:opacity-100 transition-opacity text-sm">
                Simulação Gratuita
              </a>
              <a href="/#como-funciona" className="block text-white opacity-70 hover:opacity-100 transition-opacity text-sm">
                Como Funciona
              </a>
            </div>
            <h4 className="text-lg mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <a href={whatsappLink('')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white opacity-80 hover:opacity-100 transition-opacity">
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                (11) 2533-4837
              </a>

              <a href="mailto:msmultiservicos2026@gmail.com" className="flex items-center gap-3 text-white opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-5 h-5" style={{ color: '#FDB813' }} />
                msmultiservicos2026@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-white">Endereço</h4>
            <div className="flex items-start gap-3 text-white opacity-80">
              <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#FDB813' }} />
              <div>
                <p>Av. Mutinga, 523 - Jardim Libano</p>
                <p>São Paulo, SP</p>
                <p>CEP 05154-000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <p className="text-white opacity-60 text-sm">
            © 2026 MS Multi Serviços. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white opacity-60 hover:opacity-100 transition-opacity">
              Política de Privacidade
            </a>
            <a href="#" className="text-white opacity-60 hover:opacity-100 transition-opacity">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
