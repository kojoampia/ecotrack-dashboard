import { IMotorTariff } from 'app/shared/model/admin-service/motor-tariff.model';

export interface IComputationRule {
  id?: string;
  rate?: number;
  damageBasicPremium?: number;
  ageLoading?: number;
  cCLoading?: number;
  motorTariff?: IMotorTariff;
}

export class ComputationRule implements IComputationRule {
  constructor(
    public id?: string,
    public rate?: number,
    public damageBasicPremium?: number,
    public ageLoading?: number,
    public cCLoading?: number,
    public motorTariff?: IMotorTariff
  ) {}
}
