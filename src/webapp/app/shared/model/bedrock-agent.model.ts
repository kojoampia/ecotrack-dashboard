import { Moment } from 'moment';

export interface IBedrockAgent {
  id?: string;
  agentContentType?: string;
  agent?: any;
  url?: string;
  approved?: boolean;
  businessName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  physicalAddress?: string;
  postalAddress?: string;
  digitalAddress?: string;
  fixedTelephone?: string;
  mobileTelephone?: string;
  city?: string;
  region?: string;
  country?: string;
  createdDate?: Moment;
  createdBy?: string;
  modifiedDate?: Moment;
  modifiedBy?: string;
}

export class BedrockAgent implements IBedrockAgent {
  constructor(
    public id?: string,
    public agentContentType?: string,
    public agent?: any,
    public url?: string,
    public approved?: boolean,
    public businessName?: string,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public email?: string,
    public physicalAddress?: string,
    public postalAddress?: string,
    public digitalAddress?: string,
    public fixedTelephone?: string,
    public mobileTelephone?: string,
    public city?: string,
    public region?: string,
    public country?: string,
    public createdDate?: Moment,
    public createdBy?: string,
    public modifiedDate?: Moment,
    public modifiedBy?: string
  ) {
    this.approved = this.approved || false;
  }
}
