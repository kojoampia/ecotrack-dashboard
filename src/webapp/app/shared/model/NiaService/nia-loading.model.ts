import { NiaLoadingType } from 'app/shared/model/enumerations/nia-loading-type.model';

export interface INiaLoading {
  id?: string;
  loadingTypeCode?: NiaLoadingType;
  rate?: number;
  amount?: number;
  niaMotorPolicyId?: string;
}

export class NiaLoading implements INiaLoading {
  constructor(
    public id?: string,
    public loadingTypeCode?: NiaLoadingType,
    public rate?: number,
    public amount?: number,
    public niaMotorPolicyId?: string
  ) {}
}
