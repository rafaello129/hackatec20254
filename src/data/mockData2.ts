// ═══════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════

export interface Usuario {
    id: string;
    nombre: string;
    empresa: string;
    avatar: string;
    ubicacion: string;
    coordenadas: { lat: number; lng: number };
    email: string;
    telefono: string;
    plan: "free" | "pro" | "enterprise";
    fechaRegistro: string;
    proyectosCompletados: number;
    gastoTotal: number;
  }
  
  export interface Proveedor {
    id: string;
    nombre: string;
    iniciales: string;
    tipo: "producto" | "servicio" | "ambos";
    tier: "platinum" | "gold" | "standard";
    categorias: string[];
    especialidad: string;
    ubicacion: string;
    coordenadas: { lat: number; lng: number };
    rating: number;
    numResenias: number;
    verificado: boolean;
    descripcion: string;
    tiempoRespuesta: string;
    tasaRespuesta: number;
    entregas: number;
    servicios: string[];
    productos: Producto[];
    horario: string;
    telefono: string;
    whatsapp: string;
    email: string;
    sitioWeb?: string;
    añosExperiencia: number;
    empleados: string;
    certificaciones: string[];
    metodosPago: string[];
    zonasCobertura: string[];
    imagenPortada: string;
    imagenLogo: string;
    galeria: string[];
    destacado: boolean;
    insignias: string[];
    ultimaActividad: string;
    tiempoEntregaPromedio: string;
    tasaCumplimiento: number;
    clientesRecurrentes: number;
  }
  
  export interface Producto {
    id: string;
    proveedorId: string;
    nombre: string;
    descripcion: string;
    descripcionLarga: string;
    categoria: string;
    subcategoria: string;
    precio: number;
    precioOriginal?: number;
    unidad: string;
    minCompra: number;
    maxCompra?: number;
    disponible: boolean;
    stock: number;
    sku: string;
    marca?: string;
    modelo?: string;
    imagenes: string[];
    variantes: Variante[];
    personalizacion: OpcionPersonalizacion[];
    especificaciones: { label: string; valor: string }[];
    etiquetas: string[];
    envioGratis: boolean;
    tiempoPreparacion: string;
    vendidos: number;
    vistas: number;
    favoritos: number;
    fechaCreacion: string;
    destacado: boolean;
  }
  
  export interface Variante {
    id: string;
    nombre: string;
    opciones: { id: string; label: string; precio?: number; disponible?: boolean }[];
  }
  
  export interface OpcionPersonalizacion {
    id: string;
    tipo: "select" | "number" | "text" | "toggle" | "color" | "date";
    label: string;
    descripcion?: string;
    opciones?: { id: string; label: string; precio?: number; imagen?: string }[];
    min?: number;
    max?: number;
    placeholder?: string;
    precioExtra?: number;
    requerido?: boolean;
  }
  
  export interface Servicio {
    id: string;
    proveedorId: string;
    nombre: string;
    descripcion: string;
    descripcionLarga: string;
    categoria: string;
    subcategoria: string;
    precioBase: number;
    unidadPrecio: string;
    tiempoEstimado: string;
    incluye: string[];
    noIncluye: string[];
    requisitos: string[];
    personalizacion: OpcionPersonalizacion[];
    imagenes: string[];
    disponibilidad: "inmediata" | "24h" | "48h" | "programar";
    calificacionPromedio: number;
    trabajosCompletados: number;
    garantia?: string;
    etiquetas: string[];
  }
  
  export interface Proyecto {
    id: string;
    nombre: string;
    descripcion: string;
    estado: "activo" | "completado" | "pausado" | "borrador";
    fechaCreacion: string;
    fechaActualizacion: string;
    fechaEstimadaFin?: string;
    nodos: Nodo[];
    conexiones: Conexion[];
    progreso: number;
    totalEstimado: number;
    gastado: number;
    cliente?: string;
    etiquetas: string[];
    prioridad: "baja" | "media" | "alta" | "urgente";
    notas: string;
  }
  
  export interface Nodo {
    id: string;
    tipo: "producto" | "servicio";
    categoria: string;
    titulo: string;
    icono: string;
    estado: "pendiente" | "buscando" | "confirmado" | "en_progreso" | "completado" | "fallido" | "esperando";
    proveedor?: {
      id: string;
      nombre: string;
      iniciales: string;
      rating: number;
      verificado: boolean;
      imagen?: string;
    };
    producto?: {
      id: string;
      nombre: string;
      precio: number;
      cantidad: number;
      unidad: string;
      personalizacion: Record<string, any>;
      notas: string;
      imagen?: string;
    };
    servicio?: {
      id: string;
      nombre: string;
      precio: number;
      personalizacion: Record<string, any>;
      notas: string;
    };
    posicion: { x: number; y: number };
    fechaEstimada?: string;
    fechaCompletado?: string;
    mensajesNoLeidos: number;
    subtotal: number;
  }
  
  export interface Conexion {
    id: string;
    desde: string;
    hacia: string;
    tipo: "secuencial" | "paralelo";
  }
  
  export interface Mensaje {
    id: string;
    proyectoId: string;
    nodoId: string;
    proveedorId: string;
    tipo: "usuario" | "proveedor" | "sistema";
    contenido: string;
    adjuntos?: { tipo: "imagen" | "documento" | "audio"; url: string; nombre: string; tamaño?: string }[];
    fecha: string;
    leido: boolean;
    propuesta?: {
      tipo: "cambio_producto" | "cambio_precio" | "cambio_fecha" | "descuento";
      descripcion: string;
      valorOriginal: string;
      valorNuevo: string;
      estado: "pendiente" | "aceptada" | "rechazada";
    };
  }
  
  export interface Plantilla {
    id: string;
    nombre: string;
    descripcion: string;
    icono: string;
    categoria: string;
    nodos: Omit<Nodo, "id" | "estado" | "proveedor" | "mensajesNoLeidos" | "subtotal">[];
    conexiones: Omit<Conexion, "id">[];
    popular: boolean;
    usos: number;
    tiempoEstimado: string;
    presupuestoEstimado: { min: number; max: number };
  }
  
  export interface Oferta {
    id: string;
    proveedorId: string;
    proveedorNombre: string;
    proveedorImagen: string;
    producto: string;
    descripcion: string;
    precioOriginal: number;
    precioOferta: number;
    descuento: number;
    unidad: string;
    minCompra: number;
    validoHasta: string;
    categoria: string;
    imagen: string;
    cantidadDisponible: number;
    vendidos: number;
    destacada: boolean;
  }
  
  export interface Resenia {
    id: string;
    proveedorId: string;
    usuarioNombre: string;
    usuarioAvatar: string;
    rating: number;
    comentario: string;
    fecha: string;
    proyectoTipo: string;
    verificada: boolean;
    imagenes?: string[];
    respuestaProveedor?: string;
    util: number;
  }
  
  export interface Notificacion {
    id: string;
    tipo: "mensaje" | "proyecto" | "oferta" | "sistema" | "alerta" | "promocion";
    titulo: string;
    descripcion: string;
    fecha: string;
    leida: boolean;
    accion?: { label: string; ruta: string };
    icono: string;
    prioridad: "baja" | "normal" | "alta";
  }
  
  // ═══════════════════════════════════════════════════════════════════
  // IMÁGENES
  // ═══════════════════════════════════════════════════════════════════
  
  const imagenes = {
    proveedores: {
      portadas: [
        "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      galerias: [
        "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3637837/pexels-photo-3637837.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    productos: {
      madera: [
        "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6508357/pexels-photo-6508357.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      ferreteria: [
        "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      acabados: [
        "https://images.pexels.com/photos/5691530/pexels-photo-5691530.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/5582597/pexels-photo-5582597.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    servicios: {
      transporte: [
        "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      manufactura: [
        "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      instalacion: [
        "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4792515/pexels-photo-4792515.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    avatares: [
      "https://i.pravatar.cc/80?img=1",
      "https://i.pravatar.cc/80?img=2",
      "https://i.pravatar.cc/80?img=3",
      "https://i.pravatar.cc/80?img=4",
      "https://i.pravatar.cc/80?img=5",
      "https://i.pravatar.cc/80?img=6",
      "https://i.pravatar.cc/80?img=7",
      "https://i.pravatar.cc/80?img=8",
    ],
  };
  
  // ═══════════════════════════════════════════════════════════════════
  // USUARIO ACTUAL
  // ═══════════════════════════════════════════════════════════════════
  
  export const usuarioActual: Usuario = {
    id: "user-001",
    nombre: "Carlos Mendoza",
    empresa: "Constructora del Pacífico S.A.  de C.V.",
    avatar: "https://i.pravatar.cc/80?img=12",
    ubicacion: "Guadalajara, Jalisco",
    coordenadas: { lat: 20.6597, lng: -103.3496 },
    email: "carlos.mendoza@constructorapacifico.mx",
    telefono: "+52 33 1234 5678",
    plan: "pro",
    fechaRegistro: "2024-03-15",
    proyectosCompletados: 23,
    gastoTotal: 847500,
  };
  
  // ═══════════════════════════════════════════════════════════════════
  // PROVEEDORES
  // ═══════════════════════════════════════════════════════════════════
  
  export const proveedores: Proveedor[] = [
    {
      id: "prov-001",
      nombre: "Maderas del Norte",
      iniciales: "MN",
      tipo: "ambos",
      tier: "platinum",
      categorias: ["Madera", "Tableros", "Molduras", "Triplay"],
      especialidad: "Madera y derivados premium",
      ubicacion: "Zapopan, Jalisco",
      coordenadas: { lat: 20.7214, lng: -103.3863 },
      rating: 4.8,
      numResenias: 234,
      verificado: true,
      descripcion: "Especialistas en madera de calidad para carpintería y construcción.  Más de 20 años de experiencia abasteciendo a los mejores carpinteros de Jalisco.",
      tiempoRespuesta: "~30 min",
      tasaRespuesta: 98,
      entregas: 1250,
      servicios: ["Corte a medida", "Cepillado", "Entrega a domicilio", "Asesoría técnica"],
      horario: "Lun-Sáb 8:00-18:00",
      telefono: "+52 33 1234 5678",
      whatsapp: "+52 33 1234 5678",
      email: "ventas@maderasdelnorte.mx",
      sitioWeb: "https://maderasdelnorte.mx",
      añosExperiencia: 22,
      empleados: "20-50",
      certificaciones: ["ISO 9001", "FSC", "Proveedor Verificado"],
      metodosPago: ["Efectivo", "Transferencia", "Tarjeta", "Crédito 30 días"],
      zonasCobertura: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "El Salto"],
      imagenPortada: imagenes.proveedores.portadas[0],
      imagenLogo: "",
      galeria: imagenes.proveedores.galerias,
      destacado: true,
      insignias: ["Top Seller", "Respuesta Rápida", "5 años en Orquesta"],
      ultimaActividad: "Hace 5 minutos",
      tiempoEntregaPromedio: "24-48 horas",
      tasaCumplimiento: 97,
      clientesRecurrentes: 156,
      productos: [],
    },
    {
      id: "prov-002",
      nombre: "Cortes Precisión CNC",
      iniciales: "CP",
      tipo: "servicio",
      tier: "gold",
      categorias: ["Corte CNC", "Maquinado", "Grabado", "Router"],
      especialidad: "Maquinado CNC de precisión",
      ubicacion: "Tlaquepaque, Jalisco",
      coordenadas: { lat: 20.6411, lng: -103.3127 },
      rating: 4.9,
      numResenias: 156,
      verificado: true,
      descripcion: "Servicio de corte CNC de alta precisión para madera, MDF, acrílico y más. Tecnología de punta y acabados perfectos.",
      tiempoRespuesta: "~1 hora",
      tasaRespuesta: 95,
      entregas: 890,
      servicios: ["Corte CNC", "Grabado láser", "Fresado", "Diseño CAD/CAM"],
      horario: "Lun-Vie 9:00-19:00",
      telefono: "+52 33 2345 6789",
      whatsapp: "+52 33 2345 6789",
      email: "contacto@cortesprecision.mx",
      añosExperiencia: 8,
      empleados: "10-20",
      certificaciones: ["ISO 9001", "Proveedor Verificado"],
      metodosPago: ["Efectivo", "Transferencia", "Tarjeta"],
      zonasCobertura: ["Zona Metropolitana GDL"],
      imagenPortada: imagenes.proveedores.portadas[1],
      imagenLogo: "",
      galeria: imagenes.proveedores.galerias. slice(0, 3),
      destacado: true,
      insignias: ["Alta Precisión", "Tecnología CNC"],
      ultimaActividad: "Hace 15 minutos",
      tiempoEntregaPromedio: "24-72 horas",
      tasaCumplimiento: 99,
      clientesRecurrentes: 89,
      productos: [],
    },
    {
      id: "prov-003",
      nombre: "Transportes Rápidos GDL",
      iniciales: "TR",
      tipo: "servicio",
      tier: "gold",
      categorias: ["Transporte", "Mudanzas", "Fletes", "Logística"],
      especialidad: "Logística y transporte industrial",
      ubicacion: "Guadalajara, Jalisco",
      coordenadas: { lat: 20.6866, lng: -103.3511 },
      rating: 4.7,
      numResenias: 412,
      verificado: true,
      descripcion: "Servicio de transporte y fletes en toda la zona metropolitana.  Unidades de 1 a 5 toneladas.  Siempre puntuales.",
      tiempoRespuesta: "~15 min",
      tasaRespuesta: 99,
      entregas: 3200,
      servicios: ["Flete local", "Maniobras", "Mudanzas", "Almacenaje temporal"],
      horario: "Lun-Dom 7:00-21:00",
      telefono: "+52 33 3456 7890",
      whatsapp: "+52 33 3456 7890",
      email: "fletes@transportesrapidosgdl.mx",
      sitioWeb: "https://transportesrapidosgdl.mx",
      añosExperiencia: 15,
      empleados: "50-100",
      certificaciones: ["SCT", "Proveedor Verificado", "Seguro de carga"],
      metodosPago: ["Efectivo", "Transferencia", "Factura"],
      zonasCobertura: ["Jalisco", "Nayarit", "Colima", "Michoacán", "Guanajuato"],
      imagenPortada: imagenes.servicios.transporte[0],
      imagenLogo: "",
      galeria: imagenes.servicios.transporte,
      destacado: false,
      insignias: ["Respuesta Ultra Rápida", "24/7 Disponible"],
      ultimaActividad: "Hace 2 minutos",
      tiempoEntregaPromedio: "Mismo día",
      tasaCumplimiento: 96,
      clientesRecurrentes: 234,
      productos: [],
    },
    {
      id: "prov-004",
      nombre: "Carpinteros Asociados JAL",
      iniciales: "CA",
      tipo: "servicio",
      tier: "standard",
      categorias: ["Carpintería", "Instalación", "Mano de obra", "Armado"],
      especialidad: "Instalación y carpintería fina",
      ubicacion: "Tonalá, Jalisco",
      coordenadas: { lat: 20.6231, lng: -103.2344 },
      rating: 4.6,
      numResenias: 89,
      verificado: false,
      descripcion: "Equipo de carpinteros profesionales para instalación, armado y fabricación de muebles. Trabajo garantizado.",
      tiempoRespuesta: "~2 horas",
      tasaRespuesta: 88,
      entregas: 340,
      servicios: ["Instalación", "Armado", "Reparación", "Fabricación a medida"],
      horario: "Lun-Sáb 8:00-17:00",
      telefono: "+52 33 4567 8901",
      whatsapp: "+52 33 4567 8901",
      email: "carpinterosasociados@gmail.com",
      añosExperiencia: 12,
      empleados: "5-10",
      certificaciones: [],
      metodosPago: ["Efectivo", "Transferencia"],
      zonasCobertura: ["Tonalá", "Tlaquepaque", "Guadalajara"],
      imagenPortada: imagenes.servicios.instalacion[0],
      imagenLogo: "",
      galeria: imagenes.servicios.instalacion,
      destacado: false,
      insignias: ["Trabajo Artesanal"],
      ultimaActividad: "Hace 1 hora",
      tiempoEntregaPromedio: "Según proyecto",
      tasaCumplimiento: 92,
      clientesRecurrentes: 45,
      productos: [],
    },
    {
      id: "prov-005",
      nombre: "Ferretería Industrial MX",
      iniciales: "FI",
      tipo: "producto",
      tier: "gold",
      categorias: ["Ferretería", "Tornillería", "Herrajes", "Herramientas"],
      especialidad: "Ferretería y herrajes profesionales",
      ubicacion: "Guadalajara, Jalisco",
      coordenadas: { lat: 20.6732, lng: -103.3622 },
      rating: 4.5,
      numResenias: 567,
      verificado: true,
      descripcion: "Todo en ferretería, tornillería y herrajes para carpintería y construcción. Más de 15,000 productos en stock.",
      tiempoRespuesta: "~20 min",
      tasaRespuesta: 94,
      entregas: 4500,
      servicios: ["Entrega express", "Corte de varilla", "Asesoría"],
      horario: "Lun-Sáb 8:00-19:00, Dom 9:00-14:00",
      telefono: "+52 33 5678 9012",
      whatsapp: "+52 33 5678 9012",
      email: "ventas@ferreteriaindustrialmx.com",
      sitioWeb: "https://ferreteriaindustrialmx.com",
      añosExperiencia: 18,
      empleados: "20-50",
      certificaciones: ["Proveedor Verificado", "Distribuidor Autorizado"],
      metodosPago: ["Efectivo", "Transferencia", "Tarjeta", "Crédito"],
      zonasCobertura: ["Zona Metropolitana GDL"],
      imagenPortada: imagenes.productos.ferreteria[0],
      imagenLogo: "",
      galeria: imagenes.productos.ferreteria,
      destacado: false,
      insignias: ["Mega Inventario", "Precios Mayoreo"],
      ultimaActividad: "Hace 30 minutos",
      tiempoEntregaPromedio: "24 horas",
      tasaCumplimiento: 94,
      clientesRecurrentes: 312,
      productos: [],
    },
    {
      id: "prov-006",
      nombre: "Acabados y Barnices Pro",
      iniciales: "AB",
      tipo: "ambos",
      tier: "standard",
      categorias: ["Barnices", "Pinturas", "Acabados", "Lacas"],
      especialidad: "Acabados profesionales para madera",
      ubicacion: "Zapopan, Jalisco",
      coordenadas: { lat: 20.7012, lng: -103.4101 },
      rating: 4.7,
      numResenias: 198,
      verificado: true,
      descripcion: "Especialistas en acabados para madera.  Barnices, lacas, tintes y selladores profesionales. También aplicamos.",
      tiempoRespuesta: "~45 min",
      tasaRespuesta: 91,
      entregas: 780,
      servicios: ["Aplicación profesional", "Asesoría técnica", "Capacitación"],
      horario: "Lun-Vie 9:00-18:00, Sáb 9:00-14:00",
      telefono: "+52 33 6789 0123",
      whatsapp: "+52 33 6789 0123",
      email: "info@acabadospro.mx",
      añosExperiencia: 10,
      empleados: "10-20",
      certificaciones: ["Proveedor Verificado", "Certificación Ambiental"],
      metodosPago: ["Efectivo", "Transferencia", "Tarjeta"],
      zonasCobertura: ["Zapopan", "Guadalajara"],
      imagenPortada: imagenes.productos.acabados[0],
      imagenLogo: "",
      galeria: imagenes.productos. acabados,
      destacado: false,
      insignias: ["Eco-Friendly"],
      ultimaActividad: "Hace 2 horas",
      tiempoEntregaPromedio: "48-72 horas",
      tasaCumplimiento: 95,
      clientesRecurrentes: 67,
      productos: [],
    },
    {
      id: "prov-007",
      nombre: "Tableros y Aglomerados GDL",
      iniciales: "TA",
      tipo: "producto",
      tier: "platinum",
      categorias: ["Tableros", "MDF", "Melamina", "Aglomerado"],
      especialidad: "Tableros y melaminas industriales",
      ubicacion: "El Salto, Jalisco",
      coordenadas: { lat: 20.5167, lng: -103.2667 },
      rating: 4.9,
      numResenias: 345,
      verificado: true,
      descripcion: "Distribuidor autorizado de las principales marcas de tableros.  Melaminas, MDF y aglomerados en todas las medidas.",
      tiempoRespuesta: "~25 min",
      tasaRespuesta: 97,
      entregas: 2100,
      servicios: ["Corte a medida", "Canteado", "Entrega"],
      horario: "Lun-Sáb 7:00-17:00",
      telefono: "+52 33 7890 1234",
      whatsapp: "+52 33 7890 1234",
      email: "pedidos@tablerosydl.mx",
      sitioWeb: "https://tablerosydl.mx",
      añosExperiencia: 25,
      empleados: "50-100",
      certificaciones: ["ISO 9001", "ISO 14001", "Distribuidor Masisa", "Distribuidor Arauco"],
      metodosPago: ["Transferencia", "Crédito 15/30 días", "Efectivo"],
      zonasCobertura: ["Jalisco", "Nayarit", "Colima", "Aguascalientes"],
      imagenPortada: imagenes.productos.madera[2],
      imagenLogo: "",
      galeria: imagenes.productos.madera,
      destacado: true,
      insignias: ["Distribuidor Oficial", "Mayorista"],
      ultimaActividad: "Hace 10 minutos",
      tiempoEntregaPromedio: "24 horas",
      tasaCumplimiento: 98,
      clientesRecurrentes: 189,
      productos: [],
    },
    {
      id: "prov-008",
      nombre: "Herrajes Europeos MX",
      iniciales: "HE",
      tipo: "producto",
      tier: "gold",
      categorias: ["Herrajes", "Correderas", "Bisagras", "Accesorios"],
      especialidad: "Herrajes premium importados",
      ubicacion: "Guadalajara, Jalisco",
      coordenadas: { lat: 20.6850, lng: -103.3300 },
      rating: 4.8,
      numResenias: 234,
      verificado: true,
      descripcion: "Importadores directos de herrajes europeos.  Blum, Hettich, Grass y más. Calidad garantizada.",
      tiempoRespuesta: "~35 min",
      tasaRespuesta: 93,
      entregas: 1560,
      servicios: ["Asesoría técnica", "Capacitación", "Instalación"],
      horario: "Lun-Vie 9:00-18:00",
      telefono: "+52 33 8901 2345",
      whatsapp: "+52 33 8901 2345",
      email: "ventas@herrajeseuropeos.mx",
      sitioWeb: "https://herrajeseuropeos.mx",
      añosExperiencia: 12,
      empleados: "10-20",
      certificaciones: ["Distribuidor Blum", "Distribuidor Hettich"],
      metodosPago: ["Transferencia", "Tarjeta", "PayPal"],
      zonasCobertura: ["Nacional"],
      imagenPortada: imagenes.productos.ferreteria[1],
      imagenLogo: "",
      galeria: imagenes.productos.ferreteria,
      destacado: false,
      insignias: ["Importación Directa", "Premium"],
      ultimaActividad: "Hace 45 minutos",
      tiempoEntregaPromedio: "48-72 horas",
      tasaCumplimiento: 96,
      clientesRecurrentes: 123,
      productos: [],
    },
  ];
  
  // ═══════════════════════════════════════════════════════════════════
  // PRODUCTOS
  // ═══════════════════════════════════════════════════════════════════
  
  export const productos: Producto[] = [
    {
      id: "prod-001",
      proveedorId: "prov-001",
      nombre: "Tablón de Pino Primera",
      descripcion: "Tablón de pino de primera calidad, ideal para muebles y carpintería general.",
      descripcionLarga: "Nuestro tablón de pino de primera es seleccionado cuidadosamente para garantizar la mejor calidad. Madera seca con humedad controlada al 12%, libre de nudos grandes y con veta uniforme. Perfecto para proyectos de carpintería fina, muebles y acabados de calidad.",
      categoria: "Madera",
      subcategoria: "Tablones",
      precio: 450,
      precioOriginal: 520,
      unidad: "pieza",
      minCompra: 5,
      maxCompra: 500,
      disponible: true,
      stock: 234,
      sku: "MN-TAB-PINO-001",
      marca: "Maderas del Norte",
      imagenes: imagenes.productos.madera,
      vendidos: 1250,
      vistas: 8934,
      favoritos: 234,
      fechaCreacion: "2024-01-15",
      destacado: true,
      envioGratis: true,
      tiempoPreparacion: "24 horas",
      variantes: [
        {
          id: "var-tipo",
          nombre: "Tipo de madera",
          opciones: [
            { id: "pino", label: "Pino", disponible: true },
            { id: "encino", label: "Encino", precio: 120, disponible: true },
            { id: "cedro", label: "Cedro Rojo", precio: 200, disponible: true },
            { id: "parota", label: "Parota", precio: 350, disponible: false },
          ],
        },
        {
          id: "var-grosor",
          nombre: "Grosor",
          opciones: [
            { id: "3/4in", label: '3/4"', precio: -50, disponible: true },
            { id: "1in", label: '1"', disponible: true },
            { id: "1.5in", label: '1 1/2"', precio: 80, disponible: true },
            { id: "2in", label: '2"', precio: 150, disponible: true },
          ],
        },
      ],
      personalizacion: [
        {
          id: "largo",
          tipo: "select",
          label: "Largo",
          descripcion: "Selecciona el largo estándar o solicita medida especial",
          requerido: true,
          opciones: [
            { id: "2. 44m", label: "2.44 m (8 pies)" },
            { id: "3.05m", label: "3.05 m (10 pies)", precio: 100 },
            { id: "3.66m", label: "3.66 m (12 pies)", precio: 180 },
            { id: "custom", label: "Medida especial", precio: 50 },
          ],
        },
        {
          id: "acabado",
          tipo: "select",
          label: "Acabado inicial",
          descripcion: "Preparación básica de la madera",
          opciones: [
            { id: "natural", label: "Natural (sin acabado)" },
            { id: "cepillado", label: "Cepillado 4 caras", precio: 30 },
            { id: "pulido", label: "Pulido listo para barniz", precio: 60 },
          ],
        },
        {
          id: "cantidad",
          tipo: "number",
          label: "Cantidad",
          min: 5,
          max: 500,
          requerido: true,
        },
        {
          id: "notas",
          tipo: "text",
          label: "Notas especiales",
          placeholder: "Ej: Necesito que estén bien secos, sin nudos visibles.. .",
        },
      ],
      especificaciones: [
        { label: "Ancho estándar", valor: '8" (20 cm)' },
        { label: "Humedad", valor: "10-12%" },
        { label: "Origen", valor: "Durango, México" },
        { label: "Secado", valor: "Horno controlado" },
        { label: "Certificación", valor: "FSC Mix" },
      ],
      etiquetas: ["pino", "tablón", "madera sólida", "carpintería", "muebles"],
    },
    {
      id: "prod-002",
      proveedorId: "prov-001",
      nombre: "MDF 15mm Crudo",
      descripcion: "Tablero MDF de 15mm de espesor, ideal para muebles y carpintería fina.",
      descripcionLarga: "Tablero de fibra de densidad media (MDF) de alta calidad.  Superficie lisa y uniforme, perfecto para pintar, lacar o enchapara.  Ideal para muebles, puertas, molduras y trabajos que requieren acabados finos.",
      categoria: "Tableros",
      subcategoria: "MDF",
      precio: 380,
      unidad: "hoja",
      minCompra: 1,
      maxCompra: 100,
      disponible: true,
      stock: 156,
      sku: "MN-MDF-15-001",
      marca: "Masisa",
      imagenes: imagenes.productos.madera. slice(1, 4),
      vendidos: 890,
      vistas: 5621,
      favoritos: 167,
      fechaCreacion: "2024-02-20",
      destacado: false,
      envioGratis: false,
      tiempoPreparacion: "Inmediato",
      variantes: [
        {
          id: "var-espesor",
          nombre: "Espesor",
          opciones: [
            { id: "6mm", label: "6mm", precio: -150, disponible: true },
            { id: "9mm", label: "9mm", precio: -80, disponible: true },
            { id: "12mm", label: "12mm", precio: -40, disponible: true },
            { id: "15mm", label: "15mm", disponible: true },
            { id: "18mm", label: "18mm", precio: 60, disponible: true },
            { id: "25mm", label: "25mm", precio: 120, disponible: true },
          ],
        },
      ],
      personalizacion: [
        {
          id: "medida",
          tipo: "select",
          label: "Medida",
          requerido: true,
          opciones: [
            { id: "completa", label: "Hoja completa (1. 22 x 2.44m)" },
            { id: "media", label: "Media hoja (1.22 x 1.22m)", precio: -140 },
            { id: "cuarto", label: "Cuarto de hoja (0.61 x 1.22m)", precio: -220 },
          ],
        },
        {
          id: "cortes",
          tipo: "toggle",
          label: "Incluir servicio de corte",
          descripcion: "Cortes rectos según tu diseño",
          precioExtra: 80,
        },
        {
          id: "cantidad",
          tipo: "number",
          label: "Cantidad",
          min: 1,
          max: 100,
          requerido: true,
        },
      ],
      especificaciones: [
        { label: "Medida hoja", valor: "1.22 x 2.44 m" },
        { label: "Densidad", valor: "750 kg/m³" },
        { label: "Marca", valor: "Masisa" },
        { label: "Acabado", valor: "Crudo lijado" },
      ],
      etiquetas: ["mdf", "tablero", "melamina", "muebles"],
    },
    {
      id: "prod-003",
      proveedorId: "prov-005",
      nombre: "Kit Tornillería Madera Profesional",
      descripcion: "Kit completo de tornillos para madera, varios tamaños y cabezas.",
      descripcionLarga: "El kit más completo para carpinteros profesionales. Incluye tornillos de diferentes medidas, cabezas y acabados. Tornillos de acero con recubrimiento anticorrosivo.",
      categoria: "Ferretería",
      subcategoria: "Tornillería",
      precio: 250,
      unidad: "kit",
      minCompra: 1,
      disponible: true,
      stock: 89,
      sku: "FI-KIT-TORN-001",
      marca: "Følsgaard",
      imagenes: imagenes.productos.ferreteria,
      vendidos: 567,
      vistas: 3245,
      favoritos: 89,
      fechaCreacion: "2024-03-10",
      destacado: false,
      envioGratis: true,
      tiempoPreparacion: "Inmediato",
      variantes: [],
      personalizacion: [
        {
          id: "tamaño",
          tipo: "select",
          label: "Tamaño del kit",
          requerido: true,
          opciones: [
            { id: "basico", label: "Básico - 200 piezas" },
            { id: "profesional", label: "Profesional - 500 piezas", precio: 180 },
            { id: "industrial", label: "Industrial - 1000 piezas", precio: 350 },
            { id: "mega", label: "Mega Kit - 2000 piezas", precio: 600 },
          ],
        },
        {
          id: "organizador",
          tipo: "toggle",
          label: "Incluir organizador plástico",
          precioExtra: 120,
        },
      ],
      especificaciones: [
        { label: "Medidas incluidas", valor: '1", 1. 5", 2", 2.5", 3"' },
        { label: "Tipos de cabeza", valor: "Plana, Gota, Hexagonal" },
        { label: "Material", valor: "Acero galvanizado" },
        { label: "Organizador", valor: "Opcional" },
      ],
      etiquetas: ["tornillos", "kit", "carpintería", "ferretería"],
    },
    {
      id: "prod-004",
      proveedorId: "prov-007",
      nombre: "Melamina Blanca 18mm",
      descripcion: "Tablero de melamina blanca texturizada, ambas caras.  Ideal para closets y cocinas.",
      descripcionLarga: "Tablero de aglomerado recubierto con melamina de alta presión en ambas caras. Color blanco ártico con textura poro fino. Cantos termofusibles disponibles.",
      categoria: "Tableros",
      subcategoria: "Melaminas",
      precio: 520,
      precioOriginal: 580,
      unidad: "hoja",
      minCompra: 1,
      disponible: true,
      stock: 340,
      sku: "TA-MEL-BCA-18",
      marca: "Arauco",
      imagenes: imagenes.productos.madera.slice(0, 3),
      vendidos: 2340,
      vistas: 12500,
      favoritos: 456,
      fechaCreacion: "2024-01-05",
      destacado: true,
      envioGratis: true,
      tiempoPreparacion: "Inmediato",
      variantes: [
        {
          id: "var-color",
          nombre: "Color",
          opciones: [
            { id: "blanco", label: "Blanco Ártico", disponible: true },
            { id: "negro", label: "Negro Grafito", disponible: true },
            { id: "gris", label: "Gris Ceniza", disponible: true },
            { id: "roble", label: "Roble Natural", precio: 80, disponible: true },
            { id: "nogal", label: "Nogal Americano", precio: 80, disponible: true },
            { id: "wengue", label: "Wengué", precio: 100, disponible: false },
          ],
        },
        {
          id: "var-espesor",
          nombre: "Espesor",
          opciones: [
            { id: "15mm", label: "15mm", precio: -60, disponible: true },
            { id: "18mm", label: "18mm", disponible: true },
            { id: "25mm", label: "25mm", precio: 120, disponible: true },
          ],
        },
      ],
      personalizacion: [
        {
          id: "corte",
          tipo: "toggle",
          label: "Servicio de corte a medida",
          descripcion: "Cortamos según tu diseño (máx 10 cortes)",
          precioExtra: 150,
        },
        {
          id: "canteado",
          tipo: "select",
          label: "Canteado",
          opciones: [
            { id: "sin", label: "Sin cantear" },
            { id: "2lados", label: "2 lados largos", precio: 60 },
            { id: "4lados", label: "4 lados", precio: 100 },
          ],
        },
        {
          id: "cantidad",
          tipo: "number",
          label: "Cantidad",
          min: 1,
          max: 50,
          requerido: true,
        },
      ],
      especificaciones: [
        { label: "Medida hoja", valor: "1. 22 x 2.44 m" },
        { label: "Marca", valor: "Arauco" },
        { label: "Textura", valor: "Poro Fino" },
        { label: "Caras", valor: "Ambas caras" },
        { label: "Densidad", valor: "680 kg/m³" },
      ],
      etiquetas: ["melamina", "blanco", "closet", "cocina", "arauco"],
    },
    {
      id: "prod-005",
      proveedorId: "prov-008",
      nombre: "Corredera Blum Tandem 550mm",
      descripcion: "Corredera de extracción total con cierre suave. Capacidad 30kg.",
      descripcionLarga: "Las correderas TANDEM de Blum ofrecen una combinación única de calidad de movimiento y amortiguación de cierre BLUMOTION. Extracción total para máximo acceso al cajón.",
      categoria: "Herrajes",
      subcategoria: "Correderas",
      precio: 890,
      unidad: "juego",
      minCompra: 1,
      disponible: true,
      stock: 67,
      sku: "HE-BLUM-TAN-550",
      marca: "Blum",
      modelo: "TANDEM 550H",
      imagenes: imagenes.productos.ferreteria,
      vendidos: 234,
      vistas: 4521,
      favoritos: 123,
      fechaCreacion: "2024-02-01",
      destacado: true,
      envioGratis: true,
      tiempoPreparacion: "24-48 horas",
      variantes: [
        {
          id: "var-largo",
          nombre: "Largo",
          opciones: [
            { id: "300mm", label: "300mm", precio: -200, disponible: true },
            { id: "400mm", label: "400mm", precio: -100, disponible: true },
            { id: "450mm", label: "450mm", precio: -50, disponible: true },
            { id: "500mm", label: "500mm", disponible: true },
            { id: "550mm", label: "550mm", precio: 50, disponible: true },
            { id: "600mm", label: "600mm", precio: 100, disponible: true },
          ],
        },
      ],
      personalizacion: [
        {
          id: "cantidad",
          tipo: "number",
          label: "Juegos",
          descripcion: "Cada juego incluye corredera izquierda y derecha",
          min: 1,
          max: 50,
          requerido: true,
        },
        {
          id: "accesorios",
          tipo: "toggle",
          label: "Kit de instalación completo",
          descripcion: "Incluye tornillos, clips y plantilla",
          precioExtra: 85,
        },
      ],
      especificaciones: [
        { label: "Marca", valor: "Blum" },
        { label: "Modelo", valor: "TANDEM 550H" },
        { label: "Extracción", valor: "Total" },
        { label: "Capacidad", valor: "30 kg" },
        { label: "Cierre", valor: "BLUMOTION integrado" },
        { label: "Garantía", valor: "Lifetime" },
      ],
      etiquetas: ["blum", "corredera", "tandem", "cierre suave", "premium"],
    },
    {
      id: "prod-006",
      proveedorId: "prov-006",
      nombre: "Barniz Poliuretano Brillante",
      descripcion: "Barniz poliuretano de alta resistencia.  Acabado brillante cristalino.",
      descripcionLarga: "Barniz poliuretano de dos componentes con excelente dureza y resistencia al rayado. Ideal para pisos, muebles y superficies de alto tráfico.  Acabado brillante tipo espejo.",
      categoria: "Acabados",
      subcategoria: "Barnices",
      precio: 450,
      unidad: "galón",
      minCompra: 1,
      disponible: true,
      stock: 45,
      sku: "AB-BARN-PU-BRI",
      marca: "Comex",
      imagenes: imagenes.productos.acabados,
      vendidos: 178,
      vistas: 2345,
      favoritos: 67,
      fechaCreacion: "2024-03-15",
      destacado: false,
      envioGratis: false,
      tiempoPreparacion: "Inmediato",
      variantes: [
        {
          id: "var-acabado",
          nombre: "Acabado",
          opciones: [
            { id: "brillante", label: "Brillante", disponible: true },
            { id: "satinado", label: "Satinado", disponible: true },
            { id: "mate", label: "Mate", precio: 30, disponible: true },
          ],
        },
      ],
      personalizacion: [
        {
          id: "tamaño",
          tipo: "select",
          label: "Presentación",
          requerido: true,
          opciones: [
            { id: "litro", label: "1 Litro", precio: -320 },
            { id: "galon", label: "1 Galón (3. 78 L)" },
            { id: "cubeta", label: "Cubeta (19 L)", precio: 1350 },
          ],
        },
        {
          id: "catalizador",
          tipo: "toggle",
          label: "Incluir catalizador",
          descripcion: "Necesario para activar el barniz",
          precioExtra: 180,
        },
        {
          id: "cantidad",
          tipo: "number",
          label: "Cantidad",
          min: 1,
          max: 20,
          requerido: true,
        },
      ],
      especificaciones: [
        { label: "Tipo", valor: "Poliuretano 2K" },
        { label: "Rendimiento", valor: "12-14 m²/L" },
        { label: "Secado al tacto", valor: "2-3 horas" },
        { label: "Secado total", valor: "24 horas" },
        { label: "Capas recomendadas", valor: "2-3" },
      ],
      etiquetas: ["barniz", "poliuretano", "brillante", "resistente"],
    },
  ];
  
  // ═══════════════════════════════════════════════════════════════════
  // SERVICIOS
  // ═══════════════════════════════════════════════════════════════════
  
  export const servicios: Servicio[] = [
    {
      id: "serv-001",
      proveedorId: "prov-002",
      nombre: "Corte CNC Profesional",
      descripcion: "Servicio de corte CNC de alta precisión para tus piezas.",
      descripcionLarga: "Nuestro servicio de corte CNC ofrece precisión milimétrica para cualquier tipo de diseño. Trabajamos con madera, MDF, acrílico, PVC y más. Incluye revisión de archivos y asesoría en diseño.",
      categoria: "Maquinado",
      subcategoria: "Corte CNC",
      precioBase: 150,
      unidadPrecio: "por hora",
      tiempoEstimado: "24-48 horas",
      incluye: [
        "Corte según diseño proporcionado",
        "Revisión y optimización de archivos",
        "Empaque básico",
        "Hasta 3 pruebas de corte",
      ],
      noIncluye: ["Material", "Entrega a domicilio", "Diseño desde cero"],
      requisitos: [
        "Archivo en formato DXF, DWG o AI",
        "Material a cortar (o comprarlo con nosotros)",
        "50% de anticipo",
      ],
      imagenes: imagenes.servicios.manufactura,
      disponibilidad: "24h",
      calificacionPromedio: 4.9,
      trabajosCompletados: 890,
      garantia: "Reposición si el corte no cumple especificaciones",
      etiquetas: ["cnc", "corte", "precisión", "madera", "mdf"],
      personalizacion: [
        {
          id: "material",
          tipo: "select",
          label: "Material a cortar",
          requerido: true,
          opciones: [
            { id: "mdf", label: "MDF (hasta 18mm)" },
            { id: "madera", label: "Madera sólida (hasta 25mm)", precio: 50 },
            { id: "acrilico", label: "Acrílico (hasta 10mm)", precio: 80 },
            { id: "pvc", label: "PVC espumado", precio: 30 },
            { id: "aluminio", label: "Aluminio composite", precio: 120 },
          ],
        },
        {
          id: "complejidad",
          tipo: "select",
          label: "Complejidad del diseño",
          requerido: true,
          opciones: [
            { id: "simple", label: "Simple (cortes rectos y básicos)" },
            { id: "medio", label: "Medio (curvas y detalles)", precio: 100 },
            { id: "complejo", label: "Complejo (diseño muy detallado)", precio: 250 },
            { id: "3d", label: "Fresado 3D", precio: 400 },
          ],
        },
        {
          id: "urgente",
          tipo: "toggle",
          label: "Servicio urgente (mismo día)",
          precioExtra: 300,
        },
        {
          id: "archivo",
          tipo: "text",
          label: "Notas sobre el diseño",
          placeholder: "Describe tu proyecto o indica si enviarás archivo.. .",
        },
      ],
    },
    {
      id: "serv-002",
      proveedorId: "prov-003",
      nombre: "Flete Local ZMG",
      descripcion: "Servicio de transporte en zona metropolitana de Guadalajara.",
      descripcionLarga: "Transporte seguro y puntual para todo tipo de mercancía. Contamos con unidades desde camionetas hasta camiones de 5 toneladas. Seguro de carga incluido en todos los servicios.",
      categoria: "Transporte",
      subcategoria: "Flete local",
      precioBase: 350,
      unidadPrecio: "por viaje",
      tiempoEstimado: "Mismo día",
      incluye: [
        "Chofer profesional",
        "Combustible",
        "Seguro básico de carga",
        "Lonas y amarres",
      ],
      noIncluye: ["Maniobras de carga/descarga", "Embalaje", "Almacenaje"],
      requisitos: [
        "Dirección exacta de origen y destino",
        "Descripción de la mercancía",
        "Confirmación 2 horas antes",
      ],
      imagenes: imagenes.servicios.transporte,
      disponibilidad: "inmediata",
      calificacionPromedio: 4.7,
      trabajosCompletados: 3200,
      garantia: "Seguro de carga hasta $50,000",
      etiquetas: ["flete", "transporte", "local", "carga"],
      personalizacion: [
        {
          id: "vehiculo",
          tipo: "select",
          label: "Tipo de vehículo",
          requerido: true,
          opciones: [
            { id: "camioneta", label: "Camioneta 3.5m (hasta 1 ton)" },
            { id: "torton", label: "Torton 6m (hasta 3. 5 ton)", precio: 400 },
            { id: "rabon", label: "Rabón 8m (hasta 5 ton)", precio: 800 },
            { id: "trailer", label: "Trailer (hasta 20 ton)", precio: 2500 },
          ],
        },
        {
          id: "maniobras",
          tipo: "toggle",
          label: "Incluir maniobras de carga/descarga",
          descripcion: "2 ayudantes para carga y descarga",
          precioExtra: 200,
        },
        {
          id: "horario",
          tipo: "select",
          label: "Horario preferido",
          opciones: [
            { id: "manana", label: "Mañana (7:00-12:00)" },
            { id: "tarde", label: "Tarde (14:00-18:00)" },
            { id: "flexible", label: "Flexible (según disponibilidad)" },
            { id: "nocturno", label: "Nocturno (20:00-6:00)", precio: 150 },
          ],
        },
        {
          id: "seguro_extra",
          tipo: "toggle",
          label: "Seguro extendido hasta $200,000",
          precioExtra: 250,
        },
      ],
    },
    {
        id: "serv-003",
        proveedorId: "prov-004",
        nombre: "Instalación de Muebles",
        descripcion: "Servicio profesional de instalación y armado de muebles.",
        descripcionLarga: "Nuestro equipo de carpinteros profesionales se encarga de la instalación completa de tus muebles. Trabajamos con closets, cocinas, libreros, muebles de baño y más. Garantizamos un acabado perfecto y limpieza al terminar.",
        categoria: "Mano de obra",
        subcategoria: "Instalación",
        precioBase: 500,
        unidadPrecio: "por día",
        tiempoEstimado: "Según proyecto",
        incluye: [
          "Carpintero profesional certificado",
          "Herramienta especializada",
          "Ajustes y nivelación",
          "Limpieza del área de trabajo",
        ],
        noIncluye: ["Materiales adicionales", "Herrajes no incluidos", "Transporte de muebles"],
        requisitos: [
          "Muebles listos para instalar",
          "Acceso al área de trabajo",
          "Energía eléctrica disponible",
          "Paredes preparadas (si aplica)",
        ],
        imagenes: imagenes.servicios. instalacion,
        disponibilidad: "48h",
        calificacionPromedio: 4.6,
        trabajosCompletados: 340,
        garantia: "6 meses en mano de obra",
        etiquetas: ["instalación", "armado", "carpintería", "muebles"],
        personalizacion: [
          {
            id: "tipo_trabajo",
            tipo: "select",
            label: "Tipo de trabajo",
            requerido: true,
            opciones: [
              { id: "armado", label: "Armado de muebles (kit/prefabricados)" },
              { id: "instalacion", label: "Instalación con fijación a pared", precio: 100 },
              { id: "ajustes", label: "Ajustes y modificaciones menores", precio: 50 },
              { id: "completo", label: "Instalación completa + acabados", precio: 200 },
            ],
          },
          {
            id: "complejidad",
            tipo: "select",
            label: "Complejidad del proyecto",
            requerido: true,
            opciones: [
              { id: "simple", label: "Simple (1-3 muebles básicos)" },
              { id: "medio", label: "Medio (4-8 muebles o closet)", precio: 300 },
              { id: "complejo", label: "Complejo (cocina integral o vestidor)", precio: 700 },
              { id: "grande", label: "Proyecto grande (múltiples habitaciones)", precio: 1200 },
            ],
          },
          {
            id: "ayudante",
            tipo: "toggle",
            label: "Incluir ayudante adicional",
            descripcion: "Recomendado para proyectos complejos",
            precioExtra: 350,
          },
          {
            id: "fin_semana",
            tipo: "toggle",
            label: "Trabajo en fin de semana",
            precioExtra: 200,
          },
          {
            id: "fecha",
            tipo: "date",
            label: "Fecha deseada de instalación",
            requerido: true,
          },
        ],
      },
      {
        id: "serv-004",
        proveedorId: "prov-006",
        nombre: "Aplicación de Acabado",
        descripcion: "Aplicación profesional de barniz, laca o pintura en madera.",
        descripcionLarga: "Servicio especializado en la aplicación de acabados para madera. Trabajamos con barnices, lacas, poliuretanos y pinturas. Contamos con cabina de pintura para acabados automotrices en muebles.",
        categoria: "Acabados",
        subcategoria: "Aplicación",
        precioBase: 80,
        unidadPrecio: "por m²",
        tiempoEstimado: "2-3 días",
        incluye: [
          "Preparación de superficie",
          "Aplicación profesional",
          "Materiales básicos (sellador)",
          "Lijado entre capas",
        ],
        noIncluye: ["Barniz/pintura especial", "Transporte", "Reparación de madera dañada"],
        requisitos: [
          "Superficie limpia y seca",
          "Acceso al área o entrega en taller",
          "Definir color/acabado deseado",
        ],
        imagenes: imagenes.productos.acabados,
        disponibilidad: "48h",
        calificacionPromedio: 4.7,
        trabajosCompletados: 780,
        garantia: "1 año en aplicación",
        etiquetas: ["barniz", "acabado", "pintura", "laca"],
        personalizacion: [
          {
            id: "tipo_acabado",
            tipo: "select",
            label: "Tipo de acabado",
            requerido: true,
            opciones: [
              { id: "barniz", label: "Barniz natural transparente" },
              { id: "laca", label: "Laca color (catálogo)", precio: 30 },
              { id: "poliuretano", label: "Poliuretano alto brillo", precio: 50 },
              { id: "vintage", label: "Acabado vintage/envejecido", precio: 80 },
              { id: "automotriz", label: "Acabado automotriz (espejo)", precio: 150 },
            ],
          },
          {
            id: "capas",
            tipo: "select",
            label: "Número de capas",
            requerido: true,
            opciones: [
              { id: "1", label: "1 capa (económico)" },
              { id: "2", label: "2 capas (estándar)", precio: 40 },
              { id: "3", label: "3 capas (premium)", precio: 80 },
              { id: "4", label: "4+ capas (ultra premium)", precio: 120 },
            ],
          },
          {
            id: "color",
            tipo: "select",
            label: "Color/Tinte",
            opciones: [
              { id: "natural", label: "Natural (sin tinte)" },
              { id: "nogal", label: "Nogal" },
              { id: "caoba", label: "Caoba" },
              { id: "ebano", label: "Ébano" },
              { id: "roble", label: "Roble claro" },
              { id: "custom", label: "Color personalizado", precio: 100 },
            ],
          },
          {
            id: "en_sitio",
            tipo: "toggle",
            label: "Aplicación en sitio (no en taller)",
            descripcion: "Nos trasladamos a tu ubicación",
            precioExtra: 500,
          },
        ],
      },
      {
        id: "serv-005",
        proveedorId: "prov-002",
        nombre: "Grabado Láser",
        descripcion: "Grabado láser de alta definición en madera, acrílico y más.",
        descripcionLarga: "Servicio de grabado láser para personalización de productos. Ideal para logos, textos, imágenes y patrones decorativos. Trabajamos con madera, acrílico, cuero, vidrio y metales pintados.",
        categoria: "Maquinado",
        subcategoria: "Grabado",
        precioBase: 200,
        unidadPrecio: "por hora",
        tiempoEstimado: "24-48 horas",
        incluye: [
          "Grabado según diseño",
          "Vectorización básica de imagen",
          "Prueba en material similar",
          "Limpieza de piezas",
        ],
        noIncluye: ["Material", "Diseño complejo desde cero", "Entrega"],
        requisitos: [
          "Imagen en alta resolución o vector",
          "Material a grabar",
          "Especificar profundidad deseada",
        ],
        imagenes: imagenes.servicios.manufactura,
        disponibilidad: "24h",
        calificacionPromedio: 4.9,
        trabajosCompletados: 456,
        garantia: "Reposición si no cumple especificaciones",
        etiquetas: ["láser", "grabado", "personalización", "madera"],
        personalizacion: [
          {
            id: "material",
            tipo: "select",
            label: "Material a grabar",
            requerido: true,
            opciones: [
              { id: "mdf", label: "MDF" },
              { id: "madera", label: "Madera sólida", precio: 30 },
              { id: "acrilico", label: "Acrílico", precio: 50 },
              { id: "cuero", label: "Cuero", precio: 40 },
              { id: "vidrio", label: "Vidrio", precio: 80 },
            ],
          },
          {
            id: "area",
            tipo: "select",
            label: "Área de grabado",
            requerido: true,
            opciones: [
              { id: "pequeño", label: "Pequeño (hasta 10x10 cm)" },
              { id: "mediano", label: "Mediano (hasta 30x30 cm)", precio: 100 },
              { id: "grande", label: "Grande (hasta 60x40 cm)", precio: 200 },
              { id: "xl", label: "Extra grande (hasta 120x60 cm)", precio: 350 },
            ],
          },
          {
            id: "cantidad",
            tipo: "number",
            label: "Cantidad de piezas",
            min: 1,
            max: 1000,
            requerido: true,
          },
          {
            id: "urgente",
            tipo: "toggle",
            label: "Entrega urgente (mismo día)",
            precioExtra: 250,
          },
        ],
      },
      {
        id: "serv-006",
        proveedorId: "prov-007",
        nombre: "Corte y Canteado de Tableros",
        descripcion: "Servicio de corte a medida y aplicación de canto en tableros.",
        descripcionLarga: "Servicio completo de corte optimizado y canteado de tableros. Utilizamos seccionadoras de precisión y canteadoras automáticas para acabados perfectos. Optimizamos tu material para mínimo desperdicio.",
        categoria: "Maquinado",
        subcategoria: "Corte tableros",
        precioBase: 15,
        unidadPrecio: "por corte",
        tiempoEstimado: "24 horas",
        incluye: [
          "Corte de precisión",
          "Optimización de material",
          "Etiquetado de piezas",
          "Empaque básico",
        ],
        noIncluye: ["Tableros", "Cantos (se cotizan aparte)", "Entrega"],
        requisitos: [
          "Lista de corte o planos",
          "Definir tipo de canto si aplica",
        ],
        imagenes: imagenes.productos.madera. slice(1, 3),
        disponibilidad: "24h",
        calificacionPromedio: 4.8,
        trabajosCompletados: 2100,
        garantia: "Reposición por errores de corte",
        etiquetas: ["corte", "tableros", "canteado", "melamina"],
        personalizacion: [
          {
            id: "tipo_corte",
            tipo: "select",
            label: "Tipo de servicio",
            requerido: true,
            opciones: [
              { id: "corte", label: "Solo corte" },
              { id: "corte_canto", label: "Corte + canteado", precio: 8 },
            ],
          },
          {
            id: "canto",
            tipo: "select",
            label: "Tipo de canto",
            opciones: [
              { id: "pvc_0. 4", label: "PVC 0.4mm (económico)" },
              { id: "pvc_1", label: "PVC 1mm (estándar)", precio: 3 },
              { id: "pvc_2", label: "PVC 2mm (premium)", precio: 5 },
              { id: "abs", label: "ABS 1mm (alta resistencia)", precio: 6 },
            ],
          },
          {
            id: "num_cortes",
            tipo: "number",
            label: "Número aproximado de cortes",
            min: 1,
            max: 500,
            requerido: true,
          },
          {
            id: "optimizacion",
            tipo: "toggle",
            label: "Incluir plano de optimización",
            descripcion: "Te enviamos el plano de corte optimizado",
            precioExtra: 150,
          },
        ],
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // PROYECTOS
    // ═══════════════════════════════════════════════════════════════════
    
    export const proyectos: Proyecto[] = [
      {
        id: "proy-001",
        nombre: "Muebles para oficina corporativa",
        descripcion: "Escritorios ejecutivos, libreros y mesa de juntas para nueva oficina",
        estado: "activo",
        fechaCreacion: "2025-11-20",
        fechaActualizacion: "2025-11-26",
        fechaEstimadaFin: "2025-12-15",
        progreso: 40,
        totalEstimado: 58500,
        gastado: 23400,
        cliente: "Despacho Jurídico Martínez & Asociados",
        etiquetas: ["oficina", "corporativo", "ejecutivo"],
        prioridad: "alta",
        notas: "Cliente requiere acabados de alta calidad.  Entrega antes de fin de año.",
        nodos: [
          {
            id: "nodo-001",
            tipo: "producto",
            categoria: "Madera",
            titulo: "Tablones de Encino",
            icono: "🪵",
            estado: "completado",
            proveedor: {
              id: "prov-001",
              nombre: "Maderas del Norte",
              iniciales: "MN",
              rating: 4.8,
              verificado: true,
              imagen: imagenes.proveedores.portadas[0],
            },
            producto: {
              id: "prod-001",
              nombre: "Tablón de Encino Primera",
              precio: 570,
              cantidad: 25,
              unidad: "pieza",
              personalizacion: {
                tipo: "encino",
                grosor: "1.5in",
                largo: "2.44m",
                acabado: "cepillado",
              },
              notas: "Seleccionar piezas con veta similar para uniformidad.",
              imagen: imagenes.productos.madera[0],
            },
            posicion: { x: 100, y: 200 },
            fechaEstimada: "24 Nov",
            fechaCompletado: "23 Nov",
            mensajesNoLeidos: 0,
            subtotal: 14250,
          },
          {
            id: "nodo-002",
            tipo: "servicio",
            categoria: "Maquinado",
            titulo: "Corte CNC piezas",
            icono: "⚙️",
            estado: "en_progreso",
            proveedor: {
              id: "prov-002",
              nombre: "Cortes Precisión CNC",
              iniciales: "CP",
              rating: 4.9,
              verificado: true,
              imagen: imagenes.proveedores.portadas[1],
            },
            servicio: {
              id: "serv-001",
              nombre: "Corte CNC Profesional",
              precio: 4800,
              personalizacion: {
                material: "madera",
                complejidad: "complejo",
              },
              notas: "Adjunto archivo DXF con diseños de escritorios y librero.",
            },
            posicion: { x: 350, y: 120 },
            fechaEstimada: "28 Nov",
            mensajesNoLeidos: 2,
            subtotal: 4800,
          },
          {
            id: "nodo-003",
            tipo: "producto",
            categoria: "Tableros",
            titulo: "MDF para interiores",
            icono: "📋",
            estado: "confirmado",
            proveedor: {
              id: "prov-007",
              nombre: "Tableros y Aglomerados GDL",
              iniciales: "TA",
              rating: 4.9,
              verificado: true,
            },
            producto: {
              id: "prod-002",
              nombre: "MDF 15mm",
              precio: 380,
              cantidad: 8,
              unidad: "hoja",
              personalizacion: {
                espesor: "15mm",
                medida: "completa",
              },
              notas: "",
            },
            posicion: { x: 350, y: 280 },
            fechaEstimada: "26 Nov",
            mensajesNoLeidos: 0,
            subtotal: 3040,
          },
          {
            id: "nodo-004",
            tipo: "producto",
            categoria: "Herrajes",
            titulo: "Herrajes y correderas",
            icono: "🔩",
            estado: "confirmado",
            proveedor: {
              id: "prov-008",
              nombre: "Herrajes Europeos MX",
              iniciales: "HE",
              rating: 4.8,
              verificado: true,
            },
            producto: {
              id: "prod-005",
              nombre: "Correderas Blum",
              precio: 890,
              cantidad: 12,
              unidad: "juego",
              personalizacion: {},
              notas: "8 juegos 550mm para cajones, 4 juegos 400mm para archiveros",
            },
            posicion: { x: 100, y: 350 },
            fechaEstimada: "27 Nov",
            mensajesNoLeidos: 0,
            subtotal: 10680,
          },
          {
            id: "nodo-005",
            tipo: "servicio",
            categoria: "Acabados",
            titulo: "Barnizado premium",
            icono: "🎨",
            estado: "pendiente",
            posicion: { x: 600, y: 150 },
            mensajesNoLeidos: 0,
            subtotal: 0,
          },
          {
            id: "nodo-006",
            tipo: "servicio",
            categoria: "Mano de obra",
            titulo: "Armado y ensamble",
            icono: "🔧",
            estado: "esperando",
            posicion: { x: 600, y: 280 },
            mensajesNoLeidos: 0,
            subtotal: 0,
          },
          {
            id: "nodo-007",
            tipo: "servicio",
            categoria: "Mano de obra",
            titulo: "Instalación en sitio",
            icono: "👷",
            estado: "esperando",
            posicion: { x: 850, y: 200 },
            mensajesNoLeidos: 0,
            subtotal: 0,
          },
          {
            id: "nodo-008",
            tipo: "servicio",
            categoria: "Transporte",
            titulo: "Entrega e instalación",
            icono: "🚚",
            estado: "esperando",
            posicion: { x: 1050, y: 200 },
            mensajesNoLeidos: 0,
            subtotal: 0,
          },
        ],
        conexiones: [
          { id: "con-001", desde: "nodo-001", hacia: "nodo-002", tipo: "secuencial" },
          { id: "con-002", desde: "nodo-001", hacia: "nodo-003", tipo: "paralelo" },
          { id: "con-003", desde: "nodo-002", hacia: "nodo-005", tipo: "secuencial" },
          { id: "con-004", desde: "nodo-003", hacia: "nodo-006", tipo: "secuencial" },
          { id: "con-005", desde: "nodo-004", hacia: "nodo-006", tipo: "paralelo" },
          { id: "con-006", desde: "nodo-005", hacia: "nodo-007", tipo: "secuencial" },
          { id: "con-007", desde: "nodo-006", hacia: "nodo-007", tipo: "secuencial" },
          { id: "con-008", desde: "nodo-007", hacia: "nodo-008", tipo: "secuencial" },
        ],
      },
      {
        id: "proy-002",
        nombre: "Closet vestidor completo",
        descripcion: "Closet de piso a techo con isla central para recámara principal",
        estado: "activo",
        fechaCreacion: "2025-11-15",
        fechaActualizacion: "2025-11-25",
        fechaEstimadaFin: "2025-12-05",
        progreso: 65,
        totalEstimado: 42500,
        gastado: 27625,
        cliente: "Residencial Puerta de Hierro #145",
        etiquetas: ["closet", "residencial", "premium"],
        prioridad: "media",
        notas: "Casa habitación de lujo.  Acabado en laca blanca mate.",
        nodos: [
          {
            id: "nodo-101",
            tipo: "producto",
            categoria: "Tableros",
            titulo: "Melamina blanca",
            icono: "📋",
            estado: "completado",
            proveedor: {
              id: "prov-007",
              nombre: "Tableros y Aglomerados GDL",
              iniciales: "TA",
              rating: 4.9,
              verificado: true,
            },
            producto: {
              id: "prod-004",
              nombre: "Melamina Blanca 18mm",
              precio: 520,
              cantidad: 18,
              unidad: "hoja",
              personalizacion: {
                color: "blanco",
                espesor: "18mm",
              },
              notas: "",
            },
            posicion: { x: 100, y: 200 },
            fechaEstimada: "18 Nov",
            fechaCompletado: "17 Nov",
            mensajesNoLeidos: 0,
            subtotal: 9360,
          },
          {
            id: "nodo-102",
            tipo: "servicio",
            categoria: "Maquinado",
            titulo: "Corte y canteado",
            icono: "⚙️",
            estado: "completado",
            proveedor: {
              id: "prov-007",
              nombre: "Tableros y Aglomerados GDL",
              iniciales: "TA",
              rating: 4.9,
              verificado: true,
            },
            servicio: {
              id: "serv-006",
              nombre: "Corte y Canteado",
              precio: 3200,
              personalizacion: {
                tipo_corte: "corte_canto",
                canto: "pvc_2",
                num_cortes: 145,
              },
              notas: "Optimizar para mínimo desperdicio",
            },
            posicion: { x: 350, y: 200 },
            fechaEstimada: "20 Nov",
            fechaCompletado: "20 Nov",
            mensajesNoLeidos: 0,
            subtotal: 3200,
          },
          {
            id: "nodo-103",
            tipo: "producto",
            categoria: "Herrajes",
            titulo: "Herrajes Blum",
            icono: "🔩",
            estado: "completado",
            proveedor: {
              id: "prov-008",
              nombre: "Herrajes Europeos MX",
              iniciales: "HE",
              rating: 4.8,
              verificado: true,
            },
            producto: {
              id: "prod-005",
              nombre: "Kit completo herrajes",
              precio: 8500,
              cantidad: 1,
              unidad: "kit",
              personalizacion: {},
              notas: "Incluye correderas, bisagras, tubos LED y accesorios",
            },
            posicion: { x: 100, y: 350 },
            fechaEstimada: "19 Nov",
            fechaCompletado: "19 Nov",
            mensajesNoLeidos: 0,
            subtotal: 8500,
          },
          {
            id: "nodo-104",
            tipo: "servicio",
            categoria: "Mano de obra",
            titulo: "Instalación completa",
            icono: "👷",
            estado: "en_progreso",
            proveedor: {
              id: "prov-004",
              nombre: "Carpinteros Asociados JAL",
              iniciales: "CA",
              rating: 4.6,
              verificado: false,
            },
            servicio: {
              id: "serv-003",
              nombre: "Instalación de Muebles",
              precio: 6500,
              personalizacion: {
                tipo_trabajo: "completo",
                complejidad: "complejo",
                ayudante: true,
              },
              notas: "Instalación de 3 días. Incluye iluminación LED.",
            },
            posicion: { x: 600, y: 275 },
            fechaEstimada: "28 Nov",
            mensajesNoLeidos: 1,
            subtotal: 6565,
          },
        ],
        conexiones: [
          { id: "con-101", desde: "nodo-101", hacia: "nodo-102", tipo: "secuencial" },
          { id: "con-102", desde: "nodo-102", hacia: "nodo-104", tipo: "secuencial" },
          { id: "con-103", desde: "nodo-103", hacia: "nodo-104", tipo: "paralelo" },
        ],
      },
      {
        id: "proy-003",
        nombre: "Cocina integral moderna",
        descripcion: "Cocina completa con isla, despensa y barra desayunador",
        estado: "borrador",
        fechaCreacion: "2025-11-25",
        fechaActualizacion: "2025-11-26",
        progreso: 0,
        totalEstimado: 125000,
        gastado: 0,
        etiquetas: ["cocina", "residencial", "moderno"],
        prioridad: "baja",
        notas: "Proyecto en cotización. Cliente solicitó render antes de aprobar.",
        nodos: [],
        conexiones: [],
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // PLANTILLAS
    // ═══════════════════════════════════════════════════════════════════
    
    export const plantillas: Plantilla[] = [
      {
        id: "plant-001",
        nombre: "Proyecto carpintería completo",
        descripcion: "Flujo completo: Material → Corte → Acabado → Instalación → Entrega",
        icono: "🪵",
        categoria: "Carpintería",
        popular: true,
        usos: 1250,
        tiempoEstimado: "2-3 semanas",
        presupuestoEstimado: { min: 15000, max: 80000 },
        nodos: [
          { tipo: "producto", categoria: "Madera", titulo: "Material principal", icono: "🪵", posicion: { x: 100, y: 200 } },
          { tipo: "producto", categoria: "Ferretería", titulo: "Herrajes", icono: "🔩", posicion: { x: 100, y: 350 } },
          { tipo: "servicio", categoria: "Maquinado", titulo: "Corte/Maquinado", icono: "⚙️", posicion: { x: 350, y: 200 } },
          { tipo: "servicio", categoria: "Acabados", titulo: "Acabado", icono: "🎨", posicion: { x: 600, y: 200 } },
          { tipo: "servicio", categoria: "Mano de obra", titulo: "Instalación", icono: "👷", posicion: { x: 850, y: 200 } },
          { tipo: "servicio", categoria: "Transporte", titulo: "Entrega", icono: "🚚", posicion: { x: 1050, y: 200 } },
        ],
        conexiones: [
          { desde: "0", hacia: "2", tipo: "secuencial" },
          { desde: "1", hacia: "4", tipo: "paralelo" },
          { desde: "2", hacia: "3", tipo: "secuencial" },
          { desde: "3", hacia: "4", tipo: "secuencial" },
          { desde: "4", hacia: "5", tipo: "secuencial" },
        ],
      },
      {
        id: "plant-002",
        nombre: "Compra con entrega",
        descripcion: "Producto + Transporte a domicilio",
        icono: "🚚",
        categoria: "General",
        popular: true,
        usos: 3420,
        tiempoEstimado: "1-3 días",
        presupuestoEstimado: { min: 1000, max: 20000 },
        nodos: [
          { tipo: "producto", categoria: "General", titulo: "Producto", icono: "📦", posicion: { x: 200, y: 200 } },
          { tipo: "servicio", categoria: "Transporte", titulo: "Entrega", icono: "🚚", posicion: { x: 500, y: 200 } },
        ],
        conexiones: [
          { desde: "0", hacia: "1", tipo: "secuencial" },
        ],
      },
      {
        id: "plant-003",
        nombre: "Closet o vestidor",
        descripcion: "Tableros + Corte + Herrajes + Instalación",
        icono: "👔",
        categoria: "Carpintería",
        popular: true,
        usos: 890,
        tiempoEstimado: "1-2 semanas",
        presupuestoEstimado: { min: 25000, max: 120000 },
        nodos: [
          { tipo: "producto", categoria: "Tableros", titulo: "Melamina/MDF", icono: "📋", posicion: { x: 100, y: 200 } },
          { tipo: "servicio", categoria: "Maquinado", titulo: "Corte y canteado", icono: "⚙️", posicion: { x: 350, y: 200 } },
          { tipo: "producto", categoria: "Herrajes", titulo: "Herrajes", icono: "🔩", posicion: { x: 350, y: 350 } },
          { tipo: "servicio", categoria: "Mano de obra", titulo: "Instalación", icono: "👷", posicion: { x: 600, y: 275 } },
        ],
        conexiones: [
          { desde: "0", hacia: "1", tipo: "secuencial" },
          { desde: "1", hacia: "3", tipo: "secuencial" },
          { desde: "2", hacia: "3", tipo: "paralelo" },
        ],
      },
      {
        id: "plant-004",
        nombre: "Mueble con acabado especial",
        descripcion: "Madera + Corte + Acabado artístico",
        icono: "🎨",
        categoria: "Carpintería",
        popular: false,
        usos: 234,
        tiempoEstimado: "2-4 semanas",
        presupuestoEstimado: { min: 8000, max: 50000 },
        nodos: [
          { tipo: "producto", categoria: "Madera", titulo: "Madera sólida", icono: "🪵", posicion: { x: 100, y: 200 } },
          { tipo: "servicio", categoria: "Maquinado", titulo: "Corte CNC", icono: "⚙️", posicion: { x: 350, y: 200 } },
          { tipo: "servicio", categoria: "Acabados", titulo: "Acabado especial", icono: "🎨", posicion: { x: 600, y: 200 } },
        ],
        conexiones: [
          { desde: "0", hacia: "1", tipo: "secuencial" },
          { desde: "1", hacia: "2", tipo: "secuencial" },
        ],
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // OFERTAS
    // ═══════════════════════════════════════════════════════════════════
    
    export const ofertas: Oferta[] = [
      {
        id: "oferta-001",
        proveedorId: "prov-001",
        proveedorNombre: "Maderas del Norte",
        proveedorImagen: imagenes.proveedores.portadas[0],
        producto: "Tablón de Pino Primera",
        descripcion: "Liquidación de inventario de temporada.  Madera de primera calidad.",
        precioOriginal: 450,
        precioOferta: 380,
        descuento: 15,
        unidad: "pieza",
        minCompra: 10,
        validoHasta: "2025-11-30",
        categoria: "Madera",
        imagen: imagenes.productos.madera[0],
        cantidadDisponible: 150,
        vendidos: 67,
        destacada: true,
      },
      {
        id: "oferta-002",
        proveedorId: "prov-002",
        proveedorNombre: "Cortes Precisión CNC",
        proveedorImagen: imagenes.proveedores.portadas[1],
        producto: "Corte CNC - Primera vez",
        descripcion: "¡Prueba nuestro servicio!  Descuento especial para nuevos clientes.",
        precioOriginal: 150,
        precioOferta: 100,
        descuento: 33,
        unidad: "hora",
        minCompra: 2,
        validoHasta: "2025-12-15",
        categoria: "Servicio",
        imagen: imagenes.servicios.manufactura[0],
        cantidadDisponible: 50,
        vendidos: 23,
        destacada: true,
      },
      {
        id: "oferta-003",
        proveedorId: "prov-003",
        proveedorNombre: "Transportes Rápidos GDL",
        proveedorImagen: imagenes.servicios.transporte[0],
        producto: "Flete local ZMG",
        descripcion: "Promoción de fin de mes. Aprovecha fletes a precio especial.",
        precioOriginal: 350,
        precioOferta: 280,
        descuento: 20,
        unidad: "viaje",
        minCompra: 1,
        validoHasta: "2025-11-30",
        categoria: "Transporte",
        imagen: imagenes.servicios.transporte[0],
        cantidadDisponible: 100,
        vendidos: 45,
        destacada: false,
      },
      {
        id: "oferta-004",
        proveedorId: "prov-007",
        proveedorNombre: "Tableros y Aglomerados GDL",
        proveedorImagen: imagenes.productos.madera[2],
        producto: "Melamina Blanca 18mm",
        descripcion: "Precio especial por volumen. Mínimo 10 hojas.",
        precioOriginal: 520,
        precioOferta: 450,
        descuento: 13,
        unidad: "hoja",
        minCompra: 10,
        validoHasta: "2025-12-10",
        categoria: "Tableros",
        imagen: imagenes.productos.madera[2],
        cantidadDisponible: 200,
        vendidos: 89,
        destacada: true,
      },
      {
        id: "oferta-005",
        proveedorId: "prov-008",
        proveedorNombre: "Herrajes Europeos MX",
        proveedorImagen: imagenes.productos.ferreteria[1],
        producto: "Correderas Blum Tandem",
        descripcion: "Promoción Blum. Hasta 25% en correderas seleccionadas.",
        precioOriginal: 890,
        precioOferta: 670,
        descuento: 25,
        unidad: "juego",
        minCompra: 4,
        validoHasta: "2025-12-20",
        categoria: "Herrajes",
        imagen: imagenes.productos.ferreteria[1],
        cantidadDisponible: 80,
        vendidos: 34,
        destacada: true,
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // RESEÑAS
    // ═══════════════════════════════════════════════════════════════════
    
    export const resenias: Resenia[] = [
      {
        id: "res-001",
        proveedorId: "prov-001",
        usuarioNombre: "Roberto García",
        usuarioAvatar: imagenes.avatares[0],
        rating: 5,
        comentario: "Excelente calidad de madera. Muy bien secada y sin defectos.  El servicio de corte a medida me ahorró mucho tiempo.  100% recomendado.",
        fecha: "2025-11-20",
        proyectoTipo: "Muebles de oficina",
        verificada: true,
        imagenes: [imagenes.productos.madera[0]],
        respuestaProveedor: "¡Gracias Roberto! Fue un gusto atenderte. Esperamos verte pronto.",
        util: 24,
      },
      {
        id: "res-002",
        proveedorId: "prov-001",
        usuarioNombre: "Ana Martínez",
        usuarioAvatar: imagenes.avatares[1],
        rating: 4,
        comentario: "Buena madera, aunque tardó un poco más de lo esperado en llegar. El producto cumple con lo prometido.",
        fecha: "2025-11-15",
        proyectoTipo: "Closet",
        verificada: true,
        util: 12,
      },
      {
        id: "res-003",
        proveedorId: "prov-002",
        usuarioNombre: "Miguel Hernández",
        usuarioAvatar: imagenes.avatares[2],
        rating: 5,
        comentario: "Precisión impecable en los cortes. Entregaron antes de tiempo y el empaque fue muy cuidadoso. Los mejores en CNC de la zona.",
        fecha: "2025-11-18",
        proyectoTipo: "Señalética",
        verificada: true,
        imagenes: [imagenes.servicios.manufactura[0]],
        util: 31,
      },
      {
        id: "res-004",
        proveedorId: "prov-003",
        usuarioNombre: "Laura Sánchez",
        usuarioAvatar: imagenes.avatares[3],
        rating: 5,
        comentario: "Muy puntuales y cuidadosos con la carga. El chofer muy amable y profesional. Ya los he usado 5 veces.",
        fecha: "2025-11-22",
        proyectoTipo: "Mudanza de taller",
        verificada: true,
        util: 18,
      },
      {
        id: "res-005",
        proveedorId: "prov-004",
        usuarioNombre: "Fernando López",
        usuarioAvatar: imagenes.avatares[4],
        rating: 4,
        comentario: "Buen trabajo de instalación.  Tuvieron que hacer algunos ajustes pero quedó bien al final.",
        fecha: "2025-11-10",
        proyectoTipo: "Cocina integral",
        verificada: true,
        respuestaProveedor: "Gracias por la retroalimentación Fernando. Trabajamos en mejorar cada día.",
        util: 8,
      },
      {
        id: "res-006",
        proveedorId: "prov-007",
        usuarioNombre: "Patricia Ruiz",
        usuarioAvatar: imagenes.avatares[5],
        rating: 5,
        comentario: "El mejor servicio de corte y canteado de Guadalajara. Rapidísimos y con excelente precisión.  Sus cantos quedan perfectos.",
        fecha: "2025-11-19",
        proyectoTipo: "Closet vestidor",
        verificada: true,
        util: 27,
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // MENSAJES
    // ═══════════════════════════════════════════════════════════════════
    
    export const mensajes: Mensaje[] = [
      {
        id: "msg-001",
        proyectoId: "proy-001",
        nodoId: "nodo-002",
        proveedorId: "prov-002",
        tipo: "proveedor",
        contenido: "¡Hola Carlos! Ya recibí los archivos del corte. Tengo una pregunta: ¿las medidas están en milímetros o pulgadas?  También noté que algunas piezas tienen radios muy pequeños, ¿es intencional?",
        fecha: "2025-11-26T09:30:00",
        leido: false,
      },
      {
        id: "msg-002",
        proyectoId: "proy-001",
        nodoId: "nodo-002",
        proveedorId: "prov-002",
        tipo: "usuario",
        contenido: "Hola!  Las medidas están en milímetros. Sí, los radios pequeños son intencionales, son para los ensambles de las piezas.  ¿Algún problema con eso?",
        fecha: "2025-11-26T09:45:00",
        leido: true,
      },
      {
        id: "msg-003",
        proyectoId: "proy-001",
        nodoId: "nodo-002",
        proveedorId: "prov-002",
        tipo: "proveedor",
        contenido: "Perfecto, todo claro. Los radios pequeños no son problema, nuestra máquina maneja hasta 3mm. Empiezo mañana temprano y te envío fotos del avance.  Por cierto, puedo adelantar la entrega un día si te sirve.",
        fecha: "2025-11-26T10:00:00",
        leido: false,
        propuesta: {
          tipo: "cambio_fecha",
          descripcion: "El proveedor propone adelantar la entrega",
          valorOriginal: "28 Nov 2025",
          valorNuevo: "27 Nov 2025",
          estado: "pendiente",
        },
      },
      {
        id: "msg-004",
        proyectoId: "proy-001",
        nodoId: "nodo-002",
        proveedorId: "prov-002",
        tipo: "sistema",
        contenido: "📎 Cortes Precisión CNC adjuntó un archivo",
        adjuntos: [
          { tipo: "documento", url: "#", nombre: "cotizacion_actualizada.pdf", tamaño: "245 KB" },
        ],
        fecha: "2025-11-26T10:05:00",
        leido: false,
      },
      {
        id: "msg-005",
        proyectoId: "proy-002",
        nodoId: "nodo-104",
        proveedorId: "prov-004",
        tipo: "proveedor",
        contenido: "Buenos días! Ya vamos en 60% del avance del closet. Mañana terminamos la instalación de las puertas corredizas. Te mando fotos del progreso.",
        adjuntos: [
          { tipo: "imagen", url: imagenes.servicios.instalacion[0], nombre: "avance_closet_1.jpg" },
          { tipo: "imagen", url: imagenes.servicios.instalacion[1], nombre: "avance_closet_2.jpg" },
        ],
        fecha: "2025-11-25T18:00:00",
        leido: false,
      },
      {
        id: "msg-006",
        proyectoId: "proy-002",
        nodoId: "nodo-104",
        proveedorId: "prov-004",
        tipo: "usuario",
        contenido: "¡Se ve increíble! ¿A qué hora calculan terminar mañana?  Para estar presente en la entrega.",
        fecha: "2025-11-25T18:30:00",
        leido: true,
      },
      {
        id: "msg-007",
        proyectoId: "proy-002",
        nodoId: "nodo-104",
        proveedorId: "prov-004",
        tipo: "proveedor",
        contenido: "Calculamos terminar entre 4 y 5 de la tarde. Te aviso cuando estemos en los detalles finales para que vengas a revisar antes de firmar la entrega.",
        fecha: "2025-11-25T18:45:00",
        leido: true,
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // NOTIFICACIONES
    // ═══════════════════════════════════════════════════════════════════
    
    export const notificaciones: Notificacion[] = [
      {
        id: "notif-001",
        tipo: "mensaje",
        titulo: "Nuevo mensaje de Cortes Precisión CNC",
        descripcion: "Te envió una propuesta para adelantar la entrega",
        fecha: "2025-11-26T10:00:00",
        leida: false,
        accion: { label: "Ver mensaje", ruta: "/proyecto/proy-001/nodo/nodo-002/chat" },
        icono: "💬",
        prioridad: "alta",
      },
      {
        id: "notif-002",
        tipo: "proyecto",
        titulo: "Nodo completado",
        descripcion: "Tablones de Encino fue marcado como completado en 'Muebles para oficina'",
        fecha: "2025-11-23T14:30:00",
        leida: false,
        accion: { label: "Ver proyecto", ruta: "/proyecto/proy-001" },
        icono: "✅",
        prioridad: "normal",
      },
      {
        id: "notif-003",
        tipo: "oferta",
        titulo: "Nueva oferta de tu proveedor favorito",
        descripcion: "Maderas del Norte tiene 15% de descuento en tablones de pino",
        fecha: "2025-11-22T09:00:00",
        leida: true,
        accion: { label: "Ver oferta", ruta: "/explorar? tab=ofertas" },
        icono: "🏷️",
        prioridad: "normal",
      },
      {
        id: "notif-004",
        tipo: "sistema",
        titulo: "Nuevo proveedor en tu zona",
        descripcion: "Herrajes Europeos MX se unió a la red.  Especializados en herrajes premium.",
        fecha: "2025-11-21T11:00:00",
        leida: true,
        accion: { label: "Ver perfil", ruta: "/proveedor/prov-008" },
        icono: "🆕",
        prioridad: "baja",
      },
      {
        id: "notif-005",
        tipo: "alerta",
        titulo: "Acción requerida",
        descripcion: "El proveedor Carpinteros Asociados espera confirmación de fecha",
        fecha: "2025-11-25T16:00:00",
        leida: false,
        accion: { label: "Responder", ruta: "/proyecto/proy-002/nodo/nodo-104/chat" },
        icono: "⚠️",
        prioridad: "alta",
      },
      {
        id: "notif-006",
        tipo: "promocion",
        titulo: "¡Black Friday en Orquesta! ",
        descripcion: "Hasta 30% de descuento con proveedores seleccionados.  Solo hoy.",
        fecha: "2025-11-26T00:00:00",
        leida: false,
        accion: { label: "Ver ofertas", ruta: "/explorar?tab=ofertas" },
        icono: "🎉",
        prioridad: "normal",
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // CONVERSACIONES (para vista de mensajes)
    // ═══════════════════════════════════════════════════════════════════
    
    export interface Conversacion {
      id: string;
      proveedorId: string;
      proveedorNombre: string;
      proveedorIniciales: string;
      proveedorImagen?: string;
      proyectoId: string;
      proyectoNombre: string;
      nodoId: string;
      nodoTitulo: string;
      ultimoMensaje: string;
      ultimoMensajeFecha: string;
      noLeidos: number;
      estado: "activa" | "archivada" | "cerrada";
    }
    
    export const conversaciones: Conversacion[] = [
      {
        id: "conv-001",
        proveedorId: "prov-002",
        proveedorNombre: "Cortes Precisión CNC",
        proveedorIniciales: "CP",
        proveedorImagen: imagenes.proveedores.portadas[1],
        proyectoId: "proy-001",
        proyectoNombre: "Muebles para oficina",
        nodoId: "nodo-002",
        nodoTitulo: "Corte CNC piezas",
        ultimoMensaje: "Perfecto, todo claro. Los radios pequeños no son problema.. .",
        ultimoMensajeFecha: "2025-11-26T10:00:00",
        noLeidos: 2,
        estado: "activa",
      },
      {
        id: "conv-002",
        proveedorId: "prov-004",
        proveedorNombre: "Carpinteros Asociados JAL",
        proveedorIniciales: "CA",
        proveedorImagen: imagenes. servicios.instalacion[0],
        proyectoId: "proy-002",
        proyectoNombre: "Closet vestidor",
        nodoId: "nodo-104",
        nodoTitulo: "Instalación completa",
        ultimoMensaje: "Calculamos terminar entre 4 y 5 de la tarde...",
        ultimoMensajeFecha: "2025-11-25T18:45:00",
        noLeidos: 0,
        estado: "activa",
      },
      {
        id: "conv-003",
        proveedorId: "prov-001",
        proveedorNombre: "Maderas del Norte",
        proveedorIniciales: "MN",
        proveedorImagen: imagenes. proveedores.portadas[0],
        proyectoId: "proy-001",
        proyectoNombre: "Muebles para oficina",
        nodoId: "nodo-001",
        nodoTitulo: "Tablones de Encino",
        ultimoMensaje: "Listo Carlos, tu pedido ya está en camino.  Te llega mañana.",
        ultimoMensajeFecha: "2025-11-22T16:30:00",
        noLeidos: 0,
        estado: "activa",
      },
      {
        id: "conv-004",
        proveedorId: "prov-007",
        proveedorNombre: "Tableros y Aglomerados GDL",
        proveedorIniciales: "TA",
        proveedorImagen: imagenes.productos.madera[2],
        proyectoId: "proy-002",
        proyectoNombre: "Closet vestidor",
        nodoId: "nodo-102",
        nodoTitulo: "Corte y canteado",
        ultimoMensaje: "Tus piezas están listas para recoger. Horario: 8am a 5pm.",
        ultimoMensajeFecha: "2025-11-20T09:15:00",
        noLeidos: 0,
        estado: "activa",
      },
    ];
    
    // ═══════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════
    
    export const getNodosPendientes = (proyecto: Proyecto) =>
      proyecto.nodos.filter((n) => n.estado === "pendiente" || n.estado === "buscando");
    
    export const getNodosActivos = (proyecto: Proyecto) =>
      proyecto.nodos. filter((n) => n.estado === "confirmado" || n.estado === "en_progreso");
    
    export const getNodosCompletados = (proyecto: Proyecto) =>
      proyecto.nodos.filter((n) => n. estado === "completado");
    
    export const getMensajesNoLeidos = () =>
      mensajes.filter((m) => ! m.leido). length;
    
    export const getNotificacionesNoLeidas = () =>
      notificaciones.filter((n) => !n.leida).length;
    
    export const getProyectosActivos = () =>
      proyectos.filter((p) => p.estado === "activo");
    
    export const getProveedoresPorCategoria = (categoria: string) =>
      proveedores.filter((p) => p.categorias.some((c) => c.toLowerCase(). includes(categoria.toLowerCase())));
    
    export const getProductosPorProveedor = (proveedorId: string) =>
      productos.filter((p) => p.proveedorId === proveedorId);
    
    export const getServiciosPorProveedor = (proveedorId: string) =>
      servicios.filter((s) => s.proveedorId === proveedorId);
    
    export const getReseniasPorProveedor = (proveedorId: string) =>
      resenias.filter((r) => r.proveedorId === proveedorId);
    
    export const getOfertasPorCategoria = (categoria: string) =>
      ofertas.filter((o) => o.categoria.toLowerCase() === categoria.toLowerCase());
    
    export const getOfertasDestacadas = () =>
      ofertas.filter((o) => o.destacada);
    
    export const getConversacionesPorProyecto = (proyectoId: string) =>
      conversaciones. filter((c) => c.proyectoId === proyectoId);
    
    export const getMensajesPorConversacion = (proyectoId: string, nodoId: string) =>
      mensajes.filter((m) => m.proyectoId === proyectoId && m.nodoId === nodoId);
    
    export const getProveedorById = (id: string) =>
      proveedores.find((p) => p.id === id);
    
    export const getProductoById = (id: string) =>
      productos.find((p) => p.id === id);
    
    export const getServicioById = (id: string) =>
      servicios.find((s) => s.id === id);
    
    export const getProyectoById = (id: string) =>
      proyectos.find((p) => p. id === id);
    
    // Estadísticas del usuario
    export const getEstadisticasUsuario = () => ({
      proyectosActivos: proyectos.filter((p) => p.estado === "activo"). length,
      proyectosCompletados: usuarioActual.proyectosCompletados,
      gastoTotal: usuarioActual. gastoTotal,
      proveedoresFavoritos: 12,
      mensajesSinLeer: getMensajesNoLeidos(),
      notificacionesSinLeer: getNotificacionesNoLeidas(),
    });
    
    // Estadísticas de la plataforma (para mostrar en UI)
    export const getEstadisticasPlataforma = () => ({
      totalProveedores: proveedores.length,
      totalProductos: productos.length,
      totalServicios: servicios.length,
      proveedoresVerificados: proveedores.filter((p) => p.verificado).length,
      ofertasActivas: ofertas.length,
      satisfaccionPromedio: 4.7,
    });