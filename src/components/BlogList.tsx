'use client';
import { useEffect, useState } from 'react';
import { filterPublishedPosts } from '../utils/filterPosts';
import type { CollectionEntry } from '../content/blog'; // Fixed import
import type React from 'react';

interface Props {
  initialPosts: CollectionEntry<'blog'>[];
}

export default function BlogList({ initialPosts }: Props) {
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
    <div className="space-y-0 bg-accent-50/50 dark:bg-primary-900/30 rounded-2xl p-6 shadow-xl shadow-accent-500/5 dark:shadow-primary-900/5">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <article
            key={post.slug}
            className="post-card py-8 first:pt-0 border-b border-nature-200 dark:border-primary-700/50 last:border-0"
            style={{ '--index': index } as React.CSSProperties}>
            <a
              href={`/blog/${post.slug}`}
              className="block space-y-4 p-4 -mx-4 rounded-xl transition-colors duration-300
                       hover:bg-nature-50/50 dark:hover:bg-primary-800/30">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className="px-3 py-1 text-xs font-medium font-mono rounded-full 
                             bg-primary-100 dark:bg-primary-800/50 
                             text-primary-700 dark:text-accent-300
                             transition-colors duration-300">
                  {post.data.category}
                </span>
                <div className="flex items-center gap-3 text-secondary-600 dark:text-accent-400 font-mono">
                  <time dateTime={post.data.publishDate.toISOString()}>
                    {new Date(post.data.publishDate).toLocaleDateString(
                      'es-ES',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </time>
                </div>
              </div>

              <h2
                className="text-2xl font-bold font-mono text-primary-800 dark:text-accent-100 
                          transition-colors duration-300">
                {post.data.title}
              </h2>

              <p className="text-secondary-700 dark:text-accent-300 leading-relaxed">
                {post.data.description}
              </p>

              <div className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium pt-2">
                <span className="text-sm font-mono">Leer más</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
            No hay artículos publicados aún
          </p>
        </div>
      )}
    </div>
  );
}
