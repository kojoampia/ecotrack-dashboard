import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 28710,
  name: 'madly toward',
  sku: 'fatally apud outfielder',
};

export const sampleWithPartialData: IProduct = {
  id: 7810,
  name: 'darling',
  sku: 'serene unnecessarily',
  createdDate: dayjs('2026-01-05T06:03'),
};

export const sampleWithFullData: IProduct = {
  id: 19900,
  name: 'patronize persimmon amid',
  sku: 'fairly evenly',
  description: 'lean',
  createdDate: dayjs('2026-01-05T18:53'),
};

export const sampleWithNewData: NewProduct = {
  name: 'chief',
  sku: 'duh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
