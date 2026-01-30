import { LanguageType } from 'app/shared/model/enumerations/language-type.model';
import { Moment } from 'moment';

export interface ILegal {
  id?: string;
  title?: string;
  content?: string;
  language?: LanguageType;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
}

export class Legal implements ILegal {
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
