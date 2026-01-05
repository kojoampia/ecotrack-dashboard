import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 27480,
  companyName: 'very healthily um',
  contactEmail: 'aw why',
};

export const sampleWithPartialData: ISupplier = {
  id: 12491,
  companyName: 'oh',
  contactEmail: 'password',
  industry: 'intubate abaft rumour',
  tier: 8107,
};

export const sampleWithFullData: ISupplier = {
  id: 31919,
  companyName: 'hungrily indeed whether',
  contactEmail: 'political',
  industry: 'though equal eventually',
  tier: 30954,
};

export const sampleWithNewData: NewSupplier = {
  companyName: 'gadzooks',
  contactEmail: 'yippee sedately stanch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
