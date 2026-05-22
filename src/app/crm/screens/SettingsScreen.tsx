import { useState } from "react";
import { Save, Phone, User, Bell, Shield, Palette } from "lucide-react";

export function SettingsScreen() {
  const [whatsappNumber, setWhatsappNumber] = useState(import.meta.env.VITE_WHATSAPP_NUMBER || '');
  const [companyName, setCompanyName] = useState(import.meta.env.VITE_EMPRESA_NOME || '');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState(import.meta.env.VITE_EMAIL_CONTATO || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [autoResponse, setAutoResponse] = useState(true);

  const handleSave = () => {
    console.log('TODO: salvar configurações via API');
  };

  return (
    <div className="space-y-6">
      {/* WhatsApp Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#25D366]/10 rounded-lg">
            <Phone size={24} className="text-[#25D366]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0A2540]">Configuração do WhatsApp</h3>
            <p className="text-sm text-gray-600">Configure o número de WhatsApp para receber leads</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número do WhatsApp (com DDI)
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="5511999999999"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Formato: Código do país + DDD + Número (ex: 5511999999999)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem Padrão de Atendimento
            </label>
            <textarea
              placeholder="Olá! Obrigado pelo interesse em energia solar..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813] resize-none"
              defaultValue="Olá! 👋 Obrigado pelo seu interesse em energia solar! Nossa equipe entrará em contato em breve para ajudá-lo a economizar na conta de luz. ☀️"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="autoResponse"
              checked={autoResponse}
              onChange={(e) => setAutoResponse(e.target.checked)}
              className="w-4 h-4 text-[#FDB813] border-gray-300 rounded focus:ring-[#FDB813]"
            />
            <label htmlFor="autoResponse" className="text-sm text-gray-700">
              Enviar mensagem automática ao receber novo lead
            </label>
          </div>
        </div>
      </div>

      {/* Company Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Palette size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0A2540]">Informações da Empresa</h3>
            <p className="text-sm text-gray-600">Dados da sua empresa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Comercial
            </label>
            <input
              type="email"
              placeholder="contato@empresa.com.br"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone Comercial
            </label>
            <input
              type="text"
              placeholder="(11) 3000-0000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>
        </div>
      </div>

      {/* Admin User Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <User size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0A2540]">Configurações do Usuário Admin</h3>
            <p className="text-sm text-gray-600">Gerencie suas informações pessoais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            />
          </div>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Bell size={24} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0A2540]">Notificações</h3>
            <p className="text-sm text-gray-600">Configure como você quer receber notificações</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notificações por Email</p>
              <p className="text-sm text-gray-600">Receba alertas de novos leads por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FDB813]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDB813]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notificações por WhatsApp</p>
              <p className="text-sm text-gray-600">Receba alertas de novos leads no WhatsApp</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappNotifications}
                onChange={(e) => setWhatsappNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FDB813]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Lead Status Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <Shield size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0A2540]">Status de Leads</h3>
            <p className="text-sm text-gray-600">Configure os status disponíveis para leads</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="font-medium text-gray-900">Novo</span>
            </div>
            <span className="text-sm text-gray-600">Ativo</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="font-medium text-gray-900">Contatado</span>
            </div>
            <span className="text-sm text-gray-600">Ativo</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="font-medium text-gray-900">Convertido</span>
            </div>
            <span className="text-sm text-gray-600">Ativo</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0A2540]/90 transition-colors font-medium"
        >
          <Save size={20} />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
