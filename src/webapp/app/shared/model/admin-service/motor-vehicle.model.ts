import { PolicyPeriod } from 'app/shared/model/enumerations/policy-period.model';
import { TariffType } from 'app/shared/model/enumerations/tariff-type.model';

export interface IMotorVehicle {
  id?: string;
  value?: number;
  duration?: number;
  durationType?: PolicyPeriod;
  coverType?: TariffType;
  excessBought?: number;
  seats?: number;
}

export class MotorVehicle implements IMotorVehicle {
  constructor(
    public id?: string,
    public value?: number,
    public duration?: number,
    public durationType?: PolicyPeriod,
    public coverType?: TariffType,
    public excessBought?: number,
    public seats?: number
  ) {}
}
