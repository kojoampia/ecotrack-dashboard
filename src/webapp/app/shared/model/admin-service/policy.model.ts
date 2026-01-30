import { Moment } from 'moment';
import { IInsurance } from 'app/shared/model/admin-service/insurance.model';

export interface IPolicy {
  id?: string;
  name?: string;
  url?: string;
  keywords?: string;
  policyDocumentContentType?: string;
  policyDocument?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
  insurances?: IInsurance[];
}

export class Policy implements IPolicy {
  constructor(
    public id?: string,
    public name?: string,
    public url?: string,
    public keywords?: string,
    public policyDocumentContentType?: string,
    public policyDocument?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string,
    public insurances?: IInsurance[]
  ) {}
}
