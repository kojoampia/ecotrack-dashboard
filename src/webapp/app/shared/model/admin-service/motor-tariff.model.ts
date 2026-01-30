import { Moment } from 'moment';
import { IBenefit } from 'app/shared/model/admin-service/benefit.model';
import { IDiscount } from 'app/shared/model/admin-service/discount.model';
import { IComputationRule } from 'app/shared/model/admin-service/computation-rule.model';
import { TariffType } from 'app/shared/model/enumerations/tariff-type.model';

export interface IMotorTariff {
  id?: string;
  type?: TariffType;
  description?: string;
  approvedYear?: Moment;
  benefits?: IBenefit[];
  discount?: IDiscount;
  computationRule?: IComputationRule;
}

export class MotorTariff implements IMotorTariff {
  constructor(
    public id?: string,
    public type?: TariffType,
    public description?: string,
    public approvedYear?: Moment,
    public benefits?: IBenefit[],
    public discount?: IDiscount,
    public computationRule?: IComputationRule
  ) {}
}
