import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 14485,
  name: 'retention tense upgrade',
  sku: 'nosedive famously darling',
};

export const sampleWithPartialData: IProduct = {
  id: 16865,
  name: 'unnecessarily forenenst before',
  sku: 'powerful toward nag',
  createdDate: dayjs('2026-01-05T02:32'),
};

export const sampleWithFullData: IProduct = {
  id: 11079,
  name: 'parliament',
  sku: 'so gladly',
  description: 'sympathetically',
  category: 'sweatshirt for',
  unitOfMeasure: 'lyre',
  totalCarbonFootprint: 12119.45,
  createdDate: dayjs('2026-01-05T12:20'),
  lastModifiedDate: dayjs('2026-01-05T18:21'),
};

export const sampleWithNewData: NewProduct = {
  name: 'nor after',
  sku: 'ack',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
