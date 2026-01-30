import { Moment } from 'moment';

export interface IPaystackConfiguration {
  id?: string;
  secretKey?: string;
  publicKey?: string;
  notificationUrl?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class PaystackConfiguration implements IPaystackConfiguration {
  constructor(
    public id?: string,
    public secretKey?: string,
    public publicKey?: string,
    public notificationUrl?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
