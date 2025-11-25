import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Feed from "./pages/Feed";
import React from "react";

// Placeholder temporal para las páginas que aún no creamos
function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-4">
        🚧
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 text-sm mt-2">
        Próxima vista del mockup
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/explorar" element={<Placeholder title="Explorar" />} />
        <Route path="/oportunidades" element={<Placeholder title="Centro de Oportunidades" />} />
        <Route path="/operaciones" element={<Placeholder title="Mis Operaciones" />} />
        <Route path="/mi-red" element={<Placeholder title="Mi Red Comercial" />} />
        <Route path="/perfil-empresa/:id" element={<Placeholder title="Perfil de Empresa" />} />
        <Route path="/tracking/:id" element={<Placeholder title="Tracking de Orden" />} />
        <Route path="/publicar" element={<Placeholder title="Publicar" />} />
        <Route path="/supply-planner" element={<Placeholder title="Supply Planner" />} />
        <Route path="*" element={<Placeholder title="Página no encontrada" />} />
      </Routes>
    </Layout>
  );
}