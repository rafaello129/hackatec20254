import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Fase 1: Core
import Feed from "./pages/Feed";
import MisProyectos from "./pages/MisProyectos";
import ProyectoDetalle from "./pages/ProyectoDetalle";
import NodoDetalle from "./pages/NodoDetalle";

// Fase 2: Proveedores
import ChatProveedor from "./pages/ChatProveedor";
import SeleccionarProveedor from "./pages/SeleccionarProveedor";
import FallbackNodo from "./pages/FallbackNodo";
import Explorar from "./pages/Explorar";
import PerfilProveedor from "./pages/PerfilProveedor";

// Fase 3: Mapas y Red
import ProductoDetalle from "./pages/ProductoDetalle";
import MapaProveedores from "./pages/MapaProveedores";
import MiRed from "./pages/MiRed";
import Conversaciones from "./pages/Conversaciones";

// Fase 4: Vendedor
import PublicarOferta from "./pages/PublicarOferta";
import MisOfertas from "./pages/MisOfertas";
import OfertaDetalle from "./pages/OfertaDetalle";
import PerfilEmpresarial from "./pages/Profile";
import InventarioInteligente from "./pages/Inventory";
import GestionProductosServicios from "./pages/ProductsAndServices";
import Finanzas from "./pages/Finance";
import CRMClientes from "./pages/Clients";
// Fase 5: Pulido
import Notificaciones from "./pages/Notificaciones";
import Perfil from "./pages/Perfil";
import React from "react";

// Placeholder para rutas pendientes
function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-4">
        🚧
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 text-sm mt-2">Próximamente</p>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* ═══════════════════════════════════════════════════════════════
            FEED / HOME
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/" element={<Feed />} />

        {/* ═══════════════════════════════════════════════════════════════
            PROYECTOS
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/proyectos" element={<MisProyectos />} />
        <Route path="/proyectos/nuevo" element={<Placeholder title="Nuevo Proyecto" />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
        <Route path="/proyecto/:id/nodo/:nodoId" element={<NodoDetalle />} />
        <Route path="/proyecto/:id/nodo/:nodoId/chat" element={<ChatProveedor />} />
        <Route path="/proyecto/:id/nodo/:nodoId/proveedores" element={<SeleccionarProveedor />} />
        <Route path="/proyecto/:id/nodo/:nodoId/alternativas" element={<FallbackNodo />} />

        {/* ═══════════════════════════════════════════════════════════════
            EXPLORAR / BUSCAR
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/mapa" element={<MapaProveedores />} />

        {/* ═══════════════════════════════════════════════════════════════
            PROVEEDORES
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/proveedor/:id" element={<PerfilProveedor />} />
        <Route path="/proveedor/:id/producto/:prodId" element={<ProductoDetalle />} />

        {/* ═══════════════════════════════════════════════════════════════
            MENSAJES / CONVERSACIONES
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/mensajes" element={<Conversaciones />} />

        {/* ═══════════════════════════════════════════════════════════════
            MI RED
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/mi-red" element={<MiRed />} />

        {/* ═══════════════════════════════════════════════════════════════
            VENDEDOR
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/vender" element={<PublicarOferta />} />
        <Route path="/mis-ofertas" element={<MisOfertas />} />
        <Route path="/mis-ofertas/:id" element={<OfertaDetalle />} />

        {/* ═══════════════════════════════════════════════════════════════
            NOTIFICACIONES
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/notificaciones" element={<Notificaciones />} />

        {/* ═══════════════════════════════════════════════════════════════
            PERFIL Y CONFIGURACIÓN
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/info" element={<Placeholder title="Información Personal" />} />
        <Route path="/perfil/empresa" element={<Placeholder title="Datos de Empresa" />} />
        <Route path="/perfil/direcciones" element={<Placeholder title="Direcciones" />} />
        <Route path="/perfil/pagos" element={<Placeholder title="Métodos de Pago" />} />
        <Route path="/perfil/notificaciones" element={<Placeholder title="Preferencias de Notificación" />} />
        <Route path="/perfil/idioma" element={<Placeholder title="Idioma y Región" />} />
        <Route path="/perfil/resenias" element={<Placeholder title="Mis Reseñas" />} />
        <Route path="/perfil/ventas" element={<Placeholder title="Historial de Ventas" />} />
        <Route path="/perfil/privacidad" element={<Placeholder title="Privacidad y Seguridad" />} />

        {/* ═══════════════════════════════════════════════════════════════
            OTROS
        ═══════════════════════════════════════════════════════════════ */}
        <Route path="/ayuda" element={<Placeholder title="Centro de Ayuda" />} />
        <Route path="/terminos" element={<Placeholder title="Términos y Condiciones" />} />

        {/* ═══════════════════════════════════════════════════════════════
            404
        ═══════════════════════════════════════════════════════════════ */}

        <Route path="/perfil" element={<PerfilEmpresarial />} />
        <Route path="/inventario" element={<InventarioInteligente />} />
        <Route path="/productos" element={<GestionProductosServicios />} />
        <Route path="/finanzas" element={<Finanzas />} />
        <Route path="/clientes" element={<CRMClientes />} />
        <Route path="*" element={<Placeholder title="Página no encontrada" />} />
      </Routes>
    </Layout>
  );
}