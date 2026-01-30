import { NiaCustomerTypeCode } from 'app/shared/model/enumerations/nia-customer-type-code.model';
import { NiaCardType } from 'app/shared/model/enumerations/nia-card-type.model';

export interface INiaCustomer {
  id?: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  phone?: string;
  digitalAddress?: string;
  postalAddress?: string;
  residentialAddress?: string;
  tin?: string;
  occupation?: string;
  idNumber?: string;
  nationalID?: string;
  reference?: string;
  branchCode?: string;
  customerTypeCode?: NiaCustomerTypeCode;
  cardTypeCode?: NiaCardType;
}

export class NiaCustomer implements INiaCustomer {
  constructor(
    public id?: string,
    public number?: string,
    public firstName?: string,
    public lastName?: string,
    public otherName?: string,
    public email?: string,
    public phone?: string,
    public digitalAddress?: string,
    public postalAddress?: string,
    public residentialAddress?: string,
    public tin?: string,
    public occupation?: string,
    public idNumber?: string,
    public nationalID?: string,
    public reference?: string,
    public branchCode?: string,
    public customerTypeCode?: NiaCustomerTypeCode,
    public cardTypeCode?: NiaCardType
  ) {}
}
