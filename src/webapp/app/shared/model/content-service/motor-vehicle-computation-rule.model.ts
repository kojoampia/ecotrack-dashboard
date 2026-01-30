export interface IMotorVehicleComputationRule {
  id?: string;
  rate?: number;
  damageBasicPremium?: number;
  ageLoading?: number;
  ccLoading?: number;
}

export class MotorVehicleComputationRule implements IMotorVehicleComputationRule {
  constructor(
    public id?: string,
    public rate?: number,
    public damageBasicPremium?: number,
    public ageLoading?: number,
    public ccLoading?: number
  ) {}
}
