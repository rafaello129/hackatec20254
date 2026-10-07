import type { CustomerPurchase } from "@/types/customer.types";

export const customerPurchasesMock: CustomerPurchase[] = [
  {
    id: "purchase-001",
    customerId: "cust-001",
    date: "2026-07-14",
    total: 620,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 620 },
    ],
  },
  {
    id: "purchase-002",
    customerId: "cust-001",
    date: "2026-09-10",
    total: 780,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 780 },
    ],
  },
  {
    id: "purchase-003",
    customerId: "cust-001",
    date: "2026-09-25",
    total: 450,
    items: [
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 1, unitPrice: 450 },
    ],
  },
  {
    id: "purchase-004",
    customerId: "cust-001",
    date: "2026-10-06",
    total: 600,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 600 },
    ],
  },

  {
    id: "purchase-005",
    customerId: "cust-002",
    date: "2026-06-18",
    total: 360,
    items: [
      { productId: "art-004", name: "Portavasos tejidos", quantity: 2, unitPrice: 180 },
    ],
  },
  {
    id: "purchase-006",
    customerId: "cust-002",
    date: "2026-08-12",
    total: 390,
    items: [
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 1, unitPrice: 390 },
    ],
  },
  {
    id: "purchase-007",
    customerId: "cust-002",
    date: "2026-10-02",
    total: 430,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 430 },
    ],
  },

  {
    id: "purchase-008",
    customerId: "cust-003",
    date: "2026-01-16",
    total: 720,
    items: [
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 2, unitPrice: 360 },
    ],
  },
  {
    id: "purchase-009",
    customerId: "cust-003",
    date: "2026-04-21",
    total: 940,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 940 },
    ],
  },
  {
    id: "purchase-010",
    customerId: "cust-003",
    date: "2026-07-03",
    total: 810,
    items: [
      { productId: "art-005", name: "Florero de barro pintado", quantity: 1, unitPrice: 810 },
    ],
  },
  {
    id: "purchase-011",
    customerId: "cust-003",
    date: "2026-09-22",
    total: 1150,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 760 },
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 1, unitPrice: 390 },
    ],
  },
  {
    id: "purchase-012",
    customerId: "cust-003",
    date: "2026-10-01",
    total: 1000,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 610 },
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 1, unitPrice: 390 },
    ],
  },

  {
    id: "purchase-013",
    customerId: "cust-004",
    date: "2026-07-08",
    total: 310,
    items: [
      { productId: "art-006", name: "Muñeca artesanal de tela", quantity: 1, unitPrice: 310 },
    ],
  },
  {
    id: "purchase-014",
    customerId: "cust-004",
    date: "2026-09-08",
    total: 550,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 550 },
    ],
  },

  {
    id: "purchase-015",
    customerId: "cust-005",
    date: "2026-04-12",
    total: 760,
    items: [
      { productId: "art-007", name: "Camino de mesa bordado", quantity: 1, unitPrice: 760 },
    ],
  },
  {
    id: "purchase-016",
    customerId: "cust-005",
    date: "2026-06-30",
    total: 520,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 520 },
    ],
  },
  {
    id: "purchase-017",
    customerId: "cust-005",
    date: "2026-08-19",
    total: 680,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 680 },
    ],
  },

  {
    id: "purchase-018",
    customerId: "cust-006",
    date: "2026-05-04",
    total: 620,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 620 },
    ],
  },
  {
    id: "purchase-019",
    customerId: "cust-006",
    date: "2026-08-19",
    total: 700,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 700 },
    ],
  },

  {
    id: "purchase-020",
    customerId: "cust-007",
    date: "2026-02-14",
    total: 980,
    items: [
      { productId: "art-005", name: "Florero de barro pintado", quantity: 2, unitPrice: 490 },
    ],
  },
  {
    id: "purchase-021",
    customerId: "cust-007",
    date: "2026-05-30",
    total: 1040,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 2, unitPrice: 520 },
    ],
  },
  {
    id: "purchase-022",
    customerId: "cust-007",
    date: "2026-07-26",
    total: 820,
    items: [
      { productId: "art-007", name: "Camino de mesa bordado", quantity: 1, unitPrice: 820 },
    ],
  },

  {
    id: "purchase-023",
    customerId: "cust-008",
    date: "2026-10-03",
    total: 540,
    items: [
      { productId: "art-003", name: "Tazón de cerámica hecho a mano", quantity: 1, unitPrice: 540 },
    ],
  },
  {
    id: "purchase-024",
    customerId: "cust-009",
    date: "2026-10-01",
    total: 720,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 720 },
    ],
  },
  {
    id: "purchase-025",
    customerId: "cust-010",
    date: "2026-10-05",
    total: 430,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 430 },
    ],
  },

  {
    id: "purchase-026",
    customerId: "cust-011",
    date: "2026-08-27",
    total: 760,
    items: [
      { productId: "art-005", name: "Florero de barro pintado", quantity: 1, unitPrice: 760 },
    ],
  },
  {
    id: "purchase-027",
    customerId: "cust-011",
    date: "2026-09-30",
    total: 420,
    items: [
      { productId: "art-004", name: "Portavasos tejidos", quantity: 2, unitPrice: 210 },
    ],
  },
  {
    id: "purchase-028",
    customerId: "cust-011",
    date: "2026-10-04",
    total: 550,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 550 },
    ],
  },

  {
    id: "purchase-029",
    customerId: "cust-012",
    date: "2026-03-18",
    total: 840,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 840 },
    ],
  },
  {
    id: "purchase-030",
    customerId: "cust-012",
    date: "2026-06-20",
    total: 760,
    items: [
      { productId: "art-007", name: "Camino de mesa bordado", quantity: 1, unitPrice: 760 },
    ],
  },
  {
    id: "purchase-031",
    customerId: "cust-012",
    date: "2026-09-15",
    total: 690,
    items: [
      { productId: "art-001", name: "Bolsa bordada artesanal", quantity: 1, unitPrice: 690 },
    ],
  },
  {
    id: "purchase-032",
    customerId: "cust-012",
    date: "2026-10-05",
    total: 890,
    items: [
      { productId: "art-002", name: "Canasta tejida con cuentas", quantity: 1, unitPrice: 890 },
    ],
  },
];
