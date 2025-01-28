'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

export default function MobileMenu({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => mounted && setIsOpen(!isOpen)}
        className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}>
            {/* Overlay con blur */}
            <div
              className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Contenido del menú */}
            <div
              className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-surface-900 shadow-xl 
                       transform transition-transform duration-300 ease-in-out ${
                         isOpen ? 'translate-x-0' : 'translate-x-full'
                       }`}>
              <div className="p-6 space-y-6">
                {/* Encabezado del menú */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono">Menú</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Cerrar menú">
                    <X size={20} />
                  </button>
                </div>

                {/* Enlaces de navegación */}
                <nav className="space-y-4">
                  <a
                    href="/blog"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono"
                    onClick={() => setIsOpen(false)}>
                    Artículos
                  </a>
                  <a
                    href="/tags"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono"
                    onClick={() => setIsOpen(false)}>
                    Etiquetas
                  </a>
                  <a
                    href="/resume"
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono"
                    onClick={() => setIsOpen(false)}>
                    Currículum
                  </a>
                </nav>

                {/* Controles (Búsqueda y Tema) */}
                <div className="flex items-center gap-4 pt-4 border-t dark:border-surface-800">
                  {children}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
