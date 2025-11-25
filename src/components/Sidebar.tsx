import { 
  LayoutDashboard, 
  Building2, 
  Store, 
  TrendingUp, 
  Users, 
  BarChart3,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Panel Principal', icon: LayoutDashboard },
  { id: 'companies', label: 'Empresas', icon: Building2 },
  { id: 'marketplace', label: 'Mercado', icon: Store },
  { id: 'insights', label: 'Análisis Financiero', icon: TrendingUp },
  { id: 'collaboration', label: 'Herramientas de Colaboración', icon: Users },
  { id: 'trends', label: 'Tendencias', icon: BarChart3 },
];

const bottomNavItems: NavItem[] = [
  { id: 'settings', label: 'Configuración', icon: Settings },
  { id: 'help', label: 'Ayuda y Soporte', icon: HelpCircle },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#0F3D3C] to-[#0a2928] flex flex-col shadow-2xl relative">
      {/* Futuristic accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#1BC8C0] via-[#6B4CFF] to-[#1BC8C0] opacity-80"></div>
      
      {/* User Profile Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer backdrop-blur-sm">
          <Avatar className="h-11 w-11 border-2 border-[#1BC8C0] shadow-lg shadow-[#1BC8C0]/20">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
            <AvatarFallback className="bg-gradient-to-br from-[#1BC8C0] to-[#6B4CFF] text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">Jordan Davies</p>
            <p className="text-xs text-[#1BC8C0] truncate">jordan@company.com</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-white/10">
        <div className="space-y-1.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 text-left group relative overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#1BC8C0]/20 to-[#6B4CFF]/20 text-white shadow-lg shadow-[#1BC8C0]/10 border border-[#1BC8C0]/30' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1BC8C0]/10 to-[#6B4CFF]/10 animate-pulse"></div>
                )}
                <Icon 
                  className={`h-5 w-5 flex-shrink-0 relative z-10 ${isActive ? 'text-[#1BC8C0]' : 'text-white/50 group-hover:text-[#1BC8C0]'}`} 
                />
                <span className="text-sm relative z-10">{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-[#1BC8C0] shadow-lg shadow-[#1BC8C0]/50 relative z-10"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-white/10 p-3 space-y-1.5 backdrop-blur-sm">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300 text-left group
                ${isActive 
                  ? 'bg-gradient-to-r from-[#1BC8C0]/20 to-[#6B4CFF]/20 text-white shadow-lg shadow-[#1BC8C0]/10 border border-[#1BC8C0]/30' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                }
              `}
            >
              <Icon 
                className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#1BC8C0]' : 'text-white/50 group-hover:text-[#1BC8C0]'}`} 
              />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
        
        <Separator className="my-3 bg-white/10" />
        
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            text-white/70 hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/30
            transition-all duration-300 text-left group border border-transparent"
        >
          <LogOut className="h-5 w-5 flex-shrink-0 text-white/50 group-hover:text-red-400" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}