import { Moment } from 'moment';
import { IAddress } from './address.model';

export interface IBusiness {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  address?: IAddress;
  establishedDate?: Moment;
}

export class Business implements IBusiness {
  constructor(
    public id?: string,
    public name?: string,
    public phoneNumber?: string,
    public email?: string,
    public address?: IAddress,
    public establishedDate?: Moment
  ) {}
}
