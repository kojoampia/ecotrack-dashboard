import dayjs from 'dayjs/esm';

import { IEmissionRecord, NewEmissionRecord } from './emission-record.model';

export const sampleWithRequiredData: IEmissionRecord = {
  id: 31501,
  scope: 'SCOPE_1',
  carbonGrams: 25053,
};

export const sampleWithPartialData: IEmissionRecord = {
  id: 23255,
  scope: 'SCOPE_2',
  carbonGrams: 3676,
  source: 'ha',
  verified: true,
};

export const sampleWithFullData: IEmissionRecord = {
  id: 19445,
  scope: 'SCOPE_1',
  carbonGrams: 11048,
  dateRecorded: dayjs('2026-01-05'),
  source: 'stealthily',
  notes: 'qua neighbourhood',
  verified: false,
};

export const sampleWithNewData: NewEmissionRecord = {
  scope: 'SCOPE_2',
  carbonGrams: 15264,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
