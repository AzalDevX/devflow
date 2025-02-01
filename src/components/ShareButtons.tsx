'use client';
import { useState, useEffect } from 'react';
import { Share2, Link2, Twitter, Facebook } from 'lucide-react';
import { Toast } from './Toast';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
    setPageTitle(document.title);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !event.target?.closest('.share-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    showNotification('¡Enlace copiado!');
  };

  const shareToTwitter = () => {
    const tweetText = `${pageTitle}\n${shareUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
    showNotification('Compartiendo en Twitter...');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    showNotification('Compartiendo en Facebook...');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    showNotification('Compartiendo en LinkedIn...');
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 share-menu">
        <div className="relative">
          {/* Botón principal */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-4 bg-surface-900 dark:bg-white text-white dark:text-surface-900 
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                     hover:scale-110 hover:rotate-12"
            aria-label="Compartir">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Menú flotante */}
          <div
            className={`absolute bottom-full right-0 mb-2 transition-all duration-300 transform
                        min-w-[160px] ${
                          isMenuOpen
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible translate-y-2'
                        }`}>
            <div
              className="bg-white dark:bg-surface-900 rounded-lg shadow-xl p-2 flex flex-col gap-2
                          border border-surface-200 dark:border-surface-700">
              {/* Copiar enlace */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                         hover:bg-surface-100 dark:hover:bg-surface-800
                         text-surface-900 dark:text-white
                         transition-colors duration-200 font-mono">
                <Link2 className="w-4 h-4" />
                <span className="whitespace-nowrap">Copiar enlace</span>
              </button>

              {/* Twitter */}
              <button
                onClick={shareToTwitter}
                className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                         hover:bg-surface-100 dark:hover:bg-surface-800
                         text-surface-900 dark:text-white
                         transition-colors duration-200 font-mono">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                         hover:bg-surface-100 dark:hover:bg-surface-800
                         text-surface-900 dark:text-white
                         transition-colors duration-200 font-mono">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareToLinkedIn}
                className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                         hover:bg-surface-100 dark:hover:bg-surface-800
                         text-surface-900 dark:text-white
                         transition-colors duration-200 font-mono">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.29c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.29h-3v-5.604c0-1.344-.027-3.07-1.87-3.07-1.872 0-2.158 1.462-2.158 2.972v5.702h-3v-10h2.881v1.363h.041c.401-.761 1.379-1.563 2.837-1.563 3.034 0 3.599 2.003 3.599 4.607v5.593z" />
                </svg>
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}