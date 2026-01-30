import { Moment } from 'moment';
import { RoleType } from '../model/enumerations/role-type.model';

export interface IDashboard {
  id?: string;
  name?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  roles?: RoleType;
  panels?: string;
}

export class Dashboard implements IDashboard {
  constructor(
    public id?: string,
    public name?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public roles?: RoleType,
    public panels?: string
  ) {}
}
