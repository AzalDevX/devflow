'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
  };
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts.json');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter((post) => {
        const title = post.data.title.toLowerCase();
        const description = post.data.description.toLowerCase();
        return title.includes(query) || description.includes(query);
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  }, [searchQuery, posts]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        aria-label="Buscar">
        <Search size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform">
          <div className="relative bg-white dark:bg-surface-900 rounded-lg shadow-2xl">
            {/* Barra de búsqueda */}
            <div className="flex items-center p-4 border-b dark:border-surface-800">
              <Search size={20} className="text-surface-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar artículos... (Presiona '/' para buscar)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none font-mono"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Resultados */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredPosts.length > 0 ? (
                <div className="py-4">
                  {filteredPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                      <h3 className="font-mono text-lg">{post.data.title}</h3>
                      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400 line-clamp-2">
                        {post.data.description}
                      </p>
                      <time className="mt-2 text-xs text-surface-400 dark:text-surface-500 font-mono">
                        {new Date(post.data.publishDate).toLocaleDateString(
                          'es-ES',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    </a>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="px-4 py-12 text-center text-surface-500 dark:text-surface-400">
                  <p className="font-mono">
                    No se encontraron resultados para "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="px-4 py-12 text-center text-surface-500 dark:text-surface-400">
                  <p className="font-mono">
                    Comienza a escribir para buscar artículos
                  </p>
                  <p className="mt-2 text-sm">
                    Presiona{' '}
                    <kbd className="px-2 py-1 text-xs font-mono bg-surface-100 dark:bg-surface-800 rounded">
                      ESC
                    </kbd>{' '}
                    para cerrar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
