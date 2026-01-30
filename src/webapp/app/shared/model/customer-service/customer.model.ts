import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/customer-service/invoice.model';
import { ISegment } from 'app/shared/model/customer-service/segment.model';
import { IPolicy } from 'app/shared/model/customer-service/policy.model';
import { IAddress } from 'app/shared/model/customer-service/address.model';
import { IBusiness } from 'app/shared/model/customer-service/business.model';

export interface ICustomer {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  displayPictureContentType?: string;
  displayPicture?: any;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
  address?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
  createdBy?: string;
  invoices?: IInvoice[];
  segments?: ISegment[];
  policies?: IPolicy[];
  addressLists?: IAddress[];
  businessLists?: IBusiness[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: string,
    public userId?: string,
    public firstName?: string,
    public lastName?: string,
    public displayPictureContentType?: string,
    public displayPicture?: any,
    public phoneNumber?: string,
    public email?: string,
    public occupation?: string,
    public address?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string,
    public createdBy?: string,
    public invoices?: IInvoice[],
    public segments?: ISegment[],
    public policies?: IPolicy[],
    public addressLists?: IAddress[],
    public businessLists?: IBusiness[]
  ) {}
}
