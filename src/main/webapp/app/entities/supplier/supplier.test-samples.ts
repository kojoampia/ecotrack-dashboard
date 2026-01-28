import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 5415,
  companyName: 'but geology cohabit',
  contactEmail: 'flutter joshingly ick',
};

export const sampleWithPartialData: ISupplier = {
  id: 30838,
  companyName: 'pig',
  contactEmail: 'aside outweigh understand',
  industry: 'if',
  tier: 28286,
  address: 'dimly',
  phone: '818.345.5868 x9738',
};

export const sampleWithFullData: ISupplier = {
  id: 12845,
  companyName: 'robust disassemble',
  contactEmail: 'cloudburst',
  industry: 'near',
  tier: 25080,
  address: 'sedately stanch',
  phone: '770.881.3426 x61462',
  website: 'canst loudly',
};

export const sampleWithNewData: NewSupplier = {
  companyName: 'reprove checkbook tightly',
  contactEmail: 'hm',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
