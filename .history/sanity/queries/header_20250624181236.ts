import { groq } from "next-sanity";

export const HEADER_QUERY = groq`*[_type == "header"][0]{
  isSticky,
  stickyBehavior,
  backgroundStyle,
  height,
  showBorder,
  logoType,
  logoImage{
    ...,
    asset->{
      _id,
      url,
      mimeType,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  logoText,
  navigationLinks[]{
    label,
    href,
    target
  },
  showThemeToggle,
  mobileBreakpoint,
  showMobileMenu
}`;
