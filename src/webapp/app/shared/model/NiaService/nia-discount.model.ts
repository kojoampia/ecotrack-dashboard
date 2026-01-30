import { NiaDiscountType } from 'app/shared/model/enumerations/nia-discount-type.model';

export interface INiaDiscount {
  id?: string;
  discountTypeCode?: NiaDiscountType;
  rate?: number;
  amount?: number;
  niaMotorPolicyId?: string;
}

export class NiaDiscount implements INiaDiscount {
  constructor(
    public id?: string,
    public discountTypeCode?: NiaDiscountType,
    public rate?: number,
    public amount?: number,
    public niaMotorPolicyId?: string
  ) {}
}
