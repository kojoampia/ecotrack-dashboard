import { NiaIntermediaryType } from 'app/shared/model/enumerations/nia-intermediary-type.model';

export interface INiaIntermediary {
  id?: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  phone?: string;
  reference?: string;
  branchCode?: string;
  type?: NiaIntermediaryType;
}

export class NiaIntermediary implements INiaIntermediary {
  constructor(
    public id?: string,
    public number?: string,
    public firstName?: string,
    public lastName?: string,
    public otherName?: string,
    public email?: string,
    public phone?: string,
    public reference?: string,
    public branchCode?: string,
    public type?: NiaIntermediaryType
  ) {}
}
