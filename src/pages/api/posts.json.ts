import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  return new Response(
    JSON.stringify(
      posts.map((post) => ({
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
