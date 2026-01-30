import { Moment } from 'moment';

export interface IComment {
  id?: string;
  content?: string;
  tags?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class Comment implements IComment {
  constructor(
    public id?: string,
    public content?: string,
    public tags?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
