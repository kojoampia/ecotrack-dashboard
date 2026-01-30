export interface ISegment {
  id?: string;
  name?: string;
  description?: string;
}

export class Segment implements ISegment {
  constructor(public id?: string, public name?: string, public description?: string) {}
}
