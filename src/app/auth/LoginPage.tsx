import { useState } from 'react';
import { useAuth } from './AuthContext';
import logo from '../../assets/logo.jpeg';
import { Lock, Mail, Eye, EyeOff, Sun } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    // Simula delay de autenticação
    await new Promise((r) => setTimeout(r, 600));

    const ok = await login(email, senha);
    if (!ok) {
      setErro('E-mail ou senha incorretos.');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0d3060 60%, #0A2540 100%)' }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FDB813 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F7931E 0%, transparent 70%)' }}
        />
        <div className="absolute top-20 left-20 opacity-5">
          <Sun size={200} color="#FDB813" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <Sun size={150} color="#F7931E" />
        </div>
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Topo colorido */}
          <div
            className="px-8 py-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0d3060 100%)' }}
          >
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
            </div>
            <h1 className="text-white text-xl font-bold">Área Administrativa</h1>
            <p className="text-gray-400 text-sm mt-1">Acesso restrito ao CRM</p>
          </div>

          {/* Formulário */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A2540' }}>
                  E-mail
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: '#E0E0E0',
                      color: '#0A2540',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#FDB813')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A2540' }}>
                  Senha
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#E0E0E0', color: '#0A2540' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#FDB813')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha(!showSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {erro && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                  <span className="text-red-600 text-sm">{erro}</span>
                </div>
              )}

              {/* Botão */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                style={{
                  background: loading
                    ? '#ccc'
                    : 'linear-gradient(135deg, #FDB813 0%, #F7931E 100%)',
                  color: '#0A2540',
                }}
              >
                {loading ? 'Verificando...' : 'Entrar no CRM'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Acesso exclusivo para colaboradores autorizados
            </p>
          </div>
        </div>

        {/* Dica de credenciais — remova em produção */}
        <div className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm text-center">
          <p className="text-white/60 text-xs mb-1">Credenciais de teste:</p>
          <p className="text-white/80 text-xs">Entre com suas credenciais de acesso</p>
        </div>
      </div>
    </div>
  );
}
