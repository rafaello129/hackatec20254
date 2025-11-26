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

  // ─────────────────────────────────────────────────────────────────────────────
// PERFIL EMPRESARIAL (datos extendidos del usuario actual)
// ─────────────────────────────────────────────────────────────────────────────
export interface DatosContacto {
  email: string;
  telefono: string;
  sitioWeb: string;
  whatsapp: string;
  direccion: string;
}

export interface DatosFiscales {
  razonSocial: string;
  rfc: string;
  regimenFiscal: string;
  numeroEscritura: string;
  fechaConstitucion: string;
  domicilioFiscal: string;
}

export interface Documento {
  id: string;
  nombre: string;
  status: "vigente" | "por_vencer" | "vencido";
  fechaEmision: string;
  fechaVencimiento?: string;
}

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  status: "principal" | "activa" | "almacen";
  empleados: number;
}

export interface HorarioOperacion {
  dia: string;
  apertura: string;
  cierre: string;
  activo: boolean;
}

export interface PerfilEmpresarial {
  id: string;
  nombre: string;
  iniciales: string;
  tipo: "comprador" | "vendedor" | "ambos";
  descripcion: string;
  eslogan?: string;
  categorias: string[];
  ubicacion: string;
  verificado: boolean;
  rating: number;
  numResenias: number;
  transacciones: number;
  miembrosDesde: string;
  certificaciones: string[];
  scorecard: {
    confiabilidad: number;
    entregas: number;
    calidad: number;
    precios: number;
  };
  contacto: DatosContacto;
  datosFiscales: DatosFiscales;
  documentos: Documento[];
  sucursales: Sucursal[];
  horarios: HorarioOperacion[];
}

