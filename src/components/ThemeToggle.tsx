"use client"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export default function ThemeToggle() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark")
    const newTheme = isDark ? "light" : "dark"

    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label="Cambiar tema"
    >
      <Sun className="sun w-5 h-5" />
      <Moon className="moon w-5 h-5" />
    </button>
  )
}

