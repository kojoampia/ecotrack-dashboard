export interface IMotorVehicleDiscount {
  id?: string;
  nCD?: number;
  fD?: number;
  thirdPartyPremium?: number;
  comprehensivePremium?: number;
}

export class MotorVehicleDiscount implements IMotorVehicleDiscount {
  constructor(
    public id?: string,
    public nCD?: number,
    public fD?: number,
    public thirdPartyPremium?: number,
    public comprehensivePremium?: number
  ) {}
}
