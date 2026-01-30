import { Moment } from 'moment';
import { RecipientType } from 'app/shared/model/enumerations/recipient-type.model';

export interface IMessage {
  id?: string;
  name?: string;
  email?: string;
  recipientType?: RecipientType;
  subject?: string;
  content?: string;
  createdDate?: Moment;
  replies?: IMessage[];
}

export class Message implements IMessage {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public recipientType?: RecipientType,
    public subject?: string,
    public content?: string,
    public createdDate?: Moment,
    public replies?: IMessage[]
  ) {}
}
