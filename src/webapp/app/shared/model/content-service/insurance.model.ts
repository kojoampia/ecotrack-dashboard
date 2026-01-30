import { Moment } from 'moment';
import { IInsuranceDocument } from 'app/shared/model/content-service/insurance-document.model';
import { InsuranceCategory } from 'app/shared/model/enumerations/insurance-category.model';
import { InsuranceType } from 'app/shared/model/enumerations/insurance-type.model';
import { LanguageType } from 'app/shared/model/enumerations/language-type.model';

export interface IInsurance {
  id?: string;
  name?: string;
  description?: string;
  showInQuotation?: boolean;
  category?: InsuranceCategory;
  type?: InsuranceType;
  contact?: string;
  url?: string;
  photoContentType?: string;
  photo?: any;
  language?: LanguageType;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
  documents?: IInsuranceDocument[];
}

export class Insurance implements IInsurance {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public showInQuotation?: boolean,
    public category?: InsuranceCategory,
    public type?: InsuranceType,
    public contact?: string,
    public url?: string,
    public photoContentType?: string,
    public photo?: any,
    public language?: LanguageType,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string,
    public documents?: IInsuranceDocument[]
  ) {
    this.showInQuotation = this.showInQuotation || false;
  }
}
