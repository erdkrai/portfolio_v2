"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { useScrollBehavior } from "@/components/hooks/use-scroll-behavior";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { NavItem, SubmenuItem } from "@/types";

interface SubmenuItemData {
  label?: string | null;
  linkType?: string | null;
  href?: string | null;
  page?: {
    title?: string;
    slug?: {
      current?: string;
    };
  } | null;
  post?: {
    title?: string;
    slug?: {
      current?: string;
    };
  } | null;
  target?: boolean | null;
  description?: string | null;
}

interface NavigationLinkData {
  label?: string | null;
  linkType?: string | null;
  href?: string | null;
  page?: {
    title?: string;
    slug?: {
      current?: string;
    };
  } | null;
  post?: {
    title?: string;
    slug?: {
      current?: string;
    };
  } | null;
  target?: boolean | null;
  submenuItems?: SubmenuItemData[] | null;
}

interface HeaderData {
  isSticky?: boolean | null;
  stickyBehavior?: string | null;
  backgroundStyle?: string | null;
  height?: string | null;
  showBorder?: boolean | null;
  logoType?: string | null;
  logoImage?: {
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string | null;
  } | null;
  logoText?: string | null;
  navigationLinks?: NavigationLinkData[] | null;
  showThemeToggle?: boolean | null;
  mobileBreakpoint?: string | null;
  showMobileMenu?: boolean | null;
}

interface HeaderProps {
  headerData?: HeaderData;
}

// Utility function to resolve URL based on link type
function resolveUrl(linkData: NavigationLinkData | SubmenuItemData): string {
  switch (linkData.linkType) {
    case "page":
      return linkData.page?.slug?.current ? `/${linkData.page.slug.current}` : "#";
    case "post":
      return linkData.post?.slug?.current ? `/blog/${linkData.post.slug.current}` : "#";
    case "manual":
      return linkData.href || "#";
    case "none":
      return "#";
    default:
      return linkData.href || "#";
  }
}

// Fallback navigation items
const fallbackNavItems: NavItem[] = [
  {
    label: "Home",
    linkType: "manual",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    linkType: "manual",
    href: "/blog",
    target: false,
  },
  {
    label: "About",
    linkType: "manual",
    href: "/about",
    target: false,
  },
];

export default function Header({ headerData }: HeaderProps) {
  const { isVisible } = useScrollBehavior({
    isSticky: headerData?.isSticky ?? true,
    stickyBehavior: headerData?.stickyBehavior ?? "always",
  });

  // Use CMS data or fallback to defaults
  const isSticky = headerData?.isSticky ?? true;
  const backgroundStyle = headerData?.backgroundStyle ?? "blur";
  const height = headerData?.height ?? "normal";
  const showBorder = headerData?.showBorder ?? true;
  const showThemeToggle = headerData?.showThemeToggle ?? true;
  const showMobileMenu = headerData?.showMobileMenu ?? true;
  const mobileBreakpoint = headerData?.mobileBreakpoint ?? "xl";
  
  // Convert CMS navigation links to NavItem format
  const navigationLinks: NavItem[] = headerData?.navigationLinks?.map(link => ({
    label: link.label || "",
    linkType: (link.linkType as NavItem["linkType"]) || "manual",
    href: link.linkType === "manual" ? link.href || "#" : resolveUrl(link),
    page: link.page ? {
      title: link.page.title || "",
      slug: {
        current: link.page.slug?.current || "",
      },
    } : undefined,
    post: link.post ? {
      title: link.post.title || "",
      slug: {
        current: link.post.slug?.current || "",
      },
    } : undefined,
    target: link.target || false,
    submenuItems: link.submenuItems?.map(submenu => ({
      label: submenu.label || "",
      linkType: (submenu.linkType as SubmenuItem["linkType"]) || "manual",
      href: submenu.linkType === "manual" ? submenu.href || "#" : resolveUrl(submenu),
      page: submenu.page ? {
        title: submenu.page.title || "",
        slug: {
          current: submenu.page.slug?.current || "",
        },
      } : undefined,
      post: submenu.post ? {
        title: submenu.post.title || "",
        slug: {
          current: submenu.post.slug?.current || "",
        },
      } : undefined,
      target: submenu.target || false,
      description: submenu.description || undefined,
    })) || undefined,
  })) || fallbackNavItems;

  // Dynamic class generation
  const getBackgroundClasses = () => {
    switch (backgroundStyle) {
      case "transparent":
        return "bg-transparent";
      case "solid":
        return "bg-background";
      case "blur":
        return "bg-background/95 backdrop-blur-sm";
      case "gradient":
        return "bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-sm";
      default:
        return "bg-background/95 backdrop-blur-sm";
    }
  };

  const getHeightClasses = () => {
    switch (height) {
      case "compact":
        return "h-12";
      case "normal":
        return "h-14";
      case "large":
        return "h-16";
      default:
        return "h-14";
    }
  };

  const getMobileBreakpointClasses = () => {
    switch (mobileBreakpoint) {
      case "sm":
        return { desktop: "hidden sm:flex", mobile: "flex sm:hidden" };
      case "md":
        return { desktop: "hidden md:flex", mobile: "flex md:hidden" };
      case "lg":
        return { desktop: "hidden lg:flex", mobile: "flex lg:hidden" };
      case "xl":
        return { desktop: "hidden xl:flex", mobile: "flex xl:hidden" };
      default:
        return { desktop: "hidden xl:flex", mobile: "flex xl:hidden" };
    }
  };

  const breakpointClasses = getMobileBreakpointClasses();

  return (
    <header
      className={cn(
        "w-full z-50 transition-transform duration-300 ease-in-out",
        isSticky ? "sticky top-0" : "relative",
        getBackgroundClasses(),
        showBorder ? "border-border/40" : "",
        !isVisible && isSticky ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className={cn("container flex items-center justify-between", getHeightClasses())}>
        {/* Logo Section */}
        <Link href="/" aria-label="Home page">
          {headerData?.logoType === "image" && headerData?.logoImage?.asset ? (
            <Image
              src={urlFor(headerData.logoImage).url()}
              alt={headerData.logoImage.alt || "Logo"}
              width={120}
              height={40}
              className="w-auto h-auto max-h-8"
              placeholder={headerData.logoImage?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={headerData.logoImage?.asset?.metadata?.lqip || ""}
            />
          ) : headerData?.logoType === "text" && headerData?.logoText ? (
            <span className="text-xl font-bold">{headerData.logoText}</span>
          ) : (
            <Logo />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className={cn("gap-7 items-center justify-between", breakpointClasses.desktop)}>
          <DesktopNav navItems={navigationLinks} />
          {showThemeToggle && <ModeToggle />}
        </div>

        {/* Mobile Navigation */}
        <div className={cn("items-center", breakpointClasses.mobile)}>
          {showThemeToggle && <ModeToggle />}
          {showMobileMenu && <MobileNav navItems={navigationLinks} />}
        </div>
      </div>
    </header>
  );
}
