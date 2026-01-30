import { EDiscountTypeCode } from '../enumerations/nia-enumerations.model';

export interface INiaDiscount {
  id?: string;
  discountTypeCode?: EDiscountTypeCode;
  rate?: number;
  amount?: number;
}

export class NiaDiscount implements INiaDiscount {
  constructor(public id?: string, public discountTypeCode?: EDiscountTypeCode, public rate?: number, public amount?: number) {}
}
