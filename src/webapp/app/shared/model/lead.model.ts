import { Moment } from 'moment';

export interface Lead {
  id?: string;
  customer?: string;
  service?: string;
  createdDate?: Moment;
}
