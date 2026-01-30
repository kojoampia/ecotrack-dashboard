export interface IAddress {
  id?: string;
  streetName?: string;
  postCode?: string;
  postBox?: string;
  town?: string;
  district?: string;
  city?: string;
  region?: string;
  country?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: string,
    public streetName?: string,
    public postCode?: string,
    public postBox?: string,
    public town?: string,
    public district?: string,
    public city?: string,
    public region?: string,
    public country?: string
  ) {}
}
