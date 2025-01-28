"use client"
import { useState, useEffect, useRef } from "react"
import { useStore } from "@nanostores/react"
import { isSearchOpen, searchQuery } from "../store/searchStore"

interface Post {
  slug: string
  data: {
    title: string
    publishDate: Date
    description: string
  }
}

export default function SearchBar() {
  const $isSearchOpen = useStore(isSearchOpen)
  const $searchQuery = useStore(searchQuery)
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch posts on component mount
    fetch("/api/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data))

    // Close search on escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isSearchOpen.set(false)
      }
    }

    // Close search when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        isSearchOpen.set(false)
      }
    }

    document.addEventListener("keydown", handleEsc)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if ($searchQuery) {
      const query = $searchQuery.toLowerCase()
      const filtered = posts.filter((post) => {
        const title = post.data.title.toLowerCase()
        const date = new Date(post.data.publishDate).toLocaleDateString("es-ES")
        return title.includes(query) || date.includes(query)
      })
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts([])
    }
  }, [$searchQuery, posts])

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => isSearchOpen.set(true)}
        className="p-2 rounded-lg hover:bg-chocolate-100 dark:hover:bg-chocolate-800/50"
        aria-label="Buscar"
      >
        <span className="text-xl">🔍</span>
      </button>

      {$isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/20 dark:bg-black/40">
          <div className="w-full max-w-2xl bg-white dark:bg-chocolate-800/90 rounded-lg shadow-2xl border dark:border-chocolate-700 backdrop-blur-sm">
            <div className="p-4">
              <input
                type="search"
                placeholder="Buscar por título o fecha..."
                className="w-full px-4 py-3 rounded-lg border dark:border-chocolate-700 
                         dark:bg-chocolate-900/50 dark:text-primary-100
                         dark:placeholder-primary-300/50"
                value={$searchQuery}
                onChange={(e) => searchQuery.set(e.target.value)}
                autoFocus
              />

              <div className="mt-2 text-sm text-gray-500 dark:text-primary-200/70 flex justify-between">
                <span>
                  Presiona <kbd className="px-2 py-1 bg-gray-100 dark:bg-chocolate-900 rounded">ESC</kbd> para cerrar
                </span>
                {filteredPosts.length > 0 && <span>{filteredPosts.length} resultado(s)</span>}
              </div>
            </div>

            {filteredPosts.length > 0 && (
              <div className="border-t dark:border-chocolate-700 max-h-[60vh] overflow-y-auto">
                {filteredPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-4 hover:bg-gray-50 dark:hover:bg-chocolate-700/50"
                    onClick={() => {
                      isSearchOpen.set(false)
                      searchQuery.set("")
                    }}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-primary-100">{post.data.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-primary-200/70 line-clamp-2">
                      {post.data.description}
                    </p>
                    <time className="mt-2 text-xs text-gray-400 dark:text-primary-200/50">
                      {new Date(post.data.publishDate).toLocaleDateString("es-ES")}
                    </time>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

