export interface ISupplier {
  id: number;
  companyName?: string | null;
  contactEmail?: string | null;
  industry?: string | null;
  tier?: number | null;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
