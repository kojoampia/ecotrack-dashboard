import { Moment } from 'moment';

export interface PaymentParameters {
  id?: string;
  merchantKey?: string;
  successUrl?: string;
  cancelledUrl?: string;
  ipnUrl?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  lastModifiedBy?: string;
}
