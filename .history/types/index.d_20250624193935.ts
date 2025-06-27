export type SubmenuItem = {
  label: string;
  href: string;
  target: boolean;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  target: boolean;
  submenuItems?: SubmenuItem[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
