import { Moment } from 'moment';

export interface IClaimForm {
  id?: string;
  name?: string;
  claimContentType?: string;
  claim?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class ClaimForm implements IClaimForm {
  constructor(
    public id?: string,
    public name?: string,
    public claimContentType?: string,
    public claim?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
