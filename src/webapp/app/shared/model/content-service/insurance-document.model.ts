export interface IInsuranceDocument {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  documentContentType?: string;
  document?: any;
}

export class InsuranceDocument implements IInsuranceDocument {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public url?: string,
    public documentContentType?: string,
    public document?: any
  ) {}
}
