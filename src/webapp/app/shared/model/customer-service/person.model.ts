export interface IPerson {
  id?: string;
  firstName?: string;
  lastName?: string;
  displayPictureContentType?: string;
  displayPicture?: any;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
}

export class Person implements IPerson {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public displayPictureContentType?: string,
    public displayPicture?: any,
    public phoneNumber?: string,
    public email?: string,
    public occupation?: string
  ) {}
}
