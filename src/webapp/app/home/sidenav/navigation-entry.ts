export interface NavigationEntry {
  title: string;
  routerLink?: any;
  expanded?: boolean;
  icon?: string;
  svgIcon?: string;
  subEntries?: NavigationEntry[];
}
