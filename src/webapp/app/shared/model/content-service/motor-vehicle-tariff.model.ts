import { IMotorVehicleBenefit } from 'app/shared/model/content-service/motor-vehicle-benefit.model';
import { IMotorVehicleDiscount } from 'app/shared/model/content-service/motor-vehicle-discount.model';
import { IMotorVehicleComputationRule } from 'app/shared/model/content-service/motor-vehicle-computation-rule.model';
import { MotorRiskType } from 'app/shared/model/enumerations/motor-risk-type.model';
import { TariffType } from 'app/shared/model/enumerations/tariff-type.model';
import { PolicyPeriod } from 'app/shared/model/enumerations/policy-period.model';
import { Moment } from 'moment';

export interface IMotorVehicleTariff {
  id?: string;
  approvedYear?: number;
  policyPeriod?: PolicyPeriod;
  description?: string;
  type?: TariffType;
  motorRiskType?: MotorRiskType;
  benefit?: IMotorVehicleBenefit;
  discount?: IMotorVehicleDiscount;
  computationRule?: IMotorVehicleComputationRule;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class MotorVehicleTariff implements IMotorVehicleTariff {
  constructor(
    public id?: string,
    public approvedYear?: number,
    public policyPeriod?: PolicyPeriod,
    public description?: string,
    public type?: TariffType,
    public benefit?: IMotorVehicleBenefit,
    public discount?: IMotorVehicleDiscount,
    public computationRule?: IMotorVehicleComputationRule,
    public motorRiskType?: MotorRiskType,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
