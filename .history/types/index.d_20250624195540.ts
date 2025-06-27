export type SubmenuItem = {
  label: string;
  linkType: "manual" | "page" | "post";
  href?: string;
  page?: {
    title: string;
    slug: {
      current: string;
    };
  };
  post?: {
    title: string;
    slug: {
      current: string;
    };
  };
  target: boolean;
  description?: string;
};

export type NavItem = {
  label: string;
  linkType: "manual" | "page" | "post" | "none";
  href?: string;
  page?: {
    title: string;
    slug: {
      current: string;
    };
  };
  post?: {
    title: string;
    slug: {
      current: string;
    };
  };
  target: boolean;
  submenuItems?: SubmenuItem[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
