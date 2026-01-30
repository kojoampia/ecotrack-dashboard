import { Moment } from 'moment';

export interface IPolicy {
  id?: string;
  name?: string;
  keywords?: string[];
  fileURL?: string;
  policyFileContentType?: string;
  policyFile?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
}

export class Policy implements IPolicy {
  constructor(
    public id?: string,
    public name?: string,
    public keywords?: string[],
    public fileURL?: string,
    public policyFileContentType?: string,
    public policyFile?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string
  ) {}
}
