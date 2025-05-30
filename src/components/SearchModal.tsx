'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
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
        className="text-primary-700 dark:text-accent-300 hover:text-primary-500 dark:hover:text-accent-200 transition-colors"
        aria-label="Buscar">
        <Search size={20} />
      </button>
    );
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 isolate"
      style={{
        zIndex: 99999,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary-950/20 dark:bg-primary-950/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        style={{ position: 'fixed', inset: 0 }}
      />

      {/* Modal content */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4">
          <div className="w-full max-w-2xl mt-[10vh]">
            <div className="relative bg-accent-50 dark:bg-primary-900 rounded-lg shadow-xl border border-primary-100/50 dark:border-primary-700/50">
              {/* Search bar */}
              <div className="flex items-center p-4 border-b border-primary-100 dark:border-primary-800">
                <Search
                  size={20}
                  className="text-primary-400 dark:text-accent-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar artículos... (Presiona '/' para buscar)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 bg-transparent focus:outline-none font-mono
                           text-primary-900 dark:text-accent-100 placeholder-primary-400 
                           dark:placeholder-accent-500"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-primary-700 dark:text-accent-300 
                           hover:text-primary-500 dark:hover:text-accent-200 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                {filteredPosts.length > 0 ? (
                  <div className="py-4">
                    {filteredPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block px-4 py-3 hover:bg-nature-100/50 dark:hover:bg-primary-800/50 
                                 transition-colors"
                        onClick={() => setIsOpen(false)}>
                        <h3 className="font-mono text-lg text-primary-900 dark:text-accent-100">
                          {post.data.title}
                        </h3>
                        <p className="mt-1 text-sm text-primary-600 dark:text-accent-300 line-clamp-2">
                          {post.data.description}
                        </p>
                        <time className="mt-2 text-xs text-primary-500 dark:text-accent-400 font-mono">
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
                  <div className="px-4 py-12 text-center text-primary-600 dark:text-accent-400">
                    <p className="font-mono">
                      No se encontraron resultados para "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <p className="font-mono text-primary-600 dark:text-accent-400">
                      Comienza a escribir para buscar artículos
                    </p>
                    <p className="mt-2 text-sm text-primary-500 dark:text-accent-500">
                      Presiona{' '}
                      <kbd
                        className="px-2 py-1 text-xs font-mono bg-nature-100 dark:bg-primary-800 
                                    text-primary-700 dark:text-accent-300 rounded">
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
    </div>,
    document.body
  );
}
