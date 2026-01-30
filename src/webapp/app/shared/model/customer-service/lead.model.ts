import { Moment } from 'moment';

export interface ILead {
  id?: string;
  customer?: string;
  service?: string;
  insurance?: string;
  createdDate?: Moment;
}

export class Lead implements ILead {
  constructor(
    public id?: string,
    public customer?: string,
    public service?: string,
    public insurance?: string,
    public createdDate?: Moment
  ) {}
}
