import { MotorRiskType } from 'app/shared/model/enumerations/motor-risk-type.model';
import { PolicyPeriod } from 'app/shared/model/enumerations/policy-period.model';

export interface IMotorRisk {
  id?: string;
  type?: MotorRiskType;
  noOfSeats?: number;
  policyNo?: string;
  periodOfPolicy?: PolicyPeriod;
}

export class MotorRisk implements IMotorRisk {
  constructor(
    public id?: string,
    public type?: MotorRiskType,
    public noOfSeats?: number,
    public policyNo?: string,
    public periodOfPolicy?: PolicyPeriod
  ) {}
}
