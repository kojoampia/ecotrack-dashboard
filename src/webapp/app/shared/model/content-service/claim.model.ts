import { Moment } from 'moment';
import { LanguageType } from 'app/shared/model/enumerations/language-type.model';

export interface IClaim {
  id?: string;
  title?: string;
  content?: string;
  language?: LanguageType;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
}

export class Claim implements IClaim {
  constructor(
    public id?: string,
    public title?: string,
    public content?: string,
    public language?: LanguageType,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string,
    public createdBy?: string
  ) {}
}
