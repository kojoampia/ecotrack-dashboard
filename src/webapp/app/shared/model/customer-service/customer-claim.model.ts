import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer-service/customer.model';
import { IPolicy } from 'app/shared/model/customer-service/policy.model';
import { ClaimState } from 'app/shared/model/enumerations/claim-state.model';
import { InsuranceCategory } from 'app/shared/model/enumerations/insurance-category.model';
import { InsuranceType } from 'app/shared/model/enumerations/insurance-type.model';

export interface ICustomerClaim {
  id?: string;
  claim?: any;
  state?: ClaimState;
  category?: InsuranceCategory;
  type?: InsuranceType;
  customer?: ICustomer;
  policy?: IPolicy;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class CustomerClaim implements ICustomerClaim {
  constructor(
    public id?: string,
    public claim?: any,
    public state?: ClaimState,
    public category?: InsuranceCategory,
    public type?: InsuranceType,
    public customer?: ICustomer,
    public policy?: IPolicy,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
