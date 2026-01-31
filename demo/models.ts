export interface EmissionRecord {
  id: number;
  scope: 'SCOPE_1' | 'SCOPE_2' | 'SCOPE_3';
  carbonGrams: number;
  dateRecorded: string;
  source: string;
  confidenceScore: number;
  tenantId: string;
}

export interface TenantMetadata {
  id: string;
  name: string;
  industry: string;
  region: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
