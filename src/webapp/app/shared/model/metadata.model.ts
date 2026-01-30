import { Moment } from 'moment';

export interface IMetadata {
  id?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class Metadata implements IMetadata {
  constructor(
    public id?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
