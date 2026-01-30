import { ECustomerTypeCode, EIdCardTypeCode } from '../enumerations/nia-enumerations.model';
import { Moment } from 'moment';


export interface INiaCustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  dateOfBirth?:Moment;
  email?: string;
  phone?: string;
  digitalAddress?: string;
  postalAddress?: string;
  residentialAddress?: string;
  tin?: string;
  occupation?: string;
  nationalID?: string;
  reference?: string;
  branchCode?: string;
  customerTypeCode?: ECustomerTypeCode;
  cardTypeCode?: EIdCardTypeCode;
  idNumber?: string;
  number?: string;
}

export class NiaCustomer implements INiaCustomer {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public otherName?: string,
    public email?: string,
    public phone?: string,
    public dateOfBirth?:Moment,
    public digitalAddress?: string,
    public postalAddress?: string,
    public residentialAddress?: string,
    public tin?: string,
    public occupation?: string,
    public nationalID?: string,
    public reference?: string,
    public branchCode?: string,
    public customerTypeCode?: ECustomerTypeCode,
    public cardTypeCode?: EIdCardTypeCode,
    public idNumber?: string,
    public number?: string
  ) {}
}
