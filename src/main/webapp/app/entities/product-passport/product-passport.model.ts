import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';

export interface IProductPassport {
  id: number;
  passportData?: string | null;
  version?: number | null;
  createdDate?: dayjs.Dayjs | null;
  product?: Pick<IProduct, 'id' | 'sku'> | null;
}

export type NewProductPassport = Omit<IProductPassport, 'id'> & { id: null };
