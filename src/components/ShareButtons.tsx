'use client';
import { useState, useEffect } from 'react';
import { Share2, Link2, Twitter, Facebook } from 'lucide-react';
import { Toast } from './Toast';
import { motion, AnimatePresence } from 'framer-motion';

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
    const hashtags = document.querySelectorAll('a[href^="/tags/"]');
    const formattedTags = Array.from(hashtags)
      .map((tag) => tag.textContent?.replace('#', '').trim())
      .filter(Boolean)
      .map((tag) =>
        tag
          ?.split(' ')
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join('')
      )
      .map((tag) => `#${tag}`);

    const tweetText = `${pageTitle}

${shareUrl}

${formattedTags.join(' ')}`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
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
      <div className="fixed bottom-8 right-8 z-40 share-menu">
        <div className="relative">
          {/* Botón principal */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-4 bg-primary-500 dark:bg-accent-500 text-white dark:text-surface-900 
                     rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              backgroundColor: isMenuOpen
                ? 'rgb(191, 237, 193)'
                : 'rgb(152, 95, 153)',
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            aria-label="Compartir">
            <Share2 className="w-5 h-5" />
          </motion.button>

          {/* Menú flotante */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 min-w-[160px]"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}>
                <div
                  className="bg-white dark:bg-surface-900 rounded-lg shadow-xl p-2 flex flex-col gap-2
                              border border-primary-100 dark:border-surface-700">
                  {/* Copiar enlace */}
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                             text-primary-700 dark:text-accent-300
                             hover:bg-primary-50 dark:hover:bg-surface-800
                             transition-colors duration-200 font-mono"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link2 className="w-4 h-4" />
                    <span className="whitespace-nowrap">Copiar enlace</span>
                  </motion.button>

                  {/* Twitter */}
                  <motion.button
                    onClick={shareToTwitter}
                    className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                             text-primary-700 dark:text-accent-300
                             hover:bg-primary-50 dark:hover:bg-surface-800
                             transition-colors duration-200 font-mono"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}>
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </motion.button>

                  {/* Facebook */}
                  <motion.button
                    onClick={shareToFacebook}
                    className="flex items-center gap-3 px-4 py-3 text-sm rounded-md
                             text-primary-700 dark:text-accent-300
                             hover:bg-primary-50 dark:hover:bg-surface-800
                             transition-colors duration-200 font-mono"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}>
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
