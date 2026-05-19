export type BusinessIndustry =
  | "sustainable_technology"
  | "retail"
  | "fashion"
  | "logistics"
  | "b2b_commerce";

export type TeamRole = "owner" | "admin" | "editor" | "viewer";

export type TeamMemberStatus = "active" | "pending" | "disabled";

export type ConnectedServiceCategory = "storage" | "finance" | "communication" | "commerce";

export type SettingsAlertType = "info" | "warning" | "success";

export type SettingsIconName =
  | "archive"
  | "bell"
  | "cloud"
  | "credit-card"
  | "database"
  | "mail"
  | "message-square"
  | "shield"
  | "users"
  | "zap";

export interface BusinessProfile {
  id: string;
  companyName: string;
  industry: BusinessIndustry;
  website: string;
  description: string;
  logoUrl?: string;
  logoAlt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatarUrl?: string;
  status: TeamMemberStatus;
}

export interface ConnectedService {
  id: string;
  name: string;
  description: string;
  iconName: SettingsIconName;
  connected: boolean;
  category: ConnectedServiceCategory;
}

export interface UsageMetric {
  id: string;
  label: string;
  value: string;
  limit: string;
  unit: string;
  percentage: number;
  iconName: SettingsIconName;
}

export interface SettingsAlert {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  type: SettingsAlertType;
}
