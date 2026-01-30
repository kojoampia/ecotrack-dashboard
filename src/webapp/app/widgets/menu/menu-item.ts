export interface MenuItem {
  name: string;
  isActive: boolean;
  icon: string;
  url: string;
  subMenuItems: MenuItem[];
}
