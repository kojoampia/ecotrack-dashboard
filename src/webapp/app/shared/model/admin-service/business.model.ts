import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/admin-service/address.model';

export interface IBusiness {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  establishedDate?: Moment;
  address?: IAddress;
}

export class Business implements IBusiness {
  constructor(
    public id?: string,
    public name?: string,
    public phoneNumber?: string,
    public email?: string,
    public establishedDate?: Moment,
    public address?: IAddress
  ) {}
}
