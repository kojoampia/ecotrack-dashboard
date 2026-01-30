export interface IPhoto {
  id?: string;
  url?: string;
  sourceContentType?: string;
  source?: any;
}

export class Photo implements IPhoto {
  constructor(public id?: string, public url?: string, public sourceContentType?: string, public source?: any) {}
}
