import { EIntermediaryTypeCode } from '../enumerations/nia-enumerations.model';

export interface INiaIntermediary {
  id?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  phone?: string;
  reference?: string;
  branchCode?: string;
  intermediaryTypeCode?: EIntermediaryTypeCode;
}

export class NiaIntermediary implements INiaIntermediary {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public otherName?: string,
    public email?: string,
    public phone?: string,
    public reference?: string,
    public branchCode?: string,
    public intermediaryTypeCode?: EIntermediaryTypeCode
  ) {}
}
