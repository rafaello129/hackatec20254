import { Search, Bell, TrendingUp, TrendingDown, Users, Building2, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#ECF1F3]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar empresas, oportunidades, análisis..."
                className="pl-10 bg-[#ECF1F3] border-slate-200 focus:border-[#1BC8C0] focus:ring-[#1BC8C0]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-[#E7E2FF]">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#6B4CFF] rounded-full shadow-lg shadow-[#6B4CFF]/50"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-[#0F3D3C] mb-1">Bienvenido de nuevo, Jordan</h1>
          <p className="text-slate-600">Esto es lo que está pasando con tu red de negocios hoy.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#E7E2FF]/30 hover:-translate-y-1 duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-600">Conexiones Totales</CardTitle>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#6B4CFF] to-[#6B4CFF]/70 flex items-center justify-center shadow-lg shadow-[#6B4CFF]/30">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-[#0F3D3C] mb-2">1,284</div>
              <div className="flex items-center gap-1 text-xs text-[#1BC8C0]">
                <TrendingUp className="h-3 w-3" />
                <span>12.5% desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#1BC8C0]/10 hover:-translate-y-1 duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-600">Empresas Activas</CardTitle>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#1BC8C0] to-[#1BC8C0]/70 flex items-center justify-center shadow-lg shadow-[#1BC8C0]/30">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-[#0F3D3C] mb-2">342</div>
              <div className="flex items-center gap-1 text-xs text-[#1BC8C0]">
                <TrendingUp className="h-3 w-3" />
                <span>8.2% desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#E7E2FF]/30 hover:-translate-y-1 duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-600">Volumen de Transacciones</CardTitle>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#6B4CFF] to-[#1BC8C0] flex items-center justify-center shadow-lg shadow-[#6B4CFF]/30">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-[#0F3D3C] mb-2">$2.4M</div>
              <div className="flex items-center gap-1 text-xs text-red-600">
                <TrendingDown className="h-3 w-3" />
                <span>3.1% desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#1BC8C0]/10 hover:-translate-y-1 duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-600">Actividad de la Plataforma</CardTitle>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0F3D3C] to-[#1BC8C0] flex items-center justify-center shadow-lg shadow-[#0F3D3C]/30">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-[#0F3D3C] mb-2">94.2%</div>
              <div className="flex items-center gap-1 text-xs text-[#1BC8C0]">
                <TrendingUp className="h-3 w-3" />
                <span>2.3% desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Companies */}
          <Card className="lg:col-span-2 border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F3D3C]">Empresas Recientes</CardTitle>
              <CardDescription>Últimos negocios que se unieron a la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Green Energy Solutions', type: 'Economía Social', status: 'Activo', members: 45 },
                  { name: 'TechVentures Inc.', type: 'Comercial', status: 'Activo', members: 128 },
                  { name: 'Community Crafts Co-op', type: 'Economía Social', status: 'Pendiente', members: 23 },
                  { name: 'Urban Agriculture Network', type: 'Economía Social', status: 'Activo', members: 67 },
                  { name: 'Digital Services Group', type: 'Comercial', status: 'Activo', members: 89 },
                ].map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#ECF1F3] transition-all border border-transparent hover:border-[#1BC8C0]/20">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#1BC8C0] to-[#6B4CFF] flex items-center justify-center text-white shadow-md">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-[#0F3D3C]">{company.name}</p>
                        <p className="text-xs text-slate-500">{company.members} miembros</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={company.type === 'Economía Social' ? 'default' : 'secondary'} 
                        className={`text-xs ${company.type === 'Economía Social' ? 'bg-[#1BC8C0] hover:bg-[#1BC8C0]/90' : 'bg-[#E7E2FF] text-[#6B4CFF] hover:bg-[#E7E2FF]/90'}`}
                      >
                        {company.type}
                      </Badge>
                      <Badge 
                        variant={company.status === 'Activo' ? 'default' : 'outline'} 
                        className={`text-xs ${company.status === 'Activo' ? 'bg-[#6B4CFF] hover:bg-[#6B4CFF]/90' : 'border-[#6B4CFF] text-[#6B4CFF]'}`}
                      >
                        {company.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-[#E7E2FF]/20">
            <CardHeader>
              <CardTitle className="text-[#0F3D3C]">Acciones Rápidas</CardTitle>
              <CardDescription>Tareas comunes y accesos directos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-[#1BC8C0] to-[#1BC8C0]/80 hover:from-[#1BC8C0]/90 hover:to-[#1BC8C0]/70 shadow-lg shadow-[#1BC8C0]/30" size="lg">
                <Building2 className="h-4 w-4 mr-2" />
                Agregar Nueva Empresa
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-[#6B4CFF] to-[#6B4CFF]/80 hover:from-[#6B4CFF]/90 hover:to-[#6B4CFF]/70 text-white shadow-lg shadow-[#6B4CFF]/30" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Invitar Colaboradores
              </Button>
              <Button className="w-full justify-start border-[#1BC8C0] text-[#0F3D3C] hover:bg-[#1BC8C0]/10" variant="outline" size="lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Reportes
              </Button>
              <Button className="w-full justify-start border-[#6B4CFF] text-[#0F3D3C] hover:bg-[#E7E2FF]" variant="outline" size="lg">
                <Activity className="h-4 w-4 mr-2" />
                Analíticas de la Plataforma
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Marketplace Highlights */}
        <Card className="mt-6 border-none shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-[#0F3D3C]">Destacados del Mercado</CardTitle>
            <CardDescription>Oportunidades y colaboraciones destacadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Alianza de Empaque Sostenible', category: 'Cadena de Suministro', value: '$45K', participants: 12 },
                { title: 'Fondo de Desarrollo Comunitario', category: 'Inversión', value: '$120K', participants: 8 },
                { title: 'Iniciativa de Capacitación Tecnológica', category: 'Educación', value: '$32K', participants: 25 },
              ].map((opportunity, index) => (
                <div key={index} className="p-5 rounded-xl border-2 border-[#ECF1F3] hover:border-[#1BC8C0] hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-white to-[#ECF1F3]/50 group">
                  <Badge variant="outline" className="mb-3 text-xs border-[#6B4CFF] text-[#6B4CFF] group-hover:bg-[#E7E2FF]">{opportunity.category}</Badge>
                  <h4 className="text-sm text-[#0F3D3C] mb-3">{opportunity.title}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1BC8C0]">{opportunity.value}</span>
                    <span className="text-slate-600">{opportunity.participants} participantes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}