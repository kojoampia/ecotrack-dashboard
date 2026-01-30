export interface IFaqCategory {
  id?:string;
  label?: string;
  description?: string;
  color?: string;
  matIcon?: string;
  svgIcon?: string;
}

export class FaqCategory implements IFaqCategory {
  constructor(
    public id?:string,
    public label?: string,
    public description?: string,
    public color?: string,
    public matIcon?: string,
    public svgIcon?: string
  ) {}
}
