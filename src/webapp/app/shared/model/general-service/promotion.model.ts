import { Moment } from 'moment';
import { PromotionPage } from 'app/shared/model/enumerations/promotion-page.model';

export interface IPromotion {
  id?: string;
  name?: string;
  detail?: string;
  page?: PromotionPage;
  url?: string;
  photoContentType?: string;
  photo?: any;
  createdDate?: Moment;
  createdBy?: string;
  modifiedDate?: Moment;
  modifiedBy?: string;
}

export class Promotion implements IPromotion {
  constructor(
    public id?: string,
    public name?: string,
    public detail?: string,
    public page?: PromotionPage,
    public url?: string,
    public photoContentType?: string,
    public photo?: any,
    public createdDate?: Moment,
    public createdBy?: string,
    public modifiedDate?: Moment,
    public modifiedBy?: string
  ) {}
}
