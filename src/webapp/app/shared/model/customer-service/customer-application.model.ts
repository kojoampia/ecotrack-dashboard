import { Moment } from 'moment';
import { IComment } from './comment.model';
import { CustomerApplicationState } from '../enumerations/customer-application-state.model';

export interface ICustomerApplication {
  id?: string;
  data?: any;
  customerId?: string;
  insuranceId?: string;
  state?: CustomerApplicationState;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
  comments?: IComment[];
}

export class CustomerApplication implements ICustomerApplication {
  constructor(
    public id?: string,
    public data?: any,
    public customerId?: string,
    public insuranceId?: string,
    public state?: CustomerApplicationState,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string,
    public createdBy?: string,
    public comments?: IComment[]
  ) {}
}

export class PrivateDetail {
  constructor(public id: string, public firstname: string, public lastname: string, public email: string, public phonenumber: string) {}
}

export class BusinessDetail {
  constructor(public id: string, public businessName: string, public address: string, public email: string, public phonenumber: string) {}
}
