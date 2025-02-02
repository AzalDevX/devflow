import { getCollection } from 'astro:content';
import { filterPublishedPosts } from '../../utils/filterPosts';

export async function GET() {
  const allPosts = await getCollection();
  const publishedPosts = filterPublishedPosts(allPosts);

  return new Response(
    JSON.stringify(
      publishedPosts.map((post) => ({
        slug: post.slug,
        data: {
          title: post.data.title,
          description: post.data.description,
          publishDate: post.data.publishDate,
        },
      }))
    ),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
