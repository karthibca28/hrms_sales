export interface MenuItem {
  id?: number;
  label?: any;
  icon?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  href?:any
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
}