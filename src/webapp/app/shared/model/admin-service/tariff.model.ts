import { Moment } from 'moment';
import { IMotorTariff } from 'app/shared/model/admin-service/motor-tariff.model';
import { TariffType } from 'app/shared/model/enumerations/tariff-type.model';

export interface ITariff {
  id?: string;
  type?: TariffType;
  description?: string;
  approvedYear?: Moment;
  motorTariff?: IMotorTariff;
}

export class Tariff implements ITariff {
  constructor(
    public id?: string,
    public type?: TariffType,
    public description?: string,
    public approvedYear?: Moment,
    public motorTariff?: IMotorTariff
  ) {}
}
