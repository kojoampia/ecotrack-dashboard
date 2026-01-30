import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer-service/customer.model';
import { InvoiceState } from 'app/shared/model/enumerations/invoice-state.model';

export interface IInvoice {
  id?: string;
  reference?: string;
  customer?: ICustomer;
  service?: string;
  amount?: number;
  state?: InvoiceState;
  data?: any;
  documentContentType?: string;
  document?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: string,
    public reference?: string,
    public customer?: ICustomer,
    public service?: string,
    public amount?: number,
    public state?: InvoiceState,
    public data?: any,
    public documentContentType?: string,
    public document?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
