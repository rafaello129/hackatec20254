import type {
  AccountingEntry,
  CashflowPoint,
  CooperativeFinancialRecord,
  ExpenseBreakdownItem,
  FinanceAlert,
  FinanceKpi,
  FinanceSummary,
  Invoice,
  MoneyMovement,
  MoneyPeriod,
  ReceivableItem,
  SalesExpensePoint,
} from "@/types/finance.types";

export const financeSummaryMock: FinanceSummary = {
  period: {
    label: "Octubre 2026",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
  },
  totalRevenue: 18450,
  totalExpenses: 7280,
  netProfit: 11170,
  availableCashflow: 11170,
  accountsReceivable: 1250,
  accountsPayable: 0,
  cooperativeRevenue: 0,
  pendingInvoices: 2,
  overdueInvoices: 0,
};

export const financeKpisMock: FinanceKpi[] = [
  {
    id: "sales",
    label: "Ventas",
    value: 18450,
    format: "currency",
    hint: "Este mes",
    trend: "up",
  },
  {
    id: "expenses",
    label: "Gastos",
    value: 7280,
    format: "currency",
    hint: "Este mes",
    trend: "stable",
  },
  {
    id: "profit",
    label: "Te quedó",
    value: 11170,
    format: "currency",
    hint: "Ventas menos gastos registrados",
    trend: "up",
  },
  {
    id: "receivable",
    label: "Por cobrar",
    value: 1250,
    format: "currency",
    hint: "2 pagos pendientes",
    trend: "stable",
  },
];

export const cashflowPointsMock: CashflowPoint[] = [
  { period: "Ago", revenue: 15200, expenses: 6800, netFlow: 8400 },
  { period: "Sep", revenue: 16980, expenses: 7150, netFlow: 9830 },
  { period: "Oct", revenue: 18450, expenses: 7280, netFlow: 11170 },
];

export const moneyMovementsMock: MoneyMovement[] = [
  {
    id: "money-001",
    date: "2026-10-06",
    type: "income",
    amount: 780,
    category: "sale",
    description: "Venta — Canasta tejida con cuentas",
    detail: "Venta en tienda",
    source: "sale",
    relatedProductId: "inv-001",
  },
  {
    id: "money-002",
    date: "2026-10-06",
    type: "income",
    amount: 620,
    category: "sale",
    description: "Venta — Bolsa bordada artesanal",
    detail: "Venta por WhatsApp",
    source: "sale",
    relatedProductId: "inv-002",
    relatedCustomerId: "cust-001",
  },
  {
    id: "money-003",
    date: "2026-10-06",
    type: "expense",
    amount: 1400,
    category: "products",
    description: "Compra de productos",
    detail: "Reposición con Taller Manos del Mayab",
    source: "manual",
  },
  {
    id: "money-004",
    date: "2026-10-05",
    type: "income",
    amount: 900,
    category: "sale",
    description: "Venta — Tazones de cerámica",
    detail: "2 piezas vendidas",
    source: "sale",
    relatedProductId: "inv-003",
  },
  {
    id: "money-005",
    date: "2026-10-05",
    type: "expense",
    amount: 500,
    category: "services",
    description: "Internet",
    detail: "Servicio mensual del negocio",
    source: "manual",
  },
  {
    id: "money-006",
    date: "2026-10-04",
    type: "income",
    amount: 1620,
    category: "sale",
    description: "Venta — Floreros de barro",
    detail: "Pedido de 2 piezas",
    source: "sale",
    relatedProductId: "inv-004",
  },
  {
    id: "money-007",
    date: "2026-10-04",
    type: "expense",
    amount: 850,
    category: "materials",
    description: "Compra de materiales",
    detail: "Telas, hilo y empaques",
    source: "manual",
  },
  {
    id: "money-008",
    date: "2026-10-03",
    type: "income",
    amount: 1640,
    category: "sale",
    description: "Venta — Caminos de mesa",
    detail: "2 piezas vendidas",
    source: "sale",
    relatedProductId: "inv-005",
  },
  {
    id: "money-009",
    date: "2026-10-03",
    type: "expense",
    amount: 350,
    category: "transport",
    description: "Transporte",
    detail: "Entrega y recolección de mercancía",
    source: "manual",
  },
  {
    id: "money-010",
    date: "2026-10-02",
    type: "income",
    amount: 2100,
    category: "sale",
    description: "Venta — Muñecas artesanales",
    detail: "Pedido para regalos",
    source: "sale",
    relatedProductId: "inv-006",
  },
  {
    id: "money-011",
    date: "2026-10-02",
    type: "expense",
    amount: 600,
    category: "marketing",
    description: "Publicidad en redes",
    detail: "Promoción de productos del mes",
    source: "manual",
  },
  {
    id: "money-012",
    date: "2026-10-01",
    type: "income",
    amount: 10790,
    category: "sale",
    description: "Ventas acumuladas del día",
    detail: "Ventas en tienda y pedidos",
    source: "sale",
  },
  {
    id: "money-013",
    date: "2026-10-01",
    type: "expense",
    amount: 3580,
    category: "rent",
    description: "Renta y servicios del local",
    detail: "Renta, electricidad y otros gastos fijos",
    source: "manual",
  },
];

