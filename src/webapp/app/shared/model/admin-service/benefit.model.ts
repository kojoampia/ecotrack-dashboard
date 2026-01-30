import { IMotorTariff } from 'app/shared/model/admin-service/motor-tariff.model';

export interface IBenefit {
  id?: string;
  excessBuyBack?: number;
  seatingCapacity?: number;
  extraSeatLoad?: number;
  tPPDLimit?: number;
  additionalPerils?: number;
  ecowasPerils?: number;
  liabilityToPassengers?: number;
  officePremium?: number;
  nICContribution?: number;
  motorTariff?: IMotorTariff;
}

export class Benefit implements IBenefit {
  constructor(
    public id?: string,
    public excessBuyBack?: number,
    public seatingCapacity?: number,
    public extraSeatLoad?: number,
    public tPPDLimit?: number,
    public additionalPerils?: number,
    public ecowasPerils?: number,
    public liabilityToPassengers?: number,
    public officePremium?: number,
    public nICContribution?: number,
    public motorTariff?: IMotorTariff
  ) {}
}
