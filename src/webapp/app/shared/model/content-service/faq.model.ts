import { Moment } from 'moment';

export interface IFrequentAsked {
  id?: string;
  question?: string;
  answer?: string;
  category?:string;
  createdDate?: Moment;
  createdBy?: string;
  modifiedDate?: Moment;
  modifiedBy?: string;
}

export class FrequentAsked implements IFrequentAsked {
  constructor(
    public id?: string,
    public question?: string,
    public answer?: string,
    public category?:string,
    public createdDate?: Moment,
    public createdBy?: string,
    public modifiedDate?: Moment,
    public modifiedBy?: string
  ) {}
}
