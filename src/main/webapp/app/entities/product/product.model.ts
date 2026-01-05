import dayjs from 'dayjs/esm';
import { ISupplier } from 'app/entities/supplier/supplier.model';

export interface IProduct {
  id: number;
  name?: string | null;
  sku?: string | null;
  description?: string | null;
  createdDate?: dayjs.Dayjs | null;
  supplier?: Pick<ISupplier, 'id' | 'companyName'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
