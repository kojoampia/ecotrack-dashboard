import { ELoadingTypeCode } from '../enumerations/nia-enumerations.model';

export interface INiaLoading {
  id?: string;
  loadingTypeCode?: ELoadingTypeCode;
  rate?: number;
  amount?: number;
}

export class NiaLoading implements INiaLoading {
  constructor(public id?: string, public loadingTypeCode?: ELoadingTypeCode, public rate?: number, public amount?: number) {}
}
