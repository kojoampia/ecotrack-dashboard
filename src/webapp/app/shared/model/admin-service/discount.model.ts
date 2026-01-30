export interface IDiscount {
  id?: string;
  nCD?: number;
  fD?: number;
  thirdPartyPremium?: number;
  comprehensivePremium?: number;
}

export class Discount implements IDiscount {
  constructor(
    public id?: string,
    public nCD?: number,
    public fD?: number,
    public thirdPartyPremium?: number,
    public comprehensivePremium?: number
  ) {}
}
