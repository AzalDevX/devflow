import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { filterPublishedPosts } from '../../utils/filterPosts';

async function getMDXPosts() {
  try {
    const postsDirectory = join(process.cwd(), 'src/content/blog');
    const files = await readdir(postsDirectory);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = join(postsDirectory, filename);
        const fileContent = await readFile(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
          slug: filename.replace('.mdx', ''),
          data: {
            title: data.title,
            description: data.description,
            publishDate: data.publishDate,
            image: data.image,
            category: data.category,
            tags: data.tags,
            draft: data.draft ?? false,
          },
        };
      })
    );

    return posts;
  } catch (error) {
    console.error('Error al leer los posts:', error);
    return [];
  }
}

export async function GET() {
  const allPosts = await getMDXPosts();
  const publishedPosts = filterPublishedPosts(allPosts);

  // Ordenar todos por fecha descendente
  const sortedPosts = publishedPosts.sort(
    (a, b) =>
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime()
  );

  // Tomar los últimos 3
  const latestPosts = sortedPosts.slice(0, 3);

  // Devolver ambos
  const response = {
    allPosts: sortedPosts,
    latestPosts,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
