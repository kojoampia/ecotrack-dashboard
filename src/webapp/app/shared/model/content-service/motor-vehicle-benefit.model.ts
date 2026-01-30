export interface IMotorVehicleBenefit {
  id?: string;
  excessBuyBack?: number;
  seatingCapacity?: number;
  extraSeatLoad?: number;
  tppdLimit?: number;
  tppdLimitOffset?: number;
  niaOffset?: number;
  additionalPeril?: number;
  ecowasPeril?: number;
  liabilityToPassenger?: number;
  officePremium?: number;
  nicContribution?: number;
  paBenefit?: number;
  paBenefitOffset?: number;
}

export class MotorVehicleBenefit implements IMotorVehicleBenefit {
  constructor(
    public id?: string,
    public excessBuyBack?: number,
    public seatingCapacity?: number,
    public extraSeatLoad?: number,
    public tppdLimit?: number,
    public tppdLimitOffset?: number,
    public niaOffset?: number,
    public additionalPeril?: number,
    public ecowasPeril?: number,
    public liabilityToPassenger?: number,
    public officePremium?: number,
    public nicContribution?: number,
    public paBenefit?: number,
    public paBenefitOffset?: number
  ) {}
}
