import { LanguageType } from 'app/shared/model/enumerations/language-type.model';
import { Moment } from 'moment';

export interface IAbout {
  id: string;
  title: string;
  content: string;
  language: LanguageType;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
}
