import { groq } from "next-sanity";

export const FOOTER_QUERY = groq`*[_type == "footer"][0]{
  showFooter,
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
  socialLinks[]{
    platform,
    url
  },
  copyrightText[]{
    ...,
    _type == "image" => {
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
      }
    }
  },
  additionalContent[]{
    ...,
    _type == "image" => {
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
      }
    }
  }
}`;
