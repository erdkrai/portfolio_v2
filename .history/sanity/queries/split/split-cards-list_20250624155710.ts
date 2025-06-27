import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const splitCardsListQuery = groq`
  _type == "split-cards-list" => {
    _type,
    _key,
    list[]{
      tagLine,
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
