export type SideNavigationItem = {
  text: string;
  path: string;
  icon?: string;
  expanded?: boolean;
  items?: SideNavigationItem[];
};
