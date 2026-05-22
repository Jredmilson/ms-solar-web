import { whatsappLink, SITE_CONFIG } from '../../lib/config';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { whatsappClicksApi } from '../../api';

export function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const dispositivo = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    whatsappClicksApi.registrar('Botão Flutuante', dispositivo).catch(() => {});
    window.open('' + whatsappLink('Olá! Gostaria de saber mais sobre energia solar.') + '', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 px-6 py-4"
      style={{
        backgroundColor: '#25D366',
        width: isHovered ? 'auto' : '64px',
        animation: 'pulse 2s infinite'
      }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white flex-shrink-0" />
      {isHovered && (
        <span className="text-white whitespace-nowrap">
          Fale Conosco
        </span>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </button>
  );
}
