export interface ISupplier {
  id: number;
  companyName?: string | null;
  contactEmail?: string | null;
  industry?: string | null;
  tier?: number | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
