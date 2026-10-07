import type { DailySale, HomeUserIdentity } from "@/types/home.types";

export const dashboardIdentityMock: HomeUserIdentity = {
  name: "María López",
  businessName: "Artesanías Lupita",
  initials: "ML",
};

export const weeklySalesMock: DailySale[] = [
  { day: "Lun", value: 650 },
  { day: "Mar", value: 850 },
  { day: "Mié", value: 720 },
  { day: "Jue", value: 970 },
  { day: "Vie", value: 1150 },
  { day: "Sáb", value: 1350 },
  { day: "Dom", value: 1760, isCurrent: true },
];

export const weeklySalesChangeMock = 12.4;