export const receivablesMock: ReceivableItem[] = [
  {
    id: "recv-001",
    customerId: "cust-001",
    customerName: "Ana López",
    amount: 620,
    dueDate: "2026-10-02",
    daysPending: 4,
  },
  {
    id: "recv-002",
    customerId: "cust-002",
    customerName: "Casa Ceiba",
    amount: 630,
    dueDate: "2026-09-28",
    daysPending: 8,
  },
];

export const expenseBreakdownMock: ExpenseBreakdownItem[] = [
  { category: "rent", label: "Renta y local", amount: 3580 },
  { category: "products", label: "Productos o mercancía", amount: 1400 },
  { category: "materials", label: "Materiales", amount: 850 },
  { category: "marketing", label: "Publicidad", amount: 600 },
  { category: "services", label: "Servicios", amount: 500 },
  { category: "transport", label: "Transporte", amount: 350 },
];

export const salesExpenseSeriesMock: Record<MoneyPeriod, SalesExpensePoint[]> = {
  week: [
    { label: "Lun", sales: 650, expenses: 220 },
    { label: "Mar", sales: 780, expenses: 160 },
    { label: "Mié", sales: 950, expenses: 300 },
    { label: "Jue", sales: 1020, expenses: 240 },
    { label: "Vie", sales: 880, expenses: 180 },
    { label: "Sáb", sales: 1120, expenses: 450 },
    { label: "Dom", sales: 1320, expenses: 360 },
  ],
  month: [
    { label: "1–7", sales: 4200, expenses: 1700 },
    { label: "8–14", sales: 4700, expenses: 1800 },
    { label: "15–21", sales: 4550, expenses: 1980 },
    { label: "22–31", sales: 5000, expenses: 1800 },
  ],
  quarter: [
    { label: "Ago", sales: 15200, expenses: 6800 },
    { label: "Sep", sales: 16980, expenses: 7150 },
    { label: "Oct", sales: 18450, expenses: 7280 },
  ],
};

export const accountingEntriesMock: AccountingEntry[] = moneyMovementsMock
  .slice(0, 8)
  .map((movement, index) => ({
    id: `acc-${String(index + 1).padStart(4, "0")}`,
    date: movement.date,
    type: movement.type,
    concept: movement.description,
    category:
      movement.category === "sale"
        ? "Ventas"
        : expenseBreakdownMock.find((item) => item.category === movement.category)?.label ??
          "Otros",
    amount: movement.amount,
    status: "registered",
    sourceModule: movement.type === "income" ? "Clientes" : "Finanzas",
    relatedEntity: movement.detail ?? "Movimiento del negocio",
    notes: movement.detail ?? "",
  }));

export const invoicesMock: Invoice[] = [
  {
    id: "inv-fin-001",
    folio: "FAC-2026-001",
    customerName: "Ana López",
    issueDate: "2026-10-02",
    dueDate: "2026-10-10",
    subtotal: 534.48,
    taxes: 85.52,
    total: 620,
    status: "pending",
    paymentMethod: "pending",
    notes: "Pago pendiente por bolsa bordada artesanal.",
    items: [
      {
        id: "invoice-item-1",
        description: "Bolsa bordada artesanal",
        quantity: 1,
        unitPrice: 534.48,
        total: 534.48,
      },
    ],
  },
  {
    id: "inv-fin-002",
    folio: "FAC-2026-002",
    customerName: "Casa Ceiba",
    issueDate: "2026-09-28",
    dueDate: "2026-10-08",
    subtotal: 543.1,
    taxes: 86.9,
    total: 630,
    status: "pending",
    paymentMethod: "pending",
    notes: "Pago pendiente por pedido artesanal.",
    items: [
      {
        id: "invoice-item-2",
        description: "Pedido de artesanías",
        quantity: 1,
        unitPrice: 543.1,
        total: 543.1,
      },
    ],
  },
  {
    id: "inv-fin-003",
    folio: "FAC-2026-003",
    customerName: "Lucía Pérez",
    issueDate: "2026-10-05",
    dueDate: "2026-10-05",
    subtotal: 775.86,
    taxes: 124.14,
    total: 900,
    status: "paid",
    paymentMethod: "cash",
    notes: "Venta pagada en tienda.",
    items: [
      {
        id: "invoice-item-3",
        description: "Tazones de cerámica",
        quantity: 2,
        unitPrice: 387.93,
        total: 775.86,
      },
    ],
  },
];

export const financeAlertsMock: FinanceAlert[] = [
  {
    id: "alert-1001",
    severity: "medium",
    title: "Tienes pagos pendientes",
    description: "Hay 2 clientes que todavía no han pagado.",
    recommendation: "Revisa a quién conviene enviar un recordatorio.",
    relatedEntity: "Pagos pendientes",
    impactAmount: 1250,
  },
  {
    id: "alert-1002",
    severity: "low",
    title: "La renta es tu gasto más alto",
    description: "Renta y local concentran la mayor parte de los gastos registrados.",
    recommendation: "Úsalo como referencia para planear el siguiente mes.",
    relatedEntity: "Renta y local",
    impactAmount: 3580,
  },
];

export const cooperativeFinancialRecordsMock: CooperativeFinancialRecord[] = [];
