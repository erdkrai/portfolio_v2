import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const portfolioGalleryQuery = groq`
  _type == "portfolio-gallery" => {
    _type,
    _key,
    title,
    description,
    layout,
    columns,
    spacing,
    aspectRatio,
    enableLightbox,
    enableCategories,
    hoverEffect,
    items[]{
      _key,
      image{
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
      },
      alt,
      title,
      description,
      category,
      link{
        linkType,
        internalLink->{
          slug,
          _type
        },
        externalUrl,
        openInNewTab
      },
      featured
    }
  }
`;
