import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';
import { Scope } from 'app/entities/enumerations/scope.model';

export interface IEmissionRecord {
  id: number;
  scope?: keyof typeof Scope | null;
  carbonGrams?: number | null;
  dateRecorded?: dayjs.Dayjs | null;
  source?: string | null;
  notes?: string | null;
  verified?: boolean | null;
  product?: Pick<IProduct, 'id' | 'name'> | null;
}

export type NewEmissionRecord = Omit<IEmissionRecord, 'id'> & { id: null };
