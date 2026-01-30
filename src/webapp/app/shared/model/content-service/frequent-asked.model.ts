import { IFaqCategory } from './faq-category.model';
import { Moment } from 'moment';

export interface IFrequentAsked {
  id?: string;
  question?: string;
  answer?: string;
  category?: IFaqCategory;
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
    public category?: IFaqCategory,
    public createdDate?: Moment,
    public createdBy?: string,
    public modifiedDate?: Moment,
    public modifiedBy?: string
  ) {}
}
