import dayjs from 'dayjs/esm';

import { IProductPassport, NewProductPassport } from './product-passport.model';

export const sampleWithRequiredData: IProductPassport = {
  id: 26089,
};

export const sampleWithPartialData: IProductPassport = {
  id: 14142,
};

export const sampleWithFullData: IProductPassport = {
  id: 15075,
  passportData: '../fake-data/blob/hipster.txt',
  version: 18565,
  createdDate: dayjs('2026-01-05T01:29'),
};

export const sampleWithNewData: NewProductPassport = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