export const perfilEmpresarial: PerfilEmpresarial = {
  id: "usr-001",
  nombre: "Distribuidora Alimentos GDL",
  iniciales: "DA",
  tipo: "comprador",
  descripcion:
    "Distribuidora de alimentos con cobertura en la zona metropolitana de Guadalajara.  Especializados en productos perecederos y frescos para el sector HORECA.",
  eslogan: "Frescura y calidad en cada entrega",
  categorias: ["Alimentos", "Distribución", "Perecederos", "HORECA"],
  ubicacion: "Guadalajara, Jalisco",
  verificado: true,
  rating: 4.7,
  numResenias: 89,
  transacciones: 156,
  miembrosDesde: "2021",
  certificaciones: ["SENASICA", "ISO 22000", "Distintivo H"],
  scorecard: {
    confiabilidad: 92,
    entregas: 88,
    calidad: 95,
    precios: 85,
  },
  contacto: {
    email: "contacto@distribuidoragdl.com",
    telefono: "+52 33 1234 5678",
    sitioWeb: "www.distribuidoragdl.com",
    whatsapp: "+52 33 1234 5678",
    direccion: "Av. López Mateos 1234, Col. Chapalita, Guadalajara, Jalisco",
  },
  datosFiscales: {
    razonSocial: "Distribuidora de Alimentos GDL S.A.  de C.V.",
    rfc: "DAG210315ABC",
    regimenFiscal: "Régimen General de Ley",
    numeroEscritura: "45678",
    fechaConstitucion: "2021-03-15",
    domicilioFiscal:
      "Av. López Mateos 1234, Col. Chapalita, Guadalajara, Jalisco, CP 44500",
  },
  documentos: [
    {
      id: "doc-001",
      nombre: "Acta Constitutiva",
      status: "vigente",
      fechaEmision: "2021-03-15",
    },
    {
      id: "doc-002",
      nombre: "Constancia de Situación Fiscal",
      status: "vigente",
      fechaEmision: "2025-01-10",
      fechaVencimiento: "2026-01-10",
    },
    {
      id: "doc-003",
      nombre: "Comprobante de Domicilio",
      status: "por_vencer",
      fechaEmision: "2025-09-01",
      fechaVencimiento: "2025-12-01",
    },
    {
      id: "doc-004",
      nombre: "Licencia Sanitaria SENASICA",
      status: "vigente",
      fechaEmision: "2024-06-15",
      fechaVencimiento: "2026-06-15",
    },
    {
      id: "doc-005",
      nombre: "Certificado ISO 22000",
      status: "vigente",
      fechaEmision: "2023-08-20",
      fechaVencimiento: "2026-08-20",
    },
  ],
  sucursales: [
    {
      id: "suc-001",
      nombre: "Matriz Guadalajara",
      direccion: "Av. López Mateos 1234, Col. Chapalita",
      ciudad: "Guadalajara, JAL",
      status: "principal",
      empleados: 32,
    },
    {
      id: "suc-002",
      nombre: "Centro de Distribución",
      direccion: "Parque Industrial El Salto, Nave 15",
      ciudad: "El Salto, JAL",
      status: "almacen",
      empleados: 18,
    },
    {
      id: "suc-003",
      nombre: "Sucursal Zapopan",
      direccion: "Av. Patria 567, Col. Jardines Universidad",
      ciudad: "Zapopan, JAL",
      status: "activa",
      empleados: 12,
    },
  ],
  horarios: [
    { dia: "Lunes", apertura: "08:00", cierre: "18:00", activo: true },
    { dia: "Martes", apertura: "08:00", cierre: "18:00", activo: true },
    { dia: "Miércoles", apertura: "08:00", cierre: "18:00", activo: true },
    { dia: "Jueves", apertura: "08:00", cierre: "18:00", activo: true },
    { dia: "Viernes", apertura: "08:00", cierre: "18:00", activo: true },
    { dia: "Sábado", apertura: "09:00", cierre: "14:00", activo: true },
    { dia: "Domingo", apertura: "", cierre: "", activo: false },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// INVENTARIO INTELIGENTE
// ─────────────────────────────────────────────────────────────────────────────

export type EstadoStock = "optimo" | "bajo" | "critico" | "agotado" | "exceso";
export type TendenciaDemanda = "subiendo" | "estable" | "bajando";

export interface ProductoInventario {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  imagen?: string;
  codigoBarras: string;
  // Stock
  stockActual: number;
  stockMinimo: number;
  stockMaximo: number;
  unidad: string;
  // Precios
  costoUnitario: number;
  precioVenta: number;
  // Estado calculado
  estadoStock: EstadoStock;
  diasInventario: number; // Días que dura el stock actual
  // Predicción IA
  demandaSemanal: number; // Unidades promedio vendidas por semana
  tendencia: TendenciaDemanda;
  proximaCompra: string; // Fecha sugerida
  cantidadSugerida: number;
  // Métricas
  rotacion: number; // Veces que rota al mes
  ventasMes: number;
  ultimaCompra: string;
  proveedor: string;
}

export interface AlertaInventario {
  id: string;
  tipo: "reabastecimiento" | "exceso" | "vencimiento" | "lento" | "oportunidad";
  prioridad: "alta" | "media" | "baja";
  productoId: string;
  productoNombre: string;
  mensaje: string;
  accionSugerida: string;
  ahorroPotencial?: number;
  fecha: string;
}

export interface PrediccionCategoria {
  categoria: string;
  demandaActual: number;
  demandaProyectada: number;
  variacion: number; // Porcentaje
  tendencia: TendenciaDemanda;
}

export interface ResumenInventario {
  totalProductos: number;
  valorInventario: number;
  productosStockBajo: number;
  productosStockCritico: number;
  productosExceso: number;
  rotacionPromedio: number;
  alertasPendientes: number;
  ahorroOptimizacion: number;
}

export const inventarioProductos: ProductoInventario[] = [
  {
    id: "inv-001",
    sku: "TOM-SAL-001",
    nombre: "Tomate Saladette",
    categoria: "Frutas y Verduras",
    codigoBarras: "7501234567890",
    stockActual: 450,
    stockMinimo: 200,
    stockMaximo: 800,
    unidad: "kg",
    costoUnitario: 8.5,
    precioVenta: 12,
    estadoStock: "optimo",
    diasInventario: 12,
    demandaSemanal: 280,
    tendencia: "subiendo",
    proximaCompra: "30 Nov 2025",
    cantidadSugerida: 350,
    rotacion: 4.2,
    ventasMes: 1120,
    ultimaCompra: "20 Nov 2025",
    proveedor: "Agrícola del Valle S.A.",
  },
  {
    id: "inv-002",
    sku: "CHI-SER-001",
    nombre: "Chile Serrano",
    categoria: "Frutas y Verduras",
    codigoBarras: "7501234567891",
    stockActual: 45,
    stockMinimo: 80,
    stockMaximo: 200,
    unidad: "kg",
    costoUnitario: 15,
    precioVenta: 22,
    estadoStock: "critico",
    diasInventario: 3,
    demandaSemanal: 95,
    tendencia: "estable",
    proximaCompra: "Hoy",
    cantidadSugerida: 120,
    rotacion: 5.1,
    ventasMes: 380,
    ultimaCompra: "15 Nov 2025",
    proveedor: "Agrícola del Valle S.A.",
  },
  {
    id: "inv-003",
    sku: "AGU-HAS-001",
    nombre: "Aguacate Hass",
    categoria: "Frutas y Verduras",
    codigoBarras: "7501234567892",
    stockActual: 180,
    stockMinimo: 100,
    stockMaximo: 400,
    unidad: "kg",
    costoUnitario: 45,
    precioVenta: 65,
    estadoStock: "optimo",
    diasInventario: 8,
    demandaSemanal: 150,
    tendencia: "subiendo",
    proximaCompra: "2 Dic 2025",
    cantidadSugerida: 200,
    rotacion: 3.8,
    ventasMes: 600,
    ultimaCompra: "18 Nov 2025",
    proveedor: "Agrícola del Valle S.A.",
  },
  {
    id: "inv-004",
    sku: "CEB-BLA-001",
    nombre: "Cebolla Blanca",
    categoria: "Frutas y Verduras",
    codigoBarras: "7501234567893",
    stockActual: 320,
    stockMinimo: 150,
    stockMaximo: 500,
    unidad: "kg",
    costoUnitario: 6,
    precioVenta: 9,
    estadoStock: "optimo",
    diasInventario: 15,
    demandaSemanal: 140,
    tendencia: "estable",
    proximaCompra: "5 Dic 2025",
    cantidadSugerida: 200,
    rotacion: 2.8,
    ventasMes: 560,
    ultimaCompra: "12 Nov 2025",
    proveedor: "Distribuidora Hortícola MX",
  },
  {
    id: "inv-005",
    sku: "LIM-PER-001",
    nombre: "Limón Persa",
    categoria: "Frutas y Verduras",
    codigoBarras: "7501234567894",
    stockActual: 25,
    stockMinimo: 100,
    stockMaximo: 300,
    unidad: "kg",
    costoUnitario: 12,
    precioVenta: 18,
    estadoStock: "agotado",
    diasInventario: 1,
    demandaSemanal: 180,
    tendencia: "subiendo",
    proximaCompra: "Urgente",
    cantidadSugerida: 250,
    rotacion: 6.2,
    ventasMes: 720,
    ultimaCompra: "10 Nov 2025",
    proveedor: "Cítricos del Golfo",
  },
  {
    id: "inv-006",
    sku: "QUE-OAX-001",
    nombre: "Queso Oaxaca",
    categoria: "Lácteos",
    codigoBarras: "7501234567895",
    stockActual: 85,
    stockMinimo: 50,
    stockMaximo: 150,
    unidad: "kg",
    costoUnitario: 95,
    precioVenta: 140,
    estadoStock: "optimo",
    diasInventario: 10,
    demandaSemanal: 55,
    tendencia: "estable",
    proximaCompra: "4 Dic 2025",
    cantidadSugerida: 60,
    rotacion: 3.2,
    ventasMes: 220,
    ultimaCompra: "16 Nov 2025",
    proveedor: "Lácteos del Bajío",
  },
  {
    id: "inv-007",
    sku: "CRE-NAT-001",
    nombre: "Crema Natural",
    categoria: "Lácteos",
    codigoBarras: "7501234567896",
    stockActual: 120,
    stockMinimo: 40,
    stockMaximo: 100,
    unidad: "litro",
    costoUnitario: 28,
    precioVenta: 42,
    estadoStock: "exceso",
    diasInventario: 25,
    demandaSemanal: 32,
    tendencia: "bajando",
    proximaCompra: "No requerida",
    cantidadSugerida: 0,
    rotacion: 1.5,
    ventasMes: 128,
    ultimaCompra: "5 Nov 2025",
    proveedor: "Lácteos del Bajío",
  },
  {
    id: "inv-008",
    sku: "PEC-POL-001",
    nombre: "Pechuga de Pollo",
    categoria: "Carnes",
    codigoBarras: "7501234567897",
    stockActual: 60,
    stockMinimo: 80,
    stockMaximo: 200,
    unidad: "kg",
    costoUnitario: 75,
    precioVenta: 110,
    estadoStock: "bajo",
    diasInventario: 4,
    demandaSemanal: 105,
    tendencia: "subiendo",
    proximaCompra: "28 Nov 2025",
    cantidadSugerida: 140,
    rotacion: 5.8,
    ventasMes: 420,
    ultimaCompra: "19 Nov 2025",
    proveedor: "Avícola del Centro",
  },
  {
    id: "inv-009",
    sku: "ARR-GRA-001",
    nombre: "Arroz Grano Largo",
    categoria: "Abarrotes",
    codigoBarras: "7501234567898",
    stockActual: 500,
    stockMinimo: 200,
    stockMaximo: 600,
    unidad: "kg",
    costoUnitario: 18,
    precioVenta: 26,
    estadoStock: "optimo",
    diasInventario: 20,
    demandaSemanal: 175,
    tendencia: "estable",
    proximaCompra: "10 Dic 2025",
    cantidadSugerida: 250,
    rotacion: 2.1,
    ventasMes: 700,
    ultimaCompra: "1 Nov 2025",
    proveedor: "Granos y Semillas MX",
  },
  {
    id: "inv-010",
    sku: "FRI-NEG-001",
    nombre: "Frijol Negro",
    categoria: "Abarrotes",
    codigoBarras: "7501234567899",
    stockActual: 280,
    stockMinimo: 100,
    stockMaximo: 350,
    unidad: "kg",
    costoUnitario: 22,
    precioVenta: 32,
    estadoStock: "optimo",
    diasInventario: 18,
    demandaSemanal: 110,
    tendencia: "estable",
    proximaCompra: "8 Dic 2025",
    cantidadSugerida: 150,
    rotacion: 2.4,
    ventasMes: 440,
    ultimaCompra: "8 Nov 2025",
    proveedor: "Granos y Semillas MX",
  },
];

export const alertasInventario: AlertaInventario[] = [
  {
    id: "alerta-001",
    tipo: "reabastecimiento",
    prioridad: "alta",
    productoId: "inv-005",
    productoNombre: "Limón Persa",
    mensaje: "Stock crítico: solo quedan 25 kg (1 día de inventario)",
    accionSugerida: "Realizar pedido urgente de 250 kg",
    fecha: "Hace 2 horas",
  },
  {
    id: "alerta-002",
    tipo: "reabastecimiento",
    prioridad: "alta",
    productoId: "inv-002",
    productoNombre: "Chile Serrano",
    mensaje: "Stock bajo el mínimo: 45 kg disponibles de 80 kg requeridos",
    accionSugerida: "Pedir 120 kg antes del viernes",
    fecha: "Hace 3 horas",
  },
  {
    id: "alerta-003",
    tipo: "exceso",
    prioridad: "media",
    productoId: "inv-007",
    productoNombre: "Crema Natural",
    mensaje: "Exceso de inventario: 120 litros (25 días de stock)",
    accionSugerida: "Considerar promoción o redistribuir a sucursales",
    ahorroPotencial: 1200,
    fecha: "Hace 5 horas",
  },
  {
    id: "alerta-004",
    tipo: "lento",
    prioridad: "baja",
    productoId: "inv-007",
    productoNombre: "Crema Natural",
    mensaje: "Rotación lenta: tendencia de demanda a la baja (-15%)",
    accionSugerida: "Revisar precios o buscar nuevos clientes",
    fecha: "Hace 1 día",
  },
  {
    id: "alerta-005",
    tipo: "oportunidad",
    prioridad: "media",
    productoId: "inv-001",
    productoNombre: "Tomate Saladette",
    mensaje: "Demanda en aumento: +22% vs mes anterior",
    accionSugerida: "Negociar volumen con proveedor para mejor precio",
    ahorroPotencial: 3500,
    fecha: "Hace 1 día",
  },
  {
    id: "alerta-006",
    tipo: "reabastecimiento",
    prioridad: "media",
    productoId: "inv-008",
    productoNombre: "Pechuga de Pollo",
    mensaje: "Stock llegando al mínimo: 60 kg (4 días de inventario)",
    accionSugerida: "Programar pedido de 140 kg para el 28 Nov",
    fecha: "Hace 6 horas",
  },
];

export const prediccionCategorias: PrediccionCategoria[] = [
  {
    categoria: "Frutas y Verduras",
    demandaActual: 2380,
    demandaProyectada: 2850,
    variacion: 19.7,
    tendencia: "subiendo",
  },
  {
    categoria: "Lácteos",
    demandaActual: 348,
    demandaProyectada: 320,
    variacion: -8.0,
    tendencia: "bajando",
  },
  {
    categoria: "Carnes",
    demandaActual: 420,
    demandaProyectada: 510,
    variacion: 21.4,
    tendencia: "subiendo",
  },
  {
    categoria: "Abarrotes",
    demandaActual: 1140,
    demandaProyectada: 1180,
    variacion: 3.5,
    tendencia: "estable",
  },
];

export const resumenInventario: ResumenInventario = {
  totalProductos: 10,
  valorInventario: 156750,
  productosStockBajo: 2,
  productosStockCritico: 2,
  productosExceso: 1,
  rotacionPromedio: 3.7,
  alertasPendientes: 6,
  ahorroOptimizacion: 4700,
};

// ─────────────────────────────────────────────────────────────────────────────
// GESTIÓN DE PRODUCTOS Y SERVICIOS
// ─────────────────────────────────────────────────────────────────────────────

export interface ListaPrecios {
  nombre: string;
  precio: number;
  margen: number;
}

export interface ProductoCatalogo {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria?: string;
  imagen?: string;
  // Costos y precios
  costoBase: number;
  precioBase: number;
  margenBase: number;
  unidad: string;
  // Listas de precios
  listasPrecios: ListaPrecios[];
  // Ficha técnica
  fichaTecnica: {
    peso?: string;
    dimensiones?: string;
    material?: string;
    origen?: string;
    vidaUtil?: string;
    almacenamiento?: string;
    certificaciones?: string[];
  };
  // Estado
  activo: boolean;
  destacado: boolean;
  // Métricas
  ventasMes: number;
  ranking: number;
}

export interface ServicioCatalogo {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  // Duración y recursos
  duracionMinutos: number;
  duracionTexto: string;
  recursosRequeridos: string[];
  personalRequerido: number;
  // Precios
  costoBase: number;
  precioBase: number;
  margenBase: number;
  unidadCobro: string;
  // Agendamiento
  requiereAgenda: boolean;
  disponibilidad: string;
  anticipacionMinima: string;
  // Estado
  activo: boolean;
  destacado: boolean;
  // Métricas
  serviciosMes: number;
  calificacion: number;
}

export const productosCatalogo: ProductoCatalogo[] = [
  {
    id: "pcat-001",
    sku: "TOM-SAL-001",
    nombre: "Tomate Saladette Premium",
    descripcion: "Tomate saladette de primera calidad, ideal para restaurantes y cocinas profesionales.  Cultivo controlado con certificación orgánica.",
    categoria: "Frutas y Verduras",
    subcategoria: "Tomates",
    costoBase: 8.5,
    precioBase: 12,
    margenBase: 41.2,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 14, margen: 64.7 },
      { nombre: "Mayorista", precio: 12, margen: 41.2 },
      { nombre: "Restaurantes", precio: 11, margen: 29.4 },
      { nombre: "VIP", precio: 10.5, margen: 23.5 },
    ],
    fichaTecnica: {
      peso: "80-120g por pieza",
      origen: "Sinaloa, México",
      vidaUtil: "7-10 días refrigerado",
      almacenamiento: "Refrigerar entre 4-8°C",
      certificaciones: ["Orgánico", "SENASICA"],
    },
    activo: true,
    destacado: true,
    ventasMes: 1120,
    ranking: 1,
  },
  {
    id: "pcat-002",
    sku: "AGU-HAS-001",
    nombre: "Aguacate Hass Exportación",
    descripcion: "Aguacate Hass de calidad exportación, calibre selecto.  Maduración controlada para garantizar punto óptimo.",
    categoria: "Frutas y Verduras",
    subcategoria: "Aguacates",
    costoBase: 45,
    precioBase: 65,
    margenBase: 44.4,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 75, margen: 66.7 },
      { nombre: "Mayorista", precio: 65, margen: 44.4 },
      { nombre: "Restaurantes", precio: 60, margen: 33.3 },
      { nombre: "VIP", precio: 55, margen: 22.2 },
    ],
    fichaTecnica: {
      peso: "180-220g por pieza",
      origen: "Michoacán, México",
      vidaUtil: "5-7 días a temperatura ambiente",
      almacenamiento: "Temperatura ambiente hasta madurar, luego refrigerar",
      certificaciones: ["Global GAP", "SENASICA"],
    },
    activo: true,
    destacado: true,
    ventasMes: 600,
    ranking: 2,
  },
  {
    id: "pcat-003",
    sku: "CHI-SER-001",
    nombre: "Chile Serrano Fresco",
    descripcion: "Chile serrano fresco de cultivo local, picor medio-alto. Ideal para salsas y guisos tradicionales.",
    categoria: "Frutas y Verduras",
    subcategoria: "Chiles",
    costoBase: 15,
    precioBase: 22,
    margenBase: 46.7,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 26, margen: 73.3 },
      { nombre: "Mayorista", precio: 22, margen: 46.7 },
      { nombre: "Restaurantes", precio: 20, margen: 33.3 },
      { nombre: "VIP", precio: 18, margen: 20.0 },
    ],
    fichaTecnica: {
      peso: "10-15g por pieza",
      origen: "Jalisco, México",
      vidaUtil: "10-14 días refrigerado",
      almacenamiento: "Refrigerar entre 7-10°C",
      certificaciones: ["SENASICA"],
    },
    activo: true,
    destacado: false,
    ventasMes: 380,
    ranking: 5,
  },
  {
    id: "pcat-004",
    sku: "QUE-OAX-001",
    nombre: "Queso Oaxaca Artesanal",
    descripcion: "Queso Oaxaca elaborado artesanalmente con leche de rancho. Textura perfecta para fundir.",
    categoria: "Lácteos",
    subcategoria: "Quesos",
    costoBase: 95,
    precioBase: 140,
    margenBase: 47.4,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 160, margen: 68.4 },
      { nombre: "Mayorista", precio: 140, margen: 47.4 },
      { nombre: "Restaurantes", precio: 130, margen: 36.8 },
      { nombre: "VIP", precio: 120, margen: 26.3 },
    ],
    fichaTecnica: {
      peso: "Presentación 1kg, 2. 5kg, 5kg",
      origen: "Oaxaca, México",
      vidaUtil: "21 días refrigerado",
      almacenamiento: "Refrigerar entre 2-6°C",
      certificaciones: ["Artesanal Certificado"],
    },
    activo: true,
    destacado: true,
    ventasMes: 220,
    ranking: 3,
  },
  {
    id: "pcat-005",
    sku: "PEC-POL-001",
    nombre: "Pechuga de Pollo Sin Hueso",
    descripcion: "Pechuga de pollo sin hueso y sin piel, corte limpio. Pollo de granja con alimentación controlada.",
    categoria: "Carnes",
    subcategoria: "Aves",
    costoBase: 75,
    precioBase: 110,
    margenBase: 46.7,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 125, margen: 66.7 },
      { nombre: "Mayorista", precio: 110, margen: 46.7 },
      { nombre: "Restaurantes", precio: 100, margen: 33.3 },
      { nombre: "VIP", precio: 95, margen: 26.7 },
    ],
    fichaTecnica: {
      peso: "250-350g por pieza",
      origen: "Jalisco, México",
      vidaUtil: "5 días refrigerado, 6 meses congelado",
      almacenamiento: "Refrigerar 0-4°C o congelar -18°C",
      certificaciones: ["TIF", "Libre de antibióticos"],
    },
    activo: true,
    destacado: false,
    ventasMes: 420,
    ranking: 4,
  },
  {
    id: "pcat-006",
    sku: "ARR-GRA-001",
    nombre: "Arroz Grano Largo Premium",
    descripcion: "Arroz de grano largo, pulido y seleccionado.  Rendimiento superior, grano suelto al cocinar.",
    categoria: "Abarrotes",
    subcategoria: "Granos",
    costoBase: 18,
    precioBase: 26,
    margenBase: 44.4,
    unidad: "kg",
    listasPrecios: [
      { nombre: "Público General", precio: 30, margen: 66.7 },
      { nombre: "Mayorista", precio: 26, margen: 44.4 },
      { nombre: "Restaurantes", precio: 24, margen: 33.3 },
      { nombre: "VIP", precio: 22, margen: 22.2 },
    ],
    fichaTecnica: {
      peso: "Presentación 1kg, 5kg, 25kg",
      origen: "Morelos, México",
      vidaUtil: "12 meses en lugar fresco y seco",
      almacenamiento: "Lugar fresco y seco, proteger de humedad",
      certificaciones: ["NMX-F-204"],
    },
    activo: true,
    destacado: false,
    ventasMes: 700,
    ranking: 6,
  },
];

