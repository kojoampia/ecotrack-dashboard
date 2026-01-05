import dayjs from 'dayjs/esm';

import { IEmissionRecord, NewEmissionRecord } from './emission-record.model';

export const sampleWithRequiredData: IEmissionRecord = {
  id: 2739,
  scope: 'SCOPE_1',
  carbonGrams: 31501,
};

export const sampleWithPartialData: IEmissionRecord = {
  id: 18215,
  scope: 'SCOPE_1',
  carbonGrams: 25709,
  dateRecorded: dayjs('2026-01-05'),
};

export const sampleWithFullData: IEmissionRecord = {
  id: 23255,
  scope: 'SCOPE_2',
  carbonGrams: 3676,
  dateRecorded: dayjs('2026-01-05'),
  source: 'cornet',
};

export const sampleWithNewData: NewEmissionRecord = {
  scope: 'SCOPE_2',
  carbonGrams: 1198,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
