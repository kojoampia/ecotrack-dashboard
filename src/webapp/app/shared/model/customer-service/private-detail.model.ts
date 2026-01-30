export interface IPrivateDetail {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}

export class PrivateDetail implements IPrivateDetail {
  constructor(public id: string, public firstname: string, public lastname: string, public email: string, public phonenumber: string) {}
}
