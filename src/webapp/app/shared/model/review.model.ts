import { Moment } from 'moment';
import { ReviewStatus } from 'app/shared/model/enumerations/review-status.model';

export interface IReview {
  id?: string;
  customerId?: string;
  insuranceId?: string;
  reviewStatus?: ReviewStatus;
  comment?: string;
  rating?: number;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
}

export class Review implements IReview {
  constructor(
    public id?: string,
    public customerId?: string,
    public insuranceId?: string,
    public reviewStatus?: ReviewStatus,
    public comment?: string,
    public rating?: number,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string
  ) {}
}
