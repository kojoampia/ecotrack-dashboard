import { Moment } from 'moment';
import { LanguageType } from '../../../shared/model/enumerations/language-type.model';

export interface IPrivacy {
  id?: string;
  title?: string;
  content?: string;
  language?: LanguageType;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
}