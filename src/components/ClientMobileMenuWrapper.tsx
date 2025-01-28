"use client"
import { useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"
import ThemeToggle from "./ThemeToggle"

export default function ClientMobileMenuWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Renderizamos un div vacío del mismo tamaño para prevenir saltos
  if (!isMounted) {
    return <div className="w-8 h-8" />
  }

  return (
    <MobileMenu>
      <SearchModal client:load />
      <ThemeToggle client:load />
    </MobileMenu>
  )
}

