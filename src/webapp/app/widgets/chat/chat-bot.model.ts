export class Message {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public language: string,
    public message?: string,
    public recipient?: string,
    public time?: string,
    public sessionId?: string,
    public ipAddress?: string
  ) {}
}

export class Customer {
  constructor(public firstName: string, public lastName: string, public email: string, public language: string) {}
}