export const serviciosCatalogo: ServicioCatalogo[] = [
  {
    id: "scat-001",
    codigo: "TRANS-REF-001",
    nombre: "Transporte Refrigerado",
    descripcion: "Servicio de transporte con temperatura controlada para productos perecederos.  Monitoreo GPS y control de temperatura en tiempo real.",
    categoria: "Transporte",
    duracionMinutos: 480,
    duracionTexto: "4-8 horas (según distancia)",
    recursosRequeridos: ["Unidad refrigerada", "Operador certificado", "Sistema GPS"],
    personalRequerido: 1,
    costoBase: 6.5,
    precioBase: 9.5,
    margenBase: 46.2,
    unidadCobro: "por km",
    requiereAgenda: true,
    disponibilidad: "Lunes a Sábado, 6:00 AM - 8:00 PM",
    anticipacionMinima: "24 horas",
    activo: true,
    destacado: true,
    serviciosMes: 45,
    calificacion: 4.8,
  },
  {
    id: "scat-002",
    codigo: "TRANS-GEN-001",
    nombre: "Transporte Carga General",
    descripcion: "Transporte de mercancía general y paquetería. Servicio puerta a puerta con seguro incluido.",
    categoria: "Transporte",
    duracionMinutos: 360,
    duracionTexto: "3-6 horas (según distancia)",
    recursosRequeridos: ["Unidad de carga", "Operador", "Seguro de mercancía"],
    personalRequerido: 1,
    costoBase: 5,
    precioBase: 7.5,
    margenBase: 50,
    unidadCobro: "por km",
    requiereAgenda: true,
    disponibilidad: "Lunes a Sábado, 7:00 AM - 7:00 PM",
    anticipacionMinima: "12 horas",
    activo: true,
    destacado: false,
    serviciosMes: 68,
    calificacion: 4.6,
  },
  {
    id: "scat-003",
    codigo: "ALM-FRI-001",
    nombre: "Almacenamiento en Frío",
    descripcion: "Servicio de almacenamiento refrigerado para productos perecederos. Control de temperatura 24/7 con reportes diarios.",
    categoria: "Almacenaje",
    duracionMinutos: 1440,
    duracionTexto: "Por día",
    recursosRequeridos: ["Espacio en cámara fría", "Sistema de monitoreo", "Personal de almacén"],
    personalRequerido: 2,
    costoBase: 35,
    precioBase: 55,
    margenBase: 57.1,
    unidadCobro: "por tarima/día",
    requiereAgenda: true,
    disponibilidad: "24/7",
    anticipacionMinima: "48 horas",
    activo: true,
    destacado: true,
    serviciosMes: 120,
    calificacion: 4.9,
  },
  {
    id: "scat-004",
    codigo: "MAN-CARGA-001",
    nombre: "Maniobras de Carga/Descarga",
    descripcion: "Servicio de carga y descarga de mercancía con personal capacitado.  Incluye equipo de manejo (patines, montacargas).",
    categoria: "Maniobras",
    duracionMinutos: 120,
    duracionTexto: "1-2 horas",
    recursosRequeridos: ["Montacargas", "Patines hidráulicos", "Personal de maniobras"],
    personalRequerido: 3,
    costoBase: 800,
    precioBase: 1200,
    margenBase: 50,
    unidadCobro: "por servicio",
    requiereAgenda: true,
    disponibilidad: "Lunes a Viernes, 8:00 AM - 6:00 PM",
    anticipacionMinima: "4 horas",
    activo: true,
    destacado: false,
    serviciosMes: 35,
    calificacion: 4.5,
  },
  {
    id: "scat-005",
    codigo: "CONS-LOG-001",
    nombre: "Consultoría Logística",
    descripcion: "Asesoría especializada para optimización de cadena de suministro, rutas y costos de distribución.",
    categoria: "Consultoría",
    duracionMinutos: 60,
    duracionTexto: "1 hora",
    recursosRequeridos: ["Consultor especializado", "Herramientas de análisis"],
    personalRequerido: 1,
    costoBase: 500,
    precioBase: 850,
    margenBase: 70,
    unidadCobro: "por hora",
    requiereAgenda: true,
    disponibilidad: "Lunes a Viernes, 9:00 AM - 5:00 PM",
    anticipacionMinima: "72 horas",
    activo: true,
    destacado: false,
    serviciosMes: 8,
    calificacion: 4.9,
  },
  {
    id: "scat-006",
    codigo: "EMB-ESP-001",
    nombre: "Embalaje Especializado",
    descripcion: "Servicio de embalaje profesional para productos frágiles o que requieren protección especial durante el transporte.",
    categoria: "Maniobras",
    duracionMinutos: 90,
    duracionTexto: "1-1.5 horas",
    recursosRequeridos: ["Materiales de embalaje", "Personal capacitado", "Área de trabajo"],
    personalRequerido: 2,
    costoBase: 150,
    precioBase: 250,
    margenBase: 66.7,
    unidadCobro: "por tarima",
    requiereAgenda: true,
    disponibilidad: "Lunes a Viernes, 8:00 AM - 5:00 PM",
    anticipacionMinima: "24 horas",
    activo: true,
    destacado: false,
    serviciosMes: 22,
    calificacion: 4.7,
  },
];

