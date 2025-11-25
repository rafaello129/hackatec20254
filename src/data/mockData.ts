// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA - Todos los datos fake para el hackathon
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// USUARIO ACTUAL (la empresa logueada)
// ─────────────────────────────────────────────────────────────────────────────
export const usuarioActual = {
    id: "usr-001",
    nombre: "Distribuidora Alimentos GDL",
    tipo: "comprador", // comprador | vendedor | ambos
    avatar: "https://i.pravatar.cc/80?img=12",
    ubicacion: "Guadalajara, Jalisco",
    verificado: true,
    rating: 4.7,
    transacciones: 156,
    miembrosDesde: "2021",
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  // EMPRESAS
  // ─────────────────────────────────────────────────────────────────────────────
  export type TipoEmpresa = "proveedor" | "transportista" | "servicios" | "comprador";
  
  export interface Empresa {
    id: string;
    nombre: string;
    iniciales: string;
    tipo: TipoEmpresa;
    categorias: string[];
    ubicacion: string;
    verificado: boolean;
    rating: number;
    numResenias: number;
    transacciones: number;
    descripcion: string;
    matchScore: number;
    // Scorecard
    scorecard: {
      confiabilidad: number;
      entregas: number;
      calidad: number;
      precios: number;
    };
    // Extras para transportistas
    esTransportista?: boolean;
    tipoTransporte?: string[];
    flota?: number;
    cobertura?: string;
    certificaciones: string[];
    destacado?: boolean;
  }
  
  export const empresas: Empresa[] = [
    {
      id: "emp-001",
      nombre: "Materiales del Norte S.A.",
      iniciales: "MN",
      tipo: "proveedor",
      categorias: ["Cemento", "Agregados", "Blocks", "Morteros"],
      ubicacion: "Monterrey, Nuevo León",
      verificado: true,
      rating: 4.8,
      numResenias: 234,
      transacciones: 890,
      descripcion: "Distribuidores mayoristas de materiales para construcción con más de 25 años de experiencia en el noreste de México.",
      matchScore: 92,
      scorecard: {
        confiabilidad: 85,
        entregas: 78,
        calidad: 92,
        precios: 75,
      },
      certificaciones: ["ISO 9001", "NMX-C-414"],
      destacado: true,
    },
    {
      id: "emp-002",
      nombre: "TransFrío MX",
      iniciales: "TF",
      tipo: "transportista",
      categorias: ["Transporte Refrigerado"],
      ubicacion: "Guadalajara, Jalisco",
      verificado: true,
      rating: 4.9,
      numResenias: 156,
      transacciones: 1234,
      descripcion: "Especialistas en transporte refrigerado para perecederos, farmacéuticos y productos sensibles a temperatura.",
      matchScore: 94,
      scorecard: {
        confiabilidad: 98,
        entregas: 96,
        calidad: 99,
        precios: 82,
      },
      esTransportista: true,
      tipoTransporte: ["Refrigerado", "Perecederos", "Farmacéutico"],
      flota: 45,
      cobertura: "Nacional",
      certificaciones: ["ISO 9001", "HACCP", "GDP"],
      destacado: true,
    },
    {
      id: "emp-003",
      nombre: "Agrícola del Valle S.A.",
      iniciales: "AV",
      tipo: "proveedor",
      categorias: ["Tomate", "Chile", "Hortalizas", "Perecederos"],
      ubicacion: "Culiacán, Sinaloa",
      verificado: true,
      rating: 4.6,
      numResenias: 89,
      transacciones: 456,
      descripcion: "Productores y distribuidores de hortalizas frescas con envíos a todo México.",
      matchScore: 88,
      scorecard: {
        confiabilidad: 90,
        entregas: 85,
        calidad: 94,
        precios: 80,
      },
      certificaciones: ["SENASICA", "Global GAP"],
    },
    {
      id: "emp-004",
      nombre: "Aceros y Metales SA",
      iniciales: "AM",
      tipo: "proveedor",
      categorias: ["Acero", "Varilla", "Perfiles", "Láminas"],
      ubicacion: "Monterrey, Nuevo León",
      verificado: true,
      rating: 4.5,
      numResenias: 178,
      transacciones: 567,
      descripcion: "Distribución de productos de acero y metales para construcción e industria.",
      matchScore: 87,
      scorecard: {
        confiabilidad: 88,
        entregas: 82,
        calidad: 90,
        precios: 78,
      },
      certificaciones: ["ISO 9001"],
    },
    {
      id: "emp-005",
      nombre: "Logística Industrial del Norte",
      iniciales: "LN",
      tipo: "transportista",
      categorias: ["Carga General", "Maquinaria"],
      ubicacion: "Monterrey, Nuevo León",
      verificado: true,
      rating: 4.7,
      numResenias: 234,
      transacciones: 890,
      descripcion: "Transporte de carga general y especializada para el sector industrial.",
      matchScore: 85,
      scorecard: {
        confiabilidad: 92,
        entregas: 88,
        calidad: 90,
        precios: 85,
      },
      esTransportista: true,
      tipoTransporte: ["Carga General", "Maquinaria", "Sobredimensionado"],
      flota: 120,
      cobertura: "Norte y Centro",
      certificaciones: ["ISO 9001", "C-TPAT"],
    },
    {
      id: "emp-006",
      nombre: "Ferretería Industrial MX",
      iniciales: "FI",
      tipo: "comprador",
      categorias: ["Ferretería", "Herramientas", "Industrial"],
      ubicacion: "Querétaro, Querétaro",
      verificado: true,
      rating: 4.4,
      numResenias: 67,
      transacciones: 234,
      descripcion: "Cadena de ferreterías industriales con presencia en el Bajío.",
      matchScore: 76,
      scorecard: {
        confiabilidad: 85,
        entregas: 80,
        calidad: 88,
        precios: 72,
      },
      certificaciones: [],
    },
    {
      id: "emp-007",
      nombre: "Transportes Refrigerados del Pacífico",
      iniciales: "TP",
      tipo: "transportista",
      categorias: ["Transporte Refrigerado"],
      ubicacion: "Culiacán, Sinaloa",
      verificado: true,
      rating: 4.7,
      numResenias: 89,
      transacciones: 567,
      descripcion: "Transporte refrigerado especializado en productos del mar y agrícolas.",
      matchScore: 82,
      scorecard: {
        confiabilidad: 94,
        entregas: 90,
        calidad: 92,
        precios: 88,
      },
      esTransportista: true,
      tipoTransporte: ["Refrigerado", "Mariscos", "Agrícola"],
      flota: 32,
      cobertura: "Pacífico y Centro",
      certificaciones: ["ISO 9001", "HACCP"],
    },
    {
      id: "emp-008",
      nombre: "Químicos Industriales SA",
      iniciales: "QI",
      tipo: "proveedor",
      categorias: ["Químicos", "Solventes", "Adhesivos"],
      ubicacion: "Toluca, Estado de México",
      verificado: true,
      rating: 4.3,
      numResenias: 56,
      transacciones: 189,
      descripcion: "Distribución de productos químicos para la industria.",
      matchScore: 71,
      scorecard: {
        confiabilidad: 82,
        entregas: 78,
        calidad: 85,
        precios: 80,
      },
      certificaciones: ["ISO 9001", "ISO 14001"],
    },
    {
      id: "emp-009",
      nombre: "LogiFresh Express",
      iniciales: "LF",
      tipo: "transportista",
      categorias: ["Última Milla", "Express"],
      ubicacion: "CDMX",
      verificado: true,
      rating: 4.5,
      numResenias: 45,
      transacciones: 678,
      descripcion: "Entregas express y última milla para e-commerce y retail.",
      matchScore: 79,
      scorecard: {
        confiabilidad: 88,
        entregas: 95,
        calidad: 85,
        precios: 75,
      },
      esTransportista: true,
      tipoTransporte: ["Express", "Última Milla", "Same-day"],
      flota: 85,
      cobertura: "CDMX y Área Metropolitana",
      certificaciones: ["ISO 9001"],
    },
    {
      id: "emp-010",
      nombre: "Servicios de Instalación Industrial",
      iniciales: "SI",
      tipo: "servicios",
      categorias: ["Instalación", "Mantenimiento", "Refrigeración"],
      ubicacion: "Monterrey, Nuevo León",
      verificado: true,
      rating: 4.6,
      numResenias: 78,
      transacciones: 145,
      descripcion: "Instalación y mantenimiento de sistemas industriales y refrigeración.",
      matchScore: 83,
      scorecard: {
        confiabilidad: 90,
        entregas: 85,
        calidad: 92,
        precios: 78,
      },
      certificaciones: ["ISO 9001"],
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // PRODUCTOS
  // ─────────────────────────────────────────────────────────────────────────────
  export interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    empresaId: string;
    empresaNombre: string;
    precio: number;
    unidad: string;
    precioDescuento?: number;
    minCompra: number;
    disponible: boolean;
    imagen?: string;
    descripcion: string;
  }
  
  export const productos: Producto[] = [
    {
      id: "prod-001",
      nombre: "Cemento Portland CPC 40",
      categoria: "Cemento",
      empresaId: "emp-001",
      empresaNombre: "Materiales del Norte",
      precio: 185,
      unidad: "saco 50kg",
      precioDescuento: 157,
      minCompra: 100,
      disponible: true,
      descripcion: "Cemento Portland Compuesto resistente, ideal para construcción general.",
    },
    {
      id: "prod-002",
      nombre: "Tomate Saladette",
      categoria: "Hortalizas",
      empresaId: "emp-003",
      empresaNombre: "Agrícola del Valle",
      precio: 8500,
      unidad: "tonelada",
      minCompra: 1,
      disponible: true,
      descripcion: "Tomate saladette fresco de primera calidad, ideal para distribución.",
    },
    {
      id: "prod-003",
      nombre: "Varilla Corrugada 3/8\"",
      categoria: "Acero",
      empresaId: "emp-004",
      empresaNombre: "Aceros y Metales SA",
      precio: 18500,
      unidad: "tonelada",
      minCompra: 5,
      disponible: true,
      descripcion: "Varilla de acero corrugada para construcción, grado 42.",
    },
    {
      id: "prod-004",
      nombre: "Block de Concreto 15x20x40",
      categoria: "Blocks",
      empresaId: "emp-001",
      empresaNombre: "Materiales del Norte",
      precio: 12,
      unidad: "pieza",
      minCompra: 500,
      disponible: true,
      descripcion: "Block de concreto estándar para muros y bardas.",
    },
    {
      id: "prod-005",
      nombre: "Chile Serrano",
      categoria: "Hortalizas",
      empresaId: "emp-003",
      empresaNombre: "Agrícola del Valle",
      precio: 15000,
      unidad: "tonelada",
      minCompra: 1,
      disponible: true,
      descripcion: "Chile serrano fresco, cultivado en Sinaloa.",
    },
    {
      id: "prod-006",
      nombre: "Arena de Río",
      categoria: "Agregados",
      empresaId: "emp-001",
      empresaNombre: "Materiales del Norte",
      precio: 450,
      unidad: "m³",
      minCompra: 5,
      disponible: true,
      descripcion: "Arena de río lavada para construcción.",
    },
    {
      id: "prod-007",
      nombre: "Perfil PTR 4x4",
      categoria: "Acero",
      empresaId: "emp-004",
      empresaNombre: "Aceros y Metales SA",
      precio: 890,
      unidad: "tramo 6m",
      minCompra: 10,
      disponible: true,
      descripcion: "Perfil tubular rectangular de acero.",
    },
    {
      id: "prod-008",
      nombre: "Aguacate Hass",
      categoria: "Frutas",
      empresaId: "emp-003",
      empresaNombre: "Agrícola del Valle",
      precio: 45000,
      unidad: "tonelada",
      minCompra: 1,
      disponible: true,
      descripcion: "Aguacate Hass de exportación, calibre selecto.",
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // SERVICIOS (incluye transporte)
  // ─────────────────────────────────────────────────────────────────────────────
  export interface Servicio {
    id: string;
    nombre: string;
    tipo: "transporte" | "instalacion" | "consultoria" | "maquila" | "almacenaje";
    empresaId: string;
    empresaNombre: string;
    descripcion: string;
    precioDesde: number;
    unidadPrecio: string;
    cobertura?: string;
    tiempoRespuesta?: string;
    caracteristicas: string[];
  }
  
  export const servicios: Servicio[] = [
    {
      id: "serv-001",
      nombre: "Transporte Refrigerado Nacional",
      tipo: "transporte",
      empresaId: "emp-002",
      empresaNombre: "TransFrío MX",
      descripcion: "Transporte refrigerado con control de temperatura GPS para perecederos.",
      precioDesde: 8,
      unidadPrecio: "por km",
      cobertura: "Nacional",
      tiempoRespuesta: "< 4 horas",
      caracteristicas: ["GPS", "Control temperatura", "Seguro incluido", "Monitoreo 24/7"],
    },
    {
      id: "serv-002",
      nombre: "Carga General y Especializada",
      tipo: "transporte",
      empresaId: "emp-005",
      empresaNombre: "Logística Industrial del Norte",
      descripcion: "Transporte de carga general, maquinaria y cargas sobredimensionadas.",
      precioDesde: 6.5,
      unidadPrecio: "por km",
      cobertura: "Norte y Centro",
      tiempoRespuesta: "< 6 horas",
      caracteristicas: ["Carga pesada", "Maquinaria", "Permisos especiales", "Seguro"],
    },
    {
      id: "serv-003",
      nombre: "Transporte Refrigerado Pacífico",
      tipo: "transporte",
      empresaId: "emp-007",
      empresaNombre: "Transportes Refrigerados del Pacífico",
      descripcion: "Especialistas en productos del mar y agrícolas de la región del Pacífico.",
      precioDesde: 7.5,
      unidadPrecio: "por km",
      cobertura: "Pacífico y Centro",
      tiempoRespuesta: "< 4 horas",
      caracteristicas: ["Refrigerado", "Mariscos", "Agrícola", "HACCP"],
    },
    {
      id: "serv-004",
      nombre: "Express Última Milla",
      tipo: "transporte",
      empresaId: "emp-009",
      empresaNombre: "LogiFresh Express",
      descripcion: "Entregas same-day y última milla para comercio y retail.",
      precioDesde: 85,
      unidadPrecio: "por entrega",
      cobertura: "CDMX y Área Metropolitana",
      tiempoRespuesta: "< 2 horas",
      caracteristicas: ["Same-day", "Tracking real-time", "Prueba de entrega", "Flexible"],
    },
    {
      id: "serv-005",
      nombre: "Instalación de Refrigeración Industrial",
      tipo: "instalacion",
      empresaId: "emp-010",
      empresaNombre: "Servicios de Instalación Industrial",
      descripcion: "Instalación y puesta en marcha de sistemas de refrigeración industrial.",
      precioDesde: 15000,
      unidadPrecio: "proyecto",
      tiempoRespuesta: "Cotización en 24h",
      caracteristicas: ["Cámaras frías", "Cuartos fríos", "Garantía 2 años", "Mantenimiento"],
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // SOLICITUDES (oportunidades para vendedores)
  // ─────────────────────────────────────────────────────────────────────────────
  export type TipoSolicitud = "producto" | "servicio" | "transporte";
  export type EstadoSolicitud = "activa" | "en_negociacion" | "cerrada";
  
  export interface Solicitud {
    id: string;
    tipo: TipoSolicitud;
    titulo: string;
    descripcion: string;
    solicitanteId: string;
    solicitanteNombre: string;
    solicitanteRating: number;
    solicitanteVerificado: boolean;
    // Detalles
    categoria: string;
    cantidad?: string;
    ubicacionOrigen?: string;
    ubicacionDestino: string;
    distanciaKm?: number;
    fechaRequerida: string;
    presupuesto?: string;
    presupuestoMin?: number;
    presupuestoMax?: number;
    // Requisitos especiales
    requiereRefrigerado?: boolean;
    temperaturaMin?: number;
    temperaturaMax?: number;
    // Estado
    estado: EstadoSolicitud;
    fechaPublicacion: string;
    vistas: number;
    cotizaciones: number;
    cierraEn: string;
    // IA
    matchScore: number;
    matchRazon: string;
  }
  
  export const solicitudes: Solicitud[] = [
    {
      id: "sol-001",
      tipo: "transporte",
      titulo: "Transporte refrigerado Culiacán → Guadalajara",
      descripcion: "Necesito transportar 10 toneladas de tomate saladette con refrigeración controlada.",
      solicitanteId: "usr-001",
      solicitanteNombre: "Distribuidora Alimentos GDL",
      solicitanteRating: 4.7,
      solicitanteVerificado: true,
      categoria: "Refrigerado",
      cantidad: "10 toneladas",
      ubicacionOrigen: "Culiacán, Sinaloa",
      ubicacionDestino: "Guadalajara, Jalisco",
      distanciaKm: 725,
      fechaRequerida: "28 Nov 2025",
      presupuesto: "Abierto a cotizaciones",
      requiereRefrigerado: true,
      temperaturaMin: 4,
      temperaturaMax: 8,
      estado: "activa",
      fechaPublicacion: "Hace 2 horas",
      vistas: 23,
      cotizaciones: 4,
      cierraEn: "18 horas",
      matchScore: 94,
      matchRazon: "Coincide con tu ruta, capacidad y tipo de unidad refrigerada.",
    },
    {
      id: "sol-002",
      tipo: "producto",
      titulo: "Cemento Portland 500 sacos",
      descripcion: "Requerimos cemento Portland CPC 40 para proyecto de construcción.  Preferimos proveedor que incluya transporte.",
      solicitanteId: "emp-006",
      solicitanteNombre: "Ferretería Industrial MX",
      solicitanteRating: 4.4,
      solicitanteVerificado: true,
      categoria: "Cemento",
      cantidad: "500 sacos (25 toneladas)",
      ubicacionDestino: "Querétaro, Querétaro",
      fechaRequerida: "1 Dic 2025",
      presupuesto: "$90,000 - $100,000",
      presupuestoMin: 90000,
      presupuestoMax: 100000,
      estado: "activa",
      fechaPublicacion: "Hace 5 horas",
      vistas: 45,
      cotizaciones: 7,
      cierraEn: "2 días",
      matchScore: 87,
      matchRazon: "Tienes este producto en catálogo.  Precio competitivo vs tu promedio.",
    },
    {
      id: "sol-003",
      tipo: "transporte",
      titulo: "Transporte de maquinaria industrial",
      descripcion: "Necesitamos mover una línea de producción (3 máquinas) de Monterrey a Querétaro.",
      solicitanteId: "emp-006",
      solicitanteNombre: "Ferretería Industrial MX",
      solicitanteRating: 4.4,
      solicitanteVerificado: true,
      categoria: "Carga Especializada",
      cantidad: "3 máquinas (aprox 15 ton total)",
      ubicacionOrigen: "Monterrey, Nuevo León",
      ubicacionDestino: "Querétaro, Querétaro",
      distanciaKm: 480,
      fechaRequerida: "15 Dic 2025",
      presupuesto: "$45,000 - $60,000",
      presupuestoMin: 45000,
      presupuestoMax: 60000,
      estado: "activa",
      fechaPublicacion: "Hace 1 día",
      vistas: 34,
      cotizaciones: 3,
      cierraEn: "5 días",
      matchScore: 78,
      matchRazon: "Tu flota incluye unidades para carga especializada.",
    },
    {
      id: "sol-004",
      tipo: "producto",
      titulo: "Varilla corrugada 3/8\" - 50 toneladas",
      descripcion: "Proyecto de construcción en Querétaro requiere varilla de acero.  Entrega en sitio de obra.",
      solicitanteId: "emp-006",
      solicitanteNombre: "Ferretería Industrial MX",
      solicitanteRating: 4.4,
      solicitanteVerificado: true,
      categoria: "Acero",
      cantidad: "50 toneladas",
      ubicacionDestino: "Querétaro, Querétaro",
      fechaRequerida: "15 Dic 2025",
      presupuesto: "$900,000 - $950,000",
      presupuestoMin: 900000,
      presupuestoMax: 950000,
      estado: "activa",
      fechaPublicacion: "Hace 5 horas",
      vistas: 56,
      cotizaciones: 5,
      cierraEn: "3 días",
      matchScore: 91,
      matchRazon: "Producto en tu catálogo.  5 empresas de tu red compran varilla.",
    },
    {
      id: "sol-005",
      tipo: "servicio",
      titulo: "Instalación de sistema de refrigeración",
      descripcion: "Buscamos empresa para instalar cámara frigorífica de 500m² en nuestra planta.",
      solicitanteId: "emp-003",
      solicitanteNombre: "Agrícola del Valle",
      solicitanteRating: 4.6,
      solicitanteVerificado: true,
      categoria: "Instalación Industrial",
      ubicacionDestino: "Apodaca, Nuevo León",
      fechaRequerida: "Enero 2026",
      presupuesto: "$500,000 - $700,000",
      presupuestoMin: 500000,
      presupuestoMax: 700000,
      estado: "activa",
      fechaPublicacion: "Hace 1 día",
      vistas: 28,
      cotizaciones: 2,
      cierraEn: "7 días",
      matchScore: 85,
      matchRazon: "Servicio que ofreces + zona de cobertura compatible.",
    },
    {
      id: "sol-006",
      tipo: "transporte",
      titulo: "Flete refrigerado CDMX → Monterrey",
      descripcion: "Transporte de productos farmacéuticos con cadena de frío estricta.",
      solicitanteId: "emp-008",
      solicitanteNombre: "Químicos Industriales SA",
      solicitanteRating: 4.3,
      solicitanteVerificado: true,
      categoria: "Refrigerado Farmacéutico",
      cantidad: "8 toneladas",
      ubicacionOrigen: "CDMX",
      ubicacionDestino: "Monterrey, Nuevo León",
      distanciaKm: 920,
      fechaRequerida: "5 Dic 2025",
      presupuesto: "$18,000 - $22,000",
      presupuestoMin: 18000,
      presupuestoMax: 22000,
      requiereRefrigerado: true,
      temperaturaMin: 2,
      temperaturaMax: 8,
      estado: "activa",
      fechaPublicacion: "Hace 3 horas",
      vistas: 15,
      cotizaciones: 2,
      cierraEn: "1 día",
      matchScore: 96,
      matchRazon: "Ruta frecuente + certificación GDP para farmacéuticos.",
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // COTIZACIONES (enviadas y recibidas)
  // ─────────────────────────────────────────────────────────────────────────────
  export type EstadoCotizacion = "pendiente" | "ganada" | "perdida" | "expirada";
  
  export interface Cotizacion {
    id: string;
    solicitudId: string;
    solicitudTitulo: string;
    tipo: TipoSolicitud;
    empresaId: string;
    empresaNombre: string;
    monto: number;
    fechaEnvio: string;
    fechaEntrega: string;
    estado: EstadoCotizacion;
    posicion?: number; // 1ro, 2do, etc en ranking
    totalCotizaciones: number;
    mensaje?: string;
    incluye: string[];
  }
  
  export const cotizacionesEnviadas: Cotizacion[] = [
    {
      id: "cot-001",
      solicitudId: "sol-001",
      solicitudTitulo: "Transporte refrigerado Culiacán → Guadalajara",
      tipo: "transporte",
      empresaId: "emp-002",
      empresaNombre: "TransFrío MX",
      monto: 9800,
      fechaEnvio: "Hace 3 horas",
      fechaEntrega: "29 Nov 10:00 AM",
      estado: "pendiente",
      posicion: 2,
      totalCotizaciones: 5,
      mensaje: "Contamos con disponibilidad inmediata y experiencia en esta ruta.",
      incluye: ["Seguro de carga", "GPS", "Control de temperatura", "Monitoreo 24/7"],
    },
    {
      id: "cot-002",
      solicitudId: "sol-002",
      solicitudTitulo: "Cemento Portland 500 sacos",
      tipo: "producto",
      empresaId: "emp-001",
      empresaNombre: "Materiales del Norte",
      monto: 95000,
      fechaEnvio: "Hace 1 día",
      fechaEntrega: "30 Nov 2025",
      estado: "pendiente",
      posicion: 3,
      totalCotizaciones: 7,
      incluye: ["Producto certificado", "Factura", "Transporte incluido"],
    },
    {
      id: "cot-003",
      solicitudId: "sol-004",
      solicitudTitulo: "Varilla corrugada - 50 toneladas",
      tipo: "producto",
      empresaId: "emp-004",
      empresaNombre: "Aceros y Metales SA",
      monto: 925000,
      fechaEnvio: "Hace 2 días",
      fechaEntrega: "12 Dic 2025",
      estado: "ganada",
      totalCotizaciones: 5,
      incluye: ["Certificado de calidad", "Entrega en obra", "Factura"],
    },
    {
      id: "cot-004",
      solicitudId: "sol-003",
      solicitudTitulo: "Transporte de maquinaria industrial",
      tipo: "transporte",
      empresaId: "emp-005",
      empresaNombre: "Logística Industrial del Norte",
      monto: 52000,
      fechaEnvio: "Hace 4 días",
      fechaEntrega: "15 Dic 2025",
      estado: "perdida",
      totalCotizaciones: 4,
      incluye: ["Seguro", "Permisos especiales", "Maniobras"],
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // ÓRDENES
  // ─────────────────────────────────────────────────────────────────────────────
  export type EstadoOrden = "confirmada" | "preparando" | "en_transito" | "entregada" | "cancelada";
  
  export interface Orden {
    id: string;
    tipo: "compra" | "venta";
    productos: {
      nombre: string;
      cantidad: string;
      precioUnitario: number;
      subtotal: number;
    }[];
    proveedorId: string;
    proveedorNombre: string;
    // Transporte
    conTransporte: boolean;
    transportistaId?: string;
    transportistaNombre?: string;
    costoTransporte?: number;
    // Ubicaciones
    origen: string;
    destino: string;
    distanciaKm?: number;
    // Fechas
    fechaOrden: string;
    fechaRecoleccion?: string;
    fechaEntregaEstimada: string;
    fechaEntregaReal?: string;
    // Estado
    estado: EstadoOrden;
    progreso: number; // 0-100
    // Tracking
    ubicacionActual?: string;
    temperatura?: number;
    ultimaActualizacion?: string;
    // Totales
    subtotalProductos: number;
    total: number;
    // Timeline
    timeline: {
      fecha: string;
      hora: string;
      evento: string;
      completado: boolean;
    }[];
  }
  
  export const ordenes: Orden[] = [
    {
      id: "ORD-3421",
      tipo: "compra",
      productos: [
        {
          nombre: "Tomate Saladette",
          cantidad: "10 toneladas",
          precioUnitario: 8500,
          subtotal: 85000,
        },
      ],
      proveedorId: "emp-003",
      proveedorNombre: "Agrícola del Valle S.A.",
      conTransporte: true,
      transportistaId: "emp-002",
      transportistaNombre: "TransFrío MX",
      costoTransporte: 9800,
      origen: "Culiacán, Sinaloa",
      destino: "Guadalajara, Jalisco",
      distanciaKm: 725,
      fechaOrden: "26 Nov 2025",
      fechaRecoleccion: "28 Nov 8:00 AM",
      fechaEntregaEstimada: "29 Nov 10:00 AM",
      estado: "en_transito",
      progreso: 58,
      ubicacionActual: "Carretera 15, km 234 (cerca de Mazatlán)",
      temperatura: 4,
      ultimaActualizacion: "Hace 10 min",
      subtotalProductos: 85000,
      total: 94800,
      timeline: [
        { fecha: "26 Nov", hora: "6:00 PM", evento: "Orden confirmada", completado: true },
        { fecha: "28 Nov", hora: "8:00 AM", evento: "Transportista llegó a origen", completado: true },
        { fecha: "28 Nov", hora: "8:30 AM", evento: "Carga completada", completado: true },
        { fecha: "28 Nov", hora: "10:15 AM", evento: "Salió de instalaciones", completado: true },
        { fecha: "29 Nov", hora: "10:00 AM", evento: "Entrega estimada", completado: false },
      ],
    },
    {
      id: "ORD-3418",
      tipo: "compra",
      productos: [
        {
          nombre: "Cemento Portland CPC 40",
          cantidad: "500 sacos",
          precioUnitario: 157,
          subtotal: 78500,
        },
      ],
      proveedorId: "emp-001",
      proveedorNombre: "Materiales del Norte",
      conTransporte: true,
      transportistaId: "emp-005",
      transportistaNombre: "Logística Industrial del Norte",
      costoTransporte: 8500,
      origen: "Monterrey, Nuevo León",
      destino: "Guadalajara, Jalisco",
      distanciaKm: 850,
      fechaOrden: "24 Nov 2025",
      fechaRecoleccion: "26 Nov 7:00 AM",
      fechaEntregaEstimada: "27 Nov 2:00 PM",
      fechaEntregaReal: "27 Nov 1:45 PM",
      estado: "entregada",
      progreso: 100,
      subtotalProductos: 78500,
      total: 87000,
      timeline: [
        { fecha: "24 Nov", hora: "3:00 PM", evento: "Orden confirmada", completado: true },
        { fecha: "26 Nov", hora: "7:00 AM", evento: "Recolección en origen", completado: true },
        { fecha: "26 Nov", hora: "8:00 AM", evento: "En tránsito", completado: true },
        { fecha: "27 Nov", hora: "1:45 PM", evento: "Entregado", completado: true },
      ],
    },
    {
      id: "ORD-3425",
      tipo: "compra",
      productos: [
        {
          nombre: "Varilla Corrugada 3/8\"",
          cantidad: "15 toneladas",
          precioUnitario: 18500,
          subtotal: 277500,
        },
      ],
      proveedorId: "emp-004",
      proveedorNombre: "Aceros y Metales SA",
      conTransporte: false,
      origen: "Monterrey, Nuevo León",
      destino: "Guadalajara, Jalisco",
      fechaOrden: "27 Nov 2025",
      fechaEntregaEstimada: "2 Dic 2025",
      estado: "preparando",
      progreso: 25,
      subtotalProductos: 277500,
      total: 277500,
      timeline: [
        { fecha: "27 Nov", hora: "10:00 AM", evento: "Orden confirmada", completado: true },
        { fecha: "28 Nov", hora: "--", evento: "Preparando pedido", completado: false },
        { fecha: "2 Dic", hora: "--", evento: "Listo para recoger", completado: false },
      ],
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // OFERTAS ACTIVAS
  // ─────────────────────────────────────────────────────────────────────────────
  export interface Oferta {
    id: string;
    empresaId: string;
    empresaNombre: string;
    productoNombre: string;
    precioOriginal: number;
    precioOferta: number;
    descuento: number;
    unidad: string;
    minCompra: number;
    validoHasta: string;
    descripcion: string;
    destacada: boolean;
  }
  
  export const ofertas: Oferta[] = [
    {
      id: "of-001",
      empresaId: "emp-001",
      empresaNombre: "Materiales del Norte",
      productoNombre: "Cemento Portland CPC 40",
      precioOriginal: 185,
      precioOferta: 157,
      descuento: 15,
      unidad: "saco 50kg",
      minCompra: 100,
      validoHasta: "30 Nov 2025",
      descripcion: "Oferta por fin de mes.  Stock limitado.",
      destacada: true,
    },
    {
      id: "of-002",
      empresaId: "emp-003",
      empresaNombre: "Agrícola del Valle",
      productoNombre: "Tomate Saladette",
      precioOriginal: 8500,
      precioOferta: 7650,
      descuento: 10,
      unidad: "tonelada",
      minCompra: 5,
      validoHasta: "28 Nov 2025",
      descripcion: "Cosecha de temporada. Volumen disponible limitado.",
      destacada: true,
    },
    {
      id: "of-003",
      empresaId: "emp-002",
      empresaNombre: "TransFrío MX",
      productoNombre: "Transporte Refrigerado",
      precioOriginal: 9.5,
      precioOferta: 8,
      descuento: 16,
      unidad: "por km",
      minCompra: 500,
      validoHasta: "5 Dic 2025",
      descripcion: "Tarifa especial en rutas Sinaloa-Jalisco.",
      destacada: false,
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // NOTIFICACIONES
  // ─────────────────────────────────────────────────────────────────────────────
  export type TipoNotificacion = "oferta" | "solicitud" | "cotizacion" | "orden" | "conexion" | "sistema";
  
  export interface Notificacion {
    id: string;
    tipo: TipoNotificacion;
    titulo: string;
    mensaje: string;
    fecha: string;
    leida: boolean;
    accionUrl?: string;
  }
  
  export const notificaciones: Notificacion[] = [
    {
      id: "not-001",
      tipo: "cotizacion",
      titulo: "Nueva cotización recibida",
      mensaje: "TransFrío MX cotizó $9,800 para tu solicitud de transporte.",
      fecha: "Hace 10 min",
      leida: false,
      accionUrl: "/operaciones",
    },
    {
      id: "not-002",
      tipo: "orden",
      titulo: "Orden en tránsito",
      mensaje: "Tu orden #ORD-3421 salió de Culiacán.  ETA: mañana 10:00 AM.",
      fecha: "Hace 2 horas",
      leida: false,
      accionUrl: "/tracking/ORD-3421",
    },
    {
      id: "not-003",
      tipo: "oferta",
      titulo: "Oferta de tu red",
      mensaje: "Materiales del Norte: Cemento -15% hasta fin de mes.",
      fecha: "Hace 3 horas",
      leida: true,
      accionUrl: "/perfil-empresa/emp-001",
    },
    {
      id: "not-004",
      tipo: "solicitud",
      titulo: "Match 94% con nueva solicitud",
      mensaje: "Hay una solicitud de transporte refrigerado que coincide con tu perfil.",
      fecha: "Hace 5 horas",
      leida: true,
      accionUrl: "/oportunidades",
    },
    {
      id: "not-005",
      tipo: "conexion",
      titulo: "Nueva conexión sugerida",
      mensaje: "Aceros y Metales SA podría ser un buen proveedor para ti.  Match 87%.",
      fecha: "Hace 1 día",
      leida: true,
      accionUrl: "/perfil-empresa/emp-004",
    },
  ];
  
  // ─────────────────────────────────────────────────────────────────────────────
  // ANALYTICS (para la vista de cotizaciones)
  // ─────────────────────────────────────────────────────────────────────────────
  export const analyticsCotizaciones = {
    totalEnviadas: 23,
    pendientes: 8,
    ganadas: 12,
    perdidas: 3,
    tasaExito: 52,
    promedioMercado: 34,
    valorGanado: 187500,
    // Por qué ganas
    factoresExito: [
      { factor: "Rating (4.9)", porcentaje: 35 },
      { factor: "Tiempo respuesta (< 2h)", porcentaje: 28 },
      { factor: "Precio competitivo", porcentaje: 22 },
      { factor: "Servicios incluidos", porcentaje: 15 },
    ],
    // Por qué pierdes
    factoresPerdida: [
      { factor: "Precio más alto", porcentaje: 67 },
      { factor: "Respuesta tardía", porcentaje: 22 },
      { factor: "Ubicación no óptima", porcentaje: 11 },
    ],
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  // SUPPLY PLANNER (datos para planificación)
  // ─────────────────────────────────────────────────────────────────────────────
  export const supplyPlannerEjemplo = {
    necesidades: [
      { producto: "Cemento Portland", cantidad: "500 sacos", fechaRequerida: "5 Dic" },
      { producto: "Varilla 3/8\"", cantidad: "10 toneladas", fechaRequerida: "5 Dic" },
      { producto: "Arena de río", cantidad: "20 m³", fechaRequerida: "8 Dic" },
    ],
    tieneTransporte: false,
    destino: "Guadalajara, Jalisco",
    planSugerido: {
      opcionRecomendada: {
        nombre: "Consolidado Inteligente",
        ahorro: 11200,
        proveedores: [
          { nombre: "Materiales del Norte", productos: ["Cemento", "Arena"], subtotal: 127500 },
          { nombre: "Aceros Premium", productos: ["Varilla"], subtotal: 54000 },
        ],
        transporte: {
          nombre: "TransFrío MX",
          tipo: "Ruta consolidada",
          costo: 14200,
          ahorro: 6800,
        },
        total: 195700,
        fechaEntrega: "5-8 Dic",
      },
      opcionRapida: {
        nombre: "Más rápido",
        costoExtra: 2100,
        descripcion: "Todo en un día con 3 proveedores diferentes",
      },
    },
  };