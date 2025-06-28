import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

async function getPagesSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const pagesQuery = groq`
      *[_type == 'page'] | order(slug.current) {
        'url': $baseUrl + select(slug.current == 'index' => '', '/' + slug.current),
        'lastModified': _updatedAt,
        'changeFrequency': 'daily',
        'priority': select(
          slug.current == 'index' => 1,
          0.5
        )
      }
    `;

    const { data } = await sanityFetch({
      query: pagesQuery,
      params: {
        baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-v2-lac-one.vercel.app',
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching pages for sitemap:', error);
    return [];
  }
}

async function getPostsSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const postsQuery = groq`
      *[_type == 'post'] | order(_updatedAt desc) {
        'url': $baseUrl + '/blog/' + slug.current,
        'lastModified': _updatedAt,
        'changeFrequency': 'weekly',
        'priority': 0.7
      }
    `;

    const { data } = await sanityFetch({
      query: postsQuery,
      params: {
        baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-v2-lac-one.vercel.app',
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, posts] = await Promise.all([
      getPagesSitemap(),
      getPostsSitemap(),
    ]);

    return [...pages, ...posts];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return a basic sitemap if Sanity is not available
    return [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-v2-lac-one.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
