import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const splitInfoListQuery = groq`
  _type == "split-info-list" => {
    _type,
    _key,
    list[]{
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
        },
        alt
      },
      title,
      body[]{
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
      tags[],
      link{
        linkType,
        title,
        href,
        target,
        buttonVariant,
        post->{
          title,
          slug,
          excerpt
        }
      },
      linkStyle,
    },
  }
`;
