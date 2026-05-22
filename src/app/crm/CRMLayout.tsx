import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  MessageCircle, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  LogOut,
  Quote,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/leads', icon: Users, label: 'Leads' },
  { path: '/admin/simulacoes', icon: Calculator, label: 'Simulações' },
  { path: '/admin/depoimentos', icon: Quote, label: 'Depoimentos' },
  { path: '/admin/whatsapp', icon: MessageCircle, label: 'Cliques WhatsApp' },
  { path: '/admin/abandonados', icon: ShoppingCart, label: 'Carrinho Abandonado' },
  { path: '/admin/relatorios', icon: BarChart3, label: 'Relatórios' },
  { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
];

export function CRMLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    const item = menuItems.find(item => isActive(item.path));
    return item?.label || 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2540] text-white flex-shrink-0 fixed h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#FDB813] mb-1">Solar CRM</h1>
          <p className="text-sm text-gray-400">Gestão de Leads</p>
        </div>

        <nav className="mt-8 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  active 
                    ? 'bg-[#FDB813] text-[#0A2540] font-semibold' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Usuário + Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-[#FDB813] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A2540] font-bold text-sm">
                {usuario?.nome?.charAt(0) ?? 'A'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{usuario?.nome}</p>
              <p className="text-gray-400 text-xs truncate">{usuario?.cargo}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0A2540]">{getPageTitle()}</h2>

            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#25D366] rounded-full"></span>
              </button>

              {/* Voltar ao site */}
              <Link
                to="/"
                className="text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E0E0E0', color: '#0A2540' }}
              >
                ← Ver Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
