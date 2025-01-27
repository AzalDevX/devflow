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

  useEffect(() => {
    setShareUrl(window.location.href);
    setPageTitle(document.title);
  }, []);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    showNotification('¡Enlace copiado!');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      pageTitle
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    showNotification('Compartiendo en Twitter...');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank');
    showNotification('Compartiendo en Facebook...');
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative group">
          {/* Botón principal */}
          <button
            className="p-4 bg-surface-900 dark:bg-white text-white dark:text-surface-900 
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                     hover:scale-110 hover:rotate-12"
            aria-label="Compartir">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Menú flotante */}
          <div
            className="absolute bottom-full right-0 mb-2 opacity-0 invisible group-hover:opacity-100 
                        group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 
                        translate-y-2 min-w-[160px]">
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
