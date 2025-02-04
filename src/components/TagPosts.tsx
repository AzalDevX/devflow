'use client';
import { useEffect, useState } from 'react';
import { filterPublishedPosts } from '../utils/filterPosts';
import type { CollectionEntry } from '../types/CollectionEntry'; //Fixed import

interface Props {
  initialPosts: CollectionEntry<'blog'>[];
  tag: string;
}

export default function TagPosts({ initialPosts, tag }: Props) {
  const [posts, setPosts] = useState<CollectionEntry<'blog'>[]>([]);

  useEffect(() => {
    // Filtrar y ordenar posts cada vez que se monta el componente
    const filteredAndSortedPosts = filterPublishedPosts(initialPosts);
    setPosts(filteredAndSortedPosts);

    // Configurar un intervalo para verificar cada minuto
    const interval = setInterval(() => {
      const updatedPosts = filterPublishedPosts(initialPosts);
      setPosts(updatedPosts);
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(interval);
  }, [initialPosts]);

  return (
    <div className="space-y-8 bg-accent-50/50 dark:bg-primary-900/30 rounded-2xl p-6 shadow-xl shadow-accent-500/5 dark:shadow-primary-900/5">
      {posts.length > 0 ? (
        posts.map((post) => (
          <article
            key={post.slug}
            className="group border-b border-nature-200 dark:border-primary-700/50 last:border-0 pb-8 last:pb-0">
            <a
              href={`/blog/${post.slug}`}
              className="block space-y-3 transition-all duration-300 hover:-translate-y-1 hover:bg-nature-50/50 dark:hover:bg-primary-800/30 p-4 rounded-xl -mx-4">
              <time
                dateTime={post.data.publishDate.toISOString()}
                className="block text-secondary-600 dark:text-accent-400 font-mono">
                {new Date(post.data.publishDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              <h2 className="text-xl font-mono text-primary-800 dark:text-accent-200 group-hover:text-primary-600 dark:group-hover:text-accent-300">
                {post.data.title}
              </h2>

              <p className="text-secondary-700 dark:text-accent-300">
                {post.data.description}
              </p>

              <div className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium pt-2">
                <span className="text-sm font-mono">Leer más</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          </article>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary-600 dark:text-accent-400 font-mono">
            No hay artículos publicados con la etiqueta #{tag}
          </p>
        </div>
      )}
    </div>
  );
}