export const resumenCatalogo = {
  totalProductos: 6,
  totalServicios: 6,
  productosActivos: 6,
  serviciosActivos: 6,
  margenPromedioProductos: 45.1,
  margenPromedioServicios: 56.7,
  ventasMesProductos: 3440,
  serviciosMes: 298,
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANZAS
// ─────────────────────────────────────────────────────────────────────────────

export interface MovimientoFinanciero {
  id: string;
  tipo: "ingreso" | "egreso";
  categoria: string;
  concepto: string;
  monto: number;
  fecha: string;
  estado: "completado" | "pendiente" | "programado";
  referencia?: string;
}

export interface ResumenPyL {
  periodo: string;
  ingresos: {
    ventas: number;
    servicios: number;
    otros: number;
    total: number;
  };
  costos: {
    costoVentas: number;
    costoServicios: number;
    total: number;
  };
  utilidadBruta: number;
  margenBruto: number;
  gastosOperativos: {
    nomina: number;
    renta: number;
    servicios: number;
    marketing: number;
    otros: number;
    total: number;
  };
  utilidadOperativa: number;
  margenOperativo: number;
  impuestos: number;
  utilidadNeta: number;
  margenNeto: number;
}

export interface ResumenBalance {
  periodo: string;
  activos: {
    circulante: {
      efectivo: number;
      cuentasPorCobrar: number;
      inventarios: number;
      total: number;
    };
    fijo: {
      equipoTransporte: number;
      mobiliario: number;
      equipoComputo: number;
      depreciacion: number;
      total: number;
    };
    total: number;
  };
  pasivos: {
    cortoplazo: {
      proveedores: number;
      cuentasPorPagar: number;
      impuestos: number;
      total: number;
    };
    largoplazo: {
      prestamos: number;
      total: number;
    };
    total: number;
  };
  capital: {
    capitalSocial: number;
    utilidadesRetenidas: number;
    utilidadEjercicio: number;
    total: number;
  };
}

export interface FlujoCaja {
  periodo: string;
  saldoInicial: number;
  entradas: {
    cobranzaClientes: number;
    otrosIngresos: number;
    total: number;
  };
  salidas: {
    pagoProveedores: number;
    nomina: number;
    gastosOperativos: number;
    impuestos: number;
    inversiones: number;
    total: number;
  };
  flujoNeto: number;
  saldoFinal: number;
}

export interface PrediccionFlujo {
  semana: string;
  ingresoProyectado: number;
  egresoProyectado: number;
  flujoProyectado: number;
  saldoProyectado: number;
  confianza: number;
}

export interface AlertaFinanciera {
  id: string;
  tipo: "anomalia" | "riesgo" | "oportunidad" | "recordatorio";
  prioridad: "alta" | "media" | "baja";
  titulo: string;
  mensaje: string;
  impacto?: number;
  accionSugerida: string;
  fecha: string;
}

export interface IndicadorFinanciero {
  nombre: string;
  valor: number;
  unidad: string;
  variacion: number;
  tendencia: "subiendo" | "bajando" | "estable";
  saludable: boolean;
}

export const resumenPyL: ResumenPyL = {
  periodo: "Noviembre 2025",
  ingresos: {
    ventas: 892000,
    servicios: 156000,
    otros: 12000,
    total: 1060000,
  },
  costos: {
    costoVentas: 534000,
    costoServicios: 62000,
    total: 596000,
  },
  utilidadBruta: 464000,
  margenBruto: 43.8,
  gastosOperativos: {
    nomina: 185000,
    renta: 45000,
    servicios: 18000,
    marketing: 25000,
    otros: 32000,
    total: 305000,
  },
  utilidadOperativa: 159000,
  margenOperativo: 15.0,
  impuestos: 47700,
  utilidadNeta: 111300,
  margenNeto: 10.5,
};

export const resumenBalance: ResumenBalance = {
  periodo: "Noviembre 2025",
  activos: {
    circulante: {
      efectivo: 485000,
      cuentasPorCobrar: 312000,
      inventarios: 156750,
      total: 953750,
    },
    fijo: {
      equipoTransporte: 850000,
      mobiliario: 125000,
      equipoComputo: 85000,
      depreciacion: -215000,
      total: 845000,
    },
    total: 1798750,
  },
  pasivos: {
    cortoplazo: {
      proveedores: 234000,
      cuentasPorPagar: 89000,
      impuestos: 47700,
      total: 370700,
    },
    largoplazo: {
      prestamos: 320000,
      total: 320000,
    },
    total: 690700,
  },
  capital: {
    capitalSocial: 500000,
    utilidadesRetenidas: 496750,
    utilidadEjercicio: 111300,
    total: 1108050,
  },
};

export const flujoCaja: FlujoCaja = {
  periodo: "Noviembre 2025",
  saldoInicial: 425000,
  entradas: {
    cobranzaClientes: 980000,
    otrosIngresos: 15000,
    total: 995000,
  },
  salidas: {
    pagoProveedores: 485000,
    nomina: 185000,
    gastosOperativos: 120000,
    impuestos: 52000,
    inversiones: 93000,
    total: 935000,
  },
  flujoNeto: 60000,
  saldoFinal: 485000,
};

export const prediccionesFlujo: PrediccionFlujo[] = [
  {
    semana: "Sem 1 Dic",
    ingresoProyectado: 245000,
    egresoProyectado: 198000,
    flujoProyectado: 47000,
    saldoProyectado: 532000,
    confianza: 92,
  },
  {
    semana: "Sem 2 Dic",
    ingresoProyectado: 268000,
    egresoProyectado: 312000,
    flujoProyectado: -44000,
    saldoProyectado: 488000,
    confianza: 88,
  },
  {
    semana: "Sem 3 Dic",
    ingresoProyectado: 315000,
    egresoProyectado: 245000,
    flujoProyectado: 70000,
    saldoProyectado: 558000,
    confianza: 85,
  },
  {
    semana: "Sem 4 Dic",
    ingresoProyectado: 420000,
    egresoProyectado: 380000,
    flujoProyectado: 40000,
    saldoProyectado: 598000,
    confianza: 78,
  },
];

export const alertasFinancieras: AlertaFinanciera[] = [
  {
    id: "af-001",
    tipo: "anomalia",
    prioridad: "alta",
    titulo: "Gasto inusual detectado",
    mensaje: "El gasto en 'Servicios' aumentó 45% vs el promedio de los últimos 3 meses.",
    impacto: -8500,
    accionSugerida: "Revisar facturas de servicios del período",
    fecha: "Hace 2 horas",
  },
  {
    id: "af-002",
    tipo: "riesgo",
    prioridad: "alta",
    titulo: "Flujo negativo proyectado",
    mensaje: "La semana 2 de diciembre muestra un flujo negativo de -$44,000.  Hay pagos programados que superan los ingresos esperados.",
    impacto: -44000,
    accionSugerida: "Acelerar cobranza o reprogramar pagos",
    fecha: "Hace 5 horas",
  },
  {
    id: "af-003",
    tipo: "oportunidad",
    prioridad: "media",
    titulo: "Excedente de efectivo",
    mensaje: "El saldo proyectado para fin de mes ($598k) supera el mínimo operativo.  Considera inversiones o pago anticipado de deuda.",
    impacto: 98000,
    accionSugerida: "Evaluar opciones de inversión a corto plazo",
    fecha: "Hace 1 día",
  },
  {
    id: "af-004",
    tipo: "recordatorio",
    prioridad: "media",
    titulo: "Pago de impuestos próximo",
    mensaje: "El pago de ISR e IVA vence el 17 de diciembre. Monto estimado: $52,000.",
    impacto: -52000,
    accionSugerida: "Reservar fondos para obligaciones fiscales",
    fecha: "Hace 1 día",
  },
  {
    id: "af-005",
    tipo: "anomalia",
    prioridad: "baja",
    titulo: "Margen bruto por debajo del objetivo",
    mensaje: "El margen bruto (43.8%) está 1.2% por debajo del objetivo mensual (45%).",
    accionSugerida: "Revisar costos de productos más vendidos",
    fecha: "Hace 2 días",
  },
];

export const indicadoresFinancieros: IndicadorFinanciero[] = [
  {
    nombre: "Liquidez Corriente",
    valor: 2.57,
    unidad: "veces",
    variacion: 5.2,
    tendencia: "subiendo",
    saludable: true,
  },
  {
    nombre: "Días de Cobranza",
    valor: 28,
    unidad: "días",
    variacion: -3,
    tendencia: "bajando",
    saludable: true,
  },
  {
    nombre: "Días de Pago",
    valor: 35,
    unidad: "días",
    variacion: 2,
    tendencia: "subiendo",
    saludable: true,
  },
  {
    nombre: "Rotación Inventario",
    valor: 3.7,
    unidad: "veces/mes",
    variacion: -0.3,
    tendencia: "bajando",
    saludable: true,
  },
  {
    nombre: "Endeudamiento",
    valor: 38.4,
    unidad: "%",
    variacion: -2.1,
    tendencia: "bajando",
    saludable: true,
  },
  {
    nombre: "ROE",
    valor: 10.0,
    unidad: "%",
    variacion: 1.5,
    tendencia: "subiendo",
    saludable: true,
  },
];

export const movimientosRecientes: MovimientoFinanciero[] = [
  {
    id: "mov-001",
    tipo: "ingreso",
    categoria: "Ventas",
    concepto: "Pago Restaurante Los Arcos - Factura #1842",
    monto: 45600,
    fecha: "Hoy, 10:30 AM",
    estado: "completado",
    referencia: "TRF-78542",
  },
  {
    id: "mov-002",
    tipo: "egreso",
    categoria: "Proveedores",
    concepto: "Pago Agrícola del Valle - Compra tomate",
    monto: 85000,
    fecha: "Hoy, 9:15 AM",
    estado: "completado",
    referencia: "TRF-78541",
  },
  {
    id: "mov-003",
    tipo: "ingreso",
    categoria: "Ventas",
    concepto: "Pago Cadena Súper Express - Factura #1838",
    monto: 128500,
    fecha: "Ayer, 4:20 PM",
    estado: "completado",
    referencia: "TRF-78539",
  },
  {
    id: "mov-004",
    tipo: "egreso",
    categoria: "Nómina",
    concepto: "Nómina quincenal - 2da Nov",
    monto: 92500,
    fecha: "Ayer, 12:00 PM",
    estado: "completado",
    referencia: "NOM-1124",
  },
  {
    id: "mov-005",
    tipo: "egreso",
    categoria: "Servicios",
    concepto: "Pago CFE - Sucursal Zapopan",
    monto: 8200,
    fecha: "25 Nov, 3:00 PM",
    estado: "completado",
    referencia: "SRV-4521",
  },
  {
    id: "mov-006",
    tipo: "ingreso",
    categoria: "Servicios",
    concepto: "Cobro servicio transporte - Hotel Presidente",
    monto: 15800,
    fecha: "25 Nov, 11:00 AM",
    estado: "completado",
    referencia: "TRF-78535",
  },
  {
    id: "mov-007",
    tipo: "egreso",
    categoria: "Impuestos",
    concepto: "Pago ISR provisional - Octubre",
    monto: 32000,
    fecha: "Programado: 17 Dic",
    estado: "programado",
    referencia: "IMP-1024",
  },
  {
    id: "mov-008",
    tipo: "egreso",
    categoria: "Proveedores",
    concepto: "Pago Lácteos del Bajío - Factura pendiente",
    monto: 28500,
    fecha: "Programado: 5 Dic",
    estado: "programado",
    referencia: "PROV-892",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CRM - CLIENTES
// ─────────────────────────────────────────────────────────────────────────────

export type EstadoCliente = "activo" | "inactivo" | "prospecto" | "en_riesgo";
export type SegmentoCliente = "vip" | "frecuente" | "ocasional" | "nuevo";
export type RiesgoChurn = "bajo" | "medio" | "alto";

export interface DireccionCliente {
  id: string;
  tipo: "fiscal" | "entrega" | "sucursal";
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  principal: boolean;
}

export interface ContactoCliente {
  id: string;
  nombre: string;
  puesto: string;
  telefono: string;
  email: string;
  principal: boolean;
}

export interface Cliente {
  id: string;
  nombre: string;
  nombreComercial: string;
  iniciales: string;
  rfc: string;
  tipo: "empresa" | "persona";
  segmento: SegmentoCliente;
  estado: EstadoCliente;
  // Contacto principal
  telefono: string;
  email: string;
  // Direcciones y contactos
  direcciones: DireccionCliente[];
  contactos: ContactoCliente[];
  // Historial
  fechaAlta: string;
  ultimaCompra: string;
  // Métricas
  totalCompras: number;
  comprasAnuales: number;
  ticketPromedio: number;
  frecuenciaCompra: number; // días entre compras
  // IA Insights
  ltv: number; // Lifetime Value
  riesgoChurn: RiesgoChurn;
  probabilidadChurn: number;
  potencialCrecimiento: number; // porcentaje
  productosRecomendados: string[];
  // Extras
  notas?: string;
  etiquetas: string[];
}

export interface InsightCliente {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: "churn" | "upsell" | "reactivacion" | "felicitacion";
  prioridad: "alta" | "media" | "baja";
  titulo: string;
  mensaje: string;
  accionSugerida: string;
  impactoPotencial?: number;
  fecha: string;
}

export interface ResumenCRM {
  totalClientes: number;
  clientesActivos: number;
  clientesNuevosMes: number;
  clientesEnRiesgo: number;
  ingresosMes: number;
  ticketPromedio: number;
  tasaRetencion: number;
  ltvPromedio: number;
}

export const clientes: Cliente[] = [
  {
    id: "cli-001",
    nombre: "Restaurante Los Arcos S.A.  de C.V.",
    nombreComercial: "Los Arcos Mariscos",
    iniciales: "LA",
    rfc: "RLA190523ABC",
    tipo: "empresa",
    segmento: "vip",
    estado: "activo",
    telefono: "+52 33 3612 4589",
    email: "compras@losarcosmariscos. com",
    direcciones: [
      {
        id: "dir-001",
        tipo: "fiscal",
        direccion: "Av. Vallarta 1234, Col. Americana",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44160",
        principal: true,
      },
      {
        id: "dir-002",
        tipo: "entrega",
        direccion: "Av. Patria 567, Col. Jardines Universidad",
        ciudad: "Zapopan",
        estado: "Jalisco",
        cp: "45110",
        principal: false,
      },
    ],
    contactos: [
      {
        id: "con-001",
        nombre: "María González",
        puesto: "Gerente de Compras",
        telefono: "+52 33 1234 5678",
        email: "maria.gonzalez@losarcosmariscos.com",
        principal: true,
      },
      {
        id: "con-002",
        nombre: "Roberto Sánchez",
        puesto: "Chef Ejecutivo",
        telefono: "+52 33 2345 6789",
        email: "chef@losarcosmariscos.com",
        principal: false,
      },
    ],
    fechaAlta: "2022-03-15",
    ultimaCompra: "2025-11-24",
    totalCompras: 89,
    comprasAnuales: 485000,
    ticketPromedio: 5450,
    frecuenciaCompra: 7,
    ltv: 1850000,
    riesgoChurn: "bajo",
    probabilidadChurn: 8,
    potencialCrecimiento: 25,
    productosRecomendados: ["Camarón Premium", "Pulpo", "Filete de Pescado"],
    etiquetas: ["VIP", "Pago puntual", "Alto volumen"],
  },
  {
    id: "cli-002",
    nombre: "Cadena Comercial Súper Express S.A.",
    nombreComercial: "Súper Express",
    iniciales: "SE",
    rfc: "CCS180612XYZ",
    tipo: "empresa",
    segmento: "vip",
    estado: "activo",
    telefono: "+52 33 3698 7452",
    email: "proveedores@superexpress.com. mx",
    direcciones: [
      {
        id: "dir-003",
        tipo: "fiscal",
        direccion: "Blvd. Puerta de Hierro 4965, Col. Puerta de Hierro",
        ciudad: "Zapopan",
        estado: "Jalisco",
        cp: "45116",
        principal: true,
      },
      {
        id: "dir-004",
        tipo: "entrega",
        direccion: "CEDIS Norte - Carretera a Saltillo Km 12",
        ciudad: "Zapopan",
        estado: "Jalisco",
        cp: "45200",
        principal: false,
      },
    ],
    contactos: [
      {
        id: "con-003",
        nombre: "Luis Ramírez",
        puesto: "Director de Compras",
        telefono: "+52 33 3698 7453",
        email: "luis.ramirez@superexpress.com.mx",
        principal: true,
      },
    ],
    fechaAlta: "2021-08-20",
    ultimaCompra: "2025-11-25",
    totalCompras: 156,
    comprasAnuales: 1250000,
    ticketPromedio: 8012,
    frecuenciaCompra: 5,
    ltv: 4500000,
    riesgoChurn: "bajo",
    probabilidadChurn: 5,
    potencialCrecimiento: 15,
    productosRecomendados: ["Aguacate Hass", "Tomate Orgánico", "Mango Ataulfo"],
    etiquetas: ["VIP", "Cadena", "Contrato anual"],
  },
  {
    id: "cli-003",
    nombre: "Hotel Presidente Intercontinental",
    nombreComercial: "Hotel Presidente GDL",
    iniciales: "HP",
    rfc: "HPI150820DEF",
    tipo: "empresa",
    segmento: "frecuente",
    estado: "activo",
    telefono: "+52 33 3678 1234",
    email: "alimentos@hotelpresidente.mx",
    direcciones: [
      {
        id: "dir-005",
        tipo: "fiscal",
        direccion: "Av.  López Mateos Sur 2500",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44500",
        principal: true,
      },
    ],
    contactos: [
      {
        id: "con-004",
        nombre: "Patricia Hernández",
        puesto: "Jefa de Alimentos y Bebidas",
        telefono: "+52 33 3678 1235",
        email: "patricia.hernandez@hotelpresidente. mx",
        principal: true,
      },
    ],
    fechaAlta: "2023-01-10",
    ultimaCompra: "2025-11-20",
    totalCompras: 45,
    comprasAnuales: 320000,
    ticketPromedio: 7111,
    frecuenciaCompra: 12,
    ltv: 890000,
    riesgoChurn: "bajo",
    probabilidadChurn: 12,
    potencialCrecimiento: 35,
    productosRecomendados: ["Queso Oaxaca", "Crema Premium", "Frutas Selectas"],
    etiquetas: ["Hotelería", "Eventos"],
  },
  {
    id: "cli-004",
    nombre: "Tacos El Güero",
    nombreComercial: "Tacos El Güero",
    iniciales: "TG",
    rfc: "GUMA850612ABC",
    tipo: "persona",
    segmento: "frecuente",
    estado: "en_riesgo",
    telefono: "+52 33 1598 7532",
    email: "tacosguero@gmail.com",
    direcciones: [
      {
        id: "dir-006",
        tipo: "entrega",
        direccion: "Calle Independencia 456, Col. Centro",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44100",
        principal: true,
      },
    ],
    contactos: [
      {
        id: "con-005",
        nombre: "Juan Gutiérrez",
        puesto: "Propietario",
        telefono: "+52 33 1598 7532",
        email: "tacosguero@gmail.com",
        principal: true,
      },
    ],
    fechaAlta: "2022-06-15",
    ultimaCompra: "2025-10-28",
    totalCompras: 78,
    comprasAnuales: 95000,
    ticketPromedio: 1218,
    frecuenciaCompra: 10,
    ltv: 285000,
    riesgoChurn: "alto",
    probabilidadChurn: 72,
    potencialCrecimiento: 10,
    productosRecomendados: ["Carne para Bistec", "Tortilla", "Chile Serrano"],
    notas: "No ha comprado en 29 días.  Normalmente compra cada 10 días.",
    etiquetas: ["Taquería", "Alerta"],
  },
  {
    id: "cli-005",
    nombre: "Cafetería La Parroquia",
    nombreComercial: "La Parroquia Café",
    iniciales: "LP",
    rfc: "CLP200315GHI",
    tipo: "empresa",
    segmento: "ocasional",
    estado: "activo",
    telefono: "+52 33 3654 9871",
    email: "laparroquia. gdl@gmail.com",
    direcciones: [
      {
        id: "dir-007",
        tipo: "fiscal",
        direccion: "Av.  Chapultepec 120, Col. Americana",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44160",
        principal: true,
      },
    ],
    contactos: [
      {
        id: "con-006",
        nombre: "Ana Martínez",
        puesto: "Administradora",
        telefono: "+52 33 3654 9871",
        email: "laparroquia.gdl@gmail.com",
        principal: true,
      },
    ],
    fechaAlta: "2024-02-20",
    ultimaCompra: "2025-11-15",
    totalCompras: 12,
    comprasAnuales: 45000,
    ticketPromedio: 3750,
    frecuenciaCompra: 25,
    ltv: 135000,
    riesgoChurn: "medio",
    probabilidadChurn: 35,
    potencialCrecimiento: 45,
    productosRecomendados: ["Pan Artesanal", "Leche Premium", "Fruta de Temporada"],
    etiquetas: ["Cafetería", "Potencial"],
  },
  {
    id: "cli-006",
    nombre: "Comedores Industriales del Bajío",
    nombreComercial: "CIB Alimentos",
    iniciales: "CI",
    rfc: "CIB170425JKL",
    tipo: "empresa",
    segmento: "frecuente",
    estado: "activo",
    telefono: "+52 477 712 3456",
    email: "compras@cibalimentos.com",
    direcciones: [
      {
        id: "dir-008",
        tipo: "fiscal",
        direccion: "Blvd.  Delta 500, Parque Industrial",
        ciudad: "León",
        estado: "Guanajuato",
        cp: "37545",
        principal: true,
      },
      {
        id: "dir-009",
        tipo: "entrega",
        direccion: "Planta Silao - Carr. Silao-León Km 5",
        ciudad: "Silao",
        estado: "Guanajuato",
        cp: "36100",
        principal: false,
      },
      {
        id: "dir-010",
        tipo: "entrega",
        direccion: "Planta Irapuato - Zona Industrial",
        ciudad: "Irapuato",
        estado: "Guanajuato",
        cp: "36541",
        principal: false,
      },
    ],
    contactos: [
      {
        id: "con-007",
        nombre: "Fernando López",
        puesto: "Gerente de Operaciones",
        telefono: "+52 477 712 3457",
        email: "fernando.lopez@cibalimentos.com",
        principal: true,
      },
      {
        id: "con-008",
        nombre: "Sandra Ruiz",
        puesto: "Compras",
        telefono: "+52 477 712 3458",
        email: "sandra.ruiz@cibalimentos.com",
        principal: false,
      },
    ],
    fechaAlta: "2023-05-10",
    ultimaCompra: "2025-11-22",
    totalCompras: 67,
    comprasAnuales: 580000,
    ticketPromedio: 8657,
    frecuenciaCompra: 8,
    ltv: 1450000,
    riesgoChurn: "bajo",
    probabilidadChurn: 10,
    potencialCrecimiento: 30,
    productosRecomendados: ["Arroz Grano Largo", "Frijol Negro", "Pollo Entero"],
    etiquetas: ["Comedores", "Volumen", "Múltiples entregas"],
  },
  {
    id: "cli-007",
    nombre: "Pastelería Francesa Monique",
    nombreComercial: "Monique Pâtisserie",
    iniciales: "PM",
    rfc: "PFM210830MNO",
    tipo: "empresa",
    segmento: "nuevo",
    estado: "activo",
    telefono: "+52 33 2587 4563",
    email: "pedidos@moniquepatisserie.com",
    direcciones: [
      {
        id: "dir-011",
        tipo: "fiscal",
        direccion: "Av. México 2456, Col. Ladrón de Guevara",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44600",
        principal: true,
      },
    ],
    contactos: [
      {
        id: "con-009",
        nombre: "Monique Dubois",
        puesto: "Chef Pastelera / Propietaria",
        telefono: "+52 33 2587 4563",
        email: "monique@moniquepatisserie.com",
        principal: true,
      },
    ],
    fechaAlta: "2025-09-15",
    ultimaCompra: "2025-11-23",
    totalCompras: 8,
    comprasAnuales: 32000,
    ticketPromedio: 4000,
    frecuenciaCompra: 10,
    ltv: 96000,
    riesgoChurn: "medio",
    probabilidadChurn: 28,
    potencialCrecimiento: 60,
    productosRecomendados: ["Mantequilla Premium", "Crema para Batir", "Frutas Finas"],
    etiquetas: ["Nuevo", "Pastelería", "Premium"],
  },
  {
    id: "cli-008",
    nombre: "Birriería Don Pedro",
    nombreComercial: "Birriería Don Pedro",
    iniciales: "DP",
    rfc: "PELM780520PQR",
    tipo: "persona",
    segmento: "ocasional",
    estado: "inactivo",
    telefono: "+52 33 1478 5236",
    email: "donpedro. birria@hotmail.com",
    direcciones: [
      {
        id: "dir-012",
        tipo: "entrega",
        direccion: "Mercado San Juan de Dios, Local 234",
        ciudad: "Guadalajara",
        estado: "Jalisco",
        cp: "44360",
        principal: true,
      },
    ],
    contactos: [
      {
        id: "con-010",
        nombre: "Pedro López",
        puesto: "Propietario",
        telefono: "+52 33 1478 5236",
        email: "donpedro.birria@hotmail. com",
        principal: true,
      },
    ],
    fechaAlta: "2022-11-20",
    ultimaCompra: "2025-08-10",
    totalCompras: 23,
    comprasAnuales: 28000,
    ticketPromedio: 1217,
    frecuenciaCompra: 20,
    ltv: 65000,
    riesgoChurn: "alto",
    probabilidadChurn: 85,
    potencialCrecimiento: 5,
    productosRecomendados: ["Carne para Birria", "Chile Guajillo", "Especias"],
    notas: "Sin actividad desde hace 3 meses.  Intentar contacto.",
    etiquetas: ["Inactivo", "Recuperar"],
  },
];

export const insightsClientes: InsightCliente[] = [
  {
    id: "ins-001",
    clienteId: "cli-004",
    clienteNombre: "Tacos El Güero",
    tipo: "churn",
    prioridad: "alta",
    titulo: "Riesgo de pérdida alto",
    mensaje: "No ha comprado en 29 días (su frecuencia normal es 10 días).  Probabilidad de abandono: 72%.",
    accionSugerida: "Llamar hoy para ofrecer descuento de reactivación del 10%",
    impactoPotencial: -95000,
    fecha: "Hace 2 horas",
  },
  {
    id: "ins-002",
    clienteId: "cli-008",
    clienteNombre: "Birriería Don Pedro",
    tipo: "reactivacion",
    prioridad: "alta",
    titulo: "Cliente inactivo 3+ meses",
    mensaje: "Sin compras desde agosto.  Era cliente frecuente con buen historial de pago.",
    accionSugerida: "Enviar promoción especial de reactivación con envío gratis",
    impactoPotencial: 28000,
    fecha: "Hace 5 horas",
  },
  {
    id: "ins-003",
    clienteId: "cli-001",
    clienteNombre: "Los Arcos Mariscos",
    tipo: "upsell",
    prioridad: "media",
    titulo: "Oportunidad de venta cruzada",
    mensaje: "Compra frecuentemente mariscos pero nunca ha pedido productos de línea premium (pulpo, langosta).",
    accionSugerida: "Ofrecer muestra gratis de Pulpo Premium en próximo pedido",
    impactoPotencial: 45000,
    fecha: "Hace 1 día",
  },
  {
    id: "ins-004",
    clienteId: "cli-007",
    clienteNombre: "Monique Pâtisserie",
    tipo: "upsell",
    prioridad: "media",
    titulo: "Cliente nuevo con alto potencial",
    mensaje: "Potencial de crecimiento del 60%.  Perfil similar a clientes que consumen 3x más en 6 meses.",
    accionSugerida: "Agendar visita para presentar catálogo completo de lácteos premium",
    impactoPotencial: 58000,
    fecha: "Hace 1 día",
  },
  {
    id: "ins-005",
    clienteId: "cli-002",
    clienteNombre: "Súper Express",
    tipo: "felicitacion",
    prioridad: "baja",
    titulo: "Aniversario de cliente",
    mensaje: "Cumple 4 años como cliente el próximo mes. Es tu segundo cliente más importante (LTV: $4. 5M).",
    accionSugerida: "Preparar reconocimiento y beneficio exclusivo por lealtad",
    impactoPotencial: 125000,
    fecha: "Hace 2 días",
  },
  {
    id: "ins-006",
    clienteId: "cli-005",
    clienteNombre: "La Parroquia Café",
    tipo: "upsell",
    prioridad: "media",
    titulo: "Incrementar frecuencia",
    mensaje: "Compra cada 25 días pero su perfil indica potencial para compras semanales.",
    accionSugerida: "Ofrecer plan de entregas programadas con 5% de descuento",
    impactoPotencial: 35000,
    fecha: "Hace 2 días",
  },
];

export const resumenCRM: ResumenCRM = {
  totalClientes: 8,
  clientesActivos: 6,
  clientesNuevosMes: 1,
  clientesEnRiesgo: 2,
  ingresosMes: 892000,
  ticketPromedio: 5890,
  tasaRetencion: 94.5,
  ltvPromedio: 1158000,
};